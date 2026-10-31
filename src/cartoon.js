
/* ---------- cartoon designs ---------- */
// Cute, bright pictures with smiling faces and thick outlines. A cartoon design draws a pastel scene in the
// picture area, then the same dark veil (behind the title) and fade (behind the phrase) as the photo designs.
let OUT = "#3d2622";
// draw cartoon shapes as gold line art (traditional designs): outline in f.gold, no faces
function goldLine(f, fn){const o = OUT; OUT = f.gold; try{fn()} finally {OUT = o}}
function ink(x, fill, lw){x.fillStyle = fill; x.fill(); x.lineWidth = lw || 6; x.strokeStyle = OUT; x.lineJoin = "round"; x.lineCap = "round"; x.stroke()}
// rounded polygon path
function rpoly(x, pts, r){const n = pts.length, a = pts[n-1], b = pts[0]; x.beginPath(); x.moveTo((a[0]+b[0])/2, (a[1]+b[1])/2);
  for(let i = 0; i < n; i++){const p = pts[i], q = pts[(i+1)%n]; x.arcTo(p[0], p[1], q[0], q[1], r)} x.closePath()}
// several circles drawn as one shape with a single outline: [[cx,cy,r],...]
function union(x, cs, fill, lw){x.save(); x.lineWidth = (lw || 6) * 2; x.strokeStyle = OUT;
  for(const [cx, cy, r] of cs){circle(x, cx, cy, r); x.stroke()} x.fillStyle = fill; for(const [cx, cy, r] of cs){circle(x, cx, cy, r); x.fill()} x.restore()}
// smiling face; s is about half the face width. o: {happy: ^ ^ eyes, open: open mouth, blush: false}
function face(x, cx, cy, s, o = {}){
  x.save(); const ey = cy - s*.1, ex = s*.38; x.lineCap = "round";
  if(o.happy){x.strokeStyle = OUT; x.lineWidth = Math.max(3, s*.09);
    for(const k of [-1, 1]){x.beginPath(); x.arc(cx + k*ex, ey + s*.08, s*.13, Math.PI*1.1, Math.PI*1.9); x.stroke()}}
  else for(const k of [-1, 1]){x.fillStyle = OUT; x.beginPath(); x.ellipse(cx + k*ex, ey, s*.1, s*.13, 0, 0, Math.PI*2); x.fill();
    x.fillStyle = "#fff"; circle(x, cx + k*ex + s*.035, ey - s*.05, s*.04); x.fill()}
  if(o.blush !== false){x.fillStyle = "rgba(255,105,120,.55)"; for(const k of [-1, 1]){x.beginPath(); x.ellipse(cx + k*s*.64, cy + s*.13, s*.15, s*.09, 0, 0, Math.PI*2); x.fill()}}
  x.strokeStyle = OUT; x.lineWidth = Math.max(3, s*.08); x.beginPath();
  if(o.open){x.fillStyle = "#c8333a"; x.moveTo(cx - s*.17, cy + s*.08); x.arc(cx, cy + s*.08, s*.17, Math.PI, 0, true); x.closePath(); x.fill(); x.stroke()}
  else {x.arc(cx, cy + s*.06, s*.17, Math.PI*.15, Math.PI*.85); x.stroke()}
  x.restore();
}
function sparkle4(x, cx, cy, s, fill){x.beginPath(); x.moveTo(cx, cy - s); x.quadraticCurveTo(cx, cy, cx + s, cy); x.quadraticCurveTo(cx, cy, cx, cy + s);
  x.quadraticCurveTo(cx, cy, cx - s, cy); x.quadraticCurveTo(cx, cy, cx, cy - s); x.fillStyle = fill; x.fill()}
