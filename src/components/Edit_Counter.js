import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form, FormGroup, Spinner} from 'react-bootstrap';

export class Edit_Counter extends Component{

        constructor(props){
            super(props);
            this.state={snackbaropen:false, snarckbarmsg:''};
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleSubmit(event){

            event.preventDefault();
            var url = "https://localhost:44340/api/values/updatecounter";
            var bearer_token="gYH12UWtrZSIuXsz0GTt6XrXOMjAbORU39YOHoGpIuVCUBizNn24girJTHVf80jwswkyH-ocm8SShGcrpgw1A7o_OQ3tLGgr4BOUVvXqawe34jVWhwSV5qbNv9FqPL2b2REcPLzM5ZiFFpX5m2B2m7ayfLgRRcDoG4awhjFNH4NmGKr30P9n5MN2_EZTUFNjXSDnRrcFElOpwvsIjdn1rQg2rgYAmX_qUVuyHnRnTVs466ixK51R9zl_nvAFhCxcxtcxfhrTAJdAFG7BKYnl3JTS85O9lc2gy1cbNsm8hkqLr8JBycWAcZeQ5VjktaUJcTpgHDPxfHuvxbtGahu1lK--cgR2IntSdPJCL9yrqUfckQvFJ9531mWOKVkfEckUz4XiCQwArMORuaeNlSpel-hOrcjRJcZ21nhSBjRg-SG_7-IL35S1p53DqfVaS4wPmROdhyh0BQsxcjSSiiV-Gy5YxFF-XTVZaz6y3UQoaAoH5obHbF8jfjiw790XKjWnEgVOp__2s20dhkHYDJ_DNCO82YxyXLs0pXrNMgdEhusl7xwmpiTEvy5CtZwdblzZzF_tsA8t_1-Oo7z_AynDqQ_aZJgYfBRL-nGwsTbZEosuc8e2xvNPbe8Bntw2juj8"
            var bearer = 'Bearer ' 
            + bearer_token;
           fetch(url, {
              method: 'POST',
              withCredentials: true,
              headers: {
                   'Authorization': bearer,
                 'Content-Type': 'application/json'
             },
             body:JSON.stringify({
                queueno:event.target.queueno.value,
             })
            })
            .then(response=>response.json())
            .then(({result}) => {
              alert(result);
            },(error)=>{
                alert('Failed to insert data')
            }
            )
        }
        render(){
            return(
            <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Counter
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <div className="container">
               <Row>
                   <Col sm={6}>
                       <Form onSubmit={this.handleSubmit}>
                           <Form.Group controlId="queueno">
                               <Form.Label>Queue Number</Form.Label>
                               <Form.Control
                               type="text"
                               name="queueno"
                               required
                               disabled
                               defaultValue={this.props.queueno}
                               placeholder="Queue Number"
                               />
                           </Form.Group>
                           <Form.Group controlId="countername">
                               <Form.Label>Counter Name</Form.Label>
                               <Form.Control
                               type="text"
                               name="counter_name"
                               required
                               defaultValue={this.props.countername}
                               placeholder="Counter Name"
                               />
                           </Form.Group>
                           <Form.Group controlId="typeofcounter">
                               <Form.Label>Type of Counter</Form.Label>
                               <Form.Control
                               type="text"
                               name="counter_name"
                             
                               defaultValue={this.props.typeofcounter}
                               placeholder="Type of Counter"
                               />
                           </Form.Group>
                           <Form.Group controlId="countername">
                            <Button variant="primary" type="submit">Update Queue</Button>
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
export default Edit_Counter;