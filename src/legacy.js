/* the first two designs per festival, kept from the original version */
const LEGACY = {
  spring(x,f){
    // 春聯 strips
    const strip=(sx,text)=>{x.fillStyle=f.paper2;x.fillRect(sx,215,84,690);x.strokeStyle=f.gold;x.lineWidth=3;x.strokeRect(sx+6,221,72,678);
      x.fillStyle=f.gold;x.font=`700 72px ${DISP}`;vText(x,text,sx+42,240,72,22)};
    strip(830,f.couplet[0]); strip(86,f.couplet[1]);
    lantern(x,f,330,190,330,120,"春");lantern(x,f,670,190,330,120,"喜");
    // 斗方
    x.save();x.translate(500,590);x.rotate(Math.PI/4);x.fillStyle=f.gold;x.fillRect(-150,-150,300,300);
    x.strokeStyle=f.paper2;x.lineWidth=4;x.strokeRect(-138,-138,276,276);x.restore();
    x.fillStyle=f.paper2;x.font=`700 230px ${DISP}`;x.textAlign="center";x.textBaseline="middle";x.fillText("福",500,600);
    return 880;
  },
  yuanxiao(x,f){
    stars(x,f,7,70,[70,190,930,940]);
    x.fillStyle=f.gold;x.globalAlpha=.9;circle(x,800,280,70);x.fill();x.globalAlpha=1;
    x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.moveTo(90,215);x.quadraticCurveTo(500,290,910,215);x.stroke();
    lantern(x,f,250,240,450,150,"元");lantern(x,f,500,255,540,200,"宵");lantern(x,f,750,240,450,150,"樂");
    return 870;
  },
  duanwu(x,f){
    // leaves
    x.save();x.fillStyle="#2f7a52";x.strokeStyle=f.gold;x.lineWidth=2;
    [[-0.5,250],[0.45,760]].forEach(([a,px])=>{x.save();x.translate(px,330);x.rotate(a);x.beginPath();x.ellipse(0,0,40,150,0,0,Math.PI*2);x.fill();x.stroke();x.beginPath();x.moveTo(0,-140);x.lineTo(0,140);x.stroke();x.restore()});
    x.restore();
    // 粽子
    x.save();const g=x.createLinearGradient(0,250,0,580);g.addColorStop(0,"#5aa572");g.addColorStop(1,"#2e6e48");x.fillStyle=g;
    x.beginPath();x.moveTo(500,240);x.quadraticCurveTo(520,250,680,560);x.quadraticCurveTo(500,600,320,560);x.quadraticCurveTo(480,250,500,240);x.closePath();x.fill();
    x.strokeStyle=f.gold;x.lineWidth=3;x.stroke();
    x.globalAlpha=.5;x.lineWidth=2;for(const dx of [-60,0,60]){x.beginPath();x.moveTo(500,250);x.quadraticCurveTo(500+dx*.6,420,500+dx*1.7,570);x.stroke()}
    x.globalAlpha=1;x.lineWidth=7;x.beginPath();x.moveTo(390,430);x.quadraticCurveTo(500,450,610,430);x.stroke();
    x.beginPath();x.moveTo(500,445);x.quadraticCurveTo(470,500,440,520);x.moveTo(500,445);x.quadraticCurveTo(530,500,560,520);x.stroke();x.restore();
    // phrase sits between
    // 龍舟
    x.save();x.fillStyle=f.paper2;x.strokeStyle=f.gold;x.lineWidth=3;
    x.beginPath();x.moveTo(200,740);x.quadraticCurveTo(180,700,215,690);x.quadraticCurveTo(500,770,770,720);
    x.quadraticCurveTo(800,700,790,660);x.quadraticCurveTo(820,620,850,650);x.quadraticCurveTo(830,660,835,690);x.quadraticCurveTo(820,760,760,780);
    x.quadraticCurveTo(480,810,240,780);x.closePath();x.fill();x.stroke();
    x.fillStyle=f.gold;circle(x,828,652,5);x.fill();
    for(let i=0;i<7;i++){const px=290+i*65;x.beginPath();x.moveTo(px,745);x.lineTo(px-35,815);x.stroke();circle(x,px+5,725,10);x.fill()}
    x.restore();
    // waves
    x.save();x.strokeStyle=f.gold;x.lineWidth=2.5;
    for(let row=0;row<3;row++){x.globalAlpha=.8-row*.2;for(let i=0;i<10;i++){const cx=100+i*90+(row%2)*45,cy=830+row*38;x.beginPath();x.arc(cx,cy,40,Math.PI*1.1,Math.PI*1.9);x.stroke()}}
    x.restore();
    return 650;
  },
  midautumn(x,f){
    stars(x,f,11,90,[70,190,930,950]);
    const g=x.createRadialGradient(470,450,30,500,480,270);g.addColorStop(0,"#fff0c2");g.addColorStop(.7,f.gold);g.addColorStop(1,"#d9a94a");
    x.fillStyle=g;circle(x,500,480,270);x.fill();
    x.fillStyle="rgba(150,100,30,.15)";[[420,390,40],[600,430,28],[560,560,50],[380,520,22]].forEach(([a,b,r])=>{circle(x,a,b,r);x.fill()});
    // 玉兔
    x.fillStyle=f.paper2;x.globalAlpha=.85;
    x.beginPath();x.ellipse(560,600,70,52,0,0,Math.PI*2);x.fill();circle(x,620,555,34);x.fill();
    x.beginPath();x.ellipse(612,495,11,42,-.25,0,Math.PI*2);x.fill();x.beginPath();x.ellipse(637,500,11,40,.2,0,Math.PI*2);x.fill();
    circle(x,495,615,18);x.fill();x.globalAlpha=1;
    cloud(x,f,300,720,1.3,f.paper);cloud(x,f,690,760,1.1,f.paper);
    // 桂花
    const r=rand(3);x.fillStyle=f.gold;for(let i=0;i<14;i++){const cx=130+r()*120,cy=230+r()*140;for(let k=0;k<4;k++){circle(x,cx+Math.cos(k*1.57)*5,cy+Math.sin(k*1.57)*5,4);x.fill()}}
    return 880;
  },
  chongyang(x,f){
    mountains(x,f,950,[
      {c:"#8a2a17",k:60,p:[[220,720],[420,800],[640,690],[940,780]]},
      {c:f.paper2,k:40,p:[[180,860],[400,800],[620,870],[820,810],[940,860]]}]);
    // 菊花
    const cx=500,cy=470;
    const petals=(n,len,w,col,rot)=>{x.fillStyle=col;x.strokeStyle=f.paper2;x.lineWidth=1.5;for(let i=0;i<n;i++){x.save();x.translate(cx,cy);x.rotate(rot+i*2*Math.PI/n);x.beginPath();x.ellipse(0,-len/2,w,len/2,0,0,Math.PI*2);x.fill();x.stroke();x.restore()}};
    petals(30,250,18,"#e9a93a",0);petals(24,190,16,f.gold,.1);petals(18,130,14,"#ffe3a0",.2);
    x.fillStyle=f.paper2;circle(x,cx,cy,72);x.fill();x.strokeStyle=f.gold;x.lineWidth=3;x.stroke();
    x.fillStyle=f.gold;x.font=`700 100px ${DISP}`;x.textAlign="center";x.textBaseline="middle";x.fillText("壽",cx,cy+4);
    // 茱萸
    x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.moveTo(890,210);x.quadraticCurveTo(800,240,760,320);x.stroke();
    x.fillStyle="#2f6b3f";[[820,240,.6],[790,280,-.4]].forEach(([a,b,r])=>{x.save();x.translate(a,b);x.rotate(r);x.beginPath();x.ellipse(0,0,14,34,0,0,Math.PI*2);x.fill();x.restore()});
    x.fillStyle="#e2391f";x.strokeStyle=f.gold;x.lineWidth=1.5;[[760,330],[778,345],[745,350],[765,365],[790,325],[750,312]].forEach(([a,b])=>{circle(x,a,b,11);x.fill();x.stroke()});
    return 900;
  },
  dongzhi(x,f){
    snow(x,f,5,26,[80,200,920,930]);
    // steam
    x.save();x.strokeStyle=INK;x.globalAlpha=.55;x.lineWidth=4;x.lineCap="round";
    for(const sx of [430,500,570]){x.beginPath();x.moveTo(sx,430);x.bezierCurveTo(sx-30,390,sx+30,350,sx,300);x.stroke()}x.restore();
    // 湯圓
    const balls=[[400,500,"#fff6ea"],[470,485,"#f7b6b6"],[540,488,"#fff6ea"],[610,502,"#f7b6b6"],[505,515,"#fff6ea"]];
    balls.forEach(([a,b,c])=>{x.fillStyle=c;circle(x,a,b,44);x.fill();x.fillStyle="rgba(255,255,255,.6)";circle(x,a-14,b-16,10);x.fill()});
    // bowl
    x.fillStyle=f.gold;x.beginPath();x.moveTo(270,530);x.lineTo(730,530);x.quadraticCurveTo(720,720,560,740);x.lineTo(440,740);x.quadraticCurveTo(280,720,270,530);x.closePath();x.fill();
    x.fillStyle=f.paper2;x.fillRect(420,740,160,24);
    x.strokeStyle=f.paper2;x.lineWidth=4;x.beginPath();x.moveTo(300,600);x.lineTo(700,600);x.stroke();
    x.fillStyle=f.paper2;x.font=`700 70px ${DISP}`;x.textAlign="center";x.textBaseline="middle";x.fillText("團　圓",500,660);
    x.strokeStyle=f.gold;x.lineWidth=4;x.beginPath();x.ellipse(500,530,232,24,0,0,Math.PI*2);x.stroke();
    return 880;
  },
  xmas(x,f){
    snow(x,f,9,30,[80,200,920,930]);
    x.fillStyle="#7a4a22";x.fillRect(470,740,60,70);
    const tiers=[[300,440,170],[400,560,230],[520,720,290]];
    tiers.forEach(([top,bot,w])=>{x.fillStyle="#2f8052";x.beginPath();x.moveTo(500,top-60);x.lineTo(500-w,bot);x.lineTo(500+w,bot);x.closePath();x.fill();x.strokeStyle=f.gold;x.lineWidth=3;x.stroke()});
    x.strokeStyle=f.gold;x.lineWidth=3;x.globalAlpha=.8;x.beginPath();x.moveTo(390,420);x.quadraticCurveTo(500,470,600,400);x.moveTo(330,560);x.quadraticCurveTo(500,620,660,530);x.moveTo(280,690);x.quadraticCurveTo(500,760,720,670);x.stroke();x.globalAlpha=1;
    [[440,380,"#d9332b"],[560,455,f.gold],[380,510,f.gold],[620,580,"#d9332b"],[470,600,"#d9332b"],[330,660,"#d9332b"],[560,680,f.gold],[680,700,"#d9332b"]].forEach(([a,b,c])=>{x.fillStyle=c;circle(x,a,b,15);x.fill()});
    // star
    x.fillStyle=f.gold;x.beginPath();for(let i=0;i<10;i++){const r=i%2?22:52,a=-Math.PI/2+i*Math.PI/5;x.lineTo(500+Math.cos(a)*r,232+Math.sin(a)*r)}x.closePath();x.fill();
    return 885;
  },
  newyear(x,f){
    stars(x,f,13,60,[70,190,930,940]);
    burst(x,f,250,330,130,18,f.gold);burst(x,f,760,300,110,16,"#ffd9a6");burst(x,f,800,700,90,14,f.gold);burst(x,f,210,690,80,12,"#ffd9a6");
    x.fillStyle=f.gold;x.font=`700 230px ${DISP}`;x.textAlign="center";x.textBaseline="middle";x.fillText(String(year),500,540);
    x.strokeStyle=f.gold;x.lineWidth=2;x.beginPath();x.moveTo(300,680);x.lineTo(700,680);x.stroke();
    return 870;
  },
  mother(x,f){
    // stems
    x.strokeStyle="#3f7a45";x.lineWidth=7;x.lineCap="round";
    [[360,400],[500,330],[640,400]].forEach(([a,b])=>{x.beginPath();x.moveTo(a,b+60);x.quadraticCurveTo((a+500)/2,600,500,790);x.stroke()});
    x.fillStyle="#3f7a45";[[420,620,-.7],[580,640,.7]].forEach(([a,b,r])=>{x.save();x.translate(a,b);x.rotate(r);x.beginPath();x.ellipse(0,0,12,60,0,0,Math.PI*2);x.fill();x.restore()});
    const carnation=(cx,cy,s,c1,c2)=>{
      for(let L=0;L<3;L++){x.fillStyle=L%2?c2:c1;x.beginPath();const w=(1-L*.2)*s,top=cy-s*.55+L*s*.18;
        x.moveTo(cx-w,cy+s*.2);for(let i=0;i<=14;i++){const px=cx-w+i*(2*w/14),py=top+Math.abs(i-7)*s*.035+(i%2?-s*.08:0);x.lineTo(px,py)}
        x.lineTo(cx+w,cy+s*.2);x.quadraticCurveTo(cx,cy+s*.5,cx-w,cy+s*.2);x.fill();x.strokeStyle="rgba(255,255,255,.35)";x.lineWidth=2;x.stroke()}
      x.fillStyle="#3f7a45";x.beginPath();x.moveTo(cx-s*.3,cy+s*.35);x.lineTo(cx+s*.3,cy+s*.35);x.lineTo(cx+s*.1,cy+s*.75);x.lineTo(cx-s*.1,cy+s*.75);x.closePath();x.fill()};
    carnation(360,370,105,"#f06a7c","#ffb3bd");carnation(640,370,105,"#f06a7c","#ffb3bd");carnation(500,300,125,"#e23a4f","#ff8a98");
    // ribbon
    x.fillStyle=f.gold;x.beginPath();x.ellipse(455,720,48,24,-.4,0,Math.PI*2);x.fill();x.beginPath();x.ellipse(545,720,48,24,.4,0,Math.PI*2);x.fill();
    circle(x,500,722,18);x.fill();x.beginPath();x.moveTo(490,735);x.lineTo(450,820);x.lineTo(475,815);x.lineTo(500,740);x.moveTo(510,735);x.lineTo(550,820);x.lineTo(525,815);x.lineTo(500,740);x.fill();
    return 885;
  },
  father(x,f){
    const g=x.createRadialGradient(560,420,10,560,420,170);g.addColorStop(0,"#ffe6a6");g.addColorStop(1,f.gold);x.fillStyle=g;circle(x,560,430,160);x.fill();
    x.strokeStyle=f.gold;x.lineWidth=3;x.globalAlpha=.5;for(let i=0;i<12;i++){const a=Math.PI+i*Math.PI/11;x.beginPath();x.moveTo(560+Math.cos(a)*190,430+Math.sin(a)*190);x.lineTo(560+Math.cos(a)*240,430+Math.sin(a)*240);x.stroke()}x.globalAlpha=1;
    mountains(x,f,950,[
      {c:"#6e2216",k:30,p:[[260,640],[470,520],[700,650],[940,560]]},
      {c:f.paper2,k:30,p:[[200,780],[420,700],[640,790],[860,720],[940,760]]}]);
    pine(x,f,200,820,300);
    return 900;
  },
};

