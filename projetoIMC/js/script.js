// var form = document.getElementById("formulario")
// form.addEventListener("submit", function (e) {
//     e.preventDefault()
//     var peso = parseFloat(document.getElementById("peso").value)
//     var altura = parseFloat(document.getElementById("altura").value)
//     var imc = ((peso / (altura * altura)).toFixed(2))

//     var resultado = document.getElementById("resultado")
//     var classificacao = ""
//     if (imc < 18.5) {
//         classificacao = "Abaixo do peso"
//     } else if (imc >= 18.5 && imc < 24.9) {
//         classificacao = "Peso normal"
//     } else if (imc >= 25 && imc < 29.9) {
//         classificacao = "Sobrepeso"
//     } else if (imc >= 30 && imc < 34.9) {
//         classificacao = "Obesidade grau 1"
//     } else if (imc >= 35 && imc < 39.9) {
//         classificacao = "Obesidade grau 2"
//     } else {
//         classificacao = "Obesidade grau 3"
//     }
//     resultado.innerHTML = `Seu IMC é ${imc} e sua classificação é: ${classificacao}`

//     document.getElementById("limpar") = function () {
//         document.getElementById("altura").value = ""
//         document.getElementById("peso").value = ""

//         resultado.innerHTML = ""
//     }
// })

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("formulario");
    const pesoInput = document.getElementById("peso");
    const alturaInput = document.getElementById("altura");
    const imcP = document.getElementById("imc");
    const classificacaoP = document.getElementById("classificacao");
    const limparBtn = document.getElementById("limpar");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const peso = parseFloat(pesoInput.value.replace(',', '.'));
        const altura = parseFloat(alturaInput.value.replace(',', '.'));

        if (!peso || !altura) {
            imcP.textContent = "Preencha peso e altura válidos.";
            classificacaoP.textContent = "";
            return;
        }

        const imc = peso / (altura * altura); // número para comparação
        const imcFixed = imc.toFixed(2); // string só para exibir

        let classificacao = "";
        if (imc < 18.5) {
            classificacao = "Abaixo do peso";
        } else if (imc >= 18.5 && imc < 25) {
            classificacao = "Peso normal";
        } else if (imc >= 25 && imc < 30) {
            classificacao = "Sobrepeso";
        } else if (imc >= 30 && imc < 35) {
            classificacao = "Obesidade grau 1";
        } else if (imc >= 35 && imc < 40) {
            classificacao = "Obesidade grau 2";
        } else {
            classificacao = "Obesidade grau 3";
        }

        imcP.textContent = `Seu IMC é ${imcFixed}`;
        classificacaoP.textContent = classificacao;
    });

    limparBtn.addEventListener("click", function () {
        alturaInput.value = "";
        pesoInput.value = "";
        imcP.textContent = "";
        classificacaoP.textContent = "";
    });
});