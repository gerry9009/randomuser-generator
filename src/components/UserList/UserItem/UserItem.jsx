import React, { useState } from "react";
import { Card, ListGroup, Form, CloseButton, Button } from "react-bootstrap";
import NATIONALITIES from "../../../constants/nationalities.js";
import getRandomKey from "../../../constants/getRandomKey.js";

//Form.Control
//validation

export default function UserItem(props) {
  const [editMode, setEditMode] = useState(false);

  const changeEditMode = () => {
    setEditMode(!editMode);
  };

  const handleDeleteElement = () => {
    props.deleteElement(props.id);
  };

  const updateElement = () => {
    changeEditMode();
    const datasetNodelist = [...document.querySelectorAll(".data")];
    const datasetKeyList = datasetNodelist.map((item) => item.dataset.key);
    const datasetValueList = datasetNodelist.map((item) => item.value);

    datasetKeyList.forEach((key, index) => {
      if (datasetValueList[index] !== props[key]) {
        props.editElement(props.id, key, datasetValueList[index]);
      }
    });
  };

  const defaultView = (value) => {
    return (
      <Form.Control
        className="border-top form-control-sm"
        plaintext
        disabled
        defaultValue={value}
      />
    );
  };
  const editView = (value, propsKey) => {
    return (
      <Form.Control
        className="border-top form-control-sm data"
        data-key={propsKey}
        defaultValue={value}
      />
    );
  };

  const editButton = () => {
    return (
      <div className="d-grid gap-2" style={{ width: "100%" }}>
        <Button variant="secondary" onClick={changeEditMode}>
          Edit
        </Button>
      </div>
    );
  };

  const confirmButtons = () => {
    return (
      <div className="d-flex" style={{ width: "100%" }}>
        <Button
          variant="outline-success"
          style={{ width: "80%" }}
          onClick={updateElement}
        >
          Confirm
        </Button>
        <Button
          variant="outline-danger"
          style={{ width: "20%" }}
          onClick={changeEditMode}
        >
          X
        </Button>
      </div>
    );
  };

  const propsKeys = Object.keys(props);
  const keysOfListGroup = propsKeys.filter((key) => {
    if (
      key === "picture" ||
      key === "name" ||
      key === "id" ||
      key === "deleteElement" ||
      key === "editElement"
    ) {
      return false;
    } else {
      return true;
    }
  });

  const listGroupElements = keysOfListGroup.map((key) => {
    return (
      <ListGroup.Item key={getRandomKey()} className="py-0 px-2">
        <Form.Label
          column
          sm="4"
          className="text-capitalize text-secondary col-form-label-sm p-0"
        >
          {key}:
        </Form.Label>
        {editMode ? editView(props[key], key) : defaultView(props[key])}
      </ListGroup.Item>
    );
  });

  return (
    <Card className="m-2" style={{ width: "15rem" }}>
      <div
        className="bg-dark d-flex flex-row-reverse p-1"
        style={{ width: "100%" }}
      >
        <CloseButton variant="white" onClick={handleDeleteElement} />
      </div>
      <Card.Img variant="top" src={props.picture} />
      <Card.Header key={getRandomKey()}>
        {editMode ? (
          <Form.Control
            className="border-top form-control-sm h5 data"
            data-key="name"
            defaultValue={props.name}
          />
        ) : (
          <Form.Control
            className="border-top form-control-sm h5"
            plaintext
            disabled
            defaultValue={props.name}
          />
        )}
      </Card.Header>
      <ListGroup className="list-group-flush" style={{ width: "100%" }}>
        {listGroupElements}
      </ListGroup>
      {editMode ? confirmButtons() : editButton()}
    </Card>
  );
}
