import React from 'react'
import Nav from '../templates/Nav'
import { Link} from 'react-router-dom'

import api from '../../services/api'

export default class Register extends React.Component{
    state={
        email:'',
        name:'',
        password:'',
    }


    async handleSignin(e){
        e.preventDefault()

        const {email,name,password } = this.state
        const data={
            email,
            name,
            password,
        }

        
        // console.log(email,name,password)
        await api.post('http://localhost:8080/api/profile/',data)
            .then(res=>{
                alert('Conta criada com sucesso!')
                this.setState({email:''})
                this.setState({name:''})
                this.setState({password:''})
            }).catch(err=>{
                console.log(err)
            })
        







    }

    render(){
        const {email,name,password } =this.state


        return(
            <div>
                <Nav />

                <div className='form-conteiner m-5'
        style={{
            border:"solid 1px",
            padding:'10px',
            borderRadius:"10px",
            // borderColor:"blue",
            // backgroundColor:"#F45B69",
            color:"white"
        }}
        >
                            <form onSubmit={e=>this.handleSignin(e)} >           
                    <div className="form-group">
                        <div className='d-flex'>

                            <span class="input-group-addon"><i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i></span>
                            <label for='email'>Email</label>
                        </div>
                        <input placeholder='Digite seu email'
                            type='email'
                            value={email}
                            onChange={e => this.setState({email:e.target.value})}
                            id='email'
                            className='form-control form-control-lg'
                        />
                    </div>
                    <div className="form-group">
                        <div className='d-flex'>

                            <span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span>
                            <label for='name'>Nome</label>
                        </div>
                        <input placeholder='Digite seu nome de usuario'
                            type='text'
                            value={name}
                            onChange={e => this.setState({name:e.target.value})}
                            id='name'
                            className='form-control form-control-lg'
                        />
                    </div>

                    <div className="form-group">
                        <div className='d-flex'>

                            <span class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span>
                            <label for='password'>Senha</label>
                        </div>
                <input
                    type='password'
                    placeholder='Digite a sua senha'
                    value={password}
                    onChange={e => this.setState({password:e.target.value})}
                    id='password'
                    className='form-control form-control-lg'
                    />

                </div>       

                <button className="btn btn-danger ml-3" type='submit'>Cadastrar</button>
            </form>

        
         </div>

            </div>
            
        )
    }
}