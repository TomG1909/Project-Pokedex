let currentPokemon;


async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0';
    let response = await fetch(url);
    let allPokemons = await response.json();
    console.log('loaded Pokemon', allPokemons);


    for (let i = 0; i < allPokemons['results'].length; i++) {
        let currentPokemon = await getPokemonUrl(allPokemons['results'][i]['url']);
        let pokemonImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
        let type = currentPokemon['types'][0]['type']['name'];
        document.getElementById('content').innerHTML +=
            `<div class="pokemon-card ${type}" onclick='showPokemon(${JSON.stringify(currentPokemon)})'><span class="name">${currentPokemon['name']}</span>
            <img src="${pokemonImg}"class="pokeimage">
            <div class="types-container"id="types${currentPokemon['name']}"></div>
            </div>`;

        addTypesSmallCards(currentPokemon);

    }

}

async function getPokemonUrl(url) {

    let response = await fetch(url);
    let allPokemons = await response.json();
    return allPokemons;
}

async function filterNames(currentPokemon, type, pokemonImg) {

    let url = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0';
    let response = await fetch(url);
    let allPokemons = await response.json();


    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    console.log(search);
    let result = document.getElementById('result');
    result.innerHTML = '';

    for (let o = 0; o < allPokemons['results'].length; o++) {
        const PokemonName = allPokemons['results'][o]['name'];


        if (PokemonName.toLowerCase().includes(search)) {
            result.innerHTML +=
                `<div class="pokemon-card ${type}" onclick='showPokemon(${JSON.stringify(currentPokemon)})'><span class="name">${PokemonName}</span>
                <img src="${pokemonImg}"class="pokeimage">
                <div class="types-container" id="types${currentPokemon['name']}"></div>
                
                </div>`;

        }
    }

}




function showPokemon(currentPokemon) {

    let pokemonImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    let type = currentPokemon['types'][0]['type']['name'];

    document.getElementById('aboutPokemon').innerHTML =
        `<div class="${type} name-container"><div class="close" onclick="showCards()">X</div><span class="name-bold">${currentPokemon['name']}</span>
        <div id="types"></div>
        <div class="img-container">
        <img src =${pokemonImg} class="pokemonImage"></div>
           </div>
           <div class="navigation"id="nav">
           <div onclick='showAbout(${JSON.stringify(currentPokemon)})' id="about">about</div>
           <div onclick='showAbilities(${JSON.stringify(currentPokemon)})' id="abilities">abilities</div>
           <div onclick='showMoves(${JSON.stringify(currentPokemon)})' id="moves">moves</div>
           <div onclick='showStats(${JSON.stringify(currentPokemon)})' id="stats">stats</div>
       </div>
       <div class="infocontainer"></div>`;

    hideCards();
    showAbout(currentPokemon);
    addTypes(currentPokemon);
}


function addTypes(currentPokemon) {
    for (let m = 0; m < currentPokemon['types'].length; m++) {

        let PokeType = currentPokemon['types'][m]['type']['name'];

        document.getElementById('types').innerHTML += `<div class="bg-type">${PokeType}</div>`;

    }
}

function addTypesSmallCards(currentPokemon) {
    for (let n = 0; n < currentPokemon['types'].length; n++) {

        let PokeType = currentPokemon['types'][n]['type']['name'];

        document.getElementById('types' + currentPokemon['name']).innerHTML +=
            `<div class="cardtype">${PokeType}</div>`;

    }

}

function hideCards() {
    document.getElementById('content').classList.add('d-none');
    document.getElementById('aboutPokemon').classList.remove('d-none');
    document.getElementById('info').classList.remove('d-none');
    document.getElementById('info-title').classList.remove('d-none');
}


function showCards() {
    document.getElementById('content').classList.remove('d-none');
    document.getElementById('aboutPokemon').classList.add('d-none');
    document.getElementById('info').classList.add('d-none');
    document.getElementById('info-title').classList.add('d-none');

}


function showAbout(currentPokemon) {
    document.getElementById('info').innerHTML = ``;
    document.getElementById('info-title').innerHTML = ``;

    let species = currentPokemon['species']['name']
    let height = currentPokemon['height'];
    let weight = currentPokemon['weight'];
    document.getElementById('info').innerHTML = `<table>
    <tr>
    <td class="title">Species:</td>
    <td>${species}</td>
  </tr>
    <tr>
      <td class="title">Height:</td>
      <td>${height}</td>
    </tr>
    <tr>
      <td class="title">Weight:</td>
      <td>${weight}</td>
    </tr>
    </table>`;

    activeLinkAbout();
}


function showAbilities(currentPokemon) {
    document.getElementById('info-title').innerHTML = ``;
    document.getElementById('info').innerHTML = ``;

    for (let j = 0; j < currentPokemon['abilities'].length; j++) {

        let ability = currentPokemon['abilities'][j]['ability']['name'];

        document.getElementById('info-title').innerHTML = `<div class="categories">Abilities</div>`;
        document.getElementById('info').innerHTML += `<div class="d-flex-center">${ability}</div>`;

        activeLinkAbilities();
    }
}


function showMoves(currentPokemon) {
    document.getElementById('info').innerHTML = ``;
    document.getElementById('info-title').innerHTML = ``;

    for (let k = 0; k < currentPokemon['moves'].length; k++) {

        let move = currentPokemon['moves'][k]['move']['name'];

        document.getElementById('info-title').innerHTML = `<div class="categories">Moves</div>`;
        document.getElementById('info').innerHTML += `<div class="d-flex-center">${move}</div>`;

        activeLinkMoves();
    }
}


function showStats(currentPokemon) {
    document.getElementById('info').innerHTML = ``;
    document.getElementById('info-title').innerHTML = ``;

    for (let l = 0; l < currentPokemon['stats'].length; l++) {

        let progress = currentPokemon['stats'][l]['base_stat'];
        let skillname = currentPokemon['stats'][l]['stat']['name'];

        document.getElementById('info-title').innerHTML = `<div class="categories">Stats</div>`;

        document.getElementById('info').innerHTML += `<div class="stats">
        <div class="skill-name">${skillname}</div>
        <div class="progress"><div class="progress-bar ${skillname}" role="progressbar" 
  style="width: ${progress}%" aria-valuemin="0" aria-valuemax="260">${progress}</div>
</div></div>`;

        activeLinkStats();
    }
}

function activeLinkAbout() {
    document.getElementById('about').classList.add('active-link');
    document.getElementById('abilities').classList.remove('active-link');
    document.getElementById('moves').classList.remove('active-link');
    document.getElementById('stats').classList.remove('active-link');
}

function activeLinkAbilities() {
    document.getElementById('abilities').classList.add('active-link');
    document.getElementById('about').classList.remove('active-link');
    document.getElementById('moves').classList.remove('active-link');
    document.getElementById('stats').classList.remove('active-link');
}

function activeLinkMoves() {
    document.getElementById('moves').classList.add('active-link');
    document.getElementById('about').classList.remove('active-link');
    document.getElementById('abilities').classList.remove('active-link');
    document.getElementById('stats').classList.remove('active-link');
}

function activeLinkStats() {
    document.getElementById('stats').classList.add('active-link');
    document.getElementById('about').classList.remove('active-link');
    document.getElementById('abilities').classList.remove('active-link');
    document.getElementById('moves').classList.remove('active-link');
}