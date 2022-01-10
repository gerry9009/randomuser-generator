import React from "react";
import { Card, ListGroup, Form } from "react-bootstrap";

//Form.Control
//validation
export default function UserItem(props) {
  return (
    <Card className="m-2" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.picture} />
      <Card.Body>
        <Card.Title className="d-flex justify-content-center align-items-center">
          {props.name}
        </Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush" style={{ width: "100%" }}>
        <ListGroup.Item>
          <Form.Label
            column
            sm="8"
            className="text-capitalize text-secondary col-form-label-sm"
          >
            nationality:
          </Form.Label>
          <Form.Control
            className="border-top form-control-sm"
            plaintext
            disabled
            defaultValue={props.nationality}
          />
        </ListGroup.Item>

        <ListGroup.Item>
          <Form.Label
            column
            sm="4"
            className="text-capitalize text-secondary col-form-label-sm"
          >
            username:
          </Form.Label>
          <Form.Control
            className="border-top form-control-sm"
            plaintext
            disabled
            defaultValue={props.username}
          />
        </ListGroup.Item>

        <ListGroup.Item>
          <Form.Label
            column
            sm="4"
            className="text-capitalize text-secondary col-form-label-sm"
          >
            password:
          </Form.Label>
          <Form.Control
            className="border-top form-control-sm"
            plaintext
            disabled
            defaultValue={props.password}
          />
        </ListGroup.Item>

        <ListGroup.Item>
          <Form.Label
            column
            sm="4"
            className="text-capitalize text-secondary col-form-label-sm"
          >
            gender:
          </Form.Label>
          <Form.Control
            className="border-top form-control-sm"
            plaintext
            disabled
            defaultValue={props.gender}
          />
        </ListGroup.Item>

        <ListGroup.Item>
          <Form.Label
            column
            sm="4"
            className="text-capitalize text-secondary col-form-label-sm"
          >
            born:
          </Form.Label>
          <Form.Control
            className="border-top form-control-sm"
            plaintext
            disabled
            defaultValue={props.born}
          />
        </ListGroup.Item>

        <ListGroup.Item>
          <Form.Label
            column
            sm="4"
            className="text-capitalize text-secondary col-form-label-sm"
          >
            location:
          </Form.Label>
          <Form.Control
            className="border-top form-control-sm"
            plaintext
            disabled
            defaultValue={props.location}
          />
        </ListGroup.Item>

        <ListGroup.Item>
          <Form.Label
            column
            sm="4"
            className="text-capitalize text-secondary col-form-label-sm"
          >
            email:
          </Form.Label>
          <Form.Control
            className="border-top form-control-sm"
            plaintext
            disabled
            defaultValue={props.email}
          />
        </ListGroup.Item>

        <ListGroup.Item>
          <Form.Label
            column
            sm="4"
            className="text-capitalize text-secondary col-form-label-sm"
          >
            cell:
          </Form.Label>
          <Form.Control
            className="border-top form-control-sm"
            plaintext
            disabled
            defaultValue={props.cell}
          />
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
