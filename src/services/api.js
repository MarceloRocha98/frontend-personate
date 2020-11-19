import axios from 'axios'
import Cookies from 'js-cookie'

// function getCookie(name) {
//     var cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
// var csrftoken = getCookie('csrftoken');
var csrftoken = Cookies.get('csrftoken');

const api =axios.create({
    baseURL:'http://localhost:8000',
    headers:{'X-CSRFToken':csrftoken}
    // headers:{'HTTP_X_CSRFTOKEN':csrftoken}
    
})



export default api