import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import * as THREE from "three";

export default function Anya() {
  const group = useRef();
  const [vrm, setVrm] = useState(null);
  const clock = useRef(new THREE.Clock());
  const modelRotationY = useRef(0);
  const idleTimer = useRef(0);
  const isBlinking = useRef(false);

  const rightShoulderRef = useRef(null);
  const leftShoulderRef = useRef(null);
  const spineRef = useRef(null);
  const headRef = useRef(null);

  const gltf = useLoader(GLTFLoader, "/anya.vrm", (loader) => {
    loader.register((parser) => new VRMLoaderPlugin(parser));
  });

  useEffect(() => {
    if (!gltf) return;
    const model = gltf.userData.vrm;

    VRMUtils.removeUnnecessaryVertices(model.scene);
    VRMUtils.removeUnnecessaryJoints(model.scene);

    model.scene.rotation.y = 0;
    group.current.add(model.scene);
    setVrm(model);

    rightShoulderRef.current = model.scene.getObjectByName("J_Bip_R_Shoulder");
    leftShoulderRef.current = model.scene.getObjectByName("J_Bip_L_Shoulder");
    spineRef.current = model.humanoid.getNormalizedBoneNode("spine");
    headRef.current = model.humanoid.getNormalizedBoneNode("head");

    if (rightShoulderRef.current) {
      rightShoulderRef.current.rotation.set(-2.9, 0, 1);
    }
    if (leftShoulderRef.current) {
      leftShoulderRef.current.rotation.set(-3, 0, -1);
    }
  }, [gltf]);


  const handleBlink = (vrmInstance) => {
    if (!vrmInstance?.expressionManager) return;

    if (!isBlinking.current && idleTimer.current > 3 + Math.random() * 3) {
      isBlinking.current = true;
      idleTimer.current = 0;
    }

    if (isBlinking.current) {
      const blinkDuration = 0.3;
      if (idleTimer.current < blinkDuration) {

        const blinkProgress = idleTimer.current / blinkDuration;
        const blinkValue = blinkProgress < 0.5 ? 
          blinkProgress * 2 : 
          1 - (blinkProgress - 0.5) * 2;
        
        vrmInstance.expressionManager.setValue("blink", blinkValue);
      } else {
        isBlinking.current = false;
        vrmInstance.expressionManager.setValue("blink", 0);
      }
    }
    vrmInstance.expressionManager.update();
  };


  const applyBreathing = (currentTime) => { 
    if (!spineRef.current || !headRef.current) return;

    const breathingRate = 0.2; 
    const breathingIntensity = 0.02; 
    

    spineRef.current.rotation.z = Math.sin(currentTime * breathingRate) * breathingIntensity;
    
    headRef.current.position.y = Math.sin(currentTime * breathingRate) * 0.01;
  };

  useFrame(() => {
    if (!vrm) return;
    const t = clock.current.getElapsedTime(); 
    idleTimer.current += 0.016; 


    const armUpperR = vrm.humanoid.getNormalizedBoneNode("rightUpperArm");
    const armLowerR = vrm.humanoid.getNormalizedBoneNode("rightLowerArm");
    const armUpperL = vrm.humanoid.getNormalizedBoneNode("leftUpperArm");
    const armLowerL = vrm.humanoid.getNormalizedBoneNode("leftLowerArm");


    handleBlink(vrm);


    applyBreathing(t);

    if (t < 2) {
      if (armUpperR) {
        armUpperR.rotation.x = -1.7;
        armUpperR.rotation.z = 0;
      }
      if (armLowerR) {

        armLowerR.rotation.x = Math.sin(t * 15) * 0.5 + 0.5;
      }
    }


    else if (t >= 2 && t < 5) {
      modelRotationY.current = THREE.MathUtils.lerp(modelRotationY.current, Math.PI, 0.03);
      vrm.scene.rotation.y = modelRotationY.current;

      if (armUpperR) {
        armUpperR.rotation.x = THREE.MathUtils.lerp(armUpperR.rotation.x, -2.5, 0.1);
        armUpperR.rotation.z = THREE.MathUtils.lerp(armUpperR.rotation.z, 0.5, 0.1);
      }
    }


    else if (t >= 5 && t < 7) {
      if (armLowerL) {

        armLowerL.rotation.x = Math.sin((t - 5) * 8) * 0.7 - 0.5;
      }

      if (t > 5.4 && t < 5.6) {
        vrm.expressionManager?.setValue("winkRight", 1);
      } else {
        vrm.expressionManager?.setValue("winkRight", 0);
      }
      vrm.expressionManager?.setValue("smile", 1.0);
    }


    else if (t >= 7) {
      vrm.scene.rotation.y = Math.PI;
      

      if (armUpperR) {
        armUpperR.rotation.x = -2.9 + Math.sin(t * 0.5) * 0.05;
        armUpperR.rotation.z = 1 + Math.sin(t * 0.3) * 0.1;
      }
      if (armLowerR) {
        armLowerR.rotation.x = 0.5 + Math.sin(t * 0.8) * 0.1;
      }


      if (idleTimer.current > 5 + Math.random() * 3) {
        idleTimer.current = 0;

        if (Math.random() > 0.5 && headRef.current) {
          headRef.current.rotation.y = (Math.random() - 0.5) * 0.3;
        } else if (armUpperL) {
          armUpperL.rotation.x = -2.5 + Math.random() * 0.5;
        }
      }


      vrm.expressionManager?.setValue("smile", 0.8);
    }


    vrm.expressionManager?.update();
  });

  return (
    <group ref={group} scale={3.5} position={[-1, -1.6, 0]} />
  );
}


