import React, {useRef} from "react";
import {useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {l} from "./helpers"

export const Model1 = (props) => {
	const model = '/baseball_cap.glb';
	// const model = '/projects/cap-configurator/baseball_cap.glb';
	
	const { nodes, materials } = useGLTF(model)
	const modelRef = useRef()
	props.onLoad()
	
	// useFrame((state, delta, clock) => {
	useFrame(({ clock }) => {
	  if(modelRef.current) {
		  // modelRef.current.position.y = 10 * Math.sin(delta)
		  modelRef.current.position.y = 2*Math.sin(clock.getElapsedTime())
	  }
	})
	// const c = 0xff0fe7
	const c = 0xffffff
	
	const {
		colorCrown,
		colorBrim,
		colorTop
	} = props
	
	return (
		<group ref={modelRef}  {...props} dispose={null}>
			<group rotation={[-Math.PI / 2, 0, 0]}>
				<group rotation={[Math.PI / 2, 0, 0]}>
					{/*<mesh castShadow material-color="green" geometry={nodes.baseballCap.geometry} material={materials.baseballCap} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />*/}
					<mesh castShadow material-color={colorTop} geometry={nodes.baseballCap.geometry} material={materials.baseballCap} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					{/*<mesh castShadow material-color={"salmon"} geometry={nodes.baseballCap_1.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />*/}
					<mesh castShadow material-color={colorBrim} geometry={nodes.baseballCap_1.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					<mesh castShadow material-color="salmon" geometry={nodes.plastic.geometry} material={materials.plastic} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />*/}
					<mesh castShadow material-color="orange" geometry={nodes.plastic_1.geometry} material={materials.plastic.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					<mesh castShadow material-color="aquamarine" geometry={nodes.baseballCap_2.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					<mesh castShadow material-color="purple" geometry={nodes.blinn1SG.geometry} material={materials.blinn1SG.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					{/*<mesh castShadow material-color={c} geometry={nodes.baseballCap_3.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />*/}
					<mesh castShadow material-color={colorCrown} geometry={nodes.baseballCap_3.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
				</group>
			</group>
		</group>
	)
}


export const Model2 = (props) => {
	const model = '/baseball_cap2.glb';
	// const model = '/projects/cap-configurator/baseball_cap2.glb';
	const { nodes, materials } = useGLTF(model)
	const modelRef = useRef()
	props.onLoad()
	
	// useFrame(() => {
	//   if(modelRef.current) modelRef.current.rotation.y += 0.01
	// })
	// const c = 0xff0fe7
	const c = 0xffffff
	const {
		colorCrown,
		colorBrim,
		colorTop
	} = props
	
	return (
		<group ref={modelRef}  {...props} dispose={null}>
			<group rotation={[-Math.PI / 2, 0, 0]}>
				<group rotation={[Math.PI / 2, 0, 0]}>
					{/*<mesh castShadow material-color="green" geometry={nodes.baseballCap.geometry} material={materials.baseballCap} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />*/}
					<mesh castShadow material-color={colorTop} geometry={nodes.baseballCap.geometry} material={materials.baseballCap} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					{/*<mesh castShadow material-color={"salmon"} geometry={nodes.baseballCap_1.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />*/}
					<mesh castShadow material-color={colorBrim} geometry={nodes.baseballCap_1.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					<mesh castShadow material-color="salmon" geometry={nodes.plastic.geometry} material={materials.plastic} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />*/}
					<mesh castShadow material-color="orange" geometry={nodes.plastic_1.geometry} material={materials.plastic.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					<mesh castShadow material-color="aquamarine" geometry={nodes.baseballCap_2.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					<mesh castShadow material-color="purple" geometry={nodes.blinn1SG.geometry} material={materials.blinn1SG.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					{/*<mesh castShadow material-color={c} geometry={nodes.baseballCap_3.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />*/}
					<mesh castShadow material-color={colorCrown} geometry={nodes.baseballCap_3.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
				</group>
			</group>
		</group>
	)
}