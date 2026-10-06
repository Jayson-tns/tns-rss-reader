/* ============================================================
   TNS 资讯 V3.0 · Silver Mountain · app.js
   ============================================================ */
"use strict";

const K = {
  sources: "tns_v3_sources",
  read:    "tns_v3_read",
  fav:     "tns_v3_fav",
  history: "tns_v3_history",
  settings:"tns_v3_settings",
  cache:   "tns_v3_cache",
  meta:    "tns_v3_meta"
};

const DEFAULT_SOURCES = [
  { id:"people",   name:"人民网",   url:"https://plink.anyfeeder.com/people" },
  { id:"xinhua",   name:"新华网",   url:"https://plink.anyfeeder.com/newscn/whxw" },
  { id:"thepaper", name:"澎湃新闻", url:"https://plink.anyfeeder.com/thepaper" },
  { id:"ithome",   name:"IT之家",   url:"https://plink.anyfeeder.com/ithome/it" }
];

const MARKET_SOURCES = [
  {id:"m_people",name:"人民网",cat:"news",catName:"新闻资讯",desc:"人民网官方头条新闻，权威时政要闻。",url:"https://plink.anyfeeder.com/people"},
  {id:"m_xinhua",name:"新华网",cat:"news",catName:"新闻资讯",desc:"新华社官方新闻，国内外重大事件报道。",url:"https://plink.anyfeeder.com/newscn/whxw"},
  {id:"m_thepaper",name:"澎湃新闻",cat:"news",catName:"新闻资讯",desc:"澎湃新闻综合报道，深度与时事并重。",url:"https://plink.anyfeeder.com/thepaper"},
  {id:"m_infzm_news",name:"南方周末·新闻",cat:"news",catName:"新闻资讯",desc:"南方周末深度新闻调查与报道。",url:"https://plink.anyfeeder.com/infzm/news"},
  {id:"m_jiemian",name:"界面新闻",cat:"news",catName:"新闻资讯",desc:"界面新闻综合资讯，商业与社会新闻。",url:"https://plink.anyfeeder.com/jiemian/news"},
  {id:"m_chinadaily",name:"中国日报·双语",cat:"news",catName:"新闻资讯",desc:"中国日报双语新闻，中英对照阅读。",url:"https://plink.anyfeeder.com/chinadaily/dual"},
  {id:"m_peopledaily",name:"人民日报",cat:"news",catName:"新闻资讯",desc:"人民日报要闻，权威政策解读。",url:"https://plink.anyfeeder.com/people-daily"},
  {id:"m_idaily",name:"iDaily每日环球",cat:"news",catName:"新闻资讯",desc:"每日环球视野，图片新闻精选。",url:"https://plink.anyfeeder.com/idaily/today"},
  {id:"m_ithome",name:"IT之家",cat:"tech",catName:"科技数码",desc:"IT资讯与数码产品评测，科技圈每日热点。",url:"https://plink.anyfeeder.com/ithome/it"},
  {id:"m_36kr",name:"36氪",cat:"tech",catName:"科技数码",desc:"科技创业与商业资讯，创投圈第一手动态。",url:"https://plink.anyfeeder.com/36kr"},
  {id:"m_cnbeta",name:"cnBeta",cat:"tech",catName:"科技数码",desc:"中文业界资讯站，科技新闻与评论。",url:"https://plink.anyfeeder.com/cnbeta"},
  {id:"m_solidot",name:"Solidot",cat:"tech",catName:"科技数码",desc:"奇客资讯，科技与开源新闻。",url:"https://www.solidot.org/index.rss"},
  {id:"m_ifanr",name:"爱范儿",cat:"tech",catName:"科技数码",desc:"科技消费媒体，聚焦产品与生活方式。",url:"https://plink.anyfeeder.com/ifanr"},
  {id:"m_huxiu",name:"虎嗅",cat:"tech",catName:"科技数码",desc:"商业科技媒体，深度产业分析。",url:"https://plink.anyfeeder.com/huxiu"},
  {id:"m_gcores",name:"机核网",cat:"tech",catName:"科技数码",desc:"游戏文化资讯，电玩评测与深度文章。",url:"https://plink.anyfeeder.com/gcores"},
  {id:"m_mydrivers",name:"快科技",cat:"tech",catName:"科技数码",desc:"数码硬件资讯，手机电脑评测。",url:"https://plink.anyfeeder.com/mydrivers"},
  {id:"m_sspai",name:"少数派",cat:"tech",catName:"科技数码",desc:"高效工具与数字生活，效率应用评测。",url:"https://plink.anyfeeder.com/sspai"},
  {id:"m_geekpark",name:"极客公园",cat:"tech",catName:"科技数码",desc:"科技创新媒体，产品与趋势观察。",url:"https://plink.anyfeeder.com/geekpark"},
  {id:"m_zhihu_daily",name:"知乎日报",cat:"knowledge",catName:"知识阅读",desc:"知乎每日精选问答，优质内容推荐。",url:"https://plink.anyfeeder.com/zhihu/daily"},
  {id:"m_jianshu",name:"简书",cat:"knowledge",catName:"知识阅读",desc:"简书热门文章，写作与阅读社区。",url:"https://plink.anyfeeder.com/jianshu/home"},
  {id:"m_woshipm",name:"人人都是产品经理",cat:"knowledge",catName:"知识阅读",desc:"产品经理热门文章，产品设计与运营。",url:"https://plink.anyfeeder.com/woshipm/popular"},
  {id:"m_meiriyiwen",name:"观止·每日一文",cat:"knowledge",catName:"知识阅读",desc:"每天一篇精选文章，静心阅读。",url:"https://plink.anyfeeder.com/meiriyiwen"},
  {id:"m_ruanyifeng",name:"阮一峰博客",cat:"knowledge",catName:"知识阅读",desc:"科技爱好者周刊，技术与生活随笔。",url:"https://www.ruanyifeng.com/blog/atom.xml"},
  {id:"m_wanqu",name:"湾区日报",cat:"knowledge",catName:"知识阅读",desc:"湾区工程师精选链接，每日5条。",url:"https://wanqu.co/feed/"},
  {id:"m_douban_movie",name:"豆瓣影评",cat:"entertainment",catName:"娱乐文化",desc:"豆瓣最受欢迎的影评，电影评论精选。",url:"https://plink.anyfeeder.com/douban/review/movie"},
  {id:"m_douban_book",name:"豆瓣书评",cat:"entertainment",catName:"娱乐文化",desc:"豆瓣最受欢迎的书评，读书评论精选。",url:"https://plink.anyfeeder.com/douban/review/book"},
  {id:"m_pentitugua",name:"喷嚏图卦",cat:"entertainment",catName:"娱乐文化",desc:"每日图片新闻精选，轻松看新闻。",url:"https://plink.anyfeeder.com/pentitugua"},
  {id:"m_infzm_rec",name:"南方周末·推荐",cat:"entertainment",catName:"娱乐文化",desc:"南方周末推荐文章，深度阅读。",url:"https://plink.anyfeeder.com/infzm/recommends"},
  {id:"m_fortune",name:"财富中文网",cat:"finance",catName:"财经商业",desc:"财富中文网商业资讯，全球商业动态。",url:"https://plink.anyfeeder.com/fortunechina"},
  {id:"m_jingjiribao",name:"经济日报",cat:"finance",catName:"财经商业",desc:"经济日报要闻，宏观经济政策。",url:"https://plink.anyfeeder.com/jingjiribao"},
  {id:"m_tmtpost",name:"钛媒体",cat:"finance",catName:"财经商业",desc:"钛媒体科技财经，TMT行业报道。",url:"https://plink.anyfeeder.com/tmtpost"},
  {id:"m_dapenti_caijing",name:"喷嚏网·财经",cat:"finance",catName:"财经商业",desc:"财经风云评论，独特视角解读。",url:"https://plink.anyfeeder.com/dapenti/caijing"},
  {id:"m_pingwest",name:"品玩",cat:"finance",catName:"财经商业",desc:"品玩科技商业，有品好玩的科技报道。",url:"https://plink.anyfeeder.com/pingwest"},
  {id:"m_bbc",name:"BBC·头条",cat:"foreign",catName:"外国媒体",desc:"BBC Top Stories，全球头条新闻。",url:"https://plink.anyfeeder.com/bbc"},
  {id:"m_bbc_world",name:"BBC·国际",cat:"foreign",catName:"外国媒体",desc:"BBC World News，国际新闻报道。",url:"https://plink.anyfeeder.com/bbc/world"},
  {id:"m_bbc_tech",name:"BBC·科技",cat:"foreign",catName:"外国媒体",desc:"BBC Technology，科技新闻。",url:"https://plink.anyfeeder.com/bbc/technology"},
  {id:"m_economist",name:"经济学人·社论",cat:"foreign",catName:"外国媒体",desc:"The Economist Leaders，经济学人社论。",url:"https://plink.anyfeeder.com/economist/leaders"},
  {id:"m_newyorker",name:"纽约客·新闻",cat:"foreign",catName:"外国媒体",desc:"The New Yorker News，深度新闻报道。",url:"https://plink.anyfeeder.com/newyorker/news"},
  {id:"m_time",name:"TIME时代",cat:"foreign",catName:"外国媒体",desc:"TIME杂志，全球时事与人物。",url:"https://plink.anyfeeder.com/time"},
  {id:"m_techcrunch",name:"TechCrunch",cat:"foreign",catName:"外国媒体",desc:"TechCrunch，科技创业新闻。",url:"https://plink.anyfeeder.com/techcrunch"},
  {id:"m_arstechnica",name:"Ars Technica",cat:"foreign",catName:"外国媒体",desc:"Ars Technica，技术新闻与深度评测。",url:"https://plink.anyfeeder.com/arstechnica"}
];
const MARKET_CATS = [
  {id:"all",name:"全部"},{id:"news",name:"新闻资讯"},{id:"tech",name:"科技数码"},
  {id:"knowledge",name:"知识阅读"},{id:"entertainment",name:"娱乐文化"},
  {id:"finance",name:"财经商业"},{id:"foreign",name:"外国媒体"}
];

