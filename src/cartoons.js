
/* ---------- 卡通 designs: five per festival (toolkit in src/cartoon.js) ---------- */
(() => {
const C = CT, PAL = (paper, paper2, gold) => ({paper, paper2, gold: gold || "#ffe08a"});
const RED = PAL("#b8302a", "#7a1a14"), PINK = PAL("#b8406a", "#7a2244"), BLUE = PAL("#2f5d8f", "#173455"), GREEN = PAL("#2f7a4f", "#164a2c"),
  PURPLE = PAL("#5a3a8a", "#2f1d52"), ORANGE = PAL("#b8551e", "#74300c"), BROWN = PAL("#7a4a26", "#45270f"), NAVY = PAL("#243a6b", "#111f40");
const fuText = (x, cx, cy, s) => {x.save(); x.translate(cx, cy); x.rotate(Math.PI/4); x.beginPath(); x.roundRect(-s/2, -s/2, s, s, s*.1); ink(x, "#e8352b"); x.restore(); C.text(x, "福", cx, cy + 4, s*.62, "#ffe08a")};
const firecracker = (x, cx, cy, s, rot) => {x.save(); x.translate(cx, cy); x.rotate(rot || 0); x.beginPath(); x.roundRect(-s*.22, -s*.6, s*.44, s*1.2, 8); ink(x, "#e8352b", 5);
  x.fillStyle = "#ffd84a"; x.fillRect(-s*.22, -s*.42, s*.44, s*.1); x.fillRect(-s*.22, s*.3, s*.44, s*.1);
  x.strokeStyle = OUT; x.lineWidth = 4; x.beginPath(); x.moveTo(0, -s*.6); x.quadraticCurveTo(s*.2, -s*.85, s*.05, -s*.98); x.stroke(); sparkle4(x, s*.05, -s*1.02, s*.18, "#ffd84a"); x.restore()};
const orange = (x, cx, cy, r, fc) => {C.ball(x, cx, cy, r, "#ff9f1c", fc); C.leaf(x, cx + r*.1, cy - r*.9, r*.6, -.5, "#5fb35f")};
const tangyuan = (x, cx, cy, r, pink, fc) => C.ball(x, cx, cy, r, pink ? "#ffc4d6" : "#fffaf2", fc);
const bowl = (x, cx, cy, w, fill) => {x.beginPath(); x.moveTo(cx - w/2, cy); x.lineTo(cx + w/2, cy); x.quadraticCurveTo(cx + w*.45, cy + w*.45, cx, cy + w*.45); x.quadraticCurveTo(cx - w*.45, cy + w*.45, cx - w/2, cy); x.closePath(); ink(x, fill || "#5ab0e0");
  x.beginPath(); x.ellipse(cx, cy, w/2, w*.07, 0, 0, Math.PI*2); ink(x, "#fff3d6", 5)};
const steam = (x, cx, cy, s) => {x.save(); x.strokeStyle = "rgba(255,255,255,.85)"; x.lineWidth = 7; x.lineCap = "round"; for(const d of [-1, 0, 1]){x.beginPath(); x.moveTo(cx + d*s, cy); x.bezierCurveTo(cx + d*s - s*.4, cy - s*.6, cx + d*s + s*.4, cy - s*.9, cx + d*s, cy - s*1.5); x.stroke()} x.restore()};
const zongzi = (x, cx, cy, s, fc) => {C.tri(x, cx, cy, s*1.3, s*1.15, "#5aa64a", false); x.save(); x.strokeStyle = "#f1d48a"; x.lineWidth = 9; x.beginPath(); x.moveTo(cx - s*.42, cy + s*.12); x.lineTo(cx + s*.42, cy + s*.12); x.stroke(); x.restore();
  x.strokeStyle = "rgba(0,0,0,.18)"; x.lineWidth = 3; x.beginPath(); x.moveTo(cx - s*.2, cy - s*.2); x.lineTo(cx - s*.45, cy + s*.5); x.moveTo(cx + s*.2, cy - s*.2); x.lineTo(cx + s*.45, cy + s*.5); x.stroke(); face(x, cx, cy + s*.33, s*.25, fc || {})};
const mooncake = (x, cx, cy, r, ch, fc) => {const n = 14; x.beginPath(); for(let i = 0; i <= n*8; i++){const a = i*2*Math.PI/(n*8), rr = r*(1 + .06*Math.cos(a*n)); x.lineTo(cx + Math.cos(a)*rr, cy + Math.sin(a)*rr)} x.closePath(); ink(x, "#d9913a");
  circle(x, cx, cy, r*.78); ink(x, "#e8a84a", 4); if(ch) C.text(x, ch, cx, cy + 3, r*.75, "#fff3c4"); else face(x, cx, cy + r*.05, r*.5, fc || {})};
const fullMoon = (x, cx, cy, r, fc) => {x.save(); x.shadowColor = "rgba(255,240,170,.9)"; x.shadowBlur = 60; circle(x, cx, cy, r); x.fillStyle = "#fff1a8"; x.fill(); x.restore(); C.ball(x, cx, cy, r, "#fff1a8", fc)};
const peach = (x, cx, cy, s, fc) => {C.leaf(x, cx - s*.1, cy - s*.75, s*.7, -2.4, "#5fb35f"); C.leaf(x, cx + s*.1, cy - s*.75, s*.7, -.7, "#5fb35f");
  x.beginPath(); x.moveTo(cx, cy - s*.85); x.bezierCurveTo(cx + s*1.1, cy - s*.8, cx + s*1.05, cy + s*.9, cx, cy + s*.85); x.bezierCurveTo(cx - s*1.05, cy + s*.9, cx - s*1.1, cy - s*.8, cx, cy - s*.85); ink(x, "#ffa0b4");
  x.fillStyle = "rgba(255,80,110,.35)"; x.beginPath(); x.ellipse(cx, cy - s*.35, s*.35, s*.25, 0, 0, Math.PI*2); x.fill(); face(x, cx, cy + s*.15, s*.42, fc || {})};
const dumpling = (x, cx, cy, s, fc) => {x.beginPath(); x.moveTo(cx - s, cy + s*.3); x.quadraticCurveTo(cx - s*.95, cy - s*.75, cx, cy - s*.8); x.quadraticCurveTo(cx + s*.95, cy - s*.75, cx + s, cy + s*.3); x.quadraticCurveTo(cx, cy + s*.55, cx - s, cy + s*.3); ink(x, "#fff6e2");
  x.strokeStyle = OUT; x.lineWidth = 4; for(const d of [-.5, -.2, .1, .4]){x.beginPath(); x.moveTo(cx + d*s, cy - s*.72); x.quadraticCurveTo(cx + d*s + s*.15, cy - s*.95, cx + d*s + s*.25, cy - s*.7); x.stroke()} face(x, cx, cy - s*.05, s*.4, fc || {})};
const dragonBoat = (x, cx, cy, s) => {x.beginPath(); x.moveTo(cx - s*1.6, cy - s*.2); x.quadraticCurveTo(cx, cy + s*.6, cx + s*1.5, cy - s*.15); x.lineTo(cx + s*1.35, cy + s*.15); x.quadraticCurveTo(cx, cy + s*.55, cx - s*1.45, cy + s*.1); x.closePath(); ink(x, "#e8352b");
  x.fillStyle = "#ffd84a"; for(let i = -4; i <= 4; i++){circle(x, cx + i*s*.28, cy + s*.18, s*.06); x.fill()}
  C.ball(x, cx + s*1.55, cy - s*.5, s*.35, "#3fae5a", {open: true}); x.strokeStyle = OUT; x.lineWidth = 5; for(const d of [-.15, .15]){x.beginPath(); x.moveTo(cx + s*1.5 + d*s, cy - s*.8); x.lineTo(cx + s*1.4 + d*s*2, cy - s*1.05); x.stroke()}
  rpoly(x, [[cx - s*1.55, cy - s*.15], [cx - s*1.95, cy - s*.65], [cx - s*1.35, cy - s*.05]], 6); ink(x, "#3fae5a", 5)};
const wave = (x, y, fill) => {x.beginPath(); x.moveTo(30, 1000); x.lineTo(30, y); for(let px = 30; px < 970; px += 90){x.quadraticCurveTo(px + 22, y - 30, px + 45, y); x.quadraticCurveTo(px + 67, y + 22, px + 90, y)} x.lineTo(970, 1000); x.closePath(); ink(x, fill, 5)};
const clock = (x, cx, cy, r) => {C.ball(x, cx, cy, r, "#fff6dc", false); x.fillStyle = OUT; for(let i = 0; i < 12; i++){const a = i*Math.PI/6; circle(x, cx + Math.cos(a)*r*.82, cy + Math.sin(a)*r*.82, i%3 ? 5 : 9); x.fill()}
  x.strokeStyle = OUT; x.lineCap = "round"; x.lineWidth = 12; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx, cy - r*.62); x.stroke(); x.lineWidth = 9; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx - r*.05, cy - r*.45); x.stroke(); face(x, cx, cy + r*.32, r*.3, {happy: true})};
