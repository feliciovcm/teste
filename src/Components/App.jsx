import axios from 'axios';
import React, { useState } from 'react'
import * as yup from 'yup';
import { Formik, Field, Form, ErrorMessage, } from 'formik';
import { MessageBornDate, MessageCity, MessageEmail, MessageName } from './Message';
import RatingIcon from "./Rating"


export default function App() {


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


    function postUser(data) {
        axios.post('https://60415a34f34cf600173c9cf5.mockapi.io/api/vitorfelicio/users', data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const SignupSchema = yup.object().shape({

        name: yup.string()
            .min(8, 'Must be at least 8 characters')
            .required('Username is required')
            .matches(
                /^[a-zA-Z0-9]+$/,
                'Cannot contain special characters or spaces'
            ),
        city: yup.string()
            .min(2, 'Too Short!')
            .max(70, 'Too Long!')
            .required('Required'),
        bornDate: yup.date()
            .required('Required'),
        email: yup.string()
            .email('Invalid email')
            .required('Required'),
        rating: yup.string()
            .required('Required'),

    });


    // Rating Calculation

    const [rating, setRating] = React.useState(0);
    const [hoverRating, setHoverRating] = React.useState(0);
    const onMouseEnter = (index) => {
        setHoverRating(index);
    };
    const onMouseLeave = () => {
        setHoverRating(0);
    };
    const onSaveRating = (index) => {
        setRating(index);
    };

    return (


        <div className="container">
            <header>
                <img src="https://workalove.com/wp-content/uploads/2021/02/capa-workalove-ok.webp" alt="workalove" />

            </header>
            <section>
                <Formik
                    initialValues={{ name: '', city: '', bornDate: '', email: '', rating: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        // make async call
                        postUser(data)

                        setSubmitting(false)
                    }}>
                    {({ values, isSubmitting, errors, touched }) => (
                        <Form>
                            <MessageName />
                            <Field
                                placeholder="Nome Completo"
                                type="input"
                                name="name"
                                className={errors.name && touched.name && "errorField"}

                            />
                            <div className="error"> <ErrorMessage name="name" /></div>
                            <button type="button" onClick={!errors.name ? nextMessageName : null}>Submit</button>

                            {isNameSubmitted &&
                                <>
                                    <MessageCity
                                        personName={values.name}
                                    />
                                    <Field
                                        placeholder="Cidade/Estado"
                                        type="input"
                                        name="city"
                                        className={errors.city && touched.city && "errorField"}
                                    />
                                    <div className="error"> <ErrorMessage name="city" /></div>
                                    <button type="button" onClick={!errors.city ? nextMessageCity : null}>Submit</button>
                                </>
                            }
                            {isCitySubmitted &&
                                <>
                                    <MessageBornDate />
                                    <Field
                                        placeholder="00/00/0000"
                                        type="date"
                                        name="bornDate"
                                        className={errors.bornDate && touched.bornDate && "errorField"}
                                    />
                                    <div className="error"> <ErrorMessage name="bornDate" /></div>
                                    <button type="button" onClick={!errors.bornDate ? nextMessageBorndate : null}>Submit</button>
                                </>

                            }
                            {isBorndateSubmitted &&
                                <>
                                    <MessageEmail />
                                    <Field
                                        placeholder="email"
                                        type="email"
                                        name="email"
                                        className={errors.email && touched.email && "errorField"}
                                    />
                                    <div> <ErrorMessage className="error" name="email" /></div>
                                    <button type="button" onClick={!errors.email ? nextMessageEmail : null}>Submit</button>
                                </>
                            }
                            {isEmailSubmitted &&
                                <>
                                    <div className="messageContainer">
                                        Você finalizou. Faça uma valiação:
                                </div>
                                    <div className="box flex">
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
                                    </div>


                                    <button disabled={isSubmitting} type="submit">Submit</button>
                                </>
                            }
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                            <pre>{JSON.stringify(errors, null, 2)}</pre>
                        </Form>
                    )}
                </Formik>
            </section>
        </div>
    )
}