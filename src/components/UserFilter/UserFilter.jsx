import React, { useState } from "react";
import NATIONALITIES from "../../constants/nationalities.js";
import getRandomKey from "../../constants/getRandomKey.js";
import {
  Button,
  Form,
  Container,
  Navbar,
  Offcanvas,
  ToastContainer,
  Toast,
} from "react-bootstrap";

export default function UserFilter(props) {
  const [addedUserMessageShow, setAddedUserMessageShow] = useState(false);
  const [addedUsersMessageShow, setAddedUsersMessageShow] = useState(false);
  const [clearMessageShow, setClearMessageShow] = useState(false);
  const addNewElement = (e) => {
    setAddedUserMessageShow(true);
    e.preventDefault();
    const nationality = document.querySelector(
      ".js-form-nationality-one"
    ).value;
    const gender = document.querySelector(".js-form-gender-one").value;
    props.handleMultipleFilter(1, nationality, gender);
  };

  const addNewListOfElements = (e) => {
    setAddedUsersMessageShow(true);
    e.preventDefault();
    const length = document.querySelector(".js-form-length").value;
    const nationality = document.querySelector(".js-form-nationality").value;
    const gender = document.querySelector(".js-form-gender").value;
    props.handleMultipleFilter(length, nationality, gender);
  };

  const deleteListOfElements = (e) => {
    e.preventDefault();
    props.handleDeleteList();
    setClearMessageShow(true);
  };

  const getListOfNationalities = Object.values(NATIONALITIES);
  const optionsListOfNationalities = getListOfNationalities.map(
    (nationality) => {
      return <option key={getRandomKey()}>{nationality}</option>;
    }
  );

  const listGroupNationality = (formClassName) => {
    return (
      <Form.Group className="mb-3">
        <Form.Label>Nationality</Form.Label>
        <Form.Select size="sm" className={formClassName}>
          <option>Any</option>
          {optionsListOfNationalities}
        </Form.Select>
      </Form.Group>
    );
  };

  const listGroupLength = (
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
  );

  const listGroupGender = (formClassName) => {
    return (
      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select size="sm" className={formClassName}>
          <option>any</option>
          <option>male</option>
          <option>female</option>
        </Form.Select>
      </Form.Group>
    );
  };

  const clearMessage = (
    <ToastContainer className="p-3 zindex" bg="secondary">
      <Toast
        onClose={() => setClearMessageShow(false)}
        show={clearMessageShow}
        delay={3000}
        autohide
        bg="secondary"
      >
        <Toast.Header>
          <strong className="me-auto">Random User</strong>
          <small>Now</small>
        </Toast.Header>
        <Toast.Body className="text-white">
          You have successfully deleted the list of users.
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );

  const addedUserMessage = (
    <ToastContainer className="p-3 zindex" bg="secondary">
      <Toast
        onClose={() => setAddedUserMessageShow(false)}
        show={addedUserMessageShow}
        delay={3000}
        autohide
        bg="secondary"
      >
        <Toast.Header>
          <strong className="me-auto">Random User</strong>
          <small>Now</small>
        </Toast.Header>
        <Toast.Body className="text-white">
          You have successfully added a user to the list.
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );

  const addedUsersMessage = (
    <ToastContainer className="p-3 zindex" bg="secondary">
      <Toast
        onClose={() => setAddedUsersMessageShow(false)}
        show={addedUsersMessageShow}
        delay={3000}
        autohide
        bg="secondary"
      >
        <Toast.Header>
          <strong className="me-auto">Random User</strong>
          <small>Now</small>
        </Toast.Header>
        <Toast.Body className="text-white">
          You have successfully added new users to the list.
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );

  return (
    <>
      <Navbar bg="dark" variant="dark" expand={false} className="sticky-top">
        <Container fluid>
          <Navbar.Brand href="#">Random User</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Editor
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="">
              <Form className="bg-light bg-gradient mt-0">
                <fieldset>
                  <Form.Label column="lg" sm={12}>
                    Add new users to the list
                  </Form.Label>
                  {listGroupNationality("js-form-nationality")}
                  {listGroupLength}
                  {listGroupGender("js-form-gender")}
                  <div className="d-grid gap-2">
                    <Button
                      variant="secondary"
                      type="submit"
                      onClick={addNewListOfElements}
                    >
                      Add
                    </Button>
                  </div>
                </fieldset>
              </Form>
              <Form className="bg-light bg-gradient mt-3">
                <fieldset>
                  <Form.Label column="lg" sm={12}>
                    Add only one user to the list
                  </Form.Label>
                  {listGroupNationality("js-form-nationality-one")}
                  {listGroupGender("js-form-gender-one")}
                  <div className="d-grid gap-2">
                    <Button
                      variant="secondary"
                      type="submit"
                      onClick={addNewElement}
                    >
                      Add
                    </Button>
                  </div>
                </fieldset>
              </Form>
              <Form className="bg-light bg-gradient mt-3">
                <Form.Label column="lg" sm={12}>
                  Remove all items from the list
                </Form.Label>
                <div className="d-grid gap-2">
                  <Button
                    variant="secondary"
                    type="submit"
                    onClick={deleteListOfElements}
                  >
                    Clear
                  </Button>
                </div>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {addedUserMessage}
      {addedUsersMessage}
      {clearMessage}
    </>
  );
}
