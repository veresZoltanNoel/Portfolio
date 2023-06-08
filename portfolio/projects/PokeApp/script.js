const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function mixColors(color1, color2) {
  const r = Math.round((color1.r + color2.r) / 2);
  const g = Math.round((color1.g + color2.g) / 2);
  const b = Math.round((color1.b + color2.b) / 2);
  return `rgb(${r}, ${g}, ${b})`;
}
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

            const cardTopDesign = document.createElement("div");
            cardTopDesign.style.position = "absolute";
            cardTopDesign.style.top = "0";
            cardTopDesign.style.width = "100%";
            cardTopDesign.style.height = "120px";
            cardTopDesign.style.borderRadius = "0 0 100% 100%";
            cardTopDesign.style.zIndex = "-1";

            container.classList.add('poke-container','relative','flex', 'flex-col', 'items-center','py-12','bg-gray-100');
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
            let typeCount = [];
            for (const { type } of pokemonData.types) {
              typeCount.push(type.name);

              const typeImg = document.createElement('img');
              typeImg.style.width = '25px';
              typeImg.src = `pokemonTypes/${type.name}.png`;
              name.classList.add(`type-${type.name}`);
              typeImgContainer.appendChild(typeImg);
              if (typeCount.length === 1) {
                cardTopDesign.style.backgroundColor= `var(--${type.name}-color)`
              }
              else{
                let color1 = hexToRgb(getComputedStyle(document.documentElement).getPropertyValue(`--${typeCount[0]}-color`));
                let color2 = hexToRgb(getComputedStyle(document.documentElement).getPropertyValue(`--${typeCount[1]}-color`));
                console.log(`--${typeCount[1]}-color`);
                const mixedColor  = mixColors(color1, color2);
                console.log(mixedColor);
                cardTopDesign.style.backgroundColor= `${mixedColor}`
              }
            }

            container.appendChild(typeImgContainer)
            container.appendChild(statContainer);
            container.appendChild(cardTopDesign)
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


