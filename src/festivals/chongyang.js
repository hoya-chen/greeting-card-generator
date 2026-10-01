/* 重陽節 (chongyang). Owner of this file: the 重陽節 designer. Add designs and messages here only. */
(() => {
  const rrect = (x,a,b,w,h,r) => {x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()};
  const leaf = (x,cx,cy,rot,len,wid,col,line) => {x.save();x.translate(cx,cy);x.rotate(rot);x.fillStyle=col;x.strokeStyle=line;x.lineWidth=2;
    x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(wid,-len*.5,0,-len);x.quadraticCurveTo(-wid,-len*.5,0,0);x.fill();x.stroke();
    x.globalAlpha=.5;x.beginPath();x.moveTo(0,-4);x.lineTo(0,-len+8);x.stroke();x.restore()};
  // 茱萸 sprig: stem from (cx,cy) up, leaves and a red berry umbel
  const zhuyu = (x,f,cx,cy,rot,s) => {
    x.save();x.translate(cx,cy);x.rotate(rot);x.scale(s,s);
    x.strokeStyle="#3b2a18";x.lineWidth=5;x.lineCap="round";x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(10,-80,0,-170);x.stroke();
    for(const [yy,a] of [[-40,-1.0],[-40,1.0],[-85,-.9],[-85,.9],[-125,-.7],[-125,.7]]) leaf(x,0,yy,a,62,17,"#3a7a47",f.gold);
    const pts=[[0,-205],[-24,-190],[24,-190],[-44,-172],[44,-172],[-12,-172],[12,-172],[-30,-210],[30,-210],[0,-232],[-14,-220],[14,-220]];
    x.strokeStyle="#3b2a18";x.lineWidth=2;for(const [a,b] of pts){x.beginPath();x.moveTo(0,-168);x.lineTo(a,b);x.stroke()}
    for(const [a,b] of pts){x.fillStyle="#e2391f";x.strokeStyle=f.gold;x.lineWidth=1.5;circle(x,a,b,12);x.fill();x.stroke();x.fillStyle="#ff9a7a";circle(x,a-3,b-4,3.5);x.fill()}
    x.restore();
  };
  const peach = (x,f,cx,cy,s,leafDir) => {
    const g=x.createLinearGradient(0,cy-s,0,cy+s);g.addColorStop(0,"#fff0d0");g.addColorStop(.45,"#ffb08f");g.addColorStop(1,"#e9566a");
    x.fillStyle=g;heart(x,cx,cy,s);x.fill();x.strokeStyle=f.gold;x.lineWidth=4;x.stroke();
    x.save();x.strokeStyle="#c8505c";x.globalAlpha=.55;x.lineWidth=3;x.beginPath();x.moveTo(cx,cy-s*.4);x.quadraticCurveTo(cx+s*.25,cy+s*.2,cx+s*.02,cy+s*.85);x.stroke();x.restore();
    x.strokeStyle="#4a2a1a";x.lineWidth=Math.max(4,s*.05);x.lineCap="round";x.beginPath();x.moveTo(cx,cy-s*.4);x.lineTo(cx+leafDir*s*.08,cy-s*.68);x.stroke();
    leaf(x,cx+leafDir*s*.06,cy-s*.5,leafDir*1.15,s*.8,s*.2,"#3a8a52",f.gold);
    leaf(x,cx+leafDir*s*.02,cy-s*.46,leafDir*1.75,s*.62,s*.16,"#2f7a46",f.gold);
  };
  const kite = (x,f,cx,cy,s) => {
    x.save();x.translate(cx,cy);x.scale(s,s);
    const T=[0,-190],R=[125,-10],B=[0,200],L=[-125,-10],C=[0,0];
    const tri=(a,b,col)=>{x.fillStyle=col;x.beginPath();x.moveTo(C[0],C[1]);x.lineTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.closePath();x.fill()};
    tri(T,R,f.gold);tri(R,B,"#e2391f");tri(B,L,f.gold);tri(L,T,"#e2391f");
    x.strokeStyle=f.paper2;x.lineWidth=5;x.lineJoin="round";x.beginPath();x.moveTo(T[0],T[1]);x.lineTo(R[0],R[1]);x.lineTo(B[0],B[1]);x.lineTo(L[0],L[1]);x.closePath();x.stroke();
    x.lineWidth=3;x.beginPath();x.moveTo(T[0],T[1]);x.lineTo(B[0],B[1]);x.moveTo(L[0],L[1]);x.lineTo(R[0],R[1]);x.stroke();
    x.fillStyle=f.paper2;circle(x,0,0,52);x.fill();x.strokeStyle=f.gold;x.lineWidth=3;x.stroke();
    x.restore();
  };
  const osman = (x,f,seed,pts) => { // 桂花 clusters
    const r=rand(seed);for(const [px,py] of pts){for(let i=0;i<5;i++){const a=r()*6.28,d=6+r()*16;x.fillStyle=i%2?"#ffd27a":f.gold;
      for(let k=0;k<4;k++){circle(x,px+Math.cos(a)*d+Math.cos(k*1.57)*4.5,py+Math.sin(a)*d+Math.sin(k*1.57)*4.5,3.8);x.fill()}}}
  };

  registerFest({
    id:"chongyang", name:"重陽節", phrase:"福壽安康",
    paper:"#a8321c", paper2:"#6e1c0e", gold:"#f0c36b",
    // up to 56 characters each; exactly 20 required
    msgs:[
      "九九重陽，敬祝您身體硬朗、福壽綿長。謝謝您一路的照顧，有空我們一起去走走、登登高。",
      "重陽佳節，秋高氣爽。願您日日開懷，步步穩健，天天都有好心情。",
      "又到敬老的日子，想對您說聲謝謝。祝您健康長壽，笑口常開，我們常回家看您。",
      "重陽登高，步步高升。願您身體安康，腳步輕健，每一天都精神飽滿。",
      "菊花香、秋風涼，祝您福壽雙全，平安喜樂，笑口常開。",
      "您是我們心中最溫暖的大樹。重陽節，謝謝您的疼愛，願您福壽安康。",
      "九九重陽，久久長壽。祝您日子過得舒心自在，天天有笑容。",
      "待到重陽日，還來就菊花。這個秋天，願您平安順心，我們常回家看您。",
      "每逢佳節倍思親，重陽時節更想念您。天涼了，記得加件衣服，多保重。",
      "自古逢秋悲寂寥，我言秋日勝春朝。祝您心境開闊，日日都是好時光。",
      "謝謝您為這個家付出的一切。重陽佳節，換我們來疼您，祝您健康平安。",
      "敬老節到了，今天不用煮飯，換我們來張羅。請您好好休息，享受天倫之樂。",
      "福壽綿長，康泰安寧。願您每天吃得香、睡得好、笑得開懷。",
      "秋高氣爽好登高，願您步履穩健、身心舒暢，歲歲年年都平安。",
      "您的笑容，是我們全家最大的福氣。重陽佳節，祝您福壽康寧。",
      "老當益壯、心寬體健。祝您重陽佳節，悠閒自在，福氣滿滿。",
      "一杯菊花茶，一份孝心意。祝您心情清朗，日子甘甜如蜜。",
      "吃一塊重陽糕，步步高升、百事皆高。願您每一天都有好滋味。",
      "小時候是您牽著我走路，如今換我陪您散步。重陽佳節，祝您平安喜樂。",
      "全家平安，闔家團圓。重陽佳節，願您身邊永遠有笑聲、有溫暖。",
    ],
    // exactly 10 required; each draw(x,f) returns the y (centre) where the phrase is written
    designs:[
      {motif:"登高遠眺的山巒、盛開的菊花與一串茱萸，花心寫上「壽」字。", draw:LEGACY.chongyang},
      {motif:"登高涼亭、層層山巒、南飛的雁群，山腳開滿菊花。", draw:LEGACY.chongyang2},
      {motif:"五層重陽糕，層層點綴紅石榴籽，頂端插著小紅旗，兩旁盛開菊花。", phrase:"步步高升",
       colors:{paper:"#9c2a18",paper2:"#611609",gold:"#f2c96e"},
       draw(x,f){
         x.save();x.globalAlpha=.18;x.fillStyle=f.gold;circle(x,500,520,290);x.fill();x.restore();
         mum(x,f,170,640,100);mum(x,f,830,640,100);mum(x,f,150,800,62);mum(x,f,850,800,62);
         // plate
         x.fillStyle=f.gold;x.strokeStyle=f.paper2;x.lineWidth=3;x.beginPath();x.ellipse(500,770,300,34,0,0,Math.PI*2);x.fill();x.stroke();
         const widths=[470,420,370,320,270];
         widths.forEach((w,i)=>{const y=730-i*76;
           x.fillStyle=i%2?"#f6cf86":"#fff0c8";x.strokeStyle=f.paper2;x.lineWidth=4;rrect(x,500-w/2,y-60,w,66,16);x.fill();x.stroke();
           x.fillStyle="#d4402e";const n=Math.floor((w-70)/40);
           for(let k=0;k<=n;k++){const px=500-(n*40)/2+k*40;circle(x,px,y-27,8);x.fill();x.fillStyle="rgba(255,255,255,.55)";circle(x,px-2.5,y-30,2.6);x.fill();x.fillStyle="#d4402e"}
         });
         // flags
         const top=730-4*76-60;
         for(const [dx,h] of [[-70,60],[0,110],[70,60]]){x.strokeStyle="#4a2a1a";x.lineWidth=5;x.lineCap="round";x.beginPath();x.moveTo(500+dx,top+6);x.lineTo(500+dx,top-h);x.stroke();
           x.fillStyle=dx?"#e2391f":f.gold;x.strokeStyle=f.paper2;x.lineWidth=2.5;x.beginPath();x.moveTo(500+dx,top-h);x.lineTo(500+dx+58,top-h+18);x.lineTo(500+dx,top-h+38);x.closePath();x.fill();x.stroke()}
         return 885;
       }},
      {motif:"一顆大壽桃配兩顆小壽桃，綠葉相伴，祥雲環繞，桃心寫著「壽」字。", phrase:"福壽綿長",
       colors:{paper:"#b03a22",paper2:"#6a1a10",gold:"#f4cc72"},
       draw(x,f){
         cloud(x,f,240,300,1.1,f.paper);cloud(x,f,780,270,1,f.paper);cloud(x,f,830,560,.7,f.paper);
         peach(x,f,225,660,95,-1);peach(x,f,775,660,95,1);
         peach(x,f,500,500,215,1);
         x.fillStyle="#fff0d0";circle(x,500,530,90);x.fill();x.strokeStyle=f.gold;x.lineWidth=4;x.stroke();
         bigChar(x,"壽",500,538,130,f.paper);
         return 890;
       }},
      {motif:"一罈菊花酒與酒杯，杯中浮著菊花，一朵大菊花帶著綠葉在後，花瓣隨風飄落。", phrase:"菊香延年",
       colors:{paper:"#7c202b",paper2:"#480f18",gold:"#f1c56d"},
       draw(x,f){
         // chrysanthemum bloom with stem behind
         x.strokeStyle="#3a7a47";x.lineWidth=8;x.lineCap="round";x.beginPath();x.moveTo(690,500);x.bezierCurveTo(740,620,760,700,720,760);x.stroke();
         leaf(x,745,690,.9,110,28,"#3a7a47",f.gold);leaf(x,725,620,-.9,90,24,"#2f6b3f",f.gold);
         mum(x,f,690,380,150,"#8a3a14");
         // jar
         const jg=x.createLinearGradient(240,0,560,0);jg.addColorStop(0,"#9a6228");jg.addColorStop(.5,"#d49a4a");jg.addColorStop(1,"#7a4a1c");
         x.fillStyle=jg;x.strokeStyle=f.gold;x.lineWidth=4;
         x.beginPath();x.ellipse(380,610,150,185,0,0,Math.PI*2);x.fill();x.stroke();
         x.fillStyle=jg;rrect(x,320,410,120,70,14);x.fill();x.stroke();
         x.fillStyle="#e2391f";x.beginPath();x.moveTo(300,415);x.quadraticCurveTo(380,340,460,415);x.quadraticCurveTo(380,445,300,415);x.fill();x.stroke();
         x.strokeStyle=f.gold;x.lineWidth=5;x.beginPath();x.moveTo(322,440);x.lineTo(438,440);x.stroke();
         x.fillStyle="#fff0d0";x.strokeStyle=f.paper2;x.lineWidth=3;rrect(x,325,520,110,170,10);x.fill();x.stroke();
         x.fillStyle="#b3281a";x.font=`700 78px ${DISP}`;vText(x,"菊酒",380,538,78,6);
         // cup
         x.fillStyle=f.gold;x.strokeStyle=f.paper2;x.lineWidth=3;
         x.beginPath();x.moveTo(570,690);x.lineTo(850,690);x.quadraticCurveTo(840,790,710,800);x.quadraticCurveTo(580,790,570,690);x.closePath();x.fill();x.stroke();
         x.fillRect(690,798,40,22);x.fillRect(650,818,120,12);
         x.fillStyle="#c8841f";x.beginPath();x.ellipse(710,690,140,22,0,0,Math.PI*2);x.fill();x.stroke();
         x.fillStyle="#e7a94a";x.beginPath();x.ellipse(710,692,122,15,0,0,Math.PI*2);x.fill();
         mum(x,f,710,690,34);
         x.save();x.fillStyle=f.gold;for(const [a,b,r] of [[560,320,.5],[520,430,-.4],[600,520,.8],[250,380,.3]]){x.save();x.translate(a,b);x.rotate(r);x.beginPath();x.ellipse(0,0,6,18,0,0,Math.PI*2);x.fill();x.restore()}x.restore();
         return 895;
       }},
      {motif:"紅日高照，蒼松挺立，仙鶴展翅飛翔，祥雲環繞。", phrase:"松鶴延年",
       colors:{paper:"#b5481f",paper2:"#6b2410",gold:"#f6d27a"},
       draw(x,f){
         x.fillStyle="#ffe9b0";circle(x,730,340,110);x.fill();x.strokeStyle=f.gold;x.lineWidth=4;circle(x,730,340,124);x.stroke();
         cloud(x,f,790,640,.9,f.paper);cloud(x,f,640,760,.7,f.paper);
         // pine trunk
         x.save();x.lineCap="round";
         for(const [w,c] of [[44,f.gold],[36,"#4a2a1a"]]){x.strokeStyle=c;x.lineWidth=w;x.beginPath();x.moveTo(150,935);x.bezierCurveTo(130,780,260,700,200,560);x.bezierCurveTo(170,480,230,420,210,330);x.stroke()}
         for(const [w,c] of [[24,f.gold],[17,"#4a2a1a"]]){x.strokeStyle=c;x.lineWidth=w;x.beginPath();x.moveTo(215,500);x.bezierCurveTo(290,490,340,460,380,455);x.stroke();
           x.beginPath();x.moveTo(185,640);x.bezierCurveTo(130,610,110,560,100,520);x.stroke()}
         x.restore();
         const pad=(a,b,rx,ry)=>{x.fillStyle="#2f6b3f";x.strokeStyle=f.gold;x.lineWidth=2.5;x.beginPath();x.ellipse(a,b,rx,ry,0,Math.PI,0);x.closePath();x.fill();x.stroke();
           x.strokeStyle="#9fd49a";x.globalAlpha=.6;x.lineWidth=2;for(let i=-3;i<=3;i++){x.beginPath();x.moveTo(a+i*rx/3.5,b-ry*.35);x.lineTo(a+i*rx/3,b-ry*.9);x.stroke()}x.globalAlpha=1};
         pad(215,300,125,60);pad(330,462,115,55);pad(130,512,85,44);pad(280,596,95,48);
         // crane
         x.save();x.translate(0,0);
         x.fillStyle="#fff6e3";x.strokeStyle=f.paper2;x.lineWidth=2.5;
         x.beginPath();x.moveTo(555,570);x.bezierCurveTo(515,480,470,390,420,340);x.bezierCurveTo(520,330,620,410,660,570);x.closePath();x.fill();x.stroke();
         x.beginPath();x.moveTo(560,590);x.bezierCurveTo(540,660,500,720,430,760);x.bezierCurveTo(540,760,650,700,680,590);x.closePath();x.fill();x.stroke();
         x.fillStyle="#3a2a22";x.beginPath();x.moveTo(420,340);x.bezierCurveTo(470,335,520,350,560,380);x.bezierCurveTo(520,360,470,352,432,358);x.closePath();x.fill();
         x.beginPath();x.moveTo(430,760);x.bezierCurveTo(480,760,530,750,575,725);x.bezierCurveTo(530,735,480,742,442,742);x.closePath();x.fill();
         x.fillStyle="#fff6e3";x.beginPath();x.ellipse(630,585,92,32,-.12,0,Math.PI*2);x.fill();x.stroke();
         x.strokeStyle="#fff6e3";x.lineWidth=15;x.lineCap="round";x.beginPath();x.moveTo(700,575);x.bezierCurveTo(760,555,770,500,745,455);x.stroke();
         x.strokeStyle=f.paper2;x.lineWidth=2;x.beginPath();x.moveTo(700,575);x.bezierCurveTo(760,555,770,500,745,455);x.stroke();
         x.fillStyle="#fff6e3";circle(x,748,445,15);x.fill();x.stroke();
         x.strokeStyle="#4a2a1a";x.lineWidth=4;x.beginPath();x.moveTo(760,442);x.lineTo(805,452);x.stroke();
         x.fillStyle="#e2391f";circle(x,743,434,5);x.fill();
         x.strokeStyle="#4a2a1a";x.lineWidth=5;x.beginPath();x.moveTo(550,598);x.lineTo(470,650);x.moveTo(560,606);x.lineTo(486,676);x.stroke();
         x.restore();
         return 890;
       }},
      {motif:"九朵菊花圍成一圈，中央圓盤寫著「九九」，象徵久久長壽。", phrase:"久久長壽",
       colors:{paper:"#9a1f1f",paper2:"#5a0d10",gold:"#f3c96a"},
       draw(x,f){
         const cx=500,cy=510;
         x.strokeStyle=f.gold;x.globalAlpha=.55;x.lineWidth=3;circle(x,cx,cy,255);x.stroke();circle(x,cx,cy,236);x.stroke();x.globalAlpha=1;
         x.fillStyle=f.paper2;circle(x,cx,cy,196);x.fill();x.strokeStyle=f.gold;x.lineWidth=5;x.stroke();x.lineWidth=2;circle(x,cx,cy,178);x.stroke();
         x.strokeStyle=f.gold;x.globalAlpha=.45;x.lineWidth=2;
         for(let i=0;i<36;i++){const a=i*Math.PI/18;x.beginPath();x.moveTo(cx+Math.cos(a)*200,cy+Math.sin(a)*200);x.lineTo(cx+Math.cos(a)*232,cy+Math.sin(a)*232);x.stroke()}
         x.globalAlpha=1;
         for(let i=0;i<9;i++){const a=-Math.PI/2+i*2*Math.PI/9;mum(x,f,cx+Math.cos(a)*255,cy+Math.sin(a)*255,52,i%2?"#c9741f":"#a8321c")}
         bigChar(x,"九九",cx,cy+6,150,f.gold);
         return 900;
       }},
      {motif:"秋日藍天下的紅黃風箏，飄著彩帶隨風高飛，遠處還有一隻小風箏與雁群。", phrase:"康泰安寧",
       colors:{paper:"#b8502a",paper2:"#703016",gold:"#f6d27a"},
       draw(x,f){
         cloud(x,f,240,330,1,f.paper);cloud(x,f,800,620,.8,f.paper);
         // string
         x.strokeStyle=INK;x.lineWidth=2.5;x.globalAlpha=.8;x.beginPath();x.moveTo(520,575);x.bezierCurveTo(480,700,300,780,190,900);x.stroke();x.globalAlpha=1;
         // tail
         x.strokeStyle="#e2391f";x.lineWidth=6;x.lineCap="round";x.beginPath();x.moveTo(560,602);x.bezierCurveTo(500,690,620,720,570,790);x.stroke();
         x.fillStyle=f.gold;for(const [a,b,r] of [[540,670,.6],[582,712,-.6],[580,760,.5]]){x.save();x.translate(a,b);x.rotate(r);x.beginPath();x.moveTo(-18,-10);x.lineTo(18,10);x.lineTo(18,-10);x.lineTo(-18,10);x.closePath();x.fill();x.restore()}
         kite(x,f,560,400,1);bigChar(x,"壽",560,408,72,f.gold);
         // small kite
         x.strokeStyle=INK;x.lineWidth=2;x.globalAlpha=.7;x.beginPath();x.moveTo(790,330);x.bezierCurveTo(780,420,820,500,700,580);x.stroke();x.globalAlpha=1;
         kite(x,f,800,260,.38);
         // geese
         x.strokeStyle=f.gold;x.lineWidth=4;x.lineCap="round";x.lineJoin="round";
         for(const [a,b,s] of [[200,250,1],[260,290,.8],[155,300,.7]]){x.beginPath();x.moveTo(a-26*s,b-8*s);x.quadraticCurveTo(a-10*s,b-16*s,a,b);x.quadraticCurveTo(a+10*s,b-16*s,a+26*s,b-8*s);x.stroke()}
         // hill
         x.fillStyle=f.paper2;x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.moveTo(80,950);x.quadraticCurveTo(110,830,200,850);x.quadraticCurveTo(260,870,290,950);x.closePath();x.fill();x.stroke();
         x.fillStyle=INK;circle(x,175,825,13);x.fill();x.fillRect(168,838,14,36);
         return 890;
       }},
      {motif:"繡著「安」字的紅色茱萸香囊懸掛在中央，兩旁各插一枝結滿紅果的茱萸。", phrase:"平安健康",
       colors:{paper:"#8c1f24",paper2:"#520d12",gold:"#f2c76e"},
       draw(x,f){
         zhuyu(x,f,150,860,.18,1.15);zhuyu(x,f,850,860,-.18,1.15);
         // cord and knot
         x.strokeStyle=f.gold;x.lineWidth=4;x.beginPath();x.moveTo(500,190);x.lineTo(500,270);x.stroke();
         x.save();x.translate(500,282);x.rotate(Math.PI/4);x.fillStyle=f.gold;x.fillRect(-18,-18,36,36);x.strokeStyle=f.paper2;x.lineWidth=3;x.strokeRect(-10,-10,20,20);x.restore();
         // pouch
         const g=x.createLinearGradient(330,0,670,0);g.addColorStop(0,"#c0241c");g.addColorStop(.5,"#ee4a36");g.addColorStop(1,"#b01a18");
         x.fillStyle=g;x.strokeStyle=f.gold;x.lineWidth=4;
         x.beginPath();x.moveTo(440,350);x.bezierCurveTo(325,420,295,620,395,700);x.quadraticCurveTo(500,735,605,700);x.bezierCurveTo(705,620,675,420,560,350);x.closePath();x.fill();x.stroke();
         x.fillStyle=f.gold;rrect(x,430,332,140,34,10);x.fill();x.strokeStyle=f.paper2;x.lineWidth=2.5;x.stroke();
         x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.moveTo(500,366);x.quadraticCurveTo(450,400,420,380);x.moveTo(500,366);x.quadraticCurveTo(550,400,580,380);x.stroke();
         x.fillStyle=f.gold;x.beginPath();x.ellipse(430,386,26,13,-.5,0,Math.PI*2);x.fill();x.beginPath();x.ellipse(570,386,26,13,.5,0,Math.PI*2);x.fill();
         x.fillStyle=f.paper2;circle(x,500,540,92);x.fill();x.strokeStyle=f.gold;x.lineWidth=4;x.stroke();x.lineWidth=2;circle(x,500,540,78);x.stroke();
         bigChar(x,"安",500,546,104,f.gold);
         // tassels
         x.strokeStyle=f.gold;x.lineWidth=3;for(let i=-3;i<=3;i++){x.beginPath();x.moveTo(500+i*5,722);x.lineTo(500+i*15,800);x.stroke()}
         x.fillStyle=f.gold;circle(x,500,722,12);x.fill();
         return 890;
       }},
      {motif:"方形孝字印章，四角盛開菊花，兩側桂花枝條，訴說敬老與孝親。", phrase:"慈孝傳家",
       colors:{paper:"#7a2a14",paper2:"#45140a",gold:"#f3cf7a"},
       draw(x,f){
         const cx=500,cy=500;
         for(const sg of [-1,1]){const bx=500+sg*370;branch(x,[[bx,780],[bx+sg*25,620],[bx-sg*5,470],[bx+sg*15,340]],9);branch(x,[[bx+sg*25,620],[bx-sg*50,560]],5);
           osman(x,f,sg>0?5:9,[[bx+sg*25,620],[bx-sg*50,560],[bx-sg*5,470],[bx+sg*15,340],[bx+sg*20,400],[bx+sg*5,700]])}
         x.fillStyle=f.gold;x.strokeStyle=f.paper2;x.lineWidth=5;rrect(x,cx-185,cy-185,370,370,22);x.fill();x.stroke();
         x.lineWidth=3;rrect(x,cx-168,cy-168,336,336,14);x.stroke();
         bigChar(x,"孝",cx,cy+10,290,"#a8321c");
         for(const [dx,dy] of [[-1,-1],[1,-1],[-1,1],[1,1]]) mum(x,f,cx+dx*185,cy+dy*185,92,"#8a3a14");
         return 890;
       }},
    ],
  });
})();
