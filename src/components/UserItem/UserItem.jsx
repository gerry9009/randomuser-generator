import React, { useState } from "react";
import {
  Card,
  ListGroup,
  Form,
  CloseButton,
  Button,
  FormSelect,
} from "react-bootstrap";
import NATIONALITIES from "../constants/nationalities.js";
import VALIDATIONS from "../constants/validations.js";
import VALIDATION_FEEDBACK from "../constants/validationFeedback.js";
import getRandomKey from "../constants/getRandomKey.js";

export default function UserItem(props) {
  const [editMode, setEditMode] = useState(false);
  const [genderValue, setGenderValue] = useState(props.gender);

  const handleGenderRadioChange = () => {
    const genderNewValue = genderValue === "male" ? "female" : "male";
    setGenderValue(genderNewValue);
  };

  const changeEditMode = () => {
    setEditMode(!editMode);
  };

  const handleChangeEditMode = (e) => {
    e.preventDefault();
    changeEditMode();
  };

  const handleDeleteElement = () => {
    props.deleteElement(props.id);
  };

  const updateElement = (e) => {
    e.preventDefault();

    const datasetNodelist = [...document.querySelectorAll(".data")];
    const datasetKeyList = datasetNodelist.map((item) => item.dataset.key);
    const datasetValueList = datasetNodelist.map((item) => item.value);

    let isValidForm = true;
    datasetNodelist.forEach((item) => {
      const validitionValue = validation(item);
      if (!validitionValue) {
        isValidForm = false;
      }
    });

    if (isValidForm) {
      datasetKeyList.forEach((key, index) => {
        if (datasetValueList[index] !== props[key]) {
          props.editElement(props.id, key, datasetValueList[index]);
        }
      });
      props.editElement(props.id, "gender", genderValue);
      changeEditMode();
    }
  };

  const validation = (item) => {
    item.classList.remove("is-invalid");
    const itemValue = item.value.toString();
    const itemKey = item.dataset.key;
    const regex = new RegExp(VALIDATIONS[itemKey]);
    if (!regex.test(itemValue)) {
      item.classList.add("is-invalid");
    }
    return regex.test(itemValue);
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
      <>
        <Form.Control
          className="border-top form-control-sm data"
          data-key={propsKey}
          defaultValue={value}
          id={propsKey}
        />
        <Form.Control.Feedback type="invalid">
          {VALIDATION_FEEDBACK[propsKey]}
        </Form.Control.Feedback>
      </>
    );
  };

  const editButton = () => {
    return (
      <div className="d-grid gap-2 w-100">
        <Button variant="secondary" onClick={handleChangeEditMode}>
          Edit
        </Button>
      </div>
    );
  };

  const confirmButtons = () => {
    return (
      <div className="d-flex w-100">
        <Button variant="outline-success w-75" onClick={updateElement}>
          Confirm
        </Button>
        <Button variant="outline-danger w-25" onClick={handleChangeEditMode}>
          X
        </Button>
      </div>
    );
  };

  const headerElement = (
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
  );

  const getListOfNationalities = Object.values(NATIONALITIES);
  const optionsListOfNationalities = getListOfNationalities.map(
    (nationality) => {
      return <option key={getRandomKey()}>{nationality}</option>;
    }
  );

  const listGroupNationality = (
    <ListGroup.Item key={getRandomKey()} className="py-0 px-2">
      <Form.Label
        column
        sm="4"
        className="text-capitalize text-secondary col-form-label-sm p-0"
      >
        {"Nationality"}:
      </Form.Label>
      {editMode ? (
        <FormSelect size="sm" className="data" data-key="nationality">
          <option>{props.nationality}</option>
          {optionsListOfNationalities}
        </FormSelect>
      ) : (
        defaultView(props.nationality)
      )}
    </ListGroup.Item>
  );

  const listGroupGender = (
    <ListGroup.Item key={getRandomKey()} className="py-0 px-2">
      <Form.Label
        column
        sm="4"
        className="text-capitalize text-secondary col-form-label-sm p-0"
      >
        {"Gender"}:
      </Form.Label>
      {editMode ? (
        <div key={getRandomKey} className="mb-3">
          <Form.Check
            inline
            name="gender"
            label="male"
            type="radio"
            checked={genderValue === "male"}
            onChange={() => {
              handleGenderRadioChange();
            }}
          />
          <Form.Check
            inline
            name="gender"
            label="female"
            type="radio"
            checked={genderValue === "female"}
            onChange={() => {
              handleGenderRadioChange();
            }}
          />
        </div>
      ) : (
        defaultView(props.gender)
      )}
    </ListGroup.Item>
  );

  const propsKeys = Object.keys(props);
  const keysOfListGroup = propsKeys.filter((key) => {
    if (
      key === "picture" ||
      key === "name" ||
      key === "id" ||
      key === "deleteElement" ||
      key === "editElement" ||
      key === "nationality" ||
      key === "gender"
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
          htmlFor={key}
        >
          {key}:
        </Form.Label>
        {editMode ? editView(props[key], key) : defaultView(props[key])}
      </ListGroup.Item>
    );
  });

  return (
    <Card className="m-2 wrem-15">
      <div className="bg-dark d-flex flex-row-reverse p-1 w-100">
        <CloseButton variant="white" onClick={handleDeleteElement} />
      </div>
      <Card.Img variant="top" src={props.picture} alt={props.name} />
      <Form>
        {headerElement}
        <ListGroup className="list-group-flush w-100">
          {listGroupNationality}
          {listGroupGender}
          {listGroupElements}
        </ListGroup>
        {editMode ? confirmButtons() : editButton()}
      </Form>
    </Card>
  );
}
