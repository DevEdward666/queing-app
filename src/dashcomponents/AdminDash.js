import React,{Component} from 'react';
import '../css/card_css.css';
import img from '../images/browser.png'
import AddPage from './AddPage'
import EditPage from './EditPage'
import ButtonToolBar from 'react-bootstrap/ButtonToolBar';
import Button from 'react-bootstrap/Button';
export class AdminDash extends Component{
  _isMounted = false;
    constructor(props){
        super(props);
      this.state={deps:[],AddModalShow:false,
      bgColor: [
     "rgb(255,127,80)",
       "rgb(255,99,71)", 
      "rgb(255,69,0)",
      "rgb(255,215,0)",
     "rgb(255,165,0)",
      "rgb(255,140,0)",
    "rgb(220,20,60)",
     "rgb(255,0,0)",
     "rgb(255,20,147)",
      "rgb(219,112,147)",
      "rgb(199,21,133)",
      "rgb(123,104,238)",
     "rgb(106,90,205)",
      "rgb(138,43,226)",
      "rgb(30,144,255)",
     "rgb(100,149,237)",
     "rgb(72,209,204)",
      "rgb(0,206,209)",
     "rgb(32,178,170)",
     "rgb(95,158,160)",
      "rgb(0,139,139)",
     "rgb(169,169,169)",
      "rgb(128,128,128)",
      "rgb(105,105,105)",
     "rgb(46,139,87)",
     "rgb(128,128,0)",
    "rgb(107,142,35)",
     "rgb(164,196,0)",
      "rgb(96,169,23)",
     "rgb(0,138,0)",
    "rgb(0,171,169)",
     "rgb(27,161,226)",
     "rgb(0,80,239)",
      "rgb(106,0,255)",
    "rgb(170,0,255)",
     "rgb(244,114,208)",
      "rgb(216,0,115)",
    "rgb(162,0,37)",
      "rgb(229,20,0)",
     "rgb(250,104,0)",
      "rgb(240,163,10)",
     "rgb(227,200,0)",
     "rgb(130,90,44)",
     "rgb(109,135,100)",
     "rgb(100,118,135)",
     "rgb(118,96,138)",
     "rgb(135,121,78)",
      ],
      selectedColor: '',
       token:''
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
        var auth=this.token=window.localStorage.getItem("tokenizer");
        if(!this.token){
            this.props.history.push("./Login");
        }
      var url = "https://localhost:44340/api/pages/getallPages";
  
      var bearer_token=auth;
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
  _getRandomColor(){
    var len =this.state.bgColor.length;
    var randomNum=Math.floor(Math.random()*len);
    var color = this.state.bgColor[randomNum];
    //alert(color)
    //this.color.splice(randomNum,1);
   
 //   var item = this.state.bgColor[Math.floor(Math.random()*this.state.bgColor.length)];

    this.setState({
      
      selectedColor: color,
   
    })
    
    }

 render(){
  let getColour = () => this.state.bgColor[Math.floor(Math.random() * this.state.bgColor.length)];

  const {deps,bgColor,id,pagename,pageurl,pageactivated}=this.state;
  
  let addModalClose=()=>this.setState({AddModalShow:false});
  let editModalClose=()=>this.setState({editModalShow:false});
 
     return(
       
        <div>
           
        <div className=' mt-3 d-flex justify-content-left'>
        <ButtonToolBar>
        <Button variant="primary" onClick={()=>this.setState({AddModalShow:true})}>
               Add Page
        </Button>
        <AddPage show={this.state.AddModalShow} onHide={addModalClose}/>
        </ButtonToolBar>
    
        </div>  
      <div className="row">
     
           
          {deps.map(card=>
    
 
           
          <div className="col-md-2 card" key={card.id}>
          <a href={card.url}>
     
            <div className="content" style={{backgroundColor: this.state.selectedColor}}>
           
          <div className="icon">
          <img height="70" width="70" src={img}/>
          </div>
       <div className="title">{card.name}</div>
          </div>
          </a>
      
          <ButtonToolBar>
                          <Button size="lg" block variant='info'
                          onClick={()=>this.setState({editModalShow:true,id:card.id,pagename:card.name,pageurl:card.url,pageactivated:card.isActive})}
                          >Edit</Button>
                          <EditPage show={this.state.editModalShow}
                          onHide={editModalClose} id={id} pagename={pagename} pageurl={pageurl} pageactivated={pageactivated}
                          />
                      </ButtonToolBar>
              
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
export default AdminDash;