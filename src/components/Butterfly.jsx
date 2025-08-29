// import { useGLTF } from "@react-three/drei"; 
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// export default function Butterfly(props) {
//   const { scene } = useGLTF("/butterfly_new.glb");
//   const ref = useRef();

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     if (ref.current) {
//       ref.current.position.y += Math.sin(t * 2) * 0.003;
//       ref.current.rotation.y = Math.sin(t * 1.5) * 0.2;
//       ref.current.rotation.x = Math.cos(t * 1.2) * 0.05;
//     }
//   });

//   return (
//     <primitive
//       object={scene}
//       ref={ref}
//       {...props} 
//     />
//   );
// }

import { useGLTF } from "@react-three/drei"; 
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Butterfly(props) {
  let scene;
  try {
    const gltf = useGLTF("/butterfly_new.glb");
    scene = gltf.scene;
  } catch (err) {
    console.error("❌ GLB 模型加载失败:", err);
    return null;
  }

  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = 1 + Math.sin(t * 2) * 0.1;
      ref.current.rotation.y = Math.sin(t * 1.5) * 0.2;
      ref.current.rotation.x = Math.cos(t * 1.2) * 0.05;
    }
  });

  return <primitive object={scene} ref={ref} {...props} />;
}

useGLTF.preload("/butterfly_new.glb");

