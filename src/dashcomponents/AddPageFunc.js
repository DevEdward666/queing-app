import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { Buttons, Row, Col, Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { action_insertpage } from "../Services/Actions/Pages_Actions";
import SuccessSnackbar from "../Containers/SucessSnackbar";
import { ImageGradient } from "material-ui/svg-icons";
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
    height: 250,
    width: 500,
  },
  input: {
    display: "none",
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

const auth = window.localStorage.getItem("tokenizer");
export default function AddPageFunc() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [snackbaropen, setsnackbaropen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const success = useSelector((state) => state.Pages_Reducer.success);
  const [image, setimage] = useState();
  const [imageurl, setimageurl] = useState("");
  const [imagename, setimagename] = useState();
  const [imagetoview, setimagetoview] = useState();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const history = useHistory();

  const formData = new FormData();
  const handleSubmit = async (event) => {
    event.preventDefault();
    var auth = window.localStorage.getItem("tokenizer");
    if (!auth) {
      history.push("./Login");
    }

    dispatch(
      action_insertpage(
        event.target.pagename.value,
        event.target.pageurl.value,
        imageurl
      )
    );
    formData.append("photo", image);
    formData.append("description", imagename);
    var bearer_token = auth;
    var bearer = "Bearer " + bearer_token;
    var url = `${process.env.REACT_APP_BASE_URL}/api/ns/upload`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
      },
      body: formData,
    });

    if (success) {
      setsnackbaropen(true);
      setMessage("Page Added Successfully");
      setType("success");
    } else {
      setsnackbaropen(true);
      setMessage("Something Went Wrong");
      setType("warning");
    }
  };

  return (
    <div>
      <SuccessSnackbar
        message={message}
        opens={snackbaropen}
        close={false}
        type={type}
        handleClose={() => setsnackbaropen(false)}
      />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Page
      </Button>
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
                  <Form.Group controlId="pageurl">
                    <Form.Label>Page Url</Form.Label>
                    <Form.Control
                      type="text"
                      name="page_url"
                      required
                      placeholder="Page Url"
                    />
                  </Form.Group>
                  <Form.Group controlId="pagename">
                    <Form.Label>Page Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="page_name"
                      required
                      placeholder="Page Name"
                    />
                  </Form.Group>

                  <Form.Group controlId="countername">
                    <Row>
                      <Col sm={12}>
                        {/* <img
                          src={imagetoview}
                          style={{ width: 50, height: 50 }}
                        /> */}

                        <input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={onImageChange}
                        />
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="outlined"
                            color="primary"
                            component="span"
                          >
                            Choose Image
                          </Button>
                        </label>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          style={{ marginLeft: 180 }}
                        >
                          Add Page
                        </Button>
                      </Col>
                    </Row>
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
