let btnFormulario = document.getElementById("btn-formulario");
let nome, sobrenome, email, telf, mensagem, asunto;

nome = document.querySelector("#in-nome");
sobrenome = document.querySelector("#in-sobrenome");
email = document.querySelector("#in-email");
telf = document.querySelector("#in-telefone");
mensagem = document.querySelector("#in-mensagem");
asunto = document.querySelectorAll("input[name=asunto]");

let data = {};

var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

/*** event */
btnFormulario.addEventListener("click", (e) => {
  data.nome = nome.value;
  data.sobrenome = sobrenome.value;
  data.email = email.value;
  data.telf = telf.value;
  data.mensagem = mensagem.value;
  data.asunto = [];
  asunto.forEach((element) => {
    if (element.checked) {
      data.asunto.push(element.value);
    }
  });

  if (verificarCampos(data)) {
    localStorage.setItem("formContact", JSON.stringify(data));
    window.open("../html/respage.html", "_self");
  }
});

/*  ** verificarCampos** */
function verificarCampos(data) {
  let regName = /^[a-zA-Z]+[a-zA-Z]+$/;
  let regEmail =
    /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;
  let regTel = /^[0-9]{9}$/;

  let nomeVerify = verificar(regName, data.nome, nome);
  let sobrenomeVerify = verificar(regName, data.sobrenome, sobrenome);
  let emailVerify = verificar(regEmail, data.email, email);
  let telfVerify = verificar(regTel, data.telf, telf);
  const mensagemVerify = mensagemVer(data.mensagem, mensagem);

  let formVerify = false;

  if (
    (nomeVerify == true) &
    (sobrenomeVerify == true) &
    (emailVerify == true) &
    (telfVerify == true) &
    (mensagemVerify == true)
  ) {
    formVerify = true;
  }else{
    let arr=[];
    if(nomeVerify!=true){ arr[0]=" nome" };
    if(sobrenomeVerify!=true){ arr[1]=" sobrenome" };
    if(telfVerify!=true){ arr[2]=" telefone" };
    if(mensagemVerify!=true){ arr[3]=" mensagem" };
    modal(arr);
  }
  return formVerify;
}

function verificar(reg, campo, campoDom) {
  if (!reg.test(campo)) {
    campoDom.classList.add("bg-danger", "bg-opacity-25");
    campoDom.focus();    
    return false;
  } else {    
    campoDom.classList.remove("bg-danger", "bg-opacity-25");
    return true;
  }
}

function mensagemVer(campo, campoDom) {
  if (campo.length > 2) {
    campoDom.classList.remove("bg-danger", "bg-opacity-25");
    return true;
  } else {
    campoDom.focus();
    campoDom.classList.add("bg-danger", "bg-opacity-25");
    return false;
  }
}
function modal(arr) {
  let arrClear=[];
  let modalForm = document.getElementById('modal-form');
  var modal = new bootstrap.Modal(modalForm);

  arr.forEach((word)=>{
    if(word.length!=0){
      arrClear.push(word)
    }
  });
  const modalBody=document.querySelector('.errores');
  modalBody.innerHTML=`Os campos em vermelho estão vazios, são ${arrClear} por favor preencha todos os campos.`;
  modal.show();
}
