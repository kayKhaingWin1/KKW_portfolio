import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

export default function GamingSetup(props) {
    const { scene } = useGLTF("/computer.glb");
    const groupRef = useRef();

    return (
        <group
            ref={groupRef}
            scale={15}
            position={[-1.2, -1.4, -1]}
            {...props}
        >
            <primitive object={scene} />
        </group>
    );
}


