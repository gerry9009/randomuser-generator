import UserItem from "./UserItem/UserItem";
import UserFilter from "./UserFilter/UserFilter";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NATIONALITIES from "../../constants/nationalities.js";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://randomuser.me/api?results=20").then((resp) => {
      const data = resp.data.results;
      const newUserList = data.map((user) => {
        const newUser = {
          picture: user.picture.large,
          name: `${user.name.title} ${user.name.first} ${user.name.last}`,
          nationality: NATIONALITIES[user.nat],
          username: user.login.username,
          password: user.login.password,
          gender: user.gender,
          born: user.dob.date.slice(0, 10),
          location: `${user.location.country}, ${user.location.state}, ${user.location.city}`,
          email: user.email,
          cell: user.cell,
          key: user.login.uuid,
        };
        return newUser;
      });
      setUsers(newUserList);
    });
  }, []);

  const insertUserElements = users.map((user) => {
    return (
      <UserItem
        picture={user.picture}
        name={user.name}
        nationality={user.nationality}
        username={user.username}
        password={user.password}
        gender={user.gender}
        born={user.born}
        location={user.location}
        email={user.email}
        cell={user.cell}
        key={user.key}
      />
    );
  });

  return (
    <Container className="d-flex flex-row flex-wrap justify-content-center">
      {insertUserElements}
    </Container>
  );
}
