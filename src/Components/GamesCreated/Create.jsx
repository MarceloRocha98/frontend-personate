import React from 'react'
import api from '../../services/api'
import Nav from '../templates/Nav'


export default class Create extends React.Component{
    state={
        game_name:'',
        img1:'',
        img2:'',
        img3:'',
        url_img1:'',
        url_img2:'',
        url_img3:'',
        nome1_img1:'',
        nome2_img1:'',
        nome3_img1:'',
        nome1_img2:'',
        nome2_img2:'',
        nome3_img2:'',
        nome1_img3:'',
        nome2_img3:'',
        nome3_img3:'',
        nome_certo_img1:'',
        nome_certo_img2:'',
        nome_certo_img3:'',
        
    }


   async handleSubmit(){
       
       const payload=JSON.parse(localStorage.getItem('__userKey'))
       const token=payload.token
       const user_id=payload.id


       const {url_img1, url_img2, url_img3, nome1_img1,
         nome1_img2, nome1_img3, nome2_img1,nome2_img2,nome2_img3
         ,nome3_img1,nome3_img2,nome3_img3, img1,img2,img3,game_name,
         nome_certo_img1,nome_certo_img2,nome_certo_img3
        } = this.state


         const formData = new FormData()
         formData.append("game_name", game_name)
         formData.append("user_id", user_id)
         formData.append("url_img1", img1,url_img1)
         formData.append("url_img2", img2,url_img2)
         formData.append("url_img3", img3,url_img3)
         formData.append("nome1_img1", nome1_img1)
         formData.append("nome2_img1", nome2_img1)
         formData.append("nome3_img1", nome3_img1)
         formData.append("nome1_img2", nome1_img2)
         formData.append("nome2_img2", nome2_img2)
         formData.append("nome3_img2", nome3_img2)
         formData.append("nome1_img3", nome1_img3)
         formData.append("nome2_img3", nome2_img3)
         formData.append("nome3_img3", nome3_img3)
         formData.append("nome_certo_img1", nome_certo_img1)
         formData.append("nome_certo_img1", nome_certo_img2)
         formData.append("nome_certo_img1", nome_certo_img3)

        //  for (var value of formData.values()) {
        //     console.log(value); 
        //  }
        api.defaults.headers.common['Authorization'] = `Token ${token}`
        await api.post("GamesCreated/",formData)
            .then(res=>{
                alert('Jogo criado com sucesso') 
                this.props.history.push('/GamesCreated')

            })
            .catch(err=>{
                alert('Erro')
                console.log(err.response)
            })
   }

