const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

fetch(baseUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error("Request Error");
    }
    return response.json();
  })
  .then(data => {
    const pokemonUrls = data.results.map(pokemon => pokemon.url);
    const fetchPokemonData = (url) => {
      fetch(url)
        .then(response => {

          if (!response.ok) {
            throw new Error("Request Error");
          }
          return response.json();
        })
        .then(pokemonData => {
          //console.log(pokemonData);
          const pokemonsContainer = document.getElementById('pokemons');
          const pokemonName = pokemonData.name;
          const pokemonImageUrl = pokemonData.sprites.front_default;
          
          if (pokemonImageUrl) {
            const container = document.createElement('div');
            const name = document.createElement('h3');
            const image = document.createElement('img');
            const statContainer = document.createElement('div');

            container.classList.add('flex','flex-col','items-center','mb-8')
            name.classList.add('font-bold','text-lg')
            name.textContent = pokemonName;
            image.src = pokemonImageUrl;
            image.alt = pokemonName;

            container.appendChild(name);
            container.appendChild(image);
            
            for (let i = 0; i < pokemonData.stats.length; i++) {
              //console.log(pokemonData.stats[i].stat.name +" - "+ pokemonData.stats[i].base_stat);
              let statElement = document.createElement('div')
              let statName = document.createElement('span')
              let statValue = document.createElement('span')

              statElement.classList.add('grid','grid-rows-2')
              statName.textContent = `${pokemonData.stats[i].stat.name}`
              statValue.textContent = `${pokemonData.stats[i].base_stat}`
              statName.classList.add('block')
              statValue.classList.add('block')

              statElement.appendChild(statValue)
              statElement.appendChild(statName)
              statContainer.appendChild(statElement)

              //console.log(statContainer);
            }
            statContainer.classList.add('flex','flex-row','gap-4','text-center')
            
            container.appendChild(statContainer)
            pokemonsContainer.appendChild(container);
          }


        })
        .catch(error => {
          console.log(error);
        });
    };
    pokemonUrls.forEach(url => {
      fetchPokemonData(url);
    });
  })
  .catch(error => {
    console.log(error);
  });