const tie = (x, cx, cy, s) => {rpoly(x, [[cx - s*.25, cy - s], [cx + s*.25, cy - s], [cx + s*.12, cy - s*.7], [cx + s*.4, cy + s*.8], [cx, cy + s*1.1], [cx - s*.4, cy + s*.8], [cx - s*.12, cy - s*.7]], 8); ink(x, "#3a6ad9");
  x.strokeStyle = "rgba(255,255,255,.55)"; x.lineWidth = 8; for(const d of [-.2, .25, .7]){x.beginPath(); x.moveTo(cx - s*.3, cy + d*s); x.lineTo(cx + s*.3, cy + d*s - s*.2); x.stroke()} face(x, cx, cy + s*.15, s*.2, {})};
const teacup = (x, cx, cy, s, fc) => {x.lineWidth = 10; x.strokeStyle = OUT; x.beginPath(); x.arc(cx + s*.75, cy, s*.3, -1.4, 1.4); x.stroke(); x.lineWidth = 6; x.strokeStyle = "#fff"; x.stroke();
  x.beginPath(); x.moveTo(cx - s*.85, cy - s*.5); x.lineTo(cx + s*.85, cy - s*.5); x.quadraticCurveTo(cx + s*.8, cy + s*.7, cx, cy + s*.7); x.quadraticCurveTo(cx - s*.8, cy + s*.7, cx - s*.85, cy - s*.5); ink(x, "#fffaf0"); face(x, cx, cy + s*.08, s*.38, fc || {})};
const cake = (x, cx, cy, s, fc) => {x.beginPath(); x.roundRect(cx - s, cy - s*.35, s*2, s*.9, 18); ink(x, "#ffc4d6"); x.beginPath(); x.roundRect(cx - s*.7, cy - s*.95, s*1.4, s*.65, 16); ink(x, "#fff3e6");
  x.fillStyle = "#ff6f91"; for(let i = -4; i <= 4; i++){circle(x, cx + i*s*.22, cy - s*.33, s*.09); x.fill()}
  for(const d of [-.35, 0, .35]){x.beginPath(); x.roundRect(cx + d*s - 7, cy - s*1.3, 14, s*.38, 4); ink(x, "#7ec8ff", 4); sparkle4(x, cx + d*s, cy - s*1.42, 14, "#ffb52e")}
  face(x, cx, cy + s*.12, s*.32, fc || {})};
const rose = (x, cx, cy, r) => {C.leaf(x, cx - r*.2, cy + r*.8, r*1.1, 2.3, "#4caf50"); C.leaf(x, cx + r*.2, cy + r*.8, r*1.1, .8, "#4caf50"); circle(x, cx, cy, r); ink(x, "#e8334a");
  x.strokeStyle = "#a81b30"; x.lineWidth = 5; x.lineCap = "round"; x.beginPath(); for(let a = 0; a < 12; a += .2){const rr = r*.08*a; x.lineTo(cx + Math.cos(a)*rr*.85, cy + Math.sin(a)*rr*.85)} x.stroke()};
const cupid = (x, cx, cy, s) => {for(const k of [-1, 1]){x.beginPath(); x.ellipse(cx + k*s*.95, cy - s*.1, s*.55, s*.32, k*-.5, 0, Math.PI*2); ink(x, "#fff")} C.ball(x, cx, cy, s*.75, "#ffd9b8", {happy: true});
  x.beginPath(); x.ellipse(cx, cy - s*.85, s*.4, s*.12, 0, 0, Math.PI*2); x.lineWidth = 6; x.strokeStyle = "#ffd84a"; x.stroke()};
const witchHat = (x, cx, cy, s) => {x.beginPath(); x.ellipse(cx, cy, s, s*.2, 0, 0, Math.PI*2); ink(x, "#4b2a7a"); rpoly(x, [[cx - s*.5, cy], [cx + s*.15, cy - s*1.3], [cx + s*.5, cy]], 10); ink(x, "#4b2a7a"); x.fillStyle = "#ff9f1c"; x.fillRect(cx - s*.48, cy - s*.22, s*.96, s*.15)};
const bat = (x, cx, cy, s) => {x.beginPath(); x.moveTo(cx, cy - s*.2); x.quadraticCurveTo(cx - s*.6, cy - s*.7, cx - s*1.3, cy - s*.3); x.quadraticCurveTo(cx - s*.9, cy - s*.1, cx - s*.9, cy + s*.2); x.quadraticCurveTo(cx - s*.6, cy, cx - s*.4, cy + s*.25); x.quadraticCurveTo(cx - s*.2, cy, cx, cy + s*.3);
  x.quadraticCurveTo(cx + s*.2, cy, cx + s*.4, cy + s*.25); x.quadraticCurveTo(cx + s*.6, cy, cx + s*.9, cy + s*.2); x.quadraticCurveTo(cx + s*.9, cy - s*.1, cx + s*1.3, cy - s*.3); x.quadraticCurveTo(cx + s*.6, cy - s*.7, cx, cy - s*.2); ink(x, "#5b4b7a", 4); face(x, cx, cy, s*.28, {})};
const pie = (x, cx, cy, s, fc) => {x.beginPath(); x.ellipse(cx, cy + s*.25, s*1.1, s*.4, 0, 0, Math.PI*2); ink(x, "#d9a066"); x.beginPath(); x.ellipse(cx, cy, s, s*.4, 0, 0, Math.PI*2); ink(x, "#e07b2c");
  x.strokeStyle = "#f6c27a"; x.lineWidth = 12; x.beginPath(); x.ellipse(cx, cy, s*.95, s*.36, 0, 0, Math.PI*2); x.stroke(); C.ball(x, cx, cy - s*.05, s*.28, "#fffaf0", false); face(x, cx, cy + s*.45, s*.3, fc || {})};
const corn = (x, cx, cy, s, rot) => {x.save(); x.translate(cx, cy); x.rotate(rot || 0); for(const k of [-1, 1]){x.beginPath(); x.moveTo(0, s*.9); x.quadraticCurveTo(k*s*.7, s*.2, k*s*.3, -s*.6); x.quadraticCurveTo(k*s*.2, s*.2, 0, s*.9); ink(x, "#8fbf4a", 4)}
  x.beginPath(); x.ellipse(0, 0, s*.28, s*.8, 0, 0, Math.PI*2); ink(x, "#ffcd3c", 4); x.fillStyle = "#e8a400"; for(let i = -3; i <= 3; i++) for(const d of [-.1, .1]){circle(x, d*s, i*s*.2, 4); x.fill()} x.restore()};
const reindeer = (x, cx, cy, s) => {x.strokeStyle = OUT; x.lineWidth = 9; x.lineCap = "round"; for(const k of [-1, 1]){x.beginPath(); x.moveTo(cx + k*s*.4, cy - s*.7); x.lineTo(cx + k*s*.7, cy - s*1.4); x.moveTo(cx + k*s*.58, cy - s*1.1); x.lineTo(cx + k*s*1.0, cy - s*1.25); x.stroke()}
  x.strokeStyle = "#a8743c"; x.lineWidth = 5; x.stroke(); C.bear(x, cx, cy, s, "#b5803f", {}); C.ball(x, cx, cy + s*.38, s*.16, "#ff3b3b", false)};
const fireworkC = (x, cx, cy, r, col) => {x.save(); x.strokeStyle = col; x.lineWidth = 7; x.lineCap = "round"; for(let i = 0; i < 12; i++){const a = i*Math.PI/6; x.beginPath(); x.moveTo(cx + Math.cos(a)*r*.35, cy + Math.sin(a)*r*.35); x.lineTo(cx + Math.cos(a)*r, cy + Math.sin(a)*r); x.stroke(); sparkle4(x, cx + Math.cos(a)*r*1.12, cy + Math.sin(a)*r*1.12, 10, col)} x.restore()};
const kite = (x, cx, cy, s) => {rpoly(x, [[cx, cy - s], [cx + s*.7, cy], [cx, cy + s*1.1], [cx - s*.7, cy]], 8); ink(x, "#ff5a5a"); x.strokeStyle = OUT; x.lineWidth = 3; x.beginPath(); x.moveTo(cx, cy - s); x.lineTo(cx, cy + s*1.1); x.moveTo(cx - s*.7, cy); x.lineTo(cx + s*.7, cy); x.stroke();
  x.beginPath(); x.moveTo(cx, cy + s*1.1); x.bezierCurveTo(cx - s*.4, cy + s*1.6, cx + s*.4, cy + s*1.9, cx, cy + s*2.4); x.stroke(); for(const t of [1.5, 1.9, 2.3]){sparkle4(x, cx + (t === 1.9 ? 12 : -10), cy + s*t, 14, "#ffd84a")} face(x, cx, cy + s*.1, s*.3, {})};
