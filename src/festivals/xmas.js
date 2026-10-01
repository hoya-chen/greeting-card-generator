/* 聖誕節 (xmas). Owner of this file: the 聖誕節 designer. Add designs and messages here only. */
(() => {
  const RED = "#d9332b", GRN = "#2f8052", GRN2 = "#3f9a62";
  const rr = (x,a,b,w,h,r) => {x.beginPath();x.roundRect(a,b,w,h,r)};
  const star5 = (x,cx,cy,R,r,rot=-Math.PI/2,n=5) => {x.beginPath();for(let i=0;i<n*2;i++){const q=i%2?r:R,a=rot+i*Math.PI/n;x.lineTo(cx+Math.cos(q?a:a)*q,cy+Math.sin(a)*q)}x.closePath()};
  // 4-point sparkle
  const spark = (x,cx,cy,s) => {x.beginPath();x.moveTo(cx,cy-s);x.quadraticCurveTo(cx,cy,cx+s,cy);x.quadraticCurveTo(cx,cy,cx,cy+s);x.quadraticCurveTo(cx,cy,cx-s,cy);x.quadraticCurveTo(cx,cy,cx,cy-s);x.closePath()};
  const leaf = (x,f,len,wd) => {x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(len*.5,-wd,len,0);x.quadraticCurveTo(len*.5,wd,0,0);x.closePath();x.fillStyle=GRN;x.fill();x.strokeStyle=f.gold;x.lineWidth=2;x.stroke();
    x.globalAlpha=.6;x.beginPath();x.moveTo(len*.1,0);x.lineTo(len*.9,0);x.stroke();x.globalAlpha=1};
  const berry = (x,cx,cy,r) => {x.fillStyle=RED;circle(x,cx,cy,r);x.fill();x.fillStyle="rgba(255,255,255,.55)";circle(x,cx-r*.3,cy-r*.3,r*.28);x.fill()};
  const holly = (x,f,cx,cy,s,rot) => {x.save();x.translate(cx,cy);x.rotate(rot||0);
    for(const a of [-.55,.55,Math.PI-.55,Math.PI+.55]){x.save();x.rotate(a);leaf(x,f,s,s*.3);x.restore()}
    berry(x,-s*.1,0,s*.12);berry(x,s*.1,-s*.04,s*.12);berry(x,0,s*.12,s*.12);x.restore()};
  const bow = (x,f,cx,cy,s,col,dark) => {x.save();x.translate(cx,cy);x.scale(s,s);x.fillStyle=col;x.strokeStyle=dark||f.gold;x.lineWidth=2.5/s;
    for(const m of [1,-1]){x.save();x.scale(m,1);
      x.beginPath();x.moveTo(0,5);x.lineTo(40,95);x.lineTo(58,80);x.lineTo(70,102);x.lineTo(14,8);x.closePath();x.fill();x.stroke();
      x.beginPath();x.moveTo(0,0);x.bezierCurveTo(30,-70,115,-70,108,-10);x.bezierCurveTo(100,45,40,30,0,0);x.closePath();x.fill();x.stroke();
      x.globalAlpha=.35;x.beginPath();x.moveTo(15,-4);x.bezierCurveTo(40,-40,85,-45,90,-15);x.strokeStyle=INK;x.stroke();x.globalAlpha=1;x.strokeStyle=dark||f.gold;x.restore()}
    circle(x,0,0,17);x.fill();x.stroke();x.restore()};
  const flame = (x,cx,cy,s) => {x.save();
    const g=x.createRadialGradient(cx,cy,2,cx,cy,s*5);g.addColorStop(0,"rgba(255,220,120,.55)");g.addColorStop(1,"rgba(255,200,90,0)");x.fillStyle=g;circle(x,cx,cy,s*5);x.fill();
    const fg=x.createLinearGradient(0,cy-s*1.6,0,cy+s*.7);fg.addColorStop(0,"#ffe27a");fg.addColorStop(.6,"#ff9d2e");fg.addColorStop(1,"#e8501c");
    x.fillStyle=fg;x.beginPath();x.moveTo(cx,cy-s*1.7);x.bezierCurveTo(cx+s*.9,cy-s*.6,cx+s*.7,cy+s*.6,cx,cy+s*.65);x.bezierCurveTo(cx-s*.7,cy+s*.6,cx-s*.9,cy-s*.6,cx,cy-s*1.7);x.fill();
    x.fillStyle="#fff6c8";x.beginPath();x.ellipse(cx,cy+s*.15,s*.22,s*.4,0,0,Math.PI*2);x.fill();x.restore()};
  const snowPine = (x,f,cx,base,s) => {x.save();x.lineJoin="round";
    x.fillStyle="#6b4423";x.fillRect(cx-s*.05,base-s*.2,s*.1,s*.2);
    [[.16,.5],[.4,.4],[.64,.3]].forEach(([y,w])=>{const b=base-s*y,t=b-s*.42;x.fillStyle=GRN;x.strokeStyle=f.gold;x.lineWidth=2;
      x.beginPath();x.moveTo(cx,t);x.lineTo(cx-s*w*.62,b);x.lineTo(cx+s*w*.62,b);x.closePath();x.fill();x.stroke();
      x.fillStyle=INK;x.beginPath();x.moveTo(cx,t);x.lineTo(cx-s*w*.2,t+s*.13);x.quadraticCurveTo(cx-s*.05,t+s*.1,cx,t+s*.16);x.quadraticCurveTo(cx+s*.07,t+s*.1,cx+s*w*.2,t+s*.13);x.closePath();x.fill()});
    x.restore()};

  const stocking = (x,f,cx,top,s,body,cuff,patch) => {
    x.save();x.translate(cx,top);x.scale(s,s);
    x.strokeStyle=f.gold;x.lineWidth=4/s;x.beginPath();x.ellipse(-34,-18,12,16,0,0,Math.PI*2);x.stroke();
    const path=()=>{x.beginPath();x.moveTo(-45,0);x.lineTo(45,0);x.lineTo(45,170);x.bezierCurveTo(45,200,120,215,135,245);x.bezierCurveTo(150,285,110,308,70,302);x.bezierCurveTo(20,296,-45,262,-45,215);x.closePath()};
    path();x.fillStyle=body;x.fill();x.save();path();x.clip();
    x.fillStyle=cuff;x.globalAlpha=.9;for(const y of [80,115]){x.fillRect(-60,y,130,12)}x.globalAlpha=1;
    x.fillStyle=patch;circle(x,-48,240,48);x.fill();circle(x,135,282,46);x.fill();
    x.fillStyle=f.gold;for(const [a,b] of [[0,40],[20,60],[-18,62],[10,150],[-15,175]]){circle(x,a,b,4);x.fill()}
    x.restore();path();x.lineWidth=3.5/s;x.stroke();
    rr(x,-56,-10,112,56,14);x.fillStyle=cuff;x.fill();x.stroke();
    x.fillStyle="rgba(0,0,0,.08)";for(let i=0;i<5;i++){circle(x,-36+i*18,18+(i%2)*14,7);x.fill()}
    x.restore();
  };

  registerFest({
    id:"xmas", name:"聖誕節", phrase:"平安喜樂",
    paper:"#1f5b3a", paper2:"#0f3523", gold:"#e8c46e",
    // up to 56 characters each; exactly 20 required
    msgs:[
      "聖誕快樂！願這個冬天溫暖平安，您的身體健康，家裡處處是笑聲。",
      "在這個團聚的節日，謝謝您一直以來的愛。祝您平安喜樂，佳節愉快。",
      "聖誕夜祝福送給您：身體健康、心情舒暢，新的一年也萬事如意。",
      "平安夜，靜靜的夜，願溫柔的燈火照亮您的家，祝您平安喜樂。",
      "願您在聖誕的燭光裡，心裡溫暖，身體安康，歲歲年年都平安。",
      "聖誕快樂！感謝您一輩子的付出，願您笑口常開，福氣滿滿。",
      "天冷了，記得多穿一件衣。聖誕快樂，願您暖暖的過每一天。",
      "一盞燈、一杯熱茶、一家人團圓，就是最好的聖誕禮物，祝您平安。",
      "感恩您的疼愛與陪伴，聖誕節祝您健康平安，天天都喜樂。",
      "鈴聲響起，福音傳遍，願平安與喜樂常伴您左右，聖誕快樂！",
      "願您的日子像聖誕樹上的燈，閃閃發亮，溫暖又明亮。",
      "歲末年終，聖誕佳節，祝您闔家平安，萬事順心，福壽康寧。",
      "聖誕夜裡想起您，心裡滿是感謝。願您安心好眠，平安喜樂。",
      "祝您聖誕快樂，笑容常在，身體硬朗，一年更勝一年好。",
      "願這份小小的祝福，像一雙暖暖的襪子，陪您度過整個冬天。",
      "地上平安，人間有愛。願您在聖誕的祝福中，常有平安與喜樂。",
      "薑餅香、燈火亮，願您與家人圍坐談笑，溫暖幸福滿滿。",
      "慢慢走、好好吃、開開心心過日子，聖誕快樂，我們永遠愛您。",
      "聖誕快樂！謝謝您給我們一個溫暖的家，祝您福如東海，壽比南山。",
      "雪花飄飄的季節，願您心中永遠是春天，健康平安，喜樂常在。",
    ],
    // exactly 10 required; each draw(x,f) returns the y (centre) where the phrase is written
    designs:[
      {motif:"掛滿紅色吊飾的聖誕樹，頂端一顆金星，雪花紛飛。", draw:LEGACY.xmas},
      {motif:"綴著紅果的聖誕花圈，下方繫紅色蝴蝶結，中間是「安」字。", draw:LEGACY.xmas2},

      {motif:"松枝花環下垂掛三隻聖誕襪，襪口露出小禮物與星星。", phrase:"喜樂滿堂",
       colors:{paper:"#a3201c",paper2:"#660f0e",gold:"#f2cf7e"},
       draw(x,f){
         snow(x,f,41,22,[80,200,920,760]);
         // swag
         const P=t=>[90+820*t,250+320*t*(1-t)];
         x.save();x.lineCap="round";x.strokeStyle="#2a7a4c";x.lineWidth=38;x.beginPath();x.moveTo(90,250);x.quadraticCurveTo(500,410,910,250);x.stroke();
         const r=rand(12);
         for(let i=0;i<90;i++){const [px,py]=P(i/89),a=r()*Math.PI*2,l=14+r()*14;x.strokeStyle=i%3?GRN2:"#1c5a3a";x.lineWidth=4;x.beginPath();x.moveTo(px,py);x.lineTo(px+Math.cos(a)*l,py+Math.sin(a)*l);x.stroke()}
         x.restore();
         for(const t of [.1,.3,.45,.58,.7,.9]){const [px,py]=P(t);berry(x,px,py+10,9)}
         for(const t of [.2,.8]){const [px,py]=P(t);x.fillStyle=f.gold;circle(x,px,py-6,12);x.fill();x.fillStyle="rgba(255,255,255,.5)";circle(x,px-4,py-10,3.5);x.fill()}
         holly(x,f,150,270,46,.4);holly(x,f,850,270,46,Math.PI-.4);
         const [lx,ly]=P(.207),[mx,my]=P(.5),[rx,ry]=P(.79);
         stocking(x,f,lx-12,ly+30,1.05,"#2f8052","#fff3dc","#e8c46e");
         stocking(x,f,mx-14,my+30,1.3,"#fff3dc","#c4302a","#2f8052");
         stocking(x,f,rx-12,ry+30,1.05,"#e8c46e","#fff3dc","#c4302a");
         // peeking gifts
         x.fillStyle=f.gold;star5(x,mx-12,my+4,24,10);x.fill();
         x.strokeStyle=INK;x.lineWidth=9;x.lineCap="round";x.beginPath();x.moveTo(lx+6,ly+12);x.lineTo(lx+6,ly-30);x.arc(lx+22,ly-30,16,Math.PI,0);x.stroke();
         x.strokeStyle=RED;x.lineWidth=9;x.setLineDash([9,9]);x.beginPath();x.moveTo(lx+6,ly+12);x.lineTo(lx+6,ly-30);x.arc(lx+22,ly-30,16,Math.PI,0);x.stroke();x.setLineDash([]);
         x.fillStyle=INK;rr(x,rx-14,ry-20,40,36,5);x.fill();x.fillStyle=RED;x.fillRect(rx+3,ry-20,6,36);bow(x,f,rx+6,ry-22,.2,RED,RED);
         for(const [a,b,s] of [[130,560,14],[880,520,12],[150,740,10],[860,720,14]]){x.fillStyle=f.gold;spark(x,a,b,s);x.fill()}
         return 880;
       }},

      {motif:"一對金色鈴鐺掛在紅蝴蝶結下，四周放射金光與冬青葉。", phrase:"鈴響平安",
       colors:{paper:"#1c5a3c",paper2:"#0c3322",gold:"#f0cb78"},
       draw(x,f){
         x.save();circle(x,500,500,290);x.clip();
         x.fillStyle=f.paper2;x.globalAlpha=.6;x.fillRect(200,200,600,600);
         x.fillStyle=f.gold;x.globalAlpha=.16;for(let i=0;i<18;i++){const a=i*Math.PI/9+.1;x.beginPath();x.moveTo(500,350);x.lineTo(500+Math.cos(a)*560,350+Math.sin(a)*560);x.lineTo(500+Math.cos(a+.1)*560,350+Math.sin(a+.1)*560);x.closePath();x.fill()}
         x.globalAlpha=1;x.restore();
         x.strokeStyle=f.gold;x.lineWidth=3;x.globalAlpha=.8;circle(x,500,500,290);x.stroke();x.globalAlpha=.4;circle(x,500,500,274);x.stroke();x.globalAlpha=1;
         snow(x,f,52,26,[90,200,910,900]);
         const bell=(rot)=>{x.save();x.translate(500,318);x.rotate(rot);x.scale(1.3,1.3);
           const g=x.createLinearGradient(-110,0,110,0);g.addColorStop(0,"#b8862e");g.addColorStop(.35,"#fff0b0");g.addColorStop(.6,"#e8c46e");g.addColorStop(1,"#a8741f");
           x.fillStyle=g;x.strokeStyle="#7a5116";x.lineWidth=3;
           x.beginPath();x.moveTo(-30,20);x.bezierCurveTo(-30,-12,30,-12,30,20);x.bezierCurveTo(35,90,55,150,105,200);x.bezierCurveTo(118,210,116,228,100,230);x.lineTo(-100,230);x.bezierCurveTo(-116,228,-118,210,-105,200);x.bezierCurveTo(-55,150,-35,90,-30,20);x.closePath();x.fill();x.stroke();
           x.strokeStyle="rgba(122,81,22,.7)";x.lineWidth=4;x.beginPath();x.moveTo(-86,196);x.quadraticCurveTo(0,212,86,196);x.stroke();
           x.beginPath();x.moveTo(-48,120);x.quadraticCurveTo(0,136,48,120);x.stroke();
           x.fillStyle="#7a5116";x.beginPath();x.ellipse(0,232,98,9,0,0,Math.PI*2);x.fill();
           x.fillStyle=g;circle(x,0,250,22);x.fill();x.stroke();
           x.fillStyle="rgba(255,255,255,.55)";x.beginPath();x.ellipse(-60,150,6,32,.35,0,Math.PI*2);x.fill();
           x.restore()};
         bell(-.32);bell(.32);
         bow(x,f,500,292,1.3,"#d9332b","#8f1710");
         holly(x,f,310,670,52,.2);holly(x,f,690,670,52,Math.PI-.2);holly(x,f,500,725,46,Math.PI/2);
         for(const [a,b,s] of [[170,330,18],[830,350,16],[210,560,12],[800,560,14],[400,200,10]]){x.fillStyle=f.gold;spark(x,a,b,s);x.fill()}
         return 870;
       }},

      {motif:"拱形窗中三支紅燭燃著暖暖燭光，窗上一顆金星與細雪。", phrase:"燭光溫暖",
       colors:{paper:"#5e1a2b",paper2:"#33091a",gold:"#f2c96e"},
       draw(x,f){
         const arch=()=>{x.beginPath();x.moveTo(290,775);x.lineTo(290,420);x.arc(500,420,210,Math.PI,0);x.lineTo(710,775);x.closePath()};
         arch();x.fillStyle=f.paper2;x.fill();
         x.save();arch();x.clip();stars(x,f,63,50,[290,200,710,775]);snow(x,f,64,14,[300,230,700,770]);
         const g=x.createRadialGradient(500,640,10,500,640,300);g.addColorStop(0,"rgba(255,200,100,.35)");g.addColorStop(1,"rgba(255,200,100,0)");x.fillStyle=g;x.fillRect(290,200,420,580);x.restore();
         arch();x.strokeStyle=f.gold;x.lineWidth=9;x.stroke();
         x.globalAlpha=.6;x.lineWidth=3;x.beginPath();x.moveTo(310,775);x.lineTo(310,420);x.arc(500,420,190,Math.PI,0);x.lineTo(690,775);x.stroke();x.globalAlpha=1;
         // star
         x.fillStyle=f.gold;star5(x,500,330,46,19);x.fill();x.strokeStyle=INK;x.lineWidth=2;x.stroke();
         x.globalAlpha=.5;x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.moveTo(500,255);x.lineTo(500,385);x.moveTo(430,330);x.lineTo(570,330);x.stroke();x.globalAlpha=1;
         // sill
         x.fillStyle=f.paper2;rr(x,255,775,490,30,6);x.fill();x.strokeStyle=f.gold;x.lineWidth=4;x.stroke();
         const candle=(cx,top,w,h,col)=>{
           x.fillStyle=col;rr(x,cx-w/2,top,w,h,6);x.fill();x.strokeStyle=f.gold;x.lineWidth=3;x.stroke();
           x.fillStyle="rgba(255,255,255,.28)";x.fillRect(cx-w/2+6,top+8,6,h-16);
           x.fillStyle=INK;x.beginPath();x.moveTo(cx-w/2,top+6);for(let i=0;i<=4;i++){x.quadraticCurveTo(cx-w/2+w*(i+.5)/4,top+(i%2?46:30),cx-w/2+w*(i+1)/4,top+6)}x.lineTo(cx+w/2,top);x.lineTo(cx-w/2,top);x.fill();
           x.fillStyle=f.gold;x.beginPath();x.ellipse(cx,775-2,w*.85,12,0,0,Math.PI*2);x.fill();
           x.strokeStyle="#3a2410";x.lineWidth=3;x.beginPath();x.moveTo(cx,top);x.lineTo(cx,top-14);x.stroke();
           flame(x,cx,top-34,w*.42)};
         candle(500,470,70,305,"#c8261f");candle(385,630,50,145,"#e8c46e");candle(615,610,50,165,"#fff3dc");
         holly(x,f,330,770,48,-.25);holly(x,f,670,770,48,Math.PI+.25);holly(x,f,500,785,40,0);
         for(const [a,b,s] of [[170,380,16],[830,420,18],[190,640,12],[820,650,12]]){x.fillStyle=f.gold;spark(x,a,b,s);x.fill()}
         return 885;
       }},

      {motif:"正面的麋鹿頭，頂著金色鹿角、紅鼻子，圍著紅白條紋圍巾。", phrase:"福祿雙全",
       colors:{paper:"#b3241c",paper2:"#70100b",gold:"#f4d27e"},
       draw(x,f){
         x.fillStyle=f.paper2;x.globalAlpha=.55;circle(x,500,525,300);x.fill();x.globalAlpha=1;
         x.strokeStyle=f.gold;x.lineWidth=4;circle(x,500,525,300);x.stroke();x.globalAlpha=.5;x.lineWidth=2;circle(x,500,525,284);x.stroke();x.globalAlpha=1;
         snow(x,f,71,20,[90,200,910,830]);
         const ant=(x0,y0,a,len,w,d)=>{const x1=x0+Math.cos(a)*len,y1=y0+Math.sin(a)*len;
           x.strokeStyle=f.gold;x.lineWidth=w;x.lineCap="round";x.beginPath();x.moveTo(x0,y0);x.lineTo(x1,y1);x.stroke();
           if(d>0){ant(x1,y1,a+.38,len*.82,w*.72,d-1);ant(x0+(x1-x0)*.55,y0+(y1-y0)*.55,a-.75,len*.62,w*.6,d-1)}};
         const half=()=>{
           ant(448,410,-2.05,90,18,2);
           x.save();x.translate(390,445);x.rotate(-.75);x.fillStyle="#a8683a";x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.ellipse(0,0,34,70,0,0,Math.PI*2);x.fill();x.stroke();
           x.fillStyle="#e6a58f";x.beginPath();x.ellipse(0,4,18,48,0,0,Math.PI*2);x.fill();x.restore()};
         half();x.save();x.translate(1000,0);x.scale(-1,1);half();x.restore();
         // head
         const hp=()=>{x.beginPath();x.moveTo(398,420);x.bezierCurveTo(372,540,425,650,500,695);x.bezierCurveTo(575,650,628,540,602,420);x.bezierCurveTo(560,385,440,385,398,420);x.closePath()};
         const g=x.createLinearGradient(400,400,600,700);g.addColorStop(0,"#b97a45");g.addColorStop(1,"#8f5430");
         hp();x.fillStyle=g;x.fill();x.strokeStyle=f.gold;x.lineWidth=4;x.stroke();
         x.fillStyle="#ecd0a6";x.beginPath();x.ellipse(500,632,78,62,0,0,Math.PI*2);x.fill();
         x.fillStyle="#e6a58f";x.globalAlpha=.5;circle(x,430,590,22);x.fill();circle(x,570,590,22);x.fill();x.globalAlpha=1;
         x.fillStyle="#2a1810";for(const ex of [445,555]){circle(x,ex,525,17);x.fill()}
         x.fillStyle="#fff";for(const ex of [445,555]){circle(x,ex-5,519,5.5);x.fill()}
         x.strokeStyle="#2a1810";x.lineWidth=5;x.lineCap="round";x.beginPath();x.moveTo(425,490);x.quadraticCurveTo(445,478,466,488);x.moveTo(575,490);x.quadraticCurveTo(555,478,534,488);x.stroke();
         x.fillStyle="#e0281f";circle(x,500,640,40);x.fill();x.strokeStyle="#8f150f";x.lineWidth=3;x.stroke();x.fillStyle="rgba(255,255,255,.6)";circle(x,488,626,10);x.fill();
         x.strokeStyle="#2a1810";x.lineWidth=4;x.beginPath();x.moveTo(500,680);x.lineTo(500,698);x.moveTo(468,706);x.quadraticCurveTo(500,722,532,706);x.stroke();
         // scarf
         x.save();x.lineCap="round";x.strokeStyle="#2f8052";x.lineWidth=64;x.beginPath();x.moveTo(385,712);x.quadraticCurveTo(500,790,615,712);x.stroke();
         x.strokeStyle="#fff3dc";x.lineWidth=12;x.setLineDash([12,34]);x.lineDashOffset=0;x.beginPath();x.moveTo(385,712);x.quadraticCurveTo(500,790,615,712);x.stroke();x.setLineDash([]);
         x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.moveTo(375,690);x.quadraticCurveTo(500,764,625,690);x.stroke();
         x.restore();
         x.fillStyle="#2f8052";rr(x,570,730,58,92,10);x.fill();x.strokeStyle=f.gold;x.lineWidth=3;x.stroke();x.fillStyle="#fff3dc";x.fillRect(576,765,46,10);
         holly(x,f,432,730,34,Math.PI);
         for(const [a,b,s] of [[190,420,16],[820,430,16],[200,640,12],[810,660,12]]){x.fillStyle=f.gold;spark(x,a,b,s);x.fill()}
         return 895;
       }},

      {motif:"覆著糖霜的薑餅屋，糖果拐杖、薑餅人與小松樹相伴，煙囪冒著暖煙。", phrase:"甜蜜幸福",
       colors:{paper:"#235a3d",paper2:"#0f3523",gold:"#f0cc7a"},
       draw(x,f){
         snow(x,f,81,30,[80,200,920,830]);
         x.fillStyle=INK;x.globalAlpha=.5;for(const [a,b,r] of [[640,300,20],[665,255,26],[700,200,22]]){circle(x,a,b,r);x.fill()}x.globalAlpha=1;
         // chimney
         x.fillStyle="#6b3a1c";x.fillRect(600,330,60,120);x.strokeStyle=f.gold;x.lineWidth=3;x.strokeRect(600,330,60,120);
         x.fillStyle=INK;rr(x,592,320,76,22,10);x.fill();
         // body
         x.fillStyle="#8a4f26";x.fillRect(290,540,420,250);x.strokeStyle=f.gold;x.lineWidth=4;x.strokeRect(290,540,420,250);
         x.strokeStyle="rgba(255,243,220,.5)";x.lineWidth=3;x.setLineDash([12,10]);x.strokeRect(302,552,396,226);x.setLineDash([]);
         // roof
         x.fillStyle="#6b3a1c";x.beginPath();x.moveTo(235,555);x.lineTo(500,320);x.lineTo(765,555);x.closePath();x.fill();x.strokeStyle=f.gold;x.lineWidth=4;x.stroke();
         x.strokeStyle=INK;x.lineWidth=20;x.lineCap="round";x.lineJoin="round";x.beginPath();x.moveTo(235,555);x.lineTo(500,320);x.lineTo(765,555);x.stroke();
         x.fillStyle=INK;for(let i=0;i<12;i++){circle(x,262+i*(476/11),574,14);x.fill()}
         x.fillRect(250,552,500,10);
         const gum=["#d9332b","#e8c46e","#3f9a62","#fff3dc"];
         for(let i=0;i<6;i++){const t=(i+.5)/6;
           for(const [sx,sy,ex,ey] of [[235,555,500,320],[765,555,500,320]]){const a=sx+(ex-sx)*t*.9,b=sy+(ey-sy)*t*.9;x.fillStyle=gum[i%4];circle(x,a+(sx<500?20:-20),b+30,10);x.fill()}}
         x.fillStyle=f.gold;star5(x,500,300,24,10);x.fill();
         // door
         x.fillStyle=INK;x.beginPath();x.moveTo(452,790);x.lineTo(452,690);x.arc(500,690,48,Math.PI,0);x.lineTo(548,790);x.closePath();x.fill();
         x.fillStyle="#c0392b";x.beginPath();x.moveTo(463,790);x.lineTo(463,692);x.arc(500,692,37,Math.PI,0);x.lineTo(537,790);x.closePath();x.fill();
         x.fillStyle=f.gold;circle(x,526,745,6);x.fill();
         x.strokeStyle=INK;x.lineWidth=3;x.beginPath();x.moveTo(500,655);x.lineTo(500,790);x.stroke();
         // windows
         for(const wx of [335,585]){x.fillStyle=INK;x.fillRect(wx-6,610,92,82);x.fillStyle="#ffcf5a";x.fillRect(wx,616,80,70);x.strokeStyle=INK;x.lineWidth=5;x.beginPath();x.moveTo(wx+40,616);x.lineTo(wx+40,686);x.moveTo(wx,651);x.lineTo(wx+80,651);x.stroke();
           x.fillStyle=RED;x.beginPath();x.moveTo(wx-6,692);x.lineTo(wx+86,692);x.lineTo(wx+86,704);x.lineTo(wx-6,704);x.fill()}
         // candy canes
         const cane=(cx)=>{x.save();x.lineCap="butt";const p=()=>{x.beginPath();x.moveTo(cx,792);x.lineTo(cx,640);x.arc(cx+28,640,28,Math.PI,0);x.lineTo(cx+56,655)};
           x.strokeStyle=INK;x.lineWidth=20;p();x.stroke();x.strokeStyle=RED;x.lineWidth=20;x.setLineDash([13,17]);p();x.stroke();x.setLineDash([]);x.restore()};
         cane(215);cane(730);
         // gingerbread man
         x.save();x.translate(140,720);x.lineCap="round";x.strokeStyle="#a8683a";x.fillStyle="#a8683a";x.lineWidth=30;
         x.beginPath();x.moveTo(-40,-10);x.lineTo(40,-10);x.moveTo(-18,-5);x.lineTo(-30,60);x.moveTo(18,-5);x.lineTo(30,60);x.stroke();
         x.beginPath();x.ellipse(0,15,28,36,0,0,Math.PI*2);x.fill();circle(x,0,-52,34);x.fill();
         x.strokeStyle=INK;x.lineWidth=5;x.beginPath();x.moveTo(-50,-10);x.lineTo(-62,-10);x.moveTo(50,-10);x.lineTo(62,-10);x.moveTo(-30,68);x.lineTo(-36,74);x.moveTo(30,68);x.lineTo(36,74);x.stroke();
         x.fillStyle="#2a1810";circle(x,-11,-58,4);x.fill();circle(x,11,-58,4);x.fill();x.strokeStyle=INK;x.beginPath();x.arc(0,-48,12,.2,Math.PI-.2);x.stroke();
         x.fillStyle=RED;for(const by of [0,22]){circle(x,0,by,6);x.fill()}x.restore();
         snowPine(x,f,850,790,190);
         return 880;
       }},

      {motif:"疊成小山的紅、金、白禮物盒，繫著大蝴蝶結，周圍閃著金色星芒。", phrase:"感恩有您",
       colors:{paper:"#1a4d34",paper2:"#0b2c1d",gold:"#efc96f"},
       draw(x,f){
         const box=(a,b,w,h,col,rib)=>{
           x.fillStyle=col;x.fillRect(a,b,w,h);x.strokeStyle=f.gold;x.lineWidth=3.5;x.strokeRect(a,b,w,h);
           x.fillStyle="rgba(0,0,0,.14)";x.fillRect(a,b+h*.2,w,h*.04);
           x.fillStyle=col;x.fillRect(a-8,b,w+16,h*.2);x.strokeRect(a-8,b,w+16,h*.2);
           x.fillStyle=rib;x.fillRect(a+w/2-w*.07,b,w*.14,h);x.fillRect(a-8,b+h*.08,w+16,h*.05);
           x.strokeStyle="rgba(0,0,0,.25)";x.lineWidth=2;x.strokeRect(a+w/2-w*.07,b,w*.14,h)};
         stars(x,f,91,50,[80,200,920,800]);
         x.fillStyle=f.paper2;x.globalAlpha=.5;x.beginPath();x.ellipse(500,805,380,26,0,0,Math.PI*2);x.fill();x.globalAlpha=1;
         box(120,660,180,140,"#fff3dc","#d9332b");
         box(700,630,180,170,"#e8c46e","#c4302a");
         box(320,580,360,220,"#c4302a","#f0cb78");
         box(380,420,240,160,"#e8c46e","#2f8052");
         box(440,310,120,110,"#fff3dc","#d9332b");
         bow(x,f,500,308,.8,"#c4302a","#7a1410");
         bow(x,f,500,418,.9,"#2f8052","#154d2d");
         bow(x,f,500,578,1.1,"#f0cb78","#a8741f");
         bow(x,f,210,658,.65,"#d9332b","#7a1410");
         bow(x,f,790,628,.7,"#c4302a","#7a1410");
         for(const [a,b,s] of [[200,330,24],[820,360,22],[150,520,14],[870,520,14],[640,260,16],[360,250,14],[250,800-10,0]]){if(s){x.fillStyle=f.gold;spark(x,a,b,s);x.fill()}}
         holly(x,f,140,810,34,-.2);holly(x,f,860,810,34,Math.PI+.2);
         return 890;
       }},

      {motif:"平安夜的星空，大顆伯利恆金星照著白雪小屋、松樹與山丘。", phrase:"闔家平安",
       colors:{paper:"#15463a",paper2:"#092a22",gold:"#f0cc78"},
       draw(x,f){
         stars(x,f,101,90,[80,190,920,640]);
         // big star
         const g=x.createRadialGradient(500,330,10,500,330,230);g.addColorStop(0,"rgba(255,230,150,.6)");g.addColorStop(1,"rgba(255,230,150,0)");x.fillStyle=g;circle(x,500,330,230);x.fill();
         x.fillStyle=f.gold;x.beginPath();x.moveTo(500,170);x.quadraticCurveTo(505,325,640,330);x.quadraticCurveTo(505,335,500,490);x.quadraticCurveTo(495,335,360,330);x.quadraticCurveTo(495,325,500,170);x.fill();
         x.beginPath();x.moveTo(500,330);x.lineTo(590,240);x.lineTo(500,330);x.lineTo(590,420);x.lineTo(500,330);x.lineTo(410,420);x.lineTo(500,330);x.lineTo(410,240);x.closePath();x.globalAlpha=.7;x.fill();x.globalAlpha=1;
         x.fillStyle="#fff6d0";circle(x,500,330,16);x.fill();
         // hills
         x.fillStyle="#0f3b32";x.beginPath();x.moveTo(44,720);x.quadraticCurveTo(200,610,380,690);x.quadraticCurveTo(560,760,740,640);x.quadraticCurveTo(860,590,956,670);x.lineTo(956,960);x.lineTo(44,960);x.closePath();x.fill();
         x.strokeStyle=f.gold;x.lineWidth=2.5;x.globalAlpha=.7;x.stroke();x.globalAlpha=1;
         x.fillStyle=INK;x.globalAlpha=.9;x.beginPath();x.moveTo(44,745);x.quadraticCurveTo(200,640,380,712);x.quadraticCurveTo(560,780,740,665);x.quadraticCurveTo(860,615,956,690);x.lineTo(956,700);x.quadraticCurveTo(860,630,740,680);x.quadraticCurveTo(560,800,380,728);x.quadraticCurveTo(200,665,44,765);x.closePath();x.fill();x.globalAlpha=1;
         x.fillStyle=f.paper2;x.beginPath();x.moveTo(44,830);x.quadraticCurveTo(250,760,500,805);x.quadraticCurveTo(760,850,956,780);x.lineTo(956,960);x.lineTo(44,960);x.closePath();x.fill();
         x.strokeStyle=f.gold;x.lineWidth=2.5;x.globalAlpha=.7;x.stroke();x.globalAlpha=1;
         // cottage
         x.save();x.translate(690,545);
         x.fillStyle="#6b3a1c";x.fillRect(48,-90,26,60);x.fillStyle=INK;x.fillRect(44,-98,34,12);
         x.fillStyle="#f6e6c4";x.fillRect(-100,-20,200,100);x.strokeStyle=f.gold;x.lineWidth=3.5;x.strokeRect(-100,-20,200,100);
         x.fillStyle="#7a2a1c";x.beginPath();x.moveTo(-122,-14);x.lineTo(0,-110);x.lineTo(122,-14);x.closePath();x.fill();x.stroke();
         x.strokeStyle=INK;x.lineWidth=14;x.lineJoin="round";x.beginPath();x.moveTo(-122,-14);x.lineTo(0,-110);x.lineTo(122,-14);x.stroke();
         x.fillStyle="#ffcf5a";for(const wx of [-76,34]){x.fillRect(wx,10,42,38);x.strokeStyle="#7a2a1c";x.lineWidth=3;x.strokeRect(wx,10,42,38);x.beginPath();x.moveTo(wx+21,10);x.lineTo(wx+21,48);x.stroke()}
         x.fillStyle="#7a2a1c";x.beginPath();x.moveTo(-14,80);x.lineTo(-14,34);x.arc(0,34,14,Math.PI,0);x.lineTo(14,80);x.fill();
         const w=x.createRadialGradient(0,30,5,0,30,170);w.addColorStop(0,"rgba(255,207,90,.28)");w.addColorStop(1,"rgba(255,207,90,0)");x.fillStyle=w;circle(x,0,30,170);x.fill();
         x.restore();
         snowPine(x,f,180,780,230);snowPine(x,f,300,770,150);snowPine(x,f,880,770,120);snowPine(x,f,95,790,100);
         snow(x,f,102,24,[80,200,920,700]);
         return 885;
       }},

      {motif:"壁爐裡柴火熊熊，爐台上掛著松枝花環與蠟燭，爐邊堆著小禮物。", phrase:"溫暖團圓",
       colors:{paper:"#8a1d22",paper2:"#520c10",gold:"#f2cd7c"},
       draw(x,f){
         // wreath
         const wc=500,wy=268,wr=60;
         for(let i=0;i<30;i++){const a=i*2*Math.PI/30;x.save();x.translate(wc+Math.cos(a)*wr,wy+Math.sin(a)*wr);x.rotate(a+(i%2?.6:-.6));x.fillStyle=i%3?GRN:GRN2;x.beginPath();x.ellipse(0,0,13,28,0,0,Math.PI*2);x.fill();x.restore()}
         const r=rand(8);for(let i=0;i<10;i++){const a=r()*Math.PI*2;berry(x,wc+Math.cos(a)*wr,wy+Math.sin(a)*wr,7)}
         x.fillStyle=f.gold;star5(x,wc,wy,30,13);x.fill();
         // surround
         const sx=240,sw=520,top=360,bot=800;
         x.fillStyle="#d9c5a0";x.fillRect(sx,top,sw,bot-top);x.strokeStyle=f.gold;x.lineWidth=4;x.strokeRect(sx,top,sw,bot-top);
         x.strokeStyle="rgba(90,60,30,.35)";x.lineWidth=2;for(let row=0;row<9;row++){const y=top+row*49;x.beginPath();x.moveTo(sx,y);x.lineTo(sx+sw,y);x.stroke();
           for(let c=(row%2?0:1);c<7;c+=1){const bx=sx+c*80+(row%2?40:0);if(bx>sx&&bx<sx+sw){x.beginPath();x.moveTo(bx,y);x.lineTo(bx,y+49);x.stroke()}}}
         // firebox
         const fb=()=>{x.beginPath();x.moveTo(340,800);x.lineTo(340,590);x.arc(500,590,160,Math.PI,0);x.lineTo(660,800);x.closePath()};
         fb();x.fillStyle="#1d0d09";x.fill();x.save();fb();x.clip();
         const gl=x.createRadialGradient(500,760,10,500,720,260);gl.addColorStop(0,"rgba(255,170,60,.7)");gl.addColorStop(1,"rgba(255,120,40,0)");x.fillStyle=gl;x.fillRect(330,430,340,380);
         const fl=(cx,h,wd,c1,c2)=>{const g=x.createLinearGradient(0,790,0,790-h);g.addColorStop(0,c1);g.addColorStop(1,c2);x.fillStyle=g;x.beginPath();x.moveTo(cx-wd,790);x.bezierCurveTo(cx-wd*1.1,790-h*.45,cx-wd*.2,790-h*.55,cx,790-h);x.bezierCurveTo(cx+wd*.2,790-h*.55,cx+wd*1.1,790-h*.45,cx+wd,790);x.closePath();x.fill()};
         fl(430,170,56,"#e8501c","#ff9d2e");fl(570,190,60,"#e8501c","#ff9d2e");fl(500,250,76,"#ee6a20","#ffb347");fl(470,150,40,"#ffb347","#ffe27a");fl(535,170,40,"#ffb347","#ffe27a");fl(500,100,28,"#ffe27a","#fff6c8");
         x.restore();
         fb();x.strokeStyle=f.gold;x.lineWidth=6;x.stroke();
         // logs
         for(const [lx,ly,a] of [[450,785,.1],[550,785,-.1]]){x.save();x.translate(lx,ly);x.rotate(a);x.fillStyle="#6b3a1c";rr(x,-90,-16,180,32,16);x.fill();x.strokeStyle="#3a1d0c";x.lineWidth=3;x.stroke();x.fillStyle="#c9915a";x.beginPath();x.ellipse(86,0,8,15,0,0,Math.PI*2);x.fill();x.restore()}
         // mantel
         x.fillStyle="#b8864a";rr(x,190,330,620,44,8);x.fill();x.strokeStyle=f.gold;x.lineWidth=4;x.stroke();
         x.fillStyle="rgba(255,255,255,.2)";x.fillRect(200,336,600,6);
         // hearth
         x.fillStyle="#b8864a";rr(x,300,796,400,22,6);x.fill();x.stroke();
         // garland on mantel
         x.save();x.lineCap="round";x.strokeStyle="#2a7a4c";x.lineWidth=28;x.beginPath();x.moveTo(215,378);x.quadraticCurveTo(500,470,785,378);x.stroke();
         const rg=rand(3);for(let i=0;i<60;i++){const t=i/59,px=215+570*t,py=378+184*t*(1-t)*.98*1;const a=rg()*Math.PI*2;x.strokeStyle=i%3?GRN2:"#1c5a3a";x.lineWidth=4;x.beginPath();x.moveTo(px,py);x.lineTo(px+Math.cos(a)*18,py+Math.sin(a)*18);x.stroke()}x.restore();
         for(const t of [.15,.32,.5,.68,.85]){berry(x,215+570*t,378+184*t*(1-t)+12,8)}
         bow(x,f,500,455,.42,"#d9332b","#7a1410");
         // candles on mantel
         for(const cx of [270,730]){x.fillStyle="#fff3dc";rr(x,cx-17,262,34,68,4);x.fill();x.strokeStyle=f.gold;x.lineWidth=3;x.stroke();flame(x,cx,236,14)}
         holly(x,f,225,336,30,Math.PI*1.1);holly(x,f,775,336,30,-.1);
         // gifts at the side
         const gift=(a,b,w,h,c,rb)=>{x.fillStyle=c;x.fillRect(a,b,w,h);x.strokeStyle=f.gold;x.lineWidth=3;x.strokeRect(a,b,w,h);x.fillStyle=rb;x.fillRect(a+w/2-6,b,12,h);x.fillRect(a,b+h/2-6,w,12)};
         gift(105,700,100,100,"#2f8052","#f0cb78");gift(125,630,70,70,"#fff3dc","#d9332b");gift(795,720,100,80,"#e8c46e","#c4302a");
         return 905;
       }},
    ],
  });
})();
