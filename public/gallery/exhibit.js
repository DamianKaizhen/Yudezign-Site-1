// One exhibit on its own, for a service page: exhibit.html?sku=showroom-kitchen
// Turn it, open its doors and drawers, and set the lighting. The model and its hinge data are the hall's own files.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
const sku = (params.get('sku') || '').replace(/[^a-z0-9-]/g, '');
const B = (x, y, z) => new THREE.Vector3(x, z, -y);          // the pipeline's coordinates (z up) to three's (y up)
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const coarse = matchMedia('(max-width: 820px), (pointer: coarse)').matches;

const canvas = $('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.5 : 2));
renderer.toneMapping = THREE.NeutralToneMapping;
const scene = new THREE.Scene();
const INK = new THREE.Color(0x0b0a09);
scene.background = INK;
scene.fog = new THREE.Fog(INK, 12, 30);
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 60);

// Room light: a soft sky, a key from the front left and a fill from the right. Nothing here is baked, so all of it dims.
const hemi = new THREE.HemisphereLight(0xfff1e0, 0x2a2420, 1);
const key = new THREE.DirectionalLight(0xffffff, 1), fill = new THREE.DirectionalLight(0xffffff, 1);
scene.add(hemi, key, key.target, fill, fill.target);

let dirty = true;
const redraw = () => { dirty = true; };
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.addEventListener('change', redraw);

// The Yukon exports carry flat materials. Their names say what they are, so give each a believable surface.
function tuneMaterial(m) {
  const n = m.name;
  m.envMapIntensity = 1;
  if (/jinse/.test(n)) { m.color.setRGB(0.83, 0.62, 0.36); m.metalness = 1; m.roughness = 0.3; m.envMapIntensity = 3; }
  else if (/liangguangjinshu/.test(n)) { m.metalness = 0.65; m.roughness = 0.22; m.envMapIntensity = 3; if (!m.map) m.color.setScalar(0.8); }
  else if (/jinshu/.test(n)) { m.metalness = 0.65; m.roughness = 0.38; m.envMapIntensity = 3; if (!m.map) m.color.setScalar(0.78); }
  else if (/^01 - Default|^8d6e78b8/.test(n)) { m.color.setScalar(0.92); m.metalness = 1; m.roughness = 0.03; m.envMapIntensity = 4; }
  else if (/dalishi|taoci|^Worktop/.test(n)) { m.roughness = 0.16; m.envMapIntensity = 1.6; }
  else if (/Door face|Drawer face|Side Panel|Top Panel|Shelf Panel|Floor Panel|Back Panel|BoardEdge|Plinth|CushionBoard/.test(n)) m.roughness = 0.5;
  else if (/pige/.test(n)) m.roughness = 0.6;
}

const root = new THREE.Group();          // everything in the hall's coordinates; moved so the exhibit sits at the origin
scene.add(root);
const movables = [];                      // { kind, t, want, apply }
const pickables = [];
function rigMovable(mesh, m) {
  const axis = B(m.axis[0], m.axis[1], m.axis[2]).normalize();
  const rec = { kind: m.kind, t: 0, want: 0 };
  if (m.kind === 'drawer') {
    const home = mesh.position.clone(), travel = Math.min(m.max, 0.5) * 0.8;
    rec.apply = (t) => mesh.position.copy(home).addScaledVector(axis, travel * t);
  } else {
    const pivot = new THREE.Group();
    pivot.position.copy(B(m.pivot[0], m.pivot[1], m.pivot[2]));
    mesh.parent.add(pivot);
    pivot.updateMatrixWorld(true);
    pivot.attach(mesh);
    const swing = THREE.MathUtils.degToRad(Math.min(m.max, m.kind === 'flap' ? 80 : 95));     // a right-handed turn opens it
    rec.apply = (t) => pivot.quaternion.setFromAxisAngle(axis, swing * t);
  }
  mesh.userData.rec = rec;
  movables.push(rec);
  pickables.push(mesh);
}

