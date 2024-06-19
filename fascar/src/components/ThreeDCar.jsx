import { Canvas } from '@react-three/fiber'
import { PresentationControls, Stage } from '@react-three/drei'
import BlueBugatti from '../../public/BlueBugatti.jsx'
import GrayPorsche from '../../public/Grayporsche.jsx'
import RedMaserati from '../../public/RedMaserati.jsx'
import WhiteLambo from '../../public/WhiteLambo.jsx'
import BeigeNissan from '../../public/BeigeGTR.jsx'
import GreenBMW from '../../public/GreenBMW.jsx'
import OliveFord from '../../public/OliveFord.jsx'

import PropTypes from 'prop-types';


function ThreeDCar({ carName }) {
  return (
    <>
      <Canvas dpr={[1,2]} shadows={"soft"} camera={{fov: 45}}>
        <PresentationControls speed={1.5} zoom={.7} polar={[-0.1, Math.PI / 4]}>
          <Stage environment={'sunset'} shadows={"contact"} intensity={0.5}>
            {carName === "Bugatti" && <BlueBugatti scale={1}/>}
            {carName === "Porsche" && <GrayPorsche scale={1}/>}
            {carName === "Maserati" && <RedMaserati scale={1}/>}
            {carName === "Lamborghini" && <WhiteLambo scale={1}/>}
            {carName === "Nissan" && <BeigeNissan scale={1}/>}
            {carName === "BMW" && <GreenBMW scale={1}/>}
            {carName === "Ford" && <OliveFord scale={1}/>}
          </Stage>
        </PresentationControls>
      </Canvas>
    </>
  )
}

ThreeDCar.propTypes = {
  carName: PropTypes.string
}

export default ThreeDCar;
