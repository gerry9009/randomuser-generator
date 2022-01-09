import React from "react";
import UserItem from "./UserItem/UserItem";
import UserFilter from "./UserFilter/UserFilter";

export default function UserList() {
  return (
    <>
      <h1>UserList</h1>
      <UserFilter />
      <UserItem />
    </>
  );
}
