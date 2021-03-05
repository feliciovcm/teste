import React from "react";

export function MessageName() {
    return (
        <div class="bubble bubble-bottom-left">

            Olá, eu sou Chatnilson, tudo bem? Para começarmos, preciso saber seu nome.
        </div>
    )
}

export function MessageCity(props) {
    return (
        <div className="messageContainer">
            Que satisfação, {props.personName}. Agora que sei seu nome, qual a cidade e estado que você mora?
        </div>
    )
}

export function MessageBornDate() {
    return (
        <div className="messageContainer">
            Legal, agora que sabemos sua cidade e estado. Quando foi que você nasceu?
        </div>
    )
}

export function MessageEmail() {
    return (
        <div className="messageContainer">
            Agora me fala teu email, por gentileza.
        </div>
    )
}
