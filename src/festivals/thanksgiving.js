/* 感恩節 (thanksgiving). Owner of this file: the 感恩節 designer. Add designs and messages here only. */
(() => {
  const C = CT;
  const wheat = (x, f, cx, base, len, a) => {x.save(); x.translate(cx, base); x.rotate(a); x.strokeStyle = f.gold; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -len); x.stroke(); x.fillStyle = f.gold;
    for(let i = 0; i < 7; i++) for(const k of [-1, 1]){x.save(); x.translate(0, -len + i*len*.06); x.rotate(k*.5); x.beginPath(); x.ellipse(k*8, 0, 7, 16, 0, 0, Math.PI*2); x.fill(); x.restore()} x.restore()};
  const apple = (x, f, cx, cy, r) => goldLine(f, () => {circle(x, cx, cy, r); ink(x, "#b8302a", 4); C.leaf(x, cx, cy - r, r*.7, -.6, "#3f7a3a")});
  // 1 horn of plenty
  const horn = (x, f) => {stars(x, f, 3, 50, [70, 200, 930, 860]); goldLine(f, () => {x.beginPath(); x.moveTo(820, 420); x.quadraticCurveTo(700, 460, 560, 470); x.lineTo(560, 760); x.quadraticCurveTo(760, 720, 860, 500); x.quadraticCurveTo(900, 420, 820, 420); ink(x, "#a8742a", 5);
    x.strokeStyle = f.gold; x.lineWidth = 3; for(let i = 1; i < 5; i++){x.beginPath(); x.moveTo(560 + i*55, 470 - i*8); x.quadraticCurveTo(580 + i*55, 600, 560 + i*55, 750 - i*20); x.stroke()}
    C.pumpkin(x, 440, 640, 110, "#d0661c", false); apple(x, f, 300, 560, 60); apple(x, f, 520, 520, 55); corn0(x, f); for(const [cx, cy] of [[350, 700], [400, 760], [300, 740]]){circle(x, cx, cy, 26); ink(x, "#6a2a6a", 3)}}); return 890};
  const corn0 = (x, f) => {x.save(); x.translate(260, 660); x.rotate(-1.1); x.beginPath(); x.ellipse(0, 0, 34, 100, 0, 0, Math.PI*2); ink(x, "#e8b030", 4); x.restore()};
  // 2 wreath of maple leaves around 謝
  const wreath = (x, f) => {stars(x, f, 5, 50, [70, 200, 930, 860]); goldLine(f, () => {for(let i = 0; i < 14; i++){const a = i*2*Math.PI/14; C.maple(x, 500 + Math.cos(a)*240, 540 + Math.sin(a)*240, 70, ["#c8401c", "#e0761c", "#c89a2a"][i%3], a + Math.PI/2)}});
    x.fillStyle = f.gold; x.font = `700 220px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("謝", 500, 550); return 890};
  // 3 sheaf of wheat
  const sheaf = (x, f) => {x.save(); x.fillStyle = f.gold; x.globalAlpha = .18; circle(x, 500, 520, 300); x.fill(); x.restore(); stars(x, f, 7, 40, [70, 200, 930, 860]);
    for(let i = -6; i <= 6; i++) wheat(x, f, 500 + i*4, 820, 520 - Math.abs(i)*12, i*.07); x.fillStyle = "#b8302a"; x.fillRect(440, 680, 120, 40); x.strokeStyle = f.gold; x.lineWidth = 3; x.strokeRect(440, 680, 120, 40); return 900};
  // 4 turkey in gold line
  const turkey = (x, f) => {stars(x, f, 9, 50, [70, 200, 930, 860]); goldLine(f, () => {const cols = ["#b8401c", "#d0661c", "#c89a2a", "#7a5a2a"];
    for(let i = 0; i < 9; i++){const a = Math.PI + (i + .5)*Math.PI/9; x.beginPath(); x.ellipse(500 + Math.cos(a)*190, 600 + Math.sin(a)*190, 50, 120, a + Math.PI/2, 0, Math.PI*2); ink(x, cols[i%4], 4)}
    circle(x, 500, 640, 150); ink(x, "#6a3a1a", 4); circle(x, 500, 470, 70); ink(x, "#7a4a2a", 4); rpoly(x, [[480, 480], [520, 480], [500, 510]], 4); ink(x, f.gold, 3);
    x.beginPath(); x.ellipse(520, 515, 12, 26, 0, 0, Math.PI*2); ink(x, "#b8302a", 3)}); x.fillStyle = f.gold; circle(x, 480, 455, 8); x.fill(); circle(x, 520, 455, 8); x.fill(); return 890};
  // 5 harvest table with pumpkins, apples and a candle
  const table = (x, f) => {stars(x, f, 11, 50, [70, 200, 930, 700]); x.save(); x.shadowColor = "#ffcf4a"; x.shadowBlur = 40; x.fillStyle = "#ffe08a"; x.beginPath(); x.ellipse(500, 330, 22, 44, 0, 0, Math.PI*2); x.fill(); x.restore();
    goldLine(f, () => {x.beginPath(); x.roundRect(460, 370, 80, 260, 10); ink(x, "#fff3dc", 4); C.pumpkin(x, 300, 640, 120, "#d0661c", false); C.pumpkin(x, 700, 660, 100, "#c89a2a", false)}); apple(x, f, 480, 700, 55); apple(x, f, 580, 720, 50);
    x.strokeStyle = f.gold; x.lineWidth = 4; x.beginPath(); x.moveTo(120, 790); x.lineTo(880, 790); x.stroke(); C.maple(x, 160, 300, 46, "#c8401c", .4); C.maple(x, 840, 320, 40, "#e0761c", -.4); return 900};

  registerFest({
    id: "thanksgiving", name: "感恩節", phrase: "感恩有您",
    paper: "#8a3418", paper2: "#4a1a08", gold: "#f2c46a",
    // up to 56 characters each; exactly 20 required
    msgs: [
      "感恩節快樂！謝謝您一路以來的照顧與疼愛，祝您身體健康。",
      "感謝生命中有您，讓我的日子充滿溫暖。祝您福壽安康。",
      "感恩的心，感謝有您。願您天天平安，事事順心。",
      "謝謝您的養育之恩，這份情我永遠記在心裡。感恩節快樂！",
      "秋天豐收的季節，願您收穫滿滿的健康、快樂與幸福。",
      "滴水之恩，湧泉相報。謝謝您為我做的一切，祝您萬事如意。",
      "感恩節到了，最想說的就是：謝謝您，我愛您。",
      "感謝您的包容與付出，願您的晚年生活悠閒自在，笑口常開。",
      "楓葉紅了，思念濃了。祝您感恩節快樂，健康長壽。",
      "一年辛勞，感謝有您。願您好好休息，享受團圓的溫暖。",
      "謝謝您總是把最好的留給我們。祝您感恩節快樂，闔家安康。",
      "有您在的地方就是家。感恩節快樂，願您平安喜樂。",
      "五穀豐登，萬事順遂。感謝您，也祝福您日子越過越好。",
      "感恩節快樂！願您吃得香、睡得好，天天都有好心情。",
      "感謝老天讓我有您這樣的家人，祝您身體硬朗，幸福滿滿。",
      "您的叮嚀是我最溫暖的依靠。感恩節快樂，謝謝您。",
      "懷著感恩的心，送上最誠摯的祝福：願您福如東海，壽比南山。",
      "感謝每一天的平凡與溫暖。祝您感恩節快樂，諸事順心。",
      "豐收時節話感恩，願您家庭和樂，身體安康。",
      "千言萬語說不盡，只想對您說聲謝謝。祝您永遠健康快樂。",
    ],
    designs: [
      {motif: "金邊豐收角裡滿出南瓜、蘋果、玉米與葡萄。", draw: horn},
      {motif: "紅橙楓葉圍成花環，中央一個金色「謝」字。", phrase: "感恩惜福", draw: wreath},
      {motif: "一束金黃麥穗用紅繩綁起，象徵五穀豐收。", phrase: "五穀豐登", draw: sheaf},
      {motif: "金色線條描繪的火雞展開扇形尾羽。", phrase: "感恩節快樂", draw: turkey},
      {motif: "豐收餐桌上點著蠟燭，擺著南瓜與紅蘋果。", phrase: "闔家團圓", draw: table},
    ],
  });
})();

/* 自然風景照樣板：照片在 bg/thanksgiving/，來源與授權見 bg/CREDITS.md */
FESTS.find(f => f.id === "thanksgiving").designs.push(...photoSet("thanksgiving", [
  ["街邊金黃的大樹。", "感恩有您"],
  ["鋪滿落葉的小路。", "秋意濃濃"],
  ["紅橙相間的楓樹。", "感恩惜福"],
  ["收割中的金黃麥田。", "五穀豐登"],
  ["等待收成的麥田。", "豐收喜悅"],
  ["一大堆金黃玉米。", "年年有餘"],
  ["夕陽下湖邊的秋林倒影。", "歲月靜好"],
  ["湖畔的紅葉。", "紅葉迎秋"],
  ["滿山紅葉。", "感恩節快樂"],
  ["河畔的秋色。", "闔家團圓"],
]));
