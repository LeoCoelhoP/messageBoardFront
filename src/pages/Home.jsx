/* eslint-disable react/no-unknown-property */
// Desactivate because a eslint/R3f conflict. No bugs encountered upon and after disabled.
import {
	Html,
	ContactShadows,
	PresentationControls,
	Float,
	Environment,
	useGLTF,
	Center,
	Text3D,
} from '@react-three/drei';

import '../assets/css/home.css';
import { FLOATING_MESSAGE } from '../data/UIMessages/HomePage';
import { useState } from 'react';

export default function Home() {
	const computer = useGLTF(
		'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf',
	);
	const [sizes] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	return (
		<group position-y={0.2}>
			<Environment preset='city' />

			<PresentationControls
				global
				rotation={[0.13, 0.1, 0]}
				polar={[-0.2, 0.2]}
				azimuth={[-1, 0.75]}
				config={{ mass: 1, tension: 400 }}
				snap={{ mass: 2, tension: 400 }}>
				<ambientLight intensity={4} />
				<Center>
					<Float rotationIntensity={0.3} speed={0.6} floatIntensity={0.3}>
						<rectAreaLight
							width={2.5}
							height={1.65}
							intensity={55}
							color={'blue'}
							rotation={[-0.1, Math.PI, 0]}
							position={[0, -1, -1.15]}
						/>
						<primitive object={computer.scene} position-y={-1}>
							<Html
								transform
								wrapperClass='htmlScreen'
								distanceFactor={1.17}
								position={[0, 1.535, -1.4]}
								rotation-x={-0.256}>
								<iframe src='https://messageboardfront.onrender.com/login' />
							</Html>
						</primitive>

						<Text3D
							font='./Bulgatti_Regular.json'
							scale={0.26}
							position={[1.9, 0.7, -1.6]}
							rotation-y={-1}
							bevelEnabled={true}
							bevelThickness={0.1}>
							<meshBasicMaterial color={'black'} />
							{FLOATING_MESSAGE}
						</Text3D>
					</Float>
				</Center>
			</PresentationControls>
			{sizes.width > 450 && (
				<ContactShadows position-y={-1.4} opacity={0.7} scale={10} blur={2.4} />
			)}
		</group>
	);
}