const CORS_PROXIES = [
  u => "https://api.allorigins.win/raw?url=" + encodeURIComponent(u),
  u => "https://corsproxy.io/?url=" + encodeURIComponent(u),
  u => "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(u)
];
const CAN_DIRECT = u => /rsshub\.app|gcores\.com|sspai\.com|ithome\.com|mydrivers\.com/.test(u);

const state = {
  sources: [],
  readSet: new Set(),
  favSet: new Set(),
  history: [],
  settings: { theme:"auto", fontSize:"medium", viewMode:"compact" },
  cache: {},
  srcState: {},
  expanded: new Set(),
  searchKw: "",
  marketCat: "all"
};
let booted = false;

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const uid = p => (p||"src_") + Date.now().toString(36) + Math.random().toString(36).slice(2,6);
function lsGet(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
function lsSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
function toast(msg){
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(()=>t.classList.remove("show"), 2000);
}
function fmtTime(t){
  const ts = Date.parse(t); if(!ts) return "";
  const d = new Date(ts);
  const today = new Date(); const yest = new Date(Date.now()-864e5);
  const same = (a,b)=>a.toDateString()===b.toDateString();
  const hm = String(d.getHours()).padStart(2,"0") + ":" + String(d.getMinutes()).padStart(2,"0");
  if(same(d,today)) return hm;
  if(same(d,yest))  return "昨天";
  return `${d.getMonth()+1}月${d.getDate()}日`;
}
function stripHtml(s){ const d=document.createElement("div"); d.innerHTML=s||""; return (d.textContent||"").trim(); }

function saveAll(){
  lsSet(K.sources, JSON.stringify(state.sources));
  lsSet(K.read, JSON.stringify([...state.readSet]));
  lsSet(K.fav, JSON.stringify([...state.favSet]));
  lsSet(K.history, JSON.stringify(state.history));
  lsSet(K.settings, JSON.stringify(state.settings));
}
function saveCache(){ try{ lsSet(K.cache, JSON.stringify(state.cache)); }catch(e){} }

function migrate(){
  let meta = {};
  try{ meta = JSON.parse(lsGet(K.meta) || "{}"); }catch(e){}
  if(meta.done) return;
  let migrated = false;

  const oldSources = lsGet("tns_rss_sources");
  if(oldSources){
    try{
      const arr = JSON.parse(oldSources);
      if(Array.isArray(arr) && arr.length){
        state.sources = arr.map(s => ({ id:s.id || uid(), name:s.name || "未命名", url:s.url }));
        migrated = true;
      }
    }catch(e){}
  }
  const oldFav = lsGet("tns_fav_set");
  if(oldFav){ try{ const a=JSON.parse(oldFav); if(Array.isArray(a)){ a.forEach(g=>state.favSet.add(g)); migrated=true; } }catch(e){} }
  const oldRead = lsGet("tns_read_set");
  if(oldRead){ try{ const a=JSON.parse(oldRead); if(Array.isArray(a)){ a.forEach(g=>state.readSet.add(g)); } }catch(e){} }
  const oldHis = lsGet("tns_history");
  if(oldHis){ try{ const a=JSON.parse(oldHis); if(Array.isArray(a)){ state.history = a.slice(0,200); migrated=true; } }catch(e){} }
  const oldSet = lsGet("tns_settings");
  if(oldSet){
    try{
      const s = JSON.parse(oldSet);
      if(s.darkMode === "light") state.settings.theme = "light";
      else if(s.darkMode === "oled") state.settings.theme = "oled";
      else if(s.darkMode === "normal") state.settings.theme = "dark";
      else state.settings.theme = "auto";
      if(s.fontSize === "14px") state.settings.fontSize = "small";
      else if(s.fontSize === "18px") state.settings.fontSize = "large";
      if(s.viewMode === "img") state.settings.viewMode = "image";
      migrated = true;
    }catch(e){}
  }
  const oldCache = lsGet("tns_news_cache");
  if(oldCache){
    try{
      const c = JSON.parse(oldCache);
      if(c && typeof c === "object"){
        Object.keys(c).forEach(k => {
          if(Array.isArray(c[k]) && c[k].length) state.cache[k] = { items:c[k].slice(0,40), ts:Date.now() };
        });
      }
    }catch(e){}
  }

  meta.done = true;
  meta.migrated = migrated;
  meta.welcomeShown = !migrated;
  lsSet(K.meta, JSON.stringify(meta));
  saveAll(); saveCache();
}

function loadAll(){
  try{
    const s = JSON.parse(lsGet(K.sources) || "null");
    state.sources = (Array.isArray(s) && s.length) ? s : state.sources.length ? state.sources : JSON.parse(JSON.stringify(DEFAULT_SOURCES));
  }catch(e){ state.sources = JSON.parse(JSON.stringify(DEFAULT_SOURCES)); }
  try{ const r=JSON.parse(lsGet(K.read)||"[]"); state.readSet=new Set(r); }catch(e){}
  try{ const f=JSON.parse(lsGet(K.fav)||"[]"); state.favSet=new Set(f); }catch(e){}
  try{ const h=JSON.parse(lsGet(K.history)||"[]"); state.history=h; }catch(e){}
  try{ const st=JSON.parse(lsGet(K.settings)||"null"); if(st) state.settings={...state.settings,...st}; }catch(e){}
  try{ const c=JSON.parse(lsGet(K.cache)||"null"); if(c) state.cache=c; }catch(e){}
}

function applyTheme(){
  let t = state.settings.theme;
  if(t === "auto") t = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
  document.documentElement.dataset.theme = t;
  document.documentElement.dataset.font = state.settings.fontSize;
  const mt = $("#metaTheme");
  if(mt) mt.content = (t === "light") ? "#007AFF" : "#000000";
}
if(window.matchMedia){
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ()=>{
    if(state.settings.theme === "auto") applyTheme();
  });
}

