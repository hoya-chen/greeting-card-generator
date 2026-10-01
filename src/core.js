const INK = "#fff3dc";
const FESTS = [];
function registerFest(def){FESTS.push(def)}
const $ = id => document.getElementById(id);
const W = 1000, H = 1400;
const DISP = '"LXGW WenKai TC","Kaiti TC","KaiTi",serif';
const BODY = '"Noto Serif TC","PMingLiU",serif';
let cur = null, msgIdx = 0, tplIdx = 0;

const CN="〇一二三四五六七八九";
function cnNum(n){if(n<=10)return n===10?"十":CN[n];const t=Math.floor(n/10),u=n%10;return (t>1?CN[t]:"")+"十"+(u?CN[u]:"")}
function fmtDate(iso){const [y,m,d]=iso.split("-").map(Number);return `${String(y).split("").map(c=>CN[c]).join("")}年${cnNum(m)}月${cnNum(d)}日`}
// [國曆日期, 農曆日期] per year and festival. Lunar festivals are checked against published tables
// (春節 2027-02-06 and 2030-02-03 follow the official calendars); other lunar dates come from the Chinese calendar.
const TABLE = {"2026":{"chongyang":["2026-10-18","九月初九"],"spring":["2026-02-17","正月初一"],"yuanxiao":["2026-03-03","正月十五"],"duanwu":["2026-06-19","五月初五"],"midautumn":["2026-09-25","八月十五"],"dongzhi":["2026-12-22","冬月十四"],"xmas":["2026-12-25","冬月十七"],"newyear":["2026-01-01","冬月十三"],"mother":["2026-05-10","三月廿四"],"father":["2026-08-08","六月廿六"]},"2027":{"chongyang":["2027-10-08","九月初九"],"spring":["2027-02-06","正月初一"],"yuanxiao":["2027-02-20","正月十五"],"duanwu":["2027-06-09","五月初五"],"midautumn":["2027-09-15","八月十五"],"dongzhi":["2027-12-22","冬月廿五"],"xmas":["2027-12-25","冬月廿八"],"newyear":["2027-01-01","冬月廿四"],"mother":["2027-05-09","四月初四"],"father":["2027-08-08","七月初七"]},"2028":{"chongyang":["2028-10-26","九月初九"],"spring":["2028-01-26","正月初一"],"yuanxiao":["2028-02-09","正月十五"],"duanwu":["2028-05-28","五月初五"],"midautumn":["2028-10-03","八月十五"],"dongzhi":["2028-12-21","冬月初六"],"xmas":["2028-12-25","冬月初十"],"newyear":["2028-01-01","臘月初五"],"mother":["2028-05-14","四月二十"],"father":["2028-08-08","六月十八"]},"2029":{"chongyang":["2029-10-16","九月初九"],"spring":["2029-02-13","正月初一"],"yuanxiao":["2029-02-27","正月十五"],"duanwu":["2029-06-16","五月初五"],"midautumn":["2029-09-22","八月十五"],"dongzhi":["2029-12-21","冬月十七"],"xmas":["2029-12-25","冬月廿一"],"newyear":["2029-01-01","冬月十七"],"mother":["2029-05-13","四月初一"],"father":["2029-08-08","六月廿九"]},"2030":{"chongyang":["2030-10-05","九月初九"],"spring":["2030-02-03","正月初一"],"yuanxiao":["2030-02-17","正月十五"],"duanwu":["2030-06-05","五月初五"],"midautumn":["2030-09-12","八月十五"],"dongzhi":["2030-12-22","冬月廿八"],"xmas":["2030-12-25","臘月初一"],"newyear":["2030-01-01","冬月廿八"],"mother":["2030-05-12","四月十一"],"father":["2030-08-08","七月初十"]},"2031":{"chongyang":["2031-10-24","九月初九"],"spring":["2031-01-23","正月初一"],"yuanxiao":["2031-02-06","正月十五"],"duanwu":["2031-06-24","五月初五"],"midautumn":["2031-10-01","八月十五"],"dongzhi":["2031-12-22","冬月初九"],"xmas":["2031-12-25","冬月十二"],"newyear":["2031-01-01","臘月初八"],"mother":["2031-05-11","閏三月二十"],"father":["2031-08-08","六月廿一"]},"2032":{"chongyang":["2032-10-12","九月初九"],"spring":["2032-02-11","正月初一"],"yuanxiao":["2032-02-25","正月十五"],"duanwu":["2032-06-12","五月初五"],"midautumn":["2032-09-19","八月十五"],"dongzhi":["2032-12-21","冬月十九"],"xmas":["2032-12-25","冬月廿三"],"newyear":["2032-01-01","冬月十九"],"mother":["2032-05-09","四月初一"],"father":["2032-08-08","七月初三"]},"2033":{"chongyang":["2033-10-01","九月初九"],"spring":["2033-01-31","正月初一"],"yuanxiao":["2033-02-14","正月十五"],"duanwu":["2033-06-01","五月初五"],"midautumn":["2033-09-08","八月十五"],"dongzhi":["2033-12-21","冬月三十"],"xmas":["2033-12-25","閏冬月初四"],"newyear":["2033-01-01","臘月初一"],"mother":["2033-05-08","四月初十"],"father":["2033-08-08","七月十四"]},"2034":{"chongyang":["2034-10-20","九月初九"],"spring":["2034-02-19","正月初一"],"yuanxiao":["2034-03-05","正月十五"],"duanwu":["2034-06-20","五月初五"],"midautumn":["2034-09-27","八月十五"],"dongzhi":["2034-12-22","冬月十二"],"xmas":["2034-12-25","冬月十五"],"newyear":["2034-01-01","閏冬月十一"],"mother":["2034-05-14","三月廿六"],"father":["2034-08-08","六月廿四"]},"2035":{"chongyang":["2035-10-09","九月初九"],"spring":["2035-02-08","正月初一"],"yuanxiao":["2035-02-22","正月十五"],"duanwu":["2035-06-10","五月初五"],"midautumn":["2035-09-16","八月十五"],"dongzhi":["2035-12-22","冬月廿三"],"xmas":["2035-12-25","冬月廿六"],"newyear":["2035-01-01","冬月廿二"],"mother":["2035-05-13","四月初六"],"father":["2035-08-08","七月初五"]},"2036":{"chongyang":["2036-10-27","九月初九"],"spring":["2036-01-28","正月初一"],"yuanxiao":["2036-02-11","正月十五"],"duanwu":["2036-05-30","五月初五"],"midautumn":["2036-10-04","八月十五"],"dongzhi":["2036-12-21","冬月初五"],"xmas":["2036-12-25","冬月初九"],"newyear":["2036-01-01","臘月初四"],"mother":["2036-05-11","四月十六"],"father":["2036-08-08","閏六月十七"]}};
const YEARS = Object.keys(TABLE).map(Number);
let year = YEARS[0];
const STEM="甲乙丙丁戊己庚辛壬癸", BRANCH="子丑寅卯辰巳午未申酉戌亥", ZOD="鼠牛虎兔龍蛇馬羊猴雞狗豬";
const ZPHRASE={子:"金鼠迎春",丑:"牛轉乾坤",寅:"虎虎生風",卯:"玉兔呈祥",辰:"龍騰盛世",巳:"金蛇獻瑞",午:"馬到成功",未:"三羊開泰",申:"金猴獻瑞",酉:"金雞報曉",戌:"旺年納福",亥:"金豬納福"};
// 元旦 (Jan 1) is always before 春節, so it still belongs to the previous lunar year
function lunarYear(f){return f.id==="newyear"?year-1:year}
function ganzhi(L){return STEM[(L-4)%10]+BRANCH[(L-4)%12]}
function occ(f){const [date,lunar]=TABLE[year][f.id];const L=lunarYear(f),gz=ganzhi(L);return {date,lunar,gz,zodiac:ZOD[(L-4)%12],zphrase:ZPHRASE[gz[1]]}}
function phraseOf(f){return fill(f.phrase,occ(f))}
function msgOf(f){return fill(f.msgs[msgIdx%f.msgs.length],occ(f))}
function fill(str,o){return str.replace(/\{Z\}/g,o.zodiac).replace(/\{P\}/g,o.zphrase)}
function dayDiff(iso){const t=new Date();t.setHours(0,0,0,0);return Math.round((new Date(iso+"T00:00:00")-t)/86400000)}

