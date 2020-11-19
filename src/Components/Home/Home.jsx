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
        difficulty:0,


    }


    async componentDidMount(){
        console.log(this.props)
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
        let {points,difficulty}=this.state
        const payload=JSON.parse (localStorage.getItem('__userKey'))
        const token=payload.token
        const user_id=payload.id

        // points=toString(points)
        // console.log(typeof(points))
        console.log(points)
        // console.log(token)

        let data={
            points,
            difficulty
        }
        
        
        api.defaults.headers.common['Authorization'] = `Token ${token}`

        let hadPreviousPoints=false
        let points_id=0
        await api.get('rank',data)
            .then(res=>{
                const data=res.data
                let previousPoints=data.filter(e=>{
                    return e.user_id === user_id
                })

                if(previousPoints.length !== 0){
                    hadPreviousPoints = true
                    points_id=previousPoints[0].id
                }
            }).catch(err=>{
                alert("Erro")
                console.log(err.response)
            })

            if(hadPreviousPoints){
                await api.patch(`rank/${points_id}/`,data)
                    .then(res=>{
                        alert('Pontos alterados com sucesso')
                    })
                    .catch(err=>{
                        alert("Erro")
                        console.log(err.response)
                    })
            }else{ 

                data.user_id=user_id
                
                await api.post('rank/',data)
                    .then(res=>{
                        alert('Pontos incluidos com sucesso')
                    })
                    .catch(err=>{
                        alert("Erro")
                        console.log(err.response)
                    })
            }

    }

    async handleListPoints(e){
        e.preventDefault()

        await api.get('rank/')
            .then(res=>{
                console.log(res)
                let data=res.data
                let info=[]
                data=data.map(e=>{

                    let infoObj={}
                    infoObj.user_id=e.user_id
                    infoObj.points=e.points
                    infoObj.difficulty=e.difficulty
                    infoObj.data=e.data
                    info.push(infoObj)
                })
                console.log(info)
                this.setState({listPoints:info})

                let newInfo=[]
                let infoFunc=
                    info.map(async e=>{
                    let newInfoObj={}
                    await api.get(`users/${e.user_id}/`)
                        .then(user=>{
                            // console.log(user)
                            let dificuldade='Fácil'
                            if(e.difficulty===1){
                                dificuldade='Médio'
                            }
                            if(e.difficulty===2){
                                dificuldade='Díficil'
                            }
                            newInfoObj.user_id=user.data.username
                            newInfoObj.points=e.points
                            newInfoObj.difficulty=dificuldade
                            newInfoObj.data=e.data
                            newInfo.push(newInfoObj)
                            // console.log(user.data.name)
                            newInfoObj={}

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
        const {isLoggedIn, points, listPoints,difficulty } = this.state
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

         <div className='d-flex flex-column'>

                <label for='points' className='ml-3'>Dificuldade</label>
                 <input 
                 id='points'
                 onChange={e=>{
                     this.setState({difficulty:e.target.value})
                    //  console.log(points)
                 }}
                 value={difficulty}
                 />
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
            </div>
           

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
                         <li>Nome :{e.user_id}</li>
                         <li>Pontos: {e.points}</li>
                         <li>Dificuldade: {e.difficulty}</li>
                         <li>Data: {e.data}</li>
                     </ul>
                     ))}
                 </div>}
                 
                 <button
                 onClick={e=>this.props.history.push('/GamesCreated')}
                 >Ir para jogos criados</button>
                 <button
                 onClick={e=>this.props.history.push('/Challanges')}
                 >Ir para desafios</button>
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