// ---------------------------------------------------------------- lighting controls
const WARM = new THREE.Vector3(1.0, 0.78, 0.55), COOL = new THREE.Vector3(0.82, 0.9, 1.0);
const kelvinTint = (k) => new THREE.Vector3().lerpVectors(WARM, COOL, clamp((k - 2700) / 3300, 0, 1));
const ledMat = new THREE.MeshBasicMaterial({ color: 0xffffff, fog: false });
const ledLights = [];
const roomLamps = [];
function applyLights() {
  const level = $('roomDim').value / 100, t = kelvinTint(+$('roomWarm').value).divide(kelvinTint(3400));
  hemi.intensity = 0.75 * level;
  const inside = roomLamps.length ? 0.45 : 1;          // inside a room the lamp does most of the work
  key.intensity = 2.1 * level * inside;
  fill.intensity = 0.7 * level * inside;
  roomLamps.forEach((l) => { l.intensity = l.userData.room * level; l.color.copy(key.color); });
  scene.environmentIntensity = 0.3 * level;
  hemi.color.setRGB(1.0 * t.x, 0.95 * t.y, 0.88 * t.z);
  key.color.setRGB(1.0 * t.x, 0.93 * t.y, 0.84 * t.z);
  fill.color.copy(key.color);
  $('roomB').textContent = `${Math.round(level * 100)}%`;
  $('roomK').textContent = `${Math.round($('roomWarm').value / 50) * 50} K`;
  const on = $('ledOn').checked, led = on ? $('ledDim').value / 100 : 0, lt = kelvinTint(+$('ledWarm').value);
  const k = led > 0 ? 1.2 + 3 * led : 0.07;          // off: the strip is still there, just dark
  ledMat.color.setRGB(lt.x * k, lt.y * k, lt.z * k);
  ledLights.forEach((p) => { p.color.setRGB(lt.x, lt.y, lt.z); p.intensity = led * p.userData.base; });
  $('ledB').textContent = on ? `${$('ledDim').value}%` : 'Off';
  $('ledK').textContent = `${Math.round($('ledWarm').value / 50) * 50} K`;
  redraw();
}
['roomDim', 'roomWarm', 'ledOn', 'ledDim', 'ledWarm'].forEach((id) => $(id).addEventListener('input', applyLights));

// ---------------------------------------------------------------- panels: one at a time, and the model moves over
// A panel sits down the right side (above the toolbar on a phone). The camera's view is shifted by half the panel's
// size, so the model stays centred in the part of the frame that is still free.
const narrow = matchMedia('(max-width: 600px)');
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const off = { x: 0, y: 0, tx: 0, ty: 0 };
let panel = null;
function frame() {
  const el = panel && $(`${panel}Panel`);
  off.tx = off.ty = 0;
  if (el) {
    const b = el.getBoundingClientRect();
    if (narrow.matches) off.ty = (canvas.clientHeight - b.top) / 2;
    else off.tx = (canvas.clientWidth - b.left) / 2;
  }
  redraw();
}
function applyOffset() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (!off.x && !off.y) camera.clearViewOffset();
  else camera.setViewOffset(w, h, off.x, off.y, w, h);
}
function showPanel(id) {
  panel = panel === id ? null : id;
  for (const p of ['finish', 'lights']) {
    $(`${p}Panel`).hidden = panel !== p;
    $(`${p}Btn`).setAttribute('aria-expanded', String(panel === p));
  }
  document.body.classList.toggle('paneled', !!panel);
  if (panel) $('hint').classList.add('off');
  frame();
}
$('lightsBtn').onclick = () => showPanel('lights');
$('finishBtn').onclick = () => showPanel('finish');
document.querySelectorAll('[data-close]').forEach((b) => { b.onclick = () => showPanel(panel); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel) showPanel(panel); });
if (document.fullscreenEnabled) {
  $('full').hidden = false;
  $('full').onclick = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(() => {}));
  document.addEventListener('fullscreenchange', () => {
    const on = !!document.fullscreenElement;
    $('full').setAttribute('aria-pressed', String(on));
    $('full').title = on ? 'Leave full screen' : 'Full screen';
    $('full').setAttribute('aria-label', $('full').title);
  });
}