const grandpa = (x, cx, cy, s, girl) => {C.ball(x, cx, cy, s, "#ffd9b8", {happy: true}); x.save(); x.fillStyle = "#f2f2f2"; x.strokeStyle = OUT; x.lineWidth = 5;
  if(girl){x.beginPath(); x.arc(cx, cy - s*.15, s*1.02, Math.PI*1.05, Math.PI*1.95); x.quadraticCurveTo(cx, cy - s*.55, cx - s*.98, cy - s*.45); x.fill(); x.stroke(); circle(x, cx, cy - s*1.15, s*.32); ink(x, "#eeeeee", 5)}
  else {x.beginPath(); x.ellipse(cx, cy + s*.62, s*.42, s*.28, 0, 0, Math.PI); x.fill(); x.stroke(); for(const k of [-1, 1]){x.beginPath(); x.ellipse(cx + k*s*.9, cy - s*.2, s*.18, s*.3, 0, 0, Math.PI*2); x.fill(); x.stroke()}}
  x.lineWidth = 4; for(const k of [-1, 1]){x.beginPath(); x.arc(cx + k*s*.38, cy - s*.1, s*.2, 0, Math.PI*2); x.stroke()} x.beginPath(); x.moveTo(cx - s*.18, cy - s*.1); x.lineTo(cx + s*.18, cy - s*.1); x.stroke(); x.restore()};
const heartRain = (x, seed, n, cols) => {const r = rand(seed); for(let i = 0; i < n; i++) C.heart(x, 90 + r()*820, 240 + r()*560, 14 + r()*16, cols[i%cols.length], false)};
const snowDots = (x, seed, n) => {const r = rand(seed); x.fillStyle = "#fff"; for(let i = 0; i < n; i++){x.globalAlpha = .6 + r()*.4; circle(x, 60 + r()*880, 230 + r()*640, 4 + r()*7); x.fill()} x.globalAlpha = 1};

/* 春節 */
cartoonSet("spring", [
  {motif: "笑咪咪的大紅包，旁邊兩串鞭炮劈啪響，彩紙飛揚。", phrase: "恭喜發財", colors: RED, sky: ["#ffe2b8", "#ffb38a"], scene(x){
    C.confetti(x, 3, 60, [70, 220, 930, 860], ["#ff5a5a", "#ffd84a", "#5ab0ff", "#7ed957"]);
    C.box(x, 500, 560, 320, 420, "#e8352b", {happy: true, open: true}); circle(x, 500, 470, 70); ink(x, "#ffd84a"); C.text(x, "福", 500, 474, 84, "#e8352b");
    firecracker(x, 210, 500, 150, -.25); firecracker(x, 790, 500, 150, .25); C.hill(x, 860, "#ffcf6e", 30)}},
  {motif: "兩顆圓滾滾的橘子抱著福字斗方，大吉大利。", phrase: "大吉大利", colors: RED, sky: ["#fff0c8", "#ffc98a"], scene(x){
    C.sparkles(x, 5, 18, [80, 230, 920, 820], "#fff"); fuText(x, 500, 470, 260); orange(x, 290, 700, 115, {happy: true}); orange(x, 710, 700, 115, {open: true}); C.hill(x, 860, "#ffad5a", 26)}},
  {motif: "兩盞紅燈籠娃娃掛在屋簷下，春字燈籠笑開懷。", phrase: "新春快樂", colors: RED, sky: ["#ffd9c2", "#ff9f8a"], scene(x){
    x.strokeStyle = OUT; x.lineWidth = 8; x.beginPath(); x.moveTo(60, 250); x.quadraticCurveTo(500, 300, 940, 250); x.stroke();
    C.lantern(x, 290, 520, 170, "#ef4b3c", null, {happy: true}); C.lantern(x, 710, 520, 170, "#ef4b3c", null, {open: true}); C.lantern(x, 500, 470, 110, "#ff7a3c", "春");
    C.flower(x, 160, 820, 60, "#ff8fb1", "#ffd84a"); C.flower(x, 840, 820, 60, "#ff8fb1", "#ffd84a"); C.hill(x, 880, "#ff7f6e", 26)}},
  {motif: "舞獅寶寶咧嘴大笑，彩球在頭頂蹦蹦跳。", phrase: "瑞獅迎春", colors: RED, sky: ["#ffeec2", "#ffc27a"], scene(x){
    C.confetti(x, 8, 50, [70, 220, 930, 860], ["#ff5a5a", "#ffd84a", "#7ed957"]);
    for(const k of [-1, 1]){circle(x, 500 + k*150, 420, 70); ink(x, "#ffd84a")} C.ball(x, 500, 560, 230, "#ff5a3c", {open: true});
    x.fillStyle = "#ffd84a"; x.beginPath(); x.ellipse(500, 390, 120, 40, 0, 0, Math.PI*2); ink(x, "#ffd84a"); C.text(x, "王", 500, 392, 60, "#e8352b");
    C.ball(x, 500, 270, 50, "#ff8fd0", false); for(const k of [-1, 1]){circle(x, 500 + k*240, 600, 50); ink(x, "#fff")} C.hill(x, 850, "#ffad5a", 30)}},
  {motif: "大大的金元寶咧嘴笑，身邊金幣叮噹滾。", phrase: "招財進寶", colors: RED, sky: ["#fff3c8", "#ffd27a"], scene(x){
    C.sparkles(x, 9, 22, [80, 230, 920, 820], "#fff"); x.beginPath(); x.moveTo(250, 520); x.quadraticCurveTo(500, 760, 750, 520); x.quadraticCurveTo(780, 720, 500, 760); x.quadraticCurveTo(220, 720, 250, 520); ink(x, "#ffcc33");
    C.ball(x, 500, 520, 150, "#ffd84a", {happy: true, open: true}); for(const [cx, cy] of [[200, 760], [800, 760], [300, 820], [700, 820]]){C.ball(x, cx, cy, 50, "#ffcc33", false); C.text(x, "$", cx, cy + 2, 46, "#e8a400")} C.hill(x, 880, "#ffb04a", 20)}},
]);

/* 元宵節 */
cartoonSet("yuanxiao", [
  {motif: "一碗熱呼呼的湯圓寶寶，紅白圓滾滾一起泡澡。", phrase: "團團圓圓", colors: RED, sky: ["#ffe8d0", "#ffc0a0"], scene(x){
    steam(x, 500, 400, 70); tangyuan(x, 400, 560, 80, false, {happy: true}); tangyuan(x, 600, 560, 80, true, {}); tangyuan(x, 500, 530, 85, false, {open: true}); bowl(x, 500, 600, 520, "#5ab0e0")}},
  {motif: "兔子燈籠拉著小推車，一路叮叮噹噹去賞燈。", phrase: "元宵快樂", colors: NAVY, sky: ["#2a3a7a", "#6a5aa8"], scene(x){
    snowDots(x, 4, 30); fullMoon(x, 760, 330, 100, {happy: true});
    C.bunny(x, 420, 620, 150, "#fff", {open: true}); C.lantern(x, 420, 640, 70, "#ef4b3c", "燈"); for(const k of [-1, 1]){circle(x, 420 + k*110, 800, 45); ink(x, "#ffd84a")} C.hill(x, 860, "#4b3a8a", 26)}},
  {motif: "一排彩色燈籠娃娃，各自寫著猜燈謎的「謎」字。", phrase: "燈謎猜猜", colors: PURPLE, sky: ["#3a2a6a", "#8a5aa8"], scene(x){
    x.strokeStyle = "#ffd84a"; x.lineWidth = 6; x.beginPath(); x.moveTo(60, 260); x.quadraticCurveTo(500, 330, 940, 260); x.stroke();
    [["#ef4b3c", "猜"], ["#ff9f1c", null], ["#ef4b3c", "謎"], ["#ff5aa0", null]].forEach(([c, ch], i) => C.lantern(x, 170 + i*220, 470 + (i%2)*70, 105, c, ch, {happy: i === 1}));
    C.text(x, "？", 500, 760, 120, "#ffd84a"); C.hill(x, 870, "#5a3a8a", 26)}},
  {motif: "元宵夜的大月亮笑咪咪，三顆湯圓搭著雲朵賞月。", phrase: "花好月圓", colors: NAVY, sky: ["#1f2d66", "#4b5aa8"], scene(x){
    snowDots(x, 7, 40); fullMoon(x, 500, 420, 160, {happy: true}); C.cloud(x, 500, 720, 240, "#fff");
    tangyuan(x, 400, 650, 55, true, {}); tangyuan(x, 500, 630, 60, false, {open: true}); tangyuan(x, 600, 650, 55, true, {happy: true})}},
  {motif: "天燈寶寶帶著願望緩緩升空，滿天星光。", phrase: "心想事成", colors: PURPLE, sky: ["#2a2060", "#a05a8a"], scene(x){
    C.sparkles(x, 2, 26, [70, 220, 930, 820], "#ffe8a0");
    for(const [cx, cy, s] of [[500, 500, 1], [230, 380, .55], [780, 360, .6], [300, 700, .45], [760, 680, .5]]){x.save(); x.shadowColor = "rgba(255,200,90,.9)"; x.shadowBlur = 40;
      rpoly(x, [[cx - 120*s, cy - 150*s], [cx + 120*s, cy - 150*s], [cx + 90*s, cy + 140*s], [cx - 90*s, cy + 140*s]], 30*s); x.restore(); ink(x, "#ffb24a"); face(x, cx, cy, 70*s, s === 1 ? {open: true} : {happy: true})}
    C.text(x, "福", 500, 590, 70, "#e8352b"); C.hill(x, 880, "#3a2a6a", 24)}},
]);

