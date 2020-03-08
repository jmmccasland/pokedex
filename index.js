const baseUrl = "https://pokeapi.co/api/v2"
const resultsWrapper = document.querySelector('.pokemon-wrapper');
const formTimeout = 3000;

// DOM Updaters
function clearList() {
  resultsWrapper.removeChild(resultsWrapper.children[0]);
  console.log('cleared list');
}

function showLoadingAnimation() {
  const pokeballHtml = '<div class="pokeball"><div class="pokeball__center-border"></div><div class="pokeball__center-circle"></div</div>';
  resultsWrapper.innerHTML = pokeballHtml;
}

function addPokemonListToDOM(pokemon) {
  const list = document.createElement('UL');
  resultsWrapper.append(list);

  pokemon.forEach((poke) => {
    list.classList.add('pokemon-list');

    const listItem = document.createElement('LI');
    const link = document.createElement('A');
    listItem.append(link);

    link.innerText = poke.name;
    link.setAttribute('href', poke.url);
    link.classList.add('pokemon-list__item');

    list.append(listItem);
  });
}

function addPokemonCardToDOM(pokemon) {
  const pokeCard = document.createElement('DIV');
  pokeCard.classList.add('poke-detail');

  // add pokecard to results wrapper
  resultsWrapper.appendChild(pokeCard);

  /* Add Image */
  // add image div
  const imageDiv = document.createElement('DIV');
  // add class to image div
  imageDiv.classList.add('poke-detail__image');
  // add image as child of image div
  const image = document.createElement('IMG');
  // add source to image
  image.setAttribute('src', pokemon.sprites.front_default);
  // add image to image div
  imageDiv.appendChild(image);
  // append to pokeCard
  pokeCard.appendChild(imageDiv);

  // add number
  // add span
  const number = document.createElement('SPAN');
  // add class to span
  number.classList.add('poke-detail__number');
  // set inner text of span
  number.innerText = `#${pokemon.id}`;
  // append to pokeCard
  pokeCard.appendChild(number);


  // add h2 for pokemon name
  const name = document.createElement('H3');
  name.classList.add('poke-detail__name');
  name.innerText = pokemon.name;
  pokeCard.appendChild(name);

  // add types div
  const typesDiv = document.createElement('DIV');
  typesDiv.classList.add('poke-detail__types');

  const typesArray = pokemon.types;
  typesArray.forEach((typeItem) => {
    // add types in types div
    const typeDiv = document.createElement('DIV');
    typeDiv.classList.add('type');
    typeDiv.innerText = typeItem.type.name;

    typesDiv.appendChild(typeDiv);
  });

  pokeCard.appendChild(typesDiv);

  // set color of each type with a switch statement
  // append to pokeCard
}

// Data Getters
async function getPokemon(limit = 20, offset = 0) {
  clearList();
  showLoadingAnimation();
  const response = await fetch(`${baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  setTimeout(function() {
    clearList();
    const pokemon = data.results;
    addPokemonListToDOM(pokemon);
  }, formTimeout);
}

async function getPokemonByName(name) {
  clearList();
  showLoadingAnimation();
  const response = await fetch(`${baseUrl}/pokemon/${name}`, {cache: "force-cache"});
  const data = await response.json();
  console.log(data);
  setTimeout(function() {
    clearList();
    const pokemon = data;
    addPokemonCardToDOM(pokemon);
  }, 1);
}

// Event Listeners
const first150Button = document.querySelector('.js-get-first-150');
first150Button.addEventListener('click', (event) => {
  event.preventDefault();
  getPokemon(150, 0);
});

const searchForm = document.querySelector('.js-search-form');
const searchInput = document.querySelector('.js-search-input');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = searchInput.value;
  getPokemonByName(name);
});
