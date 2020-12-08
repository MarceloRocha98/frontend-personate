import React from 'react'
import api from '../services/api'

export default class Game extends React.Component{
    // Ele é chamado da seguinte forma:
    // <Game 
    // url_img1='https://rollingstone.uol.com.br/media/_versions/rick-morty-temporada-4_widelg.jpg' 
    // url_img2='https://i.pinimg.com/originals/e7/2e/2b/e72e2bc9c75c53a239dfb925b20a5cfd.jpg' 
    // url_img3='https://i.ytimg.com/vi/wfWIs2gFTAM/maxresdefault.jpg'
    // nome1_img1='1'
    // nome2_img1='2'
    // nome3_img1='3'
    // nome1_img2='4'
    // nome2_img2='5'
    // nome3_img2='6'
    // nome1_img3='7'
    // nome2_img3='8'
    // nome3_img3='9'
    // nome_certo_img1='1'
    // nome_certo_img2='4'
    // nome_certo_img3='7'
    // />
    state={
        show_img1:true,
        show_img2:false,
        show_img3:false,
        finish:false,
        points:0,
        changed_points:0,
    }

    componentDidMount(){
        console.log(this.props)
    }

    async handlePoints(e){
        e.preventDefault()
        let {points}=this.state
        let difficulty= this.props.difficulty
        const payload=JSON.parse (localStorage.getItem('__userKey'))
        const token=payload.token
        const user_id=payload.id

        // points=toString(points)
        // console.log(typeof(points))
        console.log(points)
        // console.log(token)

        let data={
            points,
            difficulty
        }
        
        
        api.defaults.headers.common['Authorization'] = `Token ${token}`

        let hadPreviousPoints=false
        let points_id=0
        await api.get('rank',data)
            .then(res=>{
                const data=res.data
                let previousPoints=data.filter(e=>{
                    return e.user_id === user_id
                })

                if(previousPoints.length !== 0){
                    hadPreviousPoints = true
                    points_id=previousPoints[0].id
                }
            }).catch(err=>{
                alert("Erro")
                console.log(err.response)
            })

            if(hadPreviousPoints){
                await api.patch(`rank/${points_id}/`,data)
                    .then(res=>{
                        alert('Pontos alterados com sucesso')
                        this.setState({ changed_points:1})
                       
                    })
                    .catch(err=>{
                        alert("Erro")
                        console.log(err.response)
                    })
            }else{ 

                data.user_id=user_id
                
                await api.post('rank/',data)
                    .then(res=>{
                        alert('Pontos incluidos com sucesso')
                    })
                    .catch(err=>{
                        alert("Erro")
                        console.log(err.response)
                    })
            }

    }

    async handleChallange(id){
        const payload=JSON.parse (localStorage.getItem('__userKey'))
        let data={}

        if(this.props.isChallanger ===false){

             data={
                challanged_points:this.state.points,
                challanged_id:payload.id,
                challanged_finish:true,
            }
        }else{
            data={
                challanger_points:this.state.points,
                challanger_finish:true,
            }

            }
            await api.patch(`Challanges/${id}/`,data)
                .then(res=>{
                    alert('Você finalizou o desafio!')
                })
                    .catch(err=>{
                        console.log(err.response.data)
                    })
    }



