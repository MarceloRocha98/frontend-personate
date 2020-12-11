import React from 'react'
import api from '../../services/api'
import Nav from '../templates/Nav'


export default class GamesCreated extends React.Component{
    state={
        games:[]
    }

    async componentDidMount(){

        await api.get("GamesCreated/")
            .then(games=>{
                console.log(games.data)
                this.setState({games:games.data})
                
            })
    }

    handleGame(id){
        console.log(id)
        localStorage.setItem('game_id',id)
        this.props.history.push('/GameCreatedPlay')
    }

    render(){
        const { games } = this.state
        
        return(
            <div className='d-flex flex-column'>
                <Nav isLoggedIn={true} />

        <h1 className='text-center mt-4 mb-5'>Jogos criados por outros usuários</h1>
                <div className='mt-3 d-flex flex-column jogoscriados  justify-content-center'>

    
                    <div className='align-self-center'>
                {games.map(game=>(           
 <div 
 className='d-flex m-2'>
     
   <div class="card"  style={{padding:"30px",width:"200%"}}>
     <div class="card-body">
       <h5 class="card-title "> {game.game_name}</h5>
       
       <button
               className='btn btn-danger'
               onClick={e=>this.handleGame(game.id)}
                            >
                                Jogar
                            </button>
     </div>
   </div>
          
 </div>
                       
                        ))}

                        <div>
                        <button
                        style={{width:"90%"}}
                        className='button_alternativa align-self-center m-2'
                    onClick={e=>this.props.history.push("/Create")}
                    >
                        Criar novo jogo</button>
                    
                        </div>
                        </div>
                </div>


                



            </div>
        )
    }
}