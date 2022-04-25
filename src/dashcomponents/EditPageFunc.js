import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { Row, Col, Form, FormGroup } from "react-bootstrap";
import Buttons from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { action_updatepage } from "../Services/Actions/Pages_Actions";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: 450,
    width: 500,
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;

  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function AddPageFunc(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [id, setID] = useState("");
  const [pageurl, setPageurl] = useState("");
  const [pagename, setPagename] = useState("");
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    var auth = window.localStorage.getItem("tokenizer");
    if (!auth) {
      history.push("./Login");
    }
    event.preventDefault();
    var auth = window.localStorage.getItem("tokenizer");
    if (!auth) {
      history.push("./Login");
    }
    dispatch(
      action_updatepage(
        event.target.id.value,
        event.target.pagename.value,
        event.target.pageurl.value,
        event.target.pageactivated.value
      )
    );
    // var url = `${process.env.REACT_APP_BASE_URL}/api/pagesadmin/updatepages`;
    // var bearer_token = auth;
    // var bearer = "Bearer " + bearer_token;
    // fetch(url, {
    //   method: "POST",
    //   withCredentials: true,
    //   headers: {
    //     Authorization: bearer,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: event.target.id.value,
    //     name: event.target.pagename.value,
    //     url: event.target.pageurl.value,
    //     isActive: event.target.pageactivated.value,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then(
    //     (result) => {
    //       alert("Updated Successfully");
    //     },
    //     (error) => {
    //       alert("Failed to insert data");
    //     }
    //   );
  };
  useEffect(() => {
    setID(id);
  }, []);
  return (
    <div className="container">
      <Buttons variant="info" block onClick={handleOpen}>
        Edit Page
      </Buttons>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Row>
              <Col sm={12}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="queueno">
                    <Form.Label>Page Id</Form.Label>
                    <Form.Control
                      type="text"
                      name="id"
                      required
                      disabled
                      defaultValue={props.id}
                      placeholder="Page Id"
                    />
                  </Form.Group>
                  <Form.Group controlId="pageurl">
                    <Form.Label>Page Url</Form.Label>
                    <Form.Control
                      type="text"
                      name="page_url"
                      required
                      defaultValue={props.pageurl}
                      placeholder="Page Url"
                    />
                  </Form.Group>
                  <Form.Group controlId="pagename">
                    <Form.Label>Page Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="page_name"
                      defaultValue={props.pagename}
                      placeholder="Type of Counter"
                    />
                  </Form.Group>
                  <Form.Group controlId="pageactivated">
                    <Form.Label>Activated</Form.Label>
                    <Form.Control as="select">
                      <option value="T">Yes</option>
                      <option value="F">No</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group
                    controlId="countername"
                    style={{ float: "right" }}
                  >
                    <Button variant="contained" color="primary" type="submit">
                      Update Page
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
