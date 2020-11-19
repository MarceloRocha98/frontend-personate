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
                <Nav />

                <div className='mt-3 d-flex flex-column jogoscriados'>

                    <button
                    onClick={e=>this.props.history.push("/Create")}
                    >
                        Criar novo jogo</button>
                    <ul>
                {games.map(game=>(
                        <li>
                             {game.game_name}
                             <button
                             onClick={e=>this.handleGame(game.id)}
                                 >
                                 Jogar
                             </button>
                        </li>
                        
                        ))}
                        </ul>
                </div>


                



            </div>
        )
    }
}