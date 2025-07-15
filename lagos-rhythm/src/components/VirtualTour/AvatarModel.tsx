"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type { Group } from "three"

function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url)
    const modelRef = useRef<Group>(null)

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.005 // Adjust speed as needed
        }
    })

    return <primitive object={scene} scale={2.5} position={[0, -1.5, 0]} ref={modelRef} />
}

function Loader() {
    return (
        <Html center>
            <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        </Html>
    )
}

export default function AvatarModel({ modelUrl }: { modelUrl: string }) {
    return (
        <div className="w-full h-full min-h-[300px]">
            <div className="overflow-hidden h-[500px] rounded-lg">
                <Canvas camera={{ position: [0, 1.5, 7], fov: 45 }}>
                    <Suspense fallback={<Loader />}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <Environment preset="city" />
                        <Model url={modelUrl} />
                        <OrbitControls
                            enablePan={false}
                            enableZoom={false}
                            enableRotate={false}
                            target={[0, 0.5, 0]}
                            maxPolarAngle={Math.PI / 2 - 0.1}
                            minPolarAngle={Math.PI / 3}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    )
}
