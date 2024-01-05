import React, {useRef} from "react";
import {useGLTF} from "@react-three/drei";

export default function Model2(props) {
	const model2 = '/baseball_cap2.glb';
	const { nodes, materials } = useGLTF(model2)
	const modelRef = useRef()
	
	// useFrame(() => {
	//   if(modelRef.current) modelRef.current.rotation.y += 0.01
	// })
	// const c = 0xff0fe7
	const c = 0xffffff
	
	return (
		<group ref={modelRef}  {...props} dispose={null}>
			<group rotation={[-Math.PI / 2, 0, 0]}>
				<group rotation={[Math.PI / 2, 0, 0]}>
					<mesh castShadow material-color="green" geometry={nodes.baseballCap.geometry} material={materials.baseballCap} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					<mesh castShadow material-color={0xff0f00} geometry={nodes.baseballCap_1.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					<mesh castShadow material-color="salmon" geometry={nodes.plastic.geometry} material={materials.plastic} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />*/}
					<mesh castShadow material-color="orange" geometry={nodes.plastic_1.geometry} material={materials.plastic.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					<mesh castShadow material-color="aquamarine" geometry={nodes.baseballCap_2.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					<mesh castShadow material-color="purple" geometry={nodes.blinn1SG.geometry} material={materials.blinn1SG.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
					<mesh castShadow material-color={c} geometry={nodes.baseballCap_3.geometry} material={materials.baseballCap.clone()} position={[0.005, -2.9, -11.842]} rotation={[-0.161, 0, 0]} scale={20.118} />
				</group>
			</group>
		</group>
	)
}