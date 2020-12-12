import React,{useState} from 'react'
import {Link,useHistory } from 'react-router-dom'

import Nav from '../templates/Nav'
import './Signin.css'
import api from '../../services/api'

export default function Signin(){

    const [email,setEmail]=useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const history=useHistory()


    async function handleSignin(e){
        e.preventDefault()


        const data={
            email,
            username,
            password,
        }

       


        await api.post('rest_auth/login/',data)
            .then(async res=>{
                console.log(res.data)
                const token= res.data.key

                if(!!token){
                    api.defaults.headers.common['Authorization'] = `Token ${token}`
                }
         

                await api.get('users')
                    .then(resp=>{
                        console.log(resp)
                        const users=resp.data
                        let user=users.filter(e=>{
                            return e.email === email
                        })
                        user=user[0]
                        console.log(user)
                        const name=user.username
                        const id=user.id
                        console.log(name)

                        const payload={
                            id,
                            email,
                            name,
                            token,
                        }
                        
                        localStorage.setItem('__userKey',JSON.stringify(payload))
                        // obs: Authorization na forma : Token {token}
                        // alert('Logado com sucesso !')
                        history.push('/')
                    })

            })
            .catch(err=>{

                console.log(err.response)
                alert('Usuario e/ou senha errados')
            })
    }


    

       


        return(
            <div>

           
<Nav />
            <div className='d-flex justify-content-center'>
                
      
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
                            <form onSubmit={e=>{handleSignin(e)}} >           
                    <div className="form-group">
                        <div className='d-flex'>

                            <span class="input-group-addon"><i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i></span>
                            <label for='email'>Email</label>
                        </div>
                        <input placeholder='Digite seu email'
                            name='email'
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id='email'
                            className='form-control form-control-lg'
                        />
                    </div>

                    <div className="form-group">
                        <div className='d-flex'>

                        <span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span>
                            <label for='email'>Nome</label>
                        </div>
                        <input placeholder='Digite seu nome'
                            name='username'
                            type='text'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            id='email'
                            className='form-control form-control-lg'
                        />
                    </div>

                    <div className="form-group">
                        <div className='d-flex'>

                            <span class="input-group-addon"><i class="fa fa-key fa-fw" aria-hidden="true"></i></span>
                            <label for='password'>Senha</label>
                        </div>
                <input
                    name='password'
                    type='password'
                    placeholder='Digite a sua senha'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    id='password'
                    className='form-control form-control-lg'
                    />

                </div>       

                <button className="btn btn-danger ml-3" type='submit'>Entrar</button>
            </form>

            <div className='d-flex'>
           <p>Não tem conta ? </p>
                <Link to='/Register'>
                    <p className='ml-2'> Cadastre-se</p>
                </Link>
            </div>
         </div>

            </div>

            </div>
        )
    
}