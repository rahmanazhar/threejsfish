import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

function Fish({ position, color = '#ff6b00' }) {
  const group = useRef()
  const bodyRef = useRef()
  const tailRef = useRef()
  const finTopRef = useRef()
  const finBottomRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Gentle swimming motion
    group.current.position.y += Math.sin(time * 1.5) * 0.002
    group.current.rotation.y = Math.sin(time * 2) * 0.1

    // Tail wiggle
    tailRef.current.rotation.y = Math.sin(time * 4) * 0.3

    // Fin movement
    finTopRef.current.rotation.z = Math.sin(time * 3) * 0.1
    finBottomRef.current.rotation.z = -Math.sin(time * 3) * 0.1
  })

  return (
    <group ref={group} position={position}>
      {/* Main body */}
      <mesh ref={bodyRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshPhysicalMaterial
          color="#ff6b00"
          roughness={0.4}
          clearcoat={0.5}
        />
      </mesh>

      {/* White stripe */}
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]}>
        <cylinderGeometry args={[0.41, 0.41, 0.15, 32]} />
        <meshPhysicalMaterial
          color="#fff5e6"
          roughness={0.4}
          clearcoat={0.5}
        />
      </mesh>

      {/* Eye */}
      <mesh position={[0.25, 0.1, 0.25]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshPhysicalMaterial
          color="white"
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0.28, 0.1, 0.25]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshPhysicalMaterial
          color="black"
          roughness={0.1}
        />
      </mesh>

      {/* Tail */}
      <group ref={tailRef} position={[-0.3, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.4, 0.3, 0.1]} />
          <meshPhysicalMaterial
            color="#ff6b00"
            roughness={0.4}
            clearcoat={0.5}
          />
        </mesh>
      </group>

      {/* Top fin */}
      <group ref={finTopRef} position={[0, 0.3, 0]}>
        <mesh rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.3, 0.2, 0.1]} />
          <meshPhysicalMaterial
            color="#ff6b00"
            roughness={0.4}
            clearcoat={0.5}
          />
        </mesh>
      </group>

      {/* Bottom fin */}
      <group ref={finBottomRef} position={[0, -0.3, 0]}>
        <mesh rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.3, 0.2, 0.1]} />
          <meshPhysicalMaterial
            color="#ff6b00"
            roughness={0.4}
            clearcoat={0.5}
          />
        </mesh>
      </group>

      {/* Side fins */}
      <mesh position={[0, 0, 0.35]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.2, 0.15, 0.05]} />
        <meshPhysicalMaterial
          color="#ff6b00"
          roughness={0.4}
          clearcoat={0.5}
        />
      </mesh>
      <mesh position={[0, 0, -0.35]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.2, 0.15, 0.05]} />
        <meshPhysicalMaterial
          color="#ff6b00"
          roughness={0.4}
          clearcoat={0.5}
        />
      </mesh>

      {/* Mouth */}
      <mesh position={[0.35, -0.05, 0]} rotation={[0, Math.PI/2, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 32]} />
        <meshPhysicalMaterial
          color="#ff4400"
          roughness={0.4}
        />
      </mesh>
    </group>
  )
}

function Seaweed({ position }) {
  const group = useRef()
  const segments = 8
  const refs = Array(segments).fill().map(() => useRef())
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    refs.forEach((ref, i) => {
      // Create wave-like motion with phase difference
      const phase = i * 0.3
      ref.current.rotation.x = Math.sin(time * 2 + phase) * 0.1
      ref.current.rotation.z = Math.cos(time * 1.5 + phase) * 0.1
    })
  })

  return (
    <group ref={group} position={position}>
      {refs.map((ref, i) => (
        <group 
          key={i} 
          ref={ref}
          position={[0, i * 0.3, 0]}
        >
          <mesh>
            <cylinderGeometry args={[0.05, 0.08, 0.3, 8]} />
            <meshPhysicalMaterial
              color="#2d5a27"
              roughness={0.2}
              metalness={0.1}
              transmission={0.3}
              thickness={0.5}
            />
          </mesh>
          <mesh position={[0.15, 0.1, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshPhysicalMaterial
              color="#3a7a34"
              roughness={0.2}
              metalness={0.1}
              transmission={0.3}
              thickness={0.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Bubble({ startPosition }) {
  const ref = useRef()
  const speed = Math.random() * 0.02 + 0.01
  const wobbleSpeed = Math.random() * 2 + 1
  const wobbleAmount = Math.random() * 0.2 + 0.1

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    ref.current.position.y += speed
    ref.current.position.x += Math.sin(time * wobbleSpeed) * 0.01
    if (ref.current.position.y > 20) {
      ref.current.position.y = startPosition[1]
    }
  })

  return (
    <mesh ref={ref} position={startPosition}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <MeshDistortMaterial
        color="#ffffff"
        transparent
        opacity={0.2}
        distort={0.3}
        speed={2}
      />
    </mesh>
  )
}

function Ocean() {
  const { camera } = useThree()
  const scrollRef = useRef(0)
  
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(() => {
    camera.position.y = -scrollRef.current / 200
    const depth = -camera.position.y
    const fogColor = new THREE.Color(
      Math.max(0, 0.1 - depth * 0.01),
      Math.max(0, 0.2 - depth * 0.01),
      Math.max(0, 0.3 - depth * 0.01)
    )
    camera.fog = new THREE.Fog(fogColor, 1, 10)
  })

  return (
    <>
      {/* Seaweed clusters */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Seaweed 
          key={i} 
          position={[
            Math.random() * 20 - 10,
            Math.random() * -20,
            Math.random() * 20 - 10
          ]} 
        />
      ))}
      
      {/* Bubbles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Bubble 
          key={i}
          startPosition={[
            Math.random() * 20 - 10,
            Math.random() * -20,
            Math.random() * 20 - 10
          ]}
        />
      ))}

      {/* Single fish in the center */}
      <Fish position={[0, 0, 0]} />
    </>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
    >
      <color attach="background" args={['#006994']} />
      <fog attach="fog" args={['#006994', 5, 15]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, 10, -5]} intensity={0.5} color="#fff" />
      <Ocean />
      <OrbitControls enableZoom={true} enablePan={true} />
    </Canvas>
  )
}
