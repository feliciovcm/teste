import axios from 'axios'
const { REACT_APP_MY_ENV } = process.env;


//API DO POST REQUEST DO FORMULÁRIO

export default function postUser(data) {
    axios.post(REACT_APP_MY_ENV, data)
        .then((response) => {

            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
            alert("Ops, ocorrou algum problema, tente novamente!")
        })
        .then(() => {

            const changePage = document.getElementById('root');
            changePage.innerHTML = "<header><img src='https://workalove.com/wp-content/uploads/2021/02/capa-workalove-ok.webp' alt='workalove' /></header><div className='afterPost'><h1> Muito obrigado pela sua participação <img src='images/smiling.svg' alt='emoji' /></h1></div>";
        })
}


// API REQUEST DOS ESTADOS

export const getStates = axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados");

