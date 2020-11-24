import React from 'react'
import {Link } from 'react-router-dom'
import api from '../../services/api'
import {Dropdown} from 'react-bootstrap'
import Nav from '../templates/Nav'
import Game from '../Game'

export default class Home extends React.Component{
    state={
        isLoggedIn:false,

        //// states testes abaixo

        points:0,
        listPoints:[],
        difficulty:0,
        finish:false,
        play:false,
        sortedGames:[],



    }


    async componentDidMount(){
        console.log(this.props)
        const payload=JSON.parse(localStorage.getItem('__userKey'))

        // console.log(payload.token)
        let token=''
        if(payload){
             token=payload.token
        }
        if(token !== ''){
            this.setState({isLoggedIn:true})
        }else{
            this.setState({isLoggedIn:false})
        }
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

                if(difficulty === 0){
                    data=data.filter(data=> data.difficulty === 0)
                    const count=data.length
                    while(values.length <3){
                        let val=this.getRandomInt(0,count)
                        if(values.indexOf(val) === -1){
                            values.push(val)
                    }
                    }
                    console.log(values)
                //    let func= values.map(val=>{
                //         sortedGames.push(data[val])
                //     })
                 
                //     let promise = new Promise(function (resolve, reject) {
                //         // the function is executed automatically when the promise is constructed
                  
                //         // after 1 second signal that the job is done with the result "done"
                //         setTimeout(() => resolve("done"), 2000);
                //     });
                //     Promise.all([func, promise]).then((e) => {  // pra resolver o problema do tempo
                    
        
                //         this.setState({sortedGames})
                //         console.log(sortedGames)
                //     })
                }
                if(difficulty === 1){
                    data=data.filter(data=> data.difficulty === 1)
                    const count=data.length
                    console.log(data)
                    while(values.length <3){
                        let val=this.getRandomInt(0,count)
                        if(values.indexOf(val) === -1){
                            console.log(val)
                            values.push(val)
                    }
                }
                
    
                }
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

    render(){
        const {isLoggedIn, points, listPoints,difficulty, sortedGames } = this.state
        // console.log(this.props)

        return(
            <div
          
            >
              <Nav isLoggedIn={isLoggedIn} history={this.props.history} />
              <div className='mt-3 pt-2 d-flex'>
                 {!!isLoggedIn ? <div
                  style={{
                    width:'100%',
                    height:"100%"
                }}
                 >Desafie o sistema !

         

              

<div className='d-flex d-md-row'>
<Dropdown>
  <Dropdown.Toggle variant="danger" id="dropdown-basic">
 Dificuldade
  </Dropdown.Toggle>

  <Dropdown.Menu>
                  <Dropdown.Item onClick={e => {
                  this.setState({difficulty:0})
                
                    
    }}>Fácil</Dropdown.Item>
                  <Dropdown.Item onClick={e => {
                    this.setState({difficulty:1})
                   
    }}>Médio</Dropdown.Item>
                  <Dropdown.Item onClick={e => {
                    this.setState({difficulty:2})
                   
    }}>Díficil</Dropdown.Item>
    
  </Dropdown.Menu>
</Dropdown>

   
{difficulty===0 && <div style={{
    background:"orange",
    borderRadius:"10px",
    padding:"5px"
    }}>Fácil </div>}
{difficulty===1 && <div 
 style={{
    background:"orange",
    borderRadius:"10px",
    padding:"5px"
    }}
>Médio </div>}
{difficulty===2 && <div
 style={{
    background:"orange",
    borderRadius:"10px",
    padding:"5px"
    }}
>Díficil </div>}
<button
onClick={e=>{
    this.handlePlay(difficulty)
    this.setState({play:true})
}}
className='btn btn-danger ml-2'>
    Jogar
</button>
</div>



  <div> 
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
        isAgainstSystem={true}
        isChallange={false}
        difficulty={this.state.difficulty}
        />
    }
  </div>
                 </div>
                 
                 :
                 
                 <div 
                 style={{
                     width:'100%',
                     height:"100%"
                 }}
                 className='d-flex flex-column m-3'
                 >
                     
                     <h2 className='text-center font-weight-bold'> Bem vindo ao Personate</h2>
                     <h3 className='text-muted text-center m-3'> Para uma melhor experiencia, cadastre-se para jogar</h3>

<div
className='conteiner-home form-conteiner'
style={{
    border:"solid 5px",
    alignSelf:"center",
    padding:'25px'
    
}}
>


<div className="d-flex "

>

                     <Link to='/Signin'>

                   <h4 
                   className='text-left'
                   style={{
                       color:"white"
                   }}
                   ><i class="fa fa-fire mr-1" style={{color:"red"}} aria-hidden="true"></i>Jogar</h4>
                     </Link>
</div>


                </div>
                 </div>}
              </div>
         
            </div>
        )
    }
}