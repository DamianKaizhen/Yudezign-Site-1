// One exhibit on its own, for a service page: exhibit.html?sku=showroom-kitchen
// Turn it, open its doors and drawers, and set the lighting. The model and its hinge data are the hall's own files.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
  const k = led > 0 ? 0.6 + 1.5 * led : 0.07;          // off: the strip is still there, just dark
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
const faceMats = [];                      // { m, map, color, zone }: one per front material and zone
const texLoader = new THREE.TextureLoader();
const swatchTex = {};
// Two tones: the fronts split into the upper cabinets (those that start above worktop height) and everything below.
// A swatch goes to both, or to the zone picked in the panel.
const ZONES = [['all', 'All fronts'], ['upper', 'Upper'], ['lower', 'Lower']];
const chosen = { upper: null, lower: null };
let zone = 'all';
function paint(x, f) {
  if (!f) { x.m.map = x.map; x.m.color.copy(x.color); }
  else {
    const t = swatchTex[f.image] || (swatchTex[f.image] = texLoader.load(f.image, redraw));
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.flipY = false;
    x.m.map = t;
    x.m.color.setScalar(1);
  }
  x.m.needsUpdate = true;
}
function showFinish() {
  const { upper, lower } = chosen, now = $('finishNow'), name = (f) => (f ? f.name : 'As built');
  now.textContent = '';
  if (upper === lower) {
    if (upper && upper.group) { const s = document.createElement('small'); s.textContent = upper.group; now.append(s); }
    now.append(name(upper));
  } else {
    const s = document.createElement('small'); s.textContent = 'Two-tone';
    now.append(s, `${name(upper)} over ${name(lower)}`);
  }
  const on = zone === 'all' ? (upper === lower ? upper : undefined) : chosen[zone];
  document.querySelectorAll('#swatchRows button[data-finish]').forEach((b) => b.setAttribute('aria-pressed', String(!!on && b.finish === on)));
  document.querySelectorAll('#zones button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.zone === zone)));
  $('asBuilt').setAttribute('aria-pressed', String(!upper && !lower));
  redraw();
}
function setFinish(f, z = zone) {
  for (const k of ['upper', 'lower']) if (z === 'all' || z === k) chosen[k] = f;
  for (const x of faceMats) paint(x, chosen[x.zone]);
  showFinish();
}
async function finishPanel() {
  if (!faceMats.length) return;
  let site;
  try { site = await (await fetch('assets/site.json?v=9a90a6deb8')).json(); } catch { return; }
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
  if (['upper', 'lower'].every((k) => faceMats.some((x) => x.zone === k))) {          // two tones need both zones
    for (const [id, label] of ZONES) {
      const b = document.createElement('button');
      b.type = 'button'; b.dataset.zone = id; b.textContent = label; b.setAttribute('aria-pressed', String(id === zone));
      b.onclick = () => { zone = id; showFinish(); };
      $('zones').append(b);
    }
    $('zones').hidden = false;
    $('finishNote').textContent = 'Door and drawer fronts only. For two tones, pick Upper or Lower, then a colour. Screen colours are a guide: ask us for a sample.';
  }
  $('asBuilt').onclick = () => setFinish(null, 'all');
  $('finishBtn').hidden = false;
  const find = (n) => n && site.finishes.find((x) => x.name.toLowerCase() === n.toLowerCase());
  const want = find(params.get('finish')), up = find(params.get('upper'));          // ?finish= and ?upper=: for checking
  if (want) setFinish(want, 'all');
  if (up) setFinish(up, 'upper');
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

async function load() {
  const data = await (await fetch('assets/movables.json?v=9a90a6deb8')).json();
  const meta = Object.fromEntries(data.movables.filter((m) => m.sku === sku).map((m) => [m.name, m]));
  const loader = new GLTFLoader();
  loader.setDRACOLoader(new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/'));
  const g = await loader.loadAsync(`assets/models/${sku}.glb?v=9a90a6deb8`);
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
    if (/^(Door face|Drawer face)/.test(m.name)) fronts.push(o);
  });
  root.add(g.scene);
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(g.scene), size = box.getSize(new THREE.Vector3()), mid = box.getCenter(new THREE.Vector3());
  // Two-tone zones. A front that starts above worktop height is an upper; each zone gets its own copy of the material.
  // Fixed fronts arrive merged into one mesh, so a mesh that spans both zones is divided board by board.
  const zoned = new Map(), UPPER = 1.1;
  const zoneMat = (m, z) => {
    const k = m.uuid + z;
    if (!zoned.has(k)) { const c = m.clone(); zoned.set(k, { m: c, map: c.map, color: c.color.clone(), zone: z }); faceMats.push(zoned.get(k)); }
    return zoned.get(k).m;
  };
  for (const o of fronts) {
    const bb = new THREE.Box3().setFromObject(o), g = o.geometry, pos = g.attributes.position, idx = g.index;
    const whole = bb.min.y - box.min.y > UPPER ? 'upper' : 'lower';
    if (whole === 'upper' || bb.max.y - box.min.y < UPPER + 0.2 || !idx || pos.count <= 24) { o.material = zoneMat(o.material, whole); continue; }
    const par = new Int32Array(pos.count), seen = new Map(), low = new Float32Array(pos.count).fill(Infinity), v = new THREE.Vector3();
    const find = (i) => { while (par[i] !== i) { par[i] = par[par[i]]; i = par[i]; } return i; };
    for (let i = 0; i < pos.count; i++) {          // corners that touch belong to one board
      v.fromBufferAttribute(pos, i);
      const k = `${Math.round(v.x * 500)},${Math.round(v.y * 500)},${Math.round(v.z * 500)}`;
      par[i] = seen.has(k) ? seen.get(k) : (seen.set(k, i), i);
    }
    for (let t = 0; t < idx.count; t += 3) { const a = find(idx.getX(t)); par[find(idx.getX(t + 1))] = a; par[find(idx.getX(t + 2))] = a; }
    for (let i = 0; i < pos.count; i++) { const r = find(i); low[r] = Math.min(low[r], v.fromBufferAttribute(pos, i).applyMatrix4(o.matrixWorld).y); }
    const tris = [[], []];
    for (let t = 0; t < idx.count; t += 3) tris[low[find(idx.getX(t))] - box.min.y > UPPER ? 1 : 0].push(idx.getX(t), idx.getX(t + 1), idx.getX(t + 2));
    if (!tris[1].length) { o.material = zoneMat(o.material, 'lower'); continue; }
    g.setIndex(tris[0].concat(tris[1]));
    g.clearGroups();
    g.addGroup(0, tris[0].length, 0);
    g.addGroup(tris[0].length, tris[1].length, 1);
    o.material = [zoneMat(o.material, 'lower'), zoneMat(o.material, 'upper')];
  }
  rig.forEach(([o, mm]) => rigMovable(o, mm));
  for (const d of data.leds.filter((l) => l.sku === sku)) {          // a strip under each wall cabinet, each with its own light
    const a = B(d.a[0], d.a[1], d.a[2]), b = B(d.b[0], d.b[1], d.b[2]), len = a.distanceTo(b);
    const strip = new THREE.Mesh(new THREE.BoxGeometry(len, 0.005, 0.014), ledMat);
    strip.position.copy(a).add(b).multiplyScalar(0.5);
    strip.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), b.clone().sub(a).normalize());
    root.add(strip);
    if (ledLights.length < (coarse ? 3 : 6)) {
      const p = new THREE.PointLight(0xffffff, 0, 1.7, 2);
      p.position.copy(strip.position).y -= 0.05;
      p.userData.base = 0.55 * len;
      root.add(p);
      ledLights.push(p);
    }
  }
  $('ledRows').hidden = !data.leds.some((l) => l.sku === sku);
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
