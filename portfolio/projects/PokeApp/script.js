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
            const hpDiv = document.createElement("div");
            const hpText = document.createElement("span");
            const hpValue = document.createElement("span");
            const typeImgContainer = document.createElement("div");

            container.classList.add('flex', 'flex-col', 'items-center', 'border-4', 'rounded-3xl', 'py-12');
            hpDiv.classList.add("px-2", "py-1", "rounded-full", 'flex', 'flex-row', 'gap-2', 'bg-gray-400');
            hpText.classList.add("block");
            hpValue.classList.add("block");
            hpText.textContent = pokemonData.stats[0].stat.name;
            hpValue.textContent = pokemonData.stats[0].base_stat;
            name.classList.add('font-bold', 'text-lg');
            statContainer.classList.add('flex', 'flex-row', 'gap-4', 'text-center', 'p-2');
            name.textContent = pokemonName;
            image.src = pokemonImageUrl;
            image.alt = pokemonName;
            typeImgContainer.classList.add('grid', 'gap-4');
            pokemonData.types.length === 1 ? typeImgContainer.classList.add('grid-cols-1') : typeImgContainer.classList.add('grid-cols-2');

            hpDiv.appendChild(hpText);
            hpDiv.appendChild(hpValue);
            container.appendChild(hpDiv)
            container.appendChild(name);
            container.appendChild(image);

            // Loop through the stats of the Pokémon and create elements to display 3 of the stats
            for (const { stat, base_stat } of pokemonData.stats) {
              if (!['special-attack', 'special-defense', 'hp'].includes(stat.name)) {
                const statElement = document.createElement('div');
                const statName = document.createElement('span');
                const statValue = document.createElement('span');

                statElement.classList.add('grid', 'grid-rows-2');
                statName.textContent = stat.name;
                statValue.textContent = base_stat;
                statName.classList.add('block');
                statValue.classList.add('block', 'font-bold');

                statElement.appendChild(statValue);
                statElement.appendChild(statName);
                statContainer.appendChild(statElement);
              }
            }

            for (const { type } of pokemonData.types) {
              const typeImg = document.createElement('img');
              typeImg.style.width = '25px';
              typeImg.src = `pokemonTypes/${type.name}.png`;
              name.classList.add(`type-${type.name}`);
              typeImgContainer.appendChild(typeImg);
            }

            container.appendChild(typeImgContainer)
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