function renderDate(){
  try{
    $("#hdrDate").textContent = new Intl.DateTimeFormat("zh-CN",{month:"long",day:"numeric",weekday:"long"}).format(new Date());
  }catch(e){
    const d = new Date(), wk = ["周日","周一","周二","周三","周四","周五","周六"][d.getDay()];
    $("#hdrDate").textContent = `${d.getMonth()+1}月${d.getDate()}日 ${wk}`;
  }
}

async function fetchText(url, timeout){
  const c = new AbortController(); const t = setTimeout(()=>c.abort(), timeout);
  try{
    const r = await fetch(url, {signal:c.signal});
    if(!r.ok) throw new Error("HTTP " + r.status);
    const txt = await r.text();
    if(!txt || txt.length < 50) throw new Error("内容为空");
    return txt;
  } finally { clearTimeout(t); }
}
function parseXmlItems(txt, src){
  const xml = new DOMParser().parseFromString(txt, "text/xml");
  if(xml.querySelector("parsererror")) throw new Error("XML解析失败");
  const items = Array.from(xml.querySelectorAll("item"));
  if(!items.length) throw new Error("无item条目");
  return items.slice(0, 40).map(it => {
    const title = it.querySelector("title")?.textContent || "";
    const link  = it.querySelector("link")?.textContent || "";
    const guid  = it.querySelector("guid")?.textContent || link || (title + it.textContent.length);
    const pubDate = it.querySelector("pubDate")?.textContent || "";
    const desc  = stripHtml(it.querySelector("description")?.textContent || "");
    let imgUrl = "";
    const enc = it.querySelector("enclosure");
    if(enc && (enc.getAttribute("type")||"").startsWith("image/")) imgUrl = enc.getAttribute("url") || "";
    return { guid, title, link, pubDate, desc, imgUrl, sourceId:src.id, sourceName:src.name };
  });
}
function parseJsonItems(data, src){
  if(data.status !== "ok" || !Array.isArray(data.items)) throw new Error("RSS返回异常");
  return data.items.slice(0, 40).map(it => ({
    guid: it.guid || it.link || (it.title + Date.now()),
    title: it.title || "",
    link: it.link || "",
    pubDate: it.pubDate || "",
    desc: stripHtml(it.description || it.content || ""),
    imgUrl: it.thumbnail || (it.enclosure && it.enclosure.link) || "",
    sourceId: src.id, sourceName: src.name
  }));
}
async function fetchSource(src){
  state.srcState[src.id] = "loading"; renderHome();
  try{
    const r2j = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(src.url);
    const data = JSON.parse(await fetchText(r2j, 8000));
    const items = parseJsonItems(data, src);
    if(items.length){ commit(src, items); return true; }
  }catch(e){}
  if(CAN_DIRECT(src.url)){
    try{ commit(src, parseXmlItems(await fetchText(src.url, 5000), src)); return true; }catch(e){}
  }
  for(const p of CORS_PROXIES){
    try{ commit(src, parseXmlItems(await fetchText(p(src.url), 5000), src)); return true; }catch(e){}
  }
  state.srcState[src.id] = "fail";
  if(!state.cache[src.id]) state.cache[src.id] = {items:[], ts:0};
  renderHome();
  return false;
}
function commit(src, items){
  items.sort((a,b)=>Date.parse(b.pubDate)-Date.parse(a.pubDate));
  state.cache[src.id] = { items, ts: Date.now() };
  state.srcState[src.id] = "ok";
  saveCache(); renderHome();
}
async function refreshAll(){
  $("#btnRefresh i").classList.add("fa-spin");
  state.sources.forEach(s => state.srcState[s.id] = "pending");
  renderHome();
  let i = 0;
  const workers = Array.from({length: 3}, async () => {
    while(i < state.sources.length){
      const s = state.sources[i++];
      await fetchSource(s);
    }
  });
  await Promise.all(workers);
  $("#btnRefresh i").classList.remove("fa-spin");
  updateHomeStatus();
  saveCache();
}