// ---------------------------------------------------------------- finish: the fronts in any standard colour
// The pipeline keeps door and drawer fronts as their own materials ("Door face ...", "Drawer face ..."), so a swatch
// can replace their picture without touching the carcass, worktops or hardware.
const faceMats = [];                      // the parts: { m, map, color, zone, verts, lo, hi } - one per as-built material and zone
const texLoader = new THREE.TextureLoader();
const swatchTex = {};
// A design is made of parts: each board finish it was built in (body, fronts, a slat wall, a desktop...), divided into
// upper and lower where that finish is used on both. A swatch goes to every part, or to the one picked in the panel.
// Wood acoustic slat panels are a stocked product with their own four finishes: they never take a board colour.
// A slat part is either a flat board carrying a picture of the slats ('band') or modelled slats with a wood picture.
const SLAT_FINISHES = [
  { name: 'Royal Walnut', group: 'Acoustic panel', color: '#4c3a31', band: 'assets/slat/dgm53-band.jpg?v=4731b3a7f0', wood: 'assets/slat/dgm53-wood.jpg?v=4731b3a7f0' },
  { name: 'Walnut', group: 'Acoustic panel', color: '#76583e', band: 'assets/slat/dgm109-band.jpg?v=4731b3a7f0', wood: 'assets/slat/dgm109-wood.jpg?v=4731b3a7f0' },
  { name: 'Oak', group: 'Acoustic panel', color: '#a28c6d', band: 'assets/slat/dgm197-band.jpg?v=4731b3a7f0', wood: 'assets/slat/dgm197-wood.jpg?v=4731b3a7f0' },
  { name: 'White Oak', group: 'Acoustic panel', color: '#ada494', band: 'assets/slat/dgm717-band.jpg?v=4731b3a7f0', wood: 'assets/slat/dgm717-wood.jpg?v=4731b3a7f0' },
];
const slatKind = (map) => (/^sw_dgm/i.test(map?.name || '') ? 'band' : sku === 'executive-office' && /naturalhamiltonoak/i.test(map?.name || '') ? 'wood' : null);
let parts = [], sel = -1, flash = null;          // sel: -1 = every part
function paint(x, f) {
  if (!f) { x.m.map = x.map; x.m.color.copy(x.color); }
  else {
    const src = x.slat ? f[x.slat] : f.image;
    const t = swatchTex[src] || (swatchTex[src] = texLoader.load(src, redraw));
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.flipY = false;
    if (x.map) { t.repeat.copy(x.map.repeat); t.offset.copy(x.map.offset); t.rotation = x.map.rotation; }
    x.m.map = t;
    x.m.color.setScalar(1);
  }
  x.finish = f || null;
  x.m.needsUpdate = true;
}
function showFinish() {
  const now = $('finishNow'), used = [...new Set(parts.filter((x) => !x.slat || x.finish).map((x) => x.finish))], one = used.length === 1 ? used[0] : undefined;
  now.textContent = '';
  const s = document.createElement('small');
  if (one !== undefined) { s.textContent = one ? one.group || '' : ''; now.append(s, one ? one.name : 'As built'); }
  else { s.textContent = `${used.length} tones`; now.append(s, used.map((f) => (f ? f.name : 'As built')).join(' · ')); }
  const on = sel < 0 ? one : parts[sel].finish;
  document.querySelectorAll('#swatchRows button[data-finish], #slatRows button').forEach((b) => b.setAttribute('aria-pressed', String(!!on && b.finish === on)));
  document.querySelectorAll('#zones button').forEach((b, i) => {
    b.setAttribute('aria-pressed', String(i - 1 === sel));
    const x = parts[i - 1];
    if (x) { const i2 = b.firstChild; i2.style.backgroundImage = x.finish ? `url("${x.finish.image || x.finish.wood}")` : x.thumb; i2.style.backgroundColor = x.finish ? x.finish.color : ''; }
  });
  const slat = sel >= 0 && !!parts[sel].slat;          // an acoustic panel offers only its own finishes
  $('swatchRows').hidden = slat; $('slatRows').hidden = !slat;
  $('asBuilt').setAttribute('aria-pressed', String(faceMats.every((x) => !x.finish)));
  redraw();
}
function setFinish(f, i = sel) {
  // a colour for every part leaves the acoustic panels alone; "Reset" (no colour) puts them back as well
  for (const x of i < 0 ? faceMats.filter((y) => !f || !y.slat) : [parts[i]]) if (!f || !x.slat === !f.band) paint(x, f);
  showFinish();
}
// The part a chip stands for lights up for a moment, so it is clear what the next colour will change.
function choose(i) {
  sel = i;
  if (flash) flash.on.forEach((x) => x.m.emissive.setScalar(0));
  flash = { on: i < 0 ? [] : [parts[i]], t: 0 };
  showFinish();
}
function tickFlash(dt) {
  if (!flash) return false;
  flash.t += dt;
  const k = flash.t >= 0.9 ? 0 : 0.5 * Math.sin((flash.t / 0.9) * Math.PI);
  flash.on.forEach((x) => x.m.emissive.setRGB(0.83 * k, 0.65 * k, 0.45 * k));
  if (flash.t >= 0.9) flash = null;
  return true;
}
function thumb(x) {          // the as-built board as a chip picture
  const img = x.map && x.map.image;
  if (!img) return '';
  try {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    c.getContext('2d').drawImage(img, 0, 0, 64, 64);
    return `url("${c.toDataURL('image/jpeg', 0.8)}")`;
  } catch { return ''; }
}
async function finishPanel() {
  if (!faceMats.length) return;
  let site;
  try { site = await (await fetch('assets/site.json?v=4731b3a7f0')).json(); } catch { return; }
  const styles = site.styles || [], rows = $('swatchRows');
  const groups = styles.length ? styles.map((s) => [s.name || s.id, site.finishes.filter((f) => f.style === (s.id || s.slug || s.name))]) : [['Standard colours', site.finishes]];
  const left = site.finishes.filter((f) => !groups.some(([, list]) => list.includes(f)));
  if (left.length) groups.push(['More', left]);
  for (const [name, list] of groups) {
    if (!list.length) continue;
    const grp = document.createElement('div'); grp.className = 'grp';
    const h = document.createElement('h3'); h.textContent = name;
    const row = document.createElement('div'); row.className = 'row';
    for (const f of list.sort((a, b) => (a.order || 0) - (b.order || 0))) {
      const b = document.createElement('button');
      f.group = name;
      b.type = 'button'; b.title = f.name; b.dataset.finish = f.name; b.finish = f;
      b.setAttribute('aria-label', f.name); b.setAttribute('aria-pressed', 'false');
      b.style.backgroundColor = f.color; b.style.backgroundImage = `url("${f.image}")`;
      b.onclick = () => setFinish(f);
      row.appendChild(b);
    }
    grp.append(h, row);
    rows.append(grp);
  }
  // The parts worth a chip of their own: the larger ones, biggest first. Small trims only follow "All".
  parts = faceMats.filter((x) => x.slat || x.verts > 24).sort((a, b) => (a.slat ? 1 : 0) - (b.slat ? 1 : 0) || b.verts - a.verts).slice(0, 7);          // the acoustic panels last
  for (const f of SLAT_FINISHES) {
    const b = document.createElement('button');
    b.type = 'button'; b.title = f.name; b.finish = f; b.setAttribute('aria-label', f.name); b.setAttribute('aria-pressed', 'false');
    b.style.backgroundColor = f.color; b.style.backgroundImage = `url("${f.wood}")`;
    b.onclick = () => setFinish(f);
    $('slatRow').append(b);
  }
  if (parts.length > 1) {
    const where = (x) => (x.slat ? 'Slats' : x.lo > UPPER ? 'Upper' : x.hi < UPPER + 0.2 ? 'Lower' : 'Full');
    [null, ...parts].forEach((x, i) => {
      const b = document.createElement('button'), dot = document.createElement('i'), cap = document.createElement('span');
      b.type = 'button'; b.setAttribute('aria-pressed', String(i - 1 === sel));
      if (x) { x.thumb = thumb(x); dot.style.backgroundImage = x.thumb; cap.textContent = where(x); b.setAttribute('aria-label', `Part ${i}: ${where(x).toLowerCase()}`); }
      else { dot.className = 'all'; cap.textContent = 'All'; b.setAttribute('aria-label', 'Every part'); }
      b.append(dot, cap);
      b.onclick = () => choose(i - 1);
      $('zones').append(b);
    });
    $('zonesHead').hidden = $('zones').hidden = false;
    $('finishNote').textContent = 'Board finishes only. Pick a part to give it its own colour. Screen colours are a guide: ask us for a sample.';
  } else parts = faceMats.slice();
  $('asBuilt').onclick = () => setFinish(null, -1);
  $('finishBtn').hidden = false;
  const find = (n) => n && site.finishes.find((x) => x.name.toLowerCase() === n.toLowerCase());
  const want = find(params.get('finish'));          // ?finish=<name> and ?part=<n>:<name> (repeatable): for checking
  if (want) setFinish(want, -1);
  for (const q of params.getAll('part')) { const [n, name] = q.split(':'), f = parts[n - 1]?.slat ? SLAT_FINISHES.find((x) => x.name.toLowerCase() === name.toLowerCase()) : find(name); if (f && parts[n - 1]) setFinish(f, n - 1); }
}

