import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import NavBar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { action_GET_defaultlogo } from "../Services/Actions/Default_Actions";

function NavigationFunc() {
  const [deps, setdeps] = useState([]);
  const [user, setUser] = useState({});
  const [info, setInfo] = useState([]);
  const [hospdefaults, sethospdefaults] = useState([]);
  const users = window.localStorage.getItem("username");
  const auth = window.localStorage.getItem("tokenizer");
  const dispatch = useDispatch();
  const logo = useSelector((state) => state.Default_Reducer.logo);

  const getinfo = () => {
    var url = `https://localhost:44340/api/values/dbgetactiveuser?id=${users}`;
    var bearer_token = auth;
    var bearer = "Bearer " + bearer_token;
    fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(
        (res) => {
          if (res.data && res.data.length) {
            setInfo(res.data);
          }
        },
        (error) => {}
      );
  };
  const logout = () => {
    window.localStorage.removeItem("tokenizer");
    window.localStorage.removeItem("username");
    window.location.href = "/";
  };
  useEffect(() => {
    dispatch(action_GET_defaultlogo());
    getinfo();
  }, []);
  if (users) {
    return (
      <NavBar bg="light" expand="lg">
        <NavBar.Brand href="/">
          <img src={logo} height="60px" widht="60px" />
        </NavBar.Brand>
        <NavBar.Toggle aria-controls="basic-navbar-nav" />
        <NavBar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Admin">Admin</Nav.Link>
            {hospdefaults.map((def) => (
              <div style={{ marginLeft: 255 + "px" }} key="">
                <Nav.Link>{def.hospname}</Nav.Link>
              </div>
            ))}
          </Nav>
          {info.map((infos) => (
            <Form inline key="">
              <Nav>
                <Nav.Link>Welcome : {infos.firstname}</Nav.Link>
              </Nav>
            </Form>
          ))}
          <Button variant="outline-info" onClick={logout}>
            Logout
          </Button>
        </NavBar.Collapse>
      </NavBar>
    );
  } else {
    return (
      <NavBar bg="light" expand="lg">
        <NavBar.Brand href="/">
          <img src={logo} height="60px" widht="60px" />
        </NavBar.Brand>
        <NavBar.Toggle aria-controls="basic-navbar-nav" />
        <NavBar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          {hospdefaults.map((def) => (
            <div style={{ margin: "auto", width: 500 + "px" }} key="">
              <Nav.Link>{def.hospname}</Nav.Link>
            </div>
          ))}

          <Form inline key="">
            <Nav>
              <Nav.Link></Nav.Link>
            </Nav>
          </Form>
          <Link to="/Login">
            <Button variant="outline-info">Login</Button>
          </Link>
        </NavBar.Collapse>
      </NavBar>
    );
  }
}
export default NavigationFunc;
