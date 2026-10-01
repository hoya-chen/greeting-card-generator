/* 父親節 (father). Owner of this file: the 父親節 designer. Add designs and messages here only. */
(() => {
  // fan of pine needles
  const needles = (x, cx, cy, r, ang0, col) => {
    x.save(); x.strokeStyle = col; x.lineWidth = 3.5; x.lineCap = "round";
    for (let k = 0; k < 15; k++) { const a = ang0 + (k - 7) * 0.2; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); x.stroke(); }
    x.restore();
  };
  const cone = (x, cx, cy, s, f) => {
    x.save(); x.translate(cx, cy); x.fillStyle = "#7a4a26"; x.strokeStyle = f.gold; x.lineWidth = 2;
    x.beginPath(); x.ellipse(0, 0, s * .45, s, 0, 0, Math.PI * 2); x.fill(); x.stroke();
    x.strokeStyle = "#4a2810"; x.lineWidth = 2;
    for (let i = -2; i <= 2; i++) { x.beginPath(); x.arc(0, i * s * .35, s * .38, .15 * Math.PI, .85 * Math.PI); x.stroke(); }
    x.restore();
  };

  registerFest({
    id:"father", name:"父親節", phrase:"父愛如山",
    paper:"#8f2a1e", paper2:"#4f150c", gold:"#e9c27a",
    // up to 56 characters each; exactly 20 required
    msgs:[
      "父親節快樂！謝謝您一直是家裡最可靠的依靠，祝您身體健康、萬事順心。",
      "您的付出我們都記在心裡。祝您父親節快樂，少操點心，多享點福。",
      "爸爸節快樂！願您身體硬朗、笑口常開，有空我們陪您喝茶聊天。",
      "八八父親節，爸爸平安，家家好運。祝您天天順心，福壽安康。",
      "父愛如山，穩穩撐起一個家。謝謝您默默的付出，祝您父親節快樂。",
      "恩重如山，愛深似海。這份情我們銘記在心，願您康健自在。",
      "小時候您牽著我的手，現在換我陪您慢慢走。祝您父親節快樂。",
      "謝謝您一路辛苦，為這個家遮風擋雨。往後的日子，換我們為您添福。",
      "願您福如東海、壽比南山，每天吃得香、睡得好、笑得開懷。",
      "松鶴延年，松柏長青。祝福您身體硬朗，精神煥發，日子越過越舒坦。",
      "父親節快樂！今天什麼都不用煩惱，好好休息，讓我們來照顧您。",
      "您的肩膀曾扛起整個家，如今請放下重擔，安心享受清閒與天倫。",
      "不必再為我們操心了，我們都很好。祝您心寬體健，萬事如意。",
      "一杯熱茶，一聲問候。願您平安喜樂，歲月靜好，晚晴更美。",
      "父慈子孝，家和萬事興。感謝您用一輩子教會我們做人的道理。",
      "您說的話我們一直記著，您走過的路我們看在眼裡。謝謝您，爸爸。",
      "爸爸，您辛苦了！祝您父親節快樂，願平安與健康永遠陪伴著您。",
      "歲月在您的額頭留下痕跡，也留給我們滿滿的溫暖。祝您福壽綿長。",
      "春去秋來，感恩有您。願您笑口常開，福祿雙全，闔家平安幸福。",
      "謝謝您給我們一個溫暖的家。祝您父親節快樂，常保安康、天天開心。",
    ],
    // exactly 10 required; each draw(x,f) returns the y (centre) where the phrase is written
    designs:[
      {motif:"旭日從層層山巒後升起，一旁挺立著青松。", draw:LEGACY.father},
      {motif:"一壺熱茶配茶杯，壺上寫著「德」字，上方伸出松枝。", draw:LEGACY.father2},

      // 3. 八八 + 爸
      {motif:"金色圓印中寫著「爸」字，左右各一個大大的「八」，取八八父親節的諧音，下方祥雲相托。",
       phrase:"爸爸安康", colors:{paper:"#a02a1e", paper2:"#5a160d", gold:"#f0cb7c"},
       draw(x,f){
         stars(x,f,31,40,[90,200,910,780]);
         x.fillStyle=f.gold;x.font=`700 290px ${DISP}`;x.textAlign="center";x.textBaseline="middle";
         x.fillText("八",212,470);x.fillText("八",788,470);
         // seal
         x.fillStyle=f.gold;scallop(x,500,470,178,18,12);x.fill();
         x.strokeStyle=f.paper2;x.lineWidth=5;circle(x,500,470,162);x.stroke();
         x.lineWidth=2;circle(x,500,470,148);x.stroke();
         bigChar(x,"爸",500,478,230,f.paper2);
         cloud(x,f,300,730,.95,f.paper2);cloud(x,f,700,730,.95,f.paper2);
         return 880;
       }},

      // 4. big mountain
      {motif:"一座巨大的主峰直入雲霄，峰頂覆著金色積雪，後方有朝陽與遠山，象徵父愛如山。",
       phrase:"恩重如山", colors:{paper:"#8a2a1c", paper2:"#46120a", gold:"#efc878"},
       draw(x,f){
         const g=x.createRadialGradient(660,360,10,660,360,120);g.addColorStop(0,"#fff0c0");g.addColorStop(1,f.gold);
         x.fillStyle=g;circle(x,690,360,105);x.fill();
         // far peaks
         x.fillStyle="#6a1f14";x.strokeStyle=f.gold;x.lineWidth=2.5;
         x.beginPath();x.moveTo(30,960);x.lineTo(30,680);x.quadraticCurveTo(160,560,230,500);x.quadraticCurveTo(330,620,400,700);x.lineTo(400,960);x.closePath();x.fill();x.stroke();
         x.beginPath();x.moveTo(970,960);x.lineTo(970,660);x.quadraticCurveTo(850,520,790,450);x.quadraticCurveTo(700,600,620,700);x.lineTo(620,960);x.closePath();x.fill();x.stroke();
         // main peak
         x.fillStyle=f.paper2;x.beginPath();x.moveTo(110,960);x.quadraticCurveTo(300,700,380,520);x.quadraticCurveTo(450,330,500,250);
         x.quadraticCurveTo(560,340,640,520);x.quadraticCurveTo(720,720,890,960);x.closePath();x.fill();x.lineWidth=4;x.stroke();
         // snow cap
         x.fillStyle=f.gold;x.beginPath();x.moveTo(500,250);x.quadraticCurveTo(450,330,420,430);x.lineTo(455,405);x.lineTo(480,450);x.lineTo(510,400);x.lineTo(545,445);x.lineTo(565,405);x.lineTo(590,440);x.quadraticCurveTo(555,340,500,250);x.closePath();x.fill();
         // ridges
         x.strokeStyle=f.gold;x.globalAlpha=.55;x.lineWidth=2.5;
         x.beginPath();x.moveTo(480,460);x.quadraticCurveTo(430,600,330,760);x.moveTo(520,460);x.quadraticCurveTo(580,600,680,760);x.moveTo(500,470);x.quadraticCurveTo(490,620,470,740);x.stroke();x.globalAlpha=1;
         cloud(x,f,230,590,.8,f.paper2);cloud(x,f,780,640,.8,f.paper2);
         return 880;
       }},

      // 5. pine branch
      {motif:"蒼勁的松枝從左側橫伸而出，松針成簇、掛著松果，背後一輪金色大日，象徵松柏長青。",
       phrase:"松柏長青", colors:{paper:"#7c1f18", paper2:"#431009", gold:"#ebc474"},
       draw(x,f){
         const g=x.createRadialGradient(650,400,10,650,400,200);g.addColorStop(0,"#ffe9aa");g.addColorStop(1,f.gold);
         x.fillStyle=g;circle(x,660,430,190);x.fill();
         // trunk branch
         x.save();x.strokeStyle="#3a1d0e";x.lineCap="round";x.lineWidth=34;
         x.beginPath();x.moveTo(40,300);x.quadraticCurveTo(250,260,360,420);x.quadraticCurveTo(450,540,640,520);x.stroke();
         x.lineWidth=22;x.beginPath();x.moveTo(330,375);x.quadraticCurveTo(300,520,200,610);x.stroke();
         x.lineWidth=16;x.beginPath();x.moveTo(520,520);x.quadraticCurveTo(620,620,800,640);x.stroke();
         x.strokeStyle=f.gold;x.globalAlpha=.4;x.lineWidth=3;x.beginPath();x.moveTo(60,288);x.quadraticCurveTo(250,250,350,405);x.stroke();x.globalAlpha=1;x.restore();
         const gc="#3f8a4d";
         needles(x,170,290,120,-1.2,gc);needles(x,300,340,130,-0.6,gc);needles(x,420,480,125,0.9,gc);needles(x,640,515,120,-0.5,gc);
         needles(x,200,610,115,0.6,gc);needles(x,330,380,110,-2.2,gc);needles(x,780,640,120,0.5,gc);needles(x,600,520,105,1.7,gc);needles(x,90,320,100,-2.4,gc);
         cone(x,430,560,40,f);cone(x,720,590,36,f);
         return 880;
       }},

      // 6. tea tray from above
      {motif:"俯視的木質茶盤，圓肚茶壺與三只茶杯排放其上，旁邊散落幾片茶葉，一起泡茶陪爸爸聊天。",
       phrase:"福壽安康", colors:{paper:"#6a2a1a", paper2:"#3a1509", gold:"#ecc88a"},
       draw(x,f){
         // tray
         x.fillStyle=f.paper2;x.strokeStyle=f.gold;x.lineWidth=5;
         x.beginPath();x.roundRect(120,250,760,520,60);x.fill();x.stroke();
         x.lineWidth=2;x.globalAlpha=.5;x.beginPath();x.roundRect(144,274,712,472,44);x.stroke();
         for(let i=1;i<9;i++){x.beginPath();x.moveTo(150,250+i*58);x.lineTo(850,250+i*58);x.stroke()}x.globalAlpha=1;
         // teapot top view
         x.fillStyle=f.gold;x.strokeStyle="#7a4a1c";x.lineWidth=4;
         x.beginPath();x.moveTo(320,470);x.lineTo(210,430);x.lineTo(205,470);x.lineTo(320,520);x.closePath();x.fill();x.stroke();
         x.lineWidth=22;x.strokeStyle=f.gold;x.beginPath();x.arc(560,505,70,-1.2,1.2);x.stroke();
         x.strokeStyle="#7a4a1c";x.lineWidth=4;circle(x,430,505,125);x.fillStyle=f.gold;x.fill();x.stroke();
         x.fillStyle="#e0b25e";circle(x,430,505,78);x.fill();x.stroke();
         x.fillStyle=f.paper2;circle(x,430,505,16);x.fill();
         // cups
         [[690,360],[760,510],[690,660]].forEach(([cx,cy])=>{x.fillStyle=f.gold;x.strokeStyle="#7a4a1c";x.lineWidth=4;circle(x,cx,cy,52);x.fill();x.stroke();
           x.fillStyle="#b3651e";circle(x,cx,cy,36);x.fill();x.strokeStyle="#7a4a1c";x.lineWidth=2;x.stroke()});
         // tea leaves
         x.fillStyle="#4c8a46";[[250,640,.6],[330,690,-.5],[300,330,-.9]].forEach(([lx,ly,a])=>{x.save();x.translate(lx,ly);x.rotate(a);x.beginPath();x.ellipse(0,0,40,16,0,0,Math.PI*2);x.fill();x.strokeStyle=f.gold;x.lineWidth=2;x.beginPath();x.moveTo(-40,0);x.lineTo(40,0);x.stroke();x.restore()});
         return 890;
       }},

      // 7. lighthouse
      {motif:"夜空的海面上，燈塔射出金色光束，岩石旁一葉帆船平安歸航，象徵爸爸是全家的指引。",
       phrase:"平安順遂", colors:{paper:"#1f3459", paper2:"#0e1a33", gold:"#efcd7e"},
       draw(x,f){
         stars(x,f,77,60,[90,200,910,640]);
         x.fillStyle="#fff0c2";circle(x,200,330,60);x.fill();
         x.fillStyle=f.paper;circle(x,222,318,54);x.fill();
         // beams
         x.save();const bg=x.createLinearGradient(640,420,100,420);bg.addColorStop(0,"rgba(255,230,150,.65)");bg.addColorStop(1,"rgba(255,230,150,0)");
         x.fillStyle=bg;x.beginPath();x.moveTo(650,420);x.lineTo(90,300);x.lineTo(90,560);x.closePath();x.fill();
         const bg2=x.createLinearGradient(670,420,920,420);bg2.addColorStop(0,"rgba(255,230,150,.55)");bg2.addColorStop(1,"rgba(255,230,150,0)");
         x.fillStyle=bg2;x.beginPath();x.moveTo(670,420);x.lineTo(920,330);x.lineTo(920,520);x.closePath();x.fill();x.restore();
         // rock
         x.fillStyle="#2a1f1a";x.strokeStyle=f.gold;x.lineWidth=3;
         x.beginPath();x.moveTo(520,810);x.quadraticCurveTo(560,740,610,720);x.lineTo(710,720);x.quadraticCurveTo(780,750,820,810);x.closePath();x.fill();x.stroke();
         // tower
         x.fillStyle=INK;x.beginPath();x.moveTo(620,720);x.lineTo(700,720);x.lineTo(685,460);x.lineTo(635,460);x.closePath();x.fill();x.stroke();
         x.fillStyle="#c0392b";[[600,560],[540,610]].forEach(([a,b])=>{});
         x.fillStyle="#b23a2a";
         [[630,640,690,640,693,680,627,680],[640,540,680,540,684,580,636,580]].forEach(p=>{x.beginPath();x.moveTo(p[0],p[1]);x.lineTo(p[2],p[3]);x.lineTo(p[4],p[5]);x.lineTo(p[6],p[7]);x.closePath();x.fill()});
         x.fillStyle=f.gold;x.fillRect(626,445,68,16);x.strokeRect(626,445,68,16);
         x.fillStyle="#ffe9a0";x.fillRect(640,400,40,45);x.strokeRect(640,400,40,45);
         x.fillStyle=f.gold;x.beginPath();x.moveTo(630,400);x.lineTo(660,365);x.lineTo(690,400);x.closePath();x.fill();x.stroke();
         // sea
         x.fillStyle=f.paper2;x.fillRect(30,800,940,160);
         x.strokeStyle=f.gold;x.lineWidth=3;x.globalAlpha=.8;
         for(let row=0;row<2;row++)for(let px=20;px<980;px+=90){const yy=810+row*16,off=row*45;if(px+off<280||px+off>740||true){x.beginPath();x.moveTo(px+off,yy);x.quadraticCurveTo(px+off+22,yy-16,px+off+45,yy);x.quadraticCurveTo(px+off+68,yy+14,px+off+90,yy);x.stroke()}}
         x.globalAlpha=1;
         // boat
         x.fillStyle=f.gold;x.beginPath();x.moveTo(190,700);x.lineTo(190,570);x.lineTo(300,690);x.closePath();x.fill();
         x.beginPath();x.moveTo(180,700);x.lineTo(180,610);x.lineTo(120,695);x.closePath();x.fill();
         x.fillStyle="#5a2a12";x.beginPath();x.moveTo(100,715);x.lineTo(330,715);x.quadraticCurveTo(300,770,250,775);x.lineTo(160,775);x.quadraticCurveTo(120,765,100,715);x.closePath();x.fill();x.strokeStyle=f.gold;x.lineWidth=2.5;x.stroke();
         x.strokeStyle=f.gold;x.lineWidth=5;x.beginPath();x.moveTo(185,715);x.lineTo(185,560);x.stroke();
         return 885;
       }},

      // 8. calligraphy scroll
      {motif:"一幅垂掛的書法立軸，寫著大大的「父」字並蓋紅印「愛」，左側筆架上毛筆斜立，右下是硯台。",
       phrase:"德厚流光", colors:{paper:"#6e3b22", paper2:"#3a1c0e", gold:"#efcb8c"},
       draw(x,f){
         // hanger cord
         x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.moveTo(500,205);x.lineTo(380,260);x.moveTo(500,205);x.lineTo(620,260);x.stroke();
         circle(x,500,203,7);x.fillStyle=f.gold;x.fill();
         // scroll
         x.fillStyle=f.paper2;x.fillRect(360,260,280,500);x.strokeStyle=f.gold;x.lineWidth=3;x.strokeRect(360,260,280,500);
         x.fillStyle=INK;x.fillRect(388,300,224,420);x.strokeStyle="#7a4a1c";x.lineWidth=2;x.strokeRect(388,300,224,420);
         // rollers
         x.fillStyle=f.gold;x.fillRect(345,248,310,18);x.fillRect(345,754,310,18);
         x.fillStyle="#7a4a1c";circle(x,345,257,13);x.fill();circle(x,655,257,13);x.fill();circle(x,345,763,13);x.fill();circle(x,655,763,13);x.fill();
         x.fillStyle="#2a140a";x.font=`700 230px ${DISP}`;x.textAlign="center";x.textBaseline="middle";x.fillText("父",500,490);
         x.fillStyle="#b3261e";x.fillRect(555,630,48,48);x.fillStyle=INK;x.font=`700 38px ${DISP}`;x.fillText("愛",579,655);
         // brush stand + brushes
         x.save();x.fillStyle=f.paper2;x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.moveTo(110,740);x.lineTo(280,740);x.lineTo(265,640);x.lineTo(125,640);x.closePath();x.fill();x.stroke();x.restore();
         [[-.35,150],[-.1,190],[.2,170]].forEach(([a,len],i)=>{x.save();x.translate(195+(i-1)*34,650);x.rotate(a);x.fillStyle="#d9a94a";x.fillRect(-7,-len,14,len);x.fillStyle="#2a140a";x.beginPath();x.ellipse(0,-len-20,9,28,0,0,Math.PI*2);x.fill();x.restore()});
         // ink stone
         x.fillStyle="#1a0d06";x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.roundRect(700,660,170,100,16);x.fill();x.stroke();
         x.fillStyle="#000";x.beginPath();x.ellipse(785,700,52,24,0,0,Math.PI*2);x.fill();x.strokeStyle=f.gold;x.lineWidth=2;x.stroke();
         x.fillStyle=f.gold;x.fillRect(715,730,140,10);
         return 890;
       }},

      // 9. big tree
      {motif:"一棵枝葉繁茂的大樹，樹根緊抓土地，樹冠像傘一樣遮蔭，樹梢掛著金色果實，象徵父親護蔭全家。",
       phrase:"福蔭綿長", colors:{paper:"#7a4a24", paper2:"#3f2310", gold:"#f0cd85"},
       draw(x,f){
         stars(x,f,19,30,[90,200,910,420]);
         x.fillStyle=f.gold;circle(x,800,300,55);x.fill();
         // ground
         x.fillStyle=f.paper2;x.beginPath();x.moveTo(30,790);x.quadraticCurveTo(500,730,970,790);x.lineTo(970,960);x.lineTo(30,960);x.closePath();x.fill();
         x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.moveTo(30,790);x.quadraticCurveTo(500,730,970,790);x.stroke();
         // trunk
         x.fillStyle="#4a2a14";x.strokeStyle=f.gold;x.lineWidth=3;
         x.beginPath();x.moveTo(430,780);x.quadraticCurveTo(470,700,465,560);x.lineTo(535,560);x.quadraticCurveTo(530,700,570,780);
         x.quadraticCurveTo(540,760,500,770);x.quadraticCurveTo(460,760,430,780);x.closePath();x.fill();x.stroke();
         x.strokeStyle="#4a2a14";x.lineWidth=14;x.lineCap="round";x.beginPath();x.moveTo(430,780);x.quadraticCurveTo(350,790,300,770);x.moveTo(570,780);x.quadraticCurveTo(650,790,710,770);x.stroke();
         x.strokeStyle="#4a2a14";x.lineWidth=18;x.beginPath();x.moveTo(490,600);x.quadraticCurveTo(400,560,330,470);x.moveTo(510,600);x.quadraticCurveTo(600,560,670,470);x.stroke();
         x.strokeStyle=f.gold;x.globalAlpha=.4;x.lineWidth=2;for(const dx of [-12,12]){x.beginPath();x.moveTo(500+dx,580);x.lineTo(500+dx*1.4,740);x.stroke()}x.globalAlpha=1;
         // canopy
         const blobs=[[500,330,130],[360,400,110],[640,400,110],[260,480,85],[740,480,85],[440,470,105],[560,470,105],[500,420,115]];
         x.fillStyle="#3f7a45";x.strokeStyle=f.gold;x.lineWidth=3;
         blobs.forEach(([cx,cy,r])=>{circle(x,cx,cy,r);x.fill()});
         blobs.forEach(([cx,cy,r])=>{circle(x,cx,cy,r);x.stroke()});
         blobs.forEach(([cx,cy,r])=>{circle(x,cx,cy,r-4);x.fill()});
         x.fillStyle="#4f9356";blobs.slice(0,5).forEach(([cx,cy,r])=>{circle(x,cx-r*.2,cy-r*.25,r*.6);x.fill()});
         x.fillStyle=f.gold;[[430,330],[560,300],[360,430],[650,420],[500,470],[300,500],[710,510],[450,410]].forEach(([cx,cy])=>{circle(x,cx,cy,13);x.fill()});
         return 880;
       }},

      // 10. tie on collar
      {motif:"白襯衫領口繫著藏青底、金色斜紋的領帶，送給爸爸的心意禮物，象徵爸爸穩重可靠。",
       phrase:"萬事如意", colors:{paper:"#223a66", paper2:"#0e1a35", gold:"#ecc977"},
       draw(x,f){
         // gold circle behind
         x.strokeStyle=f.gold;x.lineWidth=3;x.globalAlpha=.5;circle(x,500,500,300);x.stroke();circle(x,500,500,320);x.stroke();x.globalAlpha=1;
         // shirt
         x.fillStyle=INK;x.strokeStyle=f.gold;x.lineWidth=4;
         x.beginPath();x.moveTo(250,330);x.lineTo(390,260);x.lineTo(610,260);x.lineTo(750,330);x.lineTo(780,780);x.lineTo(220,780);x.closePath();x.fill();x.stroke();
         // placket line / buttons
         x.fillStyle="#e4d3b2";x.fillRect(600,640,0,0);
         // collar
         x.fillStyle="#f7ead0";x.strokeStyle="#7a6a4a";x.lineWidth=3;
         x.beginPath();x.moveTo(390,260);x.lineTo(500,330);x.lineTo(430,440);x.lineTo(340,330);x.closePath();x.fill();x.stroke();
         x.beginPath();x.moveTo(610,260);x.lineTo(500,330);x.lineTo(570,440);x.lineTo(660,330);x.closePath();x.fill();x.stroke();
         // tie body
         x.fillStyle=f.paper2;x.strokeStyle=f.gold;x.lineWidth=4;
         x.beginPath();x.moveTo(465,420);x.lineTo(535,420);x.lineTo(580,740);x.lineTo(500,800);x.lineTo(420,740);x.closePath();x.fill();x.stroke();
         x.save();x.beginPath();x.moveTo(465,420);x.lineTo(535,420);x.lineTo(580,740);x.lineTo(500,800);x.lineTo(420,740);x.closePath();x.clip();
         x.strokeStyle=f.gold;x.lineWidth=10;x.globalAlpha=.85;for(let i=-4;i<10;i++){x.beginPath();x.moveTo(380,430+i*56);x.lineTo(620,360+i*56+60);x.stroke()}x.restore();x.globalAlpha=1;
         // knot
         x.fillStyle=f.paper2;x.strokeStyle=f.gold;x.lineWidth=4;
         x.beginPath();x.moveTo(455,340);x.lineTo(545,340);x.lineTo(550,420);x.lineTo(450,420);x.closePath();x.fill();x.stroke();
         // buttons
         x.fillStyle=f.gold;[[330,520],[330,620],[330,720]].forEach(([cx,cy])=>{circle(x,cx,cy,9);x.fill()});
         return 890;
       }},
    ],
  });
})();
