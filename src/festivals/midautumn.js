/* 中秋節 (midautumn). Owner of this file: the 中秋節 designer. Add designs and messages here only. */
(() => {
  // ---- local helpers ----
  const glow = (x, cx, cy, r, c0, c1) => {
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, c0); g.addColorStop(1, c1);
    x.fillStyle = g; circle(x, cx, cy, r); x.fill();
  };
  const moon = (x, cx, cy, r, f) => {
    glow(x, cx, cy, r * 1.35, "rgba(255,236,170,.28)", "rgba(255,236,170,0)");
    const g = x.createRadialGradient(cx - r * .25, cy - r * .25, r * .1, cx, cy, r);
    g.addColorStop(0, "#fff3cc"); g.addColorStop(.7, f.gold); g.addColorStop(1, "#d9a94a");
    x.fillStyle = g; circle(x, cx, cy, r); x.fill();
    x.fillStyle = "rgba(150,100,30,.15)";
    [[-.3, -.25, .14], [.25, -.1, .1], [.1, .3, .17], [-.35, .15, .08]].forEach(([a, b, k]) => { circle(x, cx + a * r, cy + b * r, k * r); x.fill(); });
  };
  const petals4 = (x, cx, cy, s, col) => {
    x.fillStyle = col;
    for (let k = 0; k < 4; k++) { circle(x, cx + Math.cos(k * 1.5708 + .4) * s, cy + Math.sin(k * 1.5708 + .4) * s, s * .8); x.fill(); }
  };
  const ellip = (x, cx, cy, rx, ry, rot, fill, stroke, lw) => {
    x.beginPath(); x.ellipse(cx, cy, rx, ry, rot || 0, 0, Math.PI * 2);
    if (fill) { x.fillStyle = fill; x.fill(); }
    if (stroke) { x.strokeStyle = stroke; x.lineWidth = lw || 3; x.stroke(); }
  };
  const flame = (x, cx, by, s, c1, c2) => {
    x.beginPath(); x.moveTo(cx, by - s * 1.5);
    x.bezierCurveTo(cx + s * .9, by - s * .7, cx + s * .8, by, cx, by);
    x.bezierCurveTo(cx - s * .8, by, cx - s * .9, by - s * .7, cx, by - s * 1.5);
    const g = x.createLinearGradient(cx, by - s * 1.5, cx, by); g.addColorStop(0, c1); g.addColorStop(1, c2);
    x.fillStyle = g; x.fill();
  };

  registerFest({
    id: "midautumn", name: "中秋節", phrase: "月圓人圓",
    paper: "#1f2d5c", paper2: "#0f1734", gold: "#f0cf7c",
    // up to 56 characters each; exactly 20 required
    msgs: [
      "中秋快樂！月圓人團圓，祝您身體健康，闔家平安，幸福美滿。",
      "但願人長久，千里共嬋娟。中秋佳節，祝您心想事成，天天開懷。",
      "又到中秋賞月時，祝您花好月圓、事事圓滿，柚子月餅都甜在心。",
      "海上生明月，天涯共此時。雖然相隔兩地，我們的思念同在一輪明月下。",
      "人有悲歡離合，月有陰晴圓缺。願您的日子月月圓滿，平安順心。",
      "月到中秋分外明，願您身體硬朗、笑口常開，歲歲年年有今朝。",
      "月圓人團圓，花好人壽長。祝您福壽安康，闔家歡樂。",
      "柚子的「柚」，就是庇佑的「佑」。願月娘保佑您平安順心、萬事如意。",
      "烤肉香、月餅甜，一家人圍坐賞月，就是最幸福的事。中秋快樂！",
      "謝謝您一直是我們家的依靠。中秋夜裡，願您心滿意足，福氣滿滿。",
      "月餅甜在口，團圓暖在心。祝您中秋快樂，天天都有好心情。",
      "桂花飄香，明月當空。願您福氣如桂花滿枝，日子甜美芬芳。",
      "舉頭望明月，總想起您的笑容。天涼了，記得添衣，多保重身體。",
      "今夜月色最圓，願您心事皆圓滿，家人都平安，歲月靜好。",
      "身在遠方，心在您身邊。中秋夜抬頭看看月亮，那是我們對您的思念。",
      "花好月圓，闔家團圓。祝您福如東海、壽比南山，樂享天倫。",
      "提花燈、賞明月、吃月餅，願您中秋夜笑語滿堂，兒孫繞膝。",
      "感恩您的養育與付出，讓我們每個中秋都有家可回。願您平安喜樂。",
      "一輪明月照人間，一份心意送給您。願您事事順心，天天安康。",
      "月光溫柔，願您夜夜好眠、日日歡喜。中秋快樂，歲歲平安！",
    ],
    // exactly 10 required; each draw(x,f) returns the y (centre) where the phrase is written
    designs: [
      {motif:"一輪金色滿月，玉兔坐在月中，祥雲與桂花環繞。", draw:LEGACY.midautumn},
      {motif:"一個大月餅印著「團圓」，旁邊有小月亮與桂花。", draw:LEGACY.midautumn2},

      // 3 拜月娘供桌
      {motif:"滿月高掛，供桌上擺著大柚子、月餅塔、柿子與一對紅燭，是台灣拜月娘的景象。", phrase:"柚佑平安",
       colors:{paper:"#2b2a5e", paper2:"#14123a", gold:"#f3d27a"},
       draw(x, f) {
         stars(x, f, 31, 70, [70, 190, 930, 680]);
         x.save(); x.translate(0, -34);
         moon(x, 500, 440, 185, f);
         // 供桌：紅桌巾
         x.fillStyle = "#b4231b"; x.fillRect(190, 700, 620, 100);
         x.fillStyle = f.gold; x.fillRect(190, 694, 620, 12);
         for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(190 + i * 51.7, 800); x.lineTo(190 + i * 51.7 + 51.7, 800); x.lineTo(190 + i * 51.7 + 25.8, 828); x.closePath(); x.fill(); }
         x.strokeStyle = f.gold; x.lineWidth = 3; x.beginPath(); x.moveTo(190, 750); x.lineTo(810, 750); x.stroke();
         // 大柚子
         const g = x.createRadialGradient(470, 560, 10, 500, 610, 100); g.addColorStop(0, "#f1f08a"); g.addColorStop(1, "#a9b83c");
         x.fillStyle = g; x.strokeStyle = "#6e7a22"; x.lineWidth = 3;
         circle(x, 500, 612, 88); x.fill(); x.stroke(); circle(x, 500, 535, 42); x.fill(); x.stroke();
         x.fillStyle = "rgba(90,100,20,.35)"; for (let i = 0; i < 16; i++) { const a = i * 2.4, rr = 20 + (i % 5) * 12; circle(x, 500 + Math.cos(a) * rr, 615 + Math.sin(a) * rr, 3); x.fill(); }
         ellip(x, 545, 505, 30, 14, -.5, "#3f8a4a", "#1f5a2c", 2);
         // 月餅塔
         [[330, 676, 78], [330, 650, 66], [330, 626, 54]].forEach(([cx, cy, rx], i) => {
           ellip(x, cx, cy, rx, 20, 0, ["#c98a3a", "#d99b4a", "#e6ad58"][i], "#8a5420", 3);
         });
         bigChar(x, "月", 330, 622, 44, "#8a5420");
         // 柿子
         [[665, 660, 40], [735, 668, 36]].forEach(([cx, cy, r]) => {
           x.fillStyle = "#ee7a1c"; x.strokeStyle = "#a8480c"; x.lineWidth = 3; circle(x, cx, cy, r); x.fill(); x.stroke();
           x.fillStyle = "#3f8a4a"; x.beginPath(); for (let k = 0; k < 4; k++) { const a = k * 1.5708 + .78; x.moveTo(cx, cy - r + 4); x.lineTo(cx + Math.cos(a) * 24, cy - r + 4 + Math.sin(a) * 8); x.lineTo(cx, cy - r + 12); } x.fill();
         });
         // 紅燭
         [[225, 1], [775, 1]].forEach(([cx]) => {
           x.fillStyle = "#d8261c"; x.fillRect(cx - 17, 590, 34, 104); x.strokeStyle = f.gold; x.lineWidth = 2.5; x.strokeRect(cx - 17, 590, 34, 104);
           x.fillStyle = "#2a1a10"; x.fillRect(cx - 1.5, 576, 3, 14);
           glow(x, cx, 560, 50, "rgba(255,200,90,.5)", "rgba(255,200,90,0)"); flame(x, cx, 580, 11, "#fff3a0", "#ff8a1c");
         });
         x.restore();
         return 885;
       }},

      // 4 嫦娥奔月
      {motif:"碩大滿月前，嫦娥衣袖飄帶翩翩，踏著祥雲奔向月宮。", phrase:"月宮添福",
       colors:{paper:"#1b3a5c", paper2:"#0b1c33", gold:"#f2d98a"},
       draw(x, f) {
         stars(x, f, 41, 80, [70, 190, 930, 780]);
         moon(x, 500, 470, 270, f);
         // 嫦娥剪影
         x.save();
         x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 3; x.lineJoin = "round";
         // 飄帶
         x.lineWidth = 7; x.lineCap = "round"; x.globalAlpha = .9;
         x.beginPath(); x.moveTo(468, 430); x.bezierCurveTo(330, 380, 300, 520, 200, 480); x.stroke();
         x.beginPath(); x.moveTo(540, 440); x.bezierCurveTo(650, 380, 720, 330, 800, 390); x.stroke();
         x.beginPath(); x.moveTo(480, 640); x.bezierCurveTo(400, 700, 330, 650, 270, 700); x.stroke();
         x.globalAlpha = 1; x.lineWidth = 3;
         // 長裙
         x.beginPath(); x.moveTo(470, 405); x.quadraticCurveTo(500, 395, 535, 405);
         x.bezierCurveTo(560, 480, 555, 540, 600, 650); x.quadraticCurveTo(520, 700, 440, 650);
         x.bezierCurveTo(470, 560, 455, 470, 470, 405); x.closePath(); x.fill(); x.stroke();
         // 頭與髮髻
         circle(x, 503, 365, 33); x.fill(); x.stroke();
         circle(x, 503, 318, 20); x.fill(); x.stroke();
         x.fillStyle = f.gold; circle(x, 503, 338, 6); x.fill();
         // 腰帶
         x.strokeStyle = f.gold; x.lineWidth = 5; x.beginPath(); x.moveTo(466, 470); x.quadraticCurveTo(503, 490, 545, 470); x.stroke();
         x.restore();
         cloud(x, f, 500, 735, 1.5, f.paper); cloud(x, f, 260, 640, .8, f.paper); cloud(x, f, 760, 690, .9, f.paper);
         return 890;
       }},

      // 5 吳剛伐桂
      {motif:"月宮裡的桂花樹開滿金黃小花，吳剛舉斧伐桂，花瓣隨風飄落。", phrase:"金桂飄香",
       colors:{paper:"#17403a", paper2:"#0a221f", gold:"#f0d27a"},
       draw(x, f) {
         stars(x, f, 51, 50, [70, 190, 930, 560]);
         moon(x, 300, 400, 150, f);
         // 月宮地面
         x.fillStyle = f.paper2; x.beginPath(); x.ellipse(500, 795, 400, 32, 0, 0, Math.PI * 2); x.fill();
         x.strokeStyle = f.gold; x.globalAlpha = .6; x.lineWidth = 2; x.stroke(); x.globalAlpha = 1;
         // 桂樹
         x.fillStyle = "#4a2c18"; x.strokeStyle = f.gold; x.lineWidth = 2.5;
         x.beginPath(); x.moveTo(610, 800); x.quadraticCurveTo(630, 650, 625, 520); x.lineTo(670, 520); x.quadraticCurveTo(680, 650, 705, 800); x.closePath(); x.fill(); x.stroke();
         x.strokeStyle = "#4a2c18"; x.lineWidth = 14; x.lineCap = "round";
         x.beginPath(); x.moveTo(645, 540); x.quadraticCurveTo(580, 470, 540, 430); x.stroke();
         x.beginPath(); x.moveTo(655, 540); x.quadraticCurveTo(730, 470, 790, 430); x.stroke();
         const r = rand(8);
         const blobs = [[640, 380, 130], [540, 440, 85], [770, 440, 90], [600, 300, 80], [700, 300, 80], [650, 250, 60]];
         blobs.forEach(([cx, cy, R]) => { x.fillStyle = "#2f7a52"; x.globalAlpha = .95; circle(x, cx, cy, R); x.fill(); });
         x.globalAlpha = 1;
         blobs.forEach(([cx, cy, R]) => {
           for (let i = 0; i < 22; i++) {
             const a = r() * 6.28, d = Math.sqrt(r()) * R * .9;
             petals4(x, cx + Math.cos(a) * d, cy + Math.sin(a) * d, 5 + r() * 3, r() > .5 ? f.gold : "#ffe8a0");
           }
         });
         // 吳剛
         x.save(); x.fillStyle = "#0a221f"; x.strokeStyle = f.gold; x.lineWidth = 3; x.lineJoin = "round";
         x.beginPath(); x.moveTo(450, 800); x.lineTo(430, 640); x.quadraticCurveTo(440, 580, 485, 575); x.quadraticCurveTo(530, 585, 535, 650); x.lineTo(550, 800); x.closePath(); x.fill(); x.stroke();
         circle(x, 488, 540, 30); x.fill(); x.stroke();
         x.beginPath(); x.moveTo(460, 525); x.quadraticCurveTo(488, 490, 520, 520); x.lineTo(520, 530); x.quadraticCurveTo(488, 505, 460, 535); x.closePath(); x.fill(); x.stroke();
         // 手臂與斧
         x.lineWidth = 16; x.lineCap = "round"; x.strokeStyle = "#0a221f";
         x.beginPath(); x.moveTo(520, 610); x.lineTo(565, 540); x.stroke();
         x.lineWidth = 6; x.strokeStyle = "#8a5a2c"; x.beginPath(); x.moveTo(520, 640); x.lineTo(590, 500); x.stroke();
         x.fillStyle = f.gold; x.strokeStyle = "#8a6a20"; x.lineWidth = 2;
         x.beginPath(); x.moveTo(585, 508); x.quadraticCurveTo(630, 470, 625, 540); x.quadraticCurveTo(595, 520, 585, 508); x.closePath(); x.fill(); x.stroke();
         x.restore();
         // 飄落花瓣
         for (let i = 0; i < 18; i++) petals4(x, 150 + r() * 750, 560 + r() * 230, 4, f.gold);
         return 890;
       }},

      // 6 烤肉
      {motif:"台灣中秋最熟悉的烤肉：爐火通紅，肉串滋滋作響，輕煙升向明月。", phrase:"團聚歡樂",
       colors:{paper:"#6a2414", paper2:"#34100a", gold:"#f6c860"},
       draw(x, f) {
         stars(x, f, 61, 55, [70, 190, 930, 560]);
         moon(x, 500, 340, 130, f);
         // 輕煙
         x.save(); x.strokeStyle = INK; x.globalAlpha = .4; x.lineWidth = 8; x.lineCap = "round";
         for (const [sx, dx] of [[430, -50], [500, 40], [575, -30]]) { x.beginPath(); x.moveTo(sx, 610); x.bezierCurveTo(sx + dx, 560, sx - dx, 520, sx + dx * .5, 470); x.stroke(); }
         x.restore();
         // 火焰
         flame(x, 420, 640, 34, "#ffe27a", "#e8481c"); flame(x, 500, 640, 46, "#fff0a0", "#e8481c"); flame(x, 580, 640, 34, "#ffe27a", "#e8481c");
         // 烤肉架
         x.fillStyle = "#1c0a06"; x.strokeStyle = f.gold; x.lineWidth = 3;
         x.beginPath(); x.moveTo(300, 650); x.lineTo(700, 650); x.lineTo(670, 740); x.quadraticCurveTo(500, 770, 330, 740); x.closePath(); x.fill(); x.stroke();
         const cg = x.createLinearGradient(0, 700, 0, 745); cg.addColorStop(0, "#ff7a2a"); cg.addColorStop(1, "#7a1a0a");
         x.fillStyle = cg; x.beginPath(); x.moveTo(340, 700); x.lineTo(660, 700); x.lineTo(650, 735); x.quadraticCurveTo(500, 756, 350, 735); x.closePath(); x.fill();
         x.strokeStyle = f.gold; x.lineWidth = 5; x.lineCap = "round";
         // 腳架
         x.beginPath(); x.moveTo(350, 745); x.lineTo(320, 805); x.moveTo(650, 745); x.lineTo(680, 805); x.stroke();
         // 肉串
         const skew = (y0, a) => {
           x.save(); x.translate(500, y0); x.rotate(a);
           x.strokeStyle = "#e6c48a"; x.lineWidth = 6; x.beginPath(); x.moveTo(-250, 0); x.lineTo(250, 0); x.stroke();
           ["#a8481c", "#c26a2a", "#7a2a14", "#c26a2a", "#a8481c"].forEach((c, i) => {
             x.fillStyle = c; x.strokeStyle = "#3a1208"; x.lineWidth = 2.5;
             x.beginPath(); x.roundRect(-110 + i * 50, -20, 42, 40, 10); x.fill(); x.stroke();
           });
           x.restore();
         };
         skew(642, -.04); skew(618, .05);
         // 火星
         const r = rand(4); x.fillStyle = "#ffcf5a";
         for (let i = 0; i < 24; i++) { x.globalAlpha = .4 + r() * .6; circle(x, 330 + r() * 340, 470 + r() * 150, 1.5 + r() * 2.5); x.fill(); }
         x.globalAlpha = 1;
         // 兩旁柚子與月餅
         const pg = x.createRadialGradient(165, 700, 8, 180, 720, 70); pg.addColorStop(0, "#f1f08a"); pg.addColorStop(1, "#a9b83c");
         x.fillStyle = pg; x.strokeStyle = "#6e7a22"; x.lineWidth = 3; circle(x, 180, 725, 62); x.fill(); x.stroke(); circle(x, 180, 672, 28); x.fill(); x.stroke();
         ellip(x, 830, 770, 64, 24, 0, "#c98a3a", "#8a5420", 3); ellip(x, 830, 742, 54, 22, 0, "#d99b4a", "#8a5420", 3);
         return 890;
       }},

      // 7 花燈
      {motif:"燈繩上垂掛著一排大小紅燈籠與白玉兔燈，燭光暖暖，是中秋夜的提燈樂。", phrase:"花好月圓",
       colors:{paper:"#5b1713", paper2:"#2e0a08", gold:"#f5cd68"},
       draw(x, f) {
         stars(x, f, 71, 40, [70, 190, 930, 800]);
         // 燈繩
         x.strokeStyle = f.gold; x.lineWidth = 4; x.beginPath(); x.moveTo(80, 205); x.quadraticCurveTo(500, 275, 920, 205); x.stroke();
         const ropeY = cx => { const t = (cx - 80) / 840; return (1 - t) * (1 - t) * 205 + 2 * t * (1 - t) * 275 + t * t * 205; };
         [[230, 330, 80, "月"], [500, 430, 115, "圓"], [770, 330, 80, "福"]].forEach(([cx, cy, s, ch]) => {
           glow(x, cx, cy, s * 1.6, "rgba(255,200,90,.35)", "rgba(255,200,90,0)");
           lantern(x, f, cx, ropeY(cx), cy, s, ch);
         });
         // 兔子燈
         [365, 635].forEach(cx => {
           const top = ropeY(cx), cy = 640;
           glow(x, cx, cy, 110, "rgba(255,200,90,.35)", "rgba(255,200,90,0)");
           x.strokeStyle = f.gold; x.lineWidth = 2.5; x.beginPath(); x.moveTo(cx, top); x.lineTo(cx, cy - 100); x.stroke();
           ellip(x, cx - 22, cy - 68, 16, 40, -.2, "#fff3dc", f.gold, 2.5); ellip(x, cx + 22, cy - 68, 16, 40, .2, "#fff3dc", f.gold, 2.5);
           ellip(x, cx - 22, cy - 66, 7, 26, -.2, "#f4a6a6"); ellip(x, cx + 22, cy - 66, 7, 26, .2, "#f4a6a6");
           const g = x.createRadialGradient(cx - 15, cy - 15, 5, cx, cy, 70); g.addColorStop(0, "#ffffff"); g.addColorStop(1, "#f6dcb8");
           x.fillStyle = g; x.strokeStyle = f.gold; x.lineWidth = 3; circle(x, cx, cy, 64); x.fill(); x.stroke();
           x.fillStyle = "#c0140f"; circle(x, cx - 22, cy - 8, 7); x.fill(); circle(x, cx + 22, cy - 8, 7); x.fill();
           x.fillStyle = "#f4a6a6"; circle(x, cx - 38, cy + 14, 11); x.fill(); circle(x, cx + 38, cy + 14, 11); x.fill();
           x.fillStyle = "#e0707a"; x.beginPath(); x.moveTo(cx - 7, cy + 6); x.lineTo(cx + 7, cy + 6); x.lineTo(cx, cy + 16); x.closePath(); x.fill();
           x.strokeStyle = f.gold; x.lineWidth = 2; for (let i = -2; i <= 2; i++) { x.beginPath(); x.moveTo(cx + i * 10, cy + 64); x.lineTo(cx + i * 14, cy + 105); x.stroke(); }
         });
         return 885;
       }},

      // 8 賞月亭
      {motif:"山間涼亭旁松影橫斜，一輪明月自遠山升起，雁群南飛，是「海上生明月」的意境。", phrase:"明月千里",
       colors:{paper:"#233a6b", paper2:"#0e1a3a", gold:"#efd488"},
       draw(x, f) {
         stars(x, f, 81, 60, [70, 190, 930, 520]);
         moon(x, 500, 440, 200, f);
         x.fillStyle = f.paper; x.globalAlpha = .55; for (const [cx, cy, s] of [[250, 330, .9], [760, 520, 1]]) { x.globalAlpha = 1; cloud(x, f, cx, cy, s, f.paper); }
         // 雁群
         x.strokeStyle = f.paper2; x.lineWidth = 4; x.lineCap = "round";
         [[640, 300], [690, 335], [740, 295], [610, 350], [770, 365]].forEach(([cx, cy]) => { x.beginPath(); x.moveTo(cx - 20, cy - 8); x.quadraticCurveTo(cx - 8, cy - 12, cx, cy); x.quadraticCurveTo(cx + 8, cy - 12, cx + 20, cy - 8); x.stroke(); });
         // 遠山、近山
         const ridge = (fill, alpha, pts) => {
           const top = () => { x.moveTo(0, pts[0]); pts[1].forEach(c => x.quadraticCurveTo(c[0], c[1], c[2], c[3])); x.lineTo(1000, pts[2]); };
           x.fillStyle = fill; x.beginPath(); top(); x.lineTo(1000, 950); x.lineTo(0, 950); x.closePath(); x.fill();
           x.strokeStyle = f.gold; x.globalAlpha = alpha; x.lineWidth = 2; x.beginPath(); top(); x.stroke(); x.globalAlpha = 1;
         };
         ridge("#2c4a86", .5, [640, [[200, 560, 330, 690], [450, 600, 560, 720], [740, 560, 940, 680]], 640]);
         ridge(f.paper2, .6, [770, [[160, 700, 300, 780], [480, 830, 620, 760], [760, 650, 940, 740]], 740]);
         pine(x, f, 150, 800, 180); pine(x, f, 235, 815, 120);
         // 涼亭
         x.save(); x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 3; x.lineJoin = "round";
         x.fillRect(698, 620, 8, 100); x.fillRect(794, 620, 8, 100);
         x.fillStyle = "#f6c860"; x.globalAlpha = .85; x.fillRect(708, 640, 86, 60); x.globalAlpha = 1;
         x.fillStyle = f.paper2; x.fillRect(680, 712, 140, 16); x.strokeRect(680, 712, 140, 16);
         x.beginPath(); x.moveTo(650, 628); x.quadraticCurveTo(720, 622, 750, 565); x.quadraticCurveTo(780, 622, 850, 628); x.quadraticCurveTo(780, 612, 750, 596); x.quadraticCurveTo(720, 612, 650, 628); x.closePath(); x.fill(); x.stroke();
         x.beginPath(); x.moveTo(690, 628); x.lineTo(750, 570); x.lineTo(810, 628); x.closePath(); x.fill(); x.stroke();
         x.restore();
         return 890;
       }},

      // 9 蛋黃酥與鳳梨酥
      {motif:"圓盤上擺著金黃的蛋黃酥、切開露出紅豆沙與蛋黃的酥餅，還有一塊鳳梨酥。", phrase:"甜甜蜜蜜",
       colors:{paper:"#6b3a1c", paper2:"#341a0a", gold:"#f2c96b"},
       draw(x, f) {
         stars(x, f, 91, 40, [70, 190, 930, 300]);
         // 盤子
         glow(x, 500, 500, 340, "rgba(255,210,120,.25)", "rgba(255,210,120,0)");
         x.fillStyle = "#f7e6c4"; x.strokeStyle = f.gold; x.lineWidth = 6; circle(x, 500, 500, 292); x.fill(); x.stroke();
         x.strokeStyle = "#c98a3a"; x.lineWidth = 3; circle(x, 500, 500, 262); x.stroke();
         x.lineWidth = 2; circle(x, 500, 500, 250); x.stroke();
         // 整顆蛋黃酥
         const g = x.createRadialGradient(370, 400, 10, 400, 430, 110); g.addColorStop(0, "#f5c77a"); g.addColorStop(1, "#b8742a");
         x.fillStyle = g; x.strokeStyle = "#7a4416"; x.lineWidth = 4; circle(x, 395, 435, 108); x.fill(); x.stroke();
         x.strokeStyle = "rgba(122,68,22,.45)"; x.lineWidth = 3;
         for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(395, 435, 90 - i * 9, i * 1.1, i * 1.1 + 1.6); x.stroke(); }
         x.fillStyle = "#c0261c"; circle(x, 395, 435, 34); x.fill();
         bigChar(x, "月", 395, 438, 46, "#f7e6c4");
         // 切開的蛋黃酥
         x.fillStyle = "#e8b868"; x.strokeStyle = "#7a4416"; x.lineWidth = 4; circle(x, 625, 505, 112); x.fill(); x.stroke();
         x.strokeStyle = "#b87a30"; x.lineWidth = 3; for (let r = 100; r > 74; r -= 8) { circle(x, 625, 505, r); x.stroke(); }
         x.fillStyle = "#5a2a18"; circle(x, 625, 505, 70); x.fill();
         const yg = x.createRadialGradient(615, 495, 5, 625, 505, 40); yg.addColorStop(0, "#ffd24a"); yg.addColorStop(1, "#ee8a1c");
         x.fillStyle = yg; circle(x, 625, 505, 40); x.fill();
         x.fillStyle = "rgba(255,255,255,.35)"; circle(x, 610, 490, 10); x.fill();
         // 鳳梨酥
         x.save(); x.translate(505, 665); x.rotate(-.06);
         x.fillStyle = "#e6a850"; x.strokeStyle = "#7a4416"; x.lineWidth = 4; x.beginPath(); x.roundRect(-85, -42, 170, 84, 12); x.fill(); x.stroke();
         x.strokeStyle = "rgba(122,68,22,.5)"; x.lineWidth = 2.5;
         for (let i = -2; i <= 2; i++) { x.beginPath(); x.moveTo(i * 30 - 45, -42); x.lineTo(i * 30 + 45, 42); x.stroke(); x.beginPath(); x.moveTo(i * 30 + 45, -42); x.lineTo(i * 30 - 45, 42); x.stroke(); }
         x.restore();
         // 桂花點綴
         const r = rand(9); for (let i = 0; i < 12; i++) { const a = r() * 6.28, d = 230 + r() * 40; petals4(x, 500 + Math.cos(a) * d * .98, 500 + Math.sin(a) * d * .98, 4, "#d99b4a"); }
         return 890;
       }},

      // 10 玉兔搗藥
      {motif:"圓月之前，白玉兔雙手握著長杵，在石臼裡搗藥，藥香化成點點金光。", phrase:"玉兔獻福",
       colors:{paper:"#4d1c3c", paper2:"#260a1d", gold:"#f3cf7c"},
       draw(x, f) {
         stars(x, f, 101, 60, [70, 190, 930, 800]);
         moon(x, 500, 470, 285, f);
         // 石臼
         x.fillStyle = "#8a5a3a"; x.strokeStyle = "#4a2a18"; x.lineWidth = 4;
         x.beginPath(); x.moveTo(570, 620); x.lineTo(750, 620); x.quadraticCurveTo(740, 730, 700, 745); x.lineTo(620, 745); x.quadraticCurveTo(580, 730, 570, 620); x.closePath(); x.fill(); x.stroke();
         ellip(x, 660, 620, 90, 18, 0, "#6a3e22", "#4a2a18", 4); ellip(x, 660, 622, 70, 11, 0, "#3a1e10");
         x.fillStyle = f.gold; x.fillRect(585, 690, 150, 8);
         // 杵
         x.strokeStyle = "#a8743c"; x.lineWidth = 16; x.lineCap = "round"; x.beginPath(); x.moveTo(500, 520); x.lineTo(655, 628); x.stroke();
         x.strokeStyle = "#4a2a18"; x.lineWidth = 3; x.beginPath(); x.moveTo(500, 513); x.lineTo(655, 621); x.stroke();
         // 兔子
         x.save(); x.strokeStyle = "#8a6a50"; x.lineWidth = 3; x.lineJoin = "round";
         ellip(x, 408, 590, 92, 112, .1, "#fff6e8", "#8a6a50", 3);
         circle(x, 322, 650, 26); x.fillStyle = "#fff6e8"; x.fill(); x.stroke();
         ellip(x, 408, 705, 70, 30, 0, "#fff6e8", "#8a6a50", 3);
         ellip(x, 430, 428, 60, 54, 0, "#fff6e8", "#8a6a50", 3);
         ellip(x, 392, 330, 20, 76, -.15, "#fff6e8", "#8a6a50", 3); ellip(x, 440, 325, 20, 76, .12, "#fff6e8", "#8a6a50", 3);
         ellip(x, 392, 335, 9, 52, -.15, "#f4a6a6"); ellip(x, 440, 330, 9, 52, .12, "#f4a6a6");
         x.fillStyle = "#c0140f"; circle(x, 460, 424, 8); x.fill();
         x.fillStyle = "#e0707a"; circle(x, 484, 445, 6); x.fill();
         x.fillStyle = "#f4b6b6"; circle(x, 440, 452, 12); x.fill();
         // 前肢握杵
         x.strokeStyle = "#8a6a50"; x.lineWidth = 3; ellip(x, 490, 535, 34, 18, .55, "#fff6e8", "#8a6a50", 3);
         x.restore();
         // 金光
         const r = rand(12); for (let i = 0; i < 9; i++) petals4(x, 600 + r() * 140, 540 + r() * 70, 4 + r() * 3, "#ffe8a0");
         cloud(x, f, 250, 770, 1.1, f.paper); cloud(x, f, 760, 790, 1, f.paper);
         return 890;
       }},
    ],
  });
})();
