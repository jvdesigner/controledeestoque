import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// Configuração do Firebase (substitua pelas suas credenciais)
const firebaseConfig = {
  apiKey: "AIzaSyDDhTUjyPBpIdnUr19pDMFoA8P9JU-LGyc",
  authDomain: "controle-de-estoque-d3491.firebaseapp.com",
  databaseURL:
    "https://controle-de-estoque-d3491-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "controle-de-estoque-d3491",
  storageBucket: "controle-de-estoque-d3491.appspot.com",
  messagingSenderId: "583895256433",
  appId: "1:583895256433:web:e61752ec5df4f38a7cfad0"
};

const inputElement = document.getElementById("txt-pesquisar-produto");

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Referência à coleção "produtos" no Firestore
const db = getFirestore(app);

const txtPesquisa3 = document.getElementById("txt-pesquisar-produto");

// Informacoes do produto

let viddocumento = "";

// Função para exibir produtos na galeria
async function exibirProdutos() {
  const txtPesquisa = document.getElementById("txt-pesquisar-produto");
  let produtosRef;

  if (txtPesquisa.value !== "") {
    produtosRef = query(
      collection(db, "produtos"),
      where("nome", ">=", txtPesquisa.value),
      where("nome", "<", txtPesquisa.value + "z")
    );
  } else {
    produtosRef = collection(db, "produtos");
  }

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  try {
    const querySnapshot = await getDocs(produtosRef);

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      const productDiv = document.createElement("div");

      productDiv.classList.add("product");
      productDiv.innerHTML = `
                <article class="bg-white flex flex-col gap-2 rounded-2xl shadow-md p-6 max-sm:p-4 cursor-pointer opacity-90 hover:opacity-100 hover:scale-105 hover:-translate-y-4 hover:shadow-teal-200">

        <img class="rounded-lg" src="${data.imagem}" alt="">

        <p class="text-lg max-sm:text-sm text-teal-500 font-semibold text-gray-600">${
          data.nome
        }</p>
        <hr>
        <p class="text-base max-sm:text-sm text-gray-600">${data.categoria}</p>
        <p class="text-sm max-sm:text-xs  font-semibold text-gray-600">Preço: R$ ${data.preco.toFixed(
          2
        )}</p>
        <p class="text-sm max-sm:text-xs  font-semibold text-gray-600">Custo: R$ ${data.custo.toFixed(
          2
        )}</p>
        
        <p id="tagidDocumento" class="text-xs invisible text-gray-600">${
          doc.id
        }</p>

      </article>
                
            `;

      productDiv.addEventListener("click", abrirModal);

      productDiv.addEventListener("click", function () {
        const conteudoTag = this.querySelector("#tagidDocumento").textContent;
        infoProdutos(conteudoTag);
      });

      gallery.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Erro ao recuperar produtos:", error);
  }
}

// Chame a função para exibir os produtos na galeria
exibirProdutos();

inputElement.addEventListener("keyup", exibirProdutos);

// Fechar modal produtos

const vclosebtn = document.getElementById("icon-close-modal-produto");

vclosebtn.addEventListener("click", () => {
  const vmodalprodutos = document.getElementById("div-modal-produto");

  vmodalprodutos.style.display = "none";
});

// clicar no item na galeria

function abrirModal() {
  const vmodalprodutos = document.getElementById("div-modal-produto");

  vmodalprodutos.style.display = "flex";
}

// Fechar/Abrir modal deletar produto

const vclosebtn2 = document.getElementById("close-deletar-produto");
const vbtnexcluirproduto = document.getElementById("btn-excluir-produto");

const vbtnconfirmarexcluir = document.getElementById("btnconfirmarexcluir");

vclosebtn2.addEventListener("click", () => {
  const vmodalprodutos2 = document.getElementById("modal-deletar-produto");

  vmodalprodutos2.style.display = "none";
});

vbtnexcluirproduto.addEventListener("click", () => {
  const vmodalprodutos2 = document.getElementById("modal-deletar-produto");

  vmodalprodutos2.style.display = "flex";
});

// Pegar informacoes do produto selecionado

function infoProdutos(idProduto) {
  viddocumento = idProduto;

  console.log(viddocumento);
}

// Deletar produtos

function deletarProdutos() {
  console.log(viddocumento);

  deleteDoc(doc(db, "produtos", viddocumento));
  window.location.reload();
}

vbtnconfirmarexcluir.addEventListener("click", deletarProdutos);
