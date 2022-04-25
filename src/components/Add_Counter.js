import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap';
export class Add_Counter extends Component{
    constructor(props){
        super(props);
    }
    handleSubmit(event){

        event.preventDefault();
        var url = "https://localhost:44340/api/values/insertnewcounter";
        var bearer_token="nu9PKUxQJ6wPzhXnLz4ofDueabwQWqF-uSG9LZRcOlbZ4Pj7vBUe5ybroyouRxTaKYDxTmj22O6kmUhJ3LNhLsFW2zcoP90ejSGaW1Zl1mEA_bwmFZOQCkskyKuUvo_9kIfwkNsL0Qzod6fzR291-FseeeGDDgM5B0UiYe3g7xzAYz9SqDKTbSqvkEDVFx95xn9nhoJxws2lVhs0kT_wgAGT5jcWPD9PZDz8kbkSQIjG1B2DTh0iRtuNwQE5tDeM9b4RN6f9mi52iUUIlsJ71lqS1Parr9zJx9UT8VS-Q-CCJF3UdTBswrsAOea8im3SEFPYJrb3LDTZy5CE6Zs4kWz-yDzca2Tb4EDlWUeP2FxgeYpJi6_CcozaNW_dnu-y587cl6BB2OPd_eW_1u-MuZ82r4V2gIXmoMT0Qcq-H_Gf7AatLsWq2AgZp8FtGjUpMSyrj-QW77ZhExKStUNMON-40Eq8rHX88CA3ZY_txcpk-2S8cmTpPyqAKpZX7v0X5V57GL2vcuSp0XYlgOwV7sijZdJcx-eennK7CubqRA_ZFhiKrRoHx9d-uqC4OO9AfqJJHXEW855ahI37VuaUM9ewiiMgW3DIXC2xFv6wsaSrRzqlDD-WRyktycyU205X"
        var bearer = 'Bearer ' + bearer_token;
       fetch(url, {
          method: 'POST',
          withCredentials: true,
          headers: {
               'Authorization': bearer,
             'Content-Type': 'application/json'
         },
         body:JSON.stringify({
            countername:event.target.counternumber.value,
            displayedto:event.target.countername.value,
            typeevent:event.target.typeofcounter.value,
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
          Add New Counter
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <div className="container">
           <Row>
               <Col sm={6}>
                   <Form onSubmit={this.handleSubmit}>
                       <Form.Group controlId="counternumber">
                           <Form.Label>Counter Number</Form.Label>
                           <Form.Control
                           type="number"
                           name="counter_name"
                           controlId="counternumber"
                           required
                           placeholder="Counter Numb"
                           />
                       </Form.Group>
                       <Form.Group controlId="countername">
                           <Form.Label>Counter Name</Form.Label>
                           <Form.Control
                           type="text"
                           name="counter_name"
                           required
                           placeholder="Counter Name"
                           />
                       </Form.Group>
                       <Form.Group controlId="typeofcounter">
                           <Form.Label>Type of Counter</Form.Label>
                           <Form.Control
                           type="text"
                           name="counter_name"
                           required
                           placeholder="Type of Counter"
                           />
                       </Form.Group>
                       <Form.Group controlId="countername">
                        <Button variant="primary" type="submit">Add Counter</Button>
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
export default Add_Counter;