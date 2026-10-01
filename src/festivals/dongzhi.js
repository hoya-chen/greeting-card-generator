/* 冬至 (dongzhi). Owner of this file: the 冬至 designer. Add designs and messages here only. */
(() => {
  const mix = (a, b, t) => {
    const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
    const A = p(a), B = p(b);
    return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
  };
  const flame = (x, cx, by, w, h, col) => {
    x.fillStyle = col; x.beginPath(); x.moveTo(cx, by - h);
    x.bezierCurveTo(cx + w, by - h * .45, cx + w * .8, by, cx, by);
    x.bezierCurveTo(cx - w * .8, by, cx - w, by - h * .45, cx, by - h); x.closePath(); x.fill();
  };
  const steam = (x, cx, y0, h, amp, a) => {
    x.save(); x.strokeStyle = INK; x.globalAlpha = a; x.lineWidth = 5; x.lineCap = "round";
    x.beginPath(); x.moveTo(cx, y0);
    x.bezierCurveTo(cx - amp, y0 - h * .3, cx + amp, y0 - h * .6, cx, y0 - h); x.stroke(); x.restore();
  };
  // 梅花 blossom that can be filled (已消) or only outlined (未消)
  const blossom = (x, f, cx, cy, r, filled, num) => {
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + i * 2 * Math.PI / 5;
      circle(x, cx + Math.cos(a) * r * .62, cy + Math.sin(a) * r * .62, r * .5);
      if (filled) { x.fillStyle = "#ffc9cf"; x.fill(); x.strokeStyle = "#c9323c"; x.lineWidth = 3; x.stroke(); }
      else { x.strokeStyle = f.gold; x.lineWidth = 3.5; x.stroke(); }
    }
    x.fillStyle = filled ? "#fff3e0" : f.paper2; circle(x, cx, cy, r * .56); x.fill();
    x.strokeStyle = f.gold; x.lineWidth = 2.5; x.stroke();
    x.fillStyle = filled ? "#9e1d23" : f.gold; x.font = `700 62px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText(num, cx, cy + 3);
  };
  const dumpling = (x, f, cx, cy, rot, s) => {
    x.save(); x.translate(cx, cy); x.rotate(rot);
    x.fillStyle = "#fff6ea"; x.strokeStyle = "#c9a255"; x.lineWidth = 3;
    x.beginPath(); x.moveTo(-s, s * .2);
    x.bezierCurveTo(-s * .95, -s * 1.15, s * .95, -s * 1.15, s, s * .2);
    x.bezierCurveTo(s * .5, s * .55, -s * .5, s * .55, -s, s * .2); x.closePath(); x.fill(); x.stroke();
    x.lineWidth = 2.5;
    for (let i = -2; i <= 2; i++) {
      const px = i * s * .3, py = -s * .82 * (1 - Math.pow(i * .3, 2)) + s * .12;
      x.beginPath(); x.moveTo(px, py); x.lineTo(px + i * 2, py + s * .3); x.stroke();
    }
    x.restore();
  };
  const hillPath = (x, pts, base) => {
    x.beginPath(); x.moveTo(60, base);
    pts.forEach(([px, py], j) => { const pr = j ? pts[j - 1] : [60, base]; x.quadraticCurveTo((pr[0] + px) / 2, Math.min(pr[1], py) - 30, px, py) });
    x.lineTo(940, base); x.closePath();
  };

  registerFest({
    id:"dongzhi", name:"冬至", phrase:"團圓添歲",
    paper:"#9e1d23", paper2:"#64101a", gold:"#efd08a",
    // up to 56 characters each; exactly 20 required
    msgs:[
      "冬至吃湯圓，又長一歲福氣添。天冷記得多穿衣，祝您身體暖、心裡甜。",
      "冬至到，祝您團團圓圓、甜甜蜜蜜，一家人圍爐吃湯圓，平安又溫暖。",
      "冬至大如年，願您冬藏好福氣，來年身體更健康，日子更順心。",
      "冬至一陽生，寒夜漸短、春天不遠。祝您身體硬朗，笑口常開，福氣一年比一年多。",
      "湯圓圓滾滾，日子甜蜜蜜。冬至這天，願您吃得開心、睡得安穩，闔家平安。",
      "天冷了，請記得添衣保暖、按時吃飯。願您冬藏好身體，來年精神更健旺。",
      "冬至大如年，謝謝您一年來的照顧與疼愛，願您福壽安康，永遠有溫暖陪伴。",
      "一碗熱湯圓，一份家的味道。願您心裡暖烘烘，日子甜滋滋，天天都團圓。",
      "冬至吃湯圓，添福又添壽。祝您年年平安順心，歲歲康泰吉祥。",
      "夜最長的日子，願有家人的笑語陪伴您。祝您溫暖安康，事事順心如意。",
      "冬至一陽生，萬象將更新。祝您福氣滿滿，笑容滿面，天天都是好日子。",
      "天時人事日相催，冬至陽生春又來。祝您身強體健，喜氣盈門。",
      "圍爐共話家常，薑母鴨暖身、湯圓暖心。祝您冬日溫暖，闔家歡樂。",
      "冬至到，祝您福壽綿長、平安喜樂、闔家團圓、萬事如意。",
      "數九寒天，願您暖衣、暖食、暖心窩。有您在，家就像春天一樣溫暖。",
      "祭祖敬先人，團圓慰親心。冬至時節，祝您平安康泰，兒孫繞膝。",
      "歲末將至，願您三餐溫飽、笑聲滿屋，健康快樂過好每一天。",
      "感謝您一路的呵護與叮嚀。冬至快樂，願您福澤綿長，歡喜自在。",
      "寒風起，思念更濃。雖不能常伴身邊，仍祝您冬至溫暖、身體安康。",
      "冬至進補、湯圓添歲，願您福祿壽喜樣樣來，一年比一年更精神。",
    ],
    // exactly 10 required; each draw(x,f) returns the y (centre) where the phrase is written
    designs:[
      {motif:"一碗冒著熱氣的紅白湯圓，四周飄著雪花。", draw:LEGACY.dongzhi},
      {motif:"圓形花窗裡一枝紅白梅花，窗內飄著細雪。", draw:LEGACY.dongzhi2},
      {motif:"九九消寒圖：九朵梅花各寫一至九，前四朵已染紅，等待春天。", phrase:"數九迎春",
        colors:{paper:"#a3222a", paper2:"#6a1219", gold:"#f0d28c"},
        draw(x, f) {
          x.fillStyle = f.paper2; x.beginPath(); x.roundRect(150, 208, 700, 600, 36); x.fill();
          x.strokeStyle = f.gold; x.lineWidth = 5; x.stroke();
          x.lineWidth = 2; x.beginPath(); x.roundRect(168, 226, 664, 564, 26); x.stroke();
          const nums = "一二三四五六七八九";
          for (let i = 0; i < 9; i++) blossom(x, f, 300 + (i % 3) * 200, 330 + Math.floor(i / 3) * 190, 76, i < 4, nums[i]);
          return 890;
        }},
      {motif:"冬至一陽生：旭日自雪山後升起，日中一個「陽」字，光芒四射。", phrase:"一陽來復",
        colors:{paper:"#8f1c26", paper2:"#58101a", gold:"#f4d78f"},
        draw(x, f) {
          const cx = 500, cy = 560;
          stars(x, f, 41, 40, [90, 200, 910, 450]);
          x.save(); x.strokeStyle = f.gold; x.lineWidth = 5; x.lineCap = "round";
          for (let i = 0; i < 28; i++) { const a = Math.PI + i * Math.PI / 27, r0 = 190, r1 = i % 2 ? 250 : 300;
            x.globalAlpha = i % 2 ? .6 : .9; x.beginPath(); x.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); x.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); x.stroke() }
          x.restore();
          const g = x.createRadialGradient(cx, cy, 20, cx, cy, 170); g.addColorStop(0, "#fff3c4"); g.addColorStop(1, f.gold);
          x.fillStyle = g; circle(x, cx, cy, 170); x.fill();
          x.strokeStyle = "#fff3c4"; x.lineWidth = 3; circle(x, cx, cy, 182); x.stroke();
          x.fillStyle = f.paper; x.font = `700 170px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("陽", cx, cy - 25);
          const hills = [[200, 640], [330, 600], [450, 690], [560, 690], [690, 590], [830, 650]];
          x.fillStyle = mix(f.paper, f.paper2, .5); hillPath(x, hills, 760); x.fill();
          x.strokeStyle = f.gold; x.lineWidth = 3; x.globalAlpha = .8; x.beginPath(); x.moveTo(60, 760);
          hills.forEach(([px, py], j) => { const pr = j ? hills[j - 1] : [60, 760]; x.quadraticCurveTo((pr[0] + px) / 2, Math.min(pr[1], py) - 30, px, py) });
          x.lineTo(940, 760); x.stroke(); x.globalAlpha = 1;
          x.fillStyle = f.paper2; x.fillRect(44, 735, 912, 230);
          x.strokeStyle = f.gold; x.lineWidth = 3; x.beginPath(); x.moveTo(44, 735); x.lineTo(956, 735); x.stroke();
          x.fillStyle = INK; x.globalAlpha = .9;
          for (let i = 0; i < 9; i++) { x.beginPath(); x.ellipse(110 + i * 100, 742, 50, 14, 0, Math.PI, 0); x.fill() }
          x.globalAlpha = 1;
          return 880;
        }},
      {motif:"圓盤上圍成一圈的白胖餃子，中央一個大「福」字，熱氣上升。", phrase:"福氣滿滿",
        colors:{paper:"#9a1f27", paper2:"#5f1019", gold:"#f1d58f"},
        draw(x, f) {
          const cx = 500, cy = 540;
          x.fillStyle = "rgba(0,0,0,.25)"; circle(x, cx + 10, cy + 14, 280); x.fill();
          x.fillStyle = "#fbefd9"; circle(x, cx, cy, 272); x.fill();
          x.strokeStyle = f.gold; x.lineWidth = 8; circle(x, cx, cy, 272); x.stroke();
          x.strokeStyle = "#c9a255"; x.lineWidth = 3; circle(x, cx, cy, 246); x.stroke();
          for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; dumpling(x, f, cx + Math.cos(a) * 178, cy + Math.sin(a) * 178, a + Math.PI / 2, 52) }
          x.fillStyle = f.paper; circle(x, cx, cy, 82); x.fill();
          x.strokeStyle = f.gold; x.lineWidth = 4; x.stroke();
          x.fillStyle = f.gold; x.font = `700 100px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("福", cx, cy + 4);
          steam(x, 400, 255, 55, 14, .5); steam(x, 500, 250, 60, -14, .5); steam(x, 600, 255, 55, 14, .5);
          return 895;
        }},
      {motif:"三足香爐青煙裊裊，兩旁紅燭高燒，供桌上祭祖敬先人。", phrase:"慎終追遠",
        colors:{paper:"#8a1a22", paper2:"#4d0c14", gold:"#efd08a"},
        draw(x, f) {
          const cx = 500;
          // incense sticks and smoke
          x.strokeStyle = "#e9c46a"; x.lineWidth = 6; x.lineCap = "round";
          for (const dx of [-36, 0, 36]) { x.beginPath(); x.moveTo(cx + dx, 590); x.lineTo(cx + dx, 480); x.stroke(); x.fillStyle = "#ff6a3a"; circle(x, cx + dx, 478, 6); x.fill() }
          x.strokeStyle = INK; x.lineWidth = 6; x.globalAlpha = .5;
          for (const [dx, s] of [[-36, 1], [0, -1], [36, 1]]) { x.beginPath(); x.moveTo(cx + dx, 470); x.bezierCurveTo(cx + dx + 40 * s, 400, cx + dx - 40 * s, 340, cx + dx + 20 * s, 290); x.bezierCurveTo(cx + dx + 50 * s, 250, cx + dx, 230, cx + dx + 10, 205); x.stroke() }
          x.globalAlpha = 1;
          // censer legs, body, ears
          x.fillStyle = f.gold; for (const dx of [-90, 0, 90]) { x.beginPath(); x.moveTo(cx + dx - 22, 700); x.lineTo(cx + dx + 22, 700); x.lineTo(cx + dx + (dx ? dx / 3 : 0) + 10, 770); x.lineTo(cx + dx + (dx ? dx / 3 : 0) - 10, 770); x.closePath(); x.fill() }
          x.strokeStyle = f.gold; x.lineWidth = 10; x.beginPath(); x.ellipse(cx - 150, 625, 36, 28, 0, Math.PI * .6, Math.PI * 1.9); x.stroke(); x.beginPath(); x.ellipse(cx + 150, 625, 36, 28, 0, Math.PI * 1.1, Math.PI * 2.4); x.stroke();
          x.fillStyle = f.gold; x.beginPath(); x.moveTo(cx - 150, 590); x.lineTo(cx + 150, 590); x.quadraticCurveTo(cx + 140, 710, cx, 718); x.quadraticCurveTo(cx - 140, 710, cx - 150, 590); x.closePath(); x.fill();
          x.fillStyle = mix(f.gold, f.paper2, .35); x.beginPath(); x.ellipse(cx, 590, 150, 24, 0, 0, Math.PI * 2); x.fill();
          x.fillStyle = "#4a2a1a"; x.beginPath(); x.ellipse(cx, 590, 126, 15, 0, 0, Math.PI * 2); x.fill();
          x.fillStyle = f.paper2; x.font = `700 78px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("祖", cx, 660);
          // candles
          for (const sx of [250, 750]) {
            x.fillStyle = f.gold; x.fillRect(sx - 36, 745, 72, 20); x.fillRect(sx - 12, 735, 24, 14);
            x.fillStyle = "#d9332b"; x.fillRect(sx - 24, 540, 48, 200); x.fillStyle = "rgba(255,255,255,.25)"; x.fillRect(sx - 14, 545, 8, 190);
            flame(x, sx, 535, 22, 70, "#ffb347"); flame(x, sx, 530, 11, 38, "#fff3c4");
          }
          // altar table
          x.fillStyle = f.paper2; x.fillRect(44, 770, 912, 200);
          x.strokeStyle = f.gold; x.lineWidth = 4; x.beginPath(); x.moveTo(44, 770); x.lineTo(956, 770); x.stroke();
          x.lineWidth = 2; x.beginPath(); x.moveTo(44, 784); x.lineTo(956, 784); x.stroke();
          return 885;
        }},
      {motif:"熱氣蒸騰的砂鍋，湯面浮著枸杞與薑片，灶下爐火正旺，鍋身寫「暖」字。", phrase:"暖意融融",
        colors:{paper:"#962028", paper2:"#5a1018", gold:"#f2d58c"},
        draw(x, f) {
          const cx = 500;
          [[400, 450, 14], [500, 440, -16], [600, 450, 14]].forEach(([sx, sy, a]) => steam(x, sx, sy, 190, a, .55));
          // body
          x.fillStyle = "#35130f"; x.beginPath(); x.moveTo(270, 500); x.quadraticCurveTo(262, 700, 400, 725); x.lineTo(600, 725); x.quadraticCurveTo(738, 700, 730, 500); x.closePath(); x.fill();
          x.strokeStyle = f.gold; x.lineWidth = 5; x.stroke();
          // handles
          x.lineWidth = 12; x.beginPath(); x.arc(262, 545, 34, Math.PI * .5, Math.PI * 1.5); x.stroke(); x.beginPath(); x.arc(738, 545, 34, Math.PI * 1.5, Math.PI * .5); x.stroke();
          // soup
          x.fillStyle = "#4a2a1a"; x.beginPath(); x.ellipse(cx, 500, 232, 52, 0, 0, Math.PI * 2); x.fill();
          x.fillStyle = "#d98a2b"; x.beginPath(); x.ellipse(cx, 504, 214, 40, 0, 0, Math.PI * 2); x.fill();
          [[420, 495], [470, 515], [560, 498], [610, 512], [520, 488]].forEach(([a, b], i) => { x.fillStyle = i % 2 ? "#d9332b" : "#fbe3a1"; circle(x, a, b, i % 2 ? 11 : 17); x.fill() });
          x.fillStyle = f.gold; x.beginPath(); x.ellipse(cx, 500, 238, 56, 0, Math.PI, Math.PI * 2, true); x.lineWidth = 8; x.strokeStyle = f.gold; x.beginPath(); x.ellipse(cx, 500, 232, 52, 0, 0, Math.PI * 2); x.stroke();
          x.fillStyle = f.gold; x.font = `700 120px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("暖", cx, 620);
          // stove and fire
          x.fillStyle = f.paper2; x.beginPath(); x.moveTo(330, 725); x.lineTo(670, 725); x.lineTo(710, 780); x.lineTo(290, 780); x.closePath(); x.fill();
          x.strokeStyle = f.gold; x.lineWidth = 4; x.stroke();
          [[420, 40, 50], [500, 52, 68], [580, 40, 50]].forEach(([fx, w, h]) => { flame(x, fx, 778, w, h, "#ff8a3c"); flame(x, fx, 778, w * .5, h * .55, "#ffe08a") });
          x.fillStyle = mix(f.paper, f.paper2, .6); x.fillRect(44, 790, 912, 180);
          x.strokeStyle = f.gold; x.lineWidth = 3; x.beginPath(); x.moveTo(44, 790); x.lineTo(956, 790); x.stroke();
          return 880;
        }},
      {motif:"紅白相間的十六顆湯圓圍成一圈，中央圓盤上大書「圓」字。", phrase:"團圓美滿",
        colors:{paper:"#a02129", paper2:"#661119", gold:"#f3d690"},
        draw(x, f) {
          const cx = 500, cy = 520, N = 16;
          x.strokeStyle = f.gold; x.lineWidth = 3; x.globalAlpha = .6; circle(x, cx, cy, 290); x.stroke(); circle(x, cx, cy, 120 + 120); x.stroke(); x.globalAlpha = 1;
          for (let i = 0; i < N; i++) {
            const a = i * 2 * Math.PI / N - Math.PI / 2, bx = cx + Math.cos(a) * 240, by = cy + Math.sin(a) * 240;
            x.fillStyle = i % 2 ? "#f7b6b6" : "#fff6ea"; circle(x, bx, by, 40); x.fill();
            x.strokeStyle = i % 2 ? "#d98a90" : "#d9c3a0"; x.lineWidth = 3; x.stroke();
            x.fillStyle = "rgba(255,255,255,.65)"; circle(x, bx - 13, by - 14, 9); x.fill();
          }
          x.fillStyle = f.paper2; circle(x, cx, cy, 175); x.fill();
          x.strokeStyle = f.gold; x.lineWidth = 6; x.stroke(); x.lineWidth = 2; circle(x, cx, cy, 160); x.stroke();
          for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + Math.PI / 8; x.fillStyle = f.gold; circle(x, cx + Math.cos(a) * 140, cy + Math.sin(a) * 140, 6); x.fill() }
          x.fillStyle = f.gold; x.font = `700 210px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("圓", cx, cy + 8);
          return 890;
        }},
      {motif:"雪夜裡的小屋亮著暖黃燈火，煙囪冒著炊煙，松樹覆雪，明月高掛。", phrase:"闔家安康",
        colors:{paper:"#8c1b25", paper2:"#4f0b15", gold:"#f2d68e"},
        draw(x, f) {
          stars(x, f, 77, 36, [80, 200, 920, 520]);
          x.fillStyle = "rgba(255,240,200,.18)"; circle(x, 740, 300, 100); x.fill(); circle(x, 740, 300, 84); x.fill();
          x.fillStyle = "#fff0c8"; circle(x, 740, 300, 70); x.fill();
          x.fillStyle = "rgba(220,190,140,.45)"; circle(x, 715, 285, 14); x.fill(); circle(x, 765, 322, 10); x.fill(); circle(x, 752, 268, 7); x.fill();
          snow(x, f, 63, 22, [80, 200, 920, 740]);
          // pines
          pine(x, f, 205, 745, 230); pine(x, f, 800, 745, 200);
          // house
          x.fillStyle = f.paper2; x.fillRect(330, 540, 340, 205); x.strokeStyle = f.gold; x.lineWidth = 4; x.strokeRect(330, 540, 340, 205);
          x.fillStyle = f.paper2; x.fillRect(570, 440, 40, 80); x.strokeRect(570, 440, 40, 80);
          steam(x, 590, 430, 110, 16, .5);
          x.fillStyle = "#fff6ea"; x.beginPath(); x.moveTo(300, 560); x.lineTo(500, 430); x.lineTo(700, 560); x.lineTo(670, 575); x.lineTo(500, 462); x.lineTo(330, 575); x.closePath(); x.fill(); x.strokeStyle = f.gold; x.stroke();
          x.fillStyle = f.gold; x.beginPath(); x.moveTo(330, 575); x.lineTo(500, 462); x.lineTo(670, 575); x.lineTo(670, 545); x.lineTo(500, 430); x.lineTo(330, 545); x.closePath(); x.globalAlpha = .0; x.fill(); x.globalAlpha = 1;
          for (const wx of [365, 565]) { x.fillStyle = "#ffcf6a"; x.fillRect(wx, 600, 70, 70); x.strokeStyle = f.paper2; x.lineWidth = 4; x.strokeRect(wx, 600, 70, 70); x.beginPath(); x.moveTo(wx + 35, 600); x.lineTo(wx + 35, 670); x.moveTo(wx, 635); x.lineTo(wx + 70, 635); x.stroke() }
          x.fillStyle = "#d9332b"; x.beginPath(); x.roundRect(466, 610, 68, 135, [34, 34, 0, 0]); x.fill(); x.strokeStyle = f.gold; x.lineWidth = 3; x.stroke();
          // snow ground, then dark earth under the phrase
          x.fillStyle = "#fbefd9"; x.beginPath(); x.moveTo(44, 790); x.quadraticCurveTo(200, 700, 360, 745); x.quadraticCurveTo(500, 770, 640, 745); x.quadraticCurveTo(800, 710, 956, 780); x.lineTo(956, 800); x.lineTo(44, 800); x.closePath(); x.fill();
          x.fillStyle = f.paper2; x.fillRect(44, 800, 912, 170); x.strokeStyle = f.gold; x.lineWidth = 3; x.beginPath(); x.moveTo(44, 800); x.lineTo(956, 800); x.stroke();
          return 885;
        }},
      {motif:"冬、至二字紅燈籠高掛，金色光芒環繞大「大」字，寓意冬至大如年。", phrase:"添福添壽",
        colors:{paper:"#a1232b", paper2:"#6b121b", gold:"#f3d78f"},
        draw(x, f) {
          const cx = 500, cy = 560;
          x.save(); x.strokeStyle = f.gold; x.lineWidth = 5; x.lineCap = "round";
          for (let i = 0; i < 36; i++) { const a = i * Math.PI / 18, r1 = i % 2 ? 235 : 270; x.globalAlpha = i % 2 ? .6 : .9; x.beginPath(); x.moveTo(cx + Math.cos(a) * 185, cy + Math.sin(a) * 185); x.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); x.stroke() }
          x.restore();
          const g = x.createRadialGradient(cx, cy, 20, cx, cy, 170); g.addColorStop(0, "#fff3c4"); g.addColorStop(1, f.gold);
          x.fillStyle = g; circle(x, cx, cy, 165); x.fill(); x.strokeStyle = "#fff3c4"; x.lineWidth = 4; circle(x, cx, cy, 175); x.stroke();
          x.fillStyle = f.paper; x.font = `700 230px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("大", cx, cy + 12);
          lantern(x, f, 215, 190, 335, 120, "冬"); lantern(x, f, 785, 190, 335, 120, "至");
          cloud(x, f, 215, 720, 1, f.paper2); cloud(x, f, 785, 720, 1, f.paper2);
          x.fillStyle = f.paper2; x.fillRect(44, 800, 912, 170); x.strokeStyle = f.gold; x.lineWidth = 3; x.beginPath(); x.moveTo(44, 800); x.lineTo(956, 800); x.stroke();
          return 885;
        }},
    ],
  });
})();
