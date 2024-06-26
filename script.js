function priceFormat(price) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}

const main = document.getElementById('main');
const menu = document.getElementById('menu');
const shoppingCart = document.getElementById('shopping-cart');
const listMovies = document.getElementById('list-movies');
const cart = document.getElementById('cart');
const filmesCart = document.getElementById('filmes-cart');

const checkout = document.createElement('button')
checkout.classList.add('button-checkout')
checkout.classList.add('comprar')
checkout.textContent = 'Checkout'


let filmeEscolhido = [];

// const listaMenu = [
//   { text: 'Home', link: '#' },
//   { text: 'Checkout', link: '#finish-purchase' },
//   { text: 'Sobre', link: '#' },
//   { text: 'Contato', link: '#' },
// ];
// listaMenu.map(({ text, link }) => {
//   const caminho = document.createElement('a');
//   caminho.href = link;
//   caminho.textContent = text;
//   menu.appendChild(caminho);
// });

const Movies = [
  { id: 1, title: "Divertida Mente 2", price: 20, room: 7, modality: "3D", limity: 10, url: 'https://s2-gshow.glbimg.com/duf9ORbPKGZPZfiUH5o-wMqeW5k=/0x0:1080x1350/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2023/E/z/lEoAPzSlOtxAfScvnFbg/disney-400040165-390148890190865-1673493019459550201-n.jpg', precoTot: 0, quantiIngresso: 0 },
  { id: 2, title: "Bad Boys 4", price: 22, room: 2, modality: "3D", limity: 5, url: 'https://br.web.img3.acsta.net/img/b0/17/b0173047cc91f385964595cc30cbb975.jpg', precoTot: 0, quantiIngresso: 0 },
  { id: 3, title: "Assassino por Acaso", price: 18, room: 3, modality: "2D", limity: 20, url: 'https://br.web.img3.acsta.net/img/32/07/320706a28fe6a7bb73956803428e23db.jpg', precoTot: 0, quantiIngresso: 0 },
  { id: 4, title: "Planeta dos Macacos: O Reinado", price: 28, room: 10, modality: "3D XD", limity: 5, url: 'https://www.clickriomafra.com.br/emacite/wp-content/uploads/2024/05/Planeta-dos-Macacos-O-Reinado.jpg', precoTot: 0, quantiIngresso: 0 },
  { id: 5, title: "Garfield", price: 15, room: 4, modality: "2D", limity: 20, url: 'https://maceioshopping.com/app/uploads/2024/04/d7491303-3758-49d8-b444-4308370f9f30.jpg', precoTot: 0, quantiIngresso: 0 },
  { id: 6, title: "Furiosa: Uma Saga Mad Max", price: 35, room: 10, modality: "3D", limity: 10, url: 'https://i0.wp.com/alangeek.com.br/wp-content/uploads/2024/05/img_2045-1.jpg?fit=1332%2C2000&ssl=1', precoTot: 0, quantiIngresso: 0 },
];

Movies.map(({ id, title, price, room, modality, limity, url }) => {
  const movie = document.createElement('div');
  movie.classList.add('box-filme');
  const divImg = document.createElement('div');
  divImg.classList.add('img-filme');

  const imagem = document.createElement('img');
  imagem.src = url;

  const boxInfo = document.createElement('div');
  boxInfo.classList.add('box-info');
  const infos = document.createElement('div');
  infos.classList.add('infos');

  const titulo = document.createElement('h2');
  titulo.textContent = title;
  const preco = document.createElement('p');
  preco.textContent = priceFormat(price);
  const sala = document.createElement('p');
  sala.textContent = `Sala - ${room} - ${modality}`;
  const limite = document.createElement('p');
  limite.textContent = `Ingressos restantes - ${limity}`;

  const ingresso = document.createElement('div');
  ingresso.classList.add('ingresso');
  const more = document.createElement('button');
  more.classList.add('handle-qtde');
  more.textContent = '+';
  const qtde = document.createElement('p');
  qtde.textContent = 0;
  const less = document.createElement('button');
  less.classList.add('handle-qtde');
  less.textContent = '-';

  const comprar = document.createElement('button');
  comprar.textContent = 'Comprar';
  comprar.classList.add('comprar');

  ingresso.appendChild(more);
  ingresso.appendChild(qtde);
  ingresso.appendChild(less);

  divImg.appendChild(imagem);
  movie.appendChild(divImg);
  movie.appendChild(titulo);
  movie.appendChild(boxInfo);
  boxInfo.appendChild(infos);
  boxInfo.appendChild(ingresso);
  infos.appendChild(preco);
  infos.appendChild(sala);
  infos.appendChild(limite);
  movie.appendChild(comprar);

  listMovies.appendChild(movie);

  more.addEventListener('click', function () {
    if (parseInt(qtde.textContent) < limity) {
      qtde.textContent = parseInt(qtde.textContent) + 1;
    }
  });

  less.addEventListener('click', function () {
    if (parseInt(qtde.textContent) > 0) {
      qtde.textContent = parseInt(qtde.textContent) - 1;
    }
  });

  comprar.addEventListener('click', function () {
    const idFilme = id;
    const quantidade = parseInt(qtde.textContent);
    if (filmeEscolhido.find(filme => filme.id === idFilme)) {
      alert("Filme já escolhido, caso queira alterar, por favor exclua ele do checkout");
    } else {
      if (quantidade > 0) {
        const filme = Movies.find(({ id }) => id === idFilme);
        filme.quantiIngresso = quantidade;
        filme.precoTot = quantidade * filme.price;
        filmeEscolhido.push(filme);

        updateCartIcon();
        updateCart();
      } else {
        alert('Por favor selecione a quantidade de ingressos');
      }
    }
  });
});

