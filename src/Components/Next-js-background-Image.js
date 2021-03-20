import styles from '../../styles/Banner.module.css';
import { Row, Col } from 'react-bootstrap';
const Banner = () => {
  return (
    <Row>
      <Col id="home" className={styles.parallax}></Col>
    </Row>
  );
};

export default Banner;

// for next update : https://image-component.nextjs.gallery/background
// https://stackoverflow.com/questions/51842419/next-js-background-image-css-property-cant-load-the-image
// https://inkplant.com/code/responsive-parallax-images
// https://uharston.medium.com/next-js-image-optimization-on-background-images-65de18ea03f5
// https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
// https://nextjs.org/docs/api-reference/next/image

// for background Image in next-js

import { parallax, bgWrap, bgText } from '../../styles/Banner.module.css';
import Image from 'next/image';
// const Banner = () => {
//   return <div id="home" className={parallax}></div>;
// };

// export default Banner;

const Banner = () => {
  return (
    <div id="home">
      <Image
        className={parallax}
        alt="house"
        src="/images/house1.jpg"
        layout="fill"
        quality={100}
      />
      <style jsx>
        {
          `
          .parallax {
            background: url('https://i.ibb.co/JzcY3Bm/house1.jpg');
          
            /* Full height */
            min-height: 750px;
            width: 100%;
            /* Create the parallax scrolling effect */
            background-attachment: fixed;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            object-fit: contain;
          }
          @media screen and (max-width: 768px) {
            .parallax {
              background-attachment: fixed;
              background-repeat: no-repeat;
              background-size: cover;
              object-fit: contain;
              min-height: 750px;
            }
          }
          
          .bgWrap {
            position: fixed;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
          }
          
          .bgText {
            margin: 0;
            font-size: 2rem;
            line-height: 3rem;
            text-align: center;
            padding-top: 40vh;
            text-shadow: 1px 1px 1px #3c5c5e;
          }
          
          `
        }
      </style>
    </div>
  );
};

export default Banner;