/* 端午節 */
cartoonSet("duanwu", [
  {motif: "三顆綠油油的粽子寶寶手牽手，排排站。", phrase: "粽享幸福", colors: GREEN, sky: ["#e2f6d8", "#a8deb0"], scene(x){
    C.sparkles(x, 3, 14, [80, 230, 920, 600], "#fff"); zongzi(x, 280, 620, 160, {happy: true}); zongzi(x, 720, 620, 160, {}); zongzi(x, 500, 560, 200, {open: true}); C.hill(x, 850, "#7ccf7a", 30)}},
  {motif: "笑嘻嘻的龍舟在浪花裡衝刺，太陽公公加油。", phrase: "龍舟競渡", colors: BLUE, sky: ["#c8ecff", "#7cc8f0"], scene(x){
    C.sun(x, 780, 320, 80, "#ffd84a", {happy: true}); C.cloud(x, 230, 330, 120); dragonBoat(x, 470, 640, 200); wave(x, 760, "#4aa8e0"); wave(x, 840, "#2f8ad0")}},
  {motif: "香包寶寶掛著五彩流蘇，兩旁艾草搖啊搖。", phrase: "平安吉祥", colors: RED, sky: ["#fff0d0", "#ffcf9a"], scene(x){
    for(const k of [-1, 1]){C.leaf(x, 500 + k*280, 760, 330, k < 0 ? -1.8 : -1.35, "#5fb35f")}
    x.strokeStyle = OUT; x.lineWidth = 5; x.beginPath(); x.moveTo(500, 220); x.lineTo(500, 360); x.stroke(); C.heart(x, 500, 520, 190, "#e8352b", {happy: true});
    for(let i = -3; i <= 3; i++){x.strokeStyle = ["#ff5a5a", "#ffd84a", "#5ab0ff", "#7ed957"][(i + 3)%4]; x.lineWidth = 8; x.beginPath(); x.moveTo(500 + i*14, 690); x.lineTo(500 + i*22, 820); x.stroke()} C.hill(x, 880, "#ffb87a", 20)}},
  {motif: "立蛋大挑戰！雞蛋寶寶站得直挺挺，太陽正當中。", phrase: "午時立蛋", colors: ORANGE, sky: ["#fff4c2", "#ffd27a"], scene(x){
    C.sun(x, 500, 330, 90, "#ffd84a", {happy: true}); C.egg(x, 500, 640, 230, 300, "#fff8ec", [], {open: true}); x.strokeStyle = OUT; x.lineWidth = 6; x.beginPath(); x.moveTo(240, 790); x.lineTo(760, 790); x.stroke();
    C.star(x, 250, 560, 40, "#ffd84a", false); C.star(x, 760, 520, 34, "#ffd84a", false); C.hill(x, 870, "#ffb04a", 18)}},
  {motif: "鴨子寶寶戴著粽子帽，划著小船去吃粽子。", phrase: "端午安康", colors: BLUE, sky: ["#d8f4ff", "#8ad0f0"], scene(x){
    C.cloud(x, 250, 320, 110); C.cloud(x, 760, 280, 90); C.ball(x, 500, 560, 150, "#ffe066", {happy: true}); rpoly(x, [[600, 560], [700, 585], [600, 610]], 8); ink(x, "#ff9f1c", 4);
    zongzi(x, 500, 380, 110, {}); x.beginPath(); x.moveTo(230, 680); x.quadraticCurveTo(500, 860, 770, 680); x.closePath(); ink(x, "#e8352b"); wave(x, 790, "#4aa8e0")}},
]);

/* 中秋節 */
cartoonSet("midautumn", [
  {motif: "玉兔捧著月餅，坐在笑咪咪的大月亮前。", phrase: "中秋快樂", colors: NAVY, sky: ["#1f2d66", "#4b5aa8"], scene(x){
    snowDots(x, 11, 40); fullMoon(x, 500, 430, 220, {happy: true}); C.bunny(x, 330, 720, 110, "#fff", {open: true}); mooncake(x, 640, 740, 95, "月"); C.hill(x, 880, "#3a2a6a", 20)}},
  {motif: "一盒月餅寶寶排排坐，蛋黃月餅笑得最開心。", phrase: "月圓人圓", colors: BROWN, sky: ["#fff0d0", "#ffcf9a"], scene(x){
    C.sparkles(x, 4, 16, [80, 230, 920, 820], "#fff"); mooncake(x, 300, 520, 120, null, {}); mooncake(x, 700, 520, 120, null, {happy: true}); mooncake(x, 500, 690, 140, "圓");
    x.beginPath(); x.roundRect(160, 790, 680, 40, 14); ink(x, "#e8352b")}},
  {motif: "柚子寶寶戴著柚子皮帽，跟兔子一起烤肉賞月。", phrase: "團圓美滿", colors: NAVY, sky: ["#25306a", "#6a5aa8"], scene(x){
    snowDots(x, 5, 30); fullMoon(x, 780, 320, 100, {}); C.ball(x, 380, 620, 150, "#c8e86a", {happy: true}); x.beginPath(); x.arc(380, 520, 150, Math.PI*1.1, Math.PI*1.9); x.lineTo(380, 380); x.closePath(); ink(x, "#7cc04a");
    C.bunny(x, 680, 680, 100, "#fff", {open: true}); x.beginPath(); x.roundRect(520, 790, 320, 40, 10); ink(x, "#666"); C.hill(x, 880, "#3a2a6a", 18)}},
  {motif: "嫦娥姐姐抱著玉兔，坐在雲朵上看月亮。", phrase: "嫦娥奔月", colors: PURPLE, sky: ["#2a2060", "#8a5aa8"], scene(x){
    C.sparkles(x, 6, 22, [70, 220, 930, 820], "#ffe8a0"); fullMoon(x, 500, 400, 170, false); C.cloud(x, 500, 720, 260);
    C.ball(x, 500, 560, 100, "#ffe0c8", {happy: true}); x.beginPath(); x.arc(500, 540, 106, Math.PI, 0); x.lineTo(606, 500); x.quadraticCurveTo(500, 470, 394, 500); x.closePath(); ink(x, "#3b2a3a"); circle(x, 500, 440, 40); ink(x, "#3b2a3a");
    C.bunny(x, 640, 640, 60, "#fff", {})}},
  {motif: "兔子提燈籠，跟著一串螢火蟲在月下散步。", phrase: "花好月圓", colors: NAVY, sky: ["#1a2660", "#3a5aa0"], scene(x){
    fullMoon(x, 720, 330, 120, {happy: true}); C.sparkles(x, 9, 20, [70, 400, 930, 800], "#e8ff8a");
    C.bunny(x, 380, 630, 130, "#fff", {open: true}); C.lantern(x, 560, 640, 70, "#ff9f1c", "月"); C.hill(x, 850, "#2f4a7a", 30)}},
]);