function updateCartIcon() {
  const cart = document.getElementById('cart');
  let numberCart = cart.querySelector('.number-cart');

  if (filmeEscolhido.length) {
    if (!numberCart) {
      numberCart = document.createElement('span');
      numberCart.classList.add('number-cart');
      cart.appendChild(numberCart);
    }
    numberCart.textContent = filmeEscolhido.length;
  } else if (numberCart) {
    cart.removeChild(numberCart);
  }
}

function updateCart() {
  const filmesCart = document.getElementById('filmes-cart');
  filmesCart.textContent = '';

  filmeEscolhido.forEach(({ id, title, url, quantiIngresso, precoTot }) => {
    const boxFilme = document.createElement('div');
    boxFilme.classList.add('box-movie-cart');

    const boxInfoFilmeCart = document.createElement('div');
    boxInfoFilmeCart.classList.add('box-info-filme-cart');

    const nameFilme = document.createElement('h2');
    nameFilme.textContent = title;
    const precoIngresso = document.createElement('p');
    precoIngresso.textContent = priceFormat(precoTot);

    const qtdeIngressosCart = document.createElement('p');
    qtdeIngressosCart.textContent = `Ingressos: ${quantiIngresso}`;

    const boxImgCart = document.createElement('div');
    boxImgCart.classList.add('box-img-cart');

    const imgCart = document.createElement('img');
    imgCart.classList.add('img-cart');
    imgCart.src = url;
    imgCart.alt = title;

    const closeFilme = document.createElement('button');
    closeFilme.textContent = 'x';
    closeFilme.classList.add('close-filme');

    closeFilme.addEventListener('click', function () {
      filmeEscolhido = filmeEscolhido.filter(filme => filme.id !== id);
      updateCart();
      updateCartIcon();
    });

    boxInfoFilmeCart.appendChild(nameFilme);
    boxInfoFilmeCart.appendChild(qtdeIngressosCart);
    boxInfoFilmeCart.appendChild(precoIngresso);
    boxImgCart.appendChild(closeFilme);
    boxImgCart.appendChild(imgCart);
    boxFilme.appendChild(boxInfoFilmeCart);
    boxFilme.appendChild(boxImgCart);
    filmesCart.appendChild(boxFilme);
  });
}




const closeCart = document.getElementById('close-cart');
closeCart.addEventListener('click', function () {
  shoppingCart.classList.toggle('none');
  shoppingCart.classList.toggle('shopping-cart');

  updateCart();
  updateCartIcon();
});

cart.addEventListener('click', function () {
  shoppingCart.classList.toggle('none');
  shoppingCart.classList.toggle('shopping-cart');
  updateCart();
  updateCartIcon();
  buttonCheckout();
});


function buttonCheckout() {
  if(filmeEscolhido.length){
    shoppingCart.appendChild(checkout)
    checkout.addEventListener('click',function(){
      window.location.href="./checkout.html";
    })
  }
}


// checkout.addEventListener('click', function () {
//   if (filmeEscolhido.length > 0) {
//     filmeEscolhido.forEach(filme => {
//       console.log(filme.title);
//       console.log(filme.quantiIngresso);
//       console.log(filme.precoTot);
//     });
//     alert("Compra Concluida");
//     filmeEscolhido = [];
//     updateCart();
//     updateCartIcon();
//   } else {
//     alert("Seu carrinho está vazio!");
//   }
// });
