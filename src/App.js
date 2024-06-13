import React, {useRef, useState, Suspense} from 'react'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { HuePicker } from 'react-color'
import {useGLTF} from '@react-three/drei'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import { Model } from "./Model";
import {l} from "./helpers"
// Debug
import { useControls } from "leva"
import { Stats } from "@react-three/drei"

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
, Floor = (props) => {
  return (
    <mesh {...props} rotation-x={-Math.PI / 2} receiveShadow>
      <circleGeometry args={[100]} />
      <meshStandardMaterial side={THREE.DoubleSide} transparent={true} color={0xB5D0EC} opacity={.4}/>
    </mesh>
  )
}

const CAMERA_DEFAULT_POS = [0, 10, 50],
  // prefix = "/projects/3D/cap-configurator",
  prefix = "",
  model = prefix + '/baseball_cap.glb';

export default function App() {
  const [colorCrown, setColorCrown] = useState("white");
  const [colorBrim, setColorBrim] = useState("hotpink");
  const [colorTop, setColorTop] = useState("green");
  const [colorStrip, setColorStrip] = useState("yellow");
  const [colorUnder, setColorUnder] = useState("aquamarine");
  
  const canvasRef = useRef()
  const helpers = false
  // const { helpers } = useControls({
  //   helpers: false,
  // })
  useGLTF.preload(model)
  
  return (<>
    <div className="ctn-parts-outer">
      <h3>Drag around with the mouse to change viewing angle.</h3>
      <div className="ctn-parts">
        <h3>Change cap part colors below:</h3>
        <div>
          <h4>Crown</h4>
          <HuePicker
            width={200}
            color={ colorCrown }
            onChangeComplete={ (color, event) => {
              l(color, event)
              setColorCrown(color.hex)
            }}
          />
        </div>
        <div>
          <h4>Brim</h4>
          <HuePicker
            width={200}
            color={ colorBrim }
            onChangeComplete={ (color, event) => {
              l(color, event)
              setColorBrim(color.hex)
            }}
          />
        </div>
        <div>
          <h4>Top Button</h4>
          <HuePicker
            width={200}
            color={ colorTop }
            onChangeComplete={ (color, event) => {
              l(color, event)
              setColorTop(color.hex)
            }}
          />
        </div>
        <div>
          <h4>Back Strip</h4>
          <HuePicker
            width={200}
            color={ colorStrip }
            onChangeComplete={ (color, event) => {
              l(color, event)
              setColorStrip(color.hex)
            }}
          />
        </div>
        <div>
          <h4>Underwire</h4>
          <HuePicker
            width={200}
            color={ colorUnder }
            onChangeComplete={ (color, event) => {
              l(color, event)
              setColorUnder(color.hex)
            }}
          />
        </div>
      </div>
      <div id="ctn-about">
        <h2>Cap color configurator</h2>
        <div>by&nbsp;
          <a href="http://envisagecyberart.in" target="_blank">Anurag Srivastava</a><br />
          <a href="http://envisagecyberart.in/projects/threejs-experiments" target="_blank">More 3D projects</a>
        </div>
        <a href="https://www.upwork.com/o/profiles/users/~01d929751d145a05ea/" target="_blank">
          <img src="images/upwork.png" alt="" />
        </a>
        <a href="https://www.guru.com/freelancers/anurag-srivastava-27" target="_blank">
          <img src="images/guru.png" alt="" />
        </a>
        <a href="mailto:anurag.131092@gmail.com&Subject=New Work Proposal">
          <img src="images/gmail.png" alt="" />
        </a>
        <a href="https://stackoverflow.com/users/7867822/anurag-srivastava" target="_blank">
          <img src="images/so.png" alt="" />
        </a>
        <a href="https://github.com/anuragsr" target="_blank">
          <img src="images/github.png" alt="" />
        </a>
      </div>
    </div>
    
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      ref={canvasRef}
      shadows
      camera={{ position: CAMERA_DEFAULT_POS }}>
      <ambientLight intensity={.25} />
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
      
      {helpers && <>
        <Stats showPanel={0} className="stats" />
        <gridHelper args={[1000, 100]} />
        <axesHelper args={[500]} />
      </>}
      <pointLight position={[0, 100, 25]} castShadow={true}/>
      <CameraControls />
      <Suspense fallback={null}>
        <Model
          colorCrown={colorCrown}
          colorBrim={colorBrim}
          colorTop={colorTop}
          colorStrip={colorStrip}
          colorUnder={colorUnder}
          rotation={[ .2, 0, 0]}
          position={[0, 0, 0]}
          scale={[.2, .2, .2]}/>
      </Suspense>
      <Floor position={[0, -10, 0]} />
    </Canvas>
  </>)
}
