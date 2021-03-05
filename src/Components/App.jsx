import axios from 'axios';
import React, { useState } from 'react'
import * as yup from 'yup';


export default function App() {
    const [title, setTitle] = useState('')

    const [isNameSubmitted, setIsNameSubmitted] = useState(false);

    const [isCitySubmitted, setIsCitySubmitted] = useState(false);

    const [isBorndateSubmitted, setIsBorndateSubmitted] = useState(false);

    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

    function nextMessageName() {
        setTimeout(() => setIsNameSubmitted(true), 500)
    }

    function nextMessageCity() {
        setTimeout(() => setIsCitySubmitted(true), 500)
    }

    function nextMessageBorndate() {
        setTimeout(() => setIsBorndateSubmitted(true), 500)
    }

    function nextMessageEmail() {
        setTimeout(() => setIsEmailSubmitted(true), 500)
    }

    function submitForm(e) {
        let name = e.target[0].value;
        let city = e.target[2].value;
        let bornDate = e.target[4].value;
        let email = e.target[6].value;
        let data = { name, city, bornDate, email };



        let schema = yup.object().shape({
            name: yup.string().required(),
            city: yup.string().required(),
            bornDate: yup.date().required(),
            email: yup.string().email().required(),

        })

        schema.isValid({
            name: e.target[0].value,
            city: e.target[2].value,
            bornDate: e.target[4].value,
            email: e.target[6].value,
        }).then(valid => {
            if (valid) {
                console.log(data);
                postUser(data);
            }

        })

    }
    function postUser(data) {
        axios.post('https://60415a34f34cf600173c9cf5.mockapi.io/api/vitorfelicio/users', data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (



        <div className="container">

            <form onSubmit={e => {
                e.preventDefault();
                submitForm(e);
            }} >
                <>
                    <div className="messageContainer">
                        Olá, eu sou Chatnilson, tudo bem? Para começarmos, preciso saber seu nome.
            </div>
                    <input type="text" id="name" onChange={event => setTitle(event.target.value)} placeholder="seu nome" name="userName" />

                </>
                <button type="button" onClick={nextMessageName}>Submit</button>

                {isNameSubmitted &&
                    <>
                        <div className="messageContainer">
                            Que satisfação, {title}. Agora que sei seu nome, qual a cidade e estado que você mora?
                    </div>
                        <input type="text" placeholder="Cidade" name="userCity" />
                        <button type="button" onClick={nextMessageCity}>Submit</button>
                    </>
                }
                {isCitySubmitted &&
                    <>
                        <div className="messageContainer">
                            Legal, agora que sabemos sua cidade e estado. Quando foi que você nasceu?
                    </div>
                        <input type="date" placeholder="00/00/0000" name='userBornDate' />
                        <button type="button" onClick={nextMessageBorndate}>Submit</button>
                    </>
                }
                {isBorndateSubmitted &&
                    <>
                        <div className="messageContainer">
                            Agora me fala teu email, por gentileza.
                    </div>
                        <input type="email" placeholder="email" name='userEmail' />
                        <button type="button" onClick={nextMessageEmail}>Submit</button>
                    </>
                }
                {isEmailSubmitted &&
                    <>
                        <div className="messageContainer">
                            Você finalizou. Faça uma valiação:
                    </div>

                        <button type="submit">salvar</button>
                    </>
                }
            </form>
        </div>
    )
}