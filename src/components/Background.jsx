import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { easing } from "maath";
import { Typewriter } from "react-simple-typewriter";
import SimplexNoise from "simplex-noise";
import { Html, useProgress } from "@react-three/drei";

// ShaderMaterial 工厂 - 添加镭射效果
const makeMaterial = () => {
  return new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color("#f7c6d0") },
      color2: { value: new THREE.Color("#c9a3ff") },
      rimBoost: { value: 0.5 },
      specularBoost: { value: 1.0 },
      iridescence: { value: 1.2 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPos;
      varying vec3 vWorldPos;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPos = position;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      uniform float time;
      uniform float rimBoost;
      uniform float specularBoost;
      uniform float iridescence;
      varying vec3 vNormal;
      varying vec3 vPos;
      varying vec3 vWorldPos;

      float hash21(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      vec3 rainbow(float t) {
        t = fract(t);
        vec3 c = 1.0 - pow(abs(vec3(
          cos(t * 6.28318 * 1.0),
          cos(t * 6.28318 * 1.2),
          cos(t * 6.28318 * 1.4)
        )), vec3(1.8));
        return c;
      }

      void main() {
        vec3 N = normalize(vNormal);
        vec3 V = normalize(cameraPosition - vWorldPos);
        vec3 L = normalize(vec3(5.0, 5.0, 5.0) - vWorldPos);

        float NdotL = max(dot(N, L), 0.0);
        float NdotV = max(dot(N, V), 0.0);

        float fresnel = pow(1.0 - abs(NdotV), 3.0) * rimBoost * 0.7;
        float spec = pow(max(dot(reflect(-L, N), V), 0.0), 24.0) * specularBoost;

        float grad = clamp((vPos.y + 1.2) / 2.4, 0.0, 1.0);
        vec3 base = mix(color1, color2, grad);

        float angle = atan(vPos.z, vPos.x);
        float radius = length(vPos.xz);
        float spiral = 0.5 + 0.5 * sin(angle * 8.0 - radius * 10.0 + time * 1.2);

        vec3 iridescent = rainbow(NdotV * 2.0 + time * 0.3 + spiral * 0.3) * 0.4;
        float flow = sin(vPos.y * 4.0 + time * 2.0) * 0.08;
        float detail = hash21(vPos.xz * 8.0 + time * 0.3) * 0.08;

        vec3 color = base * (0.3 + 0.7 * NdotL);
        color = mix(color, base * 1.2, spiral * 0.6);
        color += iridescent * iridescence * (fresnel + 0.1);
        color += spec * vec3(1.0) * 0.8;
        color += fresnel * vec3(0.9, 0.85, 1.0) * 0.4;
        color += flow * vec3(0.15, 0.08, 0.25);
        color += detail;

        color = pow(color, vec3(1.1));
        color = clamp(color, 0.0, 1.1);

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });
};

