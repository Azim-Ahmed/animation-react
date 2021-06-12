import styles from './AboutUs.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => {
  const [backgorundAbout, setBackgroundAbout] = useState('PrimaryBackground');

  const navRef = useRef();
  navRef.current = backgorundAbout;

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundAbout('grayShade');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  console.log(backgorundAbout);
  //declare the background or suspected color or css with the className

  return (
    <Container className={styles[navRef.current]} id="about">
      <Row className="my-5 py-5 text-center">
        <Col className="my-5 py-5" sm={12} xs={12} md={6}>
          <h1>About Our Company</h1>
          <p className={styles.AboutContentContainer}>
            Our company is a specialist in home design and total home
            renovation. We provide service locally in Ottawa as well as the
            Greater Ottawa Area. Our core values revolve around providing our
            clients with excellent customer service and a worry-free renovation
            process. Whether you want an addition to your current home, renovate
            your kitchen or bathroom we will work with you every step of the way
            to ensure your satisfaction.
          </p>
        </Col>
        <Col sm={12} xs={12} md={6}>
          <div>
            <img
              className={styles.AboutImageContainer}
              src="https://i.ibb.co/ThcJFdG/Getty-Images-1131001476.jpg"
              alt="About us profile"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
