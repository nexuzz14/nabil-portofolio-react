"use client"

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireframeRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1
      meshRef.current.rotation.y += delta * 0.15
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x -= delta * 0.15
      wireframeRef.current.rotation.y -= delta * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {/* Inner solid core */}
      <mesh ref={meshRef} scale={1.2}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color="#0f172a" 
          emissive="#1e1b4b"
          emissiveIntensity={0.5}
          roughness={0.2} 
          metalness={0.8} 
        />
      </mesh>
      
      {/* Outer wireframe */}
      <mesh ref={wireframeRef} scale={1.4}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial 
          color="#3b82f6" 
          wireframe={true} 
          transparent
          opacity={0.4}
        />
      </mesh>
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
    <div className="w-full h-full rounded-full md:rounded-[2rem] border-2 border-border/50 shadow-2xl bg-background/50 backdrop-blur-sm overflow-hidden cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, 10, -5]} intensity={2} color="#8b5cf6" />
        
        <Sparkles count={150} scale={8} size={2} speed={0.4} color="#60a5fa" opacity={0.6} />
        
        <AnimatedShape />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  )
}
