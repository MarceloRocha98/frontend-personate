import React from 'react'
import Nav from '../templates/Nav'
import api from '../../services/api'
import Game from '../Game'

export default class Challanges extends React.Component{
    state={
        challanges_info:[],
        challanged_info:[],
        users:[],
        play:false,
        play2:false,
        sortedGames:[],
        sortedGames2:[],
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
                    this.setState({users})
                })




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


    render(){
        const {challanges_info, users, sortedGames,challanged_info, sortedGames2,play2 } = this.state //username,user_id,accepted,challange_id tem no challanges_info
        return(
            <div className='d-flex flex-column'>
                <Nav isLoggedIn={true} />

                <div className='d-flex mb-5 flex-column align-self-center mt-4 pt-2 justify-content-center'>
                
                        {challanges_info.length !== 0 && <p className='text-center'> Vc foi desafiado!</p>}
                        <div className='d-flex flex-column'>
                   
                            {challanges_info.map(e=>(

                          
                                <div className='d-flex flex-column justify-content-center mb-4'>

                                {e.accepted === false &&
                                <div className='d-flex justify-content-center'>
                                <p className='text-center'>   {e.username} te chamou pro x1</p>
                                      <button
                               onClick={event=>this.handleAccept(e.challange_id)}
                               >Aceitar</button>
                               <button
                               onClick={event=>this.handleRefuse(e.challange_id)}
                               >Recusar</button>
                               </div>}

                               <div className='d-flex flex-column'>
                               {e.challanged_finish === false && e.accepted === true &&
                                <div>
                                    <button
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
        challange_id={e.challange_id}
        />
    }
                                </div>
                               }
                               {e.challanged_finish === true && e.challanger_finish === false &&
                                <p className='text-center'>
                                Você fez {e.challanged_points} pontos   contra o {e.username}
                                </p>}
                               {e.challanger_finish === false && e.accepted === true &&
                               <div>
                                   <p className='text-muted text-center'>O {e.username} ainda não jogou</p>
                               </div>
                               }

                               {e.accepted ===true && e.challanger_finish ===true && e.challanged_finish === true &&
                               <div>
                                   {e.challanged_points>e.challanger_points &&
                                   <div>
                                       Parabéns, você ganhou o desafio! Você fez {e.challanged_points} pontos e o {e.username} fez {e.challanger_points} pontos

                                  </div>}
                                   {e.challanged_points<e.challanger_points &&
                                   <div>
                                        Você perdeu o desafio, tendo feito {e.challanged_points} pontos enquanto que o {e.username} fez {e.challanger_points} pontos
                                  </div>}
                                   {e.challanged_points===e.challanger_points &&
                                   <div>
                                        Vocês empataram!
                                        Você e o {e.username} fizeram {e.challanged_points} pontos 
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
                 {challanged_info.map(e=>(
                     <div className='d-flex flex-column mb-4'>
                         <p className='text-center'>Você desafiou {e.username}</p>
                            {e.accepted === false &&
                            <div>
                               <p className='text-center'> Ele ainda não aceitou o desafio</p>
                            </div>}

                            {e.challanger_finish === false && e.accepted === true &&
                            <div className='d-flex flex-column'>
                                <p className='text-center'> {e.username} aceitou o desafio </p>
                            <button
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
                                <p className='text-center'>Você realizou sua jogada e fez {e.challanger_points} pontos</p>
                                <p className='text-center text-muted'>{e.username} ainda não jogou</p>
                            </div>
                            }

                            {e.challanged_finish === true && e.challanger_finish === true &&
                            <div className='d-flex flex-column'>
                                {e.challanger_points>e.challanged_points &&
                                <p className='text-center'>Parabéns, você ganhou o desafio, tendo feito {e.challanger_points} pontos contra {e.challanged_points} do {e.username}</p>
                                }
                                {e.challanger_points<e.challanged_points &&
                                <p className='text-center'>Você perdeu o desafio, tendo feito {e.challanger_points} contra {e.challanged_points} do {e.username}</p>
                                }
                                {e.challanger_points===e.challanged_points &&
                                <p className='text-center'>Empate, ambos fizeram {e.challanger_points}</p>
                                }
                            </div>}

                            < br/>
                     </div>
                 ))}


            </div>
            }
        </div>




                        <div className='d-flex mt-5 pt-5'>

                            Desafie alguém!
                            <ul>
                                {users.map(user=>(
                                    <li>
                                        {user.username}
                                        <button
                                        onClick={e=>this.handleChallange(user.id)}
                                        >Desafiar</button>
                                    </li>
                                    ))}
                            </ul>

                        </div>

        
                </div>

            </div>
        )
    }
}