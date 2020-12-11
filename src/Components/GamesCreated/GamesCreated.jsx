import React from 'react'
import api from '../../services/api'
import Nav from '../templates/Nav'


export default class GamesCreated extends React.Component{
    state={
        loading:true,
        games:[],
        count:0,
        offset:5,
        page:0,
        prevPage:0,
        arrayPages:0,
        allgames:[]
    }

    async componentDidMount(){

        await api.get("GamesCreated/")
            .then(games=>{
                console.log(games.data)
                this.setState({allgames:games.data})
                this.setState({count:games.data.length})
                this.setState({games:games.data.slice(0,5)})
                
            })

              ////paginação
              const count=this.state.count
              const offset=this.state.offset
              console.log(count)
              
              const totalPages = Math.ceil(count / offset)
              console.log(totalPages)
              const pages = []
              
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i)
                    }
            
              let promise = new Promise(function (resolve, reject) {
                // the function is executed automatically when the promise is constructed
          
                // after 1 second signal that the job is done with the result "done"
                setTimeout(() => resolve("done"), 1000);
            });
            Promise.all([promise]).then((e) => {  // pra resolver o problema do tempo
            

            this.setState({
                arrayPages: pages,
                loading:false,
            })
            console.log(this.state.arrayPages)
            // console.log(usersChallangeds)
            })
            //   console.log(pages)
            //   this.setState({ arrayPages: pages })

              
    }
    async componentDidUpdate(){
        const payload=JSON.parse(localStorage.getItem('__userKey'))
        const { page, prevPage,allgames,offset} = this.state

        if (!(page === prevPage)) {
            let newGames=allgames.slice((page * offset - offset,page*offset))
            this.setState({games:newGames,prevPage:page})
        }
    }

    handleGame(id){
        console.log(id)
        localStorage.setItem('game_id',id)
        this.props.history.push('/GameCreatedPlay')
    }

    render(){
        const {arrayPages, loading,games } = this.state
        

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
            <div className='d-flex flex-column'>
                <Nav isLoggedIn={true} />

        <h1 className='text-center mt-4 mb-5'>Jogos criados por outros usuários</h1>
                <div className='mt-3 d-flex flex-column jogoscriados  justify-content-center'>

    
                    <div className='align-self-center'>




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