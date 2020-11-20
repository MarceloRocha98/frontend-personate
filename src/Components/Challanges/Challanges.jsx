import React from 'react'
import Nav from '../templates/Nav'
import api from '../../services/api'
import Game from '../Game'

export default class Challanges extends React.Component{
    state={
        challanges_info:[],
        users:[],
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
                                    challange_id:challangedFix[indice].id
                                })
                                console.log(indice)
                            })
                })

                let promise = new Promise(function (resolve, reject) {
                    // the function is executed automatically when the promise is constructed
              
                    // after 1 second signal that the job is done with the result "done"
                    setTimeout(() => resolve("done"), 2000);
                });
                Promise.all([challanged, promise]).then((e) => {  // pra resolver o problema do tempo
                
    
                this.setState({challanges_info:usersChallangers})
                console.log(usersChallangers)
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
                alert('Desafio recusado com sucesso')
            })
    }

    async handleAccept(id){
        const payload=JSON.parse(localStorage.getItem('__userKey'))
        const data={
            challanger_id:payload.id,
            challanged_id:id,
            challanged_accepted:false,

        }
        console.log(data)
        await api.post('Challanges/',data)
            .then(res=>{
                alert('Usuario foi desafiado!')
            }).catch(msg=>{
                console.log(msg.response.data)
            })
    }


    render(){
        const {challanges_info, users } = this.state //username,user_id,accepted,challange_id tem no challanges_info
        return(
            <div className='d-flex flex-column'>
                <Nav />

                <div className='d-flex flex-column align-self-center mt-4 pt-2 justify-content-center'>
                
                        {challanges_info.length !== 0 && <div> Vc foi desafiado!</div>}
                        <div className='d-flex flex-column'>
                   
                            {challanges_info.map(e=>(

                                <div className='d-flex'>
                                    {e.username} te chamou pro x1
                                   <button>Aceitar</button>
                                   <button
                                   onClick={event=>this.handleRefuse(e.challange_id)}
                                   >Recusar</button>
                                 </div>
                                 
                            ))}
                        </div>

                        <div className='d-flex mt-5 pt-5'>

                            Desafie alguém!
                            <ul>
                                {users.map(user=>(
                                    <li>
                                        {user.username}
                                        <button
                                        onClick={e=>this.handleAccept(user.id)}
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