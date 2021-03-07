import axios from 'axios'




export default function postUser(data) {
    axios.post('https://60415a34f34cf600173c9cf5.mockapi.io/api/vitorfelicio/users', data)
        .then(function (response) {
            console.log(response);
            alert("Obrigado pela sua participação!")
        })
        .catch(function (error) {
            console.log(error);
            alert("Ops, ocorrou algum problema, tente novamente!")
        });
}

