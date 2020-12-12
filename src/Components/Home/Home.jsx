import React from 'react'
import {Link } from 'react-router-dom'
import api from '../../services/api'
import {Dropdown} from 'react-bootstrap'
import Nav from '../templates/Nav'
import Game from '../Game'
import Signin from '../Signin/Signin'
import trofeu from '../../assets/copo.png'


export default class Home extends React.Component{
    state={
        isLoggedIn:false,

        //// states testes abaixo
        loading: true,
        points:0,
        listPoints:[],
        difficulty:0,
        finish:false,
        play:false,
        sortedGames:[],
        listPoints:[],
        rank:[],



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
            this.setState({loading:false})
            this.setState({isLoggedIn:false})
        }

        api.defaults.headers.common['Authorization'] = `Token ${token}`

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
                            dificuldade='Difícil'
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
            // console.log(this.state.listPoints)



            // classificação dos 3 primeiros:
                let hardMode=[]
                let mediumMode=[]
                let easyMode=[]
                let rank=[]
                let rankParcial=[]
                let rankUsersId=[]
                let maior=0

                hardMode=newInfo.filter(em=> em.difficulty==="Difícil")
            

                if(hardMode.length !== 0){
                  
                    let i=0
                    if(hardMode.length >=3){

                        let i=0
                        let ids=[]
                        while(rank.length<3){
                            i+=1
                           
                            hardMode.map(async e=>{
                                
                                if(e.points>maior && ids.indexOf(e.id)===-1){
                                    maior=e.points
                                    rankParcial.push({user_id:e.user_id,points:maior})
                                    console.log(rankParcial)
                                    ids.push(e.id)
                                }
                            })
                            
                            if(rank.length===0 && i==1){
                                console.log(rankParcial)
                                console.log(rankParcial[rankParcial.length-1])
                                let lastId=ids[ids.length-1]
                                ids=[]
                                ids.push(lastId)
                                maior=-1
                                rank.push(rankParcial[rankParcial.length-1])
                                console.log(ids)
                                   
                             
                            }
                            if(rank.length===1 && i==2){
                                
                                    let firstId=ids[0]
                                    let lastId=ids[ids.length-1]
                                    maior=-1
                                    ids=[]
                                    ids.push(firstId)
                                    ids.push(lastId)
                                    rank.push(rankParcial[rankParcial.length-1])
                                    console.log(ids)
                                    console.log(rankParcial)
                                    console.log(rankParcial[rankParcial.length-1])
                                
                            }
                            if(rank.length===2 && i==3){
                                    console.log(rankParcial)
                                    console.log(rankParcial[rankParcial.length-1])
                                    rank.push(rankParcial[rankParcial.length-1])
                                    this.setState({rank})
                               
                            }

                        }
    
                    }
                   
             
                   this.setState({rank:rank})
                    this.setState({loading:true})
                    console.log(rank)
           
                  
                        let val0=rank[0]
                        let val1=rank[1]
                        let val2=rank[2]

                        if(rank[1].chal_win>rank[0].points){
                            rank[0]=val1
                            rank[1]=val0

                            if(rank[1].points<rank[2].points){
                                rank[2]=val0
                                rank[1]=val2
                            }

                            if(rank[1].points>rank[0].points){
                                rank[0]=val2
                                rank[1]=val1
                            }
                        }else{
                            if(rank[2].points>rank[1].points){
                                rank[1]=val2
                                rank[2]=val1
                            }

                            if(rank[1].points>rank[0].points){
                                rank[0]=val2
                                rank[1]=val0
                            }
                        }
        
                        this.setState({rank:rank,loading:false})
                        console.log(rank)
                
                  



                }
            })

        }).catch(err=>{
            console.log(err)
        })


        //// colocar usuario em person assim q ele entrar pela primeira vez

        if(token !==''){
            await api.get(`person/`)
                .then(async res=>{
        
                    let data=res.data
                    let isOnPerson='2'
                     data.filter(e=>{
                        if(e.user_id === payload.id){
                           isOnPerson='1'
                            
                        }
                    })
                  if(isOnPerson==='2'){
                    await api.post('person/',{user_id:payload.id}).catch(err=>console.log(err.response.data))
                  }


                    

                }).catch(err=>console.log(err.response.data))
        }
        
    }

   
   
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }

    async handlePlay(difficulty){
        const payload=JSON.parse(localStorage.getItem('__userKey'))
        const token=payload.token
        api.defaults.headers.common['Authorization'] = `Token ${token}`

        // let data=[]
        await api.get("system_images/")
            .then(res=>{
                // console.log(res.data)
            
                let data= res.data
                let values=[]
                let sortedGames=[]

                if(difficulty === 0){
                    data=data.filter(data=> data.difficulty === 0)
                    const count=data.length
                    while(values.length <3){
                        let val=this.getRandomInt(0,count)
                        if(values.indexOf(val) === -1){
                            values.push(val)
                    }
                    }
                    console.log(values)
                //    let func= values.map(val=>{
                //         sortedGames.push(data[val])
                //     })
                 
                //     let promise = new Promise(function (resolve, reject) {
                //         // the function is executed automatically when the promise is constructed
                  
                //         // after 1 second signal that the job is done with the result "done"
                //         setTimeout(() => resolve("done"), 2000);
                //     });
                //     Promise.all([func, promise]).then((e) => {  // pra resolver o problema do tempo
                    
        
                //         this.setState({sortedGames})
                //         console.log(sortedGames)
                //     })
                }
                if(difficulty === 1){
                    data=data.filter(data=> data.difficulty === 1)
                    const count=data.length
                    console.log(data)
                    while(values.length <3){
                        let val=this.getRandomInt(0,count)
                        if(values.indexOf(val) === -1){
                            console.log(val)
                            values.push(val)
                    }
                }
                
    
                }
                if(difficulty === 2){
                    data=data.filter(data=> data.difficulty === 2)
                    const count=data.length
                    while(values.length <3){
                        let val=this.getRandomInt(0,count)
                        if(values.indexOf(val) === -1){
                            values.push(val)
                    }
                    }
                }
                console.log(values)
                values.map(val=>{
                    sortedGames.push(data[val])
                })
                this.setState({sortedGames})
                console.log(sortedGames)
                
            })
    }

    render(){
        const {loading,isLoggedIn, points, listPoints,difficulty, sortedGames,rank } = this.state
        // console.log(this.props)
        if (loading) {
            return (
              <div className='m-3 p-3 d-flex flex-column'>
      
      
              <h1 className='text-center font-weight-bold'>Carregando
              </h1>
                <h5 style={{color:"white"}} className='text-center font-weight-bold'>Um momento, estamos preparando tudo para você</h5>
                <p  style={{color:"white"}} className='text-muted text-center'> Caso esteja nessa página há muito tempo, tente atualiza-la</p>
                <i class="fa fa-spinner fa-spin fa-3x fa-fw align-self-center m-3" style={{fontSize:'300px'}}></i>
                <span class="sr-only">Loading...</span>
      
              </div>
      
            )
          }

        return(
            <div className=''
            // d-flex justify-content-center
            >
              <Nav isLoggedIn={isLoggedIn} history={this.props.history} />
              <div className='mt-3 pt-2 d-flex mb-3'>
                 {!!isLoggedIn ? <div
                  style={{
                    width:'100%',
                    height:"100%"
                }}
                 >

         

              


{this.state.play === false &&
    <div className=' d-flex flex-column ajuste mt-5 m-2'>
        <div className='align-self-center mb-4'>
        {rank.length !== 0 && 
        <div>  
            <ol>
              <img src={trofeu} alt="trofeu" style={{width:'200px'}}/>
          {rank.map(e=>(
                  <li className='logotipo text-center' style={{color:"white"}}>{e.user_id} com  {e.points} pontos</li>
                
                  ))}    
                 
             </ol>
        </div>}
        </div>
    <div className='d-flex m-2 flex-column justify-content-center align-items-center'>
    <h1 className='text-center font-weight-bold mb-5'>Desafie o sistema !</h1>
<Dropdown>
  <Dropdown.Toggle variant="danger" id="dropdown-basic">
    {difficulty===0 && <div><i class="fa fa-fire mr-1" style={{color:"white"}} aria-hidden="true"></i>Fácil </div>}
    {difficulty===1 && <div><i class="fa fa-fire mr-1" style={{color:"white"}} aria-hidden="true"></i>Médio </div>}
    {difficulty===2 && <div><i class="fa fa-fire mr-1" style={{color:"white"}} aria-hidden="true"></i>Díficil </div>}
  </Dropdown.Toggle>

  <Dropdown.Menu>
                  <Dropdown.Item onClick={e => {
                  this.setState({difficulty:0})
                
                    
    }}>Fácil</Dropdown.Item>
                  <Dropdown.Item onClick={e => {
                    this.setState({difficulty:1})
                   
    }}>Médio</Dropdown.Item>
                  <Dropdown.Item onClick={e => {
                    this.setState({difficulty:2})
                   
    }}>Díficil</Dropdown.Item>
    
  </Dropdown.Menu>
</Dropdown>

   

<button
onClick={e=>{
    this.handlePlay(difficulty)
    this.setState({play:true})
}}
className='button_alternativa p-4 align-self-center mt-5'
> 
    Jogar
</button>
</div>

</div>
}



  <div> 
    {this.state.play === true &&  sortedGames.length !==0 &&
        <Game 
        url_img1={sortedGames[0].url_img}
        url_img2={sortedGames[1].url_img}
        url_img3={sortedGames[2].url_img}
        nome1_img1={sortedGames[0].nome1}
        nome2_img1={sortedGames[0].nome2}
        nome3_img1={sortedGames[0].nome3}
        nome1_img2={sortedGames[1].nome1}
        nome2_img2={sortedGames[1].nome2}
        nome3_img2={sortedGames[1].nome3}
        nome1_img3={sortedGames[2].nome1}
        nome2_img3={sortedGames[2].nome2}
        nome3_img3={sortedGames[2].nome3}
        nome_certo_img1={sortedGames[0].nome_certo}
        nome_certo_img2={sortedGames[1].nome_certo}
        nome_certo_img3={sortedGames[2].nome_certo}
        isAgainstSystem={true}
        isChallange={false}
        difficulty={this.state.difficulty}
        history={this.props.history}
        />
    }
  </div>
                 </div>
                 
                 :



                 <div 
                 style={{
                     width:'100%',
                     height:"100%"
                 }}
                 className='m-3'
                 >
                     
                     <h1 className='text-center font-weight-bold'> Bem vindo ao Personate</h1>
                    <h3 className='txt logotipo text-center mt-4 ml-5 pl-4'> Acha que entende personagens ? Então vem jogar</h3>
                     <Signin />


                 </div>
                }
              </div>
         
            </div>
        )
    }
}