// import { useFrame, useLoader } from "@react-three/fiber";
// import { useRef, useEffect, useState } from "react";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
// import * as THREE from "three";

// export default function Anya() {
//   const group = useRef();
//   const [vrm, setVrm] = useState(null);
//   const clock = useRef(new THREE.Clock());
//   const modelRotationY = useRef(0);
//   const idleTimer = useRef(0);
//   const isBlinking = useRef(false);

//   const rightShoulderRef = useRef(null);
//   const leftShoulderRef = useRef(null);
//   const spineRef = useRef(null);
//   const headRef = useRef(null);

//   const mouse = useRef({ x: 0, y: 0 });

//   const gltf = useLoader(GLTFLoader, "/anya.vrm", (loader) => {
//     loader.register((parser) => new VRMLoaderPlugin(parser));
//   });

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   useEffect(() => {
//     if (!gltf) return;
//     const model = gltf.userData.vrm;

//     VRMUtils.removeUnnecessaryVertices(model.scene);
//     VRMUtils.removeUnnecessaryJoints(model.scene);

//     model.scene.rotation.y = 0;
//     group.current.add(model.scene);
//     setVrm(model);

//     rightShoulderRef.current = model.scene.getObjectByName("J_Bip_R_Shoulder");
//     leftShoulderRef.current = model.scene.getObjectByName("J_Bip_L_Shoulder");
//     spineRef.current = model.humanoid.getNormalizedBoneNode("spine");
//     headRef.current = model.humanoid.getNormalizedBoneNode("head");

//     if (rightShoulderRef.current) {
//       rightShoulderRef.current.rotation.set(-2.9, 0, 1);
//     }
//     if (leftShoulderRef.current) {
//       leftShoulderRef.current.rotation.set(-3, 0, -1);
//     }
//   }, [gltf]);

//   const handleBlink = (vrmInstance) => {
//     if (!vrmInstance?.expressionManager) return;

//     if (!isBlinking.current && idleTimer.current > 3 + Math.random() * 3) {
//       isBlinking.current = true;
//       idleTimer.current = 0;
//     }

//     if (isBlinking.current) {
//       const blinkDuration = 0.3;
//       if (idleTimer.current < blinkDuration) {
//         const blinkProgress = idleTimer.current / blinkDuration;
//         const blinkValue =
//           blinkProgress < 0.5
//             ? blinkProgress * 2
//             : 1 - (blinkProgress - 0.5) * 2;
//         vrmInstance.expressionManager.setValue("blink", blinkValue);
//       } else {
//         isBlinking.current = false;
//         vrmInstance.expressionManager.setValue("blink", 0);
//       }
//     }
//     vrmInstance.expressionManager.update();
//   };

//   const applyBreathing = (currentTime) => {
//     if (!spineRef.current || !headRef.current) return;

//     const breathingRate = 0.2;
//     const breathingIntensity = 0.02;

//     spineRef.current.rotation.z = Math.sin(currentTime * breathingRate) * breathingIntensity;
//     headRef.current.position.y = Math.sin(currentTime * breathingRate) * 0.01;
//   };

//   useFrame(() => {
//     if (!vrm) return;

//     const t = clock.current.getElapsedTime();
//     idleTimer.current += 0.016;

//     const armUpperR = vrm.humanoid.getNormalizedBoneNode("rightUpperArm");
//     const armLowerR = vrm.humanoid.getNormalizedBoneNode("rightLowerArm");
//     const armUpperL = vrm.humanoid.getNormalizedBoneNode("leftUpperArm");
//     const armLowerL = vrm.humanoid.getNormalizedBoneNode("leftLowerArm");

//     handleBlink(vrm);
//     applyBreathing(t);

//     if (t < 2) {
//       if (armUpperR) {
//         armUpperR.rotation.x = -1.7;
//         armUpperR.rotation.z = 0;
//       }
//       if (armLowerR) {
//         armLowerR.rotation.x = Math.sin(t * 15) * 0.5 + 0.5;
//       }
//     } else if (t >= 2 && t < 5) {
//       modelRotationY.current = THREE.MathUtils.lerp(modelRotationY.current, Math.PI, 0.03);
//       vrm.scene.rotation.y = modelRotationY.current;

//       if (armUpperR) {
//         armUpperR.rotation.x = THREE.MathUtils.lerp(armUpperR.rotation.x, -2.5, 0.1);
//         armUpperR.rotation.z = THREE.MathUtils.lerp(armUpperR.rotation.z, 0.5, 0.1);
//       }
//     } else if (t >= 5 && t < 7) {
//       if (armLowerL) {
//         armLowerL.rotation.x = Math.sin((t - 5) * 8) * 0.7 - 0.5;
//       }

//       if (t > 5.4 && t < 5.6) {
//         vrm.expressionManager?.setValue("winkRight", 1);
//       } else {
//         vrm.expressionManager?.setValue("winkRight", 0);
//       }
//       vrm.expressionManager?.setValue("smile", 1.0);
//     } else if (t >= 7) {
//       vrm.scene.rotation.y = Math.PI;

//       if (armUpperR) {
//         armUpperR.rotation.x = -2.9 + Math.sin(t * 0.5) * 0.05;
//         armUpperR.rotation.z = 1 + Math.sin(t * 0.3) * 0.1;
//       }
//       if (armLowerR) {
//         armLowerR.rotation.x = 0.5 + Math.sin(t * 0.8) * 0.1;
//       }

//       if (idleTimer.current > 5 + Math.random() * 3) {
//         idleTimer.current = 0;

//         if (Math.random() > 0.5 && headRef.current) {
//           headRef.current.rotation.y = (Math.random() - 0.5) * 0.3;
//         } else if (armUpperL) {
//           armUpperL.rotation.x = -2.5 + Math.random() * 0.5;
//         }
//       }

//       vrm.expressionManager?.setValue("smile", 0.8);
//     }

//     if (headRef.current && vrm.lookAt) {
//       const maxAngle = 0.3;
//       const targetX = THREE.MathUtils.clamp(mouse.current.y * 0.5, -maxAngle, maxAngle);
//       const targetY = THREE.MathUtils.clamp(mouse.current.x * 0.5, -maxAngle, maxAngle);

//       headRef.current.rotation.x = THREE.MathUtils.lerp(
//         headRef.current.rotation.x,
//         targetX,
//         0.1
//       );
//       headRef.current.rotation.y = THREE.MathUtils.lerp(
//         headRef.current.rotation.y,
//         targetY,
//         0.1
//       );

//       const lookTarget = new THREE.Object3D();
//       lookTarget.position.set(mouse.current.x, mouse.current.y, 1);
//       vrm.lookAt.target = lookTarget;
//       vrm.lookAt.update();
//     }

//     vrm.expressionManager?.update();
//   });

//   return (
//     <group ref={group} scale={3.5} position={[-1, -1.6, 0]} />
//   );
// }
