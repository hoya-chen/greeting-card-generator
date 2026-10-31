/* ---------- full card ---------- */
function wrapLines(x,text,maxW,indentPx){
  const lines=[];let line="",first=true;
  for(const ch of text){
    const lim=first?maxW-indentPx:maxW;
    if(x.measureText(line+ch).width>lim && line){
      if("，。、！？：；」』）".includes(ch)){line+=ch;lines.push({t:line,first});line="";first=false;continue}
      lines.push({t:line,first});line=ch;first=false;
    } else line+=ch;
  }
  if(line) lines.push({t:line,first});
  return lines;
}
function recipient(){const v=$("toSel").value;return v==="__custom"?$("toCustom").value.trim():v}
function sender(){const v=$("fromSel").value;return v==="__custom"?$("fromIn").value.trim():v}
function curDesign(f){const l=designsOf(f);return l[tplIdx%l.length]}
function curPhrase(){const d=curDesign(cur);return phraseOf(Object.assign({},cur,d.phrase?{phrase:d.phrase}:{}))}
function drawCard(c){
  const d0=curDesign(cur);
  // a design may bring its own palette and phrase
  const f=Object.assign({},cur,d0.colors||{},d0.phrase?{phrase:d0.phrase}:{}), x=c.getContext("2d");
  x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,W,H);x.globalAlpha=1;
  // paper
  x.fillStyle=f.paper;x.fillRect(0,0,W,H);
  let g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,"rgba(255,255,255,.06)");g.addColorStop(1,"rgba(0,0,0,.25)");x.fillStyle=g;x.fillRect(0,0,W,H);
  x.globalAlpha=.07;x.fillStyle=f.gold;for(let yy=22;yy<H;yy+=44)for(let xx=22;xx<W;xx+=44){circle(x,xx,yy,2.2);x.fill()}x.globalAlpha=1;
  // template art
  x.save();x.beginPath();x.rect(44,44,W-88,H-88);x.clip();const phraseY=d0.draw(x,f);x.restore();
  // phrase
  x.save();x.fillStyle=f.gold;x.font=`700 72px ${DISP}`;x.textAlign="center";x.textBaseline="middle";
  x.shadowColor="rgba(0,0,0,.35)";x.shadowBlur=12;
  try{x.letterSpacing="20px"}catch(e){} x.fillText(phraseOf(f),W/2+10,phraseY);x.restore();
  // frame
  x.strokeStyle=f.gold;x.globalAlpha=.9;x.lineWidth=3;x.strokeRect(28,28,W-56,H-56);x.globalAlpha=.5;x.lineWidth=1;x.strokeRect(40,40,W-80,H-80);x.globalAlpha=1;
  const corner=(tx,ty,sx,sy)=>{x.save();x.translate(tx,ty);x.scale(sx*2,sy*2);x.lineWidth=1.5;x.strokeStyle=f.gold;
    x.beginPath();x.moveTo(4,40);x.lineTo(4,4);x.lineTo(40,4);x.moveTo(10,34);x.lineTo(10,10);x.lineTo(34,10);x.moveTo(10,22);x.lineTo(18,22);x.lineTo(18,14);x.stroke();
    x.fillStyle=f.gold;circle(x,18,14,2);x.fill();x.restore()};
  corner(16,16,1,1);corner(W-16,16,-1,1);corner(16,H-16,1,-1);corner(W-16,H-16,-1,-1);
  // header
  x.fillStyle=f.gold;x.textBaseline="top";x.textAlign="left";x.font=`700 72px ${DISP}`;x.fillText(f.name,96,86);
  x.fillStyle=INK;x.globalAlpha=.85;x.textAlign="right";x.font=`700 36px ${BODY}`;const o=occ(f);x.fillText(fmtDate(o.date),904,92);
  x.font=`32px ${BODY}`;x.fillText(`${o.gz}年　農曆${o.lunar}`,904,140);x.globalAlpha=1;
  // message panel
  const PT=965,PB=1335;
  x.fillStyle="rgba(0,0,0,.18)";x.fillRect(80,PT,W-160,PB-PT);
  x.strokeStyle=f.gold;x.globalAlpha=.6;x.lineWidth=1.5;x.strokeRect(80,PT,W-160,PB-PT);x.globalAlpha=1;
  x.textAlign="left";x.textBaseline="alphabetic";x.fillStyle=INK;
  // big text for elders; shrink only when a long (typed) message would overflow the panel
  const L=110,maxW=W-2*L,to=recipient(),from=sender(),msg=msgOf(f);
  let size=48,lines;
  for(;size>30;size-=2){x.font=`${size}px ${BODY}`;lines=wrapLines(x,msg,maxW,size*2);
    const rows=lines.length+(to?1:0)+(from?1:0);if(PT+size*1.25+(rows-1)*size*1.45<=PB-24)break}
  x.font=`${size}px ${BODY}`;lines=wrapLines(x,msg,maxW,size*2);
  const lh=Math.round(size*1.45);let y=PT+size*1.25;
  if(to){x.font=`700 ${size}px ${BODY}`;x.fillText(`親愛的${to}：`,L,y);y+=lh}
  x.font=`${size}px ${BODY}`;
  for(const ln of lines){x.fillText(ln.t,ln.first?L+size*2:L,y);y+=lh}
  if(from){x.font=`700 ${size}px ${BODY}`;x.textAlign="right";x.fillText(from,W-L,Math.max(y,PB-24))}
  c.setAttribute("aria-label",`${year} ${f.name}賀卡：${phraseOf(f)}。${to?"親愛的"+to+"："+" ":""}${msg}${from?" "+from:""}`);
}

