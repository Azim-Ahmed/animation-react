import { useContext, useEffect, useState } from 'react';
import { Col, Row, Table, Button } from 'react-bootstrap';
import Layout from '../../Components/Layout';
import { UserContext } from '../_app';
import Modal from '../../Components/ReUseableUI/Modal';
import Input from '../../Components/ReUseableUI/Input';
import { api } from '../../urlConfig';

const Dashboard = (props) => {
  const { appData, setAppData } = useContext(UserContext);

  //states of addServices
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [servicePicture, setServicePicture] = useState('');
  //states of the this component
  const [getAllServices, setGetAllservices] = useState({});
  const [serviceDetailModal, setServiceDetailModal] = useState(false);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [show, setShow] = useState(false);

  //

  useEffect(() => {
    fetch(`${api}/services/getAllServices`)
      .then((res) => res.json())
      .then((data) => setGetAllservices(data.service));
  }, [getAllServices]);

  const handleShow = () => setShow(true);

  const showServiceDetailsModal = (service) => {
    setServiceDetails(service);
    setServiceDetailModal(true);
  };

  const handleClose = () => {
    // const form = new FormData();
    // form.append('name', name);
    // form.append('time', time);
    // form.append('price', price);
    // form.append('description', description);
    // form.append('servicePicture', servicePicture);
    const formData = { name, time, price, description, servicePicture };
    //const data = JSON.stringify(formData);
    console.log(formData);
    // let object = {};
    // form.forEach(function (value, key) {
    //   object[key] = value;
    // });

    // var json = JSON.stringify(object);
    // console.log(json);
    fetch(`${api}/service/create`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('done');
      });

    setShow(false);
  };

  const renderAllServicesData = () => {
    return (
      <Table style={{ fontSize: '.9rem' }} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {getAllServices.length > 0
            ? getAllServices.map((service, index) => (
                <tr
                  key={service._id}
                  onClick={() => showServiceDetailsModal(service, index)}
                >
                  <td>{index + 1}</td>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>{service.price}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddServiceModal = () => {
    return (
      <Modal
        size="lg"
        show={show}
        addServiceButton={true}
        handleClose={handleClose}
        modalTitle="Add New Product"
      >
        <Input
          label="Name"
          value={name}
          placeholder={`Service Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Time"
          value={time}
          placeholder={`time`}
          onChange={(e) => setTime(e.target.value)}
        />

        <Input
          label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          label="servicePicture URL"
          value={servicePicture}
          placeholder={`servicePicture URL`}
          onChange={(e) => setServicePicture(e.target.value)}
        />
        {/* <select
          value={categoryId}
          className="form-control"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null} */}
        {/* <input
          className="mt-3"
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        /> */}
      </Modal>
    );
  };

  const renderServiceDetailModal = () => {
    // console.log(serviceDetails);
    if (!serviceDetails) {
      return null;
    }
    return (
      <Modal
        size="lg"
        show={serviceDetailModal}
        showServiceDetailsModal={false}
        handleClose={() => setServiceDetailModal(false)}
        modalTitle={`Service Details`}
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{serviceDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{serviceDetails.price}</p>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <label className="key">Updated time</label>
            <p className="value">{serviceDetails.updatedAt}</p>
          </Col>
          <Col md="6">
            <label className="key">Created Time</label>
            <p className="value">{serviceDetails.createdAt}</p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{serviceDetails.description}</p>
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <Layout dashboard>
      <div className="d-flex justify-content-between mb-3">
        <h1 className="text-white">Service</h1>
        <Button variant="primary" onClick={handleShow}>
          Add Service
        </Button>{' '}
      </div>

      {renderAllServicesData()}
      {renderAddServiceModal()}
      {renderServiceDetailModal()}
    </Layout>
  );
};

export default Dashboard;
