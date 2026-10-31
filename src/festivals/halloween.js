/* 萬聖節 (halloween). Owner of this file: the 萬聖節 designer. Add designs and messages here only. */
(() => {
  const C = CT;
  const batS = (x, f, cx, cy, s) => {x.save(); x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 2; x.beginPath(); x.moveTo(cx, cy - s*.2); x.quadraticCurveTo(cx - s*.6, cy - s*.7, cx - s*1.3, cy - s*.3);
    x.quadraticCurveTo(cx - s*.9, cy - s*.1, cx - s*.9, cy + s*.2); x.quadraticCurveTo(cx - s*.5, cy, cx, cy + s*.3); x.quadraticCurveTo(cx + s*.5, cy, cx + s*.9, cy + s*.2); x.quadraticCurveTo(cx + s*.9, cy - s*.1, cx + s*1.3, cy - s*.3);
    x.quadraticCurveTo(cx + s*.6, cy - s*.7, cx, cy - s*.2); x.fill(); x.stroke(); x.restore()};
  const glowMoon = (x, f, cx, cy, r) => {x.save(); x.shadowColor = f.gold; x.shadowBlur = 60; x.fillStyle = f.gold; circle(x, cx, cy, r); x.fill(); x.restore()};
  const jack = (x, f, cx, cy, r) => {goldLine(f, () => C.pumpkin(x, cx, cy, r, "#e0761c", false)); x.save(); x.fillStyle = "#ffe08a"; x.shadowColor = "#ffcf4a"; x.shadowBlur = 25;
    for(const k of [-1, 1]){rpoly(x, [[cx + k*r*.42, cy - r*.32], [cx + k*r*.22, cy - r*.02], [cx + k*r*.6, cy - r*.02]], 4); x.fill()}
    x.beginPath(); x.moveTo(cx - r*.55, cy + r*.18); for(let i = 0; i <= 8; i++) x.lineTo(cx - r*.55 + i*r*.1375, cy + r*.18 + (i%2 ? r*.12 : 0)); x.quadraticCurveTo(cx, cy + r*.75, cx - r*.55, cy + r*.18); x.fill(); x.restore()};
  // 1 glowing jack-o'-lantern
  const lantern = (x, f) => {stars(x, f, 3, 60, [70, 200, 930, 860]); glowMoon(x, f, 780, 300, 70); batS(x, f, 240, 300, 60); jack(x, f, 500, 600, 220); return 900};
  // 2 full moon, bare tree and bats
  const moonTree = (x, f) => {stars(x, f, 5, 60, [70, 200, 930, 860]); glowMoon(x, f, 560, 460, 220);
    x.save(); x.strokeStyle = f.paper2; x.lineCap = "round"; const br = (x0, y0, a, len, w) => {if(w < 2) return; const x1 = x0 + Math.cos(a)*len, y1 = y0 + Math.sin(a)*len; x.lineWidth = w; x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke(); br(x1, y1, a - .45, len*.72, w*.65); br(x1, y1, a + .35, len*.68, w*.65)};
    br(230, 860, -Math.PI/2 + .1, 200, 34); x.restore(); for(const [cx, cy, s] of [[640, 330, 50], [760, 420, 38], [480, 300, 32]]) batS(x, f, cx, cy, s); return 920};
  // 3 witch hat and broom
  const witch = (x, f) => {stars(x, f, 7, 60, [70, 200, 930, 860]); glowMoon(x, f, 500, 470, 200);
    goldLine(f, () => {x.beginPath(); x.ellipse(500, 640, 260, 50, 0, 0, Math.PI*2); ink(x, f.paper2, 4); rpoly(x, [[370, 640], [560, 260], [630, 640]], 16); ink(x, f.paper2, 4)});
    x.fillStyle = "#e0761c"; x.fillRect(380, 590, 245, 36); x.strokeStyle = f.gold; x.lineWidth = 3; x.strokeRect(380, 590, 245, 36); x.fillStyle = f.gold; x.fillRect(480, 586, 44, 44);
    x.strokeStyle = "#8a5a2a"; x.lineWidth = 14; x.lineCap = "round"; x.beginPath(); x.moveTo(170, 820); x.lineTo(780, 740); x.stroke(); x.strokeStyle = f.gold; x.lineWidth = 3;
    for(let i = -6; i <= 6; i++){x.beginPath(); x.moveTo(170, 820); x.lineTo(70, 820 + i*12); x.stroke()} return 900};
  // 4 bowl of candy
  const candy = (x, f) => {stars(x, f, 9, 50, [70, 200, 930, 860]); goldLine(f, () => {[[380, 520, "#e0761c"], [520, 470, "#7a3a9a"], [640, 530, "#3f8a4a"], [460, 580, "#c8203a"], [580, 600, "#e0761c"]].forEach(([cx, cy, c], i) => C.candy(x, cx, cy, 46, c, i*.5));
    x.beginPath(); x.moveTo(230, 600); x.lineTo(770, 600); x.quadraticCurveTo(750, 830, 500, 830); x.quadraticCurveTo(250, 830, 230, 600); ink(x, f.paper2, 5)});
    x.fillStyle = f.gold; x.font = `700 90px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("糖", 500, 715); batS(x, f, 220, 320, 50); batS(x, f, 780, 300, 56); return 900};
  // 5 castle under the moon
  const castle = (x, f) => {stars(x, f, 11, 70, [70, 200, 930, 860]); glowMoon(x, f, 500, 420, 180); x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 2;
    const tower = (cx, w, top) => {x.fillRect(cx - w/2, top, w, 850 - top); x.strokeRect(cx - w/2, top, w, 850 - top); x.beginPath(); x.moveTo(cx - w*.65, top); x.lineTo(cx, top - w*1.1); x.lineTo(cx + w*.65, top); x.closePath(); x.fill(); x.stroke();
      x.save(); x.fillStyle = "#ffcf4a"; x.fillRect(cx - 9, top + 50, 18, 30); x.restore()};
    x.fillRect(260, 640, 480, 210); x.strokeRect(260, 640, 480, 210); tower(300, 90, 520); tower(700, 90, 540); tower(500, 110, 470);
    x.save(); x.fillStyle = "#ffcf4a"; x.beginPath(); x.moveTo(470, 850); x.lineTo(470, 770); x.arc(500, 770, 30, Math.PI, 0); x.lineTo(530, 850); x.fill(); x.restore(); batS(x, f, 220, 300, 44); batS(x, f, 790, 330, 40); return 920};

  registerFest({
    id: "halloween", name: "萬聖節", phrase: "平安喜樂",
    paper: "#3e1f5a", paper2: "#1f0f30", gold: "#f2b84a",
    // up to 56 characters each; exactly 20 required
    msgs: [
      "萬聖節快樂！不給糖就搗蛋，送您一籃甜蜜蜜的祝福。",
      "南瓜燈亮起來，壞運氣都跑光光。祝您平安健康，天天開心。",
      "萬聖節到了，願所有小煩惱都被南瓜燈嚇跑，只留下快樂。",
      "送您一顆最甜的糖果，祝您生活甜甜蜜蜜，萬事如意。",
      "今晚月亮又圓又亮，願您心情也一樣明亮，身體健健康康。",
      "萬聖節快樂！願您像南瓜一樣圓滿，像糖果一樣甜。",
      "妖魔鬼怪都退散，好運福氣一起來。祝您平安順心。",
      "願您笑口常開，比南瓜燈還燦爛。萬聖節快樂！",
      "不嚇人，只送福。祝您萬聖節快樂，闔家平安。",
      "秋夜涼了，記得添衣保暖。祝您萬聖節快樂，健康長壽。",
      "糖果甜在嘴裡，祝福暖在心裡。祝您每天都過得開心。",
      "萬聖節快樂！願您身體硬朗，精神比小精靈還好。",
      "南瓜大豐收，福氣滿滿收。祝您日子越過越圓滿。",
      "願今晚的月光帶給您好眠，明早的陽光帶給您好心情。",
      "古靈精怪的節日，送上真心的祝福：祝您平安喜樂。",
      "把所有不開心都裝進南瓜裡送走，留下滿滿的快樂給您。",
      "萬聖節快樂！願您的生活像糖果罐，五顏六色又甜蜜。",
      "願您吉祥如意，好運跟著南瓜燈一起亮起來。",
      "今天就當個開心的大小孩，祝您萬聖節玩得開心！",
      "祝您萬聖節快樂，鬼怪不近身，健康常相隨。",
    ],
    designs: [
      {motif: "發光的南瓜燈咧嘴而笑，月下飛過一隻蝙蝠。", draw: lantern},
      {motif: "巨大的金色滿月前，一棵枯樹與幾隻蝙蝠的剪影。", phrase: "月夜安康", draw: moonTree},
      {motif: "滿月前的巫師帽與飛天掃帚。", phrase: "古靈精怪", draw: witch},
      {motif: "一碗五顏六色的糖果，碗上寫著「糖」字。", phrase: "甜甜蜜蜜", draw: candy},
      {motif: "滿月下的古堡剪影，窗裡透出溫暖燈光。", phrase: "萬事如意", draw: castle},
    ],
  });
})();

/* 自然風景照樣板：照片在 bg/halloween/，來源與授權見 bg/CREDITS.md */
FESTS.find(f => f.id === "halloween").designs.push(...photoSet("halloween", [
  ["一箱圓滾滾的南瓜。", "南瓜豐收"],
  ["夜裡點亮的南瓜燈。", "歡樂萬聖夜"],
  ["乾草堆上的南瓜燈。", "萬聖節快樂"],
  ["一堆小南瓜。", "圓圓滿滿"],
  ["兩顆橘紅的大南瓜。", "大吉大利"],
  ["金黃色的滿月。", "月夜安康"],
  ["山頭升起的滿月。", "平安喜樂"],
  ["樹梢間的明月。", "古靈精怪"],
  ["霧中的森林。", "神秘之夜"],
  ["深秋的樹林。", "秋意正濃"],
]));