function allItems(){ return state.cache; }
function updateHomeStatus(){
  const el = $("#homeStatus");
  const total = state.sources.length;
  const ok = Object.values(state.srcState).filter(x=>x==="ok").length;
  const loading = Object.values(state.srcState).filter(x=>x==="loading"||x==="pending").length;
  if(!booted) return;
  if(loading) el.innerHTML = `<i class="fas fa-circle-notch spin"></i> 正在加载 ${ok}/${total} 个源`;
  else if(ok) el.textContent = "";
  else el.innerHTML = `<i class="fas fa-triangle-exclamation" style="color:var(--red)"></i> 源加载失败，请检查网络后重试`;
}
function newsItemHtml(n){
  const read = state.readSet.has(n.guid);
  const fav  = state.favSet.has(n.guid);
  const img  = (state.settings.viewMode === "image" && n.imgUrl)
    ? `<img class="news-thumb" src="${esc(n.imgUrl)}" alt="" loading="lazy" onerror="this.remove()">` : "";
  const preview = n.desc ? n.desc : (n.sourceName || "");
  return `<div class="news-row${read?" read":""}" data-guid="${esc(n.guid)}">
    ${img}
    <div class="news-main">
      <div class="news-top"><b>${esc(n.title)}</b></div>
      <div class="news-preview">${esc(preview.slice(0,60))}</div>
    </div>
    <div class="news-side">
      <span class="news-time">${esc(fmtTime(n.pubDate))}</span>
      <button class="news-fav${fav?" on":""}" data-guid="${esc(n.guid)}"><i class="${fav?"fas":"far"} fa-star"></i></button>
    </div>
  </div>`;
}
function groupStatusHtml(st){
  if(st === "ok") return `<span class="group-status ok">已更新</span>`;
  if(st === "loading" || st === "pending") return `<span class="group-status loading"><i class="fas fa-circle-notch fa-spin"></i></span>`;
  if(st === "fail") return `<span class="group-status fail">加载失败</span>`;
  return "";
}
function sourceGroupHtml(src, items){
  const st = state.srcState[src.id] || "pending";
  let body = "";
  if(st === "fail" && !items.length){
    body = `<div class="card-error">
      <i class="fas fa-cloud-xmark"></i>
      <p>暂时不可用，请稍后尝试<br><small>RSS_TIMEOUT</small></p>
      <button class="btn plain" data-retry="${esc(src.id)}"><i class="fas fa-rotate-right"></i> 重试</button>
    </div>`;
  }else if(!items.length){
    body = `<div class="card-error"><i class="far fa-newspaper"></i><p>${st==="loading"?"正在拉取最新内容…":"暂无内容"}</p></div>`;
  }else{
    const expanded = state.expanded.has(src.id);
    const show = expanded ? items.slice(0, 30) : items.slice(0, 3);
    body = `<div class="ios-card">${show.map(newsItemHtml).join("")}`;
    if(items.length > 3){
      body += `<button class="card-footer${expanded?" open":""}" data-more="${esc(src.id)}">${expanded?"收起":"查看更多来自此源的新闻"}<i class="fas fa-chevron-down"></i></button>`;
    }
    body += `</div>`;
  }
  return `<div class="sk-group" data-srcgroup="${esc(src.id)}">
    <div class="group-label"><span>来自 ${esc(src.name)}</span>${groupStatusHtml(st)}</div>
    ${body}
  </div>`;
}
function skeletonHtml(){
  return `<div class="sk-group"><div class="sk-label"></div><div class="sk-card">
    <div class="sk-row w80"></div><div class="sk-row"></div><div class="sk-row w60"></div><div class="sk-row w80"></div>
  </div></div>`;
}
function renderHome(){
  const box = $("#homeList");
  updateHomeStatus();
  if(state.searchKw){
    const kw = state.searchKw.toLowerCase();
    const matched = [];
    Object.values(allItems()).forEach(c => (c.items||[]).forEach(n => { if((n.title||"").toLowerCase().includes(kw)) matched.push(n); }));
    matched.sort((a,b)=>Date.parse(b.pubDate)-Date.parse(a.pubDate));
    box.innerHTML = matched.length
      ? `<div class="group-label"><span>搜索结果（${matched.length}）</span></div><div class="ios-card">${matched.slice(0,60).map(newsItemHtml).join("")}</div>`
      : `<div class="flat-empty"><i class="fas fa-search"></i>没有找到匹配「${esc(state.searchKw)}」的新闻</div>`;
    bindNewsEvents(box);
    return;
  }
  const cacheMap = allItems();
  const hasAny = Object.values(cacheMap).some(c => (c.items||[]).length);
  if(!hasAny && !Object.keys(state.srcState).some(k => state.srcState[k]==="ok")){
    if(!booted || Object.values(state.srcState).some(k=>k==="loading"||k==="pending")){
      box.innerHTML = skeletonHtml() + skeletonHtml() + skeletonHtml();
      return;
    }
  }
  if(!state.sources.length){
    box.innerHTML = `<div class="flat-empty"><i class="fas fa-rss"></i>还没有订阅任何源<br><button class="btn" data-goto="market" style="margin-top:14px"><i class="fas fa-store"></i> 去源市场逛逛</button></div>`;
    return;
  }
  box.innerHTML = state.sources.map(src => sourceGroupHtml(src, (cacheMap[src.id] && cacheMap[src.id].items) || [])).join("");
  bindNewsEvents(box);
  $$("#homeList [data-retry]").forEach(b => b.onclick = () => { const s = state.sources.find(x=>x.id===b.dataset.retry); if(s) fetchSource(s); });
  $$("#homeList [data-more]").forEach(b => b.onclick = () => {
    const id = b.dataset.more;
    state.expanded.has(id) ? state.expanded.delete(id) : state.expanded.add(id);
    renderHome();
  });
  $$("#homeList [data-goto]").forEach(b => b.onclick = () => go(b.dataset.goto));
}
function bindNewsEvents(root){
  root.querySelectorAll(".news-row").forEach(el => {
    el.addEventListener("click", e => {
      if(e.target.closest(".news-fav")) return;
      openNews(el.dataset.guid);
    });
  });
  root.querySelectorAll(".news-fav").forEach(b => {
    b.onclick = e => { e.stopPropagation(); toggleFav(b.dataset.guid); };
  });
}
function findNews(guid){
  for(const c of Object.values(allItems())){ const n = (c.items||[]).find(x=>x.guid===guid); if(n) return n; }
  return null;
}
function openNews(guid){
  const n = findNews(guid); if(!n || !n.link) return;
  state.readSet.add(guid);
  state.history = [guid, ...state.history.filter(g => g !== guid)].slice(0, 200);
  saveAll();
  renderHome();
  window.open(n.link, "_blank", "noopener");
}
function toggleFav(guid){
  state.favSet.has(guid) ? state.favSet.delete(guid) : state.favSet.add(guid);
  saveAll(); renderHome(); renderFav();
  toast(state.favSet.has(guid) ? "已加入收藏" : "已取消收藏");
}

