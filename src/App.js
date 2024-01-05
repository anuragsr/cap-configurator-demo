import React, {useRef, useState, Suspense, useEffect} from 'react'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import {useGLTF, SoftShadows, useHelper, PerspectiveCamera, Html} from '@react-three/drei'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'

// Debug
import { useControls } from "leva"
import { Stats } from "@react-three/drei"
import {MeshBasicMaterial, MeshStandardMaterial} from "three";
import Model2 from "./scss/Model";

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
},
Floor = (props) => {
  return (
    <mesh {...props} rotation-x={-Math.PI / 2} receiveShadow>
      <circleGeometry args={[100]} />
      <meshStandardMaterial />
    </mesh>
  )
},
MyCamera = ({ makeDefault, animate, label, near = 10, far = 200, position = [0, 10, 5] }) => {
  const ref = useRef()
  
  const {
    camera,
    // gl: { domElement },
    gl,
    scene
  } = useThree()
  // console.log(useThree())
  // const props = useControls(label, {
  //   near,
  //   far,
  //   fov: 25
  // })
  const props = {
    near,
    far,
    fov: 25
  }
  
  const t = new THREE.Vector3(0, 0, 0)
  
  useFrame((state) => {
    if(ref.current && gl){
      gl.render(scene, ref.current)
    }
    if (animate) {
      // animate(ref.current, state)
      ref.current.lookAt(t)
    }
  })
  
  useEffect(() => {
    // useStore.setState({
    //   [`${label}Cam`]: ref
    // })

    ref.current.lookAt(t)
  }, [label])
  
  // useHelper(ref, THREE.CameraHelper)
  
  return (
    <PerspectiveCamera makeDefault={makeDefault} {...props} position={position} ref={ref}>
      <Html className="label">{label}</Html>
    </PerspectiveCamera>
  )
}

const CAMERA_DEFAULT_POS = [0, 50, 50]
const model = '/baseball_cap.glb';
const l = console.log.bind(window.console)

