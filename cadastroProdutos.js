

// Apresentar imagem no elemento

const inputImagem = document.getElementById("txt-imagem-produto");
const imagemSelecionada = document.getElementById("imagemExibicao");
const txtAdicioneImagem = document.getElementById("txt-adicione-imagem");

inputImagem.addEventListener("change", function () {
if (this.files && this.files[0]) {
const reader = new FileReader();

reader.onload = function (e) {
  imagemSelecionada.src = e.target.result;
  txtAdicioneImagem.style.display = "none";
};
reader.readAsDataURL(this.files[0]);
} else {
imagemSelecionada.src = "";
txtAdicioneImagem.style.display = "flex";
}
});

// ----------------------------------------------------------------------

// importar dados do firebase

import {
getStorage,
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
getFirestore,
collection,
addDoc,
doc,
setDoc,
deleteDoc
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyDDhTUjyPBpIdnUr19pDMFoA8P9JU-LGyc",
authDomain: "controle-de-estoque-d3491.firebaseapp.com",
projectId: "controle-de-estoque-d3491",
storageBucket: "controle-de-estoque-d3491.appspot.com",
messagingSenderId: "583895256433",
appId: "1:583895256433:web:e61752ec5df4f38a7cfad0"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// ----------------------------------------------------------------------

// Inserir dados dos produtos

const botaoCadastrar = document.getElementById("btncadastrar");

botaoCadastrar.addEventListener("click", async () => {
mostrarCarregamento();

const nomeProduto = document.getElementById("txt-nome-produto").value;
const categoriaProduto = document.getElementById("txt-categoria-produto")
.value;
const precoProduto = document.getElementById("txt-preco-produto").value;
const custoProduto = document.getElementById("txt-custo-produto").value;
const quantidadeProduto = document.getElementById("txt-quantidade-produto")
.value;

const url = "";

if (inputImagem.files.length > 0) {
const arquivo = inputImagem.files[0];

const storage = getStorage();

const storageRef = ref(storage, "imagens/" + arquivo.name);
console.log("fazendo upload...");

await uploadBytes(storageRef, arquivo);
console.log("upload concluido...");

await getDownloadURL(storageRef)
  .then(async (caminho) => {
    console.log(caminho);

    try {
      const produtosCollection = collection(db, "produtos");

      const docRef = await addDoc(produtosCollection, {
        nome: nomeProduto,
        categoria: categoriaProduto,
        preco: parseFloat(precoProduto),
        custo: parseFloat(custoProduto),
        quantidade: parseInt(quantidadeProduto),
        imagem: caminho
      });

      tirarCarregamento();
      mostrarConfirmacao();
      resetarFormulario();
      window.location.href ="pesquisarProdutos.html";
    } catch (error) {
      mostrarErro();
    }
  })
  .catch((error) => {
    console.error("Erro ao obter o URL:", error); // Exibe o erro detalhado no console
  });
} else {
try {
  const produtosCollection = collection(db, "produtos");

  const docRef = await addDoc(produtosCollection, {
    nome: nomeProduto,
    categoria: categoriaProduto,
    preco: parseFloat(precoProduto),
    custo: parseFloat(custoProduto),
    quantidade: parseInt(quantidadeProduto),
    imagem: "https://i.ibb.co/4RvHPLG/image.png"
  });

  tirarCarregamento();
  mostrarConfirmacao();
  resetarFormulario();
  window.location.href ="pesquisarProdutos.html";
} catch (error) {
  mostrarErro();
}
}
});

// mostrar carregamento

function mostrarCarregamento() {
const vcarregando = document.getElementById("div-carregando");

vcarregando.style.display = "flex";
document.body.style.overflow = "hidden";
}

// tirar carregamento

function tirarCarregamento() {
const vcarregando = document.getElementById("div-carregando");

vcarregando.style.display = "none";
}

// mostrar confirmacao

function mostrarConfirmacao() {
const vconfirmacao = document.getElementById("div-confirmacao");

vconfirmacao.style.display = "flex";

setTimeout(() => {
vconfirmacao.style.display = "none";
document.body.style.overflow = "auto";
}, 5000);
}

// mostrar erro

function mostrarErro() {
const verro = document.getElementById("div-erro");

verro.style.display = "flex";

setTimeout(() => {
verro.style.display = "none";
document.body.style.overflow = "auto";
}, 5000);
}

// ----------------------------------------------------------------------

// Resetar formulario

function resetarFormulario() {
const nomeProduto = document.getElementById("txt-nome-produto");
const categoriaProduto = document.getElementById("txt-categoria-produto");
const precoProduto = document.getElementById("txt-preco-produto");
const custoProduto = document.getElementById("txt-custo-produto");
const quantidadeProduto = document.getElementById("txt-quantidade-produto");

const imagemProduto = document.getElementById("txt-imagem-produto");
const imgroduto = document.getElementById("imagemExibicao");

const adicioneImagem = document.getElementById("txt-adicione-imagem");

nomeProduto.value = "";
categoriaProduto.value = "";
precoProduto.value = "";
custoProduto.value = "";
quantidadeProduto.value = "";
imagemProduto.value = "";
imgroduto.src = "";

adicioneImagem.style.display = "flex";
}

