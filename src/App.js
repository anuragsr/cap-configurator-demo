import React, { useRef, useState, Suspense } from 'react'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, SoftShadows } from '@react-three/drei'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'

// Debug
import { useControls } from "leva"
import { Stats } from "@react-three/drei"
import {MeshBasicMaterial, MeshStandardMaterial} from "three";

// Make OrbitControls known as <orbitControls />
extend({ OrbitControls })

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  const {
    camera,
    gl: { domElement },
    scene
  } = useThree()
  , inspect = () => {
    window.camera = camera
    window.THREE = THREE
    window.scene = scene
  }
  , setControlParams = () => {
    controls.current.minPolarAngle = Math.PI / 4 + .3;
    controls.current.maxPolarAngle = Math.PI / 4 + .5;

    // For Orthographic camera
    controls.current.minZoom = 12;
    controls.current.maxZoom = 24;

    controls.current.enableDamping = true;
    controls.current.dampingFactor = 0.05;
    controls.current.autoRotate = true;
    controls.current.autoRotateSpeed = .2;
    controls.current.enablePan = false;
    controls.current.enableKeys = false;
  }
  // inspect()

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef()
  useFrame(() => { controls.current && controls.current.update()})

  // If we need to set parameters for controls
  // controls.current && setControlParams()

  return <orbitControls ref={controls} args={[camera, domElement]} />
}
, Box = props => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if(mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'green' : 'orange'} />
    </mesh>
  )
}
, PointLightWithHelper = ({ color, position, visible, intensity }) => {
  const lightProps = { color, position, intensity }
  return (
    <pointLight {...lightProps}>
      <mesh visible={visible}>
        <sphereGeometry/>
        <meshStandardMaterial color={0x0000ff} />
      </mesh>
    </pointLight>
  )
}
, Model = (props) => {
  const { nodes, materials } = useGLTF(model)
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow material-color="yellow" geometry={nodes.baseballCap.geometry} material={materials.baseballCap} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow material-color="red" geometry={nodes.baseballCap_1.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow material-color="blue" geometry={nodes.plastic.geometry} material={materials.plastic} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />*/}
          <mesh castShadow material-color="orange" geometry={nodes.plastic_1.geometry} material={materials.plastic.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow material-color="aquamarine" geometry={nodes.baseballCap_2.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow material-color="purple" geometry={nodes.blinn1SG.geometry} material={materials.blinn1SG.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow material-color={0xff0fe7} geometry={nodes.baseballCap_3.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
        </group>
      </group>
    </group>
  )
}
, Model2 = (props) => {
  const { nodes, materials } = useGLTF(model2)
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow material-color="green" geometry={nodes.baseballCap.geometry} material={materials.baseballCap} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow material-color={0xff0f00} geometry={nodes.baseballCap_1.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow material-color="salmon" geometry={nodes.plastic.geometry} material={materials.plastic} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />*/}
          <mesh castShadow material-color="orange" geometry={nodes.plastic_1.geometry} material={materials.plastic.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow material-color="aquamarine" geometry={nodes.baseballCap_2.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow material-color="purple" geometry={nodes.blinn1SG.geometry} material={materials.blinn1SG.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
          <mesh castShadow material-color={0xff0fe7} geometry={nodes.baseballCap_3.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
        </group>
      </group>
    </group>
  )
},
Floor = () => {
  return (
    <mesh position={[0, -5, 0]} rotation-x={-Math.PI / 2} receiveShadow>
      <circleGeometry args={[100]} />
      <meshStandardMaterial />
    </mesh>
  )
}


const CAMERA_DEFAULT_POS = [0, 50, 50]
const model = '/baseball_cap.glb';
const model2 = '/baseball_cap2.glb';

export default function App() {
  const { helpers } = useControls({ helpers: true })
  useGLTF.preload(model)
const config = {
  size: { value: 25, min: 0, max: 100 },
  focus: { value: 0, min: 0, max: 2 },
  samples: { value: 10, min: 1, max: 20, step: 1 }
}
  return (<>
    <Canvas
      shadows
      camera={{ position: CAMERA_DEFAULT_POS }}>
      {/*<ambientLight intensity={1} />*/}
      <PointLightWithHelper
        visible={helpers}
        color={0xffffff}
        intensity={.75}
        position={[70, 50, 25]}/>
      <PointLightWithHelper
        visible={helpers}
        color={0xffffff}
        intensity={.75}
        position={[-70, 50, -25]}/>
      <PointLightWithHelper
        visible={helpers}
        color={0xffffff}
        intensity={.75}
        position={[0, 50, -50]}/>
      {helpers && <>
        <Stats showPanel={0} className="stats" />
        <gridHelper args={[1000, 100]} />
        <axesHelper args={[500]} />
      </>}
      {/*<spotLight castShadow={true} position={[10, 10, 10]} angle={0.15} penumbra={1} />*/}
      <pointLight position={[0, 100, 0]} castShadow={true}/>
      <CameraControls />
      {/*<SoftShadows {...config} />*/}
      {/*<fog attach="fog" args={["white", 0, 40]} />*/}
      <Suspense fallback={null}>
        <Model position={[-20, 0, 0]} scale={[.2, .2, .2]}/>
        <Model2 position={[20, 0, 0]} scale={[.2, .2, .2]}/>
        <Floor/>
      </Suspense>
      {/*<Box position={[0, 0, 0]} />*/}
    </Canvas>
  </>)
}
