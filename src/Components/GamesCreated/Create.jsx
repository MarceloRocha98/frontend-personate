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
        
    }


   async handleSubmit(){
       
       const payload=JSON.parse(localStorage.getItem('__userKey'))
       const token=payload.token
       const user_id=payload.id


       const {url_img1, url_img2, url_img3, nome1_img1,
         nome1_img2, nome1_img3, nome2_img1,nome2_img2,nome2_img3
         ,nome3_img1,nome3_img2,nome3_img3, img1,img2,img3,game_name} = this.state


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

        //  for (var value of formData.values()) {
        //     console.log(value); 
        //  }
        api.defaults.headers.common['Authorization'] = `Token ${token}`
        await api.post("GamesCreated/",formData)
            .then(res=>{
                alert('sucesso')
            })
            .catch(err=>{
                alert('Erro')
                console.log(err.response)
            })
   }

    render(){
        const { games } = this.state
        
        return(
            <div className='d-flex flex-column'>
                <Nav />

                <div className='mt-3 d-flex flex-column jogoscriados'>
                   Criar jogo

            <input
             type="text"
             placeholder='nome do jogo'
            onChange={e=>
                {
                    this.setState({game_name:e.target.value})
              
            }}
            ></input>
            <input
             type="file"
            onChange={e=>
                {
                    this.setState({url_img1:e.target.files[0].name})
                    this.setState({img1:e.target.files[0]})
            }}
            ></input>

                <div className='d-flex flex-row'>
                    <input
                    onChange={e=>this.setState({nome1_img1:e.target.value})}
                     type='text' placeholder='1 opção de nome'></input>
                    <input
                     onChange={e=>this.setState({nome2_img1:e.target.value})}
                     type='text' placeholder='2 opção de nome'></input>
                    <input 
                     onChange={e=>this.setState({nome3_img1:e.target.value})}
                    type='text' placeholder='3 opção de nome'></input>
                </div>

            <input 
            type="file"
            onChange={e=>{
                this.setState({url_img2:e.target.files[0].name})
                this.setState({img2:e.target.files[0]})

                
            }}
            ></input>
                <div className='d-flex flex-row'>
                    <input
                     onChange={e=>this.setState({nome1_img2:e.target.value})}
                    type='text' placeholder='1 opção de nome'></input>
                    <input
                     onChange={e=>this.setState({nome2_img2:e.target.value})}
                     type='text' placeholder='2 opção de nome'></input>
                    <input
                     onChange={e=>this.setState({nome3_img2:e.target.value})}
                    type='text' placeholder='3 opção de nome'></input>
                </div>

            <input 
            type="file"
            onChange={e=>{
                this.setState({url_img3:e.target.files[0].name})
                this.setState({img3:e.target.files[0]})
            }}
            ></input>
                <div className='d-flex flex-row'>
                    <input
                     onChange={e=>this.setState({nome1_img3:e.target.value})}
                    type='text' placeholder='1 opção de nome'></input>
                    <input 
                     onChange={e=>this.setState({nome2_img3:e.target.value})}
                    type='text' placeholder='2 opção de nome'></input>
                    <input
                     onChange={e=>this.setState({nome3_img3:e.target.value})}
                    type='text' placeholder='3 opção de nome'></input>
                </div>

                </div>
<button
onClick={e=>this.handleSubmit()}
>
    Criar
</button>

            </div>
        )
    }
}