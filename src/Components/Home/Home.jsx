import React from 'react'
import {Link } from 'react-router-dom'
import api from '../../services/api'

import Nav from '../templates/Nav'
export default class Home extends React.Component{
    state={
        isLoggedIn:false,

        //// states testes abaixo

        points:0,
        listPoints:[],


    }


    async componentDidMount(){

        const payload=JSON.parse(localStorage.getItem('__userKey'))

        // console.log(payload.token)
        let token=''
        if(payload){
             token=payload.token
        }
        if(token !== ''){
            this.setState({isLoggedIn:true})
        }else{
            this.setState({isLoggedIn:false})
        }
    }

    async handlePoints(e){
        e.preventDefault()
        let {points}=this.state
        const payload=JSON.parse (localStorage.getItem('__userKey'))
        const token=payload.token
        // points=toString(points)
        // console.log(typeof(points))
        console.log(points)
        // console.log(token)

        const data={
            status_text:points
        }
        
        
        api.defaults.headers.common['Authorization'] = `Token ${token}`
        await api.post('http://localhost:8080/api/feed/',data)
            .then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })

    }

    async handleListPoints(e){
        e.preventDefault()

        await api.get('http://localhost:8080/api/feed/')
            .then(res=>{
                console.log(res)
                let data=res.data
                let info=[]
                data=data.map(e=>{

                    let infoObj={}
                    infoObj.user_profile=e.user_profile
                    infoObj.status_text=e.status_text
                    infoObj.created_on=e.created_on
                    info.push(infoObj)
                })
                console.log(info)
                this.setState({listPoints:info})

                let newInfo=[]
                let infoFunc=
                    info.map(async e=>{
                    let newInfoObj={}
                    await api.get(`http://localhost:8080/api/profile/${e.user_profile}`)
                        .then(user=>{
                            newInfoObj.user_profile=user.data.name
                            newInfoObj.status_text=e.status_text
                            newInfoObj.created_on=e.created_on
                            newInfo.push(newInfoObj)
                            // console.log(user.data.name)

                        })
                    })
                    // console.log(newInfo)
                
                let promise = new Promise(function (resolve, reject) {
                    // the function is executed automatically when the promise is constructed
              
                    // after 1 second signal that the job is done with the result "done"
                    setTimeout(() => resolve("done"), 2000);
                });
                Promise.all([infoFunc, promise]).then((e) => {  // pra resolver o problema do tempo
                  console.log(newInfo)
                  this.setState({ listPoints:newInfo})    
                //   console.log(test)
                })

            }).catch(err=>{
                console.log(err)
            })
    }

    render(){
        const {isLoggedIn, points, listPoints } = this.state
        // console.log(this.props)

        return(
            <div
          
            >
              <Nav isLoggedIn={isLoggedIn} history={this.props.history} />
              <div className='mt-3 pt-2 d-flex'>
                 {!!isLoggedIn ? <div
                  style={{
                    width:'100%',
                    height:"100%"
                }}
                 >Logado !!!!

                 Somente testes abaixo !!!

                <label for='points' className='ml-3'>Alterar pontuação</label>
                 <input 
                 id='points'
                 onChange={e=>{
                     this.setState({points:e.target.value})
                    //  console.log(points)
                 }}
                 value={points}
                 />
                 <button
                 onClick={e=>{
                     this.handlePoints(e)
                 }}
                 >Enviar</button>

                <label for='list' className='ml-3'>Listar pontuações</label>
                
                 <button
                 onClick={e=>{
                     this.handleListPoints(e)
                 }}
                 >Listar</button>

                 {listPoints.length !== 0 && 
                 
                 <div>
                     {listPoints.map(e=>(

                     <ul>
                         <li>Nome :{e.user_profile}</li>
                         <li>Pontos: {e.status_text}</li>
                         <li>Data: {e.created_on}</li>
                     </ul>
                     ))}
                 </div>}
                 
                 
                 </div>:
                 
                 <div 
                 style={{
                     width:'100%',
                     height:"100%"
                 }}
                 className='d-flex flex-column m-3'
                 >
                     
                     <h2 className='text-center font-weight-bold'> Bem vindo ao Personate</h2>
                     <h3 className='text-muted text-center m-3'> Para uma melhor experiencia, cadastre-se para jogar</h3>

<div
className='conteiner-home form-conteiner'
style={{
    border:"solid 5px",
    alignSelf:"center",
    padding:'25px'
    
}}
>


<div className="d-flex "

>

                     <Link to='/Signin'>

                   <h4 
                   className='text-left'
                   style={{
                       color:"white"
                   }}
                   ><i class="fa fa-fire mr-1" style={{color:"red"}} aria-hidden="true"></i>Jogar como usuario cadastrado</h4>
                     </Link>
</div>

                   <p className='font-weight-bold ml-5 pl-3'  
                    style={{
                       color:"white"
                   }}>Ou</p>
<div className='d-flex'>

                   <Link to=''>

                   <h4
                    className='text-left '
                    style={{
                        color:"white"
                    }}
                    ><i class="fa fa-fire mr-1" style={{color:"red"}} aria-hidden="true"></i>Jogar como visitante </h4>
                   </Link>
</div>
                </div>
                 </div>}
              </div>
         
            </div>
        )
    }
}