
let divObrigado = document.querySelector('.div-obridado');

const dataInForm =JSON.parse(localStorage.getItem("formContact"));
document.addEventListener("DOMContentLoaded", () => {
    respData(dataInForm)
});
//

/*  */

function respData(data){
   divObrigado.innerHTML= `Sr./Sra. ${data.nome} ${data.sobrenome}, Muito obrigado pela preferência, recebemos a sua ${data.asunto} e brevemente entraremos em contacto consigo através do e-mail ${data.email} ou pelo telefone ${data.telf}.`;
}