/* ---------- UI ---------- */
// default: the next festival from today, in whatever year it falls
function pickDefault(){
  for(const y of YEARS){const hit=FESTS.filter(f=>dayDiff(TABLE[y][f.id][0])>=0).sort((a,b)=>TABLE[y][a.id][0]<TABLE[y][b.id][0]?-1:1)[0];
    if(hit) return {y,f:hit,d:dayDiff(TABLE[y][hit.id][0])}}
  return {y:YEARS[YEARS.length-1],f:FESTS[0],d:null};
}
function buildYears(){
  const sel=$("yearSel");YEARS.forEach(y=>{const o=document.createElement("option");o.value=y;o.textContent=`${y} 年（${ganzhi(y)}・${ZOD[(y-4)%12]}年）`;sel.appendChild(o)});
  sel.addEventListener("change",()=>{year=Number(sel.value);buildChips();render(true)});
}
let cat="cn";
// festivals of the chosen group, in date order for the chosen year
function festsOf(c){return FESTS.filter(f=>f.cat===c).sort((a,b)=>TABLE[year][a.id][0]<TABLE[year][b.id][0]?-1:1)}
function buildChips(){
  const box=$("festChips");box.textContent="";
  festsOf(cat).forEach(f=>{
    const b=document.createElement("button");b.type="button";b.className="chip";b.dataset.id=f.id;
    const [,m,d]=TABLE[year][f.id][0].split("-").map(Number);b.innerHTML=`${f.name}<small>${m}/${d}</small>`;b.addEventListener("click",()=>select(f.id));box.appendChild(b)});
}
function render(anim){
  const c=$("card");drawCard(c);
  // fetch the next landscape photo ahead of time so 換一張 shows it at once
  const list=designsOf(cur),nx=list[(tplIdx+1)%list.length];if(nx.photo)photoImg(nx.photo);
  const o=occ(cur);$("dateNote").textContent=`日期自動帶入：${fmtDate(o.date)}，${o.gz}年 農曆${o.lunar}`;
  $("motifNote").textContent=`${cur.name}${STYLES[styleOf(curDesign(cur))]}圖 ${tplIdx%list.length+1}／${list.length}：${curDesign(cur).motif}`;
  document.querySelectorAll("#catSeg button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.cat===cat)));
  document.querySelectorAll("#styleSeg button").forEach(b=>{const n=cur.designs.filter(d=>styleOf(d)===b.dataset.style).length;
    b.innerHTML=`${STYLES[b.dataset.style]}<small>${n}張</small>`;b.setAttribute("aria-pressed",String(b.dataset.style===artStyle))});
  document.querySelectorAll(".chip").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.id===cur.id)));
  if(anim){c.classList.remove("flip");void c.offsetWidth;c.classList.add("flip")}
}
function select(id){cur=FESTS.find(f=>f.id===id);msgIdx=0;tplIdx=0;render(true)}
function cardText(){
  const to=recipient(),from=sender(),lines=[];
  if(to)lines.push(`親愛的${to}：`);lines.push(`【${cur.name}・${curPhrase()}】`);lines.push(msgOf(cur));if(from)lines.push(from);
  return lines.join("\n");
}