/* 重陽節 */
cartoonSet("chongyang", [
  {motif: "爺爺奶奶笑呵呵，一起登高看菊花。", phrase: "福壽安康", colors: ORANGE, sky: ["#d8f0ff", "#ffe2a8"], scene(x){
    C.hill(x, 720, "#8fd07a", 90, 2); C.sun(x, 780, 320, 70, "#ffd84a", {happy: true}); grandpa(x, 380, 560, 110, false); grandpa(x, 620, 560, 110, true);
    C.mum(x, 200, 800, 70, "#ffcf33"); C.mum(x, 800, 800, 70, "#ffcf33"); C.mum(x, 500, 820, 55, "#ff9f43")}},
  {motif: "大壽桃寶寶笑開懷，兩旁小壽桃一起祝壽。", phrase: "福壽綿長", colors: PINK, sky: ["#fff0e0", "#ffd0c8"], scene(x){
    C.sparkles(x, 2, 14, [80, 230, 920, 820], "#fff"); peach(x, 500, 520, 190, {open: true}); peach(x, 240, 720, 100, {happy: true}); peach(x, 760, 720, 100, {}); C.hill(x, 870, "#ffb0a8", 20)}},
  {motif: "菊花寶寶開成一圈，中央寫著「壽」。", phrase: "菊香延年", colors: ORANGE, sky: ["#fff6d0", "#ffd88a"], scene(x){
    for(let i = 0; i < 8; i++){const a = i*Math.PI/4; C.mum(x, 500 + Math.cos(a)*260, 520 + Math.sin(a)*240, 62, i%2 ? "#ffcf33" : "#ff9f43", i%2 ? {} : {happy: true})}
    C.ball(x, 500, 520, 130, "#e8352b", false); C.text(x, "壽", 500, 524, 140, "#ffe08a")}},
  {motif: "秋高氣爽放風箏，風箏寶寶帶著彩帶飛。", phrase: "康泰安寧", colors: BLUE, sky: ["#bfe6ff", "#e8f6ff"], scene(x){
    C.cloud(x, 240, 330, 110); C.cloud(x, 760, 420, 90); kite(x, 560, 380, 130); x.strokeStyle = OUT; x.lineWidth = 3; x.beginPath(); x.moveTo(560, 510); x.quadraticCurveTo(450, 650, 330, 730); x.stroke();
    grandpa(x, 300, 730, 80, false); C.hill(x, 830, "#8fd07a", 40)}},
  {motif: "一壺菊花茶，茶杯寶寶冒著熱氣，敬老人家。", phrase: "敬老尊賢", colors: BROWN, sky: ["#fff3dc", "#f2d2a8"], scene(x){
    steam(x, 500, 420, 60); teacup(x, 500, 600, 180, {happy: true}); C.mum(x, 500, 480, 40, "#ffcf33"); C.mum(x, 220, 760, 60, "#ffcf33"); C.mum(x, 790, 760, 60, "#ff9f43");
    x.beginPath(); x.ellipse(500, 800, 300, 40, 0, 0, Math.PI*2); ink(x, "#c8a070")}},
]);

/* 冬至 */
cartoonSet("dongzhi", [
  {motif: "雪人捧著一碗湯圓，湯圓寶寶熱呼呼。", phrase: "冬至吉祥", colors: BLUE, sky: ["#d0e8ff", "#a8c8f0"], scene(x){
    snowDots(x, 3, 50); C.snowman(x, 320, 520, 130, {happy: true}); steam(x, 650, 520, 50); tangyuan(x, 610, 650, 50, true, {}); tangyuan(x, 690, 650, 50, false, {happy: true}); bowl(x, 650, 680, 320, "#e8352b"); C.hill(x, 860, "#fff", 30)}},
  {motif: "一盤胖嘟嘟的餃子寶寶，蘸醬排隊等開動。", phrase: "福氣滿滿", colors: RED, sky: ["#fff2dc", "#ffd2a8"], scene(x){
    x.beginPath(); x.ellipse(500, 700, 400, 120, 0, 0, Math.PI*2); ink(x, "#5ab0e0"); x.beginPath(); x.ellipse(500, 690, 340, 90, 0, 0, Math.PI*2); ink(x, "#fff");
    dumpling(x, 350, 640, 110, {}); dumpling(x, 650, 640, 110, {happy: true}); dumpling(x, 500, 600, 130, {open: true}); steam(x, 500, 440, 60)}},
  {motif: "雪地小屋暖烘烘，煙囪冒煙，屋裡湯圓滾滾香。", phrase: "闔家安康", colors: NAVY, sky: ["#2a3a7a", "#5a6aa8"], scene(x){
    snowDots(x, 8, 60); x.beginPath(); x.roundRect(300, 500, 400, 300, 16); ink(x, "#e8a060"); rpoly(x, [[260, 520], [500, 330], [740, 520]], 20); ink(x, "#e8352b");
    x.beginPath(); x.roundRect(600, 360, 60, 110, 8); ink(x, "#a05a3a"); steam(x, 630, 340, 30); x.beginPath(); x.roundRect(440, 600, 120, 120, 14); ink(x, "#ffe08a"); face(x, 500, 660, 40, {happy: true}); C.hill(x, 820, "#fff", 30)}},
  {motif: "企鵝寶寶圍著暖鍋，冬至吃補暖洋洋。", phrase: "暖意融融", colors: BLUE, sky: ["#d8eeff", "#a0c8f0"], scene(x){
    snowDots(x, 13, 40); steam(x, 500, 470, 60); x.beginPath(); x.ellipse(500, 640, 210, 120, 0, 0, Math.PI*2); ink(x, "#e8352b"); x.beginPath(); x.ellipse(500, 560, 200, 40, 0, 0, Math.PI*2); ink(x, "#ffb04a");
    for(const k of [-1, 1]){C.ball(x, 500 + k*300, 620, 100, "#2f3a5a", false); x.beginPath(); x.ellipse(500 + k*300, 650, 65, 70, 0, 0, Math.PI*2); x.fillStyle = "#fff"; x.fill(); face(x, 500 + k*300, 610, 50, {happy: k > 0}); rpoly(x, [[500 + k*300 - 14, 640], [500 + k*300 + 14, 640], [500 + k*300, 660]], 4); ink(x, "#ff9f1c", 3)}
    C.hill(x, 850, "#fff", 24)}},
  {motif: "九九消寒梅花開，梅花寶寶一朵比一朵紅。", phrase: "數九迎春", colors: RED, sky: ["#fff4ec", "#ffd8d0"], scene(x){
    snowDots(x, 6, 25); x.strokeStyle = "#6b4423"; x.lineWidth = 18; x.lineCap = "round"; x.beginPath(); x.moveTo(100, 820); x.quadraticCurveTo(400, 700, 500, 450); x.moveTo(420, 640); x.quadraticCurveTo(650, 600, 860, 380); x.stroke();
    [[500, 430], [380, 600], [620, 560], [760, 450], [860, 360], [260, 720], [520, 650], [700, 640], [180, 780]].forEach(([cx, cy], i) => C.flower(x, cx, cy, 52, i < 4 ? "#ff6f8f" : "#ffd0da", "#ffd84a", i === 0 ? {happy: true} : false, 5))}},
]);

/* 聖誕節 */
cartoonSet("xmas", [
  {motif: "聖誕樹寶寶戴著星星，禮物堆在樹下。", phrase: "聖誕快樂", colors: GREEN, sky: ["#2a4a7a", "#5a7ab8"], scene(x){
    snowDots(x, 4, 50); C.xtree(x, 500, 810, 380, {happy: true}); C.gift(x, 260, 760, 150, 110, "#e8352b", "#ffd84a", {}); C.gift(x, 740, 770, 130, 100, "#5ab0ff", "#fff", {happy: true}); C.hill(x, 850, "#fff", 20)}},
  {motif: "雪人寶寶戴著紅圍巾，跟小鳥在雪地玩。", phrase: "平安夜", colors: NAVY, sky: ["#1f2d66", "#4b5aa8"], scene(x){
    snowDots(x, 9, 70); C.snowman(x, 500, 520, 150, {happy: true}); C.ball(x, 760, 600, 50, "#e8352b", {}); C.hill(x, 820, "#fff", 30)}},
  {motif: "麋鹿寶寶紅鼻子亮晶晶，拉著禮物雪橇。", phrase: "歡樂聖誕", colors: RED, sky: ["#ffe8d8", "#ffc8b8"], scene(x){
    snowDots(x, 5, 30); reindeer(x, 380, 560, 140); x.beginPath(); x.moveTo(560, 640); x.lineTo(860, 640); x.quadraticCurveTo(860, 760, 760, 760); x.lineTo(560, 760); x.closePath(); ink(x, "#e8352b");
    C.gift(x, 700, 580, 110, 90, "#3fae5a", "#ffd84a", false); C.hill(x, 840, "#fff", 24)}},
  {motif: "薑餅人手牽手跳舞，糖果柺杖在旁邊。", phrase: "甜蜜聖誕", colors: BROWN, sky: ["#fff3e0", "#ffd8b0"], scene(x){
    C.sparkles(x, 3, 16, [80, 230, 920, 820], "#fff");
    for(const cx of [300, 700]){circle(x, cx, 450, 80); ink(x, "#c8803f"); x.beginPath(); x.roundRect(cx - 80, 520, 160, 200, 50); ink(x, "#c8803f"); for(const k of [-1, 1]){x.beginPath(); x.roundRect(cx + k*120 - 30, 540, 60, 120, 30); ink(x, "#c8803f")}
      face(x, cx, 460, 55, {happy: cx > 500}); x.fillStyle = "#ff5a5a"; for(const d of [570, 630]){circle(x, cx, d, 10); x.fill()}}
    x.strokeStyle = OUT; x.lineWidth = 34; x.lineCap = "round"; x.beginPath(); x.moveTo(500, 820); x.lineTo(500, 520); x.arc(450, 520, 50, 0, Math.PI, true); x.stroke(); x.strokeStyle = "#fff"; x.lineWidth = 24; x.stroke();
    x.strokeStyle = "#e8352b"; x.setLineDash([22, 22]); x.stroke(); x.setLineDash([])}},
  {motif: "聖誕襪掛在壁爐上，裡面塞滿禮物和糖果。", phrase: "好運連連", colors: RED, sky: ["#ffe2c8", "#ffb89a"], scene(x){
    x.beginPath(); x.roundRect(120, 380, 760, 60, 12); ink(x, "#a05a3a");
    for(const [cx, c] of [[300, "#e8352b"], [700, "#3fae5a"]]){x.beginPath(); x.moveTo(cx - 70, 440); x.lineTo(cx + 70, 440); x.lineTo(cx + 70, 640); x.quadraticCurveTo(cx + 70, 720, cx - 10, 720); x.lineTo(cx - 90, 720); x.quadraticCurveTo(cx - 150, 720, cx - 150, 670); x.quadraticCurveTo(cx - 150, 620, cx - 70, 620); x.closePath(); ink(x, c);
      x.beginPath(); x.roundRect(cx - 85, 430, 170, 60, 20); ink(x, "#fff"); face(x, cx, 580, 50, {happy: c === "#3fae5a"})}
    C.candy(x, 500, 560, 40, "#ff8fd0", .3); C.star(x, 500, 300, 60, "#ffd84a", {happy: true}); C.hill(x, 860, "#ffd0a8", 16)}},
]);

