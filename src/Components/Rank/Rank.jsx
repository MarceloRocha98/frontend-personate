import React from 'react'
import api from '../../services/api'
import Nav from '../templates/Nav'

export default class Rank extends React.Component{
    state={
        listPoints:[],
        isLoggedIn:false,
        loading:true,
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
              this.setState({ loading:false})    
            //   console.log(test)
            })

        }).catch(err=>{
            console.log(err)
        })
    }

    render(){
        
        const {loading,listPoints } = this.state

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
                        {listPoints.length !== 0 && 
                 
                 <div>
                     {listPoints.map(e=>(
                         
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