export default function App() {
  const [color, setColor] = useState(null);
  const ColorPicker = () => {
    
    console.log("colorPicker", color);
    
    return (
      <input type="color" value={color} onChange={
        e => {
          setColor(e.target.value)
          sleep(50).then(() => {
            drawAll()
          })
        }
        
      } />
    );
  }
  
  const canvasRef = useRef()
  const { helpers } = useControls({
    helpers: true,
    camera: ["default", "cam A"],
    // camera: ["default", "cam A"]
  })
  useGLTF.preload(model)
  const config = {
    size: { value: 25, min: 0, max: 100 },
    focus: { value: 0, min: 0, max: 2 },
    samples: { value: 10, min: 1, max: 20, step: 1 }
  }
  
  const [currImg, setCurrImg] = useState(null)
  const [currImg2, setCurrImg2] = useState(null)
  const [currImg3, setCurrImg3] = useState(null)
  const [currImg4, setCurrImg4] = useState(null)
  const [currCam, setCurrCam] = useState(null)
  let sleepSetTimeout_ctrl;
  
  function sleep(ms) {
    clearInterval(sleepSetTimeout_ctrl);
    return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
  }
  
  const drawImg = function(){
    l("Drawing:", currCam, "Setting image..")
    let img;
    img = canvasRef.current.toDataURL("image/png");
    switch(currCam) {
      case "A":
        setCurrImg(img)
        setCurrCam("B")
        break;
  
      case "B":
        setCurrImg2(img)
        setCurrCam("C")
        break;
  
      case "C":
        setCurrImg3(img)
        setCurrCam("D")
        break;
        
      default:
        setCurrImg4(img)
        break;
    }
  }
  
  // useEffect(() => {
  //   l("Image set")
  // }, [currImg,currImg2,currImg3,currImg4])
  
  const drawAll = async () => {
    setCurrCam("A")
    // await sleep(300)
    // setCurrCam("B")
    // await sleep(300)
    // setCurrCam("C")
    // await sleep(300)
    // setCurrCam("D")
  }
  
  useEffect(() => {
    l("currCam:", currCam)
    if(!currCam) return
    const doDraw = async() =>{
      await sleep(50)
      drawImg(currCam)
    }
    
    doDraw()
  }, [currCam])
  
  const h = window.innerHeight / 2,
        w = window.innerWidth / 2
  
  return (<>
    <div style={{position: "absolute", left: 200, zIndex: 2}}>
      <ColorPicker />
      <button onClick={drawAll}>Draw</button>
    </div>
    
    <div style={{ opacity: 1, display: "flex", flexDirection:"column", position: "absolute", left: 0, top: 0, zIndex: 1,
      // background: "rgba(0, 0, 0, .4)",
      background: "white",
      pointerEvents: "none"}}>
      <div style={{ display: "flex"}}>
        <img src={currImg} alt="" width={w} height={h}/>
        <img src={currImg2} alt="" width={w} height={h}/>
      </div>
      <div style={{ display: "flex"}}>
        <img src={currImg3} alt="" width={w} height={h}/>
        <img src={currImg4} alt="" width={w} height={h}/>
      </div>
    </div>
    
    <Canvas
      // style={{display: 'none'}}
      gl={{ preserveDrawingBuffer: true }}
      ref={canvasRef}
      shadows
      camera={{ position: CAMERA_DEFAULT_POS }}>
      <ambientLight intensity={.25} />
      <MyCamera
        label="A"
        position={[100, 5, 0]}
        makeDefault={currCam === "A"}
      />
      <MyCamera
        label="B"
        position={[-100, 5, 0]}
        makeDefault={currCam === "B"}
      />
      <MyCamera
        label="C"
        position={[0, 50, -100]}
        makeDefault={currCam === "C"}
      />
      <MyCamera
        label="D"
        position={[0, 50, 100]}
        makeDefault={currCam === "D"}
      />
      {/*{currCam === "A" ?
        <MyCamera
          // animate={(ref, state) => {
          //   ref.position.x = Math.sin(state.clock.getElapsedTime()) * 5
          //   ref.position.y = Math.cos(state.clock.getElapsedTime()) * 5
          // }}
          label="A"
          position={[100, 5, 0]}
          makeDefault
        />:
        <MyCamera
          // animate={(ref, state) => {
          //   ref.position.x = Math.sin(state.clock.getElapsedTime()) * 5
          //   ref.position.y = Math.cos(state.clock.getElapsedTime()) * 5
          // }}
          label="B"
          position={[-100, 5, 0]}
          makeDefault
        />
      }*/}
      {/*<PerspectiveCamera position={[45, 5, 0]} makeDefault/>*/}
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
      {/*
      <PointLightWithHelper
        visible={helpers}
        color={0xffffff}
        intensity={.75}
        position={[0, 50, 0]}/>*/}
      {helpers && <>
        <Stats showPanel={0} className="stats" />
        <gridHelper args={[1000, 100]} />
        <axesHelper args={[500]} />
      </>}
      {/*<spotLight castShadow={true} position={[10, 10, 10]} angle={0.15} penumbra={1} />*/}
      <pointLight position={[0, 100, 0]} castShadow={true}/>
      {/*<directionalLight position={[0, 50, 0]} castShadow={true}/>*/}
      <CameraControls />
      {/*<SoftShadows {...config} />*/}
      {/*<fog attach="fog" args={["white", 0, 40]} />*/}
      <Suspense fallback={null}>
        {/*<Model position={[-20, 0, 0]} scale={[.2, .2, .2]}/>*/}
        <Model2 hatC={color} rotation={[ .2, 0, 0]} position={[0, 0, 0]} scale={[.2, .2, .2]}/>
      </Suspense>
      <Floor position={[0, -10, 0]} />
      {/*<Box position={[0, 0, 0]} />*/}
    </Canvas>
  </>)
}
