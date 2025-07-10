// components/3d-model.tsx
"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei"
import { Suspense } from "react"

function Model({ url }: { url: string }) {
    const { scene } = useGLTF(url)
    return <primitive object={scene} scale={2.5} position={[0, -1.5, 0]} /> // Move down more
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
            <div className="overflow-hidden h-[500px] rounded-lg"> {/* Increase height and add rounded corners */}
                <Canvas camera={{ position: [0, 1.5, 7], fov: 45 }}> {/* Move camera back and reduce FOV */}
                    <Suspense fallback={<Loader />}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <Environment preset="city" />
                        <Model url={modelUrl} />
                        <OrbitControls
                            enablePan={false}
                            enableZoom={false}
                            target={[0, 0.5, 0]} // Adjust target lower
                            maxPolarAngle={Math.PI / 2}
                            minPolarAngle={0}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    )
}