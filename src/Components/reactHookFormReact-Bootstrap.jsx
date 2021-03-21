import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const FormSection = () => {
  //get Data from react hook form
  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="text-center my-5 jumbotron">
            Generate Your QR-Code by filling this form
          </h3>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col className="mb-5" md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                name="name"
                placeholder="*Name"
                ref={register({ required: true })}
              />
              {errors.name && (
                <small className="text-danger form-text">
                  Please enter name
                </small>
              )}
            </Form.Group>

            <Form.Group controlId="busName">
              <Form.Control
                type="text"
                name="busName"
                placeholder="*Enter Bus Name"
                ref={register({
                  required: true,
                })}
              />
              {errors.busName && (
                <small className="text-danger form-text">
                  Please enter a valid Email-ID
                </small>
              )}
            </Form.Group>
            <Form.Group controlId="journeyDate">
              <Form.Control
                type="date"
                name="journeyDate"
                placeholder="*Enter Journey Date"
                ref={register({ required: true })}
              />
              {errors.journeyDate && (
                <small className="text-danger form-text">
                  Please enter a valid Phone Number
                </small>
              )}
            </Form.Group>
            <Row>
              <Col>
                {' '}
                <Form.Group controlId="receiveDate">
                  <Form.Control
                    type="date"
                    name="receiveDate"
                    placeholder="*Enter Receive Date"
                    ref={register({ required: true })}
                  />
                  {errors.receiveDate && (
                    <small className="text-danger form-text">
                      Please enter a valid receive Data
                    </small>
                  )}
                </Form.Group>
              </Col>
              <Col>
                {' '}
                <Form.Group controlId="time">
                  <Form.Control
                    type="time"
                    name="time"
                    placeholder="Departure time"
                    ref={register({ required: false })}
                  />
                  {errors.time && (
                    <small className="text-danger form-text">
                      Please enter a valid time
                    </small>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                {' '}
                <Form.Group controlId="fromPlace">
                  <Form.Control
                    type="text"
                    name="fromPlace"
                    placeholder="*Enter your Departure Location"
                    ref={register({ required: true })}
                  />
                  {errors.fromPlace && (
                    <small className="text-danger form-text">
                      Please enter your departure destination
                    </small>
                  )}
                </Form.Group>
              </Col>
              <Col>
                {' '}
                <Form.Group controlId="toPlace">
                  <Form.Control
                    type="text"
                    name="toPlace"
                    placeholder="*Enter your to Location"
                    ref={register({ required: true })}
                  />
                  {errors.toPlace && (
                    <small className="text-danger form-text">
                      Please enter your to destination
                    </small>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="message">
              <Form.Control
                as="textarea"
                name="message"
                placeholder="Add your Message"
                ref={register({ required: false })}
              />
            </Form.Group>
            <small className="text-muted">*Required Info</small>
            <Button className="" block type="submit">
              Generate
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormSection;
