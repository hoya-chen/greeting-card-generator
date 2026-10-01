/* 春節 (spring). Owner of this file: the 春節 designer. Add designs and messages here only. */
(() => {
  const RED = "#e2231a", GREEN = "#2d6a43", GREEN2 = "#47915f";
  const ch = (x, s, cx, cy, size, col) => { x.fillStyle = col; x.font = `700 ${size}px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(s, cx, cy); };
  // 銅錢: round coin with a square hole
  const coin = (x, f, cx, cy, r, hole) => {
    x.save(); x.fillStyle = f.gold; x.strokeStyle = "#b98a2c"; x.lineWidth = Math.max(2, r * .09);
    circle(x, cx, cy, r); x.fill(); x.stroke(); circle(x, cx, cy, r * .82); x.stroke();
    x.fillStyle = hole || f.paper2; x.fillRect(cx - r * .27, cy - r * .27, r * .54, r * .54); x.strokeRect(cx - r * .27, cy - r * .27, r * .54, r * .54);
    x.restore();
  };
  // 金元寶
  const ingot = (x, f, cx, cy, s) => {
    x.save(); x.translate(cx, cy);
    const g = x.createLinearGradient(0, -.5 * s, 0, .5 * s); g.addColorStop(0, "#fff0b8"); g.addColorStop(.5, f.gold); g.addColorStop(1, "#d39a2a");
    x.fillStyle = g; x.strokeStyle = "#a8741c"; x.lineWidth = 3; x.lineJoin = "round";
    x.beginPath(); x.moveTo(-.6 * s, .42 * s); x.lineTo(.6 * s, .42 * s); x.quadraticCurveTo(.8 * s, .33 * s, .86 * s, 0);
    x.quadraticCurveTo(.96 * s, -.3 * s, 1.1 * s, -.46 * s); x.quadraticCurveTo(0, .08 * s, -1.1 * s, -.46 * s);
    x.quadraticCurveTo(-.96 * s, -.3 * s, -.86 * s, 0); x.quadraticCurveTo(-.8 * s, .33 * s, -.6 * s, .42 * s); x.closePath(); x.fill(); x.stroke();
    x.fillStyle = "#c98f26"; x.beginPath(); x.ellipse(0, -.05 * s, .56 * s, .11 * s, 0, 0, Math.PI * 2); x.fill();
    x.globalAlpha = .6; x.strokeStyle = "#fff6d0"; x.lineWidth = 3; x.beginPath(); x.moveTo(-.5 * s, .3 * s); x.lineTo(.5 * s, .3 * s); x.stroke();
    x.restore();
  };
  // fish facing +x, length about 320 at scale 1
  const fish = (x, f, cx, cy, rot, s, body, fin) => {
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.lineJoin = "round";
    x.fillStyle = fin; x.strokeStyle = f.paper2; x.lineWidth = 3 / s;
    x.beginPath(); x.moveTo(-90, 0); x.bezierCurveTo(-140, -40, -190, -110, -210, -90); x.bezierCurveTo(-170, -40, -180, 40, -215, 100); x.bezierCurveTo(-190, 110, -140, 50, -90, 0); x.closePath(); x.fill(); x.stroke();
    x.beginPath(); x.moveTo(-10, -62); x.quadraticCurveTo(10, -120, 70, -95); x.quadraticCurveTo(50, -75, 60, -45); x.closePath(); x.fill(); x.stroke();
    x.beginPath(); x.moveTo(-10, 60); x.quadraticCurveTo(0, 120, 50, 110); x.quadraticCurveTo(40, 85, 40, 55); x.closePath(); x.fill(); x.stroke();
    const g = x.createLinearGradient(0, -70, 0, 70); g.addColorStop(0, body); g.addColorStop(1, "#fff1c4");
    x.fillStyle = g; x.beginPath(); x.moveTo(150, 8); x.bezierCurveTo(115, -75, -30, -85, -100, 0); x.bezierCurveTo(-30, 85, 115, 80, 150, 8); x.closePath(); x.fill(); x.stroke();
    x.globalAlpha = .55; x.strokeStyle = "#8d4a12"; x.lineWidth = 2.5 / s;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { x.beginPath(); x.arc(-45 + c * 42 + (r % 2) * 20, -26 + r * 26, 20, -Math.PI * .5, Math.PI * .5); x.stroke(); }
    x.globalAlpha = 1; x.fillStyle = "#fff"; circle(x, 105, -14, 15); x.fill(); x.fillStyle = "#2a0a05"; circle(x, 109, -14, 8); x.fill();
    x.restore();
  };
  const lotus = (x, cx, cy, s, col) => {
    x.save(); x.translate(cx, cy); x.strokeStyle = "#8a2f45"; x.lineWidth = 2.5;
    [[-.95, .8], [.95, .8], [-.5, 1], [.5, 1], [0, 1.15]].forEach(([a, k]) => {
      x.save(); x.rotate(a); x.fillStyle = col; x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(-s * .36, -s * .5 * k, 0, -s * k); x.quadraticCurveTo(s * .36, -s * .5 * k, 0, 0); x.fill(); x.stroke(); x.restore();
    });
    x.restore();
  };
  // 吉祥結 rosette (loops of rope), centre cx,cy
  const knot = (x, f, cx, cy, s) => {
    x.save(); x.translate(cx, cy); x.lineCap = "round";
    const rope = (w, col) => { x.strokeStyle = col; x.lineWidth = w;
      for (let i = 0; i < 8; i++) { x.save(); x.rotate(i * Math.PI / 4); x.beginPath(); x.ellipse(0, -s * .5, s * .2, s * .5, 0, 0, Math.PI * 2); x.stroke(); x.restore(); }
      x.beginPath(); x.rect(-s * .22, -s * .22, s * .44, s * .44); x.stroke(); };
    rope(s * .1, f.gold); rope(s * .065, RED);
    x.fillStyle = f.gold; x.save(); x.rotate(Math.PI / 4); x.fillRect(-s * .13, -s * .13, s * .26, s * .26); x.restore();
    x.fillStyle = RED; x.save(); x.rotate(Math.PI / 4); x.fillRect(-s * .08, -s * .08, s * .16, s * .16); x.restore();
    x.restore();
  };
  const tassel = (x, f, cx, top, len, w) => {
    x.save(); x.fillStyle = f.gold; x.fillRect(cx - w * .12, top, w * .24, w * .3); x.fillStyle = RED; x.strokeStyle = f.gold; x.lineWidth = 2;
    x.beginPath(); x.moveTo(cx - w * .22, top + w * .3); x.lineTo(cx + w * .22, top + w * .3); x.lineTo(cx + w * .3, top + w * .8); x.lineTo(cx - w * .3, top + w * .8); x.closePath(); x.fill(); x.stroke();
    x.lineWidth = 3; x.strokeStyle = RED;
    for (let i = -7; i <= 7; i++) { x.beginPath(); x.moveTo(cx + i * w * .04, top + w * .8); x.lineTo(cx + i * w * .055, top + w * .8 + len); x.stroke(); }
    x.strokeStyle = f.gold; x.lineWidth = 4; x.beginPath(); x.moveTo(cx - w * .3, top + w * .95); x.lineTo(cx + w * .3, top + w * .95); x.stroke();
    x.restore();
  };
  const envelope = (x, f, cx, cy, rot, w, h, char) => {
    x.save(); x.translate(cx, cy); x.rotate(rot);
    x.shadowColor = "rgba(0,0,0,.35)"; x.shadowBlur = 18; x.shadowOffsetY = 8;
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, "#f03b2c"); g.addColorStop(1, "#c8180f");
    x.fillStyle = g; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 16); x.fill();
    x.shadowColor = "transparent"; x.shadowBlur = 0; x.shadowOffsetY = 0;
    x.strokeStyle = f.gold; x.lineWidth = 4; x.beginPath(); x.roundRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24, 10); x.stroke();
    x.lineWidth = 3; x.beginPath(); x.moveTo(-w / 2 + 12, -h / 2 + 12); x.lineTo(0, -h * .1); x.lineTo(w / 2 - 12, -h / 2 + 12); x.stroke();
    x.fillStyle = f.gold; circle(x, 0, -h * .1, w * .17); x.fill(); x.strokeStyle = "#b98a2c"; x.lineWidth = 3; x.stroke();
    ch(x, char, 0, -h * .1 + 3, w * .22, RED);
    x.fillStyle = f.gold; for (let i = 0; i < 3; i++) { circle(x, 0, h * .18 + i * 34, 5); x.fill(); }
    x.restore();
  };
  const narcissus = (x, cx, cy, r, rot) => {
    x.save(); x.translate(cx, cy); x.rotate(rot);
    x.fillStyle = "#fffaf0"; x.strokeStyle = "#d9c7a0"; x.lineWidth = 2;
    for (let i = 0; i < 6; i++) { x.save(); x.rotate(i * Math.PI / 3); x.beginPath(); x.ellipse(0, -r * .62, r * .34, r * .56, 0, 0, Math.PI * 2); x.fill(); x.stroke(); x.restore(); }
    x.fillStyle = "#f7c948"; circle(x, 0, 0, r * .3); x.fill(); x.strokeStyle = "#e08a1e"; x.lineWidth = 3; x.stroke();
    x.fillStyle = "#e08a1e"; circle(x, 0, 0, r * .12); x.fill();
    x.restore();
  };
  const leaf = (x, bx, by, tx, ty, w, col) => {
    const mx = (bx + tx) / 2, my = (by + ty) / 2, dx = ty - by, dy = bx - tx, L = Math.hypot(dx, dy) || 1;
    x.fillStyle = col; x.beginPath(); x.moveTo(bx, by);
    x.quadraticCurveTo(mx + dx / L * w, my + dy / L * w, tx, ty); x.quadraticCurveTo(mx - dx / L * w * .3, my - dy / L * w * .3, bx, by); x.fill();
  };

  registerFest({
    id: "spring", name: "春節", phrase: "{P}",
    paper: "#c0241c", paper2: "#7e100b", gold: "#f2c75c",
    couplet: ["天增歲月人增壽", "春滿乾坤福滿門"],
    // up to 56 characters each; exactly 20 required
    msgs: [
      "{Z}年行大運！敬祝您新春快樂、身體健康，福如東海，壽比南山。",
      "{P}，萬事吉祥。謝謝您一年來的辛勞與疼愛，祝您新的一年平安喜樂、笑口常開。",
      "新春佳節，給您拜年了！願您{Z}年身體硬朗、萬事如意，闔家團圓福滿堂。",
      "春聯貼門，福字倒貼，福到您家。祝您新年身體健康、平安順心，天天歡喜。",
      "過年了，謝謝您為這個家操勞一輩子。願您吃得下、睡得好，笑口常開，福氣滿滿。",
      "新春大吉！願您福祿壽喜四樣俱全，健康長壽，兒孫繞膝，日日都有好心情。",
      "年年有餘，歲歲平安。祝您新的一年身體安康，三餐可口，天天有笑容。",
      "恭喜發財，更祝您平安健康。紅包是小小心意，最想給您的是陪伴和一整年的好福氣。",
      "團圓飯桌上有您，就是我們最大的福氣。新春快樂，願您福壽康寧，萬事順心。",
      "吃年糕，年年高升；吃發糕，事事發達。祝您新年步步順心，身體康泰。",
      "三陽開泰，萬象更新。祝您新春心想事成，家庭和樂，平安喜樂每一天。",
      "春風送暖，福氣到家。祝您身體硬朗、胃口好、精神好，笑聲滿屋子。",
      "歲歲平安，年年如意。謝謝您一直是我們最溫暖的依靠，新年快樂！",
      "金桔結實，大吉大利。願您新春吉祥，家人平安，日子越過越甜。",
      "辭舊迎新，萬事如意。祝您新年有好睡、好胃口、好心情，福壽綿長。",
      "福如東海長流水，壽比南山不老松。敬祝您新春快樂，松鶴延年。",
      "新年到，給您拜年！願您出入平安、笑口常開，全家團團圓圓、和和氣氣。",
      "守歲圍爐，闔家歡聚。謝謝您的疼愛與叮嚀，祝您新的一年康健喜樂，福慧雙全。",
      "爆竹聲中一歲除，春風送暖入屠蘇。願您新年平安順遂，笑口常開。",
      "{P}，{Z}年到！祝您福氣滿滿、身體安泰，我們全家給您拜年，恭喜發財！",
    ],
    // exactly 10 required; each draw(x,f) returns the y (centre) where the phrase is written
    designs: [
      {motif: "左右一副春聯，中間是斗方「福」字，上方掛兩盞紅燈籠。", draw: LEGACY.spring},
      {motif: "當年生肖寫在金色圓章裡，一串鞭炮和紅白梅花迎春。", draw: LEGACY.spring2},
      {motif: "兩尾金鯉魚首尾相逐繞成圓，周圍水波盪漾，兩側各開一朵蓮花。", phrase: "年年有餘",
        colors: {paper: "#b81f1a", paper2: "#750f0b", gold: "#f2c75c"},
        draw(x, f) {
          const cx = 500, cy = 530;
          x.save(); x.strokeStyle = f.gold; x.lineWidth = 3;
          for (let i = 0; i < 5; i++) { x.globalAlpha = .75 - i * .13; circle(x, cx, cy, 190 + i * 38); x.stroke(); }
          x.restore(); x.globalAlpha = 1;
          x.fillStyle = f.paper2; x.globalAlpha = .55; circle(x, cx, cy, 175); x.fill(); x.globalAlpha = 1;
          // two fish chasing around the ring, bodies bent by drawing them on the tangent
          fish(x, f, cx - 10, cy - 125, 0, .72, "#ffb12e", "#ff7a3a");
          fish(x, f, cx + 10, cy + 125, Math.PI, .72, "#ffe08a", "#ffb12e");
          // little bubbles
          x.strokeStyle = f.gold; x.lineWidth = 2.5;
          [[640, 400, 10], [665, 360, 7], [350, 660, 9], [330, 700, 6]].forEach(([a, b, r]) => { circle(x, a, b, r); x.stroke(); });
          // lotus on both sides
          const lf = (px, py) => { x.fillStyle = "#2f7a52"; x.strokeStyle = f.gold; x.lineWidth = 2.5; x.beginPath(); x.ellipse(px, py + 70, 85, 26, 0, 0, Math.PI * 2); x.fill(); x.stroke(); lotus(x, px, py + 40, 120, "#ffc4cf"); };
          lf(175, 640); lf(825, 640);
          x.strokeStyle = f.gold; x.lineWidth = 3; x.globalAlpha = .8;
          for (let r = 0; r < 2; r++) for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(135 + i * 50 + r * 25, 770 + r * 34, 30, Math.PI * 1.1, Math.PI * 1.9); x.stroke(); x.beginPath(); x.arc(815 + i * 50 - r * 25 - 100, 770 + r * 34, 30, Math.PI * 1.1, Math.PI * 1.9); x.stroke(); }
          x.globalAlpha = 1;
          return 880;
        }},
      {motif: "三層金元寶堆成小山，銅錢撒落四周，兩串銅錢從上方垂下。", phrase: "金玉滿堂",
        colors: {paper: "#a81c15", paper2: "#5e0a07", gold: "#f6cd62"},
        draw(x, f) {
          // hanging coin strings
          [[170, 5], [830, 5]].forEach(([px, n]) => {
            x.strokeStyle = RED; x.lineWidth = 5; x.beginPath(); x.moveTo(px, 190); x.lineTo(px, 190 + 70 * n + 40); x.stroke();
            for (let i = 0; i < n; i++) coin(x, f, px, 245 + i * 70, 30);
            tassel(x, f, px, 190 + 70 * n + 20, 70, 50);
          });
          stars(x, f, 41, 60, [260, 200, 740, 800]);
          burst(x, f, 500, 360, 120, 16, f.gold);
          ingot(x, f, 500, 400, 100);
          ingot(x, f, 385, 535, 105); ingot(x, f, 615, 535, 105);
          ingot(x, f, 270, 680, 110); ingot(x, f, 500, 690, 120); ingot(x, f, 730, 680, 110);
          [[330, 780, 26], [665, 775, 30], [420, 760, 22], [600, 765, 22], [235, 770, 24], [770, 770, 24]].forEach(([a, b, r]) => coin(x, f, a, b, r));
          [[360, 250, 28], [650, 280, 24], [300, 420, 22], [710, 460, 26]].forEach(([a, b, r]) => coin(x, f, a, b, r));
          return 885;
        }},
      {motif: "兩個大紅包一左一右斜靠，封面貼金色圓章，金幣在四周散落。", phrase: "福壽雙全",
        colors: {paper: "#8a1710", paper2: "#4a0806", gold: "#f6cd62"},
        draw(x, f) {
          stars(x, f, 51, 50, [90, 200, 910, 940]);
          envelope(x, f, 640, 555, .16, 290, 420, "壽");
          envelope(x, f, 380, 565, -.14, 300, 440, "福");
          [[180, 330, 34], [820, 300, 28], [150, 690, 30], [860, 700, 36], [500, 260, 26], [215, 500, 22], [790, 470, 24], [270, 790, 24], [740, 790, 26]].forEach(([a, b, r]) => coin(x, f, a, b, r));
          return 885;
        }},
      {motif: "紅色中國結（吉祥結）高掛，兩旁各一個小結，下垂金紅流蘇。", phrase: "吉祥如意",
        colors: {paper: "#b61f19", paper2: "#6e0e0a", gold: "#f2c75c"},
        draw(x, f) {
          const hang = (px, ky, s, tl, tw) => {
            x.strokeStyle = f.gold; x.lineWidth = 5; x.beginPath(); x.moveTo(px, 190); x.lineTo(px, ky - s * .95); x.stroke();
            knot(x, f, px, ky, s);
            x.save(); x.strokeStyle = RED; x.lineWidth = 7; x.lineCap = "round"; x.beginPath(); x.moveTo(px, ky + s * .5); x.lineTo(px, ky + s * .75); x.stroke(); x.restore();
            tassel(x, f, px, ky + s * .72, tl, tw);
          };
          hang(500, 440, 200, 90, 100);
          hang(190, 400, 120, 60, 56); hang(810, 400, 120, 60, 56);
          cloud(x, f, 300, 740, 1.0, f.paper); cloud(x, f, 700, 760, 1.0, f.paper);
          stars(x, f, 61, 40, [90, 200, 910, 800]);
          return 890;
        }},
      {motif: "窗格上貼一幅圓形紅色剪紙「窗花」，中心鏤空「福」字，四角是花紋。", phrase: "萬象更新",
        colors: {paper: "#b01c16", paper2: "#6a0d09", gold: "#f2c75c"},
        draw(x, f) {
          const cx = 500, cy = 515, S = 560;
          // window frame and paper
          x.fillStyle = f.paper2; x.fillRect(cx - S / 2 - 18, cy - S / 2 - 18, S + 36, S + 36);
          x.fillStyle = "#fff0d2"; x.fillRect(cx - S / 2, cy - S / 2, S, S);
          x.strokeStyle = "#e3c88e"; x.lineWidth = 3;
          for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(cx - S / 2 + i * S / 4, cy - S / 2); x.lineTo(cx - S / 2 + i * S / 4, cy + S / 2); x.stroke(); x.beginPath(); x.moveTo(cx - S / 2, cy - S / 2 + i * S / 4); x.lineTo(cx + S / 2, cy - S / 2 + i * S / 4); x.stroke(); }
          x.strokeStyle = f.gold; x.lineWidth = 6; x.strokeRect(cx - S / 2 - 9, cy - S / 2 - 9, S + 18, S + 18);
          // paper-cut: red disc with cut-outs
          x.fillStyle = "#d4281d"; circle(x, cx, cy, 235); x.fill();
          x.fillStyle = "#fff0d2";
          for (let i = 0; i < 16; i++) { x.save(); x.translate(cx, cy); x.rotate(i * Math.PI / 8); x.beginPath(); x.moveTo(0, -236); x.lineTo(-13, -214); x.lineTo(13, -214); x.closePath(); x.fill(); x.restore(); }
          for (let i = 0; i < 12; i++) { x.save(); x.translate(cx, cy); x.rotate(i * Math.PI / 6); x.beginPath(); x.ellipse(0, -172, 15, 30, 0, 0, Math.PI * 2); x.fill(); circle(x, 0, -128, 8); x.fill(); x.restore(); }
          for (let i = 0; i < 8; i++) { x.save(); x.translate(cx, cy); x.rotate(i * Math.PI / 4 + Math.PI / 8); x.beginPath(); x.moveTo(0, -60); x.quadraticCurveTo(52, -84, 0, -112); x.quadraticCurveTo(-52, -84, 0, -60); x.fill(); x.restore(); }
          x.fillStyle = "#d4281d"; circle(x, cx, cy, 82); x.fill();
          ch(x, "福", cx, cy + 5, 118, "#fff0d2");
          // corner flowers
          [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
            const px = cx + sx * (S / 2 - 52), py = cy + sy * (S / 2 - 52);
            x.fillStyle = "#d4281d"; circle(x, px, py, 40); x.fill();
            x.fillStyle = "#fff0d2"; for (let k = 0; k < 6; k++) { circle(x, px + Math.cos(k * Math.PI / 3) * 20, py + Math.sin(k * Math.PI / 3) * 20, 7); x.fill(); } circle(x, px, py, 8); x.fill();
          });
          return 890;
        }},
      {motif: "三層年糕疊成塔，頂端貼紅色「春」字，兩旁各一個裂開笑口的發糕，蒸氣裊裊。", phrase: "年年高升",
        colors: {paper: "#b3201a", paper2: "#6c0f0b", gold: "#f4cb60"},
        draw(x, f) {
          // steam
          x.save(); x.strokeStyle = "#fff3dc"; x.globalAlpha = .5; x.lineWidth = 6; x.lineCap = "round";
          [[420, 330], [500, 300], [580, 330]].forEach(([sx, sy]) => { x.beginPath(); x.moveTo(sx, sy + 40); x.bezierCurveTo(sx - 40, sy, sx + 40, sy - 40, sx, sy - 90); x.stroke(); });
          x.restore();
          // year cakes
          const cake = (cx, topY, w, h, col) => {
            const g = x.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0); g.addColorStop(0, "#e9c06a"); g.addColorStop(.5, col); g.addColorStop(1, "#d9a24a");
            x.fillStyle = g; x.strokeStyle = "#8a5a1c"; x.lineWidth = 4;
            x.beginPath(); x.moveTo(cx - w / 2, topY); x.lineTo(cx - w / 2, topY + h); x.ellipse(cx, topY + h, w / 2, w * .14, 0, Math.PI, 0, true); x.lineTo(cx + w / 2, topY); x.closePath(); x.fill(); x.stroke();
            x.fillStyle = "#fff0c2"; x.beginPath(); x.ellipse(cx, topY, w / 2, w * .14, 0, 0, Math.PI * 2); x.fill(); x.stroke();
          };
          cake(500, 590, 420, 110, "#f3d88a"); cake(500, 480, 330, 100, "#f6dd96"); cake(500, 380, 240, 95, "#f8e3a6");
          x.fillStyle = RED; circle(x, 500, 380, 40); x.fill(); x.strokeStyle = f.gold; x.lineWidth = 3; x.stroke();
          ch(x, "春", 500, 384, 46, f.gold);
          // red dates around base
          x.fillStyle = "#9c1c12"; [[330, 700], [670, 700]].forEach(([a, b]) => { x.beginPath(); x.ellipse(a, b, 20, 13, .3, 0, Math.PI * 2); x.fill(); });
          // fa gao
          const fagao = (cx, cy) => {
            x.fillStyle = f.gold; x.strokeStyle = "#a8741c"; x.lineWidth = 3;
            x.beginPath(); x.ellipse(cx, cy + 64, 105, 22, 0, 0, Math.PI * 2); x.fill(); x.stroke();
            const g = x.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, 90); g.addColorStop(0, "#fff4cf"); g.addColorStop(1, "#e8b85a");
            x.fillStyle = g; x.beginPath(); x.moveTo(cx - 80, cy + 60); x.bezierCurveTo(cx - 100, cy - 20, cx - 40, cy - 70, cx, cy - 70); x.bezierCurveTo(cx + 40, cy - 70, cx + 100, cy - 20, cx + 80, cy + 60); x.closePath(); x.fill(); x.stroke();
            x.strokeStyle = "#a8741c"; x.lineWidth = 4; x.beginPath(); x.moveTo(cx - 36, cy - 42); x.quadraticCurveTo(cx, cy - 6, cx + 36, cy - 42); x.moveTo(cx, cy - 66); x.lineTo(cx, cy - 20); x.stroke();
            x.fillStyle = RED; circle(x, cx, cy - 46, 11); x.fill();
          };
          fagao(205, 690); fagao(795, 690);
          return 885;
        }},
      {motif: "一盆結滿金黃果實的金桔樹，紅色花盆上有「吉」字，樹上掛著小紅包。", phrase: "大吉大利",
        colors: {paper: "#a91f18", paper2: "#650d09", gold: "#f3c95c"},
        draw(x, f) {
          // trunk
          x.strokeStyle = "#4b2a12"; x.lineWidth = 22; x.lineCap = "round";
          x.beginPath(); x.moveTo(500, 760); x.quadraticCurveTo(490, 640, 500, 560); x.stroke();
          x.lineWidth = 12; x.beginPath(); x.moveTo(498, 640); x.lineTo(410, 560); x.moveTo(500, 620); x.lineTo(590, 530); x.stroke();
          // canopy
          const r = rand(77);
          const blobs = [[500, 380, 150], [370, 440, 120], [630, 440, 120], [300, 540, 90], [700, 540, 90], [500, 520, 130], [420, 300, 100], [585, 300, 100]];
          blobs.forEach(([a, b, rr], i) => { x.fillStyle = i % 2 ? GREEN : "#256040"; circle(x, a, b, rr); x.fill(); });
          for (let i = 0; i < 70; i++) {
            const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 270, lx = 500 + Math.cos(a) * d * 1.1, ly = 430 + Math.sin(a) * d * .75;
            if (ly > 640) continue;
            x.save(); x.translate(lx, ly); x.rotate(r() * 6.28); x.fillStyle = r() > .5 ? GREEN2 : "#3a7d54"; x.beginPath(); x.ellipse(0, 0, 9, 22, 0, 0, Math.PI * 2); x.fill(); x.restore();
          }
          // kumquats
          for (let i = 0; i < 26; i++) {
            const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 245, px = 500 + Math.cos(a) * d * 1.05, py = 430 + Math.sin(a) * d * .72;
            if (py > 650 || py < 215) continue;
            const g = x.createRadialGradient(px - 6, py - 6, 2, px, py, 26); g.addColorStop(0, "#ffd86b"); g.addColorStop(1, "#f08a1c");
            x.fillStyle = g; x.beginPath(); x.ellipse(px, py, 22, 25, 0, 0, Math.PI * 2); x.fill(); x.strokeStyle = "#b85d0f"; x.lineWidth = 2; x.stroke();
            x.fillStyle = "#2a6a3a"; circle(x, px, py - 22, 4); x.fill();
          }
          // little red packets hanging
          [[330, 520], [670, 520], [500, 640]].forEach(([a, b]) => {
            x.strokeStyle = f.gold; x.lineWidth = 2; x.beginPath(); x.moveTo(a, b - 25); x.lineTo(a, b); x.stroke();
            x.fillStyle = RED; x.beginPath(); x.roundRect(a - 22, b, 44, 62, 5); x.fill(); x.strokeStyle = f.gold; x.lineWidth = 2; x.stroke();
            ch(x, "福", a, b + 33, 28, f.gold);
          });
          // pot
          x.fillStyle = RED; x.strokeStyle = f.gold; x.lineWidth = 4;
          x.beginPath(); x.moveTo(350, 730); x.lineTo(650, 730); x.lineTo(620, 810); x.quadraticCurveTo(500, 830, 380, 810); x.closePath(); x.fill(); x.stroke();
          x.fillStyle = f.gold; x.beginPath(); x.ellipse(500, 730, 160, 20, 0, 0, Math.PI * 2); x.fill();
          x.fillStyle = "#3b2314"; x.beginPath(); x.ellipse(500, 730, 138, 12, 0, 0, Math.PI * 2); x.fill();
          ch(x, "吉", 500, 775, 62, f.gold);
          return 900;
        }},
      {motif: "金色花邊圓牌上倒貼一個大「福」字（福到了），兩旁水仙花與長葉盛開，上方祥雲。", phrase: "福到家門",
        colors: {paper: "#bd2219", paper2: "#7a100b", gold: "#f4c95a"},
        draw(x, f) {
          cloud(x, f, 250, 260, .9, f.paper); cloud(x, f, 750, 270, .9, f.paper);
          // narcissus bunches
          const bunch = (side) => {
            const s = side, bx = 500 + s * 330;
            [[-.45, 250], [.1, 300], [.5, 240], [-.2, 200], [.3, 190]].forEach(([ang, len]) => leaf(x, bx + s * 10, 820, bx + s * 10 - s * ang * 260, 820 - len * 1.7, 24, i2c(ang)));
            [[bx - s * 45, 400, 52], [bx + s * 40, 500, 58], [bx - s * 5, 590, 46], [bx + s * 55, 345, 40]].forEach(([a, b, r]) => {
              x.strokeStyle = GREEN; x.lineWidth = 7; x.beginPath(); x.moveTo(a, b); x.quadraticCurveTo(a, 700, bx + s * 10, 820); x.stroke();
              narcissus(x, a, b, r, a * .01);
            });
          };
          const i2c = a => a > 0 ? GREEN2 : GREEN;
          bunch(-1); bunch(1);
          // medal
          x.fillStyle = f.gold; scallop(x, 500, 540, 260, 20, 20); x.fill();
          x.fillStyle = f.paper2; circle(x, 500, 540, 225); x.fill(); x.strokeStyle = f.gold; x.lineWidth = 4; circle(x, 500, 540, 210); x.stroke();
          x.lineWidth = 2; x.setLineDash([6, 10]); circle(x, 500, 540, 188); x.stroke(); x.setLineDash([]);
          x.save(); x.translate(500, 548); x.rotate(Math.PI); ch(x, "福", 0, 0, 300, f.gold); x.restore();
          return 880;
        }},
    ],
  });
})();
