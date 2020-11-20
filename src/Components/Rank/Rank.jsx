import React from 'react'
import api from '../../services/api'
import Nav from '../templates/Nav'

export default class Rank extends React.Component{
    state={
        listPoints:[],
        isLoggedIn:false,
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
        
        const {listPoints } = this.state

        return(
                    <div>

                        <Nav isLoggedIn={this.state.isLoggedIn} />

                        <div className='mt-5 pt-3'>
                            <h2 className='text-center font-weight-bold'>Rank</h2>
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
                     </div>

                    </div>
        )
    }
}