/* 元旦 */
cartoonSet("newyear", [
  {motif: "跨年時鐘寶寶指向十二點，煙火在天空開花。", phrase: "新年快樂", colors: NAVY, sky: ["#1f2d66", "#4b4aa8"], scene(x){
    fireworkC(x, 220, 340, 110, "#ffd84a"); fireworkC(x, 790, 330, 100, "#ff8fd0"); clock(x, 500, 560, 220); C.hill(x, 860, "#3a3a8a", 20)}},
  {motif: "太陽寶寶從雲海裡探頭，跟大家說新年好。", phrase: "旭日東昇", colors: ORANGE, sky: ["#ffe8b8", "#ffb87a"], scene(x){
    C.sun(x, 500, 560, 160, "#ffd84a", {open: true}); C.cloud(x, 250, 760, 200); C.cloud(x, 760, 760, 200); C.cloud(x, 500, 820, 220)}},
  {motif: "一束彩色氣球帶著新年年份往上飛。", phrase: "萬象更新", colors: BLUE, sky: ["#c8ecff", "#ffe2f0"], scene(x){
    C.confetti(x, 12, 50, [70, 220, 930, 860], ["#ff5a5a", "#ffd84a", "#5ab0ff", "#7ed957"]);
    [[300, 420, "#ff5a5a"], [500, 360, "#ffd84a"], [700, 420, "#5ab0ff"], [400, 540, "#7ed957"], [600, 540, "#ff8fd0"]].forEach(([cx, cy, c]) => C.balloon(x, cx, cy, 75, c));
    C.text(x, String(year), 500, 820, 120, "#e8352b")}},
  {motif: "嶄新日曆寶寶翻開第一頁，寫著一月一日。", phrase: "一元復始", colors: RED, sky: ["#fff2d8", "#ffd2a0"], scene(x){
    C.sparkles(x, 3, 16, [80, 230, 920, 820], "#fff"); x.beginPath(); x.roundRect(290, 300, 420, 500, 30); ink(x, "#fff"); x.beginPath(); x.roundRect(290, 300, 420, 130, [30, 30, 0, 0]); ink(x, "#e8352b");
    for(const k of [-1, 1]){circle(x, 500 + k*120, 300, 22); ink(x, "#ffd84a")} C.text(x, "一月", 500, 368, 64, "#fff");
    C.text(x, "1", 500, 560, 220, "#e8352b"); face(x, 500, 720, 60, {happy: true})}},
  {motif: "香檳杯寶寶乾杯，泡泡和彩帶一起跳舞。", phrase: "舉杯同慶", colors: PURPLE, sky: ["#3a2a6a", "#a05aa8"], scene(x){
    C.confetti(x, 6, 60, [70, 220, 930, 860], ["#ffd84a", "#ff8fd0", "#7ec8ff"]);
    for(const k of [-1, 1]){x.save(); x.translate(500 + k*130, 560); x.rotate(k*-.25); x.beginPath(); x.moveTo(-90, -170); x.lineTo(90, -170); x.quadraticCurveTo(80, 40, 0, 50); x.quadraticCurveTo(-80, 40, -90, -170); ink(x, "#ffe08a");
      face(x, 0, -60, 45, {happy: k > 0}); x.beginPath(); x.roundRect(-10, 50, 20, 150, 6); ink(x, "#fff"); x.beginPath(); x.ellipse(0, 205, 70, 18, 0, 0, Math.PI*2); ink(x, "#fff"); x.restore()}
    for(const [cx, cy] of [[480, 300], [530, 250], [500, 200]]){circle(x, cx, cy, 16); ink(x, "rgba(255,255,255,.4)", 4)}}},
]);

/* 母親節 */
cartoonSet("mother", [
  {motif: "康乃馨寶寶一大束，綁著粉紅蝴蝶結送媽媽。", phrase: "媽媽我愛您", colors: PINK, sky: ["#ffe8f0", "#ffc8da"], scene(x){
    heartRain(x, 2, 14, ["#ff8fb1", "#fff"]); for(const [cx, cy, c] of [[380, 430, "#ff6f91"], [620, 430, "#ff8fb1"], [500, 360, "#ff4f7a"], [430, 540, "#ffb0c8"], [580, 540, "#ff6f91"]]){x.strokeStyle = "#3f9a52"; x.lineWidth = 10; x.beginPath(); x.moveTo(cx, cy); x.lineTo(500, 780); x.stroke(); C.mum(x, cx, cy, 70, c, cy === 360 ? {happy: true} : false)}
    rpoly(x, [[400, 700], [600, 700], [550, 830], [450, 830]], 14); ink(x, "#fff3f6"); C.heart(x, 500, 760, 50, "#ff4f7a", false)}},
  {motif: "小熊寶寶抱著愛心，給熊媽媽一個大擁抱。", phrase: "母愛無疆", colors: PINK, sky: ["#fff0e8", "#ffd0d8"], scene(x){
    heartRain(x, 5, 10, ["#ff8fb1"]); C.bear(x, 380, 560, 170, "#c8925a", {happy: true}); C.bear(x, 640, 640, 110, "#e0b080", {open: true}); C.heart(x, 560, 760, 70, "#ff4f7a", false); C.hill(x, 870, "#ffb0c8", 20)}},
  {motif: "草莓蛋糕寶寶插著蠟燭，寫著「謝謝媽媽」。", phrase: "感恩媽媽", colors: PINK, sky: ["#fff4e8", "#ffd8e0"], scene(x){
    C.sparkles(x, 7, 14, [80, 230, 920, 820], "#fff"); cake(x, 500, 610, 230, {happy: true}); C.text(x, "謝謝媽媽", 500, 810, 64, "#ff4f7a")}},
  {motif: "愛心氣球飛上天，每顆都寫著對媽媽的愛。", phrase: "媽媽辛苦了", colors: PINK, sky: ["#d8f0ff", "#ffe0ec"], scene(x){
    C.cloud(x, 220, 760, 140); C.cloud(x, 780, 780, 120);
    [[300, 440, "#ff6f91"], [500, 360, "#ff4f7a"], [700, 440, "#ff8fb1"]].forEach(([cx, cy, c], i) => {x.strokeStyle = OUT; x.lineWidth = 3; x.beginPath(); x.moveTo(cx, cy + 90); x.quadraticCurveTo(cx - 20, cy + 250, 500, 820); x.stroke(); C.heart(x, cx, cy, 100, c, i === 1 ? {happy: true} : false)});
    C.text(x, "愛", 300, 440, 70, "#fff"); C.text(x, "愛", 700, 440, 70, "#fff")}},
  {motif: "花園裡的花朵寶寶全都開了，一起祝媽媽快樂。", phrase: "花開富貴", colors: PINK, sky: ["#e8f8ff", "#fff0f4"], scene(x){
    C.sun(x, 780, 320, 70, "#ffd84a", {happy: true}); C.hill(x, 680, "#8fd07a", 50, 4);
    [[200, 640, "#ff6f91"], [380, 600, "#ffb0c8"], [560, 640, "#ff8fb1"], [760, 620, "#ffd0da"], [300, 760, "#ff4f7a"], [660, 770, "#ff6f91"], [480, 800, "#ffb0c8"]].forEach(([cx, cy, c], i) => {
      x.strokeStyle = "#3f9a52"; x.lineWidth = 8; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx, cy + 140); x.stroke(); C.flower(x, cx, cy, 55, c, "#ffd84a", i%2 ? false : {happy: i === 2})})}},
]);

