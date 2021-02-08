import React from 'react';
import { AnimateKeyframes } from 'react-simple-animate';
import InputData from '../Typed_typing';

//not worked

const SimpleAnimatedKeyFrames = () => {
    return (
        <div>
            <AnimateKeyframes
                play={true}
                delay={1}
                duration={10}
                iterationCount={3}
                direction="alternative"
                keyframes={[
                    'transform: translateY(0)',
                    'transform: translateY(10px)',
                ]}
            // keyframes={[
            //     { 0: 'opacity: 0' }, // 0%
            //     { 50: 'opacity: 0.5' }, // 50%
            //     { 100: 'opacity: 1' } // 100%
            //   ]}
            >
                {/* <InputData/> */}
            </AnimateKeyframes>
        </div>
    );
};

export default SimpleAnimatedKeyFrames;