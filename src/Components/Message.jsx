import React from "react";

export function MessageName() {
    return (
        <div className="messageContainer">
            <img src="images/smiling.svg" alt="emoji" />
            <div className="bubble bubble-bottom-left">

                Olá, eu sou Chatnilson, tudo bem? Para começarmos, preciso saber seu nome.
            </div>
        </div>
    )
}

export function MessageCity(props) {
    return (
        <div className="messageContainer">
            <img src="images/happy.svg" alt="emoji" />
            <div className="bubble bubble-bottom-left">
                Que satisfação, {props.personName}. Agora que sei seu nome, qual a cidade e estado que você mora?
            </div>
        </div>
    )
}

export function MessageBornDate() {
    return (
        <div className="messageContainer">
            <img src="images/grinning.svg" alt="emoji" />
            <div className="bubble bubble-bottom-left">
                Legal, agora que sabemos sua cidade e estado, quando foi que você nasceu?
            </div>
        </div>
    )
}

export function MessageEmail() {
    return (
        <div className="messageContainer">
            <img src="images/happier.svg" alt="emoji" />
            <div className="bubble bubble-bottom-left">
                Agora me fala teu email, por gentileza.
            </div>
        </div>
    )
}
export function LastMessage() {
    return (
        <div className="messageContainer">
            <img src="images/party.svg" alt="emoji" />
            <div className="bubble bubble-bottom-left">
                Você finalizou. Faça uma valiação:
            </div>
        </div>
    )
}