/* 父親節 */
cartoonSet("father", [
  {motif: "爸爸的領帶寶寶笑咪咪，旁邊一顆大愛心。", phrase: "爸爸辛苦了", colors: BLUE, sky: ["#d8ecff", "#a8cdf0"], scene(x){
    C.sparkles(x, 4, 14, [80, 230, 920, 820], "#fff"); tie(x, 400, 520, 230); C.heart(x, 700, 560, 110, "#ff5a5a", {happy: true}); C.hill(x, 870, "#7aa8e0", 20)}},
  {motif: "熊爸爸揹著熊寶寶，一起去爬山。", phrase: "父愛如山", colors: GREEN, sky: ["#d8f0ff", "#fff2d0"], scene(x){
    C.hill(x, 620, "#8fd07a", 160, 7); C.sun(x, 780, 310, 70, "#ffd84a", {happy: true}); C.bear(x, 450, 600, 170, "#9b6136", {happy: true}); C.bear(x, 560, 420, 90, "#c8925a", {open: true}); C.hill(x, 850, "#5fb35f", 24)}},
  {motif: "一杯熱茶寶寶冒著熱氣，請爸爸休息一下。", phrase: "爸爸安康", colors: BROWN, sky: ["#fff3dc", "#f2d2a8"], scene(x){
    steam(x, 500, 420, 60); teacup(x, 500, 600, 190, {happy: true}); C.leaf(x, 300, 760, 120, -2.6, "#5fb35f"); C.leaf(x, 700, 760, 120, -.5, "#5fb35f"); x.beginPath(); x.ellipse(500, 800, 300, 36, 0, 0, Math.PI*2); ink(x, "#c8a070")}},
  {motif: "爸爸是超人！披風飄飄的超人寶寶飛上天。", phrase: "最棒的爸爸", colors: NAVY, sky: ["#c8e8ff", "#7cb8f0"], scene(x){
    C.cloud(x, 230, 720, 140); C.cloud(x, 770, 330, 110); x.beginPath(); x.moveTo(420, 500); x.quadraticCurveTo(250, 650, 200, 820); x.lineTo(440, 700); x.closePath(); ink(x, "#e8352b");
    C.ball(x, 520, 520, 150, "#ffd9b8", {open: true}); x.beginPath(); x.arc(520, 505, 156, Math.PI*1.05, Math.PI*1.95); x.lineTo(520, 400); x.closePath(); ink(x, OUT); C.star(x, 520, 720, 60, "#ffd84a", false)}},
  {motif: "工具箱寶寶跟爸爸一起修東西，萬事都搞定。", phrase: "萬事如意", colors: BLUE, sky: ["#fff3dc", "#ffd8a8"], scene(x){
    x.beginPath(); x.roundRect(260, 520, 480, 250, 24); ink(x, "#e8352b"); x.beginPath(); x.roundRect(400, 450, 200, 90, [30, 30, 0, 0]); x.lineWidth = 22; x.strokeStyle = OUT; x.stroke(); x.lineWidth = 12; x.strokeStyle = "#999"; x.stroke();
    face(x, 500, 640, 60, {happy: true}); x.save(); x.translate(250, 450); x.rotate(-.6); x.beginPath(); x.roundRect(-14, 0, 28, 200, 10); ink(x, "#c8803f"); x.beginPath(); x.roundRect(-60, -40, 120, 50, 10); ink(x, "#999"); x.restore();
    C.hill(x, 860, "#ffb04a", 18)}},
]);

/* 情人節 */
cartoonSet("valentine", [
  {motif: "兩顆愛心寶寶依偎在一起，四周飄著小愛心。", phrase: "情人節快樂", colors: PINK, sky: ["#ffe8f0", "#ffc0d4"], scene(x){
    heartRain(x, 3, 18, ["#ff8fb1", "#fff", "#ff4f7a"]); C.heart(x, 400, 560, 170, "#ff4f7a", {happy: true}); C.heart(x, 620, 590, 140, "#ff8fb1", {open: true}); C.hill(x, 870, "#ffb0c8", 20)}},
  {motif: "邱比特寶寶拉弓射出愛心箭。", phrase: "愛意滿滿", colors: PINK, sky: ["#e0f2ff", "#ffe0ec"], scene(x){
    C.cloud(x, 240, 760, 160); C.cloud(x, 780, 740, 140); cupid(x, 360, 520, 130); x.strokeStyle = OUT; x.lineWidth = 7; x.beginPath(); x.moveTo(470, 520); x.lineTo(760, 430); x.stroke(); C.heart(x, 790, 420, 60, "#ff4f7a", false)}},
  {motif: "一束紅玫瑰寶寶，綁著緞帶送給最愛的人。", phrase: "浪漫情深", colors: RED, sky: ["#fff0ec", "#ffc8c8"], scene(x){
    heartRain(x, 9, 10, ["#ff8fb1"]); for(const [cx, cy] of [[400, 450], [600, 450], [500, 380], [450, 540], [560, 540]]){x.strokeStyle = "#3f9a52"; x.lineWidth = 10; x.beginPath(); x.moveTo(cx, cy); x.lineTo(500, 800); x.stroke(); rose(x, cx, cy, 62)}
    face(x, 500, 380, 40, {happy: true}); x.beginPath(); x.ellipse(500, 720, 90, 40, 0, 0, Math.PI*2); ink(x, "#ff8fb1")}},
  {motif: "愛心巧克力禮盒打開了，巧克力寶寶甜甜笑。", phrase: "甜甜蜜蜜", colors: BROWN, sky: ["#fff0e8", "#ffd0d8"], scene(x){
    C.sparkles(x, 5, 14, [80, 230, 920, 820], "#fff"); C.heart(x, 500, 560, 260, "#e8352b", false); C.heart(x, 500, 560, 210, "#ffe8ec", false);
    [[420, 500], [580, 500], [500, 610], [420, 650], [580, 650]].forEach(([cx, cy], i) => C.ball(x, cx, cy, 48, "#7a4026", i === 2 ? {happy: true} : false))}},
  {motif: "兩隻小鳥寶寶站在樹枝上，中間一顆愛心。", phrase: "比翼雙飛", colors: PINK, sky: ["#e0f4ff", "#fff0f6"], scene(x){
    x.strokeStyle = "#6b4423"; x.lineWidth = 18; x.lineCap = "round"; x.beginPath(); x.moveTo(80, 700); x.quadraticCurveTo(500, 640, 920, 720); x.stroke();
    for(const k of [-1, 1]){C.ball(x, 500 + k*170, 590, 90, k < 0 ? "#7ec8ff" : "#ff8fb1", {happy: true}); rpoly(x, [[500 + k*90, 580], [500 + k*60, 595], [500 + k*90, 610]], 4); ink(x, "#ff9f1c", 3)}
    C.heart(x, 500, 470, 60, "#ff4f7a", false); C.flower(x, 200, 680, 40, "#fff", "#ffd84a"); C.flower(x, 820, 700, 40, "#fff", "#ffd84a")}},
]);

/* 復活節 */
cartoonSet("easter", [
  {motif: "兔子寶寶抱著彩蛋，在草地上蹦蹦跳。", phrase: "復活節快樂", colors: GREEN, sky: ["#d8f2ff", "#fff4d8"], scene(x){
    C.sun(x, 790, 310, 60, "#ffd84a", {happy: true}); C.hill(x, 720, "#8fd07a", 60, 5); C.bunny(x, 420, 590, 150, "#fff", {open: true});
    C.egg(x, 640, 720, 130, 170, "#7ec8ff", [[-.15, "#fff"], [.15, "#ffd84a", "dots"]], false); C.flower(x, 180, 800, 40, "#ff8fb1"); C.flower(x, 820, 820, 40, "#fff")}},
  {motif: "三顆彩蛋寶寶躺在草籃裡，花紋各不相同。", phrase: "春回大地", colors: PURPLE, sky: ["#fff0f8", "#e0d8ff"], scene(x){
    C.sparkles(x, 8, 14, [80, 230, 920, 600], "#fff");
    C.egg(x, 340, 560, 170, 230, "#ff8fb1", [[-.2, "#fff"], [.05, "#ffd84a", "dots"], [.25, "#fff"]], {happy: true}); C.egg(x, 660, 560, 170, 230, "#7ed957", [[-.2, "#fff", "dots"], [.1, "#5ab0ff"]], {});
    C.egg(x, 500, 520, 190, 260, "#ffd84a", [[-.15, "#ff8fb1"], [.15, "#7ec8ff", "dots"]], {open: true});
    x.beginPath(); x.moveTo(180, 640); x.lineTo(820, 640); x.quadraticCurveTo(800, 840, 500, 840); x.quadraticCurveTo(200, 840, 180, 640); ink(x, "#d9a066")}},
  {motif: "小雞寶寶剛從彩蛋殼裡探出頭來。", phrase: "新生希望", colors: ORANGE, sky: ["#e8f8ff", "#fff2c8"], scene(x){
    C.cloud(x, 230, 330, 100); C.chick(x, 500, 540, 130, {open: true});
    rpoly(x, [[330, 600], [380, 560], [430, 600], [480, 560], [520, 600], [570, 560], [620, 600], [670, 560], [670, 760], [330, 760]], 8); ink(x, "#b8a8ff");
    C.hill(x, 800, "#8fd07a", 30); C.flower(x, 200, 820, 40, "#fff"); C.flower(x, 800, 820, 40, "#ff8fb1")}},
  {motif: "彩蛋大搜查！草叢裡藏著好多顆彩蛋。", phrase: "好運滿滿", colors: GREEN, sky: ["#cfeeff", "#e8fbe0"], scene(x){
    C.sun(x, 210, 320, 60, "#ffd84a", {}); C.hill(x, 640, "#8fd07a", 70, 8);
    [[200, 700, "#ff8fb1"], [380, 660, "#7ec8ff"], [560, 720, "#ffd84a"], [760, 680, "#b8a8ff"], [300, 800, "#7ed957"], [650, 820, "#ff9f43"]].forEach(([cx, cy, c], i) => C.egg(x, cx, cy, 90, 120, c, [[0, "#fff", i%2 ? "dots" : ""]], i === 2 ? {happy: true} : false));
    C.bunny(x, 740, 480, 70, "#fff", {happy: true})}},
  {motif: "鬱金香花園裡，兔子寶寶跟小雞一起野餐。", phrase: "春光明媚", colors: PINK, sky: ["#e0f4ff", "#fff0f4"], scene(x){
    C.hill(x, 700, "#8fd07a", 50, 9); for(const [cx, c] of [[150, "#ff5a5a"], [270, "#ffd84a"], [730, "#ff8fb1"], [850, "#ff5a5a"]]){x.strokeStyle = "#3f9a52"; x.lineWidth = 8; x.beginPath(); x.moveTo(cx, 620); x.lineTo(cx, 760); x.stroke(); rpoly(x, [[cx - 40, 560], [cx - 20, 590], [cx, 555], [cx + 20, 590], [cx + 40, 560], [cx + 35, 630], [cx - 35, 630]], 10); ink(x, c, 5)}
    C.bunny(x, 430, 600, 110, "#fff", {happy: true}); C.chick(x, 600, 650, 70, {}); x.beginPath(); x.ellipse(500, 780, 260, 50, 0, 0, Math.PI*2); ink(x, "#ff8fb1")}},
]);

