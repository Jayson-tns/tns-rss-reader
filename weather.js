/* ============================================================
   TNS 天气模块 V3.2 · 顶栏整合（iOS 风格）
   ============================================================ */
(function(){
  "use strict";
  const API_KEY = "YOUR_API_KEY_HERE";
  const API_HOST = "YOUR_API_HOST_HERE";
  const LS_CITY  = "tns_weather_city";
  const LS_COORD = "tns_weather_coords";
  const LS_LAST  = "tns_weather_last";

  let targetEl = null;
  let city = localStorage.getItem(LS_CITY) || "";
  let coords = null;
  try{ coords = JSON.parse(localStorage.getItem(LS_COORD) || "null"); }catch(e){}

  const $ = s => document.querySelector(s);
  const esc = s => String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;");
  const lang = () => (navigator.language||"zh").toLowerCase().startsWith("zh") ? "zh" : "en";

  async function api(path, params, timeoutMs){
    const c = new AbortController();
    const t = setTimeout(() => c.abort(), timeoutMs || 8000);
    try{
      const url = API_HOST + path + "?" + new URLSearchParams(params).toString();
      const r = await fetch(url, { headers: { "X-QW-Api-Key": API_KEY }, signal: c.signal });
      if(!r.ok) throw new Error("HTTP " + r.status);
      return await r.json();
    } finally { clearTimeout(t); }
  }

  function setHdr(html){ if(targetEl) targetEl.innerHTML = html; }

  function renderFromCache(){
    let last = null;
    try{ last = JSON.parse(localStorage.getItem(LS_LAST) || "null"); }catch(e){}
    if(last && last.now) renderNow(last.now, true);
  }
  function renderNow(now, fromCache){
    setHdr(`<i class="qi qi-${now.icon}"></i> ${esc(now.text)} ${now.temp}℃`);
    if(targetEl) targetEl.onclick = openSheet;
  }
  function renderFail(){
    setHdr('<i class="fas fa-cloud-xmark"></i> 天气加载失败，点击重试');
    if(targetEl) targetEl.onclick = () => { loadNow(); };
  }

  async function loadNow(){
    if(!coords){ locate(); return; }
    try{
      const loc = coords.lon + "," + coords.lat;
      const data = await api("/v7/weather/now", { location: loc, lang: lang() });
      if(data.code !== "200" || !data.now) throw new Error("API " + data.code);
      renderNow(data.now, false);
      try{ localStorage.setItem(LS_LAST, JSON.stringify({ now: data.now, ts: Date.now() })); }catch(e){}
    }catch(e){ renderFail(); }
  }

  async function locate(){
    setHdr('<i class="fas fa-location-crosshairs"></i> 定位中…');
    const fallback = () => {
      coords = { lon:112.2385, lat:30.3244 };
      city = city || "荆州";
      localStorage.setItem(LS_COORD, JSON.stringify(coords));
      if(city) localStorage.setItem(LS_CITY, city);
      loadNow();
    };
    if(!navigator.geolocation) return fallback();
    let settled = false;
    const timer = setTimeout(() => { if(!settled){ settled = true; fallback(); } }, 9000);
    navigator.geolocation.getCurrentPosition(
      async pos => {
        if(settled) return; settled = true; clearTimeout(timer);
        coords = { lon:+pos.coords.longitude.toFixed(2), lat:+pos.coords.latitude.toFixed(2) };
        localStorage.setItem(LS_COORD, JSON.stringify(coords));
        try{
          const g = await api("/geo/v2/city/lookup", { location: coords.lon + "," + coords.lat });
          if(g.code === "200" && g.location && g.location[0]){
            city = g.location[0].name;
            localStorage.setItem(LS_CITY, city);
          }
        }catch(e){}
        loadNow();
      },
      () => { if(!settled){ settled = true; clearTimeout(timer); fallback(); } },
      { timeout: 8000, maximumAge: 300000 }
    );
  }

  function openSheet(){
    const mask = $("#sheetMask"), body = $("#sheetBody");
    if(!mask || !body) return;
    body.innerHTML = `
      <h3><i class="qi qi-location"></i> 天气 <span style="margin-left:auto;font-size:14px;color:var(--text-2);font-weight:400">${esc(city||"当前位置")}</span></h3>
      <div class="wx-search">
        <input id="wxCityInput" placeholder="搜索城市">
        <button class="btn" id="wxCityBtn"><i class="fas fa-search"></i></button>
      </div>
      <div id="wxCityResults"></div>
      <div id="wxDetail"><div style="text-align:center;padding:20px;color:var(--text-3)"><i class="fas fa-circle-notch fa-spin"></i></div></div>
    `;
    mask.hidden = false;
    mask.onclick = e => { if(e.target === mask) mask.hidden = true; };
    $("#wxCityBtn").onclick = searchCity;
    $("#wxCityInput").addEventListener("keypress", e => { if(e.key === "Enter") searchCity(); });
    loadDetail();
  }

  async function searchCity(){
    const q = $("#wxCityInput").value.trim();
    if(!q) return;
    const box = $("#wxCityResults");
    box.innerHTML = `<div style="font-size:13px;color:var(--text-3);padding:6px 2px"><i class="fas fa-circle-notch fa-spin"></i> 搜索中…</div>`;
    try{
      const g = await api("/geo/v2/city/lookup", { location: q });
      if(g.code === "200" && g.location && g.location.length){
        box.innerHTML = g.location.slice(0,8).map(c =>
          `<div class="wx-city-result" data-lon="${c.lon}" data-lat="${c.lat}" data-name="${esc(c.name)}">
             <i class="fas fa-location-dot"></i> ${esc(c.name)}${c.adm1 ? " · " + esc(c.adm1) : ""}
           </div>`).join("");
        box.querySelectorAll(".wx-city-result").forEach(el => el.onclick = () => {
          coords = { lon:+el.dataset.lon, lat:+el.dataset.lat };
          city = el.dataset.name;
          localStorage.setItem(LS_COORD, JSON.stringify(coords));
          localStorage.setItem(LS_CITY, city);
          box.innerHTML = "";
          loadNow(); loadDetail();
        });
      }else box.innerHTML = `<div style="font-size:13px;color:var(--text-3)">未找到相关城市</div>`;
    }catch(e){ box.innerHTML = `<div style="font-size:13px;color:var(--red)">搜索失败，请稍后重试</div>`; }
  }

  async function loadDetail(){
    if(!coords) return;
    const box = $("#wxDetail");
    try{
      const loc = coords.lon + "," + coords.lat;
      const now = await api("/v7/weather/now", { location: loc, lang: lang() });
      if(now.code !== "200") throw new Error("now");
      const d = now.now;
      try{ localStorage.setItem(LS_LAST, JSON.stringify({ now: d, ts: Date.now() })); }catch(e){}
      let fc = null;
      try{
        const f = await api("/v7/weather/3d", { location: loc, lang: lang() });
        if(f.code === "200") fc = f.daily;
      }catch(e){}
      box.innerHTML = `
        <div class="wx-now">
          <i class="qi qi-${d.icon}"></i>
          <div>
            <div class="t">${d.temp}℃</div>
            <div class="d">${esc(d.text)} · 体感 ${d.feelsLike}℃</div>
          </div>
        </div>
        <div class="wx-grid">
          <div class="wx-cell"><i class="fas fa-droplet"></i><div><span class="l">湿度</span><span class="v">${d.humidity}%</span></div></div>
          <div class="wx-cell"><i class="fas fa-wind"></i><div><span class="l">风</span><span class="v">${esc(d.windDir||"")} ${d.windScale}级</span></div></div>
          <div class="wx-cell"><i class="fas fa-eye"></i><div><span class="l">能见度</span><span class="v">${d.vis} km</span></div></div>
          <div class="wx-cell"><i class="fas fa-gauge-high"></i><div><span class="l">气压</span><span class="v">${d.pressure} hPa</span></div></div>
        </div>
        ${fc ? `<div class="wx-forecast">${fc.map(day => {
          const dt = new Date(day.fxDate);
          return `<div class="wx-fc"><div class="dt">${dt.getMonth()+1}/${dt.getDate()}</div><i class="qi qi-${day.iconDay}"></i><div class="tp">${day.tempMin}°~${day.tempMax}°</div></div>`;
        }).join("")}</div>` : ""}
      `;
    }catch(e){
      box.innerHTML = `<div style="text-align:center;padding:18px;color:var(--text-3);font-size:13px">天气详情加载失败，请检查网络</div>`;
    }
  }

  window.TNSWeather = {
    init(sel){
      targetEl = document.querySelector(sel);
      if(!targetEl) return;
      renderFromCache();
      setTimeout(loadNow, 500);
    }
  };
})();