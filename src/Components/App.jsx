import React, { useEffect, useState } from 'react'
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage, } from 'formik';
import { LastMessage, MessageBornDate, MessageCity, MessageEmail, MessageName } from './Message';
import postUser from "../api/api";
import RatingIcon from './Rating';
import axios from 'axios';





export default function App() {





    // CONTROLE DOS ESTADOS DOS STEPS DO CHAT

    const [isNameSubmitted, setIsNameSubmitted] = useState(false);

    const [isCitySubmitted, setIsCitySubmitted] = useState(false);

    const [isBorndateSubmitted, setIsBorndateSubmitted] = useState(false);

    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

    function nextMessageName() {
        setIsNameSubmitted(true)
    }

    function nextMessageCity() {
        setIsCitySubmitted(true)
    }

    function nextMessageBorndate() {
        setIsBorndateSubmitted(true)
    }

    function nextMessageEmail() {
        setIsEmailSubmitted(true)
    }





    //ADICIONANDO POSSIBILIDADE DE LIBERAR PRÓXIMO STEP COM "ENTER"

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            console.log(event);
            if (event.key === "Enter" && event.target.placeholder === "Nome e sobrenome" && event.target.value.length >= 8 && !isNameSubmitted) {
                nextMessageName();
            } else if (event.key === "Enter" && event.target.name === "city" && event.target.value.length >= 3) {
                nextMessageCity();
            } else if (event.key === "Enter" && event.target.nodeName === "INPUT" && event.target.type === "date" && event.target.value) {
                nextMessageBorndate();
            } else if (event.key === "Enter" && event.target.nodeName === "INPUT" && event.target.type === "email" && event.target.value) {
                nextMessageEmail();
            }


        })
    }, [isNameSubmitted, isEmailSubmitted, isBorndateSubmitted, isCitySubmitted]);


    // LÓGICA DO INPUT DE AVALIAÇÃO


    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const onMouseEnter = (index) => {
        setHoverRating(index);
    };
    const onMouseLeave = () => {
        setHoverRating(0);
    };
    const onSaveRating = (index) => {
        setRating(index);
    };

    //LOGICA DO AUTOCOMPLETE DO INPUT CIDADE E ESTADO

    useEffect(() => {
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
                                });
                            })
                    } else {
                        console.log('ops');
                    }

                });
            })

    }

    )

    //ESQUEMA DE VALIDAÇÃO DOS INPUTS

    const SignupSchema = yup.object().shape({

        name: yup.string()
            .min(8, 'Deve ter no mínimo 8 caracteres')
            .required('Nome do usuario é necessário'),
        uf: yup.string()
            .required('Necessário'),
        city: yup.string()
            .required('Necessário'),
        bornDate: yup.date()
            .required('Necessário'),
        email: yup.string()
            .email('Email inválido')
            .required('Necessário'),
        rating: yup.number()
            .min(1, 'Por favor, deixe uma avaliação!')
            .required('Necessário')
    });

    return (


        <div className="container">
            <header>
                <img src="https://workalove.com/wp-content/uploads/2021/02/capa-workalove-ok.webp" alt="workalove" />

            </header>
            <section>
                <Formik
                    initialValues={{ name: '', uf: '', city: '', bornDate: '', email: '', rating: '' }}
                    validationSchema={SignupSchema}

                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        // make async call
                        postUser(data);

                        setSubmitting(false);
                    }}>
                    {({ values, isSubmitting, errors, touched, }) => (

                        <Form>

                            <MessageName />
                            <div className="inputContainer">
                                <div className="bubble bubble-bottom-right">

                                    <Field
                                        placeholder="Nome e sobrenome"
                                        type="input"
                                        name="name"
                                        className={`inputComponent ${errors.name && touched.name && "errorField"}`}
                                    />
                                    <button type="button" onClick={!errors.name && values.name ? nextMessageName : null}><i className="fas fa-play fa-2x" /></button>
                                    <div className="error"> <ErrorMessage name="name" /></div>
                                </div>
                            </div>


                            <div className="stepContainer" style={isNameSubmitted ? { opacity: 1 } : null}>
                                <MessageCity
                                    personName={values.name}
                                />
                                <div className="inputContainer">
                                    <div className="bubble bubble-bottom-right">
                                        <Field
                                            id="uf"
                                            as="select"
                                            name="uf"
                                            className={`inputComponent ${errors.uf && touched.uf && "errorField"}`}
                                        >
                                            <option value="">UF</option>

                                        </Field>
                                        <Field
                                            disabled
                                            id="city"
                                            as="select"
                                            name="city"
                                            className={`inputComponent ${errors.city && touched.city && "errorField"}`}
                                        >
                                            <option value="">Cidade</option>
                                        </Field>

                                        <button type="button" onClick={!errors.uf && values.uf ? nextMessageCity : null}><i className="fas fa-play fa-2x" /></button>
                                        <div className="error"> <ErrorMessage name="uf" /></div>
                                    </div>
                                </div>
                            </div>

                            <div className="stepContainer" style={isCitySubmitted ? { opacity: 1 } : null}>
                                <MessageBornDate />
                                <div className="inputContainer">
                                    <div className="bubble bubble-bottom-right">
                                        <Field
                                            placeholder="00/00/0000"
                                            type="date"
                                            name="bornDate"
                                            className={`inputComponent ${errors.bornDate && touched.bornDate && "errorField"}`}
                                        />
                                        <button type="button" onClick={!errors.bornDate ? nextMessageBorndate : null}><i className="fas fa-play fa-2x" /></button>
                                        <div className="error"> <ErrorMessage name="bornDate" /></div>
                                    </div>

                                </div>
                            </div>

                            <div className="stepContainer" style={isBorndateSubmitted ? { opacity: 1 } : null}>
                                <MessageEmail />
                                <div className="inputContainer">
                                    <div className="bubble bubble-bottom-right">
                                        <Field
                                            placeholder="email"
                                            type="email"
                                            name="email"
                                            className={`inputComponent ${errors.email && touched.email && "errorField"}`}
                                        />

                                        <button type="button" onClick={!errors.email ? nextMessageEmail : null}><i className="fas fa-play fa-2x" /></button>
                                        <div className="error"> <ErrorMessage name="email" /></div>
                                    </div>
                                </div>
                            </div>

                            <div className="stepContainer" style={isEmailSubmitted ? { opacity: 1 } : null}>
                                <LastMessage />
                                <div className="inputContainer">
                                    <div className="bubble bubble-bottom-right">
                                        {[1, 2, 3, 4, 5].map((index) => {
                                            return (
                                                <RatingIcon

                                                    index={index}
                                                    rating={rating}
                                                    hoverRating={hoverRating}
                                                    onMouseEnter={onMouseEnter}
                                                    onMouseLeave={onMouseLeave}
                                                    onSaveRating={onSaveRating} />

                                            )
                                        })}
                                        <div className="error"> <ErrorMessage name="rating" /></div>
                                    </div>
                                    <Field
                                        type="input"
                                        name="rating"
                                        value={values.rating = rating}

                                        style={{ display: 'none' }}
                                    />

                                </div>

                                <button disabled={isSubmitting} type="submit">Salvar</button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </section>
        </div>
    )

}
