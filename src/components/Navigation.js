import React, { Component } from 'react';
import {NavLink,Link} from 'react-router-dom';
import NavBar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import {Form} from 'react-bootstrap';
import PhotoContainer from '../dashcomponents/PhotoContainer';
export class Navigation extends Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.state={user:'',info:[],hospdefaults:[],logo:""};
      
    }

    componentDidMount(){

        this.getinfo();
        this.getdefaults();
        this.getlogo();
    }
    getlogo(){
      var auth=this.token=window.localStorage.getItem("tokenizer");
     
      var url = "https://localhost:44340/api/pages/db_get_hosp_logo";
      var bearer_token=auth;
      var bearer = 'Bearer '  + bearer_token;
      fetch(url, {
      method: 'GET',
      withCredentials: true,
      headers: {
       'Authorization': bearer,
       'Content-Type': 'application/json'
      },
 
    })
      .then(response=>response.json())
      .then(({data}) => {
       console.log({logo:data})
        this.setState({logo:data});

    },(error)=>{
       
    })
    }

    getdefaults(){
      var auth=this.token=window.localStorage.getItem("tokenizer");
     
      var url = "https://localhost:44340/api/pages/getdefname";
      var bearer_token=auth;
      var bearer = 'Bearer '  + bearer_token;
  fetch(url, {
  method: 'GET',
  withCredentials: true,
  headers: {
       'Authorization': bearer,
     'Content-Type': 'application/json'
 },
 
})
.then(response=>response.json())
.then(({data}) => {
  this.setState({hospdefaults:data});

},(error)=>{
 
}
)
}
       getinfo(){
            var user=this.user=window.localStorage.getItem("username");
            var auth=this.token=window.localStorage.getItem("tokenizer");
           
            var url = "https://localhost:44340/api/values/dbgetactiveuser?id="+user;
            var bearer_token=auth;
            var bearer = 'Bearer '  + bearer_token;
        fetch(url, {
        method: 'POST',
        withCredentials: true,
        headers: {
             'Authorization': bearer,
           'Content-Type': 'application/json'
       },
       
      })
      .then(response=>response.json())
      .then(({data}) => {
     
        if(this.state.info  && this.state.info.length){
            this.state.info.push({'firstname':'Guest'});
            this.setState({info: this.state.info});
            
      } else{
        this.setState({info:data});

      }
      },(error)=>{
       
      }
      )
}
    logout(){
        
     window.localStorage.removeItem("tokenizer");
     window.localStorage.removeItem("username");

    }
   
    render(){
        const {info,hospdefaults,logo}=this.state;
        if (info) {
        return(
<NavBar bg="light" expand="lg">
  <NavBar.Brand href="/"><img src={logo} height="60px" widht="60px"/></NavBar.Brand>

  <NavBar.Toggle aria-controls="basic-navbar-nav" />
  <NavBar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/Admin">Admin</Nav.Link>
      {hospdefaults.map(def=>
      <div style={{marginLeft:255+"px"}}>
          <Nav.Link>
               {def.hospname}
          </Nav.Link>
          </div>
          )}
   
    </Nav>
    {info.map(infos=>
    <Form inline  key="">
    <Nav>
        
  
      <Nav.Link>
   Welcome : {infos.firstname}
        
      </Nav.Link>
        </Nav>
     
    </Form>
    
    )}
  <Button variant="outline-info"  onClick={this.logout}>Logout</Button>
  </NavBar.Collapse>
</NavBar>

            // <NavBar bg='light' expand='lg'>
            //     <NavBar.Toggle aria-controls="basic-navbar-nav"/>
            //     <NavBar.Collapse id='basic-navbar-nav'>
            //         <Nav>
            //             <NavLink className="d-inline p-2 bg-dark text-white"
            //             to="/">Home</NavLink>
            //             <NavLink className="d-inline p-2 bg-dark text-white"
            //             to="/Generator">Generator</NavLink>
            //             <NavLink className="d-inline p-2 bg-dark text-white"
            //             to="/Admin">Admin</NavLink>
            //         </Nav>
                    
            //         <Button  onClick={this.logout} size="large"  type="submit">
            //              Logout
            //         </Button>
            //     </NavBar.Collapse>
            // </NavBar>
        )
        }else{
            return(
                <NavBar bg="light" expand="lg">
                  <NavBar.Brand href="/">Pages Dashboard</NavBar.Brand>
                  <NavBar.Toggle aria-controls="basic-navbar-nav" />
                  <NavBar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                      <Nav.Link href="/">Home</Nav.Link>
                      
                    </Nav>
                   
                    <Form inline  key="">
                    <Nav>
                        
                  
                      <Nav.Link>
                   
              
                        
                      </Nav.Link>
                        </Nav>
                     
                    </Form>
                    <Link to="/Login">
                  <Button variant="outline-info">Login</Button>
                  </Link>
                  </NavBar.Collapse>
                </NavBar>
                
                            // <NavBar bg='light' expand='lg'>
                            //     <NavBar.Toggle aria-controls="basic-navbar-nav"/>
                            //     <NavBar.Collapse id='basic-navbar-nav'>
                            //         <Nav>
                            //             <NavLink className="d-inline p-2 bg-dark text-white"
                            //             to="/">Home</NavLink>
                            //             <NavLink className="d-inline p-2 bg-dark text-white"
                            //             to="/Generator">Generator</NavLink>
                            //             <NavLink className="d-inline p-2 bg-dark text-white"
                            //             to="/Admin">Admin</NavLink>
                            //         </Nav>
                                    
                            //         <Button  onClick={this.logout} size="large"  type="submit">
                            //              Logout
                            //         </Button>
                            //     </NavBar.Collapse>
                            // </NavBar>
                        )


        }
    }
}
export default Navigation;