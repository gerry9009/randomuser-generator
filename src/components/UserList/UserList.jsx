import UserItem from "../UserItem/UserItem";
import UserFilter from "../UserFilter/UserFilter";
import NATIONALITIES from "../../constants/nationalities";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [disable, setDisable] = useState(false);

  const changeDisable = () => {
    setDisable(!disable);
  };

  useEffect(() => {
    getUsersFromAPI();
  }, []);

  const getUsersFromAPI = (lengthOfNewUsersList = 5, nationality, gender) => {
    const API = `https://randomuser.me/api?results=${lengthOfNewUsersList}&nat=${nationality}&gender=${gender}`;
    axios.get(API).then((resp) => {
      const data = resp.data.results;
      const newUserList = data.map((user) => {
        const newUser = {
          picture: user.picture.large,
          name: `${user.name.title} ${user.name.first} ${user.name.last}`,
          nationality: NATIONALITIES[user.nat],
          username: user.login.username,
          gender: user.gender,
          born: user.dob.date.slice(0, 10),
          location: `${user.location.country}, ${user.location.state}, ${user.location.city}`,
          email: user.email,
          cell: user.cell,
          key: user.login.uuid,
        };
        return newUser;
      });
      setUsers((previousUserList) => [...previousUserList, ...newUserList]);
    });
  };

  const handleMultipleFilter = (lengthOfNewUsersList, nationality, gender) => {
    const getNationalityShortcut = Object.keys(NATIONALITIES).find(
      (key) => NATIONALITIES[key] === nationality
    );
    getUsersFromAPI(lengthOfNewUsersList, getNationalityShortcut, gender);
  };

  const handleDeleteList = () => {
    setUsers([]);
  };

  const deleteElement = (id) => {
    const newUserList = users.filter((user) => user.key !== id);
    setUsers(newUserList);
  };

  const editElement = (id, editedDataKey, editedDataNewValue) => {
    const newUserList = users.map((user) => {
      if (user.key === id) {
        user[editedDataKey.toString()] = editedDataNewValue;
      }
      return user;
    });
    setUsers(newUserList);
  };

  const insertedUserElements = users.map((user) => {
    return (
      <UserItem
        picture={user.picture}
        name={user.name}
        nationality={user.nationality}
        username={user.username}
        gender={user.gender}
        born={user.born}
        location={user.location}
        email={user.email}
        cell={user.cell}
        key={user.key}
        id={user.key}
        deleteElement={deleteElement}
        editElement={editElement}
        disable={disable}
        changeDisable={changeDisable}
      />
    );
  });

  return (
    <>
      <UserFilter
        handleMultipleFilter={handleMultipleFilter}
        handleDeleteList={handleDeleteList}
      />
      <Container className="d-flex flex-row flex-wrap justify-content-center">
        {insertedUserElements}
      </Container>
    </>
  );
}