// Blob 组件
function Blob({ shapePositions, geomRef, material, posRef, fracRef, rotationSpeedRef, colorPairs }) {
  const meshRef = useRef();
  const targetQuat = useRef(new THREE.Quaternion());
  const autoRotation = useRef(0);

  const scaleRef = useRef(0);
  const scaleVel = useRef(0);

  useFrame((state, delta) => {
    const shapesCount = 3;

    // 果冻缩放动画
    const targetScale = 1;
    const stiffness = 10;
    const damping = 5;
    const force = stiffness * (targetScale - scaleRef.current) - damping * scaleVel.current;
    scaleVel.current += force * delta;
    scaleRef.current += scaleVel.current * delta;

    if (meshRef.current) {
      meshRef.current.scale.setScalar(scaleRef.current);
    }

    // 顶点插值
    const totalPos = posRef.current;
    const floorPos = Math.floor(totalPos);
    let frac = totalPos - floorPos;

    let idx = ((floorPos % shapesCount) + shapesCount) % shapesCount;
    let nextIdx, t;
    if (frac >= 0) {
      nextIdx = (idx + 1) % shapesCount;
      t = frac;
    } else {
      nextIdx = (idx - 1 + shapesCount) % shapesCount;
      t = -frac;
    }

    easing.damp(fracRef, t, 6, delta);
    const smoothT = fracRef.current;

    const targetArr = shapePositions[idx];
    const nextArr = shapePositions[nextIdx];
    const geom = geomRef.current;
    const posAttr = geom.attributes.position.array;
    for (let i = 0; i < posAttr.length; i++) {
      posAttr[i] = targetArr[i] * (1 - smoothT) + nextArr[i] * smoothT;
    }
    geom.attributes.position.needsUpdate = true;
    geom.computeVertexNormals();

    if (meshRef.current) {
      meshRef.current.geometry = geom;

      // 自动旋转
      autoRotation.current += delta * 0.2;
      const targetY = posRef.current * Math.PI * 2 * 0.25 + autoRotation.current;
      targetQuat.current.setFromEuler(
        new THREE.Euler(0, targetY, Math.sin(autoRotation.current * 0.3) * 0.08)
      );
      meshRef.current.quaternion.slerp(targetQuat.current, 0.03);

      // ✅ 使用 smoothT 来做颜色插值
      const cA1 = colorPairs[idx][0];
      const cA2 = colorPairs[idx][1];
      const cB1 = colorPairs[nextIdx][0];
      const cB2 = colorPairs[nextIdx][1];

      const lerped1 = cA1.clone().lerp(cB1, smoothT);
      const lerped2 = cA2.clone().lerp(cB2, smoothT);

      material.uniforms.color1.value.copy(lerped1);
      material.uniforms.color2.value.copy(lerped2);
      material.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  return <mesh ref={meshRef} material={material} castShadow />;
}

function LoaderOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-4 border-t-pink-300 border-r-purple-300 border-b-transparent border-l-transparent animate-spin"></div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { progress } = useProgress();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setLoaded(true));
    }
  }, [progress]);

  const sectionStyle = {
    background: "linear-gradient(135deg, #0e0e0e, #3a2b47, #dab6d9,#f7b7dd)",
  };

  const posRef = useRef(0);
  const fracRef = useRef(0);
  const rotationSpeedRef = useRef(0.2);

  const baseGeo = useMemo(() => new THREE.IcosahedronGeometry(1.0, 6), []);
  const simplex = useMemo(() => new SimplexNoise(), []);

  // 三种形状
  const shapePositions = useMemo(() => {
    const out = [];
    const vec = new THREE.Vector3();

    for (let s = 0; s < 3; s++) {
      const arr = baseGeo.attributes.position.array.slice();
      for (let i = 0; i < arr.length; i += 3) {
        vec.set(arr[i], arr[i + 1], arr[i + 2]);
        const norm = vec.clone().normalize();
        const r = vec.length();

        if (s === 0) {
          const theta = Math.atan2(vec.z, vec.x);
          const disp = Math.sin(theta * 5.5 + vec.y * 6.0) * 0.18 * (0.8 + 0.2 * Math.sin(r * 6.0));
          arr[i] += norm.x * disp;
          arr[i + 1] += norm.y * disp * 0.9;
          arr[i + 2] += norm.z * disp;
        } else if (s === 1) {
          // 爱心
          const x = vec.x;
          const y = vec.y;
          const z = vec.z;
          const heartX = x * (1.0 + 0.3 * Math.sin(Math.atan2(z, x) * 2.0) * (1.0 - Math.abs(y)));
          const heartY = y * 1.2 + 0.2 * Math.sqrt(Math.max(0.0, 1.0 - x * x - z * z));
          const heartZ = z * (1.0 + 0.3 * Math.cos(Math.atan2(z, x) * 2.0) * (1.0 - Math.abs(y)));
          const blend = 0.8;
          arr[i] = blend * heartX + (1.0 - blend) * vec.x;
          arr[i + 1] = blend * heartY + (1.0 - blend) * vec.y;
          arr[i + 2] = blend * heartZ + (1.0 - blend) * vec.z;
          const noise = simplex.noise3D(vec.x * 5.0, vec.y * 5.0, vec.z * 5.0) * 0.06;
          arr[i] += noise;
          arr[i + 1] += noise * 0.2;
          arr[i + 2] += noise;
        } else {
          // 蝴蝶
          const angle = Math.atan2(vec.z, vec.x);
          const wingFactor = Math.sin(angle * 4.0) * 0.8;
          const wingShape = Math.pow(Math.abs(wingFactor), 0.7) * Math.sign(wingFactor);
          const body = Math.exp(-Math.pow(vec.y, 2.0) * 8.0) * 0.4;
          arr[i] = vec.x * (1.0 + wingShape * 0.6 + body * 0.3);
          arr[i + 1] = vec.y * (1.0 + body * 0.8 - Math.abs(wingShape) * 0.2);
          arr[i + 2] = vec.z * (1.0 + wingShape * 0.6 + body * 0.3);
          const noise = simplex.noise3D(vec.x * 4.0, vec.y * 4.0, vec.z * 4.0) * 0.08;
          arr[i] += noise;
          arr[i + 1] += noise * 0.3;
          arr[i + 2] += noise;
        }
      }
      out.push(arr);
    }
    return out;
  }, [baseGeo, simplex]);

  const material = useMemo(() => makeMaterial(), []);
  const colorPairs = useMemo(
    () => [
      [new THREE.Color("#f7c6d0"), new THREE.Color("#c9a3ff")],
      [new THREE.Color("#a3e7ff"), new THREE.Color("#ffb3e6")],
      [new THREE.Color("#ffe3a3"), new THREE.Color("#b3fffa")],
    ],
    []
  );

  const geomRef = useRef();
  useEffect(() => {
    if (!geomRef.current) {
      geomRef.current = baseGeo.clone();
    }
  }, [baseGeo]);

  return (
    <div style={sectionStyle} className="pt-16">
      <section
        id="background"
        className="relative min-h-screen w-full px-6 py-20 text-white overflow-hidden"
        style={sectionStyle}
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-3xl animate-pulse" />
        {!loaded && <LoaderOverlay progress={progress} />}

        <div className="absolute bottom-10 w-full flex justify-center text-white text-sm opacity-80 z-40 pointer-events-none">
          ← Swipe / Drag → (desktop wheel / drag or mobile one-finger)
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Canvas
            shadows
            camera={{ position: [0, 0, 6], fov: 45 }}
            onPointerDown={(e) => {
              dragging = true;
              startX = e.clientX || (e.touches && e.touches[0].clientX);
              startPos = posRef.current;
            }}
            onPointerMove={(e) => {
              if (!dragging) return;
              const x = e.clientX || (e.touches && e.touches[0].clientX);
              const dx = x - startX;
              posRef.current = startPos - dx / (window.innerWidth * 10); // 移动端更柔和
            }}
            onPointerUp={() => {
              dragging = false;
              posRef.current = Math.round(posRef.current);
            }}
            onPointerLeave={() => {
              dragging = false;
            }}
            onWheel={(e) => {
              const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
              posRef.current += delta > 0 ? 0.03 : -0.03;
            }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
            <pointLight position={[-5, -5, 5]} intensity={0.4} color="#a3e7ff" />
            <Environment files="/textures/studio_small_03_4k.exr" background={false} />
            <ContactShadows position={[0.2, -1.3, 0]} scale={5} blur={1} opacity={0.5} far={4} />

            <Blob
              shapePositions={shapePositions}
              geomRef={geomRef}
              material={material}
              posRef={posRef}
              fracRef={fracRef}
              rotationSpeedRef={rotationSpeedRef}
              colorPairs={colorPairs}
            />
            <OrbitControls enableZoom={false} enabled={false} />
          </Canvas>
        </div>

        <div
          className={`
            absolute inset-0 z-20 flex flex-col items-center md:flex-row justify-center md:justify-end
            px-6 md:px-20 text-center md:text-right pointer-events-none gap-6
            transition-opacity duration-1000
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
          }}
        >
          <div className="text-white w-full max-w-sm sm:max-w-md md:max-w-xl space-y-6 pointer-events-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-purple-600 via-pink-400 to-white text-transparent bg-clip-text drop-shadow-2xl">
              Hi, I'm{" "}
              <span
                className="text-white drop-shadow-xl"
                style={{
                  textShadow:
                    "0 0 10px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)",
                }}
              >
                <Typewriter
                  words={[
                    "Kay Khaing Win",
                    "a Full Stack Developer",
                    "an UI/UX Designer",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={100}
                  deleteSpeed={80}
                  delaySpeed={1500}
                />
              </span>
            </h1>
            <p
              className="text-base sm:text-sm md:text-md text-gray-200 drop-shadow-2xl leading-relaxed animate-fadeIn delay-500"
              style={{
                textShadow:
                  "0 0 8px rgba(0,0,0,0.7), 0 0 15px rgba(0,0,0,0.5)",
              }}
            >
              A Full Stack Developer and UI/UX Designer exploring the world of 3D.
            </p>

            <div className="relative">
              <a
                href="/KKW_resume.pdf"
                download
                className="inline-block z-20 bg-white text-pink-600 px-5 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base shadow-xl hover:scale-105 active:animate-pingShort animate-fadeIn delay-1000 pointer-events-auto"
                style={{ textShadow: "none" }}
              >
                📄 Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