$("toSel").addEventListener("change",()=>{const cu=$("toSel").value==="__custom";$("toCustom").disabled=!cu;if(cu)$("toCustom").focus();render(false)});
$("toCustom").addEventListener("input",()=>render(false));
$("fromIn").addEventListener("input",()=>render(false));

/* ---------- custom name menus (so elders only tap, never type) ---------- */
// Set up once on the elder's own phone; the lists are kept in this browser (localStorage).
const SITE_URL="https://greeting-card-generator.hoya-chen.workers.dev/";
const BUILTIN_TO=[...$("toSel").options].map(o=>o.value).filter(v=>v!=="__custom");
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const splitNames=t=>[...new Set((t||"").split(/[\n,，、;；]+/).map(s=>s.trim()).filter(Boolean))].slice(0,30);
let menus={from:["Ted"],to:[]};
try{const m=JSON.parse(store.get("menus")||"null");if(m&&Array.isArray(m.from))menus={from:m.from,to:Array.isArray(m.to)?m.to:[]}}catch(e){}
function fillSelect(sel,items,keep){
  sel.textContent="";
  for(const v of items){const o=document.createElement("option");o.value=o.textContent=v;sel.append(o)}
  const c=document.createElement("option");c.value="__custom";c.textContent="自己輸入…";sel.append(c);
  sel.value=items.includes(keep)?keep:(items[0]??"__custom");
}
function applyMenus(){
  const pick=(()=>{try{return JSON.parse(store.get("pick")||"{}")}catch(e){return {}}})();
  fillSelect($("toSel"),[...menus.to,...BUILTIN_TO.filter(v=>!menus.to.includes(v))],pick.to??$("toSel").value);
  fillSelect($("fromSel"),menus.from,pick.from);
  $("toCustom").disabled=$("toSel").value!=="__custom";
  $("fromCustomBox").hidden=$("fromSel").value!=="__custom";
  $("menuFrom").value=menus.from.join("\n");$("menuTo").value=menus.to.join("\n");
}
const rememberPick=()=>store.set("pick",JSON.stringify({to:$("toSel").value,from:$("fromSel").value}));
$("toSel").addEventListener("change",rememberPick);
$("fromSel").addEventListener("change",()=>{const cu=$("fromSel").value==="__custom";$("fromCustomBox").hidden=!cu;if(cu)$("fromIn").focus();rememberPick();render(false)});
function readMenus(){return {from:splitNames($("menuFrom").value),to:splitNames($("menuTo").value)}}
$("menuSave").addEventListener("click",()=>{menus=readMenus();store.set("menus",JSON.stringify(menus));applyMenus();render(false);
  $("menuNote").textContent="已儲存，這支手機下次打開也會記得。";$("menuBox").open=false});
applyMenus();
$("shuffle").addEventListener("click",()=>{msgIdx++;render(false)});
$("swapArt").addEventListener("click",()=>{tplIdx++;render(true)});
// 中國節日／西洋節日: show only that group, and pick its next festival from today
$("catSeg").addEventListener("click",e=>{const b=e.target.closest("button");if(!b||b.dataset.cat===cat)return;
  cat=b.dataset.cat;const l=festsOf(cat);cur=l.find(f=>dayDiff(TABLE[year][f.id][0])>=0)||l[0];msgIdx=0;tplIdx=0;
  $("nextNote").textContent="";buildChips();render(true)});
// 卡通／風景／傳統, remembered on this phone
$("styleSeg").addEventListener("click",e=>{const b=e.target.closest("button");if(!b||b.dataset.style===artStyle)return;
  artStyle=b.dataset.style;store.set("style",artStyle);tplIdx=0;render(true)});