function renderFav(){
  const list = [...state.favSet].map(findNews).filter(Boolean);
  $("#favList").innerHTML = list.length
    ? list.map(newsItemHtml).join("")
    : `<div class="flat-empty"><i class="far fa-star"></i>暂无收藏<br><span style="font-size:12px">点击新闻右侧的星标即可收藏</span></div>`;
  bindNewsEvents($("#favList"));
}
function renderHistory(){
  const list = state.history.map(findNews).filter(Boolean);
  $("#historyList").innerHTML = list.length
    ? list.map(newsItemHtml).join("")
    : `<div class="flat-empty"><i class="far fa-clock"></i>暂无浏览历史</div>`;
  bindNewsEvents($("#historyList"));
}

function renderMarketTabs(){
  $("#marketTabs").innerHTML = MARKET_CATS.map(c =>
    `<button class="${state.marketCat===c.id?"on":""}" data-cat="${c.id}">${c.name}</button>`).join("");
  $$("#marketTabs button").forEach(t => t.onclick = () => { state.marketCat = t.dataset.cat; renderMarket(); });
}
function renderMarket(){
  renderMarketTabs();
  const kw = ($("#marketSearch").value || "").trim().toLowerCase();
  let list = MARKET_SOURCES;
  if(state.marketCat !== "all") list = list.filter(s => s.cat === state.marketCat);
  if(kw) list = list.filter(s => s.name.toLowerCase().includes(kw) || s.desc.toLowerCase().includes(kw));
  $("#marketList").innerHTML = list.length ? list.map(s => {
    const added = state.sources.some(x => x.url === s.url);
    return `<div class="market-card">
      <h4>${esc(s.name)} <span class="cat-mini">${esc(s.catName)}</span></h4>
      <p>${esc(s.desc)}</p>
      <div class="market-url">${esc(s.url)}</div>
      <div class="market-actions">
        <button class="btn ${added?"added":""}" data-mkt="${esc(s.id)}">${added?"已添加":"添加"}</button>
      </div>
    </div>`;
  }).join("") : `<div class="flat-empty"><i class="fas fa-search"></i>没有找到匹配的源</div>`;
  $$("#marketList [data-mkt]").forEach(b => b.onclick = () => {
    const s = MARKET_SOURCES.find(x => x.id === b.dataset.mkt);
    const i = state.sources.findIndex(x => x.url === s.url);
    if(i > -1){
      const removed = state.sources[i];
      state.sources.splice(i,1);
      delete state.cache[removed.id];
      toast("已移除：" + s.name);
    }else{
      const ns = {id:uid(), name:s.name, url:s.url};
      state.sources.push(ns); toast("已添加：" + s.name); fetchSource(ns);
    }
    saveAll(); renderMarket(); renderHome(); renderMySources();
  });
}

