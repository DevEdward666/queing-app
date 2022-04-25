import React,{Component} from 'react';
import '../css/card_css.css';
import {Table} from 'react-bootstrap';
import ButtonToolBar from 'react-bootstrap/ButtonToolBar';
import Button from 'react-bootstrap/Button';
import Add_counter from './Add_Counter'
import Edit_Counter from './Edit_Counter'
export class Admin extends Component{

    constructor(props){
        super(props);
      this.state={deps:[],AddModalShow:false,editModalShow:false}  
        
    }
componentDidMount(){

    this.refreshList();
}

    refreshList(){
        var url = "https://localhost:44340/api/values/getqueuemaintable";
        var bearer_token="nu9PKUxQJ6wPzhXnLz4ofDueabwQWqF-uSG9LZRcOlbZ4Pj7vBUe5ybroyouRxTaKYDxTmj22O6kmUhJ3LNhLsFW2zcoP90ejSGaW1Zl1mEA_bwmFZOQCkskyKuUvo_9kIfwkNsL0Qzod6fzR291-FseeeGDDgM5B0UiYe3g7xzAYz9SqDKTbSqvkEDVFx95xn9nhoJxws2lVhs0kT_wgAGT5jcWPD9PZDz8kbkSQIjG1B2DTh0iRtuNwQE5tDeM9b4RN6f9mi52iUUIlsJ71lqS1Parr9zJx9UT8VS-Q-CCJF3UdTBswrsAOea8im3SEFPYJrb3LDTZy5CE6Zs4kWz-yDzca2Tb4EDlWUeP2FxgeYpJi6_CcozaNW_dnu-y587cl6BB2OPd_eW_1u-MuZ82r4V2gIXmoMT0Qcq-H_Gf7AatLsWq2AgZp8FtGjUpMSyrj-QW77ZhExKStUNMON-40Eq8rHX88CA3ZY_txcpk-2S8cmTpPyqAKpZX7v0X5V57GL2vcuSp0XYlgOwV7sijZdJcx-eennK7CubqRA_ZFhiKrRoHx9d-uqC4OO9AfqJJHXEW855ahI37VuaUM9ewiiMgW3DIXC2xFv6wsaSrRzqlDD-WRyktycyU205X"
        var bearer = 'Bearer ' + bearer_token;
       fetch(url, {
          method: 'GET',
          withCredentials: true,
          headers: {
               'Authorization': bearer,
             'Content-Type': 'application/json'
         }
        })
        .then(response=>response.json())
        .then(({data}) => {
             this.setState({deps:data});
             
        })
    }
    componentDidUpdate(){

        this.refreshList();
    }
 render(){
     const {deps,queueno,countername}=this.state;
     let addModalClose=()=>this.setState({AddModalShow:false});
     let editModalClose=()=>this.setState({editModalShow:false});
     return(
         <div>
              <div className="row">
           {deps.map(card=>
     
        <div className="col-md-3">
        <a href='/'>
            <div className="content" style={{backgroundColor: 'white'}}>
            <div className="icon">
            <p style={{fontSize:35+'px'}}>Cashier</p>
            <p style={{fontSize:55+'px'}}> {card.queueno} </p>
            <p style={{fontSize:35+'px'}}>Counter 1</p>
            </div>
          </div>
          </a>
          </div>
        
            )}
              </div>
         <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>
                            Queue No
                        </th>
                        <th>
                            Counter Name
                        </th>
                        <th>
                            Counter Type
                        </th>
                        <th>
                            Status 
                        </th>
                        <th>
                            Actions 
                        </th>
                    </tr>
                </thead>
                <tbody>
                   {deps.map(dep=>
                    <tr  key ={dep.queueno}> 
                        <td>
                        {dep.queueno}
                        </td>
                        <td>
                        {dep.countername}
                        </td>
                        <td>
                        {dep.countertype}
                        </td>
                        <td>
                        {dep.status}
                        </td>
                        <td>
                      <ButtonToolBar>
                          <Button className="mr-2" variant='info'
                          onClick={()=>this.setState({editModalShow:true,queueno:dep.queueno,countername:dep.countername})}
                          >Edit</Button>
                          <Edit_Counter show={this.state.editModalShow}
                          onHide={editModalClose} queueno={queueno} countername={countername}
                          />
                      </ButtonToolBar>

                        </td>
                        </tr>
                    )}
                </tbody>
         </Table>
        
         <ButtonToolBar>
             <Button variant="primary" onClick={()=>this.setState({AddModalShow:true})}>
                    Add Counter
             </Button>
             <Add_counter show={this.state.AddModalShow} onHide={addModalClose}/>
         </ButtonToolBar>
         </div>
     )
 }
}