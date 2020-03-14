const baseUrl = "https://pokeapi.co/api/v2"
const resultsWrapper = document.querySelector('.pokemon-wrapper');
const formTimeout = 1500;

// Utilities
function colorTypeBox(type) {
  switch (type) {
    case "normal":
      return "#BCBCAE";
    case "poison":
      return "#A95CA0";
    case "psychic":
      return "#F15FAE";
    case "grass":
      return "#86CE4D";
    case "ground":
      return "#E8C755";
    case "ice":
      return "#96F1FF";
    case "fire":
      return "#FA5642";
    case "rock":
      return "#CCBB71";
    case "dragon":
      return "#8773FF";
    case "water":
      return "#57ADFF";
    case "bug":
      return "#C3D21E"
    case "dark":
      return "#8C6654";
    case "fighting":
      return "#A85642";
    case "ghost":
      return "#7672D2";
    case "steel":
      return "#C4C2DB";
    case "flying":
      return "#76A2FF";
    case "electric":
      return "#FDE13B";
    case "fairy":
      return "#F9AEFF";
    default:
      return "#fff";
  }
}

// DOM Updaters
function clearList() {
  resultsWrapper.removeChild(resultsWrapper.children[0]);
}

function clearInput() {
  const searchInput = document.querySelector('.js-search-input');
  searchInput.value = '';
}

function showLoadingAnimation() {
  const pokeballHtml = '<div class="pokeball"><div class="pokeball__center-border"></div><div class="pokeball__center-circle"></div</div>';
  resultsWrapper.innerHTML = pokeballHtml;
}

function showErrorMessage(searchTerm) {
  const errorMessage = document.createElement('P');
  errorMessage.classList.add('error-message');
  errorMessage.innerHTML = `The Pokemon, <em>${searchTerm}</em>, could not be found`;
  resultsWrapper.appendChild(errorMessage)
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
  imageDiv.appendChild(number);


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
    const typeName = typeItem.type.name;
    typeDiv.classList.add('type');
    typeDiv.style.backgroundColor = colorTypeBox(typeName);
    typeDiv.innerText = typeName;

    typesDiv.appendChild(typeDiv);
  });

  pokeCard.appendChild(typesDiv);

  // set color of each type with a switch statement
  // append to pokeCard
}

// Data Getters
async function getPokemonByName(name) {
  clearList();
  showLoadingAnimation();

  try {
    const response = await fetch(`${baseUrl}/pokemon/${name.toLowerCase()}`, {
      cache: "force-cache"
    });
    const data = await response.json();
    clearList();
    const pokemon = data;
    addPokemonCardToDOM(pokemon);
    clearInput();
  } catch {
    clearList();
    showErrorMessage(name);
  }
}

const searchForm = document.querySelector('.js-search-form');
const searchInput = document.querySelector('.js-search-input');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = searchInput.value;
  getPokemonByName(name);
});