function renderMySources(){
  $("#srcCount").textContent = state.sources.length;
  $("#mySources").innerHTML = state.sources.map(s =>
    `<div class="my-src-row"><span class="nm">${esc(s.name)}</span>
     <button class="del" data-del="${esc(s.id)}"><i class="fas fa-trash"></i></button></div>`).join("")
    || `<div class="flat-empty" style="padding:26px">暂无订阅源</div>`;
  $$("#mySources [data-del]").forEach(b => b.onclick = () => {
    const s = state.sources.find(x => x.id === b.dataset.del);
    if(s && confirm(`确定删除「${s.name}」吗？`)){
      state.sources = state.sources.filter(x => x.id !== s.id);
      delete state.cache[s.id]; delete state.srcState[s.id];
      saveAll(); saveCache(); renderMySources(); renderHome();
    }
  });
}
function bindSettings(){
  $("#setTheme").value = state.settings.theme;
  $("#setFont").value = state.settings.fontSize;
  $("#setView").value = state.settings.viewMode;
  $("#setTheme").onchange = e => { state.settings.theme = e.target.value; applyTheme(); saveAll(); };
  $("#setFont").onchange = e => { state.settings.fontSize = e.target.value; applyTheme(); saveAll(); };
  $("#setView").onchange = e => { state.settings.viewMode = e.target.value; saveAll(); renderHome(); };

  $("#srcAdd").onclick = () => {
    const name = $("#srcName").value.trim(), url = $("#srcUrl").value.trim();
    if(!name || !url){ toast("请填写源名称和 RSS 地址"); return; }
    if(state.sources.some(s => s.url === url)){ toast("该源已存在"); return; }
    const ns = {id:uid(), name, url};
    state.sources.push(ns); saveAll();
    $("#srcName").value = ""; $("#srcUrl").value = "";
    renderMySources(); renderHome(); fetchSource(ns);
    toast("添加成功，正在拉取…");
  };
  $("#srcTest").onclick = async () => {
    const url = $("#srcUrl").value.trim(), box = $("#srcTestResult");
    if(!url){ box.innerHTML = `<div class="fail">请先填写 RSS 地址</div>`; return; }
    box.innerHTML = `<span style="color:var(--text-3)"><i class="fas fa-circle-notch fa-spin"></i> 正在测试…</span>`;
    try{
      const r2j = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(url);
      const data = JSON.parse(await fetchText(r2j, 8000));
      const items = parseJsonItems(data, {id:"t",name:"测试"});
      box.innerHTML = `<span class="ok"><i class="fas fa-check"></i> 测试成功！发现 ${items.length} 条新闻</span>`;
    }catch(e){ box.innerHTML = `<span class="fail"><i class="fas fa-xmark"></i> 测试失败：${esc(e.message||"无法访问")}</span>`; }
  };

  const dl = (content, mime, name) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([content], {type:mime}));
    a.download = name; a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href), 3000);
  };
  $("#expJson").onclick = () => dl(JSON.stringify(state.sources, null, 2), "application/json", "tns_v3_sources.json");
  $("#impJson").onclick = () => $("#fileJson").click();
  $("#fileJson").onchange = async e => {
    const f = e.target.files[0]; if(!f) return;
    try{
      const arr = JSON.parse(await f.text());
      if(!Array.isArray(arr)) throw new Error("格式不正确");
      state.sources = arr.map(s => ({id:s.id||uid(), name:s.name||"未命名", url:s.url}));
      saveAll(); renderMySources(); refreshAll();
      toast("导入成功，共 " + arr.length + " 个源");
    }catch(err){ toast("导入失败：" + err.message); }
    e.target.value = "";
  };
  $("#expOpml").onclick = () => {
    let o = `<?xml version="1.0" encoding="UTF-8"?>\n<opml version="2.0">\n<head><title>TNS V3</title></head>\n<body>\n`;
    state.sources.forEach(s => { o += `  <outline text="${esc(s.name)}" title="${esc(s.name)}" type="rss" xmlUrl="${esc(s.url)}"/>\n`; });
    o += `</body>\n</opml>`;
    dl(o, "text/xml", "tns_v3.opml");
  };
  $("#impOpml").onclick = () => $("#fileOpml").click();
  $("#fileOpml").onchange = async e => {
    const f = e.target.files[0]; if(!f) return;
    try{
      const xml = new DOMParser().parseFromString(await f.text(), "text/xml");
      const outs = xml.querySelectorAll("outline[type='rss'],outline[xmlUrl]");
      const arr = [];
      outs.forEach(o => {
        const u = o.getAttribute("xmlUrl") || "";
        if(u) arr.push({id:uid(), name:o.getAttribute("title")||o.getAttribute("text")||"未命名", url:u});
      });
      if(!arr.length) throw new Error("未找到有效RSS源");
      state.sources = arr; saveAll(); renderMySources(); refreshAll();
      toast("OPML 导入成功，共 " + arr.length + " 个源");
    }catch(err){ toast("导入失败：" + err.message); }
    e.target.value = "";
  };
  $("#btnClearHistory").onclick = () => {
    if(confirm("确定清空全部浏览历史吗？")){ state.history = []; saveAll(); renderHistory(); toast("历史已清空"); }
  };

  $$("[data-view]").forEach(el => {
    if(el.classList.contains("set-row")) el.onclick = () => go(el.dataset.view);
  });
  $("#backFromChangelog").onclick = () => go("settings");
  $("#backFromHelp").onclick = () => go("settings");
  $("#backFromPrivacy").onclick = () => go("settings");
  $("#backFromAgreement").onclick = () => go("settings");
  $("#backFromBrowser").onclick = () => go("settings");
}

