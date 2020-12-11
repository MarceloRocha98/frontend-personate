import React from 'react'
import Nav from '../templates/Nav'
import api from '../../services/api'
import Game from '../Game'
import trofeu from '../../assets/copo.png'

export default class Challanges extends React.Component{
    state={
        challanges_info:[],
        challanged_info:[],
        users:[],
        play:false,
        play2:false,
        sortedGames:[],
        sortedGames2:[],
        loading:true,
        loading2:true,
        rank:[],
        chal_win:-1,
        allusers:[],
        count:0,
        offset:5,
        page:1,
        prevPage:1,
        arrayPages:0,

    }
    
    async componentDidMount(){
        const payload=JSON.parse(localStorage.getItem('__userKey'))
        const token=payload.token
        const user_id=payload.id 

        if(token){
            api.defaults.headers.common['Authorization'] = `Token ${token}`
        }

        await api.get('Challanges/')
            .then(res=>{
                console.log(res.data)
                const allChallanges=res.data
                let challanged=allChallanges.filter(e=>{
                    return e.challanged_id === user_id
                })
              
                let usersChallangers=[]
                // console.log(challanged)
                const challangedFix=challanged
                challanged=challanged.map(async (challange, indice)=>{
                    await api.get(`users/${challange.challanger_id}`)
                            .then(response=>{
                                usersChallangers.push(
                                    {
                                    username:response.data.username,
                                    user_id:response.data.id,
                                    accepted:challangedFix[indice].challanged_accepted,
                                    challange_id:challangedFix[indice].id,
                                    challanged_finish:challangedFix[indice].challanged_finish,
                                    challanger_finish:challangedFix[indice].challanger_finish,
                                    challanger_points:challangedFix[indice].challanger_points,
                                    challanged_points:challangedFix[indice].challanged_points,
                                })
                                console.log(indice)
                            })
                })





                let challanger=allChallanges.filter(e=>{
                    return e.challanger_id === user_id
                })
              
                let usersChallangeds=[]
                // console.log(challanger)
                const challangerFix=challanger
                challanger=challanger.map(async (challange, indice)=>{
                    await api.get(`users/${challange.challanged_id}`)
                            .then(response=>{
                                usersChallangeds.push(
                                    {
                                    username:response.data.username,
                                    user_id:response.data.id,
                                    accepted:challangerFix[indice].challanged_accepted,
                                    challange_id:challangerFix[indice].id,
                                    challanged_finish:challangerFix[indice].challanged_finish,
                                    challanger_finish:challangerFix[indice].challanger_finish,
                                    challanger_points:challangerFix[indice].challanger_points,
                                    challanged_points:challangerFix[indice].challanged_points,
                                })
                                console.log(indice)
                            })
                })




                

                let promise = new Promise(function (resolve, reject) {
                    // the function is executed automatically when the promise is constructed
              
                    // after 1 second signal that the job is done with the result "done"
                    setTimeout(() => resolve("done"), 1000);
                });
                Promise.all([challanged, challanger,promise]).then((e) => {  // pra resolver o problema do tempo
                
    
                this.setState({
                    challanges_info:usersChallangers,
                    challanged_info:usersChallangeds,
                    loading:false,
                })
                // console.log(usersChallangers)
                console.log(usersChallangeds)
                })

               

            })

                /////////////////////////
            
            await api.get('users/')
                .then(res=>{
                    let users=res.data
                    users=users.filter(user=> user.id !== payload.id)
                    this.setState({allusers:users})
                    this.setState({users:users.slice(0,5)})

                })



                ////////////////////////////////rank
            let rank=[]
            await api.get('person/') 
                .then(async res=>{
                    let personData=res.data
                    let maior=-1
                    let ids=[]
                    let rankParcial=[]
                    let i=0


                    if(personData.length>=3){
                        let i=0
                        let ids=[]
                        while(rank.length<3){
                            i+=1
                           
                            personData.map(async e=>{
                                
                                if(e.chal_win>maior && ids.indexOf(e.id)===-1){
                                    maior=e.chal_win
                                    rankParcial.push({user_id:e.user_id,chal_win:maior})
                                    console.log(rankParcial)
                                    ids.push(e.id)
                                }
                            })
                            
                            if(rank.length===0 && i==1){
                                
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
                                
                            }
                            if(rank.length===2 && i==3){
                                
                                    rank.push(rankParcial[rankParcial.length-1])
                                    this.setState({rank})
                               
                            }

                        }
                      
                        console.log(this.state.rank)

                        //trocar id pelo nome do usuario do rank
                        let newRank=[]
                        let func=rank.map(async em=>{
                            await api.get(`users/${em.user_id}/`)
                                .then(user=>{
                                    // console.log(user)
                                     newRank.push({username:user.data.username,chal_win:em.chal_win})
                                })
                        })
                        console.log(newRank)
                        this.setState({rank:newRank,loading2:true})

                        let promise2 = new Promise(function (resolve, reject) {
                            // the function is executed automatically when the promise is constructed
                      
                            // after 1 second signal that the job is done with the result "done"
                            setTimeout(() => resolve("done"), 2500);
                        });
                        Promise.all([func,promise2]).then((e) => {  // pra resolver o problema do tempo
                        
            
                            this.setState({rank:newRank,loading2:false})
                            console.log(newRank)
                    
                        })
                    }
               
                }).catch(err=>alert('erro'))


                await api.get(`person/`)
                    .then(e=>{
                        const response=e.data
                        let person=response.filter(person=>{
                            if(person.user_id===payload.id){
                                this.setState({chal_win:person.chal_win})
                            }
                        })
                       
                            // console.log(this.state.chal_win)
                            // console.log(person)
                        
                    })

                 

                    ////paginação
                    const count=this.state.allusers.length
                    const offset=this.state.offset
                    console.log(count)
                    
                    const totalPages = Math.ceil(count / offset)
                    console.log(totalPages)
                    const pages = []
                    for (let i = 1; i <= totalPages; i++) {
                    pages.push(i)
                    }
                    console.log(pages)
                    this.setState({ arrayPages: pages })

                    }

