import React,{Component} from 'react';
import '../css/card_css.css';
export class Home extends Component{
 render(){
     return(
         <div>

        
        <div className='mt-5 d-flex justify-content-left'>
        <div className="col-md-3">
        <a href='/'>
            <div className="content" style={{backgroundColor: 'white'}}>
            <div className="icon">
            <p style={{fontSize:35+'px'}}>Cashier</p>
            <p style={{fontSize:55+'px'}}>CAS-0001 </p>
            <p style={{fontSize:35+'px'}}>Counter 1</p>
            </div>
          </div>
          </a>
          </div>
          </div>
          </div>
     )
 }
}