import React from 'react'
import {Nav,Navbar} from 'react-bootstrap'
import {Link,useHistory } from 'react-router-dom'
import api from '../../services/api';
import '../../css/styles.css'
export default class Navigation extends React.Component{
    state={
        name:'',
    }

    componentDidMount(){

        const payload =JSON.parse(localStorage.getItem('__userKey'))
        if(payload){
        //    console.log(payload.name)
        let name=payload.name
        this.setState({name})
        }

    }

    render(){
        // console.log(this)
        const { name } = this.state

        return(
            <div className='m-4 pb-3'>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed='top'>
            {name!==''?  <Navbar.Brand href="#home"><p className='d-flex flex-row logotipo'>Personate {name} </p> </Navbar.Brand>: <Navbar.Brand href="#home" className='logotipo'>Personate </Navbar.Brand>}
             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
             <Navbar.Collapse id="responsive-navbar-nav">
                 <Nav className="mr-auto ml-2">
                     
                    {name !=='' && <div className='d-flex navitems'>
                     <Nav.Link href="#Rank">Rank</Nav.Link>
                    <Nav.Link href="#GamesCreated">Jogos Criados</Nav.Link>
                     <Nav.Link href="#Challanges">Desafios</Nav.Link>
                        </div>}
                 </Nav>
                 <Nav>

                 </Nav>
                 {!!this.props.isLoggedIn? 
                  <div>

                  <button type='button'
                      style={{
                          width:'100%',
                          borderRadius:'25px',
                          padding:'16px',
                         //  margin:'3px'
                          
                      }}
                      onClick={async e=>{
                          const payload=JSON.parse(localStorage.getItem('__userKey'))
                          const token=payload.token
                          await api.get('rest_auth/logout/')
                            .then(res=>{
                                localStorage.removeItem('__userKey')
                                this.props.history.push('/Signin') 
                            }).catch(err=>{
                                console.log(err.response.data)
                            })
        
                      }}
                  className='btn btn-danger'
                  
                  ><i class="fa fa-sign-out mr-1" aria-hidden="true"></i>Deslogar</button>
                  </div>:
                   <Link to='signin'>

                   <button type='button'
                       style={{
                           width:'100%',
                           borderRadius:'25px',
                           padding:'16px',
                          //  margin:'3px'
                           
                       }}
                       onClick={e=>{
                          //  this.handleLogin()
                       }}
                   className='btn btn-danger'
                   
                   ><i class="fa fa-sign-out mr-1" aria-hidden="true"></i>Entrar</button>
                   </Link>
                 
                 }
              
            
             </Navbar.Collapse>
         </Navbar>
     
      
         </div>
        )
    }
}