    async componentDidUpdate(){
        const payload=JSON.parse(localStorage.getItem('__userKey'))
        const { page, prevPage, users,allusers,offset} = this.state

        if (!(page === prevPage)) {
            let newUsers=allusers.slice((page * offset - offset,page*offset))
            this.setState({users:newUsers,prevPage:page})
        }
    }

    async handleRefuse(id){
        const payload=JSON.parse(localStorage.getItem('__userKey'))
        const token=payload.token
        const user_id=payload.id 

        if(token){
            api.defaults.headers.common['Authorization'] = `Token ${token}`
        }

        await api.delete(`Challanges/${id}/`)
            .then(res=>{
                alert('Desafio recusado com sucesso, Atualize a página para novas informações')
            })
    }

    async handleChallange(id){
        const payload=JSON.parse(localStorage.getItem('__userKey'))
        const data={
            challanger_id:payload.id,
            challanged_id:id,
            challanged_accepted:false,

        }
        console.log(data)
        await api.post('Challanges/',data)
            .then(res=>{
                alert('Usuario foi desafiado, atualize a página para novas informações')
            }).catch(msg=>{
                console.log(msg.response.data)
            })
    }

    async handleAccept(id){
        const data={
            challanged_accepted:true,
        }

        await api.patch(`Challanges/${id}/`,data)
            .then(res=>{
                alert('Desafio aceito! Atualize a página para novas informações')
            }).catch(err=>{
                console.log(err.response.data)
            })
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

    async handlePlay2(difficulty){
        const payload=JSON.parse(localStorage.getItem('__userKey'))
        const token=payload.token
        api.defaults.headers.common['Authorization'] = `Token ${token}`

        // let data=[]
        await api.get("system_images/")
            .then(res=>{
                // console.log(res.data)
            
                let data= res.data
                let values=[]
                let sortedGames2=[]

                
               
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
                    sortedGames2.push(data[val])
                })
                this.setState({sortedGames2})
                console.log(sortedGames2)
                
            })
    }


    async handleDelete(id){
        let challanges_info=this.state.challanges_info
        let challanged_info=this.state.challanged_info //desafiados

        await api.delete(`Challanges/${id}/`)
            .then(res=>{
                alert('Sucesso! Atualize a pagina para novas informações')
                // if(isChallanges === true){
                //     challanges_info=challanges_info.filter(e=>e.challange_id !== id)
                //     this.setState({challanges_info})
                // }else{
                //     challanged_info=challanged_info.filter(e=>e.challange_id !== id)
                //     this.setState({challanged_info})
                // }
                
            }).catch(err=>console.log(err.response.data))
    }


    render(){
        const {arrayPages,chal_win,rank,loading2,loading,challanges_info, users, sortedGames,challanged_info, sortedGames2,play2 } = this.state //username,user_id,accepted,challange_id tem no challanges_info
        
        if (loading || loading2) {
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
            <div className='d-flex flex-column'>
                <Nav isLoggedIn={true} />

                <div className='d-flex mb-5 flex-column align-self-center mt-4 pt-2 justify-content-center'>
                
                <div className='align-self-center mb-4'>
        {rank.length !== 0 && 
        <div>  
            <ol>
              <img src={trofeu} alt="trofeu" style={{width:'200px'}}/>
          {rank.map(e=>(
                  <li className='logotipo text-center' style={{color:"white"}}>{e.username} com  {e.chal_win} desafios ganhos</li>
                
                  ))}    
                 
             </ol>
        </div>}
        </div>

        <div>
            {chal_win !== -1 && <p className='logotipo text-center txt'>Você tem {chal_win} desafios ganhos </p>}
        </div>
                        
                        {challanges_info.length !== 0 && <h1 className=' mb-4 text-center mb-5'> Desafios feitos para você</h1>}
                        <div className='d-flex flex-column mb-4'>
         
                            {challanges_info.map(e=>(

                          
                                <div className='d-flex flex-column justify-content-center mb-4'>
            
                                {e.accepted === false &&
                                <div className='d-flex justify-content-center div_vermelho_claro'>
                                  
                                <p className=' txt text-center'>   {e.username} te confrotou</p>
                                      <button
                                      className='button_aceitar'
                               onClick={event=>this.handleAccept(e.challange_id)}
                               >Aceitar</button>
                               <button
                               className='button_recusar'
                               onClick={event=>this.handleRefuse(e.challange_id)}
                               >Recusar</button>
                               </div>}

                               <div className='d-flex flex-column'>
                               {e.challanged_finish === false && e.accepted === true &&
                                <div className='d-flex flex-column'>
                                   <p className='text-center txt'> Você aceitou o desafio contra {e.username}</p>
                                    <button
                                    className='button_alternativa  align-self-center'
                                    onClick={e=>{
                                        this.handlePlay(2)
                                        this.setState({play:true})
                                    }}
                                    >Você ainda não jogou, clique pra jogar agora!</button>
                         
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
        isAgainstSystem={false}
        difficulty={this.state.difficulty}
        isChallange={true}
        isChallanger={false}
        challange_id={e.challange_id}
        />
    }
                                </div>
                               }
                               {e.challanged_finish === true && e.challanger_finish === false &&
                                <p className='text-center txt '>
                            
                                Você fez {e.challanged_points} pontos   contra o {e.username}
                                </p>}
                               {e.challanger_finish === false && e.accepted === true &&
                               <div>
                                   <p className=' txt text-muted text-center'>O {e.username} ainda não jogou</p>
                               </div>
                               }

                               {e.accepted ===true && e.challanger_finish ===true && e.challanged_finish === true &&
                               <div>
                                   {e.challanged_points>e.challanger_points &&
                                   <div>
                                   <button 
                                   className='btn btn-danger float-right'
                                   onClick={event=>this.handleDelete(e.challange_id)}
                                   ><i class="fa fa-trash-o" aria-hidden="true"></i>
                                   </button>
                                       <p className="txt text-center font-weight-bold">Você foi desafiado por {e.username} </p>
                                       <p className="txt text-center">Parabéns, você ganhou o desafio! Você fez {e.challanged_points} pontos e o {e.username} fez {e.challanger_points} pontos</p>

                                  </div>}
                                   {e.challanged_points<e.challanger_points &&
                                   <div>
                                           <button 
                                   className='btn btn-danger float-right'
                                   onClick={event=>this.handleDelete(e.challange_id)}
                                   ><i class="fa fa-trash-o" aria-hidden="true"></i>
                                   </button>
                                          <p className="txt text-center font-weight-bold">Você foi desafiado por {e.username} </p>
                                        <p className="txt text-center">Você perdeu o desafio, tendo feito {e.challanged_points} pontos enquanto que o {e.username} fez {e.challanger_points} pontos</p>
                                  </div>}
                                   {e.challanged_points===e.challanger_points &&
                                   <div>
                                           <button 
                                   className='btn btn-danger float-right'
                                   onClick={event=>this.handleDelete(e.challange_id)}
                                   ><i class="fa fa-trash-o" aria-hidden="true"></i>
                                   </button>
                                         <p className="txt text-center font-weight-bold">Você foi desafiado por {e.username} </p>
             
                                      <p className="txt text-center">Empate! Você e o {e.username} fizeram {e.challanged_points} pontos</p> 
                                  </div>}
                              </div>}
                              </div>
                             
                              < hr/>                   
                             </div>
                           
        ))}
                        </div>





        <div>
            <hr />
                                   
            {challanged_info.length !== 0 && 
            <div className='mb-5'>
                <h1 className='text-center mb-5'>Desafios feitos por você !</h1>
                 {challanged_info.map(e=>(
                     <div className='d-flex flex-column mb-4'>
                         <p className=' txt text-center font-weight-bold'>Você desafiou {e.username}</p>
                            {e.accepted === false &&
                            <div>
                               <p className=' txt text-center'> Ele ainda não aceitou o desafio</p>
                            </div>}

                            {e.challanger_finish === false && e.accepted === true &&
                            <div className='d-flex flex-column'>
                                <p className=' txt text-center'> {e.username} aceitou o desafio </p>
                            <button
                            className='button_alternativa align-self-center'
                            onClick={e=>{
                                this.setState({play2:true})
                                this.handlePlay2(2)
                            }}
                            > Você ainda não jogou, clique aqui para jogar</button>
                            
                            {this.state.play2 === true &&  sortedGames2.length !==0 &&
        <Game 
        url_img1={sortedGames2[0].url_img}
        url_img2={sortedGames2[1].url_img}
        url_img3={sortedGames2[2].url_img}
        nome1_img1={sortedGames2[0].nome1}
        nome2_img1={sortedGames2[0].nome2}
        nome3_img1={sortedGames2[0].nome3}
        nome1_img2={sortedGames2[1].nome1}
        nome2_img2={sortedGames2[1].nome2}
        nome3_img2={sortedGames2[1].nome3}
        nome1_img3={sortedGames2[2].nome1}
        nome2_img3={sortedGames2[2].nome2}
        nome3_img3={sortedGames2[2].nome3}
        nome_certo_img1={sortedGames2[0].nome_certo}
        nome_certo_img2={sortedGames2[1].nome_certo}
        nome_certo_img3={sortedGames2[2].nome_certo}
        isAgainstSystem={false}
        difficulty={this.state.difficulty}
        isChallange={true}
        challange_id={e.challange_id}
        isChallanger={true}
        />}
                            


                            
                            </div>

                             
                            }
                            {e.challanger_finish === true && e.challanged_finish===false &&
                            <div>
                                <p className=' txt text-center'>Você realizou sua jogada e fez {e.challanger_points} pontos</p>
                                <p className=' txt text-center text-muted'>{e.username} ainda não jogou</p>
                            </div>
                            }

                            {e.challanged_finish === true && e.challanger_finish === true &&
                            <div className='d-flex flex-column'>
                                {e.challanger_points>e.challanged_points &&
                                <div>
                                        <button 
                                   className='btn btn-danger float-right'
                                   onClick={event=>this.handleDelete(e.challange_id)}
                                   ><i class="fa fa-trash-o" aria-hidden="true"></i>
                                   </button>
                                <p className=' txt text-center'>Parabéns, você ganhou o desafio, tendo feito {e.challanger_points} pontos contra {e.challanged_points} do {e.username}</p>
                                </div>
                                }
                                {e.challanger_points<e.challanged_points &&
                                 <div>
                                    <button 
                                   className='btn btn-danger float-right'
                                   onClick={event=>this.handleDelete(e.challange_id)}
                                   ><i class="fa fa-trash-o" aria-hidden="true"></i>
                                   </button>
                                <p className=' txt text-center'>Você perdeu o desafio, tendo feito {e.challanger_points} contra {e.challanged_points} do {e.username}</p>
                               </div>
                                }
                                {e.challanger_points===e.challanged_points &&
                                 <div>
                                    <button 
                                   className='btn btn-danger float-right'
                                   onClick={event=>this.handleDelete(e.challange_id)}
                                   ><i class="fa fa-trash-o" aria-hidden="true"></i>
                                   </button>
                                <p className=' txt text-center'>Empate, ambos fizeram {e.challanger_points} pontos</p>
                                </div>
                                }
                            </div>}

                            < br/>
                     </div>
                 ))}


            </div>
            }
        </div>




                        <div className='d-flex mt-5 pt-5 div_verde_claro'>

                          <p className="txt logotipo" style={{fontSize:"25px"}}>  Desafie alguém!</p>
                            <ul>
                                {users.map(user=>(
                                    <li className='mb-5 d-flex flex-column justify-content-center'>
                                       <p className="txt text-center"> {user.username}</p>
                                        <button
                                        className='button_alternativa2'
                                        onClick={e=>this.handleChallange(user.id)}
                                        >Desafiar</button>
                                    </li>
                                    ))}




<nav aria-label="Page navigation example" className='m-3'>
              <ul className="pagination justify-content-end">

                <li className="page-item cursor">
                  <a className="page-link"
                    onClick={e => {
                      const prevPage = this.state.page
                     if(prevPage-1>=0){
                        this.setState({ page: prevPage - 1 })
                        this.setState({ prevPage })
                     }
                    }}
                    tabindex="-1" aria-disabled="true">Anterior</a>
                </li>

                {
                  arrayPages.map(page => (
                    // <li key={page}>
                    //   <button onClick={e => {
                      //     const prevPage=this.state.page
                      //     this.setState({prevPage})
                    //     this.setState({ page: page })
                    
                    //   }}> {page}</button>
                    // </li>
                    <li className="page-item cursor"
                    onClick={e => {
                      const prevPage = this.state.page
                        this.setState({ prevPage })
                        this.setState({ page:page-1 })
                        
                      }}
                      ><a className="page-link">{page}</a></li> 
                      ))
                    }

                <li className="page-item cursor">
                  <a className="page-link"
                    onClick={e => {
                      const prevPage = this.state.page
                      if(prevPage+1<arrayPages.length){
                        this.setState({ page: prevPage + 1 })
                        this.setState({ prevPage })
                      }
                    }}
                    >Próxima</a>
                </li>

              </ul>
            </nav>







                            </ul>

                        </div>

        
                </div>

            </div>
        )
    }
}