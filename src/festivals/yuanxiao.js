/* 元宵節 (yuanxiao). Owner of this file: the 元宵節 designer. Add designs and messages here only. */
(() => {
  const TAU = Math.PI * 2;
  const glow = (x, cx, cy, r, c0, c1) => {
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, c0); g.addColorStop(1, c1);
    x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2);
  };
  // small round lantern with tassel
  const mini = (x, f, cx, cy, r, col) => {
    x.save();
    x.fillStyle = f.gold;
    x.fillRect(cx - r * .45, cy - r * 1.02, r * .9, r * .16);
    x.fillRect(cx - r * .45, cy + r * .88, r * .9, r * .16);
    const g = x.createRadialGradient(cx - r * .3, cy - r * .3, r * .1, cx, cy, r * 1.1);
    g.addColorStop(0, col || "#ff6a48"); g.addColorStop(1, "#b3120f");
    x.fillStyle = g; x.beginPath(); x.ellipse(cx, cy, r * .85, r * .95, 0, 0, TAU); x.fill();
    x.strokeStyle = f.gold; x.globalAlpha = .6; x.lineWidth = Math.max(1.2, r / 14);
    x.beginPath(); x.ellipse(cx, cy, r * .4, r * .95, 0, 0, TAU); x.stroke();
    x.globalAlpha = 1; x.lineWidth = Math.max(1.5, r / 12);
    x.beginPath();
    for (let i = -2; i <= 2; i++) { x.moveTo(cx + i * r * .1, cy + r * 1.04); x.lineTo(cx + i * r * .15, cy + r * 1.55); }
    x.stroke();
    x.restore();
  };
  // 天燈
  const sky = (x, f, cx, cy, w, h, ch) => {
    x.save();
    glow(x, cx, cy + h * .15, w * 1.15, "rgba(255,170,80,.45)", "rgba(255,170,80,0)");
    const top = cy - h / 2, bot = cy + h / 2;
    const g = x.createLinearGradient(0, top, 0, bot);
    g.addColorStop(0, "#d9492a"); g.addColorStop(1, "#ffc46e");
    x.fillStyle = g; x.strokeStyle = f.gold; x.lineWidth = Math.max(1.5, w / 55);
    x.beginPath(); x.moveTo(cx - w * .5, bot); x.lineTo(cx - w * .5, top + h * .2);
    x.quadraticCurveTo(cx - w * .5, top, cx, top); x.quadraticCurveTo(cx + w * .5, top, cx + w * .5, top + h * .2);
    x.lineTo(cx + w * .5, bot); x.closePath(); x.fill(); x.stroke();
    x.globalAlpha = .5; x.lineWidth = Math.max(1, w / 90);
    for (const k of [-.25, .25]) { x.beginPath(); x.moveTo(cx + w * k, top + h * .04); x.lineTo(cx + w * k, bot); x.stroke(); }
    x.globalAlpha = 1;
    x.fillStyle = f.gold; x.fillRect(cx - w * .5, bot - h * .05, w, h * .06);
    x.fillStyle = "#fff2b0"; x.beginPath(); x.ellipse(cx, bot + h * .03, w * .07, h * .06, 0, 0, TAU); x.fill();
    if (ch) { x.fillStyle = f.paper2; x.font = `700 ${Math.round(w * .42)}px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(ch, cx, cy + h * .02); }
    x.restore();
  };
  const lotus = (x, f, cx, cy, s) => {
    x.save();
    x.fillStyle = "#2f7a52"; x.strokeStyle = f.gold; x.lineWidth = 2.5;
    x.beginPath(); x.ellipse(cx, cy + s * .05, s * 1.2, s * .24, 0, 0, TAU); x.fill(); x.stroke();
    const layers = [
      { a: [-72, -36, 0, 36, 72], l: 1, w: .42, c0: "#ff8ca3", c1: "#ffc2cc" },
      { a: [-54, -18, 18, 54], l: .86, w: .4, c0: "#ffa5b6", c1: "#ffd3da" },
      { a: [-30, 0, 30], l: .66, w: .34, c0: "#ffc0cb", c1: "#fff0f2" },
    ];
    for (const L of layers) for (const deg of L.a) {
      x.save(); x.translate(cx, cy); x.rotate(deg * Math.PI / 180);
      const len = s * L.l, w = s * L.w;
      const g = x.createLinearGradient(0, 0, 0, -len); g.addColorStop(0, L.c0); g.addColorStop(1, L.c1);
      x.fillStyle = g; x.strokeStyle = f.gold; x.lineWidth = 2;
      x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(-w * 1.5, -len * .5, 0, -len); x.quadraticCurveTo(w * 1.5, -len * .5, 0, 0); x.closePath(); x.fill(); x.stroke();
      x.globalAlpha = .45; x.beginPath(); x.moveTo(0, -len * .1); x.lineTo(0, -len * .85); x.stroke(); x.globalAlpha = 1;
      x.restore();
    }
    glow(x, cx, cy - s * .22, s * .5, "rgba(255,226,140,.9)", "rgba(255,226,140,0)");
    x.fillStyle = "#fff2b0"; x.beginPath(); x.ellipse(cx, cy - s * .3, s * .07, s * .14, 0, 0, TAU); x.fill();
    x.restore();
  };
  const knot = (x, f, cx, cy, s) => {
    x.save(); x.strokeStyle = f.gold; x.lineWidth = 3;
    x.fillStyle = "#d92b20";
    for (let i = 0; i < 3; i++) {
      const k = s * (1 - i * .3);
      x.save(); x.translate(cx, cy); x.rotate(Math.PI / 4 * (i % 2));
      x.fillStyle = i % 2 ? f.paper2 : "#d92b20";
      x.beginPath(); x.rect(-k, -k, k * 2, k * 2); x.fill(); x.stroke(); x.restore();
    }
    circle(x, cx, cy, s * .16); x.fillStyle = f.gold; x.fill();
    x.lineWidth = 5; x.strokeStyle = "#d92b20"; x.beginPath();
    for (let i = -2; i <= 2; i++) { x.moveTo(cx + i * 7, cy + s * 1.35); x.lineTo(cx + i * 10, cy + s * 2.2); }
    x.stroke(); x.fillStyle = f.gold; x.fillRect(cx - 18, cy + s * 1.3, 36, 12);
    x.restore();
  };
  const coin = (x, f, cx, cy, r) => {
    x.save(); x.fillStyle = f.gold; x.strokeStyle = f.paper2; x.lineWidth = 3;
    circle(x, cx, cy, r); x.fill(); x.stroke();
    circle(x, cx, cy, r * .82); x.globalAlpha = .5; x.stroke(); x.globalAlpha = 1;
    x.fillStyle = f.paper2; x.fillRect(cx - r * .26, cy - r * .26, r * .52, r * .52);
    x.restore();
  };

  registerFest({
    id: "yuanxiao", name: "元宵節", phrase: "花好月圓",
    paper: "#7a1630", paper2: "#3e0a1a", gold: "#f3cf6a",
    // up to 56 characters each; exactly 20 required
    msgs: [
      "元宵節快樂！月圓人團圓，祝您身體健康，日子像湯圓一樣圓圓滿滿。",
      "正月十五鬧元宵，燈火通明福氣到。祝您平安順心，笑容常在。",
      "花燈亮，月兒圓，祝您元宵佳節團團圓圓、甜甜美美，新的一年事事如意。",
      "東風夜放花千樹，燈火輝煌映笑顏。祝您元宵佳節闔家團圓、福氣滿堂。",
      "一碗熱呼呼的湯圓，裝著全家人的思念與祝福。願您甜甜蜜蜜、平安喜樂。",
      "月圓花好，人壽年豐。祝您元宵佳節笑口常開，心想事成。",
      "天官賜福，百事順心。願這盞盞花燈，照亮您新的一年平安康泰。",
      "謝謝您一年來的照顧與疼愛，願您元宵佳節如明月般圓滿，如燈火般明亮。",
      "元宵提燈走一走，步步平安好運來。祝您腳步穩健，福壽綿長。",
      "平溪天燈飛上天，把我們的心願寄給您：平安順遂，天天開心。",
      "驀然回首，燈火闌珊處，最溫暖的是有您的家。祝您元宵佳節平安喜樂。",
      "猜燈謎、吃湯圓，年年有您同樂最幸福。祝您元宵節開心團圓，智慧常新。",
      "正月十五月兒圓，願您心也圓、福也圓、日子也圓。",
      "花燈映月，湯圓暖心。祝您元宵佳節闔家歡樂、萬事如意。",
      "願這一輪明月，守護您平安順心；願這一盞燈火，照亮您前行的路。",
      "元宵佳節，天上月圓，人間團圓。感恩有您，是我們全家最大的福氣。",
      "燈火通明，歡聲滿庭。祝您元宵節快樂，日日有笑，歲歲平安。",
      "吃湯圓，團團圓圓；賞花燈，前程光明。祝您新的一年順利、心想事成。",
      "上元賜福，萬家燈火。祝您福如東海、壽比南山，日子光明又圓滿。",
      "新春最後一場歡聚，願您與家人共賞明月、同享團圓，幸福甜如湯圓。",
    ],
    // exactly 10 required; each draw(x,f) returns the y (centre) where the phrase is written
    designs: [
      { motif: "夜空下一排花燈高掛，燈上寫著「元宵樂」，一輪明月相伴。", draw: LEGACY.yuanxiao },
      { motif: "一盞寫著「圓」字的大花燈，四周煙火綻放。", draw: LEGACY.yuanxiao2 },
      { motif: "滿月之下，一碗冒著熱氣的湯圓，兩旁各掛一盞小花燈。", phrase: "團圓美滿",
        colors: { paper: "#7a1630", paper2: "#3e0a1a", gold: "#f3cf6a" },
        draw(x, f) {
          stars(x, f, 31, 60, [70, 190, 930, 780]);
          const g = x.createRadialGradient(470, 400, 20, 500, 430, 220);
          g.addColorStop(0, "#fff6d6"); g.addColorStop(.75, f.gold); g.addColorStop(1, "#d9a94a");
          x.globalAlpha = .93; x.fillStyle = g; circle(x, 500, 430, 210); x.fill(); x.globalAlpha = 1;
          x.strokeStyle = f.gold; x.lineWidth = 3; x.globalAlpha = .5; circle(x, 500, 430, 230); x.stroke(); x.globalAlpha = 1;
          lantern(x, f, 160, 190, 310, 80, ""); lantern(x, f, 840, 190, 310, 80, "");
          // bowl back
          x.fillStyle = "#2a0714"; x.beginPath(); x.ellipse(500, 600, 220, 44, 0, 0, TAU); x.fill();
          // tangyuan
          const balls = [[400, 590, 50], [600, 590, 50], [450, 545, 52], [550, 545, 52], [500, 580, 54]];
          for (const [bx, by, br] of balls) {
            const bg = x.createRadialGradient(bx - br * .3, by - br * .35, br * .1, bx, by, br);
            bg.addColorStop(0, "#fffdf6"); bg.addColorStop(1, "#ecd9ad");
            x.fillStyle = bg; circle(x, bx, by, br); x.fill();
            x.strokeStyle = "#d9b873"; x.lineWidth = 2; x.stroke();
          }
          // steam
          x.save(); x.strokeStyle = f.paper2; x.globalAlpha = .45; x.lineWidth = 7; x.lineCap = "round";
          for (const sx of [440, 500, 560]) { x.beginPath(); x.moveTo(sx, 480); x.bezierCurveTo(sx - 30, 440, sx + 30, 410, sx, 360); x.stroke(); }
          x.restore();
          // bowl body
          x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 5;
          x.beginPath(); x.moveTo(280, 600); x.bezierCurveTo(290, 720, 400, 775, 500, 775);
          x.bezierCurveTo(600, 775, 710, 720, 720, 600); x.ellipse(500, 600, 220, 44, 0, 0, Math.PI, false); x.closePath(); x.fill(); x.stroke();
          x.lineWidth = 6; x.beginPath(); x.ellipse(500, 600, 220, 44, 0, 0, TAU); x.stroke();
          x.fillStyle = f.gold; x.fillRect(440, 772, 120, 22);
          x.lineWidth = 2.5; x.globalAlpha = .7; x.beginPath(); x.moveTo(300, 668); x.quadraticCurveTo(500, 722, 700, 668); x.stroke(); x.globalAlpha = 1;
          plum(x, 400, 700, 24, f.gold); plum(x, 500, 722, 26, f.gold); plum(x, 600, 700, 24, f.gold);
          return 890;
        } },
      { motif: "夜空中點點天燈緩緩升起，大天燈寫著「福」，山巒在腳下綿延。", phrase: "平安喜樂",
        colors: { paper: "#6b1228", paper2: "#32081a", gold: "#f6d576" },
        draw(x, f) {
          stars(x, f, 41, 70, [70, 190, 930, 700]);
          const r = rand(5);
          x.save();
          for (let i = 0; i < 38; i++) { const px = 90 + r() * 820, py = 230 + r() * 520; x.globalAlpha = .35 + r() * .4; x.fillStyle = "#ffb56a"; x.fillRect(px, py, 10, 14); }
          x.restore();
          for (const [cx, cy, w] of [[350, 270, 56], [650, 260, 60], [130, 640, 64], [880, 630, 60], [300, 730, 46], [700, 735, 46], [420, 700, 40]])
            sky(x, f, cx, cy, w, w * 1.25, "");
          sky(x, f, 210, 430, 150, 190, "安"); sky(x, f, 800, 410, 150, 190, "樂");
          sky(x, f, 500, 470, 210, 262, "福");
          x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 2.5;
          x.beginPath(); x.moveTo(60, 960); x.lineTo(60, 830); x.quadraticCurveTo(180, 750, 330, 835);
          x.quadraticCurveTo(500, 930, 670, 835); x.quadraticCurveTo(820, 750, 940, 830); x.lineTo(940, 960); x.closePath();
          x.fill(); x.globalAlpha = .6; x.stroke(); x.globalAlpha = 1;
          return 890;
        } },
      { motif: "一隻可愛的兔子花燈拖著繩子，身上點綴梅花，兩旁小燈籠相伴。", phrase: "吉祥如意",
        colors: { paper: "#8a1a2c", paper2: "#44091a", gold: "#f4d070" },
        draw(x, f) {
          stars(x, f, 51, 50, [70, 190, 930, 780]);
          glow(x, 500, 560, 330, "rgba(255,200,110,.35)", "rgba(255,200,110,0)");
          lantern(x, f, 170, 190, 330, 90, ""); lantern(x, f, 865, 190, 300, 80, "");
          // wheels and board
          x.fillStyle = f.gold; x.strokeStyle = f.paper2; x.lineWidth = 4;
          x.fillRect(320, 765, 360, 20); x.strokeRect(320, 765, 360, 20);
          for (const wx of [390, 610]) { circle(x, wx, 790, 36); x.fill(); x.stroke(); circle(x, wx, 790, 10); x.fillStyle = f.paper2; x.fill(); x.fillStyle = f.gold; }
          const cream = (cx, cy, rx, ry, rot) => {
            const g = x.createRadialGradient(cx - rx * .3, cy - ry * .35, 10, cx, cy, Math.max(rx, ry));
            g.addColorStop(0, "#fffdf6"); g.addColorStop(1, "#ead6a8"); x.fillStyle = g;
            x.beginPath(); x.ellipse(cx, cy, rx, ry, rot || 0, 0, TAU); x.fill(); x.strokeStyle = f.gold; x.lineWidth = 3.5; x.stroke();
          };
          // ears (back), then body
          cream(660, 380, 32, 108, -.18); cream(735, 392, 30, 100, .22);
          x.fillStyle = "#ff9db0"; x.beginPath(); x.ellipse(661, 385, 14, 80, -.18, 0, TAU); x.fill();
          x.beginPath(); x.ellipse(734, 396, 13, 74, .22, 0, TAU); x.fill();
          cream(275, 620, 44, 44);
          cream(480, 640, 205, 140);
          x.save(); x.strokeStyle = f.gold; x.lineWidth = 2; x.globalAlpha = .55;
          for (const k of [.3, .62]) { x.beginPath(); x.ellipse(480, 640, 205 * k, 140, 0, 0, TAU); x.stroke(); }
          x.restore();
          plum(x, 430, 610, 36, "#e2463a"); plum(x, 540, 680, 32, "#e2463a"); plum(x, 360, 700, 24, "#e2463a");
          cream(690, 545, 98, 90);
          x.fillStyle = "#ffb3c1"; x.globalAlpha = .7; circle(x, 735, 585, 20); x.fill(); x.globalAlpha = 1;
          x.fillStyle = "#d0211a"; circle(x, 715, 525, 13); x.fill(); x.fillStyle = "#fff"; circle(x, 719, 520, 4); x.fill();
          x.fillStyle = "#e2463a"; x.beginPath(); x.ellipse(778, 556, 12, 9, 0, 0, TAU); x.fill();
          // string and tassel
          x.strokeStyle = f.gold; x.lineWidth = 4; x.beginPath(); x.moveTo(782, 575); x.quadraticCurveTo(860, 630, 868, 760); x.stroke();
          x.fillStyle = f.gold; circle(x, 868, 770, 12); x.fill();
          x.lineWidth = 4; x.beginPath(); for (let i = -1; i <= 1; i++) { x.moveTo(868 + i * 5, 780); x.lineTo(868 + i * 9, 835); } x.stroke();
          return 890;
        } },
      { motif: "水面上盛開的荷花燈，倒映滿月，漣漪一圈圈散開。", phrase: "和和美美",
        colors: { paper: "#6e1830", paper2: "#380a1c", gold: "#f1cd68" },
        draw(x, f) {
          stars(x, f, 61, 55, [70, 190, 930, 600]);
          const g = x.createRadialGradient(470, 340, 20, 500, 370, 170);
          g.addColorStop(0, "#fff6d6"); g.addColorStop(.8, f.gold); g.addColorStop(1, "#d9a94a");
          x.globalAlpha = .9; x.fillStyle = g; circle(x, 500, 370, 165); x.fill(); x.globalAlpha = 1;
          // water
          x.fillStyle = f.paper2; x.globalAlpha = .6; x.fillRect(60, 600, 880, 350); x.globalAlpha = 1;
          x.strokeStyle = f.gold; x.lineWidth = 2;
          for (const [cx, cy, s] of [[500, 648, 230], [190, 770, 100], [810, 755, 105]]) {
            for (const k of [1.25, 1.55, 1.9]) { x.globalAlpha = .5 - (k - 1.25) * .3; x.beginPath(); x.ellipse(cx, cy + 6, s * k, s * k * .2, 0, 0, TAU); x.stroke(); }
          }
          x.globalAlpha = 1;
          lotus(x, f, 190, 770, 82); lotus(x, f, 810, 755, 86);
          lotus(x, f, 500, 648, 190);
          return 890;
        } },
      { motif: "橫桿上垂掛著寫了字的燈謎紙條，中央一盞「謎」字大燈，兩側中國結。", phrase: "福慧雙全",
        colors: { paper: "#7d1a22", paper2: "#430b14", gold: "#f5d072" },
        draw(x, f) {
          stars(x, f, 71, 45, [70, 560, 930, 780]);
          x.strokeStyle = f.gold; x.lineWidth = 8; x.lineCap = "round";
          x.beginPath(); x.moveTo(100, 232); x.lineTo(900, 232); x.stroke();
          x.fillStyle = f.gold; circle(x, 96, 232, 12); x.fill(); circle(x, 904, 232, 12); x.fill();
          const slips = [[130, 250, "月"], [240, 215, "燈"], [350, 270, "圓"], [650, 270, "福"], [760, 215, "喜"], [870, 250, "樂"]];
          for (const [sx, len, ch] of slips) {
            x.strokeStyle = f.gold; x.lineWidth = 3; x.beginPath(); x.moveTo(sx, 232); x.lineTo(sx, 258); x.stroke();
            x.fillStyle = "#fff3dc"; x.fillRect(sx - 42, 258, 84, len); x.strokeStyle = f.gold; x.lineWidth = 3; x.strokeRect(sx - 42, 258, 84, len);
            x.strokeStyle = "#b3322a"; x.lineWidth = 2; x.strokeRect(sx - 35, 265, 70, len - 14);
            x.fillStyle = "#a01c1c"; x.font = `700 62px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(ch, sx, 258 + len * .45);
            x.fillStyle = "#e2463a"; circle(x, sx, 258 + len + 12, 8); x.fill();
            x.strokeStyle = "#e2463a"; x.lineWidth = 3; x.beginPath(); x.moveTo(sx, 258 + len + 20); x.lineTo(sx, 258 + len + 48); x.stroke();
          }
          lantern(x, f, 500, 232, 520, 200, "謎");
          knot(x, f, 230, 690, 42); knot(x, f, 770, 690, 42);
          return 890;
        } },
      { motif: "層層疊疊的燈籠堆成一座鰲山燈，山頂一盞最大的燈高高亮起。", phrase: "燈火輝煌",
        colors: { paper: "#721428", paper2: "#3a0818", gold: "#f3cf6a" },
        draw(x, f) {
          stars(x, f, 81, 50, [70, 190, 930, 780]);
          x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 3;
          x.beginPath(); x.moveTo(500, 225); x.bezierCurveTo(470, 380, 300, 560, 110, 810); x.lineTo(890, 810); x.bezierCurveTo(700, 560, 530, 380, 500, 225);
          x.closePath(); x.globalAlpha = .85; x.fill(); x.globalAlpha = 1; x.globalAlpha = .7; x.stroke(); x.globalAlpha = 1;
          x.fillStyle = f.gold; x.fillRect(110, 806, 780, 10);
          cloud(x, f, 190, 330, .8, f.paper); cloud(x, f, 815, 380, .75, f.paper);
          const cols = ["#ff6a48", "#ffb347", "#e2463a"];
          for (let row = 0; row < 7; row++) for (let i = 0; i <= row; i++) {
            const px = 500 + (i - row / 2) * 96, py = 290 + row * 72;
            mini(x, f, px, py, row === 0 ? 40 : 30, cols[(row + i) % 3]);
          }
          glow(x, 500, 215, 90, "rgba(255,226,140,.6)", "rgba(255,226,140,0)");
          return 895;
        } },
      { motif: "滿月高掛，石拱橋上長輩與孩子提著燈籠，走橋祈求步步平安。", phrase: "步步平安",
        colors: { paper: "#7a1630", paper2: "#3e0a1a", gold: "#f3cf6a" },
        draw(x, f) {
          stars(x, f, 91, 55, [70, 190, 930, 600]);
          const g = x.createRadialGradient(470, 390, 20, 500, 420, 230);
          g.addColorStop(0, "#fff6d6"); g.addColorStop(.75, f.gold); g.addColorStop(1, "#d9a94a");
          x.fillStyle = g; circle(x, 500, 420, 220); x.fill();
          cloud(x, f, 190, 300, .8, f.paper); cloud(x, f, 815, 330, .75, f.paper);
          const deckY = px => { const t = (px - 80) / 840; return (1 - t) * (1 - t) * 770 + 2 * t * (1 - t) * 470 + t * t * 770; };
          // water
          x.fillStyle = "#2a0714"; x.fillRect(60, 800, 880, 150);
          x.strokeStyle = f.gold; x.lineWidth = 2; x.lineCap = "round";
          for (let i = 0; i < 8; i++) for (const [a, b] of [[90, 270], [740, 910]]) { x.globalAlpha = .25 + (i % 3) * .1; const yy = 825 + i * 15; x.beginPath(); x.moveTo(a + (i % 2) * 20, yy); x.lineTo(b - (i % 3) * 25, yy); x.stroke(); }
          x.globalAlpha = 1;
          // bridge
          x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 4;
          x.beginPath(); x.moveTo(80, 770); x.quadraticCurveTo(500, 470, 920, 770); x.lineTo(920, 802); x.lineTo(80, 802); x.closePath(); x.fill(); x.stroke();
          x.fillStyle = "#2a0714"; x.beginPath(); x.ellipse(500, 802, 235, 140, 0, Math.PI, TAU); x.fill(); x.stroke();
          x.strokeStyle = f.gold; x.lineWidth = 3; x.beginPath();
          for (const px of [140, 200, 260, 320, 380, 620, 680, 740, 800, 860]) { x.moveTo(px, deckY(px) + 2); x.lineTo(px, deckY(px) - 30); }
          x.stroke();
          for (const px of [140, 260, 380, 620, 740, 860]) mini(x, f, px, deckY(px) - 60, 22);
          // walkers
          const walker = (px, h, lampDx) => {
            const fy = deckY(px) + 4; x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 2;
            x.beginPath(); x.moveTo(px - h * .16, fy); x.lineTo(px - h * .1, fy - h * .62); x.lineTo(px + h * .1, fy - h * .62); x.lineTo(px + h * .16, fy); x.closePath(); x.fill(); x.stroke();
            circle(x, px, fy - h * .76, h * .14); x.fill(); x.stroke();
            x.beginPath(); x.moveTo(px + h * .05, fy - h * .55); x.lineTo(px + lampDx, fy - h * .6); x.stroke();
            mini(x, f, px + lampDx, fy - h * .45, h * .12);
          };
          walker(455, 120, 42); walker(545, 78, -34);
          return 895;
        } },
      { motif: "圓形福字徽章外圍環繞十六盞燈籠，四角金錢與祥雲，寓意天官賜福。", phrase: "天官賜福",
        colors: { paper: "#701530", paper2: "#380a1a", gold: "#f4d06c" },
        draw(x, f) {
          stars(x, f, 101, 50, [70, 190, 930, 780]);
          const cx = 500, cy = 490;
          x.save(); x.strokeStyle = f.gold; x.lineWidth = 3; x.globalAlpha = .55;
          for (let i = 0; i < 16; i++) { const a = (i + .5) * TAU / 16; x.beginPath(); x.moveTo(cx + Math.cos(a) * 208, cy + Math.sin(a) * 208); x.lineTo(cx + Math.cos(a) * 262, cy + Math.sin(a) * 262); x.stroke(); }
          x.restore();
          glow(x, cx, cy, 250, "rgba(255,200,100,.25)", "rgba(255,200,100,0)");
          const dg = x.createRadialGradient(cx, cy, 20, cx, cy, 205); dg.addColorStop(0, "#5a1226"); dg.addColorStop(1, f.paper2);
          x.fillStyle = dg; x.strokeStyle = f.gold; x.lineWidth = 6; circle(x, cx, cy, 205); x.fill(); x.stroke();
          x.lineWidth = 2.5; x.setLineDash([10, 10]); circle(x, cx, cy, 186); x.stroke(); x.setLineDash([]);
          x.fillStyle = f.gold; x.font = `700 290px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("福", cx, cy + 12);
          for (let i = 0; i < 16; i++) { const a = i * TAU / 16 - Math.PI / 2; mini(x, f, cx + Math.cos(a) * 262, cy + Math.sin(a) * 262, 24, i % 2 ? "#ffb347" : "#ff6a48"); }
          coin(x, f, 150, 290, 42); coin(x, f, 850, 290, 42); coin(x, f, 140, 620, 38); coin(x, f, 860, 620, 38);
          cloud(x, f, 190, 800, .65, f.paper); cloud(x, f, 810, 800, .65, f.paper);
          return 895;
        } },
    ],
  });
})();
