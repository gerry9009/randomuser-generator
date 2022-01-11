import React from "react";
import { Card, ListGroup, Form } from "react-bootstrap";

//Form.Control
//validation
export default function UserItem(props) {
  const propsKeys = Object.keys(props);
  const keysOfListGroup = propsKeys.filter((key) => {
    if (key === "picture" || key === "name") {
      return false;
    } else {
      return true;
    }
  });

  const listGroupElements = keysOfListGroup.map((key, index) => {
    return (
      <ListGroup.Item key={key + "-" + index}>
        <Form.Label
          column
          sm="4"
          className="text-capitalize text-secondary col-form-label-sm"
        >
          {key}:
        </Form.Label>
        <Form.Control
          className="border-top form-control-sm"
          plaintext
          disabled
          defaultValue={props[key]}
        />
      </ListGroup.Item>
    );
  });

  return (
    <Card className="m-2" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.picture} />
      <Card.Body>
        <Card.Title className="d-flex justify-content-center align-items-center">
          {props.name}
        </Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush" style={{ width: "100%" }}>
        {listGroupElements}
      </ListGroup>
    </Card>
  );
}
