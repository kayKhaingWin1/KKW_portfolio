import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html, useProgress, useGLTF } from "@react-three/drei";
import GamingSetup from "./GamingSetup";
import Anya from "./Anya";
import { Typewriter } from 'react-simple-typewriter';


export default function Background() {
  const sectionStyle = {
    background: "linear-gradient(135deg, #0e0e0e, #3a2b47, #dab6d9,#f7b7dd)",
  };

  return (
    <div style={sectionStyle} className="pt-16">
      <section
        id="background"
        className="relative min-h-screen w-full px-6 py-20 text-white overflow-hidden"
        style={sectionStyle}
      >

        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-3xl animate-pulse" />

        <div className="absolute inset-0 z-10 flex items-end md:items-center justify-center md:justify-start">
          <Canvas camera={{ position: [0, 2, 7], fov: 50 }} className="w-full h-full">
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <AnimatedScene />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
          </Canvas>
        </div>
        <div className="absolute inset-0 z-20 flex flex-col items-center md:flex-row justify-center md:justify-end px-6 md:px-20 text-center md:text-right pointer-events-none gap-6">
          <div className="text-white w-full max-w-sm sm:max-w-md md:max-w-xl space-y-6 pointer-events-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-purple-400 via-pink-300 to-white text-transparent bg-clip-text drop-shadow-2xl">
              Hi, I'm{" "}
              <span className="text-white drop-shadow-xl">
                <Typewriter
                  words={["Kay Khaing Win", "a Full Stack Developer", "an UI/UX Designer"]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={100}
                  deleteSpeed={80}
                  delaySpeed={1500}
                />
              </span>
            </h1>
            <p className="text-base sm:text-sm md:text-md text-gray-200 drop-shadow-2xl leading-relaxed animate-fadeIn delay-500">
              A Full Stack Developer and UI/UX Designer exploring the world of 3D.
            </p>

            <div className="relative">
              <a
                href="/resume.pdf"
                download
                className="inline-block z-20 bg-white text-pink-600 px-5 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base shadow-xl hover:scale-105 active:animate-pingShort animate-fadeIn delay-1000"
              >
                📄 Download Resume
              </a>
            </div>
          </div>


          {/* <div className="hidden md:flex flex-col items-center gap-2 text-white opacity-60 animate-fadeIn delay-1000">
            <RotateCcw className="w-6 h-6 animate-spin-slow" />
            <span className="text-xs">Drag to rotate</span>
          </div> */}
        </div>
      </section>
    </div>
  );
}

useGLTF.preload("/path-to-gaming-setup.glb");
useGLTF.preload("/path-to-anya.glb");

function Loader() {
  const { progress } = useProgress();
  return (
    <Html className=" relative ">
      <div className="flex absolute bottom-28 space-y-2 space-x-3">
        <div className="w-12 h-12 border-4 border-t-pink-300 border-b-purple-300 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        <div className="text-white text-lg font-bold">
          Loading 3D... {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  );
}

function AnimatedScene() {
  const groupRef = useRef();
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const anyaPosition = isMobile ? [-0.2, -2, 2] : [-4.2, -1.4, 0];
  const setupPosition = isMobile ? [0.5, -1.5, -2] : [-3.5, -1.5, -2];

  // 鼠标驱动轻微旋转
  useFrame(({ mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = mouse.x * 0.3;
      groupRef.current.rotation.x = mouse.y * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[-1, 0, 0]}>
      {/* <Suspense fallback={null}>
        <ambientLight intensity={0.2} color="#442266" />
        <directionalLight
          position={[5, 10, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <GamingSetup position={setupPosition} scale={12} castShadow />
        <Anya position={anyaPosition} scale={2.4} castShadow />

        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.5}
          scale={20}
          blur={2.5}
          far={4}
          color="#443366"
        />

        <Environment preset="city" />
      </Suspense> */}
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.2} color="#442266" />
        <directionalLight
          position={[5, 10, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <GamingSetup position={setupPosition} scale={12} castShadow />
        <Anya position={anyaPosition} scale={2.4} castShadow />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.5}
          scale={20}
          blur={2.5}
          far={4}
          color="#443366"
        />
        <Environment preset="city" />
      </Suspense>

    </group>
  );
}