const CT = {
  ball(x, cx, cy, r, fill, fc){circle(x, cx, cy, r); ink(x, fill); if(fc !== false) face(x, cx, cy + r*.05, r*.7, fc || {})},
  box(x, cx, cy, w, h, fill, fc){x.beginPath(); x.roundRect(cx - w/2, cy - h/2, w, h, Math.min(w, h)*.16); ink(x, fill); if(fc !== false) face(x, cx, cy + h*.1, Math.min(w, h)*.36, fc || {})},
  tri(x, cx, cy, w, h, fill, fc){rpoly(x, [[cx, cy - h/2], [cx + w/2, cy + h/2], [cx - w/2, cy + h/2]], Math.min(w, h)*.14); ink(x, fill); if(fc !== false) face(x, cx, cy + h*.2, w*.22, fc || {})},
  heart(x, cx, cy, s, fill, fc){x.beginPath(); x.moveTo(cx, cy + s*.9); x.bezierCurveTo(cx - s*1.5, cy, cx - s*.9, cy - s*1.15, cx, cy - s*.45);
    x.bezierCurveTo(cx + s*.9, cy - s*1.15, cx + s*1.5, cy, cx, cy + s*.9); x.closePath(); ink(x, fill); if(fc !== false) face(x, cx, cy - s*.02, s*.5, fc || {})},
  star(x, cx, cy, R, fill, fc){const p = []; for(let i = 0; i < 10; i++){const a = -Math.PI/2 + i*Math.PI/5, r = i%2 ? R*.5 : R; p.push([cx + Math.cos(a)*r, cy + Math.sin(a)*r])}
    rpoly(x, p, R*.1); ink(x, fill); if(fc !== false) face(x, cx, cy + R*.08, R*.42, fc || {})},
  // egg with zigzag and dot bands
  egg(x, cx, cy, w, h, fill, bands, fc){
    const path = () => {x.beginPath(); x.moveTo(cx, cy - h/2); x.bezierCurveTo(cx + w*.62, cy - h/2, cx + w*.55, cy + h/2, cx, cy + h/2); x.bezierCurveTo(cx - w*.55, cy + h/2, cx - w*.62, cy - h/2, cx, cy - h/2); x.closePath()};
    path(); x.fillStyle = fill; x.fill();
    x.save(); path(); x.clip();
    (bands || []).forEach(([yy, col, kind], i) => {const y = cy + yy*h; x.fillStyle = col; x.strokeStyle = col; x.lineWidth = h*.035;
      if(kind === "dots") for(let k = -3; k <= 3; k++){circle(x, cx + k*w*.17, y, h*.035); x.fill()}
      else {x.beginPath(); for(let k = -6; k <= 6; k++) x.lineTo(cx + k*w*.09, y + (k%2 ? -1 : 1)*h*.035); x.stroke()}});
    x.restore(); path(); x.fillStyle = "rgba(0,0,0,0)"; ink(x, "rgba(0,0,0,0)");
    if(fc !== false) face(x, cx, cy + h*.05, w*.3, fc || {})},
  pumpkin(x, cx, cy, r, fill, fc){
    x.fillStyle = "#4f8a3a"; x.beginPath(); x.roundRect(cx - r*.09, cy - r*1.05, r*.18, r*.35, r*.06); ink(x, "#5b8c3a");
    for(const [dx, w] of [[-.48, .55], [.48, .55], [0, .6]]){x.beginPath(); x.ellipse(cx + dx*r, cy, w*r, r*.82, 0, 0, Math.PI*2); ink(x, fill)}
    if(fc !== false) face(x, cx, cy + r*.08, r*.5, fc || {})},
  ghost(x, cx, cy, s, fill, fc){x.beginPath(); x.moveTo(cx - s, cy + s*.9); x.lineTo(cx - s, cy); x.arc(cx, cy, s, Math.PI, 0);
    x.lineTo(cx + s, cy + s*.9); for(let i = 0; i < 4; i++){const x0 = cx + s - i*s/2; x.quadraticCurveTo(x0 - s/8, cy + s*1.15, x0 - s/4, cy + s*.95); x.quadraticCurveTo(x0 - s*3/8, cy + s*.75, x0 - s/2, cy + s*.9)}
    x.closePath(); ink(x, fill || "#fbfbff"); if(fc !== false) face(x, cx, cy + s*.05, s*.55, fc || {})},
  sun(x, cx, cy, r, fill, fc){x.save(); x.fillStyle = "#ffcc33"; for(let i = 0; i < 12; i++){const a = i*Math.PI/6; rpoly(x, [[cx + Math.cos(a - .13)*r*1.08, cy + Math.sin(a - .13)*r*1.08], [cx + Math.cos(a)*r*1.5, cy + Math.sin(a)*r*1.5], [cx + Math.cos(a + .13)*r*1.08, cy + Math.sin(a + .13)*r*1.08]], 6); ink(x, "#ffb52e", 5)}
    x.restore(); CT.ball(x, cx, cy, r, fill || "#ffd84a", fc)},
  cloud(x, cx, cy, s, fill){union(x, [[cx - s*.55, cy + s*.1, s*.42], [cx, cy - s*.15, s*.55], [cx + s*.55, cy + s*.1, s*.42], [cx, cy + s*.18, s*.45]], fill || "#fff", 5)},
  flower(x, cx, cy, r, petal, center, fc, n){n = n || 6; for(let i = 0; i < n; i++){const a = i*2*Math.PI/n; circle(x, cx + Math.cos(a)*r*.72, cy + Math.sin(a)*r*.72, r*.48); ink(x, petal, 5)}
    CT.ball(x, cx, cy, r*.55, center || "#ffd84a", fc === undefined ? false : fc)},
  // chrysanthemum / carnation style: many thin petals
  mum(x, cx, cy, r, petal, fc){for(let k = 0; k < 2; k++) for(let i = 0; i < 16; i++){const a = i*Math.PI/8 + k*Math.PI/16, rr = r*(k ? .7 : 1);
      x.save(); x.translate(cx, cy); x.rotate(a); x.beginPath(); x.ellipse(rr*.55, 0, rr*.48, rr*.14, 0, 0, Math.PI*2); ink(x, petal, 4); x.restore()}
    CT.ball(x, cx, cy, r*.36, "#ffb347", fc === undefined ? false : fc)},
  leaf(x, cx, cy, len, ang, fill){x.save(); x.translate(cx, cy); x.rotate(ang); x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(len*.5, -len*.32, len, 0); x.quadraticCurveTo(len*.5, len*.32, 0, 0); ink(x, fill || "#6cc070", 5); x.restore()},
  maple(x, cx, cy, s, fill, rot, fc){const P = [[0,-1],[.18,-.55],[.45,-.7],[.38,-.3],[.9,-.4],[.7,-.05],[.95,.15],[.45,.3],[.5,.55],[.08,.45],[0,.95],[-.08,.45],[-.5,.55],[-.45,.3],[-.95,.15],[-.7,-.05],[-.9,-.4],[-.38,-.3],[-.45,-.7],[-.18,-.55]];
    x.save(); x.translate(cx, cy); x.rotate(rot || 0); rpoly(x, P.map(([a, b]) => [a*s, b*s]), s*.05); ink(x, fill, 5); if(fc) face(x, 0, s*.05, s*.32, fc); x.restore()},
  lantern(x, cx, cy, s, fill, ch, fc){x.save(); x.strokeStyle = OUT; x.lineWidth = 4; x.beginPath(); x.moveTo(cx, cy - s*1.3); x.lineTo(cx, cy - s*.8); x.stroke();
    x.beginPath(); x.roundRect(cx - s*.35, cy - s*.85, s*.7, s*.2, 6); ink(x, "#ffcf4a", 4); x.beginPath(); x.roundRect(cx - s*.35, cy + s*.65, s*.7, s*.2, 6); ink(x, "#ffcf4a", 4);
    x.beginPath(); x.ellipse(cx, cy, s*.8, s*.72, 0, 0, Math.PI*2); ink(x, fill || "#ef4b3c");
    x.strokeStyle = "rgba(0,0,0,.18)"; x.lineWidth = 3; x.beginPath(); x.ellipse(cx, cy, s*.4, s*.72, 0, 0, Math.PI*2); x.stroke();
    for(let i = -2; i <= 2; i++){x.strokeStyle = "#ffcf4a"; x.lineWidth = 4; x.beginPath(); x.moveTo(cx + i*s*.08, cy + s*.85); x.lineTo(cx + i*s*.1, cy + s*1.2); x.stroke()}
    if(ch){x.fillStyle = "#ffe08a"; x.font = `700 ${Math.round(s*.6)}px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(ch, cx, cy + s*.04)}
    else if(fc !== false) face(x, cx, cy + s*.05, s*.5, fc || {});
    x.restore()},
  gift(x, cx, cy, w, h, fill, rib, fc){CT.box(x, cx, cy, w, h, fill, false); x.fillStyle = rib; x.fillRect(cx - w*.08, cy - h/2 + 3, w*.16, h - 6);
    x.beginPath(); x.roundRect(cx - w*.08, cy - h/2, w*.16, h, 4); x.lineWidth = 4; x.strokeStyle = OUT; x.stroke();
    for(const k of [-1, 1]){x.beginPath(); x.ellipse(cx + k*w*.17, cy - h/2 - h*.1, w*.17, h*.12, k*.5, 0, Math.PI*2); ink(x, rib, 5)} CT.ball(x, cx, cy - h/2 - h*.06, w*.07, rib, false);
    if(fc !== false) face(x, cx - w*.3, cy + h*.1, w*.14, fc || {})},
  balloon(x, cx, cy, r, fill){x.strokeStyle = OUT; x.lineWidth = 3; x.beginPath(); x.moveTo(cx, cy + r*1.15); x.bezierCurveTo(cx - r*.3, cy + r*1.6, cx + r*.3, cy + r*2, cx, cy + r*2.6); x.stroke();
    x.beginPath(); x.ellipse(cx, cy, r*.85, r, 0, 0, Math.PI*2); ink(x, fill, 5); x.fillStyle = "rgba(255,255,255,.6)"; x.beginPath(); x.ellipse(cx - r*.35, cy - r*.4, r*.14, r*.24, .5, 0, Math.PI*2); x.fill()},
  candy(x, cx, cy, r, fill, rot){x.save(); x.translate(cx, cy); x.rotate(rot || 0); for(const k of [-1, 1]){rpoly(x, [[k*r*.8, 0], [k*r*1.6, -r*.6], [k*r*1.6, r*.6]], 6); ink(x, fill, 4)}
    circle(x, 0, 0, r); ink(x, fill, 5); x.strokeStyle = "rgba(255,255,255,.7)"; x.lineWidth = r*.18; x.beginPath(); x.arc(0, 0, r*.55, -2.6, -1.2); x.stroke(); x.restore()},
  bunny(x, cx, cy, s, fill, fc){for(const k of [-1, 1]){x.beginPath(); x.ellipse(cx + k*s*.4, cy - s*1.1, s*.24, s*.62, k*.15, 0, Math.PI*2); ink(x, fill); x.fillStyle = "#ffb6c8"; x.beginPath(); x.ellipse(cx + k*s*.4, cy - s*1.05, s*.11, s*.44, k*.15, 0, Math.PI*2); x.fill()}
    CT.ball(x, cx, cy, s, fill, fc)},
  bear(x, cx, cy, s, fill, fc){for(const k of [-1, 1]){circle(x, cx + k*s*.72, cy - s*.72, s*.32); ink(x, fill)} circle(x, cx, cy, s); ink(x, fill);
    x.beginPath(); x.ellipse(cx, cy + s*.32, s*.38, s*.28, 0, 0, Math.PI*2); x.fillStyle = "rgba(255,240,220,.85)"; x.fill(); face(x, cx, cy + s*.05, s*.62, fc || {})},
  cat(x, cx, cy, s, fill, fc){for(const k of [-1, 1]){rpoly(x, [[cx + k*s*.95, cy - s*1.05], [cx + k*s*.85, cy - s*.2], [cx + k*s*.2, cy - s*.75]], 8); ink(x, fill)}
    CT.ball(x, cx, cy, s, fill, fc); x.strokeStyle = OUT; x.lineWidth = 3; for(const k of [-1, 1]) for(const d of [-.08, .08]){x.beginPath(); x.moveTo(cx + k*s*.55, cy + s*.15 + d*s); x.lineTo(cx + k*s*1.1, cy + s*.1 + d*s*2.2); x.stroke()}},
  chick(x, cx, cy, s, fc){x.save(); x.strokeStyle = OUT; x.lineWidth = 5; for(const d of [-.15, 0, .15]){x.beginPath(); x.moveTo(cx, cy - s*.95); x.quadraticCurveTo(cx + d*s*2, cy - s*1.35, cx + d*s*2.4, cy - s*1.2); x.stroke()} x.restore();
    CT.ball(x, cx, cy, s, "#ffe066", Object.assign({blush: true}, fc || {})); x.beginPath(); x.ellipse(cx + s*.95, cy + s*.15, s*.28, s*.18, -.4, 0, Math.PI*2); ink(x, "#ffd23f", 4);
    rpoly(x, [[cx - s*.12, cy + s*.18], [cx + s*.12, cy + s*.18], [cx, cy + s*.36]], 4); ink(x, "#ff9f1c", 3)},
  snowman(x, cx, cy, s, fc){CT.ball(x, cx, cy + s*1.15, s*1.2, "#ffffff", false); CT.ball(x, cx, cy, s*.85, "#ffffff", fc || {});
    x.beginPath(); x.roundRect(cx - s*.8, cy + s*.6, s*1.6, s*.3, 10); ink(x, "#e64545", 5); x.beginPath(); x.roundRect(cx + s*.3, cy + s*.7, s*.3, s*.75, 8); ink(x, "#e64545", 5);
    x.beginPath(); x.roundRect(cx - s*.75, cy - s*.85, s*1.5, s*.2, 6); ink(x, "#3b3f6b", 5); x.beginPath(); x.roundRect(cx - s*.5, cy - s*1.5, s, s*.7, 8); ink(x, "#3b3f6b", 5);
    rpoly(x, [[cx, cy + s*.12], [cx + s*.45, cy + s*.2], [cx, cy + s*.28]], 4); ink(x, "#ff8c1a", 3);
    for(const d of [.9, 1.25, 1.6]){x.fillStyle = OUT; circle(x, cx, cy + s*d, s*.08); x.fill()}},
  xtree(x, cx, base, s, fc){x.beginPath(); x.roundRect(cx - s*.14, base - s*.3, s*.28, s*.3, 6); ink(x, "#8b5a2b", 5);
    [[.25, 1.0], [.65, .8], [1.02, .6]].forEach(([y, w]) => CT.tri(x, cx, base - s*y - s*.25, s*w*1.2, s*.65, "#3fae5a", false));
    CT.star(x, cx, base - s*1.55, s*.2, "#ffd84a", false); face(x, cx, base - s*.48, s*.26, fc || {});
    ["#ff5a5a", "#5ab0ff", "#ffd84a", "#ff8fd0"].forEach((c, i) => {circle(x, cx + [-.42, .4, -.22, .25][i]*s, base - [.35, .4, .82, .95][i]*s, s*.07); ink(x, c, 3)})},
  turkey(x, cx, cy, s, fc){const cols = ["#e8553a", "#f39c32", "#f7c948", "#8fbf4a", "#e8553a", "#f39c32", "#f7c948"];
    cols.forEach((c, i) => {const a = Math.PI + (i + .5)*Math.PI/7; x.beginPath(); x.ellipse(cx + Math.cos(a)*s*1.05, cy + Math.sin(a)*s*1.05, s*.3, s*.62, a + Math.PI/2, 0, Math.PI*2); ink(x, c, 5)});
    CT.ball(x, cx, cy + s*.15, s*.85, "#9b6136", false); CT.ball(x, cx, cy - s*.35, s*.5, "#b07444", fc || {});
    rpoly(x, [[cx - s*.1, cy - s*.25], [cx + s*.1, cy - s*.25], [cx, cy - s*.08]], 3); ink(x, "#ffb12e", 3);
    x.beginPath(); x.ellipse(cx + s*.12, cy - s*.05, s*.06, s*.13, 0, 0, Math.PI*2); ink(x, "#e8443a", 3)},
  // a hill along the bottom of the picture
  hill(x, y, fill, amp, seed){const r = rand(seed || 3); x.beginPath(); x.moveTo(30, 1000); x.lineTo(30, y); for(let px = 30; px <= 970; px += 188) x.quadraticCurveTo(px + 94, y - (amp || 40)*(.5 + r()), px + 188, y);
    x.lineTo(970, 1000); x.closePath(); ink(x, fill, 5)},
  confetti(x, seed, n, area, cols){const r = rand(seed); for(let i = 0; i < n; i++){const cx = area[0] + r()*(area[2] - area[0]), cy = area[1] + r()*(area[3] - area[1]), c = cols[i%cols.length];
    x.save(); x.translate(cx, cy); x.rotate(r()*Math.PI); x.fillStyle = c; if(i%3) x.fillRect(-7, -4, 14, 8); else {circle(x, 0, 0, 6); x.fill()} x.restore()}},
  sparkles(x, seed, n, area, col){const r = rand(seed); for(let i = 0; i < n; i++) sparkle4(x, area[0] + r()*(area[2] - area[0]), area[1] + r()*(area[3] - area[1]), 8 + r()*14, col || "#fff")},
  dots(x, col, gap){x.save(); x.fillStyle = col; for(let y = 60; y < 1000; y += gap || 70) for(let xx = 60 + ((y/(gap || 70))%2)*(gap || 70)/2; xx < 960; xx += gap || 70){circle(x, xx, y, 7); x.fill()} x.restore()},
  text(x, str, cx, cy, size, fill){x.save(); x.font = `700 ${size}px ${DISP}`; x.textAlign = "center"; x.textBaseline = "middle"; x.lineWidth = size*.16; x.strokeStyle = OUT; x.lineJoin = "round"; x.strokeText(str, cx, cy); x.fillStyle = fill || "#fff"; x.fillText(str, cx, cy); x.restore()},
};
// o: {motif, phrase, colors, sky: [top, bottom], scene(x, f)}
function cartoonDesign(o){
  return Object.assign({cartoon: true}, o, {draw(x, f){
    const L = 44, T = 44, R = W - 44, B = 1000, w = R - L, h = B - T;
    let g = x.createLinearGradient(0, T, 0, B); g.addColorStop(0, o.sky[0]); g.addColorStop(1, o.sky[1]); x.fillStyle = g; x.fillRect(L, T, w, h);
    x.save(); o.scene(x, f); x.restore();
    g = x.createLinearGradient(0, T, 0, 250); g.addColorStop(0, "rgba(0,0,0,.55)"); g.addColorStop(.6, "rgba(0,0,0,.22)"); g.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = g; x.fillRect(L, T, w, 206);
    g = x.createLinearGradient(0, 800, 0, B); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(.45, "rgba(0,0,0,.5)"); g.addColorStop(1, f.paper);
    x.fillStyle = g; x.fillRect(L, 800, w, B - 800);
    return 915;
  }});
}
// five cartoon designs for a festival, added when that festival is in the build: list of {motif, phrase, colors, sky, scene}
function cartoonSet(id, list){const f = FESTS.find(f => f.id === id); if(f) f.designs.push(...list.map(cartoonDesign))}
