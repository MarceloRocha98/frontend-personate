import React from 'react'
import Nav from '../templates/Nav'
import { Link} from 'react-router-dom'

import api from '../../services/api'

export default class Register extends React.Component{
    state={
        email:'',
        name:'',
        password1:'',
        password2:'',
    }

    // componentDidMount(){
    //     console.log(this)
    // }

    async handleSignin(e){
        e.preventDefault()

        const {email,name,password1,password2 } = this.state
        const data={
            email,
            username:name,
            password1,
            password2,
        }

        
        // console.log(email,name,password1,password2)
        await api.post('rest_auth/registration/',data)
            .then(res=>{
                alert('Conta criada com sucesso!')

                this.props.history.push('/Signin')
                // this.setState({email:''})
                // this.setState({name:''})
                // this.setState({password:''})
            }).catch(err=>{
                console.log(err.response)
               if(err.response.data.email){
                   alert(`Email : ${err.response.data.email[0]}`)
               }

               if(err.response.data.username){
                   alert(`Nome : ${err.response.data.username[0]}`)
               }

               if(err.response.data.password1){
                   alert(`Senha : ${err.response.data.password1[0]}`)
               }

               if(err.response.data.password2){
                   alert(`Confirmação de senha : ${err.response.data.password2[0]}`)
               }
               if(err.request.status===500){ //obs: por algum motivo, a api do django da um erro interno ao cadastrar o usuario, mas o cadastra com sucesso
                alert('Conta criada com sucesso!')

                this.props.history.push('/Signin')
               }
     
             
            })
        







    }

    render(){
        const {email,name,password1,password2 } =this.state


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
                            <label for='password1'>Senha</label>
                        </div>
                <input
                    type='password'
                    placeholder='Digite a sua senha'
                    value={password1}
                    onChange={e => this.setState({password1:e.target.value})}
                    id='password1'
                    className='form-control form-control-lg'
                    />

                </div>       

                    <div className="form-group">
                        <div className='d-flex'>

                            <span class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span>
                            <label for='password2'>Confirme a senha</label>
                        </div>
                <input
                    type='password'
                    placeholder='Digite a sua senha'
                    value={password2}
                    onChange={e => this.setState({password2:e.target.value})}
                    id='password2'
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