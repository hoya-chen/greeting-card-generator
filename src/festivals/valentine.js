/* 情人節 (valentine). Owner of this file: the 情人節 designer. Add designs and messages here only. */
(() => {
  const C = CT;
  const roseG = (x, f, cx, cy, r) => {C.leaf(x, cx - r*.2, cy + r*.8, r*1.1, 2.3, "#2f6b3a"); C.leaf(x, cx + r*.2, cy + r*.8, r*1.1, .8, "#2f6b3a"); circle(x, cx, cy, r); ink(x, "#c8203a", 4);
    x.strokeStyle = f.gold; x.lineWidth = 3; x.beginPath(); for(let a = 0; a < 12; a += .2){const rr = r*.08*a; x.lineTo(cx + Math.cos(a)*rr*.85, cy + Math.sin(a)*rr*.85)} x.stroke()};
  // 1 two linked hearts with 愛
  const twoHearts = (x, f) => {stars(x, f, 3, 60, [70, 200, 930, 860]); goldLine(f, () => {C.heart(x, 400, 520, 190, f.paper2, false); C.heart(x, 600, 560, 190, "rgba(0,0,0,0)", false)});
    x.fillStyle = f.gold; x.font = `700 150px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("愛", 410, 510); burst(x, f, 760, 300, 60, 12, f.gold); return 890};
  // 2 bouquet of roses
  const bouquet = (x, f) => {stars(x, f, 5, 50, [70, 200, 930, 860]); goldLine(f, () => {for(const [cx, cy] of [[400, 440], [600, 440], [500, 370], [440, 540], [560, 540]]){x.strokeStyle = f.gold; x.lineWidth = 6; x.beginPath(); x.moveTo(cx, cy); x.lineTo(500, 790); x.stroke(); roseG(x, f, cx, cy, 64)}
    rpoly(x, [[380, 640], [620, 640], [560, 820], [440, 820]], 12); ink(x, f.paper2, 4); C.heart(x, 500, 720, 46, "#c8203a", false)}); return 890};
  // 3 Chinese knot heart (同心結)
  const knot = (x, f) => {cloud(x, f, 200, 300, .9, f.paper2); cloud(x, f, 800, 320, .8, f.paper2); goldLine(f, () => C.heart(x, 500, 560, 230, "#c8203a", false));
    x.save(); x.beginPath(); x.moveTo(500, 560 + 230*.9); x.bezierCurveTo(500 - 345, 560, 500 - 207, 560 - 265, 500, 560 - 103); x.bezierCurveTo(500 + 207, 560 - 265, 500 + 345, 560, 500, 560 + 207); x.clip();
    x.strokeStyle = f.gold; x.lineWidth = 3; x.globalAlpha = .7; for(let k = -12; k <= 12; k++){x.beginPath(); x.moveTo(500 + k*40 - 400, 300); x.lineTo(500 + k*40 + 400, 1100); x.moveTo(500 + k*40 + 400, 300); x.lineTo(500 + k*40 - 400, 1100); x.stroke()} x.restore();
    x.strokeStyle = f.gold; x.lineWidth = 6; x.beginPath(); x.moveTo(500, 200); x.lineTo(500, 360); x.stroke(); for(let i = -3; i <= 3; i++){x.beginPath(); x.moveTo(500 + i*8, 770); x.lineTo(500 + i*14, 880); x.stroke()} return 920};
  // 4 love letter
  const letter = (x, f) => {stars(x, f, 7, 50, [70, 200, 930, 860]); goldLine(f, () => {x.beginPath(); x.roundRect(230, 420, 540, 360, 18); ink(x, "#fff3dc", 5);
    x.beginPath(); x.moveTo(230, 430); x.lineTo(500, 640); x.lineTo(770, 430); ink(x, "rgba(0,0,0,0)", 5); C.heart(x, 500, 610, 60, "#c8203a", false)});
    for(const [cx, cy, s] of [[260, 320, 40], [740, 300, 52], [500, 270, 30]]) goldLine(f, () => C.heart(x, cx, cy, s, "#c8203a", false)); return 890};
  // 5 two linked gold rings under a heart
  const rings = (x, f) => {stars(x, f, 9, 60, [70, 200, 930, 860]); x.fillStyle = f.gold; x.globalAlpha = .18; circle(x, 500, 560, 280); x.fill(); x.globalAlpha = 1;
    x.lineWidth = 34; x.strokeStyle = f.paper2; for(const cx of [410, 590]){circle(x, cx, 620, 140); x.stroke()}
    x.lineWidth = 24; x.strokeStyle = f.gold; circle(x, 410, 620, 140); x.stroke(); circle(x, 590, 620, 140); x.stroke();
    x.strokeStyle = f.paper2; x.lineWidth = 34; x.beginPath(); x.arc(410, 620, 140, -.5, .1); x.stroke(); x.strokeStyle = f.gold; x.lineWidth = 24; x.stroke();
    goldLine(f, () => C.heart(x, 500, 370, 80, "#c8203a", false)); sparkle4(x, 300, 480, 22, f.gold); sparkle4(x, 700, 470, 18, f.gold); return 890};

  registerFest({
    id: "valentine", name: "情人節", phrase: "情深意長",
    paper: "#a3182a", paper2: "#5e0c18", gold: "#f3cf86",
    // up to 56 characters each; exactly 20 required
    msgs: [
      "情人節快樂！願您們恩恩愛愛、甜甜蜜蜜，牽手走過每一個春夏秋冬。",
      "祝福您們的愛情像陳年老酒，越陳越香，越久越甜。",
      "執子之手，與子偕老。願您們身體健康，相親相愛到白頭。",
      "謝謝您們讓我看見愛最美的樣子。情人節快樂，永遠幸福！",
      "情人節到了，願您們心心相印、天天開心，日子越過越甜。",
      "願您們今天一起吃頓好飯、散散步，把愛說出口。情人節快樂！",
      "幾十年如一日的相伴最動人。祝您們情深意長，平安喜樂。",
      "有您們在，家裡就有滿滿的愛。祝情人節快樂，恩愛如初。",
      "愛是彼此照顧、互相扶持。祝您們健康長壽，攜手共度好時光。",
      "玫瑰代表愛，巧克力代表甜。願您們的每一天都又愛又甜。",
      "情人節快樂！願您們笑口常開，相知相惜，幸福長長久久。",
      "最浪漫的事，就是陪您一起慢慢變老。祝您們白頭偕老。",
      "願天下有情人終成眷屬，也願您們的愛一年比一年更深。",
      "今天不只是情人節，也是感謝您們相愛相守的日子。",
      "祝您們心意相通、和和美美，平平安安過好每一天。",
      "愛在日常的一粥一飯裡。祝您們身體安康，恩愛甜蜜。",
      "願這份愛像春天的花，年年盛開；像冬天的陽光，日日溫暖。",
      "情人節快樂！記得互相說聲「我愛你」，幸福就在身邊。",
      "願您們永遠是彼此最好的伴，一起看日出，一起看夕陽。",
      "祝福滿滿送給最恩愛的您們：情人節快樂，百年好合。",
    ],
    designs: [
      {motif: "兩顆相扣的金邊愛心，中央一個「愛」字。", draw: twoHearts},
      {motif: "一束紅玫瑰綁著愛心緞帶，金色線條描邊。", phrase: "花開並蒂", draw: bouquet},
      {motif: "紅色同心結愛心，織滿金色格紋，下垂流蘇。", phrase: "永結同心", draw: knot},
      {motif: "一封以愛心封口的情書，四周飄著小愛心。", phrase: "情書一封", draw: letter},
      {motif: "一對相扣的金戒指，上方一顆紅色愛心。", phrase: "百年好合", draw: rings},
    ],
  });
})();

/* 自然風景照樣板：照片在 bg/valentine/，來源與授權見 bg/CREDITS.md */
FESTS.find(f => f.id === "valentine").designs.push(...photoSet("valentine", [
  ["花園裡盛開的紅玫瑰。", "愛意綿綿"],
  ["紅玫瑰花拱成的大愛心。", "心心相印"],
  ["粉紅與白色的玫瑰花。", "甜甜蜜蜜"],
  ["紅粉玫瑰配滿天星的花束。", "花開並蒂"],
  ["沾著露珠的紅玫瑰。", "情深意長"],
  ["一叢鮮紅的玫瑰。", "浪漫滿屋"],
  ["一簇粉紅玫瑰。", "恩愛甜蜜"],
  ["紅粉黃三色鬱金香花束。", "幸福美滿"],
  ["盛開的紅色鬱金香。", "情人節快樂"],
  ["粉紫色的晚霞天空。", "白頭偕老"],
]));
