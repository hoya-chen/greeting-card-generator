/* 元旦 (newyear). Owner of this file: the 元旦 designer. Add designs and messages here only. */
(() => {
  const sparkle=(x,cx,cy,r,col)=>{x.save();x.fillStyle=col;x.beginPath();
    for(let i=0;i<8;i++){const a=-Math.PI/2+i*Math.PI/4,rr=i%2?r*.28:r;x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr)}x.closePath();x.fill();x.restore()};
  // a richer firework: spokes, an outer ring of dots, a bright core
  const fw=(x,f,cx,cy,r,n,col)=>{burst(x,f,cx,cy,r,n,col);x.save();x.fillStyle=col;x.globalAlpha=.7;
    for(let i=0;i<n;i++){const a=(i+.5)*2*Math.PI/n;circle(x,cx+Math.cos(a)*r*.62,cy+Math.sin(a)*r*.62,3);x.fill()}
    x.globalAlpha=1;circle(x,cx,cy,7);x.fill();x.restore()};
  const leaf=(x,cx,cy,len,w,ang,col,line)=>{x.save();x.translate(cx,cy);x.rotate(ang);x.fillStyle=col;x.strokeStyle=line;x.lineWidth=3;
    x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(w,-len*.5,0,-len);x.quadraticCurveTo(-w,-len*.5,0,0);x.closePath();x.fill();x.stroke();
    x.globalAlpha=.6;x.lineWidth=2;x.beginPath();x.moveTo(0,-4);x.lineTo(0,-len*.85);x.stroke();x.restore()};

  // 3 台北101 and fireworks
  const tower=(x,f)=>{
    stars(x,f,31,60,[70,190,930,760]);
    fw(x,f,215,330,115,18,f.gold);fw(x,f,790,300,105,16,"#ffd9a6");fw(x,f,235,610,70,12,"#ffd9a6");fw(x,f,780,590,80,14,f.gold);
    sparkle(x,330,230,22,INK);sparkle(x,690,230,18,f.gold);
    const cx=500,sh=54,y0=700;
    x.save();x.lineCap="round";x.strokeStyle=f.gold;x.lineWidth=2;x.globalAlpha=.4;x.setLineDash([2,11]);
    for(const s of [-1,1]){x.beginPath();x.moveTo(cx+s*70,300);x.lineTo(cx+s*95,y0);x.stroke()}x.restore();
    x.fillStyle=f.paper2;x.strokeStyle=f.gold;x.lineWidth=3;
    // podium
    x.beginPath();x.moveTo(cx-62,y0);x.lineTo(cx+62,y0);x.lineTo(cx+110,y0+60);x.lineTo(cx-110,y0+60);x.closePath();x.fill();x.stroke();
    // eight flared sections
    for(let i=0;i<8;i++){const yb=y0-i*sh,yt=yb-sh;
      x.fillStyle=i%2?f.paper2:"#5a1510";x.beginPath();x.moveTo(cx-38,yb);x.lineTo(cx+38,yb);x.lineTo(cx+52,yt);x.lineTo(cx-52,yt);x.closePath();x.fill();x.stroke();
      x.save();x.globalAlpha=.5;x.lineWidth=2;x.beginPath();x.moveTo(cx-45,yb-sh/2);x.lineTo(cx+45,yb-sh/2);x.moveTo(cx,yb);x.lineTo(cx,yt);x.stroke();x.restore()}
    const yt=y0-8*sh;
    x.fillStyle=f.paper2;x.beginPath();x.moveTo(cx-48,yt);x.lineTo(cx+48,yt);x.lineTo(cx+30,yt-34);x.lineTo(cx-30,yt-34);x.closePath();x.fill();x.stroke();
    x.beginPath();x.moveTo(cx-30,yt-34);x.lineTo(cx+30,yt-34);x.lineTo(cx+14,yt-66);x.lineTo(cx-14,yt-66);x.closePath();x.fill();x.stroke();
    x.beginPath();x.moveTo(cx,yt-66);x.lineTo(cx,196);x.stroke();
    // golden waterfall of sparks along the tower
    x.save();x.strokeStyle=f.gold;x.lineWidth=3;x.lineCap="round";const r=rand(9);
    for(let i=0;i<14;i++){const sy=300+r()*340,s=i%2?1:-1,sx=cx+s*(60+r()*40);x.globalAlpha=.35+r()*.4;x.beginPath();x.moveTo(sx,sy);x.lineTo(sx+s*6,sy+40+r()*60);x.stroke()}
    x.restore();
    // city skyline
    x.fillStyle=f.paper2;x.strokeStyle=f.gold;x.lineWidth=2;
    const r2=rand(4);let px=80;while(px<880){const w=Math.min(34+r2()*36,920-px),h=18+r2()*38;x.fillRect(px,806-h,w,h);x.strokeRect(px,806-h,w,h);px+=w+4}
    x.fillRect(80,792,840,16);
    return 880;
  };

  // 4 tear-off calendar page
  const calendar=(x,f)=>{
    stars(x,f,41,50,[70,190,930,800]);
    sparkle(x,200,330,30,f.gold);sparkle(x,810,300,24,INK);sparkle(x,850,640,34,f.gold);sparkle(x,170,650,22,INK);
    x.save();
    x.fillStyle=f.paper2;x.globalAlpha=.9;x.fillRect(312,262,396,552);x.globalAlpha=.6;x.fillRect(322,276,376,552);x.globalAlpha=1;
    x.fillStyle=INK;x.fillRect(290,230,420,530);x.strokeStyle=f.gold;x.lineWidth=5;x.strokeRect(290,230,420,530);
    x.fillStyle=f.paper;x.fillRect(290,230,420,120);x.strokeRect(290,230,420,120);
    x.fillStyle=INK;x.font=`700 54px ${DISP}`;x.textAlign="center";x.textBaseline="middle";x.fillText(`${year}年`,500,310);
    for(const rx of [390,610]){x.fillStyle=f.gold;circle(x,rx,230,17);x.fill();x.strokeStyle=f.paper2;x.lineWidth=5;circle(x,rx,230,17);x.stroke()}
    x.fillStyle=f.gold;x.font=`700 38px ${DISP}`;x.fillText("一月",500,257);
    x.fillStyle=f.paper;x.font=`700 330px ${DISP}`;x.fillText("1",500,525);
    x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.moveTo(340,655);x.lineTo(660,655);x.stroke();
    x.fillStyle=f.paper2;x.font=`700 70px ${DISP}`;x.fillText("元旦",500,708);
    x.restore();
    return 885;
  };

  // 5 sunrise over a mountain range
  const mountain=(x,f)=>{
    stars(x,f,52,40,[70,190,930,420]);
    x.save();x.strokeStyle=f.gold;x.lineWidth=4;x.lineCap="round";x.globalAlpha=.6;
    for(let i=0;i<19;i++){const a=Math.PI+i*Math.PI/18;x.beginPath();x.moveTo(500+Math.cos(a)*185,470+Math.sin(a)*185);x.lineTo(500+Math.cos(a)*(i%2?240:270),470+Math.sin(a)*(i%2?240:270));x.stroke()}
    x.restore();
    const g=x.createRadialGradient(500,450,10,500,450,170);g.addColorStop(0,"#fff6cf");g.addColorStop(1,f.gold);x.fillStyle=g;circle(x,500,470,165);x.fill();
    mountains(x,f,960,[{c:"#9b2b16",k:34,p:[[230,650],[500,500],[770,650],[940,600]]}]);
    cloud(x,f,250,640,1.0,f.paper);cloud(x,f,790,690,.9,f.paper);
    mountains(x,f,960,[{c:"#6d1b0e",k:30,p:[[210,730],[430,660],[650,740],[870,670],[940,700]]}]);
    cloud(x,f,640,730,.8,f.paper);cloud(x,f,300,760,.8,f.paper);
    mountains(x,f,960,[{c:f.paper2,k:26,p:[[180,830],[400,785],[620,815],[860,780],[940,800]]}]);
    return 890;
  };

  // 6 bronze bell
  const bell=(x,f)=>{
    stars(x,f,63,50,[70,190,930,800]);
    x.save();x.strokeStyle=f.gold;x.lineWidth=4;x.lineCap="round";
    [[232,.6],[272,.45],[312,.3]].forEach(([r,a])=>{x.globalAlpha=a;x.beginPath();x.arc(500,520,r,Math.PI*.8,Math.PI*1.2);x.stroke();x.beginPath();x.arc(500,520,r,-Math.PI*.2,Math.PI*.2);x.stroke()});
    x.restore();
    x.fillStyle=f.gold;x.fillRect(250,196,500,26);x.fillRect(250,196,22,200);x.fillRect(728,196,22,200);
    x.fillStyle=f.paper2;x.fillRect(486,222,28,50);x.strokeStyle=f.gold;x.lineWidth=3;x.strokeRect(486,222,28,50);
    const g=x.createLinearGradient(330,0,670,0);g.addColorStop(0,"#b98a2e");g.addColorStop(.35,"#fff0b8");g.addColorStop(.6,f.gold);g.addColorStop(1,"#a97a24");
    x.fillStyle=g;x.beginPath();x.moveTo(455,300);x.quadraticCurveTo(500,258,545,300);x.bezierCurveTo(550,380,590,470,665,610);
    x.lineTo(672,632);x.lineTo(328,632);x.lineTo(335,610);x.bezierCurveTo(410,470,450,380,455,300);x.closePath();x.fill();
    x.strokeStyle=f.paper2;x.lineWidth=3;x.stroke();
    x.fillStyle=f.paper2;x.fillRect(338,590,324,16);x.fillRect(380,350,240,10);
    x.fillStyle=f.paper2;circle(x,500,690,30);x.fill();x.strokeStyle=f.gold;x.lineWidth=3;x.stroke();
    x.fillStyle=f.paper2;x.font=`700 150px ${DISP}`;x.textAlign="center";x.textBaseline="middle";x.fillText("福",500,478);
    sparkle(x,180,330,28,INK);sparkle(x,830,340,24,f.gold);sparkle(x,160,640,22,f.gold);sparkle(x,850,650,30,INK);
    return 885;
  };

  // 7 champagne flutes
  const champagne=(x,f)=>{
    const r=rand(71);
    stars(x,f,72,40,[70,190,930,700]);
    for(let i=0;i<46;i++){const px=90+r()*820,py=200+r()*540;if(Math.abs(px-500)<150&&py<420)continue;
      x.save();x.translate(px,py);x.rotate(r()*3);x.fillStyle=i%3?f.gold:(i%3===0?"#ffd9a6":INK);x.globalAlpha=.8;x.fillRect(-9,-4,18,8);x.restore()}
    const glass=(bx,tilt)=>{x.save();x.translate(bx,745);x.rotate(tilt);
      x.fillStyle="rgba(255,243,220,.16)";x.strokeStyle=INK;x.lineWidth=4;
      x.beginPath();x.moveTo(-44,-470);x.bezierCurveTo(-44,-300,-12,-230,-7,-175);x.lineTo(7,-175);x.bezierCurveTo(12,-230,44,-300,44,-470);x.closePath();x.fill();x.stroke();
      const g=x.createLinearGradient(0,-420,0,-175);g.addColorStop(0,"#ffe9a6");g.addColorStop(1,f.gold);x.fillStyle=g;
      x.beginPath();x.moveTo(-42,-410);x.bezierCurveTo(-41,-300,-12,-232,-7,-176);x.lineTo(7,-176);x.bezierCurveTo(12,-232,41,-300,42,-410);x.closePath();x.fill();
      x.strokeStyle=INK;x.beginPath();x.moveTo(0,-175);x.lineTo(0,-14);x.stroke();
      x.beginPath();x.ellipse(0,-10,52,13,0,0,Math.PI*2);x.fillStyle="rgba(255,243,220,.3)";x.fill();x.stroke();
      x.fillStyle=INK;x.globalAlpha=.8;[[-10,-300,6],[12,-340,5],[-18,-370,4],[4,-260,4],[18,-300,3]].forEach(([a,b,c])=>{circle(x,a,b,c);x.fill()});
      x.restore()};
    glass(360,.21);glass(640,-.21);
    fw(x,f,500,250,95,14,f.gold);sparkle(x,500,250,40,INK);
    return 885;
  };

  // 8 flag raising
  const flag=(x,f)=>{
    stars(x,f,83,45,[70,190,930,500]);
    x.save();x.strokeStyle=f.gold;x.lineWidth=3;x.globalAlpha=.4;
    for(let i=0;i<24;i++){const a=i*Math.PI/12;x.beginPath();x.moveTo(505+Math.cos(a)*300,420+Math.sin(a)*240);x.lineTo(505+Math.cos(a)*400,420+Math.sin(a)*330);x.stroke()}x.restore();
    const FX=252,FY=250;
    const mp=(u,v)=>[FX+u,FY+v+Math.sin(u/72*Math.PI*.9)*13*(u/500)+u*.02];
    const poly=(pts,col,line)=>{x.beginPath();const n=pts.length;
      for(let i=0;i<n;i++){const a=pts[i],b=pts[(i+1)%n],steps=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/12));
        for(let s=0;s<steps;s++){const t=s/steps,p=mp(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t);if(i===0&&s===0)x.moveTo(p[0],p[1]);else x.lineTo(p[0],p[1])}}
      x.closePath();x.fillStyle=col;x.fill();if(line){x.strokeStyle=line;x.lineWidth=4;x.stroke()}};
    const disc=(cu,cv,rr,col)=>poly(Array.from({length:40},(_,i)=>[cu+Math.cos(i/40*Math.PI*2)*rr,cv+Math.sin(i/40*Math.PI*2)*rr]),col);
    x.save();
    poly([[0,0],[510,0],[510,340],[0,340]],"#e0261c",f.gold);
    poly([[0,0],[255,0],[255,170],[0,170]],"#1f3f94");
    const cu=127,cv=85;
    for(let i=0;i<12;i++){const a=i*Math.PI/6,b=.13;poly([[cu+Math.cos(a-b)*34,cv+Math.sin(a-b)*34],[cu+Math.cos(a)*68,cv+Math.sin(a)*68],[cu+Math.cos(a+b)*34,cv+Math.sin(a+b)*34]],"#fff");}
    disc(cu,cv,34,"#fff");disc(cu,cv,29,"#1f3f94");disc(cu,cv,25,"#fff");
    x.restore();
    // pole
    x.fillStyle=f.gold;x.fillRect(230,235,14,665);x.fillRect(214,892,46,18);circle(x,237,226,15);x.fill();
    x.strokeStyle=f.paper2;x.lineWidth=2;x.strokeRect(230,235,14,665);
    cloud(x,f,760,720,.85,f.paper);cloud(x,f,160,720,.7,f.paper);
    return 885;
  };

  // 9 sapling in the sun
  const sapling=(x,f)=>{
    stars(x,f,94,45,[70,190,930,760]);
    x.save();x.strokeStyle=f.gold;x.lineWidth=4;x.lineCap="round";x.globalAlpha=.6;
    for(let i=0;i<28;i++){const a=i*Math.PI*2/28;x.beginPath();x.moveTo(500+Math.cos(a)*225,450+Math.sin(a)*225);x.lineTo(500+Math.cos(a)*(i%2?255:290),450+Math.sin(a)*(i%2?255:290));x.stroke()}x.restore();
    const g=x.createRadialGradient(470,400,10,500,450,210);g.addColorStop(0,"#fff0c2");g.addColorStop(1,f.gold);x.fillStyle=g;circle(x,500,450,205);x.fill();
    x.fillStyle=f.paper;x.font=`700 230px ${DISP}`;x.textAlign="center";x.textBaseline="middle";x.fillText("新",500,372);
    // soil and sprout
    x.fillStyle=f.paper2;x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.ellipse(500,770,200,38,0,Math.PI,Math.PI*2);x.closePath();x.fill();x.stroke();
    x.strokeStyle="#2f7a45";x.lineWidth=11;x.lineCap="round";x.beginPath();x.moveTo(500,772);x.quadraticCurveTo(488,700,500,610);x.stroke();
    leaf(x,498,700,100,32,-1.0,"#4c9a58",f.gold);leaf(x,498,675,100,32,1.0,"#58a864",f.gold);
    leaf(x,500,612,150,46,-.55,"#3f8a4d",f.gold);leaf(x,500,612,150,46,.55,"#58a864",f.gold);
    sparkle(x,200,330,26,INK);sparkle(x,810,330,30,f.gold);
    return 885;
  };

  // 10 midnight clock
  const clock=(x,f)=>{
    stars(x,f,105,50,[70,190,930,800]);
    fw(x,f,170,300,75,14,f.gold);fw(x,f,830,290,80,14,"#ffd9a6");fw(x,f,160,680,65,12,"#ffd9a6");fw(x,f,840,680,70,12,f.gold);
    const cx=500,cy=480;
    x.fillStyle=f.paper2;x.strokeStyle=f.gold;x.lineWidth=7;circle(x,cx,cy,272);x.fill();x.stroke();
    x.fillStyle=INK;circle(x,cx,cy,244);x.fill();x.lineWidth=3;circle(x,cx,cy,232);x.stroke();
    x.save();x.strokeStyle=f.paper2;x.lineCap="round";
    for(let i=0;i<60;i++){const a=i*Math.PI/30-Math.PI/2,big=i%5===0;x.lineWidth=big?9:3;const r1=big?188:208;
      x.beginPath();x.moveTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);x.lineTo(cx+Math.cos(a)*222,cy+Math.sin(a)*222);x.stroke()}
    x.restore();
    x.fillStyle=f.paper;x.beginPath();x.moveTo(cx,cy-186);x.lineTo(cx+16,cy-166);x.lineTo(cx,cy-146);x.lineTo(cx-16,cy-166);x.closePath();x.fill();
    x.fillStyle=f.paper;x.font=`700 78px ${DISP}`;x.textAlign="center";x.textBaseline="middle";x.fillText("新年",cx,cy+120);
    x.fillStyle=f.paper2;x.beginPath();x.moveTo(cx-9,cy);x.lineTo(cx-4,cy-120);x.lineTo(cx,cy-128);x.lineTo(cx+4,cy-120);x.lineTo(cx+9,cy);x.closePath();x.fill();
    x.fillStyle="#c0241c";x.beginPath();x.moveTo(cx-6,cy);x.lineTo(cx-2,cy-170);x.lineTo(cx,cy-176);x.lineTo(cx+2,cy-170);x.lineTo(cx+6,cy);x.closePath();x.fill();
    x.fillStyle=f.gold;circle(x,cx,cy,17);x.fill();x.strokeStyle=f.paper2;x.lineWidth=4;x.stroke();
    return 885;
  };

  registerFest({
    id:"newyear", name:"元旦", phrase:"新年新禧",
    paper:"#b0241e", paper2:"#6f120e", gold:"#ecc66e",
    // up to 56 characters each; exactly 20 required
    msgs:[
      "新年快樂！願您在新的一年裡身體健康、平安順遂，天天都有好心情。",
      "元旦迎新，謝謝您過去一年的照顧。祝您新年新氣象，福氣滿滿。",
      "一元復始，萬象更新。祝您身強體健，日子過得舒心自在。",
      "新年新氣象，願您天天笑口常開，闔家平安，萬事順心。",
      "跨年的鐘聲響起，最先想到的就是您。祝您新的一年健康平安。",
      "感謝您一年來的叮嚀與疼愛，新的一年換我多陪陪您。",
      "新年新希望，願您的每一天都有陽光、有笑容、有溫暖。",
      "祝您歲歲平安、年年如意，每一個日子都過得安心自在。",
      "新的一年，願您福如東海、壽比南山，幸福長長久久。",
      "元旦快樂！天氣轉涼，記得多保暖，願您身體硬朗、精神飽滿。",
      "回首這一年，滿滿都是您的關愛。願來年平安喜樂，心想事成。",
      "旭日東昇，萬事亨通。祝您新年一切順心，笑口常開。",
      "新年第一天，向您道聲感恩，願您福壽安康、闔家歡樂。",
      "願新的一年，您睡得安穩、吃得開心，日日平安，事事如意。",
      "日曆翻開新的一頁，願上面寫滿您的快樂與幸福。",
      "迎接新年的第一道曙光，祝您新年大吉、福氣滿滿、平安健康。",
      "新年到，送上最誠摯的祝福：身體健康、心情愉快、闔家平安。",
      "跨年夜的煙火再燦爛，也比不上您的笑容。新年快樂！",
      "願您在新的一年，三餐溫飽、四季平安，與家人共享天倫之樂。",
      "歲月靜好，現世安穩。願新的一年，一切都比去年更好。",
    ],
    // exactly 10 required; each draw(x,f) returns the y (centre) where the phrase is written
    designs:[
      {motif:"跨年煙火在夜空綻放，正中央是金色的新年年份。", draw:LEGACY.newyear},
      {motif:"旭日從海面東昇，金色的新年年份高掛天空。", draw:LEGACY.newyear2},
      {motif:"台北101高塔矗立夜空，四周跨年煙火齊放、金光如瀑。", phrase:"節節高昇", colors:{paper:"#7a1511",paper2:"#430a08",gold:"#f4cf74"}, draw:tower},
      {motif:"一張嶄新的日曆，紅色大字寫著一月一日元旦，並標示當年年份。", phrase:"歲歲平安", colors:{paper:"#b8271f",paper2:"#7a1510",gold:"#f2cd6a"}, draw:calendar},
      {motif:"山巔旭日升起，層層山巒與雲海環繞，象徵元旦迎曙光。", phrase:"旭日東昇", colors:{paper:"#c8401c",paper2:"#7c1d0e",gold:"#ffd77a"}, draw:mountain},
      {motif:"古銅大鐘高懸橫梁，鐘面一個福字，鐘聲化為一圈圈聲波。", phrase:"鐘鳴福至", colors:{paper:"#8c1c16",paper2:"#521009",gold:"#e8c26a"}, draw:bell},
      {motif:"兩支香檳杯碰杯慶賀，金色氣泡與彩紙四散飛揚。", phrase:"舉杯同慶", colors:{paper:"#6e1220",paper2:"#3e0a13",gold:"#f0d080"}, draw:champagne},
      {motif:"元旦升旗，旗桿高聳、國旗迎風飄揚，背後光芒萬丈。", phrase:"國泰民安", colors:{paper:"#a3201b",paper2:"#6a100d",gold:"#f6d27a"}, draw:flag},
      {motif:"金色旭日裡一個新字，前方嫩芽破土，象徵萬象更新。", phrase:"萬象更新", colors:{paper:"#a8281a",paper2:"#6c130c",gold:"#efc968"}, draw:sapling},
      {motif:"時鐘的時針與分針同時指向十二點，跨年倒數歸零、煙火四起。", phrase:"一元復始", colors:{paper:"#5f1210",paper2:"#340806",gold:"#f1cb6b"}, draw:clock},
    ],
  });
})();
