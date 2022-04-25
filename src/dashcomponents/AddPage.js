import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap';
export class AddPage extends Component{
    constructor(props){
        super(props);
        this.state={token:''};
        this.handleSubmit = this.handleSubmit.bind(this);
     
      
    }
  
    handleSubmit(event){

        event.preventDefault();
        var auth=this.token=window.localStorage.getItem("tokenizer");
        if(!auth){
            this.props.history.push("./Login");
        }
        var url = "https://localhost:44340/api/pagesadmin/insertnewpages";
        var bearer_token=auth;
          var bearer = 'Bearer ' + bearer_token;
       fetch(url, {
          method: 'POST',
          withCredentials: true,
          headers: {
               'Authorization': bearer,
             'Content-Type': 'application/json'
         },
         body:JSON.stringify({
            url:event.target.pageurl.value,
            name:event.target.pagename.value,
         })
        })
        .then(response=>response.json())
        .then((result) => {
          alert("Page Successfully Added");
        },(error)=>{
            alert('Failed to insert data')
        }
        )
    }
    render(){
        return(
        <Modal
      {...this.props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Page
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <div className="container">
           <Row>
               <Col sm={12}>
                   <Form onSubmit={this.handleSubmit}>
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
                        <Button variant="primary" type="submit">Add Page</Button>
                  
                       </Form.Group>
                   </Form>
               </Col>
           </Row>
       </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
    }

}
export default AddPage;