if(STYLES[store.get("style")])artStyle=store.get("style");
$("copy").addEventListener("click",()=>{
  const text=cardText(),note=$("copyNote");
  navigator.clipboard.writeText(text).then(()=>{note.textContent="已複製，可以貼到 LINE 或訊息裡。"},
    ()=>{note.textContent="無法自動複製，請長按下面這段文字複製：\n"+text;note.style.whiteSpace="pre-line"});
});
let downloadsApi=null, lastUrl=null;
const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
const phone=matchMedia("(pointer:coarse)").matches;
if(!window.claude&&phone)$("dl").textContent="儲存／分享賀卡";
// Viewers who only have the share link are not granted the download capability and the frame blocks
// download links, so they get the card as a plain image to save with a long press or right click.
const PHOTO_MISSING="這張風景照還沒下載到，請連上網路後再試一次，或按「換一張」改用其他樣板。";
const SAVE_TIP="手機請長按圖片，選「儲存圖片」；電腦請在圖片上按右鍵，選「另存圖片」。";
// tip: what to do with the picture; lineHref: optional link that sends the greeting text through LINE
function showImage(blob,tip,lineHref){
  if(lastUrl)URL.revokeObjectURL(lastUrl);
  lastUrl=URL.createObjectURL(blob);
  $("saveImg").src=lastUrl;$("saveImg").alt=`${year} ${cur.name}賀卡`;
  $("saveTip").textContent=tip||SAVE_TIP;
  const a=$("saveLine");a.hidden=!lineHref;if(lineHref)a.href=lineHref;
  $("saveBox").hidden=false;$("saveClose").focus();
}
function hideImage(){$("saveBox").hidden=true}
$("saveClose").addEventListener("click",hideImage);
$("saveBox").addEventListener("click",e=>{if(e.target===$("saveBox"))hideImage()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("saveBox").hidden)hideImage()});
$("dl").addEventListener("click",async()=>{
  const note=$("copyNote");
  const standalone=!window.claude;
  try{
    if(!await photoReady(curDesign(cur))){note.textContent=PHOTO_MISSING;return}
    const c=document.createElement("canvas");c.width=W;c.height=H;drawCard(c);
    const blob=await new Promise(r=>c.toBlob(r,"image/png"));
    const filename=`${year}${cur.name}賀卡.png`;
    const file=typeof File==="function"?new File([blob],filename,{type:"image/png"}):null;
    if(standalone&&phone&&file&&navigator.canShare&&navigator.canShare({files:[file]})){
      // phones (and the installed app): the share sheet offers "儲存影像" and LINE directly
      try{await navigator.share({files:[file],title:`${year} ${cur.name}賀卡`});note.textContent="已開啟分享選單，可選「儲存影像」或傳到 LINE。"}
      catch(e){if(e&&e.name==="AbortError"){note.textContent="已取消。"}else{showImage(blob);note.textContent="請長按圖片，選「儲存圖片」。"}}
    } else if(standalone&&phone&&isIOS){ // older iPhones: no file sharing, and download links misbehave in the installed app
      showImage(blob);note.textContent="請長按圖片，選「加入照片」。";
    } else if(standalone){ // opened as a plain web page: use an ordinary download link
      const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),5000);
      note.textContent="賀卡圖片已下載。";
    } else if(downloadsApi){
      try{await downloadsApi.save({filename,data:blob});note.textContent="賀卡圖片已下載。"}
      catch(e){if(e&&e.code==="declined"){note.textContent="已取消下載。"}else{showImage(blob);note.textContent="這裡無法直接下載，請長按圖片儲存。"}}
    } else {showImage(blob);note.textContent="請長按（電腦按右鍵）圖片，選「儲存圖片」。"}
  }catch(e){console.error(e);note.textContent="產生圖片沒有成功，請改用截圖保存賀卡。"}
});

