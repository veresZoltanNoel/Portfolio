const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

// Fetch data from the base URL
fetch(baseUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error("Request Error");
    }
    return response.json();
  })
  .then(data => {
    // Extract the URLs of individual Pokémon from the response data
    const pokemonUrls = data.results.map(pokemon => pokemon.url);
    
    // Function to fetch and process data for each Pokémon URL
    const fetchPokemonData = (url) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error("Request Error");
          }
          return response.json();
        })
        .then(pokemonData => {
          // Process the data for each Pokémon
          const pokemonsContainer = document.getElementById('pokemons');
          const pokemonName = pokemonData.name;
          const pokemonImageUrl = pokemonData.sprites.front_default;
          
          if (pokemonImageUrl) {
            // Create HTML elements to display Pokémon name, image, and stats
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
            
            // Loop through the stats of the Pokémon and create elements to display each stat
            for (let i = 0; i < pokemonData.stats.length; i++) {
              let statElement = document.createElement('div');
              let statName = document.createElement('span');
              let statValue = document.createElement('span');

              statElement.classList.add('grid','grid-rows-2');
              statName.textContent = `${pokemonData.stats[i].stat.name}`;
              statValue.textContent = `${pokemonData.stats[i].base_stat}`;
              statName.classList.add('block');
              statValue.classList.add('block');

              statElement.appendChild(statValue);
              statElement.appendChild(statName);
              statContainer.appendChild(statElement);
            }
            
            statContainer.classList.add('flex','flex-row','gap-4','text-center');
            
            container.appendChild(statContainer);
            pokemonsContainer.appendChild(container);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    
    // Fetch and process data for each Pokémon URL
    pokemonUrls.forEach(url => {
      fetchPokemonData(url);
    });
  })
  .catch(error => {
    console.log(error);
  });
