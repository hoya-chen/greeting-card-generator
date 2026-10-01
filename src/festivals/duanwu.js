/* 端午節 (duanwu). Owner of this file: the 端午節 designer. Add designs and messages here only. */
(() => {
  const RED = "#c8372d", GRN = "#2f8a58", GRN2 = "#2c7a4b", AI = "#8dc29f";
  const THREAD = ["#d9453a", "#f2c75c", "#4fae6a", "#fff3dc", "#4a78c2"]; // 五彩線
  const lens = (x, len, w) => { x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(len * .5, -w, len, 0); x.quadraticCurveTo(len * .5, w, 0, 0); x.closePath(); };
  // a single leaf from (bx,by) pointing at angle a
  const leaf = (x, f, bx, by, a, len, w, fill, vein) => {
    x.save(); x.translate(bx, by); x.rotate(a); lens(x, len, w); x.fillStyle = fill; x.fill();
    x.strokeStyle = f.gold; x.lineWidth = 2; x.stroke();
    if (vein) { x.globalAlpha = .6; x.beginPath(); x.moveTo(len * .08, 0); x.lineTo(len * .92, 0); x.stroke(); }
    x.restore();
  };
  // 艾草 sprig: a stem with paired leaflets
  const sprig = (x, f, bx, by, a, len, n, sz, fill) => {
    x.save(); x.translate(bx, by); x.rotate(a); x.strokeStyle = f.gold; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(len, 0); x.stroke();
    for (let i = 1; i <= n; i++) { const t = i / (n + .5), px = len * t, s = sz * (1.1 - t * .55); leaf(x, f, px, 0, -.9, s, s * .28, fill, false); leaf(x, f, px, 0, .9, s, s * .28, fill, false); }
    leaf(x, f, len, 0, 0, sz * .5, sz * .16, fill, false);
    x.restore();
  };
  // 菖蒲 sword leaf
  const blade = (x, f, bx, by, tx, ty, w, bend, fill) => {
    const dx = tx - bx, dy = ty - by, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L, mx = (bx + tx) / 2 + nx * bend, my = (by + ty) / 2 + ny * bend;
    x.beginPath(); x.moveTo(bx, by); x.quadraticCurveTo(mx + nx * w, my + ny * w, tx, ty); x.quadraticCurveTo(mx - nx * w, my - ny * w, bx, by); x.closePath();
    x.fillStyle = fill; x.fill(); x.strokeStyle = f.gold; x.lineWidth = 2; x.stroke();
    x.save(); x.globalAlpha = .55; x.beginPath(); x.moveTo(bx, by); x.quadraticCurveTo(mx, my, tx, ty); x.stroke(); x.restore();
  };
  // 粽子 (triangular, apex up)
  const zongzi = (x, f, cx, cy, s, rot) => {
    x.save(); x.translate(cx, cy); x.rotate(rot || 0); x.lineJoin = "round";
    const A = [0, -s], L = [-s * .92, s * .58], R = [s * .92, s * .58], B = [0, s * .86];
    const face = (p, q, c) => { x.beginPath(); x.moveTo(A[0], A[1]); x.lineTo(p[0], p[1]); x.lineTo(q[0], q[1]); x.closePath(); x.fillStyle = c; x.fill(); x.strokeStyle = f.gold; x.lineWidth = 3; x.stroke(); };
    face(L, B, "#5fae7b"); face(B, R, "#2f7a50");
    const lp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
    x.save(); x.globalAlpha = .4; x.lineWidth = 2; x.strokeStyle = f.gold;
    for (const k of [.3, .62]) { let a = lp(L, B, k), b = lp(B, R, k); x.beginPath(); x.moveTo(A[0], A[1]); x.lineTo(a[0], a[1]); x.moveTo(A[0], A[1]); x.lineTo(b[0], b[1]); x.stroke(); }
    x.restore();
    [[.42, THREAD[0]], [.5, THREAD[1]]].forEach(([t, c], i) => {
      const a = lp(A, L, t), b = lp(A, R, t); x.strokeStyle = c; x.lineWidth = i ? 3 : 7;
      x.beginPath(); x.moveTo(a[0], a[1] + i * 3); x.quadraticCurveTo(0, a[1] + s * .32 + i * 3, b[0], b[1] + i * 3); x.stroke();
    });
    x.strokeStyle = THREAD[0]; x.lineWidth = 4; x.lineCap = "round";
    x.beginPath(); x.moveTo(0, -s * .98); x.quadraticCurveTo(-s * .12, -s * 1.18, -s * .2, -s * 1.1); x.moveTo(0, -s * .98); x.quadraticCurveTo(s * .12, -s * 1.18, s * .2, -s * 1.1); x.stroke();
    x.fillStyle = THREAD[0]; circle(x, 0, -s * .96, 9); x.fill(); x.strokeStyle = f.gold; x.lineWidth = 2; x.stroke();
    x.restore();
  };
  // five-colour tassel hanging from (cx,y)
  const tassel = (x, f, cx, y, len) => {
    x.save(); x.lineCap = "round"; x.lineWidth = 5;
    THREAD.forEach((c, i) => { const dx = (i - 2) * 9; x.strokeStyle = c; x.beginPath(); x.moveTo(cx, y); x.quadraticCurveTo(cx + dx * .4, y + len * .5, cx + dx, y + len); x.stroke(); });
    x.fillStyle = f.gold; circle(x, cx, y + 4, 11); x.fill(); x.strokeStyle = RED; x.lineWidth = 3; x.stroke();
    x.restore();
  };
  // rolling waves: fills from the wave line down to yb
  const waves = (x, f, y0, yb, amp, wl, ph, fill, alpha) => {
    x.save(); x.beginPath(); x.moveTo(60, yb); x.lineTo(60, y0);
    for (let px = 60; px <= 940; px += 8) x.lineTo(px, y0 + Math.sin(px / wl * Math.PI * 2 + ph) * amp);
    x.lineTo(940, yb); x.closePath(); x.globalAlpha = alpha; x.fillStyle = fill; x.fill();
    x.globalAlpha = .75; x.strokeStyle = f.gold; x.lineWidth = 3; x.beginPath();
    for (let px = 60; px <= 940; px += 8) { const py = y0 + Math.sin(px / wl * Math.PI * 2 + ph) * amp; px === 60 ? x.moveTo(px, py) : x.lineTo(px, py); }
    x.stroke(); x.restore();
  };
  const pt = (P, t) => { const u = 1 - t; return [u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0], u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1]]; };

  registerFest({
    id: "duanwu", name: "端午節", phrase: "端陽安康",
    paper: "#1d5a4c", paper2: "#0c332a", gold: "#e7c56f",
    msgs: [
      "端午安康！吃粽子、掛艾草，祝您身體健康，平平安安過夏天。",
      "五月五，過端午。願您粽享健康、粽享福氣，家裡和樂又順心。",
      "端午佳節，記得天熱多喝水、多休息。祝您安康吉祥，事事順利。",
      "艾草香、粽葉香，端午的味道裡都是對您的牽掛，祝您平安喜樂。",
      "門前掛艾、身上佩香，願一切不順遠離，換來滿滿的平安與福氣。",
      "龍舟競渡鼓聲響，願您精神抖擻、身體硬朗，日子一天比一天好。",
      "端午到，粽子香。願您胃口好、笑口開，每一天都吃得開心。",
      "節分端午自誰言，萬古傳聞為屈原。願您佳節平安，闔家歡喜。",
      "輕汗微微透碧紈，明朝端午浴芳蘭。天氣漸熱，請您多保重。",
      "五月榴花紅似火，祝您日子紅紅火火，笑口常開，福壽安康。",
      "手繫五彩線，平安纏在身。願您端午佳節，福壽綿長，萬事如意。",
      "謝謝您年年為我們包粽子，那份味道是家的記憶。祝您端午安康。",
      "天中節到，願您身心清爽、笑容滿面，把煩惱隨著龍舟送走。",
      "午時一到，願好運像立起來的蛋一樣，穩穩當當，平安順遂。",
      "夏日將至，要記得多喝水、少曬太陽，保重身體。端午節快樂！",
      "不論南部粽、北部粽，只要是您包的都最好吃。祝您端午安康。",
      "艾葉驅邪，菖蒲納福，願一切平安吉祥，闔家安康。",
      "端陽佳節，風和日麗。願您心曠神怡，健康長壽，笑口常開。",
      "人在遠方也惦記著您，粽香飄千里，願您端午平安，歲歲安康。",
      "龍舟鼓聲震，福氣滿家門。祝您與家人端午快樂，吉祥如意。",
    ],
    designs: [
      {motif:"綁著金繩的大粽子，下方龍舟在浪花中前進。", draw:LEGACY.duanwu},
      {motif:"一個繡著「安」字的端午香包，兩旁插著艾草與菖蒲。", draw:LEGACY.duanwu2},

      {motif:"紅色龍舟在金日下競渡，船員奮力划槳、鼓手擊鼓，浪花翻湧。", phrase:"乘風破浪",
        colors:{paper:"#13575f", paper2:"#07313a", gold:"#f0d27a"},
        draw(x, f) {
          x.save(); x.globalAlpha = .18; x.fillStyle = f.gold; circle(x, 500, 430, 200); x.fill();
          x.globalAlpha = .92; circle(x, 500, 430, 125); x.fill(); x.restore();
          cloud(x, f, 215, 285, .8, f.paper2); cloud(x, f, 790, 270, .7, f.paper2);
          // paddlers (behind hull)
          for (let i = 0; i < 7; i++) {
            const px = 225 + i * 85;
            x.fillStyle = i % 2 ? f.gold : INK; x.strokeStyle = f.paper2; x.lineWidth = 2;
            x.beginPath(); x.roundRect(px - 19, 556, 38, 70, 10); x.fill(); x.stroke();
            x.fillStyle = "#f3d3a8"; circle(x, px, 533, 21); x.fill(); x.stroke();
            x.fillStyle = RED; x.beginPath(); x.arc(px, 528, 22, Math.PI, 0); x.fill();
          }
          // flag on the stern
          x.strokeStyle = f.gold; x.lineWidth = 5; x.beginPath(); x.moveTo(140, 590); x.lineTo(140, 420); x.stroke();
          x.fillStyle = RED; x.beginPath(); x.moveTo(140, 425); x.lineTo(235, 450); x.lineTo(140, 480); x.closePath(); x.fill(); x.lineWidth = 3; x.stroke();
          // hull
          x.fillStyle = RED; x.strokeStyle = f.gold; x.lineWidth = 4; x.lineJoin = "round";
          x.beginPath(); x.moveTo(110, 560); x.quadraticCurveTo(140, 655, 260, 692); x.quadraticCurveTo(480, 725, 720, 692);
          x.quadraticCurveTo(800, 672, 835, 618); x.quadraticCurveTo(480, 640, 110, 560); x.closePath(); x.fill(); x.stroke();
          x.strokeStyle = f.gold; x.lineWidth = 6; x.beginPath(); x.moveTo(175, 640); x.quadraticCurveTo(480, 692, 790, 645); x.stroke();
          x.lineWidth = 3; x.globalAlpha = .7; x.beginPath(); x.moveTo(200, 665); x.quadraticCurveTo(480, 712, 760, 668); x.stroke(); x.globalAlpha = 1;
          // drum
          x.fillStyle = RED; x.strokeStyle = f.gold; x.lineWidth = 4;
          x.beginPath(); x.ellipse(480, 598, 48, 38, 0, 0, Math.PI * 2); x.fill(); x.stroke();
          x.beginPath(); x.ellipse(480, 598, 30, 22, 0, 0, Math.PI * 2); x.fillStyle = f.gold; x.fill();
          // paddles
          for (let i = 0; i < 7; i++) {
            if (i === 3) continue;
            const px = 225 + i * 85; x.strokeStyle = "#f0d27a"; x.lineWidth = 7; x.lineCap = "round";
            x.beginPath(); x.moveTo(px + 16, 580); x.lineTo(px + 62, 722); x.stroke();
            x.save(); x.translate(px + 62, 722); x.rotate(.3); x.fillStyle = f.gold; x.beginPath(); x.ellipse(0, 12, 11, 24, 0, 0, Math.PI * 2); x.fill(); x.restore();
          }
          // dragon head
          x.fillStyle = "#35a56b"; x.strokeStyle = f.gold; x.lineWidth = 4;
          x.beginPath(); x.moveTo(790, 640); x.quadraticCurveTo(840, 570, 838, 520); x.quadraticCurveTo(842, 485, 878, 482);
          x.quadraticCurveTo(916, 484, 918, 508); x.quadraticCurveTo(918, 526, 890, 532); x.lineTo(906, 546);
          x.quadraticCurveTo(878, 556, 876, 575); x.quadraticCurveTo(872, 605, 866, 650); x.closePath(); x.fill(); x.stroke();
          x.strokeStyle = f.gold; x.lineWidth = 6; x.lineCap = "round";
          x.beginPath(); x.moveTo(850, 488); x.quadraticCurveTo(830, 450, 800, 440); x.moveTo(868, 482); x.quadraticCurveTo(870, 450, 850, 425); x.stroke();
          x.lineWidth = 2; x.beginPath(); x.moveTo(900, 556); x.quadraticCurveTo(880, 590, 905, 610); x.moveTo(890, 560); x.quadraticCurveTo(865, 600, 880, 635); x.stroke();
          x.fillStyle = INK; circle(x, 868, 508, 8); x.fill(); x.fillStyle = f.paper2; circle(x, 870, 508, 4); x.fill();
          x.fillStyle = RED; for (let k = 0; k < 4; k++) { circle(x, 826 + k * 4, 545 + k * 26, 12); x.fill(); x.stroke(); }
          // water
          waves(x, f, 705, 950, 8, 130, 0, f.paper2, .5);
          waves(x, f, 745, 950, 8, 110, 1.6, f.paper2, .8);
          waves(x, f, 790, 950, 7, 150, 3.1, f.paper2, 1);
          return 880;
        }},

      {motif:"門楣下倒掛一束艾草與菖蒲，紅線綁紮，兩旁各有「艾」「蒲」圓章。", phrase:"驅邪納福",
        colors:{paper:"#2a6a3c", paper2:"#10381f", gold:"#f0d070"},
        draw(x, f) {
          // lintel
          x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 4; x.fillRect(110, 200, 780, 46); x.strokeRect(110, 200, 780, 46);
          x.fillStyle = f.gold; for (let i = 0; i < 13; i++) x.fillRect(135 + i * 58, 216, 18, 14);
          x.fillStyle = f.gold; circle(x, 500, 252, 11); x.fill();
          x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(500, 252); x.lineTo(500, 332); x.stroke();
          const devs = [-.74, -.46, -.18, .18, .46, .74], Ls = [330, 380, 410, 410, 380, 330];
          devs.forEach((d, i) => { if (i % 2 === 0) blade(x, f, 500, 335, 500 + Math.sin(d) * Ls[i], 335 + Math.cos(d) * Ls[i], 26, 12 * (d < 0 ? -1 : 1), GRN); });
          devs.forEach((d, i) => { if (i % 2 === 1) sprig(x, f, 500, 335, Math.PI / 2 - d, Ls[i] * .95, 5, 78, AI); });
          [-.06, .06].forEach(d => blade(x, f, 500, 335, 500 + Math.sin(d) * 440, 335 + Math.cos(d) * 440, 26, 0, GRN));
          // tie
          x.fillStyle = RED; x.strokeStyle = f.gold; x.lineWidth = 3; x.beginPath(); x.roundRect(462, 326, 76, 34, 8); x.fill(); x.stroke();
          x.lineWidth = 6; x.strokeStyle = THREAD[0]; x.beginPath(); x.moveTo(500, 358); x.quadraticCurveTo(460, 392, 452, 405); x.moveTo(500, 358); x.quadraticCurveTo(540, 392, 548, 405); x.stroke();
          // medallions
          [[185, 500, "艾"], [815, 500, "蒲"]].forEach(([cx, cy, ch]) => {
            x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 4; circle(x, cx, cy, 78); x.fill(); x.stroke();
            x.setLineDash([7, 7]); x.lineWidth = 2; circle(x, cx, cy, 64); x.stroke(); x.setLineDash([]);
            x.fillStyle = f.gold; x.font = `700 92px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(ch, cx, cy + 4);
          });
          return 880;
        }},

      {motif:"一條彩繩上垂掛三個香包：粽形、方勝形與圓形，各綴五彩流蘇。", phrase:"吉祥如意",
        colors:{paper:"#1a5654", paper2:"#0a2f2e", gold:"#efd079"},
        draw(x, f) {
          const cp = t => [110 * (1 - t) ** 2 + 1000 * t * (1 - t) + 890 * t * t, 230 * (1 - t) ** 2 + 740 * t * (1 - t) + 230 * t * t];
          // sprigs at the ends
          sprig(x, f, 100, 228, .55, 110, 4, 56, AI); sprig(x, f, 900, 228, Math.PI - .55, 110, 4, 56, AI);
          x.strokeStyle = f.gold; x.lineWidth = 8; x.lineCap = "round"; x.beginPath(); x.moveTo(110, 230); x.quadraticCurveTo(500, 370, 890, 230); x.stroke();
          x.strokeStyle = RED; x.lineWidth = 3; x.setLineDash([14, 12]); x.stroke(); x.setLineDash([]);
          const tri = c => { c.beginPath(); c.moveTo(0, -95); c.lineTo(-96, 82); c.lineTo(96, 82); c.closePath(); };
          const dia = c => { c.beginPath(); c.moveTo(0, -150); c.lineTo(112, 0); c.lineTo(0, 150); c.lineTo(-112, 0); c.closePath(); };
          const rnd = c => { circle(c, 0, 0, 92); };
          const bag = (cx, cy, shape, fill, ink, ch, ty, csize, cdy) => {
            const [sx, sy] = cp((cx - 110) / 780);
            x.strokeStyle = RED; x.lineWidth = 4; x.beginPath(); x.moveTo(sx, sy); x.lineTo(cx, ty); x.stroke();
            x.save(); x.translate(cx, cy); x.lineJoin = "round"; shape(x); x.fillStyle = fill; x.fill(); x.strokeStyle = f.gold; x.lineWidth = 5; x.stroke();
            x.save(); x.scale(.82, .82); shape(x); x.setLineDash([9, 7]); x.lineWidth = 3; x.strokeStyle = ink; x.stroke(); x.setLineDash([]); x.restore();
            x.fillStyle = ink; x.font = `700 ${csize}px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(ch, 0, cdy); x.restore();
          };
          bag(240, 440, tri, RED, f.gold, "吉", 346, 84, 28);
          bag(500, 530, dia, f.gold, "#a3231b", "福", 304, 112, 4);
          bag(760, 470, rnd, "#2f9a62", f.gold, "祥", 376, 90, 4);
          tassel(x, f, 240, 522, 110); tassel(x, f, 500, 680, 110); tassel(x, f, 760, 562, 110);
          [240, 760].forEach(cx => { x.fillStyle = f.gold; circle(x, cx, cx === 240 ? 345 : 378, 7); x.fill(); });
          return 880;
        }},

      {motif:"一串五個粽子用紅繩綁成一束，從上方垂掛，兩側有粽葉相襯。", phrase:"粽享福氣",
        colors:{paper:"#235c3a", paper2:"#0e3320", gold:"#efcf72"},
        draw(x, f) {
          leaf(x, f, 100, 215, .75, 250, 46, GRN2, true); leaf(x, f, 900, 215, Math.PI - .75, 250, 46, GRN2, true);
          leaf(x, f, 105, 470, .45, 180, 34, GRN, true); leaf(x, f, 895, 470, Math.PI - .45, 180, 34, GRN, true);
          x.strokeStyle = RED; x.lineWidth = 8; x.lineCap = "round"; x.beginPath(); x.moveTo(500, 192); x.lineTo(500, 292); x.stroke();
          x.strokeStyle = f.gold; x.lineWidth = 3; x.setLineDash([10, 10]); x.stroke(); x.setLineDash([]);
          const Z = [[262, 570, 100], [738, 570, 100], [500, 503, 108], [388, 623, 118], [612, 623, 118]];
          Z.forEach(([cx, cy, s]) => { x.strokeStyle = THREAD[0]; x.lineWidth = 4; x.beginPath(); x.moveTo(500, 300); x.quadraticCurveTo((500 + cx) / 2, 300, cx, cy - s * .98); x.stroke(); });
          Z.forEach(([cx, cy, s]) => zongzi(x, f, cx, cy, s, 0));
          x.fillStyle = RED; x.strokeStyle = f.gold; x.lineWidth = 3; circle(x, 500, 298, 18); x.fill(); x.stroke();
          x.fillStyle = f.gold; circle(x, 500, 298, 6); x.fill();
          stars(x, f, 11, 40, [90, 560, 300, 940]); stars(x, f, 12, 40, [700, 560, 910, 940]);
          return 880;
        }},

      {motif:"一枝盛開的石榴花，紅花綠葉間掛著石榴果，其中一顆裂開露出紅籽。", phrase:"榴花似錦",
        colors:{paper:"#1e5b46", paper2:"#0b3226", gold:"#f0d27a"},
        draw(x, f) {
          const P = [[905, 290], [690, 262], [520, 430], [130, 670]];
          x.lineCap = "round";
          x.strokeStyle = f.gold; x.lineWidth = 17; x.beginPath(); for (let i = 0; i <= 40; i++) { const [a, b] = pt(P, i / 40); i ? x.lineTo(a, b) : x.moveTo(a, b); } x.stroke();
          x.strokeStyle = "#7a4b2a"; x.lineWidth = 10; x.stroke();
          // leaves
          for (let i = 1; i < 14; i++) { const [a, b] = pt(P, i / 14), s = i % 2 ? -1 : 1; leaf(x, f, a, b, s * 1.2 + (i % 3) * .1 - .1, 78, 20, i % 3 ? GRN : "#3f9a62", true); }
          const flower = (cx, cy, r, rot) => {
            x.save(); x.translate(cx, cy); x.rotate(rot);
            for (let k = 0; k < 6; k++) { x.save(); x.rotate(k * Math.PI / 3); x.fillStyle = k % 2 ? "#ee5a3c" : "#e04a30"; x.strokeStyle = f.gold; x.lineWidth = 2.5; x.beginPath(); x.ellipse(r * .55, 0, r * .55, r * .38, 0, 0, Math.PI * 2); x.fill(); x.stroke(); x.restore(); }
            x.fillStyle = "#a82a1e"; circle(x, 0, 0, r * .3); x.fill(); x.strokeStyle = f.gold; x.lineWidth = 2; x.stroke();
            x.fillStyle = f.gold; for (let k = 0; k < 8; k++) { circle(x, Math.cos(k * .785) * r * .16, Math.sin(k * .785) * r * .16, 4); x.fill(); }
            x.restore();
          };
          const fruit = (cx, cy, r, split) => {
            x.save(); x.translate(cx, cy);
            const g = x.createRadialGradient(-r * .3, -r * .3, r * .1, 0, 0, r); g.addColorStop(0, "#f7b24a"); g.addColorStop(1, "#d9452e");
            x.fillStyle = g; x.strokeStyle = f.gold; x.lineWidth = 3.5; circle(x, 0, 0, r); x.fill(); x.stroke();
            x.fillStyle = "#c8372d"; x.beginPath(); for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * .38; x.moveTo(Math.cos(a) * r * .55, -r * .92); x.lineTo(Math.cos(a) * r * .5, -r * 1.22); x.lineTo(Math.cos(a) * r * .5 + 12, -r * .92); } x.fill(); x.stroke();
            if (split) {
              x.fillStyle = "#f5deb0"; x.beginPath(); x.ellipse(0, r * .2, r * .72, r * .62, 0, 0, Math.PI * 2); x.fill(); x.stroke();
              x.fillStyle = "#c01a3a"; for (let k = 0; k < 19; k++) { const a = k * 2.4, d = (k % 3) * r * .17 + r * .12; circle(x, Math.cos(a) * d, r * .2 + Math.sin(a) * d * .85, 9); x.fill(); }
            }
            x.restore();
          };
          let p;
          p = pt(P, .3); x.strokeStyle = "#7a4b2a"; x.lineWidth = 6; x.beginPath(); x.moveTo(p[0], p[1]); x.lineTo(p[0] + 4, p[1] + 60); x.stroke(); fruit(p[0] + 4, p[1] + 118, 64, false);
          p = pt(P, .62); x.beginPath(); x.moveTo(p[0], p[1]); x.lineTo(p[0] - 6, p[1] + 66); x.stroke(); fruit(p[0] - 6, p[1] + 132, 72, true);
          p = pt(P, .12); flower(p[0] - 30, p[1] + 5, 56, .3);
          p = pt(P, .46); flower(p[0] + 10, p[1] - 50, 60, 1);
          p = pt(P, .86); flower(p[0] - 20, p[1] - 58, 54, 2);
          return 880;
        }},

      {motif:"正午的金日放出光芒，日中是「午」字；左有午時水，右有立起來的雞蛋。", phrase:"午時吉祥",
        colors:{paper:"#175a5a", paper2:"#082f33", gold:"#f2d37c"},
        draw(x, f) {
          cloud(x, f, 175, 260, .7, f.paper2); cloud(x, f, 830, 255, .7, f.paper2);
          x.fillStyle = f.gold; x.strokeStyle = f.gold;
          for (let k = 0; k < 24; k++) { const a = k * Math.PI / 12, r1 = 150, r2 = k % 2 ? 205 : 232; x.beginPath(); x.moveTo(500 + Math.cos(a - .09) * r1, 410 + Math.sin(a - .09) * r1); x.lineTo(500 + Math.cos(a) * r2, 410 + Math.sin(a) * r2); x.lineTo(500 + Math.cos(a + .09) * r1, 410 + Math.sin(a + .09) * r1); x.closePath(); x.fill(); }
          x.globalAlpha = 1; circle(x, 500, 410, 145); x.fill();
          x.strokeStyle = f.paper2; x.lineWidth = 4; circle(x, 500, 410, 128); x.stroke();
          x.fillStyle = f.paper2; x.font = `700 190px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("午", 500, 420);
          // bowl of 午時水
          x.save(); x.translate(250, 700);
          x.fillStyle = "#e9f6f2"; x.strokeStyle = f.gold; x.lineWidth = 4;
          x.beginPath(); x.ellipse(0, 0, 110, 30, 0, 0, Math.PI * 2); x.fill(); x.stroke();
          x.fillStyle = "#6fc3c0"; x.beginPath(); x.ellipse(0, 4, 94, 21, 0, 0, Math.PI * 2); x.fill();
          x.strokeStyle = INK; x.lineWidth = 2.5; x.beginPath(); x.ellipse(0, 4, 60, 12, 0, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.ellipse(0, 4, 28, 5, 0, 0, Math.PI * 2); x.stroke();
          x.fillStyle = RED; x.strokeStyle = f.gold; x.lineWidth = 4;
          x.beginPath(); x.moveTo(-110, 0); x.quadraticCurveTo(-95, 100, -40, 108); x.lineTo(40, 108); x.quadraticCurveTo(95, 100, 110, 0); x.quadraticCurveTo(0, 36, -110, 0); x.closePath(); x.fill(); x.stroke();
          x.fillStyle = f.gold; x.fillRect(-44, 106, 88, 14); x.restore();
          // standing egg
          x.save(); x.translate(750, 700);
          x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 4; x.beginPath(); x.ellipse(0, 76, 82, 20, 0, 0, Math.PI * 2); x.fill(); x.stroke();
          const g = x.createRadialGradient(-16, -30, 6, 0, 0, 70); g.addColorStop(0, "#fffaf0"); g.addColorStop(1, "#ecd2a6");
          x.fillStyle = g; x.beginPath(); x.moveTo(0, -78); x.bezierCurveTo(50, -78, 62, -6, 46, 34); x.bezierCurveTo(34, 74, -34, 74, -46, 34); x.bezierCurveTo(-62, -6, -50, -78, 0, -78); x.closePath(); x.fill(); x.stroke();
          x.restore();
          x.strokeStyle = f.gold; x.lineWidth = 3; for (const k of [-1, 1]) { x.beginPath(); x.moveTo(750 + k * 100, 640); x.lineTo(750 + k * 130, 625); x.moveTo(750 + k * 108, 685); x.lineTo(750 + k * 140, 690); x.stroke(); }
          return 880;
        }},

      {motif:"圓形五彩絲線環層層纏繞，中心是「康」字，下垂五彩流蘇，兩旁有艾與菖蒲。", phrase:"福壽綿長",
        colors:{paper:"#1b5a40", paper2:"#0a3322", gold:"#f1d078"},
        draw(x, f) {
          const cx = 500, cy = 495;
          [[130, 880, 205, 560, 1], [175, 905, 262, 600, -1], [150, 700, 100, 470, 1]].forEach(([bx, by, tx, ty, d], i) => { blade(x, f, bx, by, tx, ty, 17, 14 * d, i === 2 ? GRN2 : GRN); blade(x, f, 1000 - bx, by, 1000 - tx, ty, 17, -14 * d, i === 2 ? GRN2 : GRN); });
          sprig(x, f, 120, 850, -1.2, 190, 5, 66, AI); sprig(x, f, 880, 850, Math.PI + 1.2, 190, 5, 66, AI);
          const radii = [236, 216, 196, 176, 156];
          radii.forEach((r, i) => {
            x.strokeStyle = f.paper2; x.lineWidth = 22; circle(x, cx, cy, r); x.stroke();
            x.strokeStyle = THREAD[i]; x.lineWidth = 16; circle(x, cx, cy, r); x.stroke();
            x.strokeStyle = "rgba(0,0,0,.35)"; x.lineWidth = 2;
            for (let a = 0; a < 6.28; a += .045 * 200 / r) { x.beginPath(); x.moveTo(cx + Math.cos(a) * (r - 8), cy + Math.sin(a) * (r - 8)); x.lineTo(cx + Math.cos(a + .1) * (r + 8), cy + Math.sin(a + .1) * (r + 8)); x.stroke(); }
          });
          x.fillStyle = f.paper2; x.strokeStyle = f.gold; x.lineWidth = 4; circle(x, cx, cy, 138); x.fill(); x.stroke();
          x.setLineDash([8, 8]); x.lineWidth = 2; circle(x, cx, cy, 122); x.stroke(); x.setLineDash([]);
          x.fillStyle = f.gold; x.font = `700 170px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("康", cx, cy + 8);
          [[0, -1], [1, 0], [-1, 0]].forEach(([dx, dy]) => { const kx = cx + dx * 236, ky = cy + dy * 236; x.save(); x.translate(kx, ky); x.rotate(Math.PI / 4); x.fillStyle = RED; x.strokeStyle = f.gold; x.lineWidth = 3.5; x.fillRect(-20, -20, 40, 40); x.strokeRect(-20, -20, 40, 40); x.restore(); });
          x.save(); x.translate(cx, cy + 236); x.rotate(Math.PI / 4); x.fillStyle = RED; x.strokeStyle = f.gold; x.lineWidth = 3.5; x.fillRect(-20, -20, 40, 40); x.strokeRect(-20, -20, 40, 40); x.restore();
          tassel(x, f, cx, cy + 250, 70);
          return 880;
        }},

      {motif:"端午夜的新月照著遠山與江水，兩岸菖蒲與艾草隨風搖曳。", phrase:"平安順遂",
        colors:{paper:"#124d56", paper2:"#062b33", gold:"#efd27c"},
        draw(x, f) {
          stars(x, f, 5, 60, [90, 195, 910, 520]);
          const g = x.createRadialGradient(500, 400, 100, 500, 400, 260); g.addColorStop(0, "rgba(240,210,120,.35)"); g.addColorStop(1, "rgba(240,210,120,0)");
          x.fillStyle = g; circle(x, 500, 400, 260); x.fill();
          x.save(); x.beginPath(); x.rect(0, 0, W, H); x.arc(548, 372, 118, 0, Math.PI * 2); x.clip("evenodd");
          x.fillStyle = f.gold; circle(x, 500, 400, 140); x.fill(); x.restore();
          mountains(x, f, 780, [
            {c:"rgba(6,43,51,.55)", p:[[200,660],[360,600],[520,670],[700,590],[900,650]], k:30},
            {c:"rgba(6,43,51,.8)", p:[[170,720],[400,680],[610,725],[800,685],[920,715]], k:20},
          ]);
          x.fillStyle = f.paper2; x.fillRect(60, 770, 880, 180);
          x.strokeStyle = f.gold; x.lineWidth = 3; x.globalAlpha = .55; x.beginPath(); x.moveTo(60, 770); x.lineTo(940, 770); x.stroke();
          x.lineWidth = 2.5; x.globalAlpha = .45; x.lineCap = "round";
          for (let i = 0; i < 7; i++) { const y = 800 + i * 20, off = (i % 2) * 18; for (const [a, b] of [[95, 255], [745, 905]]) { x.beginPath(); x.moveTo(a + off, y); x.quadraticCurveTo(a + off + 20, y - 8, a + off + 40, y); x.quadraticCurveTo(a + off + 60, y + 8, a + off + 80, y); x.stroke(); } }
          x.globalAlpha = 1;
          [[1, 150], [-1, 150]].forEach(([s, bx0]) => {
            const bx = s > 0 ? bx0 : 1000 - bx0;
            [[-70, 640, 8], [-20, 600, -10], [30, 660, 12], [75, 710, -8], [-110, 700, 10]].forEach(([dx, ty, bd], i) => blade(x, f, bx + dx * .3 * s, 935, bx + dx * s, ty, 15, bd * s, i % 2 ? GRN2 : GRN));
            sprig(x, f, bx + 5 * s, 935, s > 0 ? -1.15 : Math.PI + 1.15, 190, 5, 62, AI);
          });
          return 870;
        }},
    ],
  });
})();