/* ---------- share to LINE / WeChat ---------- */
// Websites cannot post a picture straight into LINE or WeChat. Phones get the system share sheet with the
// card attached (LINE and WeChat both appear there); everywhere else the card pops up to be saved and sent by hand.
const ua=navigator.userAgent, inWeChat=/MicroMessenger/i.test(ua), inLine=/\bLine\//.test(ua);
const lineTextHref=()=>"https://line.me/R/share?text="+encodeURIComponent(cardText());
async function shareTo(app){
  const note=$("shareNote"), name=app==="line"?"LINE":"微信";
  let blob,file;
  try{
    if(!await photoReady(curDesign(cur))){note.textContent=PHOTO_MISSING;return}
    const c=document.createElement("canvas");c.width=W;c.height=H;drawCard(c);
    blob=await new Promise(r=>c.toBlob(r,"image/png"));
    file=typeof File==="function"?new File([blob],`${year}${cur.name}賀卡.png`,{type:"image/png"}):null;
  }catch(e){console.error(e);note.textContent="產生圖片沒有成功，請改用截圖保存賀卡。";return}
  if(phone&&file&&navigator.canShare&&navigator.canShare({files:[file]})){
    note.textContent=`在分享選單裡點「${name}」，再選要傳給誰。`+(app==="wx"?"沒看到微信的話，請把選單往右滑，點「更多」。":"");
    try{await navigator.share({files:[file],title:`${year} ${cur.name}賀卡`});note.textContent="已分享，祝節日快樂！";return}
    catch(e){if(e&&e.name==="AbortError"){note.textContent="已取消分享。";return}} // other errors: fall through to the picture
  }
  let tip;
  if(app==="wx"&&inWeChat) tip="長按圖片，選「發送給朋友」。";
  else if(app==="line"&&inLine) tip="長按圖片儲存，再到 LINE 聊天室按「＋」或相片圖示傳送。也可以用下面的按鈕傳祝賀文字。";
  else if(phone&&app==="line") tip="長按圖片，選「儲存圖片」，再到 LINE 聊天室傳送這張照片。也可以用下面的按鈕傳祝賀文字。";
  else if(phone) tip="長按圖片，選「儲存圖片」，再到微信聊天室按「＋」→「相冊」傳送。";
  else tip=`在圖片上按右鍵，選「另存圖片」，再把圖片拖進${name}電腦版的聊天室。`;
  showImage(blob,tip,app==="line"&&phone?lineTextHref():null);
  note.textContent=`已打開賀卡圖片，照著圖片下方的說明傳到${name}。`;
}
if(!window.claude){ // the artifact frame blocks share sheets and outside links, so sharing is for the real website only
  $("shareBox").hidden=false;
  $("shareLine").addEventListener("click",()=>shareTo("line"));
  $("shareWx").addEventListener("click",()=>shareTo("wx"));
  if(inWeChat)$("shareNote").textContent="你正在微信裡，按「傳到微信」後長按圖片就能發送給朋友。";
}
// In the Claude artifact, point people to the real website (install icon, sharing and offline only work there).
if(window.claude){
  $("siteBar").hidden=false;
  $("siteCopy").addEventListener("click",()=>{const b=$("siteCopy");
    navigator.clipboard.writeText(SITE_URL).then(()=>{b.textContent="已複製，貼到瀏覽器打開"},()=>{b.textContent="請長按上面的網址複製"})});
}
if(window.claude)(async()=>{try{downloadsApi=await window.claude.use("downloads")}catch(e){}if(!downloadsApi)$("dl").textContent="看圖並儲存"})();

const def=pickDefault();year=def.y;cur=def.f;cat=cur.cat;
buildYears();$("yearSel").value=String(year);buildChips();
if(def.d!==null)$("nextNote").textContent=def.d===0?`今天就是${cur.name}！`:`最近的節日是 ${year} 年${cur.name}，還有 ${def.d} 天，已幫你選好。`;
render(false);
// redraw once the web fonts arrive so canvas text uses them
Promise.all([document.fonts.load(`700 60px "LXGW WenKai TC"`,"重陽節冬至聖誕元旦春宵母親端午父中秋福壽安康團圓添歲平喜樂新禧三羊開泰花好月慈恩永念如山金獻瑞家紫燕迎戶歡元宵樂2027"),
  document.fonts.load(`44px "LXGW WenKai TC"`,"親愛的爸媽爺奶外公婆岳父母各位長輩同學敬上"),
  document.fonts.load(`44px "TW-Kai"`,"親愛的")])
  .catch(()=>{}).then(()=>document.fonts.ready).then(()=>render(false));

// App install (PWA). Only on the real website: the artifact frame has no service worker or install.
if(!window.claude&&"serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost")){
  addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(e=>console.warn("sw",e)));
  const installed=matchMedia("(display-mode: standalone)").matches||navigator.standalone;
  const box=$("installBox"),btn=$("installBtn"),note=$("installNote");
  let promptEvt=null;
  addEventListener("beforeinstallprompt",e=>{e.preventDefault();promptEvt=e;box.hidden=false;btn.hidden=false;
    note.textContent="裝好後會出現在桌面，沒有網路也能做賀卡。"});
  btn.addEventListener("click",async()=>{if(!promptEvt)return;promptEvt.prompt();
    const r=await promptEvt.userChoice;promptEvt=null;btn.hidden=true;
    note.textContent=r.outcome==="accepted"?"已安裝，可以從桌面的「賀卡坊」打開。":"之後想安裝，可以從瀏覽器選單選「加到主畫面」。"});
  addEventListener("appinstalled",()=>{btn.hidden=true;note.textContent="已安裝，可以從桌面的「賀卡坊」打開。"});
  if(isIOS&&!installed){box.hidden=false;note.textContent="想裝成 App：用 Safari 打開，按下方「分享」鈕，再選「加入主畫面」。"}
}