/* ---------- 文档视图渲染工具 ---------- */
function docTitle(text){ return `<h3 style="font-size:18px;font-weight:600;margin:0 0 6px;color:var(--text)">${text}</h3>`; }
function docSub(text){ return `<p style="font-size:13px;color:var(--text-2);margin:0 0 20px">${text}</p>`; }
function docH2(text){ return `<h4 style="font-size:15px;font-weight:600;color:var(--text);margin:22px 0 8px">${text}</h4>`; }
function docP(text){ return `<p style="font-size:14px;color:var(--text-2);line-height:1.85;margin:0 0 10px">${text}</p>`; }
function docUl(items){ return `<ul style="padding-left:20px;color:var(--text-2);font-size:14px;line-height:1.95;margin:0 0 12px">${items.map(t=>`<li>${t}</li>`).join("")}</ul>`; }

/* ---------- 更新日志 ---------- */
function renderChangelog(){
  const box = $("#changelogBox");
  box.innerHTML = `
    ${docTitle("TNS 资讯 1.0.0 更新日志")}
    ${docSub("发布于 2026 年 10 月 06 日")}

    ${docP("TNS 资讯 1.0.0 是一次全新起点。本次更新围绕界面设计、加载体验与使用方式进行了系统性的重构，以下为主要更新内容。")}

    ${docH2("天气")}
    ${docP("天气模块的界面经过重新设计，你可以更轻松、不打扰地查看天气信息。天气栏与页面其他部分在视觉上保持一致，展开后可查看湿度、风速、体感温度、能见度以及未来三日预报。")}

    ${docH2("设计")}
    ${docP("TNS 资讯现已采用 iOS 原生设计语言。界面引入大标题与分组卡片，信息层级更加清晰，阅读体验更加自然。")}
    ${docUl([
      "标题、卡片与按钮的圆角、间距与配色均经过统一规范。",
      "界面在浅色、深色与 OLED 纯黑模式下均经过适配。"
    ])}

    ${docH2("性能")}
    ${docP("首页加载体验经过改进。首屏现已采用骨架屏占位，在新闻数据到达之前，页面框架会立即呈现，不会出现空白等待。")}
    ${docUl([
      "骨架屏在打开页面时立即显示。",
      "新闻数据到达后自动填充至已呈现的框架中。"
    ])}

    ${docSub("Copyright © 2026 TNS 资讯。保留所有权利。")}
  `;
}

