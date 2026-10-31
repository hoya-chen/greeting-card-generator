/* 復活節 (easter). Owner of this file: the 復活節 designer. Add designs and messages here only. */
(() => {
  const C = CT;
  const lily = (x, f, cx, cy, s, rot) => {x.save(); x.translate(cx, cy); x.rotate(rot || 0);
    for(const a of [-.7, 0, .7]){x.save(); x.rotate(a); x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(-s*.35, -s*.6, 0, -s*1.1); x.quadraticCurveTo(s*.35, -s*.6, 0, 0); ink(x, "#fff6e6", 4); x.restore()}
    x.strokeStyle = f.gold; x.lineWidth = 3; for(const a of [-.3, 0, .3]){x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(a)*s*.7, -Math.cos(a)*s*.7); x.stroke(); circle(x, Math.sin(a)*s*.7, -Math.cos(a)*s*.7, 6); x.fillStyle = f.gold; x.fill()}
    x.restore()};
  const bands = f => [[-.28, f.gold], [-.08, "#fff6e6", "dots"], [.12, f.gold], [.3, "#fff6e6", "dots"]];
  // 1 one big jewelled egg between spring flowers
  const bigEgg = (x, f) => {stars(x, f, 4, 50, [70, 200, 930, 860]); goldLine(f, () => {C.egg(x, 500, 560, 340, 450, "#7a2a8a", bands(f), false);
    for(const k of [-1, 1]){C.flower(x, 500 + k*290, 760, 60, "#fff6e6", f.gold, false, 5); C.leaf(x, 500 + k*230, 820, 110, k < 0 ? -2.8 : -.3, "#3f7a3a")}}); return 890};
  // 2 Easter lilies
  const lilies = (x, f) => {stars(x, f, 6, 50, [70, 200, 930, 860]); x.strokeStyle = "#5a9a4a"; x.lineWidth = 8; x.beginPath(); x.moveTo(500, 820); x.lineTo(500, 380); x.moveTo(500, 600); x.quadraticCurveTo(380, 520, 320, 470); x.moveTo(500, 560); x.quadraticCurveTo(620, 480, 680, 430); x.stroke();
    goldLine(f, () => {lily(x, f, 500, 380, 170); lily(x, f, 320, 470, 140, -.6); lily(x, f, 680, 430, 140, .6); C.leaf(x, 500, 760, 150, -2.6, "#3f7a3a"); C.leaf(x, 500, 720, 150, -.5, "#3f7a3a")}); return 890};
  // 3 paper-cut rabbit under a gold moon
  const rabbit = (x, f) => {stars(x, f, 8, 60, [70, 200, 930, 860]); x.fillStyle = f.gold; circle(x, 500, 500, 250); x.fill();
    x.fillStyle = f.paper2; x.beginPath(); x.ellipse(520, 620, 170, 120, 0, 0, Math.PI*2); x.fill(); circle(x, 400, 500, 90); x.fill();
    for(const a of [-.35, -.05]){x.save(); x.translate(400, 430); x.rotate(a); x.beginPath(); x.ellipse(0, -110, 34, 110, 0, 0, Math.PI*2); x.fill(); x.restore()} circle(x, 690, 600, 40); x.fill();
    x.fillStyle = f.gold; circle(x, 370, 490, 12); x.fill(); return 890};
  // 4 basket of three eggs
  const basket = (x, f) => {stars(x, f, 10, 50, [70, 200, 930, 860]); goldLine(f, () => {x.lineWidth = 10; x.strokeStyle = f.gold; x.beginPath(); x.arc(500, 600, 260, Math.PI*1.08, Math.PI*1.92); x.stroke();
    C.egg(x, 380, 560, 150, 200, "#2f6a8a", [[-.15, f.gold], [.15, "#fff6e6", "dots"]], false); C.egg(x, 620, 560, 150, 200, "#7a2a8a", [[-.15, "#fff6e6", "dots"], [.15, f.gold]], false); C.egg(x, 500, 520, 170, 230, "#b8302a", bands(f), false);
    x.beginPath(); x.moveTo(220, 620); x.lineTo(780, 620); x.quadraticCurveTo(760, 830, 500, 830); x.quadraticCurveTo(240, 830, 220, 620); ink(x, f.paper2, 5);
    x.strokeStyle = f.gold; x.lineWidth = 3; for(let i = 0; i < 4; i++){x.beginPath(); x.moveTo(240 + i*8, 670 + i*40); x.lineTo(760 - i*8, 670 + i*40); x.stroke()}}); return 890};
  // 5 spring sunrise over hills with flowers
  const sunrise = (x, f) => {x.save(); x.strokeStyle = f.gold; x.lineWidth = 4; x.globalAlpha = .6; for(let i = 0; i < 19; i++){const a = Math.PI + i*Math.PI/18; x.beginPath(); x.moveTo(500 + Math.cos(a)*190, 620 + Math.sin(a)*190); x.lineTo(500 + Math.cos(a)*300, 620 + Math.sin(a)*300); x.stroke()} x.restore();
    x.fillStyle = f.gold; circle(x, 500, 620, 170); x.fill(); goldLine(f, () => {C.hill(x, 700, f.paper2, 60, 3); C.hill(x, 800, "#3f6a3a", 40, 6);
      for(const [cx, cy] of [[180, 780], [330, 820], [670, 820], [820, 780]]) C.flower(x, cx, cy, 36, "#fff6e6", f.gold, false, 5)}); return 900};

  registerFest({
    id: "easter", name: "復活節", phrase: "春回大地",
    paper: "#5a2a6e", paper2: "#33163f", gold: "#f2d27e",
    // up to 56 characters each; exactly 20 required
    msgs: [
      "復活節快樂！春暖花開，願您身體健康、心情愉快，處處有好消息。",
      "春天回來了，萬物重生。願您精神飽滿，日子充滿希望與喜樂。",
      "彩蛋藏著驚喜，春天帶來希望。祝您復活節平安，福氣滿滿。",
      "願春天的陽光照進您心裡，帶給您溫暖、健康與滿滿的笑容。",
      "復活節到了，祝您像春花一樣綻放，像小雞一樣活力十足。",
      "新生的季節，願您煩惱全消，健康長壽，天天都有好心情。",
      "願您在這美好的春日，和家人一起踏青賞花，共享天倫之樂。",
      "祝您復活節快樂！平安是福，健康是寶，願您兩樣都擁有。",
      "春風吹來好運氣，彩蛋裝滿小幸福。祝您萬事如意。",
      "願這個春天帶給您新的希望、新的力氣，一切都順順利利。",
      "百花盛開的季節，祝您身強體健、笑口常開，闔家平安。",
      "復活節的祝福送給您：願您天天被愛包圍，日日有喜事。",
      "像兔子一樣蹦蹦跳跳，像花兒一樣開開心心。復活節快樂！",
      "願春天的每一朵花，都為您帶來一份健康與快樂。",
      "祝您復活節平安喜樂，生活像彩蛋一樣多彩繽紛。",
      "新的季節，新的開始。願您身體越來越好，心情越來越美。",
      "謝謝您一直以來的照顧。復活節快樂，祝您福壽安康。",
      "願春光明媚照您家，平安健康伴您身，快樂幸福滿心頭。",
      "大地回春，生機無限。祝您精神飽滿，諸事順遂。",
      "復活節快樂！願您收到滿籃的彩蛋，也收到滿滿的祝福。",
    ],
    designs: [
      {motif: "一顆鑲著金色花紋的紫色大彩蛋，兩旁白花綻放。", draw: bigEgg},
      {motif: "三朵潔白的復活節百合，金色花蕊，綠葉相襯。", phrase: "純潔希望", draw: lilies},
      {motif: "金色圓月裡一隻剪紙兔子的剪影。", phrase: "玉兔迎春", draw: rabbit},
      {motif: "草編籃子裡放著三顆金紋彩蛋。", phrase: "好運滿籃", draw: basket},
      {motif: "春日旭日從山丘升起，山坡上開滿白花。", phrase: "新生希望", draw: sunrise},
    ],
  });
})();

/* 自然風景照樣板：照片在 bg/easter/，來源與授權見 bg/CREDITS.md */
FESTS.find(f => f.id === "easter").designs.push(...photoSet("easter", [
  ["盛開的紫丁香。", "春回大地"],
  ["藍天下的櫻花。", "春暖花開"],
  ["春天的雛菊花海。", "生機盎然"],
  ["一片黃水仙。", "新生希望"],
  ["山坡上的水仙花。", "喜氣洋洋"],
  ["黃色鬱金香與紫色小花的花園。", "春光明媚"],
  ["荷蘭田野上的鬱金香。", "花開富貴"],
  ["藍天下開滿粉紅花的樹。", "好運滿滿"],
  ["綠草如茵的山谷與溪流。", "平安喜樂"],
  ["林間的藍鈴花海。", "復活節快樂"],
]));
