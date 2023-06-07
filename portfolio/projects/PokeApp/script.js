const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

// Fetch data from the base URL
fetch(baseUrl)
  .then(response => {
    // Check the response
    if (!response.ok) {
      throw new Error("Request Error");
    }
    return response.json();
  })
  .then(data => {
    // Extract the Pokémon URLs from the data object
    const pokemonUrls = data.results.map(pokemon => pokemon.url);

    // Function to fetch and display individual Pokémon data
    const fetchPokemonData = (url) => {
      fetch(url)
        .then(response => {
          // Check the response
          if (!response.ok) {
            throw new Error("Request Error");
          }
          return response.json();
        })
        .then(pokemonData => {
          // Display the data on the pokemonsContainer DOM element
          const pokemonsContainer = document.getElementById('pokemons');

          // Extract the Pokémon name and image URL
          const pokemonName = pokemonData.name;
          const pokemonImageUrl = pokemonData.sprites.front_default;

          // Create an <li> element with the Pokémon name
          const listItem = document.createElement('li');

          const nameParagraph = document.createElement('p');
          nameParagraph.textContent = pokemonName;

          listItem.appendChild(nameParagraph);

          // Add the <img> element if there is an available image
          if (pokemonImageUrl) {
            const image = document.createElement('img');
            image.src = pokemonImageUrl;
            image.alt = pokemonName;
            listItem.appendChild(image);
          }

          // Add the <li> element to the pokemonsContainer
          pokemonsContainer.appendChild(listItem);
        })
        .catch(error => {
          console.log(error);
        });
    };

    // Call fetchPokemonData for each Pokémon URL
    pokemonUrls.forEach(url => {
      fetchPokemonData(url);
    });
  })
  .catch(error => {
    console.log(error);
  });
