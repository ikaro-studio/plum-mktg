'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/cn';

const GLYPHS = ' .,:;-+=*o#%@';
const CELL_W = 9;
const CELL_H = 14;

type Palette = {
  c0: THREE.Color;
  c1: THREE.Color;
  c2: THREE.Color;
  c3: THREE.Color;
  bg: THREE.Color;
  glyphAlpha: number;
};

function cssColor(cs: CSSStyleDeclaration, name: string, fallback: string) {
  const raw = cs.getPropertyValue(name).trim() || fallback;
  return new THREE.Color(raw);
}

function readPalette(): Palette {
  const cs = getComputedStyle(document.documentElement);
  const isDark = document.documentElement.classList.contains('dark');
  return {
    c0: cssColor(cs, isDark ? '--plum-900' : '--cream-100', '#F1EDEE'),
    c1: cssColor(cs, isDark ? '--plum-700' : '--peach-400', '#F8BC9F'),
    c2: cssColor(cs, '--rose-500', '#AA5476'),
    c3: cssColor(cs, isDark ? '--peach-400' : '--plum-800', '#4A1B3B'),
    bg: cssColor(cs, '--bg', '#F1EDEE'),
    glyphAlpha: isDark ? 0.46 : 0.41
  };
}

function buildAtlas() {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = CELL_W * GLYPHS.length;
  const h = CELL_H;
  const canvas = document.createElement('canvas');
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);
  ctx.font = `600 ${CELL_H - 2}px "JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  for (let i = 0; i < GLYPHS.length; i++) {
    ctx.fillText(GLYPHS[i], i * CELL_W + CELL_W / 2, CELL_H / 2);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

const VERT = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform vec2  u_resolution;
  uniform vec2  u_mouse;
  uniform float u_time;
  uniform vec2  u_cellSize;
  uniform sampler2D u_atlas;
  uniform float u_glyphCount;
  uniform vec3  u_c0;
  uniform vec3  u_c1;
  uniform vec3  u_c2;
  uniform vec3  u_c3;
  uniform vec3  u_bg;
  uniform float u_glyphAlpha;
  uniform float u_mouseBoost;
  uniform float u_flowSpeed;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),                  hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * vnoise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  vec3 gradient(float t) {
    t = clamp(t, 0.0, 1.0);
    if (t < 0.3333) return mix(u_c0, u_c1, t / 0.3333);
    if (t < 0.6666) return mix(u_c1, u_c2, (t - 0.3333) / 0.3333);
    return mix(u_c2, u_c3, (t - 0.6666) / 0.3334);
  }

  void main() {
    vec2 cell = floor(gl_FragCoord.xy / u_cellSize);
    vec2 cellCenter = (cell + 0.5) * u_cellSize;

    // Aspect-correct coords, centered, scaled by height
    vec2 p  = (cellCenter - 0.5 * u_resolution) / u_resolution.y;
    vec2 mp = (u_mouse * u_resolution - 0.5 * u_resolution) / u_resolution.y;

    vec2  toMouse = p - mp;
    float distM   = length(toMouse);

    // Cursor gently warps the noise field
    vec2 warp = -toMouse * 0.35 * exp(-distM * 1.4);

    float t1 = u_time * u_flowSpeed;
    float n1 = fbm(p * 1.5 + warp * 2.0 + vec2(t1, t1 * 0.7));
    float n2 = fbm(p * 3.6 - warp * 1.2 + vec2(-t1 * 0.6, t1 * 0.4) + 5.0);
    float field = mix(n1, n2, 0.55);

    // Heat halo around the cursor
    field = clamp(field + exp(-distM * 2.2) * u_mouseBoost, 0.0, 1.0);

    // Per-cell jitter so glyphs read as hand-painted, not stamped
    float jBright = (hash(cell + 17.3) - 0.5) * 0.08;
    field = clamp(field + jBright, 0.0, 1.0);

    // Glyph index from field
    float gIndex = clamp(floor(pow(field, 1.15) * u_glyphCount), 0.0, u_glyphCount - 1.0);

    // Tiny per-cell rotation for organic feel; clamp to avoid sampling neighbors
    vec2 localUv = fract(gl_FragCoord.xy / u_cellSize);
    float ang = (hash(cell + 3.7) - 0.5) * 0.18;
    float s = sin(ang);
    float c = cos(ang);
    vec2 r = mat2(c, -s, s, c) * (localUv - 0.5) + 0.5;
    float mask = 0.0;
    if (r.x >= 0.0 && r.x <= 1.0 && r.y >= 0.0 && r.y <= 1.0) {
      vec2 atlasUv = vec2((gIndex + r.x) / u_glyphCount, 1.0 - r.y);
      mask = texture2D(u_atlas, atlasUv).a;
    }

    // Single painted color per glyph (cell-center sample) — reads as a brushstroke
    vec3 painted = gradient(field);
    vec3 col = mix(u_bg, painted, mask * u_glyphAlpha);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function AsciiHeroBackground({ className }: { className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;display:block;';
    wrapper.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const atlas = buildAtlas();
    const initial = readPalette();

    const uniforms = {
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.55) },
      u_time: { value: 0 },
      u_cellSize: { value: new THREE.Vector2(CELL_W, CELL_H) },
      u_atlas: { value: atlas },
      u_glyphCount: { value: GLYPHS.length },
      u_c0: { value: initial.c0 },
      u_c1: { value: initial.c1 },
      u_c2: { value: initial.c2 },
      u_c3: { value: initial.c3 },
      u_bg: { value: initial.bg },
      u_glyphAlpha: { value: initial.glyphAlpha },
      u_mouseBoost: { value: prefersReduced ? 0.18 : 0.42 },
      u_flowSpeed: { value: prefersReduced ? 0.0 : 0.06 }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const resize = () => {
      const { clientWidth, clientHeight } = wrapper;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight, false);
      const dpr = renderer.getPixelRatio();
      uniforms.u_resolution.value.set(clientWidth * dpr, clientHeight * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);

    const target = new THREE.Vector2(0.5, 0.55);
    const onMove = (e: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      target.set(
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height
      );
    };
    const onLeave = () => target.set(0.5, 0.55);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    const themeObserver = new MutationObserver(() => {
      const next = readPalette();
      uniforms.u_c0.value = next.c0;
      uniforms.u_c1.value = next.c1;
      uniforms.u_c2.value = next.c2;
      uniforms.u_c3.value = next.c3;
      uniforms.u_bg.value = next.bg;
      uniforms.u_glyphAlpha.value = next.glyphAlpha;
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    const start = performance.now();
    let rafId = 0;
    const loop = () => {
      uniforms.u_time.value = (performance.now() - start) / 1000;
      uniforms.u_mouse.value.lerp(target, 0.08);
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      themeObserver.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      quad.geometry.dispose();
      material.dispose();
      atlas.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === wrapper) {
        wrapper.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        '[mask-image:linear-gradient(180deg,#000_0%,#000_55%,transparent_100%)]',
        '[-webkit-mask-image:linear-gradient(180deg,#000_0%,#000_55%,transparent_100%)]',
        className
      )}
    />
  );
}
