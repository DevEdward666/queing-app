import React, { Component } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Spinner,
} from "react-bootstrap";

export class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = { snackbaropen: false, snarckbarmsg: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    var auth = (this.token = window.localStorage.getItem("tokenizer"));
    if (!this.token) {
      this.props.history.push("./Login");
    }
    var url = "https://localhost:44340/api/pagesadmin/updatepages";
    var bearer_token = auth;
    var bearer = "Bearer " + bearer_token;
    //  fetch(url, {
    //     method: 'POST',
    //     withCredentials: true,
    //     headers: {
    //          'Authorization': bearer,
    //        'Content-Type': 'application/json'
    //    },
    //    body:JSON.stringify({
    //       id:event.target.id.value,
    //       name:event.target.pagename.value,
    //       url:event.target.pageurl.value,
    //       isActive:event.target.pageactivated.value
    //    })
    //   })
    //   .then(response=>response.json())
    //   .then((result) => {
    //     alert("Updated Successfully");
    //   },(error)=>{
    //       alert('Failed to insert data')
    //   }
    //   )
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Page
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col sm={12}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="queueno">
                    <Form.Label>Page Id</Form.Label>
                    <Form.Control
                      type="text"
                      name="id"
                      required
                      disabled
                      defaultValue={this.props.id}
                      placeholder="Page Id"
                    />
                  </Form.Group>
                  <Form.Group controlId="pageurl">
                    <Form.Label>Page Url</Form.Label>
                    <Form.Control
                      type="text"
                      name="page_url"
                      required
                      defaultValue={this.props.pageurl}
                      placeholder="Page Url"
                    />
                  </Form.Group>
                  <Form.Group controlId="pagename">
                    <Form.Label>Page Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="page_name"
                      defaultValue={this.props.pagename}
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
                  <Form.Group controlId="countername">
                    <Button variant="primary" type="submit">
                      Update Page
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default EditPage;
