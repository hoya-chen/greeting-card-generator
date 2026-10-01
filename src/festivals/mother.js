/* 母親節 (mother). Owner of this file: the 母親節 designer. Add designs and messages here only. */
(() => {
  const GR = "#3f7a45", GR2 = "#2d6a3e";
  // pointed leaf from base to tip, bent sideways by `bend`
  const leaf = (x, bx, by, tx, ty, w, col, bend = 0, rib = true) => {
    const dx = tx - bx, dy = ty - by, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    const mx = (bx + tx) / 2 + nx * bend, my = (by + ty) / 2 + ny * bend;
    x.beginPath(); x.moveTo(bx, by);
    x.quadraticCurveTo(mx + nx * w * 2, my + ny * w * 2, tx, ty);
    x.quadraticCurveTo(mx - nx * w * 2, my - ny * w * 2, bx, by); x.closePath();
    x.fillStyle = col; x.fill();
    if (rib) { x.strokeStyle = "rgba(255,255,255,.28)"; x.lineWidth = 1.6; x.beginPath(); x.moveTo(bx, by); x.quadraticCurveTo(mx, my, tx, ty); x.stroke(); }
  };
  const stem = (x, p0, c, p1, w, col) => {
    x.save(); x.strokeStyle = col || GR; x.lineWidth = w; x.lineCap = "round";
    x.beginPath(); x.moveTo(p0[0], p0[1]); x.quadraticCurveTo(c[0], c[1], p1[0], p1[1]); x.stroke(); x.restore();
  };
  const rr = (x, x0, y0, x1, y1, r) => {
    x.beginPath(); x.moveTo(x0 + r, y0); x.lineTo(x1 - r, y0); x.quadraticCurveTo(x1, y0, x1, y0 + r); x.lineTo(x1, y1 - r);
    x.quadraticCurveTo(x1, y1, x1 - r, y1); x.lineTo(x0 + r, y1); x.quadraticCurveTo(x0, y1, x0, y1 - r); x.lineTo(x0, y0 + r);
    x.quadraticCurveTo(x0, y0, x0 + r, y0); x.closePath();
  };
  // ruffled carnation seen from the side
  const carn = (x, cx, cy, s, c1, c2) => {
    x.save();
    x.fillStyle = GR; x.beginPath(); x.moveTo(cx - s * .38, cy + s * .2); x.lineTo(cx + s * .38, cy + s * .2);
    x.lineTo(cx + s * .12, cy + s * .72); x.lineTo(cx - s * .12, cy + s * .72); x.closePath(); x.fill();
    for (let L = 0; L < 3; L++) {
      const w = s * (1 - L * .22), top = cy - s * .42 + L * s * .2, n = 11 - L * 2;
      x.fillStyle = L % 2 ? c2 : c1; x.strokeStyle = "rgba(255,255,255,.45)"; x.lineWidth = 2;
      x.beginPath(); x.moveTo(cx - w, cy + s * .2); x.lineTo(cx - w, top + s * .14);
      for (let i = 0; i < n; i++) {
        const x0 = cx - w + i * 2 * w / n, x1 = x0 + 2 * w / n;
        x.quadraticCurveTo((x0 + x1) / 2, top - s * .12 - (i % 2) * s * .04, x1, top + s * .14);
      }
      x.lineTo(cx + w, cy + s * .2); x.quadraticCurveTo(cx, cy + s * .5, cx - w, cy + s * .2); x.closePath(); x.fill(); x.stroke();
    }
    x.restore();
  };
  // daylily (萱草) bloom, six pointed petals
  const lily = (x, cx, cy, s, rot, c1, c2) => {
    x.save(); x.translate(cx, cy); x.rotate(rot);
    for (const pass of [0, 1]) for (let i = pass; i < 6; i += 2) {
      x.save(); x.rotate(i * Math.PI / 3);
      const w = pass ? s * .27 : s * .2;
      x.fillStyle = pass ? c2 : c1;
      x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(w * 1.7, -s * .55, 0, -s); x.quadraticCurveTo(-w * 1.7, -s * .55, 0, 0); x.fill();
      x.strokeStyle = "rgba(130,45,10,.4)"; x.lineWidth = 2; x.stroke();
      x.beginPath(); x.moveTo(0, -s * .12); x.lineTo(0, -s * .78); x.stroke();
      x.restore();
    }
    x.strokeStyle = "#8a3510"; x.fillStyle = "#8a3510"; x.lineWidth = 2.5;
    for (const k of [-1, 0, 1]) {
      x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(k * s * .1, -s * .3, k * s * .26, -s * .5); x.stroke();
      circle(x, k * s * .26, -s * .5, s * .045); x.fill();
    }
    x.restore();
  };
  const bud = (x, cx, cy, s, rot, col) => {
    x.save(); x.translate(cx, cy); x.rotate(rot); x.fillStyle = col;
    x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(s * .34, -s * .5, 0, -s); x.quadraticCurveTo(-s * .34, -s * .5, 0, 0); x.fill();
    x.strokeStyle = "rgba(130,45,10,.4)"; x.lineWidth = 2; x.stroke(); x.restore();
  };
  const peony = (x, cx, cy, R) => {
    const cols = ["#ffd2da", "#ffb3c1", "#ff8fa8", "#f2617f", "#d63a5c"];
    const rings = [[1, 9], [.8, 8], [.62, 7], [.45, 6], [.3, 5]];
    rings.forEach(([k, n], j) => {
      for (let i = 0; i < n; i++) {
        const a = j * .35 + i * 2 * Math.PI / n, d = R * k * .55;
        x.save(); x.translate(cx + Math.cos(a) * d, cy + Math.sin(a) * d * .9); x.rotate(a);
        x.fillStyle = cols[j]; x.strokeStyle = "rgba(120,20,50,.4)"; x.lineWidth = 2.2;
        x.beginPath(); x.ellipse(0, 0, R * k * .4, R * k * .31, 0, 0, Math.PI * 2); x.fill(); x.stroke();
        x.beginPath(); x.arc(R * k * .06, 0, R * k * .2, -1.1, 1.1); x.stroke();
        x.restore();
      }
    });
    x.fillStyle = "#f7d36b"; circle(x, cx, cy, R * .09); x.fill();
  };
  const lotusPetal = (x, ang, len, w, c1, c2, line) => {
    x.save(); x.rotate(ang);
    const g = x.createLinearGradient(0, 0, 0, -len); g.addColorStop(0, c1); g.addColorStop(1, c2);
    x.fillStyle = g; x.strokeStyle = line; x.lineWidth = 3;
    x.beginPath(); x.moveTo(0, 0); x.bezierCurveTo(w * 1.5, -len * .25, w * 1.1, -len * .8, 0, -len);
    x.bezierCurveTo(-w * 1.1, -len * .8, -w * 1.5, -len * .25, 0, 0); x.closePath(); x.fill(); x.stroke();
    x.globalAlpha = .45; x.beginPath(); x.moveTo(0, -len * .1); x.lineTo(0, -len * .75); x.stroke(); x.globalAlpha = 1;
    x.restore();
  };
  const swallow = (x, cx, cy, s, rot) => {
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s);
    x.fillStyle = "#1b2340";
    // forked tail
    x.beginPath(); x.moveTo(40, -6); x.lineTo(140, -26); x.lineTo(112, 4); x.lineTo(138, 34); x.lineTo(40, 14); x.closePath(); x.fill();
    // far wing
    x.fillStyle = "#2a3560"; x.beginPath(); x.moveTo(-10, -10); x.quadraticCurveTo(10, -90, 80, -120); x.quadraticCurveTo(50, -60, 30, -4); x.closePath(); x.fill();
    // body
    x.fillStyle = "#1b2340"; x.beginPath(); x.ellipse(0, 4, 64, 25, -.08, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#fff3dc"; x.beginPath(); x.ellipse(-8, 16, 46, 12, -.08, 0, Math.PI * 2); x.fill();
    // head, throat, beak
    x.fillStyle = "#1b2340"; circle(x, -58, -2, 21); x.fill();
    x.fillStyle = "#e0523c"; x.beginPath(); x.ellipse(-62, 10, 12, 8, 0, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#1b2340"; x.beginPath(); x.moveTo(-76, -7); x.lineTo(-96, 0); x.lineTo(-76, 6); x.closePath(); x.fill();
    x.fillStyle = "#fff3dc"; circle(x, -62, -7, 3.4); x.fill();
    // near wing
    x.fillStyle = "#33406f"; x.beginPath(); x.moveTo(-14, -6); x.quadraticCurveTo(-10, -100, 60, -150); x.quadraticCurveTo(70, -70, 34, 0); x.closePath(); x.fill();
    x.strokeStyle = "rgba(255,255,255,.3)"; x.lineWidth = 2; x.beginPath(); x.moveTo(-6, -20); x.quadraticCurveTo(20, -80, 56, -135); x.stroke();
    x.restore();
  };
  const chick = (x, cx, cy, r, tilt) => {
    x.save(); x.translate(cx, cy); x.rotate(tilt);
    x.fillStyle = "#c0302a"; x.beginPath(); x.moveTo(-r * .8, -r * .55); x.lineTo(0, -r * 1.75); x.lineTo(r * .8, -r * .55); x.closePath(); x.fill();
    x.fillStyle = "#ff9a3c"; x.beginPath(); x.moveTo(-r * .95, -r * .45); x.lineTo(-r * .1, -r * 1.7); x.lineTo(-r * .3, -r * .3); x.closePath(); x.fill();
    x.beginPath(); x.moveTo(r * .95, -r * .45); x.lineTo(r * .1, -r * 1.7); x.lineTo(r * .3, -r * .3); x.closePath(); x.fill();
    x.fillStyle = "#f6e3b8"; circle(x, 0, 0, r); x.fill();
    x.fillStyle = "#3a2418"; circle(x, -r * .45, -r * .1, r * .1); x.fill(); circle(x, r * .45, -r * .1, r * .1); x.fill();
    x.restore();
  };

  registerFest({
    id: "mother", name: "母親節", phrase: "慈恩永念",
    paper: "#b23a48", paper2: "#6e1a28", gold: "#f2cf8c",
    // up to 56 characters each; exactly 20 required
    msgs: [
      "母親節快樂！謝謝您無微不至的照顧，願您永遠健康美麗、天天開心。",
      "千言萬語說不完您的好。祝您母親節快樂，身體健康，日日舒心。",
      "您的愛是家裡最溫暖的地方。今天想好好對您說：謝謝您，我愛您。",
      "慈母手中線，遊子身上衣。謝謝您一針一線縫進的疼愛，母親節快樂。",
      "誰言寸草心，報得三春暉。謝謝您一生的疼愛，祝您母親節快樂。",
      "北堂萱草長青，願您忘憂自在、福壽安康，母親節快樂。",
      "謝謝您這麼多年的辛苦，往後換我們來照顧您。祝您母親節快樂。",
      "您的白髮裡藏著我們的成長，您的笑容是我們最大的福氣。",
      "母親節快樂！願您福慧雙全、笑口常開，天天都有好心情。",
      "辛苦了，媽媽。今天什麼都別忙，讓我們陪您好好歇一歇。",
      "慈暉永照，母愛無邊。祝您身體硬朗，日日平安喜樂。",
      "您是家中最溫柔的力量。祝您母親節快樂，健康美麗、福氣滿滿。",
      "感謝您給我生命，教我做人。願您歲歲平安，年年康泰。",
      "康乃馨獻給最愛的您，祝您母親節快樂，身體健康，萬事如意。",
      "家有一老，如有一寶。有您在，家就有溫暖。母親節快樂！",
      "飯菜裡的味道，是我一輩子忘不了的家。謝謝您，母親節快樂。",
      "願您心寬體健、福壽綿長，每一天都有好茶好飯好心情。",
      "您輕輕一句叮嚀，我們都放在心上。母親節快樂，願您笑口常開。",
      "謝謝您為這個家操勞一輩子。願您安享清福，兒孫繞膝，笑語滿堂。",
      "千里萬里都牽掛著您。祝您母親節快樂，平安喜樂，福壽雙全。",
    ],
    // exactly 10 required; each draw(x,f) returns the y (centre) where the phrase is written
    designs: [
      { motif: "三朵紅粉康乃馨紮成花束，繫上金色緞帶。", draw: LEGACY.mother },
      { motif: "一顆寫著「愛」字的大愛心，外圈繞著小花。", draw: LEGACY.mother2 },

      // 3 萱草: the traditional Chinese mother flower
      { motif: "金色圓盤上題「萱」字，下書「北堂」，兩側萱草花開、長葉輕垂，是中國傳統的母親花。",
        phrase: "萱草忘憂", colors: { paper: "#a8323e", paper2: "#5e1620", gold: "#f5d58a" },
        draw(x, f) {
          for (const [bx, dir] of [[190, 1], [810, -1]]) {
            [[-120, 560, 70], [-60, 470, 54], [30, 640, 60], [100, 540, 50]].forEach(([dx, ty, w], i) => {
              leaf(x, bx + dir * (i * 14 - 20), 940, bx + dir * dx * -1 - dir * 20 + dir * 60, ty + 20, w * .55, i % 2 ? GR : GR2, dir * -60);
            });
          }
          // stems and blooms, left
          stem(x, [200, 930], [90, 700], [180, 470], 7);
          stem(x, [185, 930], [310, 640], [330, 400], 6);
          stem(x, [215, 930], [200, 800], [110, 700], 6);
          lily(x, 180, 455, 100, -.3, "#f59a2a", "#ffbf5a");
          lily(x, 335, 385, 82, .35, "#f58a22", "#ffb04c");
          bud(x, 110, 715, 70, -.6, "#f59a2a");
          bud(x, 255, 560, 56, .5, "#ffb04c");
          // right
          stem(x, [800, 930], [910, 700], [820, 470], 7);
          stem(x, [815, 930], [690, 640], [670, 400], 6);
          stem(x, [785, 930], [800, 800], [890, 700], 6);
          lily(x, 820, 455, 100, .3, "#f59a2a", "#ffbf5a");
          lily(x, 665, 385, 82, -.35, "#f58a22", "#ffb04c");
          bud(x, 890, 715, 70, .6, "#f59a2a");
          bud(x, 745, 560, 56, -.5, "#ffb04c");
          // disc
          x.save();
          const g = x.createRadialGradient(470, 380, 10, 500, 420, 170); g.addColorStop(0, "#fff0c2"); g.addColorStop(1, f.gold);
          x.fillStyle = g; circle(x, 500, 420, 150); x.fill();
          x.strokeStyle = f.paper2; x.lineWidth = 4; circle(x, 500, 420, 132); x.stroke();
          x.restore();
          bigChar(x, "萱", 500, 428, 165, f.paper2);
          x.fillStyle = f.gold; x.font = `700 72px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("北堂", 500, 640);
          return 890;
        } },

      // 4 慈母手中線
      { motif: "紅布上以針線縫出一顆愛心，金針引線，旁有線軸與頂針，取「慈母手中線」之意。",
        phrase: "慈母情深", colors: { paper: "#9c2a30", paper2: "#561018", gold: "#efc977" },
        draw(x, f) {
          x.save(); x.fillStyle = "#c63a42"; rr(x, 170, 215, 830 - 20, 765, 34); x.fill();
          x.strokeStyle = f.gold; x.lineWidth = 6; x.setLineDash([16, 12]); rr(x, 196, 241, 804 - 20, 739, 22); x.stroke(); x.setLineDash([]);
          // heart in running stitch
          x.strokeStyle = "#fff3dc"; x.lineWidth = 9; x.lineCap = "round"; x.setLineDash([22, 14]); heart(x, 490, 460, 200); x.stroke(); x.setLineDash([]);
          x.restore();
          bigChar(x, "慈", 490, 470, 150, f.gold);
          // needle with thread
          x.save(); x.translate(600, 640); x.rotate(-.75);
          x.fillStyle = "#e8e8ee"; x.beginPath(); x.moveTo(-170, -3.5); x.lineTo(150, -2); x.lineTo(170, 0); x.lineTo(150, 2); x.lineTo(-170, 3.5); x.closePath(); x.fill();
          x.strokeStyle = "#b8b8c4"; x.lineWidth = 2.5; x.beginPath(); x.ellipse(-150, 0, 5, 1.5, 0, 0, Math.PI * 2); x.stroke();
          x.restore();
          x.save(); x.strokeStyle = f.gold; x.lineWidth = 5; x.lineCap = "round";
          x.beginPath(); x.moveTo(488, 745); x.bezierCurveTo(560, 800, 700, 700, 830, 800); x.stroke(); x.restore();
          // spool
          x.save(); x.fillStyle = f.gold; x.fillRect(790, 790, 100, 18); x.fillRect(790, 900, 100, 18);
          x.fillStyle = "#d9323f"; x.fillRect(800, 808, 80, 92);
          x.strokeStyle = "rgba(0,0,0,.25)"; x.lineWidth = 2; for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(800, 818 + i * 15); x.lineTo(880, 818 + i * 15); x.stroke(); }
          x.restore();
          // thimble
          x.save(); x.fillStyle = f.gold; x.beginPath(); x.moveTo(110, 900); x.lineTo(125, 810); x.quadraticCurveTo(165, 780, 205, 810); x.lineTo(220, 900); x.closePath(); x.fill();
          x.fillStyle = f.paper2; for (let r = 0; r < 3; r++) for (let c = 0; c < (r % 2 ? 3 : 4); c++) { circle(x, 132 + c * 24 + (r % 2) * 12, 828 + r * 24, 4.5); x.fill(); }
          x.fillRect(106, 892, 118, 12); x.restore();
          return 890;
        } },

      // 5 寸草春暉
      { motif: "朝陽自地平線升起，金光四射，前方一叢叢小草迎光生長，取「寸草春暉」之意。",
        phrase: "寸草春暉", colors: { paper: "#b5402c", paper2: "#6a1c12", gold: "#f6d27a" },
        draw(x, f) {
          x.save(); x.beginPath(); x.rect(80, 190, 840, 440); x.clip();
          for (let i = 0; i < 17; i++) {
            const a = Math.PI + (i + .5) * Math.PI / 17;
            x.fillStyle = f.gold; x.globalAlpha = i % 2 ? .18 : .3;
            x.beginPath(); x.moveTo(500, 620); x.arc(500, 620, 560, a - .055, a + .055); x.closePath(); x.fill();
          }
          x.globalAlpha = 1; x.restore();
          const g = x.createRadialGradient(500, 620, 20, 500, 620, 250); g.addColorStop(0, "#fff6d0"); g.addColorStop(.6, "#ffd466"); g.addColorStop(1, "#f2a640");
          x.save(); x.beginPath(); x.rect(0, 190, 1000, 430); x.clip(); x.fillStyle = g; circle(x, 500, 620, 250); x.fill();
          x.strokeStyle = f.gold; x.lineWidth = 4; circle(x, 500, 620, 262); x.stroke(); x.restore();
          cloud(x, f, 240, 360, 1.1, f.paper); cloud(x, f, 770, 310, .9, f.paper);
          // ground
          x.fillStyle = f.paper2; x.beginPath(); x.moveTo(80, 640); x.quadraticCurveTo(300, 600, 500, 630); x.quadraticCurveTo(720, 600, 920, 640);
          x.lineTo(920, 790); x.quadraticCurveTo(500, 820, 80, 790); x.closePath(); x.fill();
          x.strokeStyle = f.gold; x.lineWidth = 3; x.beginPath(); x.moveTo(80, 640); x.quadraticCurveTo(300, 600, 500, 630); x.quadraticCurveTo(720, 600, 920, 640); x.stroke();
          const r = rand(5); x.lineCap = "round";
          for (let t = 0; t < 22; t++) {
            const bx = 110 + r() * 780, by = 665 + r() * 100, h = 32 + r() * 38, n = 4 + Math.floor(r() * 3);
            for (let k = 0; k < n; k++) {
              const sp = (k - (n - 1) / 2) * 15, lean = sp * .6;
              x.strokeStyle = k % 2 ? "#8fd28a" : "#4f9a56"; x.lineWidth = 5;
              x.beginPath(); x.moveTo(bx + sp * .15, by); x.quadraticCurveTo(bx + sp * .6, by - h * .6, bx + lean + sp * .8, by - h * (.8 + (k % 3) * .12)); x.stroke();
            }
          }
          return 895;
        } },

      // 6 牡丹
      { motif: "一朵層層盛開的粉紅牡丹居中，綠葉與花苞環繞，象徵母親的雍容與福氣。",
        phrase: "富貴吉祥", colors: { paper: "#b8304f", paper2: "#701530", gold: "#f7dc9a" },
        draw(x, f) {
          // leaves
          [[500, 700, 200, 650, 40], [500, 700, 800, 650, 40], [500, 690, 130, 520, 36], [500, 690, 870, 520, 36], [500, 710, 330, 780, 34], [500, 710, 670, 780, 34]]
            .forEach(([bx, by, tx, ty, w], i) => { leaf(x, bx, by, tx, ty, w, i % 2 ? GR : GR2, i < 2 ? -30 : 20); });
          // buds
          stem(x, [500, 700], [140, 600], [170, 380], 6); stem(x, [500, 700], [860, 600], [830, 380], 6);
          for (const [bx, by] of [[170, 360], [830, 360]]) {
            x.fillStyle = "#ff8fa8"; x.beginPath(); x.ellipse(bx, by, 34, 44, 0, 0, Math.PI * 2); x.fill();
            x.fillStyle = "#ffd2da"; x.beginPath(); x.ellipse(bx, by - 8, 18, 32, 0, 0, Math.PI * 2); x.fill();
            x.fillStyle = GR; x.beginPath(); x.moveTo(bx - 36, by + 14); x.quadraticCurveTo(bx, by + 60, bx + 36, by + 14); x.quadraticCurveTo(bx, by + 24, bx - 36, by + 14); x.fill();
          }
          x.save(); x.strokeStyle = f.gold; x.lineWidth = 4; x.globalAlpha = .6; circle(x, 500, 440, 275); x.stroke(); x.globalAlpha = 1; x.restore();
          peony(x, 500, 440, 240);
          return 885;
        } },

      // 7 蓮花
      { motif: "池中一朵盛開的粉白蓮花，兩旁荷葉與花苞，水面漣漪層層，象徵母親的純淨與慈愛。",
        phrase: "德馨福厚", colors: { paper: "#9b2c4a", paper2: "#5a1229", gold: "#f0d08a" },
        draw(x, f) {
          // pads and bud
          for (const [px, py, pw] of [[230, 735, 150], [775, 720, 135]]) {
            x.fillStyle = GR2; x.strokeStyle = f.gold; x.lineWidth = 3;
            x.beginPath(); x.ellipse(px, py, pw, pw * .22, 0, .12, Math.PI * 2 - .12); x.lineTo(px, py); x.closePath(); x.fill(); x.stroke();
            x.strokeStyle = "rgba(255,255,255,.3)"; x.lineWidth = 2;
            for (let i = 0; i < 6; i++) { const a = .4 + i * 1; x.beginPath(); x.moveTo(px, py); x.lineTo(px + Math.cos(a) * pw * .85, py + Math.sin(a) * pw * .17); x.stroke(); }
          }
          stem(x, [790, 730], [830, 600], [800, 470], 8);
          x.save(); x.translate(800, 470); [-.3, .3, 0].forEach(a => lotusPetal(x, a, 120, 28, "#ffe6ec", "#ff9db8", f.gold)); x.restore();
          stem(x, [500, 740], [500, 700], [500, 640], 12);
          x.save(); x.translate(500, 650);
          [-1.25, -.85, -.45, .45, .85, 1.25].forEach(a => lotusPetal(x, a, 270, 52, "#ffd4de", "#ff9db8", f.gold));
          [-.62, -.2, .2, .62].forEach(a => lotusPetal(x, a, 310, 56, "#fff0f3", "#ffb3c6", f.gold));
          lotusPetal(x, 0, 330, 56, "#fff6f8", "#ffc4d3", f.gold);
          x.restore();
          x.fillStyle = "#f7d36b"; x.beginPath(); x.ellipse(500, 650, 38, 14, 0, 0, Math.PI * 2); x.fill();
          // water
          x.strokeStyle = f.gold; x.lineWidth = 3; x.lineCap = "round";
          for (let row = 0; row < 3; row++) { x.globalAlpha = .75 - row * .2; for (let i = 0; i < 8; i++) { const cx = 100 + i * 112 + (row % 2) * 56, cy = 790 + row * 22; x.beginPath(); x.arc(cx, cy, 44, Math.PI * 1.15, Math.PI * 1.85); x.stroke(); } }
          x.globalAlpha = 1;
          return 900;
        } },

      // 8 燕子 feeding chicks
      { motif: "屋樑上的燕巢裡，三隻雛燕張口等待，母燕銜食飛歸，垂柳輕拂，象徵母親的哺育之恩。",
        phrase: "哺育情深", colors: { paper: "#a63a3a", paper2: "#611b1e", gold: "#f2d18b" },
        draw(x, f) {
          // willow
          x.save(); x.strokeStyle = "#4a2a1a"; x.lineWidth = 10; x.lineCap = "round"; x.beginPath(); x.moveTo(80, 215); x.quadraticCurveTo(220, 190, 420, 235); x.stroke();
          const r = rand(12);
          for (let i = 0; i < 12; i++) {
            const sx = 110 + i * 26, sy = 212 + Math.sin(i * .5) * 4, len = 150 + r() * 160;
            x.strokeStyle = "#5fae6a"; x.lineWidth = 3; x.beginPath(); x.moveTo(sx, sy); x.quadraticCurveTo(sx + 16, sy + len * .5, sx + 8 + r() * 14, sy + len); x.stroke();
            x.fillStyle = "#7cc87f";
            for (let k = 1; k < 6; k++) { const ty = sy + len * k / 6; x.beginPath(); x.ellipse(sx + 10 + k * 1.5, ty, 5, 13, .3, 0, Math.PI * 2); x.fill(); }
          }
          x.restore();
          // beam
          x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 4; x.fillRect(100, 690, 800, 46); x.strokeRect(100, 690, 800, 46);
          x.fillStyle = f.gold; for (let i = 0; i < 8; i++) { x.fillRect(130 + i * 100, 700, 50, 6); }
          // nest
          x.fillStyle = "#4a2a1a"; x.beginPath(); x.ellipse(500, 600, 150, 26, 0, 0, Math.PI * 2); x.fill();
          chick(x, 435, 575, 32, -.2); chick(x, 500, 550, 34, .05); chick(x, 566, 578, 31, .3);
          x.fillStyle = "#8a5a34"; x.beginPath(); x.moveTo(350, 600); x.bezierCurveTo(360, 700, 440, 704, 500, 704); x.bezierCurveTo(560, 704, 640, 700, 650, 600);
          x.bezierCurveTo(600, 640, 400, 640, 350, 600); x.closePath(); x.fill();
          x.strokeStyle = "#5a3a1e"; x.lineWidth = 3; x.lineCap = "round";
          for (let i = 0; i < 9; i++) { const yy = 625 + i * 9; x.beginPath(); x.moveTo(372 + i * 4, yy); x.quadraticCurveTo(500, yy + 22, 628 - i * 4, yy); x.stroke(); }
          swallow(x, 720, 360, .95, -.35);
          x.strokeStyle = f.gold; x.lineWidth = 5; x.beginPath(); x.moveTo(636, 392); x.quadraticCurveTo(596, 396, 604, 356); x.stroke();
          return 890;
        } },

      // 9 bowl of rice with steam
      { motif: "一碗冒著熱氣的白飯，碗上寫著「家」字，蒸氣升成一顆愛心，旁有紅棗與茶杯，是媽媽的家常味。",
        phrase: "闔家平安", colors: { paper: "#b4352a", paper2: "#6b1610", gold: "#f4cf80" },
        draw(x, f) {
          // steam
          x.save(); x.strokeStyle = "#fff3dc"; x.lineWidth = 12; x.lineCap = "round"; x.globalAlpha = .65;
          for (const sx of [420, 500, 580]) { x.beginPath(); x.moveTo(sx, 450); x.bezierCurveTo(sx - 40, 410, sx + 40, 370, sx, 330); x.bezierCurveTo(sx - 30, 300, sx + 20, 285, sx, 270); x.stroke(); }
          x.restore();
          x.fillStyle = f.gold; heart(x, 500, 215, 34); x.fill();
          // rice mound
          x.fillStyle = "#fff3dc"; x.beginPath(); x.moveTo(300, 545); x.bezierCurveTo(310, 420, 420, 405, 500, 405); x.bezierCurveTo(580, 405, 690, 420, 700, 545); x.closePath(); x.fill();
          x.strokeStyle = "rgba(160,120,70,.45)"; x.lineWidth = 3; x.lineCap = "round";
          const r = rand(21); for (let i = 0; i < 26; i++) { const gx = 340 + r() * 320, gy = 440 + r() * 90; x.beginPath(); x.moveTo(gx, gy); x.lineTo(gx + 12, gy - 6); x.stroke(); }
          // bowl
          const g = x.createLinearGradient(0, 530, 0, 740); g.addColorStop(0, "#fbe3a0"); g.addColorStop(1, "#d9a94a");
          x.fillStyle = g; x.beginPath(); x.moveTo(280, 535); x.bezierCurveTo(290, 690, 390, 735, 420, 735); x.lineTo(580, 735); x.bezierCurveTo(610, 735, 710, 690, 720, 535); x.closePath(); x.fill();
          x.strokeStyle = f.paper2; x.lineWidth = 4; x.stroke();
          x.fillStyle = "#e9b84e"; x.beginPath(); x.ellipse(500, 535, 220, 26, 0, 0, Math.PI * 2); x.fill(); x.stroke();
          x.fillStyle = "#d9a94a"; x.fillRect(430, 735, 140, 24); x.strokeRect(430, 735, 140, 24);
          bigChar(x, "家", 500, 625, 110, f.paper2);
          // chopsticks
          x.strokeStyle = "#7a4a22"; x.lineWidth = 9; x.lineCap = "round";
          x.beginPath(); x.moveTo(310, 800); x.lineTo(700, 782); x.stroke(); x.beginPath(); x.moveTo(310, 818); x.lineTo(700, 800); x.stroke();
          // red dates
          x.fillStyle = "#c8281f"; for (const [px, py] of [[150, 700], [200, 730], [120, 750]]) { x.beginPath(); x.ellipse(px, py, 30, 22, .5, 0, Math.PI * 2); x.fill(); }
          x.strokeStyle = "rgba(255,255,255,.35)"; x.lineWidth = 3; x.beginPath(); x.arc(142, 694, 18, 3.6, 5); x.stroke();
          // tea cup
          x.fillStyle = f.gold; x.beginPath(); x.moveTo(790, 660); x.lineTo(900, 660); x.quadraticCurveTo(890, 750, 845, 750); x.quadraticCurveTo(800, 750, 790, 660); x.fill();
          x.fillStyle = "#d9a94a"; x.beginPath(); x.ellipse(845, 660, 55, 10, 0, 0, Math.PI * 2); x.fill();
          x.strokeStyle = f.gold; x.lineWidth = 8; x.beginPath(); x.arc(902, 690, 20, -1.3, 1.3); x.stroke();
          return 895;
        } },

      // 10 round fan with 母
      { motif: "圓形團扇正中寫著大大的「母」字，扇緣與扇柄垂著流蘇，左下與右上各簇擁著康乃馨。",
        phrase: "福壽康寧", colors: { paper: "#8f2a3c", paper2: "#4f1020", gold: "#f1cf86" },
        draw(x, f) {
          // handle and tassel
          x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 4; x.fillRect(486, 700, 28, 70); x.strokeRect(486, 700, 28, 70);
          x.fillStyle = f.gold; circle(x, 500, 778, 15); x.fill();
          x.strokeStyle = "#d9323f"; x.lineWidth = 4; x.lineCap = "round";
          for (let i = -4; i <= 4; i++) { x.beginPath(); x.moveTo(500 + i * 2, 790); x.lineTo(500 + i * 6, 826); x.stroke(); }
          // fan
          x.fillStyle = "#fff3dc"; circle(x, 500, 470, 235); x.fill();
          x.strokeStyle = f.gold; x.lineWidth = 16; x.stroke();
          x.strokeStyle = f.paper; x.lineWidth = 3; circle(x, 500, 470, 208); x.stroke();
          x.save(); x.globalAlpha = .18; x.strokeStyle = f.paper2; x.lineWidth = 2;
          for (let i = 0; i < 14; i++) { const a = i * Math.PI / 7; x.beginPath(); x.moveTo(500 + Math.cos(a) * 150, 470 + Math.sin(a) * 150); x.lineTo(500 + Math.cos(a) * 205, 470 + Math.sin(a) * 205); x.stroke(); }
          x.restore();
          bigChar(x, "母", 500, 478, 280, f.paper);
          // carnations
          leaf(x, 300, 720, 190, 590, 22, GR2, 20); leaf(x, 300, 720, 330, 560, 20, GR, -20); leaf(x, 300, 720, 160, 690, 18, GR, -10);
          carn(x, 235, 640, 68, "#f06a7c", "#ffb3bd"); carn(x, 330, 690, 62, "#e23a4f", "#ff8a98");
          leaf(x, 720, 330, 850, 440, 20, GR2, 20); leaf(x, 720, 330, 640, 230, 18, GR, -20);
          carn(x, 750, 300, 70, "#e23a4f", "#ff8a98"); carn(x, 825, 380, 58, "#f06a7c", "#ffb3bd");
          return 905;
        } },
    ],
  });
})();