    render(){
        const {show_img1, show_img2,show_img3, finish, points} = this.state

        return(
            <div className='game'>

                {!!show_img1 && 
                <div>

                    <div className='d-flex justify-content-between'>
                    <img 
                className='imagem'
                src={this.props.url_img1}
                width='600px'
                height='500px'
                ></img>
                   
                    </div>
                
                <div className='d-flex m-1 justify-content-around'>
                    <button 
                    onClick={e=>{
                        if(this.props.nome1_img1 === this.props.nome_certo_img1){
                            this.setState({points:points+1})
                        } 
                        this.setState({
                            show_img1:false,
                            show_img2:true,
                        })
                    }}
                    className='btn btn-danger'>
                        {this.props.nome1_img1}
                    </button>
                    <button 
                     onClick={e=>{
                        if(this.props.nome2_img1 === this.props.nome_certo_img1){
                            this.setState({points:points+1})
                        } 
                        this.setState({
                            show_img1:false,
                            show_img2:true,
                        })
                    }}
                    className='btn btn-danger'>
                        {this.props.nome2_img1}
                    </button>
                    <button 
                     onClick={e=>{
                        if(this.props.nome3_img1 === this.props.nome_certo_img1){
                            this.setState({points:points+1})
                        } 
                        this.setState({
                            show_img1:false,
                            show_img2:true,
                        })
                    }}
                    className='btn btn-danger'>
                        {this.props.nome3_img1}
                    </button>
                </div>
            
                </div>
                
                    }

              {!!show_img2 &&
              <div>
                                       <div className='d-flex justify-content-between'>
                    <img 
                className='imagem'
                src={this.props.url_img2}
                width='600px'
                height='500px'
                ></img>
                  
                    </div>
                        <div className='d-flex m-1 justify-content-around'>
                        <button 
                        onClick={e=>{
                            if(this.props.nome1_img2 === this.props.nome_certo_img2){
                                this.setState({points:points+1})
                            } 
                            this.setState({
                                show_img2:false,
                                show_img3:true,
                            })
                        }}
                    className='btn btn-danger'>
                        {this.props.nome1_img2}
                    </button>
                    <button 
                      onClick={e=>{
                        if(this.props.nome2_img2 === this.props.nome_certo_img2){
                            this.setState({points:points+1})
                        } 
                        this.setState({
                            show_img2:false,
                            show_img3:true,
                        })
                    }}
                    className='btn btn-danger'>
                        {this.props.nome2_img2}
                    </button>
                    <button 
                       onClick={e=>{
                        if(this.props.nome3_img2 === this.props.nome_certo_img2){
                            this.setState({points:points+1})
                        } 
                        this.setState({
                            show_img2:false,
                            show_img3:true,
                        })
                    }}
                    className='btn btn-danger'>
                        {this.props.nome3_img2}
                    </button>
                        </div>
              </div>
              }



              {!!show_img3 && 
              <div>
                                        <div className='d-flex justify-content-between'>
                    <img 
                className='imagem'
                src={this.props.url_img3}
                width='600px'
                height='500px'
                ></img>
                  
                    </div>

                <div className='d-flex m-1 justify-content-around'>
                <button 
                    onClick={e=>{
                        if(this.props.nome1_img3 === this.props.nome_certo_img3){
                            this.setState({points:points+1})
                        } 
                        this.setState({
                            show_img3:false,
                            finish:true,
                        })
                        if(this.props.isChallange===true){
                            this.handleChallange(this.props.challange_id)
                        }
                    }}
                    className='btn btn-danger'>
                        {this.props.nome1_img3}
                    </button>
                    <button 
                         onClick={e=>{
                            if(this.props.nome2_img3 === this.props.nome_certo_img3){
                                this.setState({points:points+1})
                            } 
                            this.setState({
                                show_img3:false,
                                finish:true,
                            })
                            if(this.props.isChallange===true){
                                this.handleChallange(this.props.challange_id)
                            }
                        }}
                    className='btn btn-danger'>
                        {this.props.nome2_img3}
                    </button>
                    <button 
                         onClick={e=>{
                            if(this.props.nome3_img3 === this.props.nome_certo_img3){
                                this.setState({points:points+1})
                            } 
                            this.setState({
                                show_img3:false,
                                finish:true,
                            })
                            if(this.props.isChallange===true){
                                this.handleChallange(this.props.challange_id)
                            }
                        }}
                    className='btn btn-danger'>
                        {this.props.nome3_img3}
                    </button>
                </div>

              </div>
              }

              {!!finish &&  this.props.isChallange===false &&
              
              <div className='align-self-center'>
                 <h3 className='text-center font-weight-bold m-4'> <p style={{color:"white"}}>Resultado: {this.state.points} pontos</p></h3>

              {!!this.props.isAgainstSystem &&
               <div className='d-flex justify-content-center'>
                  <button 
                  className='btn btn-danger'
                  onClick={e=>this.handlePoints(e)}
                  > Deseja salvar seus pontos ?</button>
              </div>
        
            
        }
        </div>
                  }
        {!!this.props.isGameCreated && !!finish &&
        <div> 
           <p className='text-center font-weight-bold'> Você fez {points} pontos</p>
        </div>}

        {this.state.changed_points === 1 && this.props.history.push('/Rank')}
                
            </div>
        )
    }
}