/* 萬聖節 */
cartoonSet("halloween", [
  {motif: "南瓜寶寶戴著巫師帽，一點都不可怕。", phrase: "萬聖節快樂", colors: PURPLE, sky: ["#2a1f4a", "#6a3a8a"], scene(x){
    C.sparkles(x, 2, 20, [70, 220, 930, 600], "#ffe8a0"); fullMoon(x, 780, 320, 80, false); C.pumpkin(x, 500, 640, 180, "#ff8c1a", {open: true}); witchHat(x, 500, 480, 150); C.hill(x, 860, "#3a2a5a", 20)}},
  {motif: "小幽靈寶寶飄來飄去，手上提著糖果籃。", phrase: "不給糖就搗蛋", colors: PURPLE, sky: ["#3a2a6a", "#8a5aa8"], scene(x){
    C.sparkles(x, 5, 18, [70, 220, 930, 820], "#fff"); C.ghost(x, 420, 520, 150, "#fbfbff", {open: true}); C.ghost(x, 720, 450, 80, "#fbfbff", {happy: true});
    C.candy(x, 300, 780, 40, "#ff8fd0", .4); C.candy(x, 650, 780, 40, "#7ed957", -.3); C.candy(x, 480, 820, 36, "#ffd84a", .1)}},
  {motif: "黑貓寶寶坐在南瓜旁，月亮上飛過小蝙蝠。", phrase: "古靈精怪", colors: NAVY, sky: ["#1f1f4a", "#4a3a7a"], scene(x){
    fullMoon(x, 500, 400, 170, {happy: true}); bat(x, 260, 330, 60); bat(x, 760, 290, 50); C.cat(x, 360, 680, 120, "#3a3350", {}); C.pumpkin(x, 640, 720, 110, "#ff8c1a", {happy: true}); C.hill(x, 860, "#2a2a4a", 20)}},
  {motif: "一堆糖果寶寶從南瓜桶裡滿出來。", phrase: "糖果滿滿", colors: ORANGE, sky: ["#ffe8c8", "#ffb87a"], scene(x){
    C.confetti(x, 4, 40, [70, 220, 930, 600], ["#7ed957", "#b8a8ff", "#ffd84a"]); [[380, 440, "#ff8fd0"], [520, 400, "#7ed957"], [640, 460, "#5ab0ff"], [460, 500, "#ffd84a"]].forEach(([cx, cy, c], i) => C.candy(x, cx, cy, 42, c, i*.4));
    C.pumpkin(x, 500, 660, 200, "#ff8c1a", {open: true}); x.strokeStyle = OUT; x.lineWidth = 10; x.beginPath(); x.arc(500, 560, 230, Math.PI*1.15, Math.PI*1.85); x.stroke()}},
  {motif: "南瓜燈籠一排排亮起來，照亮萬聖夜。", phrase: "歡樂萬聖夜", colors: PURPLE, sky: ["#1f1f4a", "#5a3a8a"], scene(x){
    C.sparkles(x, 9, 20, [70, 220, 930, 600], "#ffe8a0"); x.strokeStyle = OUT; x.lineWidth = 6; x.beginPath(); x.moveTo(60, 300); x.quadraticCurveTo(500, 380, 940, 300); x.stroke();
    [[200, 470], [400, 520], [600, 520], [800, 470]].forEach(([cx, cy], i) => {x.strokeStyle = OUT; x.lineWidth = 4; x.beginPath(); x.moveTo(cx, cy - 140); x.lineTo(cx, cy - 80); x.stroke(); C.pumpkin(x, cx, cy, 80, "#ff8c1a", i%2 ? {happy: true} : {open: true})});
    C.ghost(x, 500, 720, 70, "#fbfbff", {happy: true}); C.hill(x, 860, "#3a2a5a", 20)}},
]);

/* 感恩節 */
cartoonSet("thanksgiving", [
  {motif: "火雞寶寶開屏，彩色羽毛像一把扇子。", phrase: "感恩節快樂", colors: BROWN, sky: ["#fff2d8", "#ffcf9a"], scene(x){
    const r = rand(5); for(let i = 0; i < 12; i++) C.maple(x, 90 + r()*820, 260 + r()*540, 22 + r()*12, ["#e8553a", "#f39c32", "#f7c948"][i%3], r()*3);
    C.turkey(x, 500, 600, 200, {happy: true}); C.hill(x, 860, "#d9a066", 20)}},
  {motif: "南瓜派寶寶熱騰騰出爐，香味飄滿屋。", phrase: "感恩滿懷", colors: ORANGE, sky: ["#fff4e0", "#ffd8b0"], scene(x){
    steam(x, 500, 470, 60); pie(x, 500, 640, 230, {happy: true}); C.maple(x, 200, 400, 50, "#e8553a", .3); C.maple(x, 800, 420, 46, "#f39c32", -.4)}},
  {motif: "楓葉寶寶一片片隨風跳舞。", phrase: "秋意濃濃", colors: ORANGE, sky: ["#ffe8c8", "#ffc890"], scene(x){
    C.maple(x, 500, 540, 200, "#e8553a", -.1, {happy: true}); C.maple(x, 230, 380, 80, "#f39c32", .5, {}); C.maple(x, 780, 400, 90, "#f7c948", -.4, {open: true}); C.maple(x, 260, 740, 70, "#f7c948", .9); C.maple(x, 760, 740, 75, "#e8553a", -.8); C.hill(x, 880, "#d9a066", 16)}},
  {motif: "豐收的玉米、南瓜和蘋果，擺滿一籃子。", phrase: "五穀豐收", colors: BROWN, sky: ["#fff2d0", "#ffd890"], scene(x){
    C.sparkles(x, 3, 12, [80, 230, 920, 520], "#fff"); corn(x, 330, 520, 150, -.4); corn(x, 670, 520, 150, .4); C.pumpkin(x, 500, 560, 110, "#ff8c1a", {happy: true}); C.ball(x, 380, 640, 55, "#e8352b", false); C.ball(x, 620, 640, 55, "#7ed957", false);
    x.beginPath(); x.moveTo(220, 640); x.lineTo(780, 640); x.quadraticCurveTo(760, 840, 500, 840); x.quadraticCurveTo(240, 840, 220, 640); ink(x, "#c8803f")}},
  {motif: "一家人圍著餐桌，火雞、南瓜派都笑呵呵。", phrase: "闔家團圓", colors: BROWN, sky: ["#fff0dc", "#f2c8a0"], scene(x){
    x.beginPath(); x.ellipse(500, 700, 400, 110, 0, 0, Math.PI*2); ink(x, "#fff8ec"); C.turkey(x, 500, 560, 120, {open: true}); pie(x, 250, 700, 80, {}); C.pumpkin(x, 760, 690, 60, "#ff8c1a", {happy: true});
    C.maple(x, 200, 360, 46, "#e8553a", .3); C.maple(x, 800, 340, 40, "#f39c32", -.3)}},
]);
})();