// ---------------------------------------------------------------- the model
let fit = null;          // { size, dist, home }: how the model was framed, so a resize or "reset view" can frame it again
// The distance at which the whole piece fits the frame, whatever its shape: the tighter of the height and the width.
function fitDistance(size) {
  const tv = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)), th = tv * (canvas.clientWidth / canvas.clientHeight);
  const halfW = (size.x * 0.93 + size.z * 0.36) / 2, halfH = size.y * 0.56;          // seen from the opening angle
  return Math.max(halfH / tv, halfW / th) * 1.1 + size.z / 2;
}
function homeView() {
  if (!fit) return;
  if (fit.room) { camera.position.copy(fit.home); controls.update(); return; }
  camera.position.set(fit.dist * 0.36, fit.size.y * 0.6, fit.dist * 0.93);
  controls.update();
}
$('resetView').onclick = () => { homeView(); redraw(); };
function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  if (fit && !fit.room) {          // keep the piece the same size in the frame when the frame changes shape
    const d = fitDistance(fit.size), v = camera.position.clone().sub(controls.target).multiplyScalar(d / fit.dist);
    controls.minDistance = d * 0.35;
    controls.maxDistance = d * 1.35;
    camera.position.copy(controls.target).add(v);
    fit.dist = d;
    controls.update();
  }
  frame();
  off.x = off.tx; off.y = off.ty;
  applyOffset();
  redraw();
}
addEventListener('resize', resize);