/* ---------- second design per festival (換一張) ---------- */
function mum(x,f,cx,cy,R,inner){
  const petals=(n,len,w,col,rot)=>{x.fillStyle=col;x.strokeStyle=f.paper2;x.lineWidth=1.2;for(let i=0;i<n;i++){x.save();x.translate(cx,cy);x.rotate(rot+i*2*Math.PI/n);x.beginPath();x.ellipse(0,-len/2,w,len/2,0,0,Math.PI*2);x.fill();x.stroke();x.restore()}};
  petals(26,R,R*.075,"#e9a93a",0);petals(20,R*.75,R*.065,f.gold,.1);petals(14,R*.5,R*.06,"#ffe3a0",.2);
  x.fillStyle=inner||"#c9741f";circle(x,cx,cy,R*.18);x.fill();
}
function plum(x,cx,cy,r,col){
  x.fillStyle=col;for(let i=0;i<5;i++){const a=-Math.PI/2+i*2*Math.PI/5;circle(x,cx+Math.cos(a)*r*.62,cy+Math.sin(a)*r*.62,r*.5);x.fill()}
  x.fillStyle="#f2c75c";circle(x,cx,cy,r*.22);x.fill();
}
function branch(x,pts,w){
  x.save();x.strokeStyle="#4a2a1a";x.lineCap="round";x.lineWidth=w;x.beginPath();x.moveTo(pts[0][0],pts[0][1]);
  for(let i=1;i<pts.length;i++){const [a,b]=pts[i-1],[c,d]=pts[i];x.quadraticCurveTo((a+c)/2+12,(b+d)/2-12,c,d)}x.stroke();x.restore();
}
function scallop(x,cx,cy,r,n,amp){
  x.beginPath();for(let i=0;i<=n*8;i++){const a=i*2*Math.PI/(n*8),rr=r+amp*Math.abs(Math.sin(a*n/2));x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr)}x.closePath();
}
function heart(x,cx,cy,s){
  x.beginPath();x.moveTo(cx,cy+s*.9);x.bezierCurveTo(cx-s*1.3,cy+s*.1,cx-s*.9,cy-s*.95,cx,cy-s*.4);
  x.bezierCurveTo(cx+s*.9,cy-s*.95,cx+s*1.3,cy+s*.1,cx,cy+s*.9);x.closePath();
}
function bigChar(x,ch,cx,cy,size,col){x.fillStyle=col;x.font=`700 ${size}px ${DISP}`;x.textAlign="center";x.textBaseline="middle";x.fillText(ch,cx,cy)}

