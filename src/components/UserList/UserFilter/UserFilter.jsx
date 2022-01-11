import React from "react";
import NATIONALITIES from "../../../constants/nationalities.js";
import getRandomKey from "../../../constants/getRandomKey.js";
import {
  Button,
  Form,
  Container,
  Navbar,
  Offcanvas,
  Alert,
} from "react-bootstrap";

export default function UserFilter(props) {
  const addNewElement = (e) => {
    e.preventDefault();
    const nationality = document.querySelector(
      ".js-form-nationality-one"
    ).value;
    const gender = document.querySelector(".js-form-gender-one").value;
    props.handleMultipleFilter(1, nationality, gender);
  };

  const addNewListOfElements = (e) => {
    e.preventDefault();
    const length = document.querySelector(".js-form-length").value;
    const nationality = document.querySelector(".js-form-nationality").value;
    const gender = document.querySelector(".js-form-gender").value;
    props.handleMultipleFilter(length, nationality, gender);
  };

  const deleteListOfElements = (e) => {
    e.preventDefault();
    props.handleDeleteList();
  };

  const getListOfNationalities = Object.values(NATIONALITIES);
  const optionsListOfNationalities = getListOfNationalities.map(
    (nationality) => {
      return <option key={getRandomKey()}>{nationality}</option>;
    }
  );

  return (
    <Navbar bg="light" expand={false} className="sticky-top">
      <Container fluid>
        <Navbar.Brand href="#">Random User</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Editor</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="">
            <Form>
              <Alert>Add new users to the list</Alert>
              <fieldset>
                <Form.Group className="mb-3">
                  <Form.Label>Nationality</Form.Label>
                  <Form.Select size="sm" className="js-form-nationality">
                    <option>Any</option>
                    {optionsListOfNationalities}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Length of list</Form.Label>
                  <Form.Select size="sm" className="js-form-length">
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select size="sm" className="js-form-gender">
                    <option>any</option>
                    <option>male</option>
                    <option>female</option>
                  </Form.Select>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    size="lg"
                    onClick={addNewListOfElements}
                  >
                    Submit
                  </Button>
                </div>
              </fieldset>
            </Form>
            <Alert variant="secondary mt-4">Add new user to the the list</Alert>
            <fieldset>
              <Form.Group className="mb-3">
                <Form.Label>Nationality</Form.Label>
                <Form.Select size="sm" className="js-form-nationality-one">
                  <option>Any</option>
                  {optionsListOfNationalities}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select size="sm" className="js-form-gender-one">
                  <option>any</option>
                  <option>male</option>
                  <option>female</option>
                </Form.Select>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="dark" onClick={addNewElement}>
                  Add
                </Button>
              </div>
            </fieldset>
            <Alert variant="danger mt-5">Remove all items from the list</Alert>
            <div className="d-grid gap-2">
              <Button variant="danger" onClick={deleteListOfElements}>
                Clear
              </Button>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
