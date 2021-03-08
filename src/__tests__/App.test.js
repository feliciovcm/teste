import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import App from "../Components/App";
import { act } from "react-dom/test-utils";

//Describe is a test suite
describe("Testing if App will render all messages and inputs", () => {

    // Testando renderização do segundo conjunto de messagem e input
    it("Should render CITY AND STATE input, when name field is filled with no errors", async () => {

        //renderizar o app
        const { getByTestId } = render(<App />);

        // Atribuindo a const fieldNode como sendo o primeiro input, sendo esse o input de Nome e Sobrenome
        const fieldNode = await waitFor(() => getByTestId('form-fieldName'));

        // Digitar no input uma palavra com mais de 8 caracteres. "Testando Aplicação" possui mais que 8 caracteres.
        await act(async () => {
            fireEvent.change(
                fieldNode, { target: { value: 'Testando aplicação' } }
            );
        });

        // Checar se realmente a palavra foi atribuida ao valor do input
        expect(fieldNode.value).toEqual('Testando aplicação');

        // Atribuindo a const nextStep como sendo a <div> em volta da próxima messagem e input a aparecerem na tela
        const nextStep = await waitFor(() => getByTestId('form-nextStepCity'))

        // Atribuindo a const btnNode como sendo o botão ao lado do input "Nome e Sobrenome", 
        // definido como fieldNode, logo acima
        const btnNode = await waitFor(() => getByTestId('form-btnName'));

        // Executar um evento de click nesse botão
        await act(async () => {
            fireEvent.click(btnNode);
        });

        // Atribuir a const style, o css da <div> correspondente ao nextStep
        const style = window.getComputedStyle(nextStep);

        // Essa <div>, antes do click possui opcidade = 0, porém, após o click é esperado que opacidade = 1; 
        // Mostrando assim a proxima messagem e input
        expect(style.opacity).toBe("1");


    });


    it("Should not render CITY AND STATE input, when name field validation error is triggered", async () => {

        //renderizar o app
        const { getByTestId } = render(<App />);

        // Atribuindo a const fieldNode como sendo o primeiro input, sendo esse o input de Nome e Sobrenome
        const fieldNode = await waitFor(() => getByTestId('form-fieldName'));

        // Digitar no input uma palavra com MENOS de 8 caracteres. "Teste" possui menos que 8 caracteres.
        await act(async () => {
            fireEvent.change(
                fieldNode, { target: { value: 'Teste' } }
            );
        });

        // Checar se realmente a palavra foi atribuida ao valor do input
        expect(fieldNode.value).toEqual('Teste');

        // Atribuindo a const nextStep como sendo a <div> em volta da próxima messagem e input a aparecerem na tela
        const nextStep = await waitFor(() => getByTestId('form-nextStepCity'))

        // Atribuindo a const btnNode como sendo o botão ao lado do input "Nome e Sobrenome", 
        // definido como fieldNode, logo acima
        const btnNode = await waitFor(() => getByTestId('form-btnName'));

        // Executar um evento de click nesse botão
        await act(async () => {
            fireEvent.click(btnNode);
        });

        // Atribuir a const style, o css da <div> correspondente ao nextStep
        const style = window.getComputedStyle(nextStep);

        // Como é esperado que ocorra um erro de validação do valor do input ("Menos que 8 caracteres"), o click no
        //botão, não vai disparar o evento no qual mudará a opacidade da <div> de 0 para 1.
        // Logo, espera-se opacidade igual a 0.
        expect(style.opacity).toBe("");


    });

    it("Should render BORN DATE input when UF and City has been chosen", async () => {

        //renderizar o app
        const { getByTestId } = render(<App />);

        // Atribuindo a const fieldNode como sendo o primeiro input, sendo esse o input de UF e CITY
        const fieldNodeUf = await waitFor(() => getByTestId('form-fieldUf'));
        const fieldNodeCity = await waitFor(() => getByTestId('form-fieldCity'));

        // Atribuir um HTML para os inputs do tipo select.
        await act(async () => {
            fireEvent.change(
                fieldNodeUf, { target: { innerHTML: '<option>AM</option>' } }
            );
        });

        await act(async () => {
            fireEvent.change(
                fieldNodeCity, { target: { innerHTML: '<option>Alvarães</option>' } }
            );
        });

        // Atribuindo a const nextStep como sendo a <div> em volta da próxima messagem e input a aparecerem na tela
        const nextStep = await waitFor(() => getByTestId('form-nextStepBorn'))

        // Atribuindo a const btnNode como sendo o botão ao lado do input "UF e CIDADE", 
        // definido como fieldNode, logo acima
        const btnNode = await waitFor(() => getByTestId('form-btnCity'));

        // Executar um evento de click nesse botão
        await act(async () => {
            fireEvent.click(btnNode);
        });

        // Atribuir a const style, o css da <div> correspondente ao nextStep
        const style = window.getComputedStyle(nextStep);

        // Essa <div>, antes do click possui opcidade = 0, porém, após o click é esperado que opacidade = 1; 
        // Mostrando assim a proxima messagem e input
        expect(style.opacity).toBe("1");


    });

    it("Should not render BORN DATE input when an validation error is triggered", async () => {

        //renderizar o app
        const { getByTestId } = render(<App />);

        // Atribuindo a const fieldNode como sendo o primeiro input, sendo esse o input de UF e CITY
        const fieldNodeUf = await waitFor(() => getByTestId('form-fieldUf'));
        const fieldNodeCity = await waitFor(() => getByTestId('form-fieldCity'));

        // Atribuir um HTML empty string para os inputs do tipo select.
        await act(async () => {
            fireEvent.change(
                fieldNodeUf, { target: { innerHTML: '' } }
            );
        });

        await act(async () => {
            fireEvent.change(
                fieldNodeCity, { target: { innerHTML: '' } }
            );
        });

        // Atribuindo a const nextStep como sendo a <div> em volta da próxima messagem e input a aparecerem na tela
        const nextStep = await waitFor(() => getByTestId('form-nextStepBorn'))

        // Atribuindo a const btnNode como sendo o botão ao lado do input "UF e CIDADE", 
        // definido como fieldNode, logo acima
        const btnNode = await waitFor(() => getByTestId('form-btnCity'));

        // Executar um evento de click nesse botão
        await act(async () => {
            fireEvent.click(btnNode);
        });

        // Atribuir a const style, o css da <div> correspondente ao nextStep
        const style = window.getComputedStyle(nextStep);

        // Como é esperado que ocorra um erro de validação do valor do input ("Necessário escolher um estado e uma cidade"), 
        //o click no botão, não vai disparar o evento no qual mudará a opacidade da <div> de 0 para 1.
        // Logo, espera-se opacidade igual a 0.
        expect(style.opacity).toBe("");


    });

    it("Should render EMAIL input, when BORN DATE has been chosen", async () => {

        //renderizar o app
        const { getByTestId } = render(<App />);

        // Atribuindo a const fieldNode como sendo o input, sendo esse o input de Data de nascimento
        const fieldNode = await waitFor(() => getByTestId('form-fieldDate'));

        // Atribiur ao valor do input uma data no modelo semelhante ao módelo de quando essa é escolhida.
        await act(async () => {
            fireEvent.change(
                fieldNode, { target: { value: '2021-03-07' } }
            );

        });

        // Checar se o valor realmente foi atribuido
        expect(fieldNode.value).toEqual('2021-03-07');

        // Atribuindo a const nextStep como sendo a <div> em volta da próxima messagem e input a aparecerem na tela
        const nextStep = await waitFor(() => getByTestId('form-nextStepEmail'))

        // Atribuindo a const btnNode como sendo o botão ao lado do input da Data de nascimento, 
        // definido como fieldNode, logo acima
        const btnNode = await waitFor(() => getByTestId('form-btnDate'));

        // Executar um evento de click nesse botão
        await act(async () => {
            fireEvent.click(btnNode);
        });

        // Atribuir a const style, o css da <div> correspondente ao nextStep
        const style = window.getComputedStyle(nextStep);

        // Essa <div>, antes do click possui opcidade = 0, porém, após o click é esperado que opacidade = 1; 
        // Mostrando assim a proxima messagem e input
        expect(style.opacity).toBe("1");


    });


    it("Should not render EMAIL input, when BORN DATE field validation error is triggered", async () => {

        //renderizar o app
        const { getByTestId } = render(<App />);

        // Atribuindo a const fieldNode como sendo o input, sendo esse o input de Data de nascimento
        const fieldNode = await waitFor(() => getByTestId('form-fieldDate'));

        //Como não foi atribuido nenhum valor ao campo, espera-se que o valor seja uma empty string
        expect(fieldNode.value).toEqual('');


        // Atribuindo a const nextStep como sendo a <div> em volta da próxima messagem e input a aparecerem na tela
        const nextStep = await waitFor(() => getByTestId('form-nextStepEmail'))

        // // Atribuindo a const btnNode como sendo o botão ao lado do input "Born Date", 
        // // definido como fieldNode, logo acima
        const btnNode = await waitFor(() => getByTestId('form-btnDate'));

        // // Executar um evento de click nesse botão

        await act(async () => {
            fireEvent.click(btnNode);
        });

        // Atribuir a const style, o css da <div> correspondente ao nextStep
        const style = window.getComputedStyle(nextStep);

        // Como é esperado que ocorra um erro de validação do valor do input (Não foi escolhida nenhuma data), o click no
        //botão, não vai disparar o evento no qual mudará a opacidade da <div> de 0 para 1.
        // Logo, espera-se opacidade igual a 0.
        expect(style.opacity).toBe("");

    });

    it("Should render RATING input, when EMAIL field is filled with no errors", async () => {

        //renderizar o app
        const { getByTestId } = render(<App />);

        // Atribuindo a const fieldNode como sendo o primeiro input, sendo esse o input de Email
        const fieldNode = await waitFor(() => getByTestId('form-fieldEmail'));

        // Como o input é do tipo email é necessario atribuir um valor a ele, que satisfaça as características de um email.
        await act(async () => {
            fireEvent.change(
                fieldNode, { target: { value: 'teste@teste.com' } }
            );
        });

        // Checar se realmente a palavra foi atribuida ao valor do input
        expect(fieldNode.value).toEqual('teste@teste.com');

        // Atribuindo a const nextStep como sendo a <div> em volta da próxima messagem e input a aparecerem na tela
        const nextStep = await waitFor(() => getByTestId('form-nextStepRating'))

        // Atribuindo a const btnNode como sendo o botão ao lado do input "Email", 
        // definido como fieldNode, logo acima
        const btnNode = await waitFor(() => getByTestId('form-btnEmail'));

        // Executar um evento de click nesse botão
        await act(async () => {
            fireEvent.click(btnNode);
        });

        // Atribuir a const style, o css da <div> correspondente ao nextStep
        const style = window.getComputedStyle(nextStep);

        // Essa <div>, antes do click possui opcidade = 0, porém, após o click é esperado que opacidade = 1; 
        // Mostrando assim a proxima messagem e input
        expect(style.opacity).toBe("1");


    });


    it("Should not render RATING input, when EMAIL field has a validation error", async () => {

        //renderizar o app
        const { getByTestId } = render(<App />);

        // Atribuindo a const fieldNode como sendo o primeiro input, sendo esse o input de Email
        const fieldNode = await waitFor(() => getByTestId('form-fieldEmail'));

        // Como o input é do tipo email é necessario atribuir um valor a ele, que satisfaça as características de um email.
        await act(async () => {
            fireEvent.change(
                fieldNode, { target: { value: '' } }
            );
        });

        // Checar se realmente a palavra foi atribuida ao valor do input
        expect(fieldNode.value).toEqual('');

        // Atribuindo a const nextStep como sendo a <div> em volta da próxima messagem e input a aparecerem na tela
        const nextStep = await waitFor(() => getByTestId('form-nextStepRating'))

        // Atribuindo a const btnNode como sendo o botão ao lado do input "Email", 
        // definido como fieldNode, logo acima
        const btnNode = await waitFor(() => getByTestId('form-btnEmail'));

        // Executar um evento de click nesse botão
        await act(async () => {
            fireEvent.click(btnNode);
        });

        // Atribuir a const style, o css da <div> correspondente ao nextStep
        const style = window.getComputedStyle(nextStep);

        // Como é esperado que ocorra um erro de validação do valor do input (Email não válido), o click no
        //  botão, não vai disparar o evento no qual mudará a opacidade da <div> de 0 para 1.
        // Logo, espera-se opacidade igual a 0.
        expect(style.opacity).toBe("");

    });

})