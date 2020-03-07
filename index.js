const baseUrl = "https://pokeapi.co/api/v2"

function clearList() {
  const resultsWrapper = document.querySelector('.pokemon-wrapper');
  resultsWrapper.removeChild(resultsWrapper.children[0]);
  console.log('cleared list');
}

function showLoadingAnimation() {
  const resultsWrapper = document.querySelector('.pokemon-wrapper');
  const pokeballHtml = '<div class="pokeball"><div class="pokeball__center-border"></div><div class="pokeball__center-circle"></div</div>';
  resultsWrapper.innerHTML = pokeballHtml;
}

function addPokemonToDOM(pokemon) {
  const resultsWrapper = document.querySelector('.pokemon-wrapper');
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

async function getPokemon(limit = 20, offset = 0) {
  clearList();
  showLoadingAnimation();
  const response = await fetch(`${baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  setTimeout(function() {
    clearList();
    pokemon = data.results;
    addPokemonToDOM(pokemon);
  }, 4000);
}

const first150Button = document.querySelector('.js-get-first-150');
first150Button.addEventListener('click', (event) => {
  event.preventDefault();

  let buttonClicked = false;

  if (!buttonClicked) {
    getPokemon(150, 0);
    buttonClicked = true;
  }
});