    render(){
        const { games } = this.state
        const {url_img1, url_img2, url_img3, nome1_img1,
            nome1_img2, nome1_img3, nome2_img1,nome2_img2,nome2_img3
            ,nome3_img1,nome3_img2,nome3_img3, img1,img2,img3,game_name,
            nome_certo_img1,nome_certo_img2,nome_certo_img3
           } = this.state
        
        return(
            <div className='d-flex flex-column'>
                <Nav />

                <div className='mt-3 d-flex flex-column jogoscriados'>
                 <h1 className='text-center mt-2 mb-2'>Crie um jogo</h1>
                 <p className='txt text-muted text-center mt-2 mb-4'>Preencha todos os campos</p>

<div className='d-flex flex-column m-3'>
<input 
class="form-control ml-2 mr-2 mb-4" 
type="text"   
placeholder='Nome do jogo'
onChange={e=>
    {
        this.setState({game_name:e.target.value})
  
}}
/>
    
                   <div class="custom-file">
        <input 
        type="file"
         class="custom-file-input" 
         id="customFile"
         onChange={e=>
            {
                this.setState({url_img1:e.target.files[0].name})
                this.setState({img1:e.target.files[0]})
        }}
         />
        <label class="custom-file-label" for="customFile">Upload da primeira imagem</label>
                </div>
            

                <div className='d-md-flex flex-row mb-3 content-createGame'>
                <input 
class="form-control  m-2" 
onChange={e=>this.setState({nome1_img1:e.target.value})}
type='text' placeholder='1 opção de nome'
/>
                <input 
class="form-control m-2" 
onChange={e=>this.setState({nome2_img1:e.target.value})}
type='text' placeholder='2 opção de nome'
/>
                <input 
class="form-control m-2" 
onChange={e=>this.setState({nome3_img1:e.target.value})}
type='text' placeholder='3 opção de nome'
/>
                <input 
class="form-control m-2" 
onChange={e=>this.setState({nome_certo_img1:e.target.value})}
type='text' placeholder='Qual o nome correto?'
/>
                 
                 
                </div>

                <div class="custom-file">
        <input 
        type="file"
         class="custom-file-input" 
         id="customFile"
         onChange={e=>{
            this.setState({url_img2:e.target.files[0].name})
            this.setState({img2:e.target.files[0]})

            
        }}
         />
        <label class="custom-file-label" for="customFile">Upload da segunda imagem</label>
                </div>
           
                <div className='d-md-flex flex-row mb-3 content-createGame'>
                <input 
class="form-control m-2" 
onChange={e=>this.setState({nome1_img2:e.target.value})}
type='text' placeholder='1 opção de nome'
/>
                <input 
class="form-control m-2" 
onChange={e=>this.setState({nome2_img2:e.target.value})}
type='text' placeholder='2 opção de nome'
/>
                <input 
class="form-control m-2" 
onChange={e=>this.setState({nome3_img2:e.target.value})}
type='text' placeholder='3 opção de nome'
/>
                <input 
class="form-control m-2" 
onChange={e=>this.setState({nome_certo_img2:e.target.value})}
type='text' placeholder='Qual o nome correto?'
/>

                   
                </div>

                <div class="custom-file">
        <input 
        type="file"
         class="custom-file-input" 
         id="customFile"
         onChange={e=>{
            this.setState({url_img3:e.target.files[0].name})
            this.setState({img3:e.target.files[0]})
        }}
         />
        <label class="custom-file-label" for="customFile">Upload da terceira imagem</label>
                </div>
        
                <div className='d-md-flex flex-row mb-3'>
                <input 
class="form-control m-2" 
onChange={e=>this.setState({nome1_img3:e.target.value})}
type='text' placeholder='1 opção de nome'
/>
                <input 
class="form-control m-2" 
onChange={e=>this.setState({nome2_img3:e.target.value})}
type='text' placeholder='2 opção de nome'
/>
                <input 
class="form-control m-2" 
onChange={e=>this.setState({nome3_img3:e.target.value})}
type='text' placeholder='3 opção de nome'
/>
                <input 
class="form-control m-2" 
onChange={e=>this.setState({nome_certo_img3:e.target.value})}
type='text' placeholder='Qual o nome correto?'
/>
                </div>

               
<button
className='button_alternativa align-self-center mt-2'
onClick={e=>{
    if(img1 !=='' && img2 !=='' && img3 !==''){
        if(nome1_img1=== nome_certo_img1|| nome2_img1===nome_certo_img1 || nome3_img1 === nome_certo_img1){

            if(nome1_img2=== nome_certo_img2 || nome2_img2===nome_certo_img2 || nome3_img2 === nome_certo_img2){
                if(nome1_img3=== nome_certo_img3 || nome2_img3===nome_certo_img3 || nome3_img3 === nome_certo_img3){
                        if(nome1_img1 !== nome2_img1 && nome1_img1 !== nome1_img1 !==nome1_img3 && nome2_img1 !== nome3_img1){
                           if(nome1_img2 !== nome2_img2 && nome1_img2 !== nome1_img2 !==nome1_img2 && nome2_img2 !== nome3_img2){
                                if(nome1_img3 !== nome2_img3 && nome1_img3 !== nome1_img3 !==nome1_img3 && nome2_img3 !== nome3_img3){
                                    this.handleSubmit()
                                }else{
                                    alert('Tem nomes repetidos na terceira imagem, por favor corrija')
                                }
                           }else{
                               alert('Tem nomes repetidos na segunda imagem, por favor corrija')
                           }
                        }else{
                            alert('Tem nomes repetidos na primeira imagem, por favor corrija')
                        }
                }else{
                    alert('A opção correta pra nome da terceira imagem não confere')
                }
            }else{
                alert('A opção correta pra nome da segunda imagem não confere')
            }
    
        }else{
            alert('A opção correta pra nome da primeira imagem não confere')
        }
    }else{
        alert('Faça upload de todas imagens')
    }
}}
>
    Criar
</button>
</div>
</div>
            </div>
        )
    }
}