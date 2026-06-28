"use client"

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Sphere, Ring, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedPlanet() {
  const ringsRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (ringsRef.current) {
      // Tilt the rings and rotate them slowly
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 1.2
      ringsRef.current.rotation.z -= delta * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.1}>
      <group>
        {/* Core Planet */}
        <Sphere args={[1.2, 64, 64]}>
          <meshPhysicalMaterial 
            color="#1e293b" 
            emissive="#1e1b4b"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>
        
        {/* Cyber Rings */}
        <group ref={ringsRef}>
          <Ring args={[1.5, 1.52, 64]}>
            <meshBasicMaterial color="#3b82f6" side={THREE.DoubleSide} transparent opacity={0.8} />
          </Ring>
          <Ring args={[1.7, 1.71, 64]}>
            <meshBasicMaterial color="#8b5cf6" side={THREE.DoubleSide} transparent opacity={0.5} />
          </Ring>
          <Ring args={[1.9, 1.93, 64]}>
            <meshBasicMaterial color="#60a5fa" side={THREE.DoubleSide} transparent opacity={0.3} />
          </Ring>
        </group>
      </group>
    </Float>
  )
}

export default function Hero3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full rounded-full md:rounded-[2rem] border-2 border-border/50 shadow-2xl bg-muted/20 animate-pulse flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full rounded-full md:rounded-[2rem] border-2 border-border/50 shadow-2xl bg-background/50 backdrop-blur-sm overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center">
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} camera={{ position: [0, 0, 6.0], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 0, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-10, 10, -5]} intensity={2.5} color="#8b5cf6" />
        <pointLight position={[5, -5, 5]} intensity={1} color="#3b82f6" />
        
        <Sparkles count={50} scale={6} size={1.5} speed={0.2} color="#60a5fa" opacity={0.4} />
        
        <AnimatedPlanet />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
