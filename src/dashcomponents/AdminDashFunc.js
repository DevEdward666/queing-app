import React, { useState, useEffect } from "react";
import "../css/card_css.css";
import img from "../images/browser.png";
import AddPageFunc from "./AddPageFunc";
import EditPageFunc from "./EditPageFunc";
import ButtonToolBar from "react-bootstrap/ButtonToolBar";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { action_set_data } from "../Services/Actions/Dashboard_Actions";

function AdminDashFunc() {
  const [deps, setdeps] = useState([]);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.Dashboard_Reducer.data);

  const history = useHistory();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const getallpages = () => {
  //   var url = `${process.env.REACT_APP_BASE_URL}/api/pages/getallPages`;
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       setdeps(res.data);
  //       if (users) {
  //         history.push("./admin");
  //       } else {
  //         history.push("./Login");
  //       }
  //     });
  // };
  var users = window.localStorage.getItem("username");
  useEffect(() => {
    if (users) {
      history.push("./admin");
    } else {
      history.push("./Login");
    }
    dispatch(action_set_data());
  }, []);

  return (
    <div className="container">
      <div className=" mt-3 d-flex justify-content-left">
        <ButtonToolBar>
          <AddPageFunc show={handleOpen} />
        </ButtonToolBar>
      </div>
      <div className="row">
        {pages.map((card) => (
          <div className="col-md-3" key={card.id}>
            <a href={card.isActive == "T" ? card.url : null}>
              <div className="content" style={{ backgroundColor: "white" }}>
                <div className="icon">
                  <img
                    alt=""
                    style={{ objectFit: "contain" }}
                    height="100%"
                    width="100%"
                    src={`${process.env.REACT_APP_BASE_URL}/${card.scheme}`}
                  />
                </div>

                <div className="title" style={{ color: "black" }}>
                  {card.isActive == "T" ? card.name : card.name + " (INACTIVE)"}
                </div>
              </div>
            </a>
            <ButtonToolBar>
              <EditPageFunc
                block
                id={card.id}
                pagename={card.name}
                pageurl={card.url}
                show={handleOpen}
              />
            </ButtonToolBar>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AdminDashFunc;