/* ---------- drawing helpers ---------- */
function rand(seed){let s=seed;return()=>{s=(s*9301+49297)%233280;return s/233280}}
function circle(x,cx,cy,r){x.beginPath();x.arc(cx,cy,r,0,Math.PI*2)}
function vText(x,str,cx,top,size,gap){x.textAlign="center";x.textBaseline="top";let y=top;for(const ch of str){x.fillText(ch,cx,y);y+=size+gap}}
function snow(x,f,seed,n,area){
  const r=rand(seed);x.save();x.strokeStyle=f.gold;x.lineWidth=2;
  for(let i=0;i<n;i++){const cx=area[0]+r()*(area[2]-area[0]),cy=area[1]+r()*(area[3]-area[1]),s=8+r()*14;x.globalAlpha=.35+r()*.4;
    x.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3;x.moveTo(cx,cy);x.lineTo(cx+Math.cos(a)*s,cy+Math.sin(a)*s)}x.stroke()}
  x.restore();
}
function stars(x,f,seed,n,area){
  const r=rand(seed);x.save();x.fillStyle=f.gold;
  for(let i=0;i<n;i++){x.globalAlpha=.3+r()*.6;circle(x,area[0]+r()*(area[2]-area[0]),area[1]+r()*(area[3]-area[1]),1+r()*2.6);x.fill()}
  x.restore();
}
function cloud(x,f,cx,cy,s,fill){
  // 祥雲: a row of curls
  x.save();x.translate(cx,cy);x.scale(s,s);x.lineWidth=4/s;x.strokeStyle=f.gold;x.fillStyle=fill;
  x.beginPath();x.moveTo(-120,20);x.bezierCurveTo(-130,-20,-80,-40,-60,-15);x.bezierCurveTo(-55,-55,10,-60,15,-20);
  x.bezierCurveTo(30,-50,90,-40,85,-5);x.bezierCurveTo(120,-10,130,20,110,20);x.closePath();x.fill();x.stroke();
  x.beginPath();x.arc(-60,-2,14,Math.PI,Math.PI*2.4);x.stroke();x.beginPath();x.arc(15,-8,16,Math.PI,Math.PI*2.4);x.stroke();
  x.restore();
}
function lantern(x,f,cx,top,cy,s,ch){
  x.save();x.strokeStyle=f.gold;x.lineWidth=2;x.beginPath();x.moveTo(cx,top);x.lineTo(cx,cy-s*0.62);x.stroke();
  x.fillStyle=f.gold;x.fillRect(cx-s*0.26,cy-s*0.66,s*0.52,s*0.1);x.fillRect(cx-s*0.26,cy+s*0.56,s*0.52,s*0.1);
  const g=x.createRadialGradient(cx-s*.15,cy-s*.15,s*.05,cx,cy,s*.7);g.addColorStop(0,"#ff5a3c");g.addColorStop(1,"#c0140f");
  x.fillStyle=g;x.beginPath();x.ellipse(cx,cy,s*0.5,s*0.6,0,0,Math.PI*2);x.fill();
  x.strokeStyle=f.gold;x.lineWidth=1.6;x.globalAlpha=.7;
  for(const k of [-.3,0,.3]){x.beginPath();x.ellipse(cx,cy,s*0.5*Math.abs(k)*2||1,s*0.6,0,0,Math.PI*2);x.stroke()}
  x.globalAlpha=1;
  if(ch){x.fillStyle=f.gold;x.font=`700 ${Math.round(s*0.5)}px ${DISP}`;x.textAlign="center";x.textBaseline="middle";x.fillText(ch,cx,cy+s*.03)}
  x.strokeStyle=f.gold;x.lineWidth=2;for(let i=-3;i<=3;i++){x.beginPath();x.moveTo(cx+i*s*0.03,cy+s*0.66);x.lineTo(cx+i*s*0.045,cy+s*1.0);x.stroke()}
  x.restore();
}
function burst(x,f,cx,cy,r,n,color){
  x.save();x.strokeStyle=color;x.fillStyle=color;x.lineWidth=3;x.lineCap="round";
  for(let i=0;i<n;i++){const a=i*2*Math.PI/n;x.beginPath();x.moveTo(cx+Math.cos(a)*r*.3,cy+Math.sin(a)*r*.3);x.lineTo(cx+Math.cos(a)*r*.85,cy+Math.sin(a)*r*.85);x.stroke();
    circle(x,cx+Math.cos(a)*r,cy+Math.sin(a)*r,4);x.fill()}
  x.restore();
}
function mountains(x,f,base,layers){
  layers.forEach((L,i)=>{x.fillStyle=L.c;x.beginPath();x.moveTo(60,base);
    L.p.forEach(([px,py],j)=>{const prev=j?L.p[j-1]:[60,base];x.quadraticCurveTo((prev[0]+px)/2,Math.min(prev[1],py)-L.k,px,py)});
    x.lineTo(940,base);x.closePath();x.fill();
    x.strokeStyle=f.gold;x.globalAlpha=.6;x.lineWidth=2;x.stroke();x.globalAlpha=1});
}
function pine(x,f,cx,base,s){
  x.save();x.fillStyle=f.paper2;x.strokeStyle=f.gold;x.lineWidth=2.5;
  x.fillRect(cx-s*.06,base-s*.5,s*.12,s*.5);x.strokeRect(cx-s*.06,base-s*.5,s*.12,s*.5);
  [[.95,.55],[.75,.45],[.55,.36]].forEach(([y,w],i)=>{const ty=base-s*y-s*.45;x.beginPath();x.moveTo(cx,ty);x.lineTo(cx-s*w,base-s*y+s*.05);x.lineTo(cx+s*w,base-s*y+s*.05);x.closePath();x.fill();x.stroke()});
  x.restore();
}