/* ---------- 兼容性检测 ---------- */
function renderBrowserCheck(){
  const box = $("#browserBox");
  const checks = [
    { name: "Fetch API", desc: "用于加载新闻和天气数据", test: () => typeof fetch !== "undefined" },
    { name: "Promise", desc: "异步操作支持", test: () => typeof Promise !== "undefined" },
    { name: "async/await", desc: "异步语法支持", test: () => { try{ new Function("async function t(){}"); return true; }catch(e){ return false; } } },
    { name: "可选链 (?.)", desc: "现代 JavaScript 语法", test: () => { try{ new Function("let o={};return o?.x;"); return true; }catch(e){ return false; } } },
    { name: "CSS Grid", desc: "页面布局", test: () => { const d=document.createElement("div"); return d.style.grid !== undefined || d.style.gridTemplateColumns !== undefined; } },
    { name: "CSS 变量", desc: "主题切换", test: () => window.CSS && CSS.supports && CSS.supports("--test","0") },
    { name: "localStorage", desc: "数据存储", test: () => { try{ localStorage.setItem("t","1"); localStorage.removeItem("t"); return true; }catch(e){ return false; } } },
    { name: "prefers-color-scheme", desc: "深色模式跟随", test: () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").media !== "not all" },
    { name: "Geolocation", desc: "天气定位", test: () => navigator.geolocation !== undefined },
    { name: "MutationObserver", desc: "主题监听", test: () => typeof MutationObserver !== "undefined" }
  ];
  let pass = 0, fail = 0;
  const listHtml = checks.map(c => {
    const ok = c.test();
    ok ? pass++ : fail++;
    return `<div class="set-row" style="background:transparent">
      <span class="set-icon" style="background:${ok?'rgba(52,199,89,.18)':'rgba(255,59,48,.18)'};color:${ok?'var(--green)':'var(--red)'}"><i class="fas ${ok?'fa-check':'fa-times'}"></i></span>
      <div style="flex:1;min-width:0">
        <div style="font-size:15px;color:var(--text)">${c.name}</div>
        <div style="font-size:12px;color:var(--text-3)">${c.desc}</div>
      </div>
    </div>`;
  }).join("");
  let summaryColor = "var(--green)";
  let summaryIcon = "fa-check-circle";
  let summaryTitle = "浏览器兼容";
  let summaryDesc = `所有 ${pass} 项检测全部通过，可以正常使用 TNS 资讯。`;
  if(fail > 2){
    summaryColor = "var(--red)";
    summaryIcon = "fa-times-circle";
    summaryTitle = "浏览器不兼容";
    summaryDesc = `${fail} 项不支持，建议升级浏览器或更换 Chrome、Edge、Safari。`;
  } else if(fail > 0){
    summaryColor = "#FF9500";
    summaryIcon = "fa-exclamation-circle";
    summaryTitle = "基本兼容";
    summaryDesc = `${pass} 项通过，${fail} 项不支持，部分功能可能受限。`;
  }
  box.innerHTML = `
    <div style="padding:20px;text-align:center;background:${fail>2?'rgba(255,59,48,.08)':'rgba(52,199,89,.08)'};border-radius:14px;margin-bottom:16px">
      <i class="fas ${summaryIcon}" style="font-size:40px;color:${summaryColor};margin-bottom:8px"></i>
      <h3 style="font-size:17px;font-weight:600;margin:0 0 4px">${summaryTitle}</h3>
      <p style="font-size:13px;color:var(--text-2);margin:0">${summaryDesc}</p>
    </div>
    <div class="ios-card">${listHtml}</div>
    <p style="font-size:12px;color:var(--text-3);text-align:center;margin-top:16px">Copyright © 2026 TNS 资讯。保留所有权利。</p>
  `;
}

function go(view){
  if(!$("#view-" + view)) view = "home";
  $$(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + view));
  $$(".rail-item,.tb-item").forEach(b => b.classList.toggle("active", b.dataset.view === view));
  if(location.hash !== "#/" + view) history.replaceState(null, "", "#/" + view);
  if(view === "favorites") renderFav();
  if(view === "history") renderHistory();
  if(view === "market") renderMarket();
  if(view === "settings") renderMySources();
  if(view === "changelog") renderChangelog();
  if(view === "help") renderHelp();
  if(view === "privacy") renderPrivacy();
  if(view === "agreement") renderAgreement();
  if(view === "browser") renderBrowserCheck();
  window.scrollTo({top:0});
}
function routeFromHash(){
  const v = (location.hash || "").replace(/^#\//, "");
  go(v || "home");
}
window.addEventListener("hashchange", routeFromHash);

function updateHeaderH(){
  const h = $("#appHeader");
  if(h){
    const height = h.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--header-h", height + "px");
  }
}
function applyRail(){
  const rail = $("#navRail"), btn = $("#railToggle");
  if(!rail || !btn) return;
  const collapsed = lsGet("tns_v3_rail") === "1";
  rail.classList.toggle("collapsed", collapsed);
  document.documentElement.style.setProperty("--rail-w", collapsed ? "78px" : "220px");
  btn.innerHTML = `<i class="fas ${collapsed ? "fa-angles-right" : "fa-angles-left"}"></i>`;
  btn.title = collapsed ? "展开侧边栏" : "收起侧边栏";
  const railOpenBtn = $("#railOpenBtn");
  if(railOpenBtn) railOpenBtn.style.display = collapsed ? "flex" : "none";
}
function bindHeader(){
  $("#btnSearch").onclick = () => {
    const bar = $("#searchBar");
    const isOpen = bar.classList.toggle("show");
    if(isOpen) $("#searchInput").focus();
    else { $("#searchInput").value = ""; state.searchKw = ""; renderHome(); }
    updateHeaderH();
  };
  let deb = null;
  $("#searchInput").addEventListener("input", e => {
    clearTimeout(deb);
    deb = setTimeout(() => { state.searchKw = e.target.value.trim(); renderHome(); }, 220);
  });
  $("#searchClear").onclick = () => {
    $("#searchInput").value = ""; state.searchKw = "";
    $("#searchBar").classList.remove("show");
    renderHome(); updateHeaderH();
  };
  $("#btnRefresh").onclick = () => refreshAll();
  $("#btnSettingsTop").onclick = () => go("settings");
  let ticking = false;
  window.addEventListener("scroll", () => {
    if(ticking) return; ticking = true;
    requestAnimationFrame(() => {
      $("#appHeader").classList.toggle("compact", window.scrollY > 40);
      updateHeaderH(); ticking = false;
    });
  }, {passive:true});
  const rt = $("#railToggle");
  if(rt) rt.onclick = () => {
    lsSet("tns_v3_rail", lsGet("tns_v3_rail") === "1" ? "0" : "1");
    applyRail();
  };
  const railOpenBtn = $("#railOpenBtn");
  if(railOpenBtn) railOpenBtn.onclick = () => {
    lsSet("tns_v3_rail", "0");
    applyRail();
  };
  $$(".rail-item,.tb-item").forEach(b => b.onclick = () => go(b.dataset.view));
}

function maybeWelcome(){
  let meta = {};
  try{ meta = JSON.parse(lsGet(K.meta) || "{}"); }catch(e){}
  if(!meta.migrated || meta.welcomeShown) return;
  $("#welcomeModal").hidden = false;
  $("#welcomeOk").onclick = () => {
    $("#welcomeModal").hidden = true;
    meta.welcomeShown = true;
    lsSet(K.meta, JSON.stringify(meta));
  };
}

function boot(){
  migrate();
  loadAll();
  applyTheme();
  renderDate();
  setInterval(renderDate, 60000);
  bindHeader();
  bindSettings();
  updateHeaderH();
  window.addEventListener("resize", updateHeaderH);
  const hdr = $("#appHeader");
  if(hdr && window.ResizeObserver){
    new ResizeObserver(updateHeaderH).observe(hdr);
  }
  applyRail();
  routeFromHash();
  renderHome();
  booted = true;
  renderMySources();
  maybeWelcome();
  refreshAll();
  if(window.TNSWeather) TNSWeather.init("#hdrWeather");
}
document.addEventListener("DOMContentLoaded", boot);