// Where a strip belongs when the design's data has none: under each run of upper doors that has open space below it
// (a worktop, a bench, a hanging bay). Used to prepare the data; see README "Cabinet lights".
function findStrips(model, fronts, box) {
  const ray = new THREE.Raycaster(), doors = [], out = [];
  const hit = (o, d, far) => { ray.set(o, d); ray.far = far; return ray.intersectObject(model, true)[0]; };
  for (const o of fronts) {
    const b = new THREE.Box3().setFromObject(o), s = b.getSize(new THREE.Vector3());
    const y = b.min.y - box.min.y;
    if (y < UPPER || y > 2.3 || s.y < 0.25) continue;
    const n = s.x < s.z ? 'x' : 'z', r = n === 'x' ? 'z' : 'x';
    if (s[n] > 0.06 || s[r] < 0.2) continue;
    doors.push({ n, r, plane: (b.min[n] + b.max[n]) / 2, y: b.min.y, lo: b.min[r], hi: b.max[r] });
  }
  doors.sort((p, q) => p.lo - q.lo);
  const runs = [];
  for (const d of doors) {
    const run = runs.find((u) => u.n === d.n && Math.abs(u.plane - d.plane) < 0.04 && Math.abs(u.y - d.y) < 0.03 && d.lo - u.hi < 0.1);
    if (run) run.hi = Math.max(run.hi, d.hi); else runs.push({ ...d });
  }
  for (const u of runs) {
    const at = (depth, y, along = (u.lo + u.hi) / 2) => { const v = new THREE.Vector3(); v[u.n] = u.plane + depth; v[u.r] = along; v.y = y; return v; };
    const dir = (sgn) => { const v = new THREE.Vector3(); v[u.n] = sgn; return v; };
    // the cabinet is on the side where a back panel is close behind the door
    const back = [1, -1].map((sgn) => hit(at(sgn * 0.03, u.y + 0.2), dir(sgn), 0.75)?.distance ?? Infinity);
    if (Math.min(...back) === Infinity) continue;
    const sgn = back[0] < back[1] ? 1 : -1, depth = Math.min(...back) + 0.03;
    if (depth < 0.2) continue;
    const y = u.y - 0.012, set = sgn * depth * 0.45;
    if (hit(at(set, y - 0.02), new THREE.Vector3(0, -1, 0), 0.3)) continue;          // something right under it: this is inside a tall unit
    if (u.hi - u.lo < 0.3) continue;
    out.push([at(set, y, u.lo + 0.03), at(set, y, u.hi - 0.03)]);
  }
  return out;
}
const UPPER = 1.1;          // a front that starts higher than this above the floor is an upper
async function load() {
  const data = await (await fetch('assets/movables.json?v=4731b3a7f0')).json();
  const meta = Object.fromEntries(data.movables.filter((m) => m.sku === sku).map((m) => [m.name, m]));
  const loader = new GLTFLoader();
  loader.setDRACOLoader(new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/'));
  const g = await loader.loadAsync(`assets/models/${sku}.glb?v=4731b3a7f0`);
  const aniso = renderer.capabilities.getMaxAnisotropy(), tuned = new Set(), rig = [], fronts = [];
  g.scene.traverse((o) => {
    if (!o.isMesh) return;
    const mm = meta[o.name] || meta[o.parent?.name];
    if (mm && !rig.some((x) => x[1] === mm)) rig.push([o.parent?.name === mm.name ? o.parent : o, mm]);
    const m = o.material;
    if (m.name.replace(/\.\d+$/, '') === 'glass') {
      o.material = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.14, roughness: 0.05, depthWrite: false });
    } else if (!tuned.has(m)) {
      tuned.add(m);
      if (m.map) m.map.anisotropy = aniso;
      tuneMaterial(m);
    }
    if (/^(Door face|Drawer face)/.test(m.name) && !/chrome|hamper|slatwall/i.test(m.map?.name || '')) fronts.push(o);
  });
  root.add(g.scene);
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(g.scene), size = box.getSize(new THREE.Vector3()), mid = box.getCenter(new THREE.Vector3());
  // Two-tone zones. A front that starts above worktop height is an upper; each zone gets its own copy of the material.
  // Fixed fronts arrive merged into one mesh, so a mesh that spans both zones is divided board by board.
  const zoned = new Map();
  const zoneMat = (m, z, verts, lo, hi) => {
    const k = m.uuid + z;
    if (!zoned.has(k)) { const c = m.clone(); zoned.set(k, { m: c, map: c.map, color: c.color.clone(), zone: z, slat: slatKind(c.map), verts: 0, lo: Infinity, hi: -Infinity, finish: null }); faceMats.push(zoned.get(k)); }
    const x = zoned.get(k);
    x.verts += verts; x.lo = Math.min(x.lo, lo); x.hi = Math.max(x.hi, hi);
    return x.m;
  };
  for (const o of fronts) {
    const bb = new THREE.Box3().setFromObject(o), g = o.geometry, pos = g.attributes.position, idx = g.index;
    const whole = bb.min.y - box.min.y > UPPER ? 'upper' : 'lower', y0 = bb.min.y - box.min.y, y1 = bb.max.y - box.min.y;
    if (whole === 'upper' || bb.max.y - box.min.y < UPPER + 0.2 || !idx || pos.count <= 24) { o.material = zoneMat(o.material, whole, pos.count, y0, y1); continue; }
    const par = new Int32Array(pos.count), seen = new Map(), low = new Float32Array(pos.count).fill(Infinity), v = new THREE.Vector3();
    const find = (i) => { while (par[i] !== i) { par[i] = par[par[i]]; i = par[i]; } return i; };
    for (let i = 0; i < pos.count; i++) {          // corners that touch belong to one board
      v.fromBufferAttribute(pos, i);
      const k = `${Math.round(v.x * 500)},${Math.round(v.y * 500)},${Math.round(v.z * 500)}`;
      par[i] = seen.has(k) ? seen.get(k) : (seen.set(k, i), i);
    }
    for (let t = 0; t < idx.count; t += 3) { const a = find(idx.getX(t)); par[find(idx.getX(t + 1))] = a; par[find(idx.getX(t + 2))] = a; }
    for (let i = 0; i < pos.count; i++) { const r = find(i); low[r] = Math.min(low[r], v.fromBufferAttribute(pos, i).applyMatrix4(o.matrixWorld).y); }
    const tris = [[], []], span = [[Infinity, -Infinity], [Infinity, -Infinity]];
    for (let t = 0; t < idx.count; t += 3) {
      const z = low[find(idx.getX(t))] - box.min.y > UPPER ? 1 : 0;
      tris[z].push(idx.getX(t), idx.getX(t + 1), idx.getX(t + 2));
      for (let j = 0; j < 3; j++) { const y = v.fromBufferAttribute(pos, idx.getX(t + j)).applyMatrix4(o.matrixWorld).y - box.min.y; span[z][0] = Math.min(span[z][0], y); span[z][1] = Math.max(span[z][1], y); }
    }
    if (!tris[1].length) { o.material = zoneMat(o.material, 'lower', pos.count, y0, y1); continue; }
    g.setIndex(tris[0].concat(tris[1]));
    g.clearGroups();
    g.addGroup(0, tris[0].length, 0);
    g.addGroup(tris[0].length, tris[1].length, 1);
    o.material = [zoneMat(o.material, 'lower', tris[0].length / 1.5, ...span[0]), zoneMat(o.material, 'upper', tris[1].length / 1.5, ...span[1])];
  }
  rig.forEach(([o, mm]) => rigMovable(o, mm));
  // A strip under each wall cabinet. Each is an area light as long as the strip, so the worktop and the wall under it
  // are lit along the whole run and a polished top mirrors the line of light.
  const strips = data.leds.filter((l) => l.sku === sku).map((d) => [B(d.a[0], d.a[1], d.a[2]), B(d.b[0], d.b[1], d.b[2])]);
  if (params.has('findleds')) { strips.length = 0; strips.push(...findStrips(g.scene, fronts, box)); }          // ?findleds: print where strips belong (README)
  if (strips.length) RectAreaLightUniformsLib.init();
  strips.sort((p, q) => q[0].distanceTo(q[1]) - p[0].distanceTo(p[1]));
  strips.forEach(([a, b], i) => {
    const len = a.distanceTo(b), mid = a.clone().add(b).multiplyScalar(0.5);
    const strip = new THREE.Mesh(new THREE.BoxGeometry(len, 0.006, 0.016), ledMat);
    strip.position.copy(mid);
    strip.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), b.clone().sub(a).normalize());
    root.add(strip);
    if (i >= (coarse ? 4 : 10)) return;          // the longest runs cast the light
    const lamp = new THREE.RectAreaLight(0xffffff, 0, len, 0.03);
    lamp.position.copy(mid).y -= 0.008;
    lamp.quaternion.copy(strip.quaternion).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2));          // facing down
    lamp.userData.base = 26;
    root.add(lamp);
    ledLights.push(lamp);
    const wash = new THREE.PointLight(0xffffff, 0, 1.1, 1.6);          // the soft spill onto the wall behind and the fronts beside
    wash.position.copy(mid).y -= 0.12;
    wash.userData.base = 0.5 * Math.min(len, 1.2);
    root.add(wash);
    ledLights.push(wash);
  });
  if (params.has('findleds')) console.log('LEDS ' + JSON.stringify(strips.map(([a, b]) => ({ sku, a: [a.x, -a.z, a.y].map((v) => +v.toFixed(4)), b: [b.x, -b.z, b.y].map((v) => +v.toFixed(4)), out: [0, 0, 0] }))));
  $('ledRows').hidden = !strips.length;
  $('openAll').hidden = !movables.length;

  // A floor and a back wall, so the piece stands in a room and its unfinished back is never on show.
  const floor = new THREE.Mesh(new THREE.CircleGeometry(14, 48), new THREE.MeshStandardMaterial({ color: 0x15120f, roughness: 0.62, metalness: 0.1 }));
  floor.rotation.x = -Math.PI / 2;
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(30, 8), new THREE.MeshStandardMaterial({ color: 0x2a2520, roughness: 0.95 }));
  wall.position.set(0, 4, -size.z / 2 - 0.012);
  scene.add(floor, wall);
  const room = params.has('room');          // a whole room: walls all round, and you stand inside it
  if (room) {
    for (const sx of [-1, 1]) {
      const side = new THREE.Mesh(new THREE.PlaneGeometry(size.z + 0.03, 8), wall.material);
      side.position.set(sx * (size.x / 2 + 0.012), 4, 0);
      side.rotation.y = -sx * Math.PI / 2;
      scene.add(side);
    }
    const front = new THREE.Mesh(new THREE.PlaneGeometry(30, 8), wall.material);
    front.position.set(0, 4, size.z / 2 + 0.012);
    front.rotation.y = Math.PI;
    const lid = new THREE.Mesh(new THREE.PlaneGeometry(size.x + 0.1, size.z + 0.1), new THREE.MeshStandardMaterial({ color: 0x3a342d, roughness: 1 }));
    lid.position.set(0, size.y + 0.05, 0);
    lid.rotation.x = Math.PI / 2;
    const lamp = new THREE.PointLight(0xfff0dc, 0, 0, 1.6);
    lamp.position.set(0, Math.min(size.y - 0.4, 3.2), 0);
    lamp.userData.room = 3.5;
    scene.add(front, lid, lamp);
    roomLamps.push(lamp);
    scene.fog = null;
  }
  root.position.set(-mid.x, -box.min.y, -mid.z);

  const dist = fitDistance(size);
  fit = { size, dist, room };
  if (room) {
    // Stand just inside the front of the room at eye height. A tiny orbit radius turns "orbit" into "look around".
    camera.fov = canvas.clientWidth < canvas.clientHeight ? 78 : 62;
    camera.updateProjectionMatrix();
    const eye = new THREE.Vector3(0, 1.6, size.z / 2 - 0.75);
    controls.target.copy(eye).add(new THREE.Vector3(0, -0.004, -0.05));
    camera.position.copy(eye);
    fit.home = eye.clone();
    controls.enableZoom = false;
    controls.rotateSpeed = -0.35;
    controls.minPolarAngle = 1.0;
    controls.maxPolarAngle = 2.0;
    $('hint').textContent = 'Drag to look around · select a door or drawer to open it';
    $('resetView').hidden = true;
  } else {
    controls.target.set(0, size.y * 0.46, 0);
    camera.position.set(dist * 0.36, size.y * 0.6, dist * 0.93);
    controls.minDistance = dist * 0.35;
    controls.maxDistance = dist * 1.35;
    controls.minAzimuthAngle = -1.2;          // the front and the sides, never the back
    controls.maxAzimuthAngle = 1.2;
    controls.minPolarAngle = 0.5;
    controls.maxPolarAngle = Math.PI / 2 - 0.03;
  }
  controls.update();
  key.position.set(-size.x * 0.6 - 1.5, size.y + 2.2, dist * 0.8);
  key.target.position.set(0, size.y * 0.4, 0);
  fill.position.set(size.x * 0.6 + 2, size.y * 0.8, dist * 0.6);
  fill.target.position.set(0, size.y * 0.4, 0);
  if (params.has('open')) movables.forEach((m) => { m.want = 1; });
  if (params.get('view')) {          // ?view=<turn>,<tilt>,<distance x>: a fixed view, for checking
    const [az, pol, k] = params.get('view').split(',').map(Number);
    const d = camera.position.distanceTo(controls.target) * (k || 1);
    camera.position.copy(controls.target).add(new THREE.Vector3().setFromSphericalCoords(d, pol || 1.2, az || 0));
    controls.update();
  }
  finishPanel().then(() => { if (/^(finish|lights)$/.test(params.get('panel') || '')) showPanel(params.get('panel')); });          // ?panel=: for checking
  if (params.get('led')) { const [on, b, k] = params.get('led').split(','); $('ledOn').checked = on !== '0'; if (b) $('ledDim').value = b; if (k) $('ledWarm').value = k; }
  applyLights();
  $('load').classList.add('off');
}

// ---------------------------------------------------------------- opening doors and drawers
const setAll = (open) => {
  movables.forEach((m, i) => setTimeout(() => { m.want = open ? 1 : 0; redraw(); }, i * 35));
  $('openAll').setAttribute('aria-pressed', String(open));
  $('openAll').textContent = open ? 'Close all' : 'Open all';
  $('openAll').title = open ? 'Close every door and drawer' : 'Open every door and drawer';
};
$('openAll').onclick = () => setAll($('openAll').getAttribute('aria-pressed') !== 'true');
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
function pick(e) {
  const b = canvas.getBoundingClientRect();
  ndc.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  let o = ray.intersectObjects(pickables, true)[0]?.object;
  while (o && !o.userData.rec) o = o.parent;
  return o ? o.userData.rec : null;
}
let down = null;
canvas.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; $('hint').classList.add('off'); });
canvas.addEventListener('pointerup', (e) => {
  if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 8) return;
  const rec = pick(e);
  if (rec) { rec.want = rec.want ? 0 : 1; redraw(); }
});
if (!coarse) canvas.addEventListener('pointermove', (e) => { if (!e.buttons) canvas.classList.toggle('over', !!pick(e)); });

// ---------------------------------------------------------------- frame loop: draws only when something changed
const clock = new THREE.Clock();
function tick() {
  const dt = Math.min(clock.getDelta(), 0.1);
  if (tickFlash(dt)) dirty = true;
  for (const m of movables) {
    if (m.t === m.want) continue;
    m.t += Math.sign(m.want - m.t) * Math.min(Math.abs(m.want - m.t), dt * 1.6);
    m.apply(m.t * m.t * (3 - 2 * m.t));
    dirty = true;
  }
  if (off.x !== off.tx || off.y !== off.ty) {          // slide the view over as a panel opens or closes
    const k = still ? 1 : Math.min(1, dt * 9);
    off.x += (off.tx - off.x) * k; off.y += (off.ty - off.y) * k;
    if (Math.abs(off.tx - off.x) < 0.5) off.x = off.tx;
    if (Math.abs(off.ty - off.y) < 0.5) off.y = off.ty;
    applyOffset();
    dirty = true;
  }
  controls.update();
  if (dirty) { dirty = false; renderer.render(scene, camera); }
  requestAnimationFrame(tick);
}

resize();
load().then(() => { resize(); tick(); }).catch(() => { $('load').textContent = 'This model could not be loaded'; });
