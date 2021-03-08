import React, { useEffect, useState } from 'react'
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage, } from 'formik';
import { LastMessage, MessageBornDate, MessageCity, MessageEmail, MessageName } from './Message';
import postUser, { getStates } from "../api/api";
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

    // LÓGICA DA LIMITAÇÃO DA DATA DE NASCIMENTO, SENDO MÁXIMO PARA DIA ATUAL

    useEffect(() => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("datefield").setAttribute("max", today);

    })

    //ADICIONANDO POSSIBILIDADE DE LIBERAR PRÓXIMO STEP COM "ENTER"

    useEffect(() => {
        document.addEventListener('keydown', (event) => {

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

    const indexList = [
        { id: 1, },
        { id: 2, },
        { id: 3, },
        { id: 4, },
        { id: 5, }
    ]
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

    //AUTOCOMPLETE DO INPUT CIDADE E ESTADO (LÓGICA NO COMPONENTE API)

    const [uf, setUf] = useState([]);

    useEffect(() => {
        getStates
            .then(res => {
                setUf(res.data);
                console.log(res.data[0].sigla);

            })
    });

    function createUfOption(uf) {
        return (
            <option key={uf.id} value={uf.sigla}>{uf.sigla}</option>
        )
    }

    const [city, setCity] = useState([]);

    useEffect(() => {
        const selectStates = document.getElementById('uf');
        const selectCities = document.getElementById('city');

        if (selectStates.value) {
            selectStates.addEventListener('change', () => {

                let chosenState = uf.filter(obj => (obj.sigla === selectStates.value))

                axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${chosenState[0].id}/municipios`)
                    .then(res => {
                        selectCities.removeAttribute('disabled');
                        setCity(res.data);
                    })
            })
        }
    }, [uf])

    function createCitiesOption(city) {
        return (
            <option key={city.id} value={city.nome}>{city.nome}</option>
        )
    }

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
                    initialValues={{ name: '', uf: '', city: '', bornDate: '', email: '', rating: 0 }}
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
                                        data-testid="form-fieldName"
                                        placeholder="Nome e sobrenome"
                                        type="input"
                                        name="name"
                                        className={`inputComponent ${errors.name && touched.name && "errorField"}`}
                                    />
                                    <button data-testid="form-btnName" type="button" onClick={!errors.name && values.name ? nextMessageName : null}><i className="fas fa-play fa-2x" /></button>
                                    <div className="error"> <ErrorMessage name="name" /></div>
                                </div>
                            </div>


                            <div className="stepContainer" data-testid="form-nextStepCity" style={isNameSubmitted ? { opacity: 1 } : null}>
                                <MessageCity
                                    personName={values.name}
                                />
                                <div className="inputContainer">
                                    <div className="bubble bubble-bottom-right">
                                        <Field
                                            data-testid="form-fieldUf"
                                            id="uf"
                                            as="select"
                                            name="uf"
                                            className={`inputComponent ${errors.uf && touched.uf && "errorField"}`}
                                        >
                                            {uf.map(createUfOption)}

                                        </Field>
                                        <Field
                                            data-testid="form-fieldCity"
                                            disabled
                                            id="city"
                                            as="select"
                                            name="city"
                                            className={`inputComponent ${errors.city && touched.city && "errorField"}`}
                                        >
                                            {city.map(createCitiesOption)}
                                        </Field>

                                        <button data-testid="form-btnCity" type="button" onClick={!errors.uf && values.uf ? nextMessageCity : null}><i className="fas fa-play fa-2x" /></button>
                                        <div className="error"> <ErrorMessage name="uf" /></div>
                                    </div>
                                </div>
                            </div>

                            <div className="stepContainer" data-testid="form-nextStepBorn" style={isCitySubmitted ? { opacity: 1 } : null}>
                                <MessageBornDate />
                                <div className="inputContainer">
                                    <div className="bubble bubble-bottom-right">
                                        <Field
                                            id="datefield"
                                            max='2000-13-13'
                                            data-testid="form-fieldDate"
                                            placeholder="00/00/0000"
                                            type="date"
                                            name="bornDate"
                                            className={`inputComponent ${errors.bornDate && touched.bornDate && "errorField"}`}
                                        />
                                        <button data-testid="form-btnDate" type="button" onClick={!errors.bornDate && values.bornDate ? nextMessageBorndate : null}><i className="fas fa-play fa-2x" /></button>
                                        <div className="error"> <ErrorMessage name="bornDate" /></div>
                                    </div>

                                </div>
                            </div>

                            <div className="stepContainer" data-testid="form-nextStepEmail" style={isBorndateSubmitted ? { opacity: 1 } : null}>
                                <MessageEmail />
                                <div className="inputContainer">
                                    <div className="bubble bubble-bottom-right">
                                        <Field
                                            data-testid="form-fieldEmail"
                                            placeholder="email"
                                            type="email"
                                            name="email"
                                            className={`inputComponent ${errors.email && touched.email && "errorField"}`}

                                        />

                                        <button data-testid="form-btnEmail" type="button" onClick={!errors.email && values.email ? nextMessageEmail : null}><i className="fas fa-play fa-2x" /></button>
                                        <div className="error"> <ErrorMessage name="email" /></div>
                                    </div>
                                </div>
                            </div>

                            <div className="stepContainer" data-testid="form-nextStepRating" style={isEmailSubmitted ? { opacity: 1 } : null}>
                                <LastMessage />
                                <div className="inputContainer">
                                    <div className="bubble bubble-bottom-right">

                                        {indexList.map((index) => {
                                            return (
                                                <RatingIcon
                                                    key={index.id}
                                                    index={index.id}
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
                                {isEmailSubmitted && (<button disabled={isSubmitting} type="submit">Salvar</button>)}

                            </div>

                        </Form>
                    )}
                </Formik>
            </section>


        </div>
    )

}