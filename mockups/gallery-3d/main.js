// YuDeZign 3D gallery mockup.
// A hall built in Blender (lighting baked in Cycles), walked by scrolling: each
// scroll section is one stop, and the camera eases from stop to stop.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
const data = await (await fetch('assets/gallery.json')).json();
const { hall, stops, sections, pieces, zones, videoWall } = data;

// Blender is Z-up, three.js is Y-up.
const B = (x, y, z) => new THREE.Vector3(x, z, -y);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lite = params.get('q') ? params.get('q') === 'low'
  : matchMedia('(max-width: 820px), (pointer: coarse)').matches;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------- renderer
const canvas = $('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: lite, powerPreference: 'high-performance' });
let dpr = Math.min(devicePixelRatio, 1.5);
renderer.setPixelRatio(dpr);
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
const scene = new THREE.Scene();
const FOG = new THREE.Color(0x0b0a09);
scene.background = FOG;
scene.fog = new THREE.FogExp2(FOG, 0.016);
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 80);
camera.rotation.order = 'YXZ';

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.22;
scene.add(new THREE.HemisphereLight(0xfff1e0, 0x2a2420, 0.55));

// ---------------------------------------------------------------- loading
const manager = new THREE.LoadingManager();
manager.onProgress = (_u, done, total) => { $('loadBar').style.width = `${(done / total) * 100}%`; };
const texLoader = new THREE.TextureLoader(manager);
const gltfLoader = new GLTFLoader(manager);
gltfLoader.setDRACOLoader(new DRACOLoader(manager).setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/'));
const maxAniso = renderer.capabilities.getMaxAnisotropy();
function tex(url, flipY = true) {
  const t = texLoader.load(url);
  t.colorSpace = THREE.SRGBColorSpace;
  t.flipY = flipY;
  t.anisotropy = maxAniso;
  return t;
}
// Bakes were saved one stop under so highlights survive an 8-bit JPG.
const BAKE_GAIN = 2;
const bakeMats = [];
const bakedMaterial = (name, flipY) => {
  const m = new THREE.MeshBasicMaterial({ map: tex(`assets/bake/${name}.jpg`, flipY), color: new THREE.Color().setRGB(BAKE_GAIN, BAKE_GAIN, BAKE_GAIN) });
  bakeMats.push(m);
  return m;
};

// ---------------------------------------------------------------- hall shell
gltfLoader.load('assets/models/shell.glb', (g) => {
  g.scene.traverse((o) => {
    if (!o.isMesh) return;
    // the ceiling is near-black; a flat colour is cleaner than a compressed bake
    o.material = o.name === 'shell_ceiling' ? new THREE.MeshBasicMaterial({ color: 0x0a0908 }) : bakedMaterial(o.name, false);
  });
  scene.add(g.scene);
});

const L = hall.x1 - hall.x0, W = hall.y1 - hall.y0;
const floorGeo = new THREE.PlaneGeometry(L, W);
let floor;
if (lite) {
  floor = new THREE.Mesh(floorGeo, bakedMaterial('shell_floor', true));
} else {
  // Polished floor: baked light plus a live, slightly blurred mirror of the room.
  const shader = {
    name: 'GalleryFloor',
    uniforms: {
      color: { value: null }, tDiffuse: { value: null }, textureMatrix: { value: null }, tBake: { value: null },
      uStrength: { value: 0.55 }, uGain: { value: new THREE.Vector3(BAKE_GAIN, BAKE_GAIN, BAKE_GAIN) }, uFogColor: { value: FOG }, uFogDensity: { value: scene.fog.density },
    },
    vertexShader: /* glsl */`
      uniform mat4 textureMatrix;
      varying vec4 vUv; varying vec2 vUv2; varying vec3 vWorld;
      void main() {
        vUv = textureMatrix * vec4(position, 1.0);
        vUv2 = uv;
        vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 color; uniform sampler2D tDiffuse; uniform sampler2D tBake;
      uniform float uStrength; uniform vec3 uGain; uniform vec3 uFogColor; uniform float uFogDensity;
      varying vec4 vUv; varying vec2 vUv2; varying vec3 vWorld;
      void main() {
        vec3 base = texture2D(tBake, vUv2).rgb * uGain;
        vec2 uv = vUv.xy / vUv.w;
        vec3 toCam = cameraPosition - vWorld;
        float d = length(toCam);
        float ndv = clamp(toCam.y / d, 0.0, 1.0);
        float fres = 0.05 + 0.95 * pow(1.0 - ndv, 4.0);
        float b = 0.0012 + 0.0035 * clamp(d / 18.0, 0.0, 1.0);
        vec3 r = texture2D(tDiffuse, uv).rgb * 0.24;
        r += texture2D(tDiffuse, uv + vec2(0.0, b * 1.6)).rgb * 0.19;
        r += texture2D(tDiffuse, uv - vec2(0.0, b * 1.6)).rgb * 0.19;
        r += texture2D(tDiffuse, uv + vec2(b, b * 3.2)).rgb * 0.19;
        r += texture2D(tDiffuse, uv - vec2(b, b * 3.2)).rgb * 0.19;
        vec3 col = base + r * fres * uStrength;
        float fog = 1.0 - exp(-uFogDensity * uFogDensity * d * d);
        gl_FragColor = vec4(mix(col, uFogColor, fog), 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  };
  floor = new Reflector(floorGeo, { clipBias: 0.002, textureWidth: 768, textureHeight: 768, shader });
  floor.material.uniforms.tBake.value = tex('assets/bake/shell_floor.jpg', true);
  const mirror = floor.onBeforeRender;
  let flip = 0;
  floor.onBeforeRender = function (...a) { if ((flip ^= 1)) mirror.apply(this, a); };
}
floor.rotation.x = -Math.PI / 2;
floor.position.copy(B((hall.x0 + hall.x1) / 2, (hall.y0 + hall.y1) / 2, 0));
scene.add(floor);

// ---------------------------------------------------------------- the pieces
// The Yukon exports carry flat materials. Their names say what they are, so give each a believable surface.
const tuned = new Set();
function tuneMaterial(m) {
  if (tuned.has(m)) return;
  tuned.add(m);
  const n = m.name;
  m.envMapIntensity = 1;
  if (/jinse/.test(n)) { m.color.setRGB(0.83, 0.62, 0.36); m.metalness = 1; m.roughness = 0.3; m.envMapIntensity = 3; }
  else if (/liangguangjinshu/.test(n)) { m.metalness = 0.65; m.roughness = 0.22; m.envMapIntensity = 3; if (!m.map) m.color.setScalar(0.8); }
  else if (/jinshu/.test(n)) { m.metalness = 0.65; m.roughness = 0.38; m.envMapIntensity = 3; if (!m.map) m.color.setScalar(0.78); }
  else if (/^01 - Default|^8d6e78b8/.test(n)) { m.color.setScalar(0.92); m.metalness = 1; m.roughness = 0.03; m.envMapIntensity = 4; }   // mirrors
  else if (/dalishi|taoci|^Worktop/.test(n)) { m.roughness = 0.16; m.envMapIntensity = 1.6; }                        // stone, ceramic
  else if (/Door face|Drawer face|Side Panel|Top Panel|Shelf Panel|Floor Panel|Back Panel|BoardEdge|Plinth|CushionBoard/.test(n)) m.roughness = 0.5;
  else if (/pige/.test(n)) m.roughness = 0.6;
}
// Doors and drawers arrive as their own parts. Each carries the design's own hinge line or pull direction (the pipeline
// reads them from the Yukon file), so a door swings where it is hinged and a drawer slides the way it is built.
const exhibitData = await (await fetch('assets/movables.json')).json();
const movMeta = Object.fromEntries(exhibitData.movables.map((m) => [m.name, m]));
const movables = [];                 // { sku, mesh, kind, t, want, apply }
function rigMovable(mesh, m) {
  const axis = B(m.axis[0], m.axis[1], m.axis[2]).normalize();
  const rec = { sku: m.sku, mesh, kind: m.kind, t: 0, want: 0 };
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
  mesh.userData = { type: 'movable', rec };
  movables.push(rec);
  pickables.push(mesh);
}
if (params.has('dbg')) window.__movables = movables;
function setExhibitOpen(sku, open) {
  movables.filter((r) => r.sku === sku).forEach((r, i) => setTimeout(() => { r.want = open ? 1 : 0; }, i * 35));
}
const exhibitOpen = {};
let refreshCard = () => {};          // set once the cards exist: a model that lands late adds its "open" button
const GLOW = { led: [1.0, 0.72, 0.42, 3.2], diffuser: [1.0, 0.78, 0.52, 1.7], orb: [1.0, 0.75, 0.45, 2.2] };
const swapped = new Map();
// One model per exhibit, so the hall fills in piece by piece and a service page can load just its own.
for (const piece of pieces) gltfLoader.load(`assets/models/${piece.sku}.glb`, (g) => {
  const rig = [];
  g.scene.traverse((o) => {
    if (!o.isMesh) return;
    const mm = movMeta[o.name] || movMeta[o.parent?.name];
    if (mm && !rig.some((x) => x[1] === mm)) rig.push([o.parent?.name === mm.name ? o.parent : o, mm]);
    const m = o.material, key = m.name.replace(/\.\d+$/, '');
    if (GLOW[key]) {
      if (!swapped.has(key)) {
        const [r, gr, b, k] = GLOW[key];
        swapped.set(key, new THREE.MeshBasicMaterial({ color: new THREE.Color().setRGB(r * k, gr * k, b * k), fog: false }));
      }
      o.material = swapped.get(key);
    } else if (key === 'glass') {
      o.material = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.14, roughness: 0.05, depthWrite: false });
    } else {
      if (m.map) m.map.anisotropy = maxAniso;
      tuneMaterial(m);
    }
  });
  scene.add(g.scene);
  g.scene.updateMatrixWorld(true);
  rig.forEach(([o, mm]) => rigMovable(o, mm));
  if (params.has('open')) movables.forEach((r) => { r.want = 1; });          // ?open: everything open, for checking
  refreshCard();
});

// One spot per exhibit, as in the Blender scene (watts there are watts / 4pi here).
const SPOT_I = 0.6 * data.spot.energy / (4 * Math.PI), SPOT_A = THREE.MathUtils.degToRad(data.spot.angle / 2);
const lightCount = Math.min(lite ? 3 : 4, pieces.length);      // only the nearest exhibits are lit
let spotLevel = 1;
const pieceLights = pieces.map((p) => {
  const cx = (p.x + p.W / 2) / 1000, cy = (p.y + p.D / 2) / 1000;
  return { cx, pos: B(cx, cy - 2.2, 3.4), aim: B(cx, cy, 0.5) };
});
const spots = Array.from({ length: lightCount }, () => {
  const s = new THREE.SpotLight(new THREE.Color().setRGB(1.0, 0.9, 0.78), SPOT_I, 0, SPOT_A, 0.6, 2);
  scene.add(s, s.target);
  return s;
});
function aimSpots(camX) {
  const near = pieceLights.map((p) => ({ p, d: Math.abs(p.cx - camX) })).sort((a, b) => a.d - b.d);
  spots.forEach((s, i) => {
    const { p, d } = near[i];
    s.position.copy(p.pos);
    s.target.position.copy(p.aim);
    s.intensity = spotLevel * (pieces.length > lightCount ? SPOT_I * (1 - THREE.MathUtils.smoothstep(d, 7, 11)) : SPOT_I);
  });
}

// ---------------------------------------------------------------- built work: framed photos on the front wall
const pickables = [];
const backGeos = [];
const frameBack = new THREE.MeshStandardMaterial({ color: 0x0c0b0a, roughness: 0.6 });
function playBadge() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const x = c.getContext('2d');
  x.fillStyle = 'rgba(12,11,10,.55)'; x.beginPath(); x.arc(64, 64, 60, 0, 7); x.fill();
  x.strokeStyle = '#f4efe7'; x.lineWidth = 3; x.stroke();
  x.fillStyle = '#f4efe7'; x.beginPath(); x.moveTo(52, 40); x.lineTo(92, 64); x.lineTo(52, 88); x.fill();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshBasicMaterial({ map: t, transparent: true, fog: false });
}
const badgeMat = playBadge();
function wallText(text, sub) {
  const c = document.createElement('canvas'); c.width = 1536; c.height = 256;
  const x = c.getContext('2d');
  x.textAlign = 'center'; x.fillStyle = '#f4efe7';
  x.font = '300 132px "Cormorant Garamond", serif';
  x.fillText(text, 768, 138);
  x.font = '500 30px Inter, sans-serif'; x.fillStyle = '#d4a574';
  if ('letterSpacing' in x) x.letterSpacing = '12px';
  x.fillText(sub.toUpperCase(), 768, 208);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso;
  return new THREE.Mesh(new THREE.PlaneGeometry(3.3, 0.55), new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: 0.92 }));
}
await Promise.all([document.fonts.load('300 132px "Cormorant Garamond"'), document.fonts.load('500 30px Inter')]).catch(() => {});

for (const s of sections) {
  for (const f of s.frames) {
    const g = new THREE.Group();
    g.position.copy(B(f.x, hall.y0, f.z));
    g.rotation.y = Math.PI;                       // face into the hall
    const bg = new THREE.BoxGeometry(f.w + 0.07, f.h + 0.07, 0.05);
    bg.translate(0, 0, 0.025).rotateY(Math.PI).translate(g.position.x, g.position.y, g.position.z);
    backGeos.push(bg);
    const photo = new THREE.Mesh(new THREE.PlaneGeometry(f.w, f.h), new THREE.MeshBasicMaterial({ map: tex(f.src.replace('/photos/', '/photos-sm/')), color: 0xe9e9e9 }));
    photo.position.z = 0.052;
    photo.userData = { type: 'frame', frame: f };
    g.add(photo);
    if (f.video) {
      const badge = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), badgeMat);
      badge.position.z = 0.056;
      g.add(badge);
    }
    pickables.push(photo);
    scene.add(g);
  }
  const label = wallText(s.title, 'Built in Houston');
  label.position.copy(B(s.xc, hall.y0 + 0.02, 2.8));
  label.rotation.y = Math.PI;
  scene.add(label);
}

scene.add(new THREE.Mesh(mergeGeometries(backGeos), frameBack));

// click a piece to walk to it
const proxyMat = new THREE.MeshBasicMaterial({ visible: false });
for (const p of pieces) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(p.W / 1000, p.H / 1000, p.D / 1000), proxyMat);
  m.position.copy(B((p.x + p.W / 2) / 1000, (p.y + p.D / 2) / 1000, p.H / 2000));
  m.userData = { type: 'piece', sku: p.sku };
  pickables.push(m);
  scene.add(m);
}

// ---------------------------------------------------------------- entrance video wall + closing wall
const video = Object.assign(document.createElement('video'), {
  src: 'assets/video/projects-montage.mp4', muted: true, loop: true, playsInline: true, preload: 'auto', crossOrigin: 'anonymous',
});
video.setAttribute('playsinline', '');
const screenMat = new THREE.MeshBasicMaterial({ map: tex('assets/video/projects-montage-poster.jpg'), fog: false });
const screen = new THREE.Mesh(new THREE.PlaneGeometry(videoWall.w, videoWall.h), screenMat);
screen.position.copy(B(hall.x0 + 0.04, videoWall.y, videoWall.z));
screen.rotation.y = Math.PI / 2;
scene.add(screen);
video.addEventListener('playing', () => {
  const vt = new THREE.VideoTexture(video); vt.colorSpace = THREE.SRGBColorSpace;
  screenMat.map = vt; screenMat.needsUpdate = true;
}, { once: true });
const tryPlay = () => video.play().catch(() => {});
tryPlay();
addEventListener('pointerdown', tryPlay, { once: true });

// partition walls: a screen of built work and the exhibit's name on the side you approach from
const wingScreens = [];
for (const w of data.wings || []) {
  if (!w.video) continue;                      // a plain wall, no screen
  const len = hall.y1 - w.y0, ym = (w.y0 + hall.y1) / 2;
  let sw = Math.min(len - 0.7, 2.3), sh = sw / w.aspect;
  if (sh > 1.75) { sh = 1.75; sw = sh * w.aspect; }
  const mat = new THREE.MeshBasicMaterial({ map: tex(w.poster), fog: false });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), mat);
  scr.position.copy(B(w.x - 0.132, ym, 1.6));   // clear of the bezel face, or the two flicker against each other
  scr.rotation.y = -Math.PI / 2;
  scr.userData = { type: 'frame', frame: { title: w.videoTitle, src: w.poster, video: w.video } };
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(sw + 0.06, sh + 0.06, 0.04), frameBack);
  bezel.position.copy(B(w.x - 0.105, ym, 1.6));
  bezel.rotation.y = -Math.PI / 2;
  const label = wallText(w.title, 'Built work on screen: ' + w.videoTitle);
  label.scale.setScalar(Math.min(0.62, (len - 0.3) / 3.3));
  label.position.copy(B(w.x - 0.11, ym, 2.95));
  label.rotation.y = -Math.PI / 2;
  scene.add(bezel, scr, label);
  pickables.push(scr);
  const v = Object.assign(document.createElement('video'), { src: w.video, muted: true, loop: true, playsInline: true, preload: 'none' });
  v.setAttribute('playsinline', '');
  wingScreens.push({ x: w.x, v, mat, live: false });
}
function updateWingScreens(camX) {
  for (const s of wingScreens) {
    const near = camX < s.x && s.x - camX < 11;        // only the screens ahead of you play
    if (near && s.v.paused) {
      s.v.play().catch(() => {});
      if (!s.hooked) {
        s.hooked = true;          // swap the poster for the video only once real frames are flowing
        s.v.addEventListener('timeupdate', () => {
          if (s.live || s.v.currentTime < 0.2) return;
          const vt = new THREE.VideoTexture(s.v); vt.colorSpace = THREE.SRGBColorSpace; s.mat.map = vt; s.mat.needsUpdate = true; s.live = true;
        });
      }
    } else if (!near && !s.v.paused) s.v.pause();
  }
}

const closing = wallText('YuDeZign', 'Designed and built in Houston');
closing.scale.setScalar(1.5);
closing.position.copy(B(hall.x1 - 0.03, 4.0, 2.35));
closing.rotation.y = -Math.PI / 2;
scene.add(closing);

// ---------------------------------------------------------------- post-processing (desktop)
let composer = null;
if (!lite) {
  const rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
  composer = new EffectComposer(renderer, rt);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.25, 0.7, 1.6));
  composer.addPass(new OutputPass());
}

// ---------------------------------------------------------------- camera stops
const VMAX = THREE.MathUtils.degToRad(74);
let keys = [];
function keyFor(stop, aspect) {
  const portrait = aspect < 0.85;
  const pos = new THREE.Vector3(...((portrait && stop.posP) || stop.pos));
  const tgt = new THREE.Vector3(...((portrait && stop.targetP) || stop.target));
  const hDesign = 2 * Math.atan(18 / stop.lens), vDesign = 2 * Math.atan(12 / stop.lens);
  const v = clamp(2 * Math.atan(Math.tan(hDesign / 2) / aspect), vDesign, VMAX);
  const hGot = 2 * Math.atan(Math.tan(v / 2) * aspect);
  if (stop.kind === 'piece' && hGot < hDesign * 0.98) {
    // narrow screen: step back from the piece instead of cropping it
    const k = Math.max(1, Math.min(Math.tan(hDesign / 2) / Math.tan(hGot / 2), 2.4) * 0.88);
    pos.x = clamp(tgt.x + (pos.x - tgt.x) * k, hall.x0 + 0.6, hall.x1 - 0.6);
    pos.y = clamp(tgt.y + (pos.y - tgt.y) * k, 0.7, 7.4);
  }
  const p3 = B(pos.x, pos.y, pos.z), dir = B(tgt.x, tgt.y, tgt.z).sub(p3).normalize();
  return { pos: p3, yaw: Math.atan2(-dir.x, -dir.z), pitch: Math.asin(dir.y), fov: THREE.MathUtils.radToDeg(v) };
}
function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  composer?.setPixelRatio(dpr);
  composer?.setSize(w, h);
  camera.aspect = w / h;
  keys = stops.map((s) => keyFor(s, camera.aspect));
}
addEventListener('resize', resize);
resize();

// ---------------------------------------------------------------- scroll track
const track = $('stops');
stops.forEach((s) => {
  const sec = document.createElement('section');
  sec.id = `stop-${s.id}`;
  sec.innerHTML = `<h2>${s.title || (s.kind === 'intro' ? 'YuDeZign custom frameless cabinets' : 'Start your project')}</h2><p>${s.text || ''}</p>`;
  track.appendChild(sec);
});
const sectionHeight = () => track.firstElementChild.offsetHeight;
const goTo = (i, smooth = true) => scrollTo({ top: i * sectionHeight(), behavior: smooth && !reduceMotion ? 'smooth' : 'auto' });
const startStop = parseInt(params.get('stop') || '0', 10);
if (startStop) goTo(startStop, false);
let pos = startStop;                                 // eased position along the stops
const look = { x: 0, y: 0, tx: 0, ty: 0 };
if (!lite) addEventListener('pointermove', (e) => { look.tx = e.clientX / innerWidth - 0.5; look.ty = e.clientY / innerHeight - 0.5; });

// ---------------------------------------------------------------- overlay
const rail = $('rail');
const zoneFirst = Object.fromEntries(zones.map(([id]) => [id, stops.findIndex((s) => s.zone === id)]));
zones.forEach(([id, name]) => {
  const b = document.createElement('button');
  b.type = 'button'; b.textContent = name; b.dataset.zone = id;
  b.onclick = () => goTo(zoneFirst[id]);
  rail.appendChild(b);
});
$('enterBtn').onclick = () => goTo(1);

const PTYPE = { 'showroom-kitchen': 'kitchen', 'garage-cabinet': 'garage', 'showroom-closet': 'closet', 'master-bath': 'vanity', mudroom: 'laundry-mudroom',
  'coffee-bar': 'bar-pantry', 'reception-desk': 'office', 'executive-office': 'office' };
// The exhibits a service page also shows in its own viewer, where the finish can be changed (scripts/build-gallery.py
// checks this list against src/data/services.ts).
const PAGE = { 'showroom-kitchen': 'kitchen-cabinets', 'master-bath': 'bathroom-vanities', 'executive-office': 'home-office-cabinets',
  'garage-cabinet': 'garage-cabinets', mudroom: 'laundry-room-cabinets', 'showroom-closet': 'closet-systems' };
let active = -1;
refreshCard = () => { if (active >= 0 && stops[active].kind === 'piece') showStop(active); };
function showStop(i) {
  active = i;
  const s = stops[i];
  $('hero').classList.toggle('off', s.kind !== 'intro');
  $('finale').classList.toggle('off', s.kind !== 'finale');
  $('hint').classList.toggle('off', i !== 0);
  rail.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.zone === s.zone));
  rail.querySelector('.on')?.scrollIntoView({ block: 'nearest', inline: 'center' });
  closeDrawing();
  const card = $('card');
  if (s.kind === 'intro' || s.kind === 'finale') { card.classList.add('off'); return; }
  $('cEyebrow').textContent = s.eyebrow;
  $('cTitle').textContent = s.title;
  $('cText').textContent = s.text;
  $('cMeta').textContent = s.meta || '';
  const chips = $('cChips'); chips.innerHTML = '';
  const actions = $('cActions'); actions.innerHTML = '';
  if (s.kind === 'wall') {
    sections.find((x) => x.id === s.section).frames.forEach((f) => {
      const b = document.createElement('button');
      b.type = 'button'; b.title = f.title; if (f.video) b.className = 'play';
      b.innerHTML = `<img src="${f.src}" alt="${f.title}" loading="lazy">`;
      b.onclick = () => openLightbox(f);
      chips.appendChild(b);
    });
    actions.innerHTML = '<a href="#">See all projects</a>';
  } else if (s.kind === 'piece') {
    actions.innerHTML = `<a href="#" data-panel="contact" data-ptype="${PTYPE[s.sku] || ''}">Start a project like this</a>`;
    if (PAGE[s.sku]) actions.insertAdjacentHTML('beforeend', `<a href="/services/${PAGE[s.sku]}#exhibit-3d">Customize this design</a>`);
    if (movables.some((r) => r.sku === s.sku)) {
      const ob = document.createElement('button');
      ob.type = 'button'; ob.className = 'quiet';
      const label = () => { ob.textContent = exhibitOpen[s.sku] ? 'Close doors and drawers' : 'Open doors and drawers'; };
      label();
      ob.onclick = () => { exhibitOpen[s.sku] = !exhibitOpen[s.sku]; setExhibitOpen(s.sku, exhibitOpen[s.sku]); label(); };
      actions.appendChild(ob);
    }
    if (s.drawing) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'quiet'; b.textContent = 'Line drawing';
      b.onclick = () => openDrawing(s);
      actions.appendChild(b);
    }
  } else {
    actions.innerHTML = '<a href="#" data-panel="contact">Start your project</a>';
  }
  card.classList.remove('off');
}

let drawingStop = null;
function openDrawing(s) {
  drawingStop = s;
  setDrawingTab('drawing');
  $('drawing').hidden = false;
}
function setDrawingTab(tab) {
  $('drawingImg').src = drawingStop[tab];
  $('drawingImg').alt = `${drawingStop.title}, ${tab === 'drawing' ? 'line drawing' : 'studio render'}`;
  $('drawing').querySelectorAll('[data-tab]').forEach((b) => b.classList.toggle('on', b.dataset.tab === tab));
}
function closeDrawing() { $('drawing').hidden = true; }
$('drawing').querySelectorAll('[data-tab]').forEach((b) => { b.onclick = () => setDrawingTab(b.dataset.tab); });

function openLightbox(f) {
  $('lbMedia').innerHTML = f.video
    ? `<video src="${f.video}" poster="${f.src}" controls autoplay playsinline></video>`
    : `<img src="${f.src}" alt="${f.title}">`;
  $('lbCaption').innerHTML = `${esc(f.title)}${f.text ? `<small>${esc(f.text)}</small>` : ''}`;
  $('lightbox').hidden = false;
}
function closeLightbox() { $('lightbox').hidden = true; $('lbMedia').innerHTML = ''; }
document.querySelectorAll('[data-close]').forEach((b) => { b.onclick = () => { closeLightbox(); closeDrawing(); }; });
$('lightbox').addEventListener('click', (e) => { if (e.target === $('lightbox')) closeLightbox(); });
addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (!$('lightbox').hidden) closeLightbox(); else if (!panel.hidden) closePanel();
  closeDrawing();
});

// ---------------------------------------------------------------- lighting control: brightness and warmth
// The hall's light is baked, so dimming scales the bake and the live spots together.
const WARM = new THREE.Vector3(1.0, 0.78, 0.55), COOL = new THREE.Vector3(0.82, 0.9, 1.0);
const kelvinTint = (k) => new THREE.Vector3().lerpVectors(WARM, COOL, clamp((k - 2700) / 3300, 0, 1));
const BASE_K = 3400;
function setLighting(level, kelvin) {
  const t = kelvinTint(kelvin).divide(kelvinTint(BASE_K));
  const g = t.clone().multiplyScalar(BAKE_GAIN * level);
  bakeMats.forEach((m) => m.color.setRGB(g.x, g.y, g.z));
  if (floor.material.uniforms) floor.material.uniforms.uGain.value.copy(g);
  spots.forEach((s) => s.color.setRGB(1.0 * t.x, 0.9 * t.y, 0.78 * t.z));
  spotLevel = level;
  $('lightK').textContent = `${Math.round(kelvin / 50) * 50} K`;
  $('lightB').textContent = `${Math.round(level * 100)}%`;
}
const dim = $('dim'), warmth = $('warmth');
const applyLighting = () => setLighting(dim.value / 100, +warmth.value);
dim.addEventListener('input', applyLighting);
warmth.addEventListener('input', applyLighting);
$('lightsBtn').onclick = () => $('lights').classList.toggle('open');
if (params.get('light')) { const [b, k] = params.get('light').split(','); dim.value = b; warmth.value = k; applyLighting(); $('lights').classList.add('open'); }

// ---------------------------------------------------------------- cabinet lights
// A strip under each wall cabinet. The designs do not draw their lighting, so the pipeline places these. Each strip
// glows; the few nearest the camera also cast light (an area light as long as the strip, so the worktop and the wall
// under it are lit along the run), so the count of live lights stays fixed.
const ledMat = new THREE.MeshBasicMaterial({ color: 0xffffff, fog: false });
const leds = exhibitData.leds.map((d) => {
  const a = B(d.a[0], d.a[1], d.a[2]), b = B(d.b[0], d.b[1], d.b[2]);
  const strip = new THREE.Mesh(new THREE.BoxGeometry(a.distanceTo(b), 0.005, 0.014), ledMat);
  strip.position.copy(a).add(b).multiplyScalar(0.5);
  const dir = b.clone().sub(a).normalize(), out = d.out && d.out.some(Boolean) ? B(d.out[0], d.out[1], d.out[2]).normalize() : null;          // out: the way an upright's strip faces
  if (out) strip.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(dir, out.clone().negate(), new THREE.Vector3().crossVectors(dir, out.clone().negate())));
  else strip.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);
  scene.add(strip);
  return { mid: strip.position, len: a.distanceTo(b), face: out || new THREE.Vector3(0, -1, 0), down: strip.quaternion.clone().multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2)) };
});
if (leds.length) RectAreaLightUniformsLib.init();
const ledLights = Array.from({ length: Math.min(lite ? 2 : 4, leds.length) }, () => {
  const p = new THREE.RectAreaLight(0xffffff, 0, 1, 0.03);
  scene.add(p);
  return p;
});
let ledLevel = 1;
function aimLeds(cam) {
  if (!ledLights.length) return;
  const near = leds.map((l) => ({ l, d: l.mid.distanceToSquared(cam) })).sort((x, y) => x.d - y.d);
  ledLights.forEach((p, i) => {
    const { l } = near[i];
    p.position.copy(l.mid).addScaledVector(l.face, 0.008);
    p.quaternion.copy(l.down);
    p.width = l.len;
    p.intensity = ledLevel * 50;
  });
}
const ledOn = $('ledOn'), ledDim = $('ledDim'), ledWarm = $('ledWarm');
function applyLeds() {
  const t = kelvinTint(+ledWarm.value);
  ledLevel = ledOn.checked ? ledDim.value / 100 : 0;
  const k = ledLevel > 0 ? 1.2 + 3 * ledLevel : 0.07;          // off: the strip is still there, just dark
  ledMat.color.setRGB(t.x * k, t.y * k, t.z * k);
  ledLights.forEach((p) => p.color.setRGB(t.x, t.y, t.z));
  $('ledK').textContent = `${Math.round(ledWarm.value / 50) * 50} K`;
  $('ledB').textContent = ledOn.checked ? `${ledDim.value}%` : 'Off';
}
[ledOn, ledDim, ledWarm].forEach((el) => el.addEventListener('input', applyLeds));
applyLeds();
if (params.get('led')) { const [on, b, k] = params.get('led').split(','); ledOn.checked = on !== '0'; if (b) ledDim.value = b; if (k) ledWarm.value = k; applyLeds(); }
$('ledRows').hidden = !leds.length;

// ---------------------------------------------------------------- site panels (Services, Portfolio, Finishes, About)
const site = await (await fetch('assets/site.json')).json();
const panel = $('panel'), panelBody = $('panelBody');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cap = (s) => s[0].toUpperCase() + s.slice(1);
// ---- Start Your Project: the same fields, checks and endpoints as the site's contact page
const TURNSTILE_KEY = params.get('tsk') || '';
const OPTIONS = {
  projectType: [['', 'Select a cabinet project type'], ['kitchen', 'Kitchen Cabinets'], ['closet', 'Custom Closet System'], ['vanity', 'Bathroom Vanity'],
    ['laundry-mudroom', 'Laundry / Mudroom Cabinets'], ['entertainment', 'Entertainment Center / Media Cabinet'], ['office', 'Office / Reception Casework'],
    ['bar-pantry', "Wet Bar / Butler's Pantry"], ['garage', 'Garage Storage Cabinets'], ['commercial', 'Commercial / Multi-unit']],
  budget: [['', 'Prefer not to say'], ['under-5k', 'Under $5,000'], ['5k-10k', '$5,000 - $10,000'], ['10k-20k', '$10,000 - $20,000'], ['20k-35k', '$20,000 - $35,000'], ['35k-plus', '$35,000+']],
  timeline: [['', 'Select a timeline'], ['asap', 'ASAP (as little as two weeks)'], ['1-2months', '1-2 months'], ['3-6months', '3-6 months'], ['planning', 'Just planning']],
};
const opts = (k, sel) => OPTIONS[k].map(([v, t]) => `<option value="${v}"${v === sel ? ' selected' : ''}>${esc(t)}</option>`).join('');
const contactForm = (ptype = '') => `<p class="eyebrow">Start Your Project</p><h2>Request a quote</h2>
  <p>Tell us about the room. We design it, price it and build it here in Houston. Free, no obligation.</p>
  <form id="quoteForm" class="quote" novalidate>
    <label>Full name *<input name="name" type="text" autocomplete="name" required></label>
    <div class="two">
      <label>Email *<input name="email" type="email" autocomplete="email" required></label>
      <label>Phone *<input name="phone" type="tel" autocomplete="tel" required></label>
    </div>
    <label>Project type *<select name="projectType" required>${opts('projectType', ptype)}</select></label>
    <div class="two">
      <label>Budget<select name="budget">${opts('budget', '')}</select></label>
      <label>Timeline *<select name="timeline" required>${opts('timeline', '')}</select></label>
    </div>
    <label>Project details<textarea name="message" rows="4" placeholder="Room sizes, style, finishes, anything you already know"></textarea></label>
    <div class="files">
      <button type="button" id="filePick" class="pick">Attach plans or photos</button>
      <span>PDF, JPG or PNG, up to 25 MB each</span>
      <input id="fileInput" type="file" accept=".pdf,.jpg,.jpeg,.png" multiple hidden>
      <ul id="fileList"></ul>
    </div>
    <input name="company_website" type="text" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true">
    <div id="turnstile"></div>
    <p class="form-msg" id="formMsg" role="alert"></p>
    <button type="submit" class="btn gold" id="quoteSend">Send request</button>
    <p class="alt">Prefer to talk? <a href="tel:+17135020399">(713) 502-0399</a> &nbsp;&middot;&nbsp; <a href="mailto:orders@yudezign.com">orders@yudezign.com</a></p>
  </form>`;
let quoteFiles = [], formLoadedAt = 0, turnstileToken = '', turnstileId;
const MAX_FILE_MB = 25;                                  // enforced again in /api/upload-token
const cleanName = (n) => { const d = n.lastIndexOf('.'); const b = (d > -1 ? n.slice(0, d) : n).replace(/[^\w.-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 120); return (b || 'file') + (d > -1 ? n.slice(d).toLowerCase() : ''); };
function initContactForm() {
  quoteFiles = []; formLoadedAt = Date.now(); turnstileToken = ''; turnstileId = undefined;
  const form = $('quoteForm'), msg = $('formMsg'), list = $('fileList'), input = $('fileInput');
  const say = (t, ok) => { msg.textContent = t; msg.classList.toggle('ok', !!ok); if (t && !ok) msg.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
  const drawFiles = () => {
    list.innerHTML = quoteFiles.map((f, i) => `<li>${esc(f.name)} <button type="button" data-rm="${i}" aria-label="Remove ${esc(f.name)}">&times;</button></li>`).join('');
  };
  $('filePick').onclick = () => input.click();
  input.onchange = () => {
    const errs = [];
    for (const f of input.files) {
      if (f.size > MAX_FILE_MB * 1024 * 1024) errs.push(`${f.name} is ${(f.size / 1048576).toFixed(1)} MB and was not added. The limit is ${MAX_FILE_MB} MB per file.`);
      else if (!['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'].includes(f.type)) errs.push(`${f.name} was not added. Only PDF, JPG and PNG files can be attached.`);
      else quoteFiles.push(f);
    }
    input.value = ''; drawFiles(); say(errs.join(' '));
  };
  list.onclick = (e) => { const b = e.target.closest('[data-rm]'); if (b) { quoteFiles.splice(+b.dataset.rm, 1); drawFiles(); } };
  if (TURNSTILE_KEY) {                                   // same invisible check as the contact page
    const render = () => { if (window.turnstile && turnstileId === undefined && $('turnstile')) turnstileId = window.turnstile.render($('turnstile'), { sitekey: TURNSTILE_KEY, theme: 'dark', callback: (t) => { turnstileToken = t; }, 'expired-callback': () => { turnstileToken = ''; }, 'error-callback': () => { turnstileToken = ''; } }); };
    if (!document.getElementById('cf-turnstile-script')) {
      const sc = Object.assign(document.createElement('script'), { id: 'cf-turnstile-script', src: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit', async: true, defer: true, onload: render });
      document.head.appendChild(sc);
    } else render();
  }
  form.onsubmit = async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const fd = Object.fromEntries(new FormData(form).entries());
    const honeypot = fd.company_website; delete fd.company_website;
    if (TURNSTILE_KEY && !turnstileToken) { say('Please complete the verification challenge, then submit again.'); return; }
    const send = $('quoteSend');
    send.disabled = true; send.textContent = quoteFiles.length ? 'Uploading files' : 'Sending';
    try {
      const attachments = [];
      if (quoteFiles.length) {                            // files go straight from the browser to storage, so large ones are fine
        try {
          const { upload } = await import('./blob-client.js');
          for (const [i, f] of quoteFiles.entries()) {
            const label = quoteFiles.length > 1 ? `Uploading file ${i + 1} of ${quoteFiles.length}` : 'Uploading file';
            const blob = await upload(`${Date.now()}-${cleanName(f.name)}`, f, { access: 'public', handleUploadUrl: '/api/upload-token',
              contentType: f.type === 'image/jpg' ? 'image/jpeg' : f.type, onUploadProgress: ({ percentage }) => { send.textContent = `${label} ${Math.round(percentage)}%`; } });
            attachments.push(blob.url);
          }
        } catch (err) { console.error(err); throw new Error('Failed to upload files. Please try again or contact us directly.'); }
      }
      send.textContent = 'Sending';
      const r = await fetch('/api/contact-submit', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fd, attachments, honeypot, formLoadedAt, turnstileToken }) });
      if (!r.ok) {
        let m = 'Unable to submit form. Please try again or contact us directly.';
        try { const j = await r.json(); if (j?.error) m = j.error; } catch { /* keep the default */ }
        if (window.turnstile && turnstileId !== undefined) { window.turnstile.reset(turnstileId); turnstileToken = ''; }
        throw new Error(m);
      }
      panelBody.innerHTML = '<p class="eyebrow">Thank you</p><h2>Your request is in.</h2><p>We will review it and get back to you shortly. For anything urgent, call <a href="tel:+17135020399">(713) 502-0399</a>.</p>';
    } catch (err) {
      say(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
      send.disabled = false; send.textContent = 'Send request';
    }
  };
}

const RESOURCES = [
  ['Learn', [['Finishes &amp; Materials', '/finishes'], ['Blog', '/blog'], ['FAQ', '/faq'], ['Brochures &amp; Downloads', '/downloads']]],
  ['Plan', [['Pricing Guide', '/pricing'], ['Room Visualizer', '/visualizer'], ['KD Lite Design Tool', '/kdlite'], ['Showroom', '/showroom'], ['Stocked RTA Cabinets', '/rta-cabinets']]],
  ['Areas Served', [['Houston', '/locations/houston'], ['Katy', '/locations/katy'], ['Sugar Land', '/locations/sugar-land'], ['The Woodlands', '/locations/the-woodlands'], ['Memorial', '/locations/memorial'], ['Pearland', '/locations/pearland'], ['Cypress', '/locations/cypress'], ['River Oaks', '/locations/river-oaks'], ['Galleria', '/locations/galleria'], ['West University', '/locations/west-university']]],
];
const PANELS = {
  contact: (ptype) => contactForm(ptype),
  // the site's existing pages, grouped as in its Resources menu
  resources: () => `<p class="eyebrow">Resources</p><h2>Guides and tools</h2>${RESOURCES.map(([head, links]) => `<section class="res"><h3>${head}</h3>${links.map(([t, href]) => `<a href="${href}">${t}</a>`).join('')}</section>`).join('')}
    <p class="foot-links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="/sales/login">Sales Portal</a><a href="/admin/login">Admin</a></p>`,
  menu: () => `<h2>Menu</h2><div class="menu-list">${['services', 'portfolio', 'finishes', 'resources', 'about', 'contact'].map((p) => `<button type="button" data-panel="${p}">${p === 'contact' ? 'Start Your Project' : cap(p)}</button>`).join('')}</div>`,
  services: () => `<p class="eyebrow">Services</p><h2>What we build</h2><ul class="svc">${site.services.map(([n, t, href]) => `<li><h3>${href ? `<a href="${href}">${esc(n)}</a>` : esc(n)}</h3><p>${esc(t)}</p></li>`).join('')}</ul><a class="btn gold" href="#" data-panel="contact">Start Your Project</a>`,
  finishes: () => `<p class="eyebrow">Finishes</p><h2>Twenty colours, four Styles</h2><p><a href="/finishes">Open the full finishes page</a></p>${site.styles.map((st) => `<section class="style"><h3>${esc(st.name)}</h3><p>${esc(st.description.split('. ')[0])}.</p><div class="sw">${site.finishes.filter((f) => f.style === st.id).sort((a, b) => a.order - b.order).map((f) => `<figure><img src="${f.image}" alt="" loading="lazy" style="background:${f.color}"><figcaption>${esc(f.name)}</figcaption></figure>`).join('')}</div></section>`).join('')}`,
  about: () => `<p class="eyebrow">About</p><h2>Houston cabinet makers since 2007</h2>${site.about.story.map((p) => `<p>${esc(p)}</p>`).join('')}<div class="stats">${site.about.stats.map(([n, l]) => `<div><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join('')}</div><div class="contact"><p>${esc(site.about.contact.address)}</p><p><a href="tel:+17135020399">${esc(site.about.contact.phone)}</a> &nbsp;&middot;&nbsp; <a href="mailto:${esc(site.about.contact.email)}">${esc(site.about.contact.email)}</a></p><p>${esc(site.about.contact.hours)}</p></div><p class="foot-links"><a href="/about">More about us</a><a href="/sales/login">Sales Portal</a><a href="/admin/login">Admin</a></p>`,
  portfolio: (cat = 'all') => {
    const cats = ['all', 'kitchens', 'closets', 'vanities', 'custom', 'commercial'];
    const list = site.projects.map((p, i) => [p, i]).filter(([p]) => cat === 'all' || p.category === cat);
    return `<p class="eyebrow">Portfolio</p><h2>Built work</h2><div class="filters">${cats.map((c) => `<button type="button" data-cat="${c}" class="${c === cat ? 'on' : ''}">${c}</button>`).join('')}</div><div class="grid">${list.map(([p, i]) => `<button type="button" data-project="${i}" class="${p.videos.length ? 'play' : ''}"><img src="${p.thumb}" alt="" loading="lazy"><span>${esc(p.title)}</span></button>`).join('')}</div>`;
  },
};
function openPanel(name, arg) {
  panelBody.innerHTML = PANELS[name](arg);
  if (name === 'contact') initContactForm();
  panel.hidden = false;
  requestAnimationFrame(() => panel.classList.add('open'));
  if (!arg) panelBody.scrollTop = 0;
}
function closePanel() { panel.classList.remove('open'); setTimeout(() => { panel.hidden = true; }, 350); }
document.addEventListener('click', (e) => {
  const p = e.target.closest('[data-panel]');
  if (p) { e.preventDefault(); openPanel(p.dataset.panel, p.dataset.ptype || undefined); return; }
  const c = e.target.closest('[data-cat]');
  if (c) { openPanel('portfolio', c.dataset.cat); return; }
  const pr = e.target.closest('[data-project]');
  if (pr) {
    const proj = site.projects[+pr.dataset.project];
    openLightbox({ title: proj.title, src: proj.images[0] || proj.thumb, video: proj.videos[0] || null, text: proj.description });
  }
});
$('panelClose').onclick = closePanel;
$('panelShade').onclick = closePanel;
if (params.get('panel')) openPanel(params.get('panel'));

// ---------------------------------------------------------------- picking
const ray = new THREE.Raycaster();
const ndc = new THREE.Vector2();
function pick(e) {
  ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObjects(pickables, true)[0];
  if (!hit || hit.distance > 14) return null;
  let o = hit.object;
  while (o && !o.userData.type) o = o.parent;
  return o ? o.userData : null;
}
let down = null;
canvas.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
canvas.addEventListener('pointerup', (e) => {
  if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 8) return;
  const u = pick(e);
  if (u?.type === 'movable') u.rec.want = u.rec.want ? 0 : 1;
  else if (u?.type === 'frame') openLightbox(u.frame);
  else if (u?.type === 'piece') { const i = stops.findIndex((s) => s.sku === u.sku); if (i >= 0) goTo(i); }
});
if (!lite) canvas.addEventListener('pointermove', (e) => { canvas.style.cursor = pick(e) ? 'pointer' : ''; });

// ---------------------------------------------------------------- frame loop
const clock = new THREE.Clock();
renderer.info.autoReset = false;
const perf = { n: 0, ms: 0, calls: 0, tris: 0 };
const slow = { n: 0, ms: 0 };
window.__perf = () => { const r = { fps: Math.round(1000 / (perf.ms / Math.max(perf.n, 1))), calls: perf.calls, tris: perf.tris, textures: renderer.info.memory.textures, geometries: renderer.info.memory.geometries, dpr: renderer.getPixelRatio() }; perf.n = 0; perf.ms = 0; return r; };
const lerpAngle = (a, b, t) => a + (((b - a + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI) * t;
function tick() {
  const dt = Math.min(clock.getDelta(), 0.1);
  renderer.info.reset();
  const want = clamp(scrollY / sectionHeight(), 0, stops.length - 1);
  pos = reduceMotion || params.has('stop') && clock.elapsedTime < 1 ? want : pos + (want - pos) * (1 - Math.exp(-dt * 3.2));
  const i = Math.min(Math.floor(pos), stops.length - 2), t = pos - i;
  const s = THREE.MathUtils.lerp(t, t * t * (3 - 2 * t), 0.65);       // settle a little at each stop
  const a = keys[i], b = keys[i + 1];
  look.x += (look.tx - look.x) * (1 - Math.exp(-dt * 4));
  look.y += (look.ty - look.y) * (1 - Math.exp(-dt * 4));
  camera.position.lerpVectors(a.pos, b.pos, s);
  camera.rotation.set(THREE.MathUtils.lerp(a.pitch, b.pitch, s) - look.y * 0.07, lerpAngle(a.yaw, b.yaw, s) - look.x * 0.16, 0);
  camera.fov = THREE.MathUtils.lerp(a.fov, b.fov, s);
  camera.updateProjectionMatrix();
  for (const r of movables) {
    if (r.t === r.want) continue;
    r.t += Math.sign(r.want - r.t) * Math.min(Math.abs(r.want - r.t), dt * 1.6);
    r.apply(r.t * r.t * (3 - 2 * r.t));
  }
  aimSpots(camera.position.x);
  aimLeds(camera.position);
  updateWingScreens(camera.position.x);

  const near = Math.round(pos);
  if (near !== active) showStop(near);
  const settle = Math.abs(pos - near);
  $('card').style.opacity = stops[near].kind === 'intro' || stops[near].kind === 'finale' ? '' : String(clamp(1.6 - settle * 5, 0, 1));
  $('progressBar').style.width = `${(pos / (stops.length - 1)) * 100}%`;

  if (composer) composer.render(dt); else renderer.render(scene, camera);
  slow.n++; slow.ms += dt * 1000;
  if (slow.n >= 45) {
    const avg = slow.ms / slow.n;
    slow.n = 0; slow.ms = 0;
    if (avg > 26 && clock.elapsedTime > 4) {
      if (dpr > 0.8) { dpr = Math.max(0.75, dpr - 0.25); renderer.setPixelRatio(dpr); resize(); }
      else if (floor.material.uniforms && floor.material.uniforms.uStrength.value > 0) {
        floor.material.uniforms.uStrength.value = 0;         // keep the baked floor, stop mirroring the room
        floor.onBeforeRender = () => {};
      }
    }
  }
  perf.n++; perf.ms += dt * 1000; perf.calls = renderer.info.render.calls; perf.tris = renderer.info.render.triangles;
  requestAnimationFrame(tick);
}

manager.onLoad = () => {
  $('loader').classList.add('done');
  window.__galleryReady = true;
};
showStop(startStop);
requestAnimationFrame(tick);