Object.assign(LEGACY,{
  chongyang2(x,f){
    x.fillStyle="#ffe3a0";x.globalAlpha=.9;circle(x,260,300,70);x.fill();x.globalAlpha=1;
    x.strokeStyle=f.gold;x.lineWidth=3;[[600,260],[660,300],[720,250],[780,290]].forEach(([a,b])=>{x.beginPath();x.moveTo(a-22,b-10);x.lineTo(a,b);x.lineTo(a+22,b-10);x.stroke()});
    mountains(x,f,950,[
      {c:"#8a2a17",k:30,p:[[300,620],[500,400],[700,620],[940,700]]},
      {c:f.paper2,k:30,p:[[220,800],[440,760],[640,820],[860,760],[940,800]]}]);
    // 涼亭 on the peak
    x.fillStyle=f.gold;x.beginPath();x.moveTo(430,395);x.quadraticCurveTo(500,330,570,395);x.quadraticCurveTo(500,378,430,395);x.fill();
    x.fillRect(470,392,8,40);x.fillRect(522,392,8,40);x.fillRect(460,428,80,6);
    mum(x,f,190,800,120);mum(x,f,810,800,120);mum(x,f,330,850,90);
    return 600;
  },
  dongzhi2(x,f){
    x.fillStyle=f.paper2;circle(x,500,510,290);x.fill();
    x.strokeStyle=f.gold;x.lineWidth=6;circle(x,500,510,290);x.stroke();x.lineWidth=2;circle(x,500,510,272);x.stroke();
    x.save();circle(x,500,510,270);x.clip();
    snow(x,f,21,22,[230,240,770,780]);
    branch(x,[[230,700],[360,600],[450,520],[600,420],[760,330]],12);branch(x,[[450,520],[520,600],[640,640]],7);branch(x,[[600,420],[620,330]],6);
    [[360,600],[430,545],[520,470],[600,420],[690,370],[760,330],[520,600],[640,640],[620,330],[400,640]].forEach(([a,b],i)=>plum(x,a,b,i%3?24:30,i%2?"#ffd0d4":"#ff8a96"));
    x.restore();
    return 880;
  },
  xmas2(x,f){
    snow(x,f,31,26,[80,200,920,930]);
    const cx=500,cy=510,R=230;
    for(let i=0;i<48;i++){const a=i*2*Math.PI/48;x.save();x.translate(cx+Math.cos(a)*R,cy+Math.sin(a)*R);x.rotate(a+(i%2?.6:-.6));
      x.fillStyle=i%3?"#2f8052":"#3f9a62";x.beginPath();x.ellipse(0,0,22,46,0,0,Math.PI*2);x.fill();x.restore()}
    const r=rand(4);for(let i=0;i<16;i++){const a=r()*Math.PI*2;x.fillStyle="#d9332b";circle(x,cx+Math.cos(a)*R,cy+Math.sin(a)*R,11);x.fill()}
    x.fillStyle="#d9332b";x.beginPath();x.ellipse(cx-50,cy+R,55,30,-.3,0,Math.PI*2);x.fill();x.beginPath();x.ellipse(cx+50,cy+R,55,30,.3,0,Math.PI*2);x.fill();
    circle(x,cx,cy+R,20);x.fill();x.beginPath();x.moveTo(cx-10,cy+R+10);x.lineTo(cx-45,cy+R+100);x.lineTo(cx-20,cy+R+95);x.lineTo(cx,cy+R+20);x.moveTo(cx+10,cy+R+10);x.lineTo(cx+45,cy+R+100);x.lineTo(cx+20,cy+R+95);x.lineTo(cx,cy+R+20);x.fill();
    bigChar(x,"安",cx,cy,210,f.gold);
    return 885;
  },
  newyear2(x,f){
    bigChar(x,String(year),500,300,170,f.gold);
    const hy=700;
    x.save();x.beginPath();x.rect(44,0,W-88,hy);x.clip();
    x.strokeStyle=f.gold;x.lineWidth=3;x.globalAlpha=.5;for(let i=0;i<13;i++){const a=Math.PI+i*Math.PI/12;x.beginPath();x.moveTo(500+Math.cos(a)*250,hy+Math.sin(a)*250);x.lineTo(500+Math.cos(a)*310,hy+Math.sin(a)*310);x.stroke()}x.globalAlpha=1;
    const g=x.createRadialGradient(500,hy,20,500,hy,220);g.addColorStop(0,"#fff0c2");g.addColorStop(1,f.gold);x.fillStyle=g;circle(x,500,hy,220);x.fill();x.restore();
    cloud(x,f,230,560,1.1,f.paper);cloud(x,f,780,600,.9,f.paper);
    x.strokeStyle=f.gold;x.lineWidth=2.5;for(let row=0;row<5;row++){x.globalAlpha=.9-row*.12;for(let i=0;i<12;i++){const cx=60+i*80+(row%2)*40,cy=hy+20+row*40;x.beginPath();x.arc(cx,cy,34,Math.PI*1.1,Math.PI*1.9);x.stroke()}}x.globalAlpha=1;
    return 920;
  },
  spring2(x,f){
    const o=occ(f);
    branch(x,[[60,250],[180,300],[300,280],[400,330]],10);branch(x,[[180,300],[230,380]],6);
    [[180,300],[300,280],[400,330],[230,380],[260,250]].forEach(([a,b],i)=>plum(x,a,b,i%2?20:26,i%2?"#ffd0d4":"#ffffff"));
    const cracker=(sx,sy,tilt)=>{for(let i=0;i<9;i++){const px=sx+i*tilt,py=sy+i*58;x.save();x.translate(px,py);x.rotate(i%2?.22:-.22);
      x.fillStyle="#e2231a";x.fillRect(-18,-24,36,48);x.fillStyle=f.gold;x.fillRect(-18,-24,36,7);x.fillRect(-18,17,36,7);x.restore()}
      x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.moveTo(sx,sy-80);x.lineTo(sx+8*tilt,sy+8*58);x.stroke()};
    cracker(820,290,-2);
    x.fillStyle=f.gold;scallop(x,500,520,230,12,22);x.fill();
    x.fillStyle=f.paper2;circle(x,500,520,195);x.fill();x.strokeStyle=f.gold;x.lineWidth=3;circle(x,500,520,180);x.stroke();
    bigChar(x,o.zodiac,500,530,250,f.gold);
    x.fillStyle=f.gold;x.font=`700 40px ${DISP}`;x.textAlign="center";x.fillText(`${o.gz}年`,500,810);
    return 880;
  },
  yuanxiao2(x,f){
    stars(x,f,17,80,[70,190,930,940]);
    burst(x,f,200,330,110,16,f.gold);burst(x,f,800,380,95,14,"#ffd9a6");burst(x,f,780,720,70,12,f.gold);burst(x,f,220,700,80,12,"#ffd9a6");
    lantern(x,f,500,190,470,330,"圓");
    return 880;
  },
  mother2(x,f){
    const r=rand(8);
    for(let i=0;i<22;i++){const a=i*2*Math.PI/22,rr=300+r()*30;plum(x,500+Math.cos(a)*rr,510+Math.sin(a)*rr*.95,14+r()*10,i%2?"#ffb3bd":"#ff8a98")}
    const g=x.createLinearGradient(0,280,0,760);g.addColorStop(0,"#ff8a98");g.addColorStop(1,"#d93a52");x.fillStyle=g;heart(x,500,500,240);x.fill();
    x.strokeStyle=f.gold;x.lineWidth=5;x.stroke();x.lineWidth=2;heart(x,500,505,215);x.stroke();
    bigChar(x,"愛",500,500,200,"#fff3dc");
    return 885;
  },
  duanwu2(x,f){
    const leafs=(cx,dir)=>{for(let i=0;i<5;i++){x.save();x.translate(cx,560);x.rotate(dir*(.15+i*.09));x.fillStyle=i%2?"#3f8a5c":"#2f6b48";x.beginPath();x.ellipse(0,-150,14,250,0,0,Math.PI*2);x.fill();x.restore()}
      x.fillStyle="#e2231a";x.fillRect(cx-28,620,56,26)};
    leafs(210,-1);leafs(790,1);
    x.strokeStyle=f.gold;x.lineWidth=3;x.beginPath();x.moveTo(500,200);x.lineTo(500,330);x.stroke();
    x.fillStyle=f.gold;circle(x,500,320,14);x.fill();
    const g=x.createLinearGradient(0,330,0,700);g.addColorStop(0,"#e2463a");g.addColorStop(1,"#a8180f");x.fillStyle=g;heart(x,500,520,200);x.fill();
    x.strokeStyle=f.gold;x.lineWidth=5;x.stroke();x.setLineDash([8,8]);x.lineWidth=2;heart(x,500,525,175);x.stroke();x.setLineDash([]);
    bigChar(x,"安",500,520,170,f.gold);
    x.strokeStyle=f.gold;x.lineWidth=2;for(let i=-4;i<=4;i++){x.beginPath();x.moveTo(500+i*3,700);x.lineTo(500+i*6,800);x.stroke()}
    x.fillStyle=f.gold;x.fillRect(486,694,28,14);
    return 870;
  },
  father2(x,f){
    branch(x,[[940,230],[800,270],[680,250]],12);
    [[800,270],[700,250],[860,240]].forEach(([a,b])=>{x.strokeStyle="#3f7a45";x.lineWidth=3;for(let k=0;k<12;k++){const ang=k*Math.PI/6;x.beginPath();x.moveTo(a,b);x.lineTo(a+Math.cos(ang)*36,b+Math.sin(ang)*36);x.stroke()}});
    // steam
    x.save();x.strokeStyle="#fff3dc";x.globalAlpha=.55;x.lineWidth=4;x.lineCap="round";for(const sx of [380,440]){x.beginPath();x.moveTo(sx,430);x.bezierCurveTo(sx-30,390,sx+30,350,sx,300);x.stroke()}
    for(const sx of [700]){x.beginPath();x.moveTo(sx,610);x.bezierCurveTo(sx-25,580,sx+25,550,sx,510);x.stroke()}x.restore();
    // teapot
    x.fillStyle=f.gold;x.strokeStyle=f.paper2;x.lineWidth=3;
    x.beginPath();x.moveTo(530,560);x.quadraticCurveTo(620,540,640,470);x.lineTo(660,478);x.quadraticCurveTo(650,580,540,620);x.closePath();x.fill();
    x.lineWidth=14;x.strokeStyle=f.gold;x.beginPath();x.arc(275,575,65,Math.PI*.55,Math.PI*1.45);x.stroke();
    x.beginPath();x.ellipse(410,580,150,115,0,0,Math.PI*2);x.fill();
    x.fillStyle="#d9a94a";x.beginPath();x.ellipse(410,470,70,18,0,0,Math.PI*2);x.fill();x.fillStyle=f.gold;circle(x,410,452,14);x.fill();
    x.strokeStyle=f.paper2;x.lineWidth=3;x.beginPath();x.ellipse(410,580,110,80,0,0,Math.PI*2);x.stroke();
    bigChar(x,"德",410,585,110,f.paper2);
    // cup
    x.fillStyle=f.gold;x.beginPath();x.moveTo(640,620);x.lineTo(760,620);x.lineTo(740,700);x.lineTo(660,700);x.closePath();x.fill();
    x.fillStyle="#d9a94a";x.beginPath();x.ellipse(700,620,60,12,0,0,Math.PI*2);x.fill();
    x.fillStyle=f.paper2;x.fillRect(240,700,560,14);
    return 880;
  },
  midautumn2(x,f){
    stars(x,f,23,80,[70,190,930,950]);
    x.fillStyle="#fff0c2";circle(x,800,280,70);x.fill();
    branch(x,[[60,230],[190,280],[300,260]],9);const r=rand(6);x.fillStyle=f.gold;for(let i=0;i<16;i++){const cx=110+r()*200,cy=230+r()*110;for(let k=0;k<4;k++){circle(x,cx+Math.cos(k*1.57)*5,cy+Math.sin(k*1.57)*5,4);x.fill()}}
    x.fillStyle="#c98a3a";scallop(x,500,540,240,16,20);x.fill();x.strokeStyle="#8a5420";x.lineWidth=4;x.stroke();
    x.fillStyle="#d99b4a";circle(x,500,540,190);x.fill();x.strokeStyle="#8a5420";x.lineWidth=4;circle(x,500,540,175);x.stroke();
    x.lineWidth=2;for(let i=0;i<8;i++){const a=i*Math.PI/4;x.beginPath();x.arc(500+Math.cos(a)*150,540+Math.sin(a)*150,18,0,Math.PI*2);x.stroke()}
    bigChar(x,"團圓",500,545,110,"#8a5420");
    return 880;
  },
});
