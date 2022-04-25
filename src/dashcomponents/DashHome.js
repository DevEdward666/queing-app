import React,{Component} from 'react';
import '../css/card_css.css';
import img from '../images/browser.png'
import {Modal, Button, Row, Col, Form, FormGroup} from 'react-bootstrap';
import ButtonToolBar from 'react-bootstrap/ButtonToolBar';
export class DashHome extends Component{
  _isMounted = false;
    constructor(props){
        super(props);
        var color = "";
        var coral = "rgb(255,127,80)";
        var tomato = "rgb(255,99,71)";  
        var orangered = "rgb(255,69,0)";
        var gold = "rgb(255,215,0)";
        var orange = "rgb(255,165,0)";
        var darkorange = "rgb(255,140,0)";
        var crimson = "rgb(220,20,60)";
        var red = "rgb(255,0,0)";
        var deeppink = "rgb(255,20,147)";
        var palevioletred = "rgb(219,112,147)";
        var mediumvioletred = "rgb(199,21,133)";
        var mediumslateblue = "rgb(123,104,238)";
        var slateblue = "rgb(106,90,205)";
        var blueviolet = "rgb(138,43,226)";
        var dodgerblue = "rgb(30,144,255)";
        var cornflowerblue = "rgb(100,149,237)";
        var mediumturquoise = "rgb(72,209,204)";
        var darkturquoise = "rgb(0,206,209)";
        var lightseagreen = "rgb(32,178,170)";
        var cadetblue = "rgb(95,158,160)";
        var darkcyan = "rgb(0,139,139)";
        var darkgray = "rgb(169,169,169)";
        var gray = "rgb(128,128,128)";
        var dimgray = "rgb(105,105,105)";
        var seagreen = "rgb(46,139,87)";
        var olive = "rgb(128,128,0)";
        var olivedrab = "rgb(107,142,35)";
        var lime = "rgb(164,196,0)";
        var green = "rgb(96,169,23)";
        var emerald = "rgb(0,138,0)";
        var teal = "rgb(0,171,169)";
        var cyan = "rgb(27,161,226)";
        var cobalt = "rgb(0,80,239)";
        var indigo = "rgb(106,0,255)";
        var violet = "rgb(170,0,255)";
        var pink = "rgb(244,114,208)";
        var magenta = "rgb(216,0,115)";
        var crimson = "rgb(162,0,37)";
        var red = "rgb(229,20,0)";
        var orange = "rgb(250,104,0)";
        var amber = "rgb(240,163,10)";
        var yellow = "rgb(227,200,0)";
        var brown = "rgb(130,90,44)";
        var olive = "rgb(109,135,100)";
        var steel = "rgb(100,118,135)";
        var mauve = "rgb(118,96,138)";
        var taupe = "rgb(135,121,78)";
      this.state={deps:[],
      bgColor: [lime,green, emerald, teal,cyan,cobalt,indigo,violet, pink, magenta,crimson,red,orange, amber, yellow,brown,olive,steel,mauve,taupe,olivedrab,seagreen,dimgray,gray,darkgray,darkcyan,cadetblue,lightseagreen,darkturquoise,mediumturquoise,cornflowerblue,dodgerblue,blueviolet,slateblue,mediumslateblue,mediumvioletred,palevioletred,deeppink,darkorange,gold,orangered,tomato,coral],
      selectedColor: '',
  }
  
    }
    componentDidMount(){
      this._isMounted = true;
      this.refreshList()
      this._getRandomColor()
    }
    componentWillUnmount() {
      // fix Warning: Can't perform a React state update on an unmounted component
      this.setState = (state,callback)=>{
          return;
      };
  }
    componentDidUpdate(){
      this.refreshList()
    }
   
    refreshList(){
      var url = "https://localhost:44340/api/pages/getallPages";
     fetch(url)
      .then(response=>response.json())
      .then(({data}) => {
           this.setState({deps:data});
          
      })
  }
  _getRandomColor(){
    var len =this.state.bgColor.length;
    var randomNum=Math.floor(Math.random()*len);
    var color = this.state.bgColor[randomNum];
 //   var item = this.state.bgColor[Math.floor(Math.random()*this.state.bgColor.length)];
 //this.colors.splice( 1,randomNum);
    this.setState({
      selectedColor: color,
    })
    }
 
 render(){
 
 
  const {deps}=this.state;
     return(
      <div className="container">
      <div className="row">
      {deps.map(card=>
      
          <div className="col-md-3 card" key={card.id}>
          <a href={card.url}>
            <div className="content" style={{backgroundColor: this.state.selectedColor}}>
          <div className="icon">
          <img alt="" style={{objectFit:"contain"}} height="100%" width="100%" src={require("../images/"+ card.scheme )}/>
       
          </div>
       <div className="title">{card.name}</div>
          </div>
          </a>
          </div>
    // <div className="col-md-3" key={card.id}>
    // <a href={card.url}>
    //     <div className={"content" + this.color} style={{backgroundColor: this.state.selectedColor}}>
    //     <div className="icon">
    //     <p style={{fontSize:15+'px'}}>{card.name}</p>
    //     <img height="70" width="70" src={img}/>
    //     <p style={{fontSize:15+'px'}}>Visit Page</p>
    //     </div>
    //   </div>
    //   </a>
    //   </div>
    
       )}
         </div>
         </div>

     )
 }
}
export default DashHome;