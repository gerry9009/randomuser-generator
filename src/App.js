import "./App.css";
import { useEffect } from "react";
import UserList from "./components/UserList/UserList";
import axios from "axios";
//https://randomuser.me/api

function App() {
  useEffect(() => {
    axios.get("https://randomuser.me/api?results=20").then((resp) => {
      console.log(resp.data.results);
    });
  }, []);
  return <UserList />;
}

export default App;
