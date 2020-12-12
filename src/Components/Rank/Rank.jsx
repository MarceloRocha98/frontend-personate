import React from 'react'
import api from '../../services/api'
import Nav from '../templates/Nav'

export default class Rank extends React.Component{
    state={
        listPoints:[],
        isLoggedIn:false,
        loading:true,
        rank:[],
        rankChal:[],
    }

    async componentDidMount(){
       
        const payload=JSON.parse(localStorage.getItem('__userKey'))

        // console.log(payload.token)
        let token=''
        if(payload){
             token=payload.token
             this.setState({isLoggedIn:true})
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


                        let time=e.data
                        let ano=time.slice(0,4)
                        let mes=time.slice(5,7)
                        let dia=time.slice(8,10)
                        let hora=time.slice(11,13)
                        let minutos=time.slice(14,16)
                        hora=parseInt(hora)
                        hora=hora-3
                        // hora[0]=hora-3
                        // console.log(minutos)
                        let dataAjusted=`${dia}/${mes}/${ano} às ${hora}:${minutos}`

                        newInfoObj.user_id=user.data.username
                        newInfoObj.points=e.points
                        newInfoObj.difficulty=dificuldade
                        newInfoObj.data=dataAjusted
                        newInfoObj.id=e.user_id
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
            

              //////// os maiores
              let maior=0
              let ids=[]
              let rankParcial=[]
              let rank=[]
              let i=0


              if(newInfo.length>=5){
                  let i=0
                  let ids=[]
                  while(rank.length<5){
                      i+=1
                     
                      newInfo.map(async e=>{
                          
                          if(e.points>=maior && ids.indexOf(e.id)===-1){
                              maior=e.points
                              rankParcial.push({user_id:e.user_id,points:maior,data:e.data,difficulty:e.difficulty})
                              console.log(rankParcial)
                              ids.push(e.id)
                          }
                      })
                      
                      if(rank.length===0 && i==1){
                          console.log(rankParcial)
                          console.log(`ids ${ids}`)
                          console.log(rankParcial[rankParcial.length-1])
                          let lastId=ids[ids.length-1]
                          ids=[]
                          ids.push(lastId)
                          maior=0
                          rank.push(rankParcial[rankParcial.length-1])
                          console.log(ids)
                             
                       
                      }
                      if(rank.length===1 && i==2){
                          
                              let firstId=ids[0]
                              let lastId=ids[ids.length-1]
                              maior=0
                              ids=[]
                              ids.push(firstId)
                              ids.push(lastId)
                              rank.push(rankParcial[rankParcial.length-1])
                              console.log(ids)
                              console.log(rankParcial)
                              console.log(rankParcial[rankParcial.length-1])
                          
                      }
                      if(rank.length===2 && i==3){
                          
                              let firstId=ids[0]
                              let secondId=ids[1]
                              let lastId=ids[ids.length-1]
                              maior=0
                              ids=[]
                              ids.push(firstId)
                              ids.push(secondId)
                              ids.push(lastId)
                              rank.push(rankParcial[rankParcial.length-1])
                              console.log(ids)
                              console.log(rankParcial)
                              console.log(rankParcial[rankParcial.length-1])
                          
                      }
                      if(rank.length===3 && i==4){
                          
                              let firstId=ids[0]
                              let secondId=ids[1]
                              let thirdId=ids[2]
                              let lastId=ids[ids.length-1]
                              maior=0
                              ids=[]
                              ids.push(firstId)
                              ids.push(secondId)
                              ids.push(thirdId)
                              ids.push(lastId)
                              rank.push(rankParcial[rankParcial.length-1])
                              console.log(ids)
                              console.log(rankParcial)
                              console.log(rankParcial[rankParcial.length-1])
                          
                      }
                      if(rank.length===4 && i==5){
                              console.log(rankParcial)
                              console.log(rankParcial[rankParcial.length-1])
                              rank.push(rankParcial[rankParcial.length-1])
                              this.setState({rank})
                         
                      }

                  }
                
                  console.log(this.state.rank)


               
                    
                     
                      
                  
                  this.setState({rank:rank})

              }












              ////////////////////

            
              this.setState({ loading:false})    
            //   console.log(test)
            })



        }).catch(err=>{
            console.log(err)
        })


               ////////////////// rank pro challanges




                 ////////////////////////////////rank
                 let rank=[]
                 await api.get('person/') 
                     .then(async res=>{
                         let personData=res.data
                         let maior=-1
                         let ids=[]
                         let rankParcial=[]
                         let i=0
     
     
                         if(personData.length>=5){
                             let i=0
                             let ids=[]
                             while(rank.length<5){
                                i+=1
                               
                                personData.map(async e=>{
                                    
                                    if(e.chal_win>=maior && ids.indexOf(e.id)===-1){
                                        maior=e.chal_win
                                        rankParcial.push({user_id:e.user_id,chal_win:maior})
                                        console.log(rankParcial)
                                        ids.push(e.id)
                                    }
                                })
                                
                                if(rank.length===0 && i==1){
                                    console.log(rankParcial)
                                    console.log(`ids ${ids}`)
                                    console.log(rankParcial[rankParcial.length-1])
                                    let lastId=ids[ids.length-1]
                                    ids=[]
                                    ids.push(lastId)
                                    maior=0
                                    rank.push(rankParcial[rankParcial.length-1])
                                    console.log(ids)
                                       
                                 
                                }
                                if(rank.length===1 && i==2){
                                    
                                        let firstId=ids[0]
                                        let lastId=ids[ids.length-1]
                                        maior=0
                                        ids=[]
                                        ids.push(firstId)
                                        ids.push(lastId)
                                        rank.push(rankParcial[rankParcial.length-1])
                                        console.log(ids)
                                        console.log(rankParcial)
                                        console.log(rankParcial[rankParcial.length-1])
                                    
                                }
                                if(rank.length===2 && i==3){
                                    
                                        let firstId=ids[0]
                                        let secondId=ids[1]
                                        let lastId=ids[ids.length-1]
                                        maior=0
                                        ids=[]
                                        ids.push(firstId)
                                        ids.push(secondId)
                                        ids.push(lastId)
                                        rank.push(rankParcial[rankParcial.length-1])
                                        console.log(ids)
                                        console.log(rankParcial)
                                        console.log(rankParcial[rankParcial.length-1])
                                    
                                }
                                if(rank.length===3 && i==4){
                                    
                                        let firstId=ids[0]
                                        let secondId=ids[1]
                                        let thirdId=ids[2]
                                        let lastId=ids[ids.length-1]
                                        maior=0
                                        ids=[]
                                        ids.push(firstId)
                                        ids.push(secondId)
                                        ids.push(thirdId)
                                        ids.push(lastId)
                                        rank.push(rankParcial[rankParcial.length-1])
                                        console.log(ids)
                                        console.log(rankParcial)
                                        console.log(rankParcial[rankParcial.length-1])
                                    
                                }
                                if(rank.length===4 && i==5){
                                        console.log(rankParcial)
                                        console.log(rankParcial[rankParcial.length-1])
                                        rank.push(rankParcial[rankParcial.length-1])
                                        this.setState({rankChal:rank})
                                   
                                }
          
                            }
                          
                           
                             console.log(this.state.rank)
     
                             //trocar id pelo nome do usuario do rank
                             let newRank=[]
                             rank=rank.filter(e=>e.chal_win !== 0)
                             let func=rank.map(async em=>{
                                 await api.get(`users/${em.user_id}/`)
                                     .then(user=>{
                                         // console.log(user)
                                          newRank.push({username:user.data.username,chal_win:em.chal_win})
                                     })
                             })
                             console.log(newRank)
                          
                               
                                
                                 
                             
                             this.setState({rankChal:newRank,loading:true})
     
                             let promise2 = new Promise(function (resolve, reject) {
                                 // the function is executed automatically when the promise is constructed
                           
                                 // after 1 second signal that the job is done with the result "done"
                                 setTimeout(() => resolve("done"), 2500);
                             });
                             Promise.all([func,promise2]).then((e) => {  // pra resolver o problema do tempo
                                
                                 this.setState({rankChal:newRank,loading:false})
                                 console.log(newRank)
                         
                             })
                         }
                    
                     }).catch(err=>alert('erro'))
    }

    render(){
        
        const {rankChal,rank,loading,listPoints } = this.state

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
                    <div>

                        <Nav isLoggedIn={this.state.isLoggedIn} />

                        <div className='mt-5 pt-3'>
                            <h1 className='text-center font-weight-bold'>Rank</h1>

                            {rankChal.length !== 0 && 
                 
                 <div className='mt-4'>
                     <h3 className='txt text-center logotipo mt-5 pt-5'>Nossos melhores desafiantes</h3>
                     {rankChal.map(e=>(
                         
                         <div class="card text-white bg-dark mb-3 m-5" style={{width: "18rem;"}}>
  <div class="card-header">{e.username}</div>
  <div class="card-body">
    <p class="card-text">Tem {e.chal_win} desafios ganhos </p>
  </div>
</div>
                     ))}
                 </div>}


                        {rank.length !== 0 && 
                 
                 <div>
                     <h3 className='txt text-center logotipo mt-5 pt-5'>Os melhores contra o sistema </h3>
                     {rank.map(e=>(
                         
                         <div class="card text-white bg-dark mb-3 m-5" style={{width: "18rem;"}}>
  <div class="card-header">{e.user_id}</div>
  <div class="card-body">
    <h5 class="card-title">Dificuldade: {e.difficulty}</h5>
    <p class="card-text">Fez  {e.points} pontos em {e.data} </p>
  </div>
</div>
                     ))}
                 </div>}

                
                     </div>

                    </div>
        )
    }
}