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
function curDesign(f){return f.designs[tplIdx%f.designs.length]}
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
  x.fillStyle=f.gold;x.textBaseline="top";x.textAlign="left";x.font=`700 60px ${DISP}`;x.fillText(f.name,96,92);
  x.fillStyle=INK;x.globalAlpha=.85;x.textAlign="right";x.font=`26px ${BODY}`;const o=occ(f);x.fillText(fmtDate(o.date),904,100);
  x.font=`24px ${BODY}`;x.fillText(`${o.gz}年　農曆${o.lunar}`,904,138);x.globalAlpha=1;
  // message panel
  x.fillStyle="rgba(0,0,0,.18)";x.fillRect(80,975,W-160,350);
  x.strokeStyle=f.gold;x.globalAlpha=.6;x.lineWidth=1.5;x.strokeRect(80,975,W-160,350);x.globalAlpha=1;
  x.textAlign="left";x.textBaseline="alphabetic";x.fillStyle=INK;
  const L=120,maxW=W-2*L,lh=62;let y=1045;
  const to=recipient(),from=$("fromIn").value.trim(),msg=msgOf(f);
  if(to){x.font=`600 34px ${BODY}`;x.fillText(`親愛的${to}：`,L,y);y+=lh}
  x.font=`34px ${BODY}`;
  for(const ln of wrapLines(x,msg,maxW,68)){x.fillText(ln.t,ln.first?L+68:L,y);y+=lh}
  if(from){x.font=`600 34px ${BODY}`;x.textAlign="right";x.fillText(from,W-L,Math.max(y+4,1295))}
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
function buildChips(){
  const box=$("festChips");box.textContent="";
  [...FESTS].sort((a,b)=>TABLE[year][a.id][0]<TABLE[year][b.id][0]?-1:1).forEach(f=>{
    const b=document.createElement("button");b.type="button";b.className="chip";b.dataset.id=f.id;
    const [,m,d]=TABLE[year][f.id][0].split("-").map(Number);b.innerHTML=`${f.name}<small>${m}/${d}</small>`;b.addEventListener("click",()=>select(f.id));box.appendChild(b)});
}
function render(anim){
  const c=$("card");drawCard(c);
  // fetch the next landscape photo ahead of time so 換一張 shows it at once
  const nx=cur.designs[(tplIdx+1)%cur.designs.length];if(nx.photo)photoImg(nx.photo);
  const o=occ(cur);$("dateNote").textContent=`日期自動帶入：${fmtDate(o.date)}，${o.gz}年 農曆${o.lunar}`;
  $("motifNote").textContent=`${cur.name}樣板 ${tplIdx%cur.designs.length+1}／${cur.designs.length}：${curDesign(cur).motif}`;
  document.querySelectorAll(".chip").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.id===cur.id)));
  if(anim){c.classList.remove("flip");void c.offsetWidth;c.classList.add("flip")}
}
function select(id){cur=FESTS.find(f=>f.id===id);msgIdx=0;tplIdx=0;render(true)}
function cardText(){
  const to=recipient(),from=$("fromIn").value.trim(),lines=[];
  if(to)lines.push(`親愛的${to}：`);lines.push(`【${cur.name}・${curPhrase()}】`);lines.push(msgOf(cur));if(from)lines.push(from);
  return lines.join("\n");
}

$("toSel").addEventListener("change",()=>{const cu=$("toSel").value==="__custom";$("toCustom").disabled=!cu;if(cu)$("toCustom").focus();render(false)});
$("toCustom").addEventListener("input",()=>render(false));
$("fromIn").addEventListener("input",()=>render(false));
$("shuffle").addEventListener("click",()=>{msgIdx++;render(false)});
$("swapArt").addEventListener("click",()=>{tplIdx++;render(true)});
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
const SITE_URL="https://greeting-card-generator.hoya-chen.workers.dev/";
if(window.claude){
  $("siteBar").hidden=false;
  $("siteCopy").addEventListener("click",()=>{const b=$("siteCopy");
    navigator.clipboard.writeText(SITE_URL).then(()=>{b.textContent="已複製，貼到瀏覽器打開"},()=>{b.textContent="請長按上面的網址複製"})});
}
if(window.claude)(async()=>{try{downloadsApi=await window.claude.use("downloads")}catch(e){}if(!downloadsApi)$("dl").textContent="看圖並儲存"})();

const def=pickDefault();year=def.y;cur=def.f;
buildYears();$("yearSel").value=String(year);buildChips();
if(def.d!==null)$("nextNote").textContent=def.d===0?`今天就是${cur.name}！`:`最近的節日是 ${year} 年${cur.name}，還有 ${def.d} 天，已幫你選好。`;
render(false);
// redraw once the web fonts arrive so canvas text uses them
Promise.all([document.fonts.load(`700 60px "LXGW WenKai TC"`,"重陽節冬至聖誕元旦春宵母親端午父中秋福壽安康團圓添歲平喜樂新禧三羊開泰花好月慈恩永念如山金獻瑞家紫燕迎戶歡元宵樂2027"),
  document.fonts.load(`34px "Noto Serif TC"`,"親愛的"),document.fonts.load(`600 34px "Noto Serif TC"`,"親愛的")])
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
