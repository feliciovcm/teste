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
            changePage.innerHTML = "<header><img src='https://workalove.com/wp-content/uploads/2021/02/capa-workalove-ok.webp' alt='workalove' /></header><h1> Muito obrigado pela sua participação <img src='images/smiling.svg' alt='emoji' /></h1>";
        })
}


// LÓGICA DO INPUT DE AUTOCOMPLETE DE ESTADOS E CIDADES

export function getStatesAndCIties() {
    const selectStates = document.getElementById('uf');
    const selectCities = document.getElementById('city');


    axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => (res.data))
        .catch(error => {
            // handle error
            console.log(error);
        })
        .then(states => {
            states.map(state => {
                const option = document.createElement('option');

                option.setAttribute('value', state.sigla);
                option.textContent = state.sigla;

                selectStates.appendChild(option);

                return '';
            })
            selectStates.addEventListener('change', () => {

                let nodesSelectCities = selectCities.childNodes;
                [...nodesSelectCities].map(node => node.remove());

                let state = selectStates.options[selectStates.selectedIndex].value;
                if (state) {
                    let chosenState = states.filter(obj => {
                        return obj.sigla === state
                    })
                    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${chosenState[0].id}/municipios`)
                        .then(response => (response.data))
                        .catch(err => {
                            // handle error
                            console.log(err);
                        })
                        .then(cities => {
                            selectCities.removeAttribute('disabled');

                            cities.map(city => {
                                const cityOption = document.createElement('option');

                                cityOption.textContent = city.nome;

                                selectCities.appendChild(cityOption);

                                return ''
                            });
                        })
                }

            });
        })
}