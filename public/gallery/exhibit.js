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
scene.fog = new THREE.Fog(INK, 9, 22);
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
function applyLights() {
  const level = $('roomDim').value / 100, t = kelvinTint(+$('roomWarm').value).divide(kelvinTint(3400));
  hemi.intensity = 0.75 * level;
  key.intensity = 2.1 * level;
  fill.intensity = 0.7 * level;
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
$('lightsBtn').onclick = () => {
  const open = $('lights').classList.toggle('open');
  $('lightsBtn').setAttribute('aria-expanded', String(open));
};

// ---------------------------------------------------------------- the model
function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  redraw();
}
addEventListener('resize', resize);

async function load() {
  const data = await (await fetch('assets/movables.json')).json();
  const meta = Object.fromEntries(data.movables.filter((m) => m.sku === sku).map((m) => [m.name, m]));
  const loader = new GLTFLoader();
  loader.setDRACOLoader(new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/'));
  const g = await loader.loadAsync(`assets/models/${sku}.glb`);
  const aniso = renderer.capabilities.getMaxAnisotropy(), tuned = new Set(), rig = [];
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
  });
  root.add(g.scene);
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(g.scene), size = box.getSize(new THREE.Vector3()), mid = box.getCenter(new THREE.Vector3());
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
  root.position.set(-mid.x, -box.min.y, -mid.z);

  const r = Math.hypot(size.x, size.y) / 2;
  const dist = r / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (canvas.clientWidth < canvas.clientHeight ? 1.2 : 0.8) + size.z / 2;
  controls.target.set(0, size.y * 0.46, 0);
  camera.position.set(dist * 0.36, size.y * 0.6, dist * 0.93);
  controls.minDistance = dist * 0.35;
  controls.maxDistance = dist * 1.35;
  controls.minAzimuthAngle = -1.2;          // the front and the sides, never the back
  controls.maxAzimuthAngle = 1.2;
  controls.minPolarAngle = 0.5;
  controls.maxPolarAngle = Math.PI / 2 - 0.03;
  controls.update();
  key.position.set(-size.x * 0.6 - 1.5, size.y + 2.2, dist * 0.8);
  key.target.position.set(0, size.y * 0.4, 0);
  fill.position.set(size.x * 0.6 + 2, size.y * 0.8, dist * 0.6);
  fill.target.position.set(0, size.y * 0.4, 0);
  if (params.has('open')) movables.forEach((m) => { m.want = 1; });
  if (params.get('led')) { const [on, b, k] = params.get('led').split(','); $('ledOn').checked = on !== '0'; if (b) $('ledDim').value = b; if (k) $('ledWarm').value = k; }
  applyLights();
  $('load').classList.add('off');
}

// ---------------------------------------------------------------- opening doors and drawers
const setAll = (open) => {
  movables.forEach((m, i) => setTimeout(() => { m.want = open ? 1 : 0; redraw(); }, i * 35));
  $('openAll').setAttribute('aria-pressed', String(open));
  $('openAll').textContent = open ? 'Close doors and drawers' : 'Open doors and drawers';
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
  controls.update();
  if (dirty) { dirty = false; renderer.render(scene, camera); }
  requestAnimationFrame(tick);
}

resize();
load().then(() => { resize(); tick(); }).catch(() => { $('load').textContent = 'This model could not be loaded'; });
