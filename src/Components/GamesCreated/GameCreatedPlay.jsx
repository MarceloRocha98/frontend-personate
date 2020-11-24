import React from 'react'
import api from '../../services/api'
import Game from '../Game'
import Nav from '../templates/Nav'

export default class GamesCreated extends React.Component{
    state={
        game:{}
    }

    async componentDidMount(){

        const game_id=parseInt(localStorage.getItem('game_id'))
        if(!game_id){
            this.props.history.push("/GamesCreated")
        }

        await api.get(`GamesCreated/${game_id}`)
            .then(game=>{
                console.log(game.data)
                this.setState({game:game.data})
            })
    }

    render(){
        const { game } = this.state

        return(
            <div className='d-flex flex-column'>
                 {/* <ul>
                        <li> {game.game_name}</li>
                        <img 
                        src={game.url_img1}
                        className='rounded-circle img-fluid mx-auto d-block'
                        ></img>
                                <div className='d-flex flex-row'>
                                        {game.nome1_img1}
                                        {game.nome2_img1}
                                        {game.nome3_img1}
                                </div>
                        <img src={game.url_img2}></img>
                                <div className='d-flex flex-row'>
                                        {game.nome1_img2}
                                        {game.nome2_img2}
                                        {game.nome3_img2}
                                </div>
                        <img src={game.url_img3}></img>
                               <div className='d-flex flex-row'>
                                        {game.nome1_img3}
                                        {game.nome2_img3}
                                        {game.nome3_img3}
                                </div>
                    </ul> */}
                    <div className='mb-5 pb-3'>

                    <Nav />
                    </div>
                   <h3 className='text-center font-weight-bold'> {game.game_name}</h3>
                    <Game 
    url_img1={game.url_img1} 
    url_img2={game.url_img2} 
    url_img3={game.url_img3} 
    nome1_img1={game.nome1_img1}
    nome2_img1={game.nome2_img1}
    nome3_img1={game.nome3_img1}
    nome1_img2={game.nome1_img2}
    nome2_img2={game.nome2_img2}
    nome3_img2={game.nome3_img2}
    nome1_img3={game.nome1_img3}
    nome2_img3={game.nome2_img3}
    nome3_img3={game.nome3_img3}
    nome_certo_img1={game.nome_certo_img1}
    nome_certo_img2={game.nome_certo_img2}
    nome_certo_img3={game.nome_certo_img3}
    isGameCreated={true}
    />

             </div>
        )
    }
}