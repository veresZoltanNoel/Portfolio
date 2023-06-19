// Define the base URL of the PokeAPI
const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
const pokemonTypes = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying",
  "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
];
createTypeFilter(pokemonTypes)
// Fetch data from the base URL
fetch(baseUrl)
  .then(response => {
    // Check if the response is not okay
    if (!response.ok) {
      throw new Error("Request Error");
    }
    // Convert the response to JSON format
    return response.json();
  })
  .then(data => {
    // Extract the URLs of individual Pokémon from the response data
    const pokemonUrls = data.results.map(pokemon => pokemon.url);

    // Function to fetch and process data for each Pokémon URL
    const fetchPokemonData = (url) => {
      // Fetch data from the specified URL
      fetch(url)
        .then(response => {
          // Check if the response is not okay
          if (!response.ok) {
            throw new Error("Request Error");
          }
          // Convert the response to JSON format
          return response.json();
        })
        .then(pokemonData => {
          // Get the container element to hold Pokémon information
          const pokemonsContainer = document.getElementById('pokemons');
          const pokemonImageUrl = pokemonData.sprites.front_default;

          // Check if the Pokémon has an image URL
          if (pokemonImageUrl != null) {
            const pokemonCardElement = createPokemonCard(pokemonData.types, pokemonData.name);
            const pokemonCardTopElement = createPokemonCardTop(pokemonImageUrl, pokemonData.name);
            const pokemonCardBottomElement = createPokemonCardBottom(pokemonData.id, pokemonData.name, pokemonData.types);

            appendChildElements(pokemonCardElement.firstElementChild, [pokemonCardTopElement, pokemonCardBottomElement]);

            pokemonCardElement.addEventListener('click', () => {
              openLightbox(pokemonImageUrl, pokemonData.name, pokemonData.stats, pokemonData.types);
            });

            pokemonsContainer.appendChild(pokemonCardElement);
          console.log(pokemonData);
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

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();

      // Iterate over the existing Pokémon cards and hide/show them based on the search term
      const pokemonCards = document.querySelectorAll('.pokemon-card');
      pokemonCards.forEach(pokemonCard => {
        const pokemonName = pokemonCard.getAttribute('id').toLowerCase();

        if (pokemonName.includes(searchTerm)) {
          pokemonCard.style.display = 'block';
        } else {
          pokemonCard.style.display = 'none';
        }
      });
    });

  // Sorting functionality
  const sortDropdown = document.getElementById('sortDropdown');
  sortDropdown.addEventListener('change', () => {
    const selectedOption = sortDropdown.value;


 // Sort the existing Pokémon cards based on the selected sorting option
 const pokemonCards = Array.from(document.querySelectorAll('.pokemon-card'));
 pokemonCards.sort((a, b) => {
   const aId = parseInt(a.querySelector('.pokemon-id').textContent);
   const bId = parseInt(b.querySelector('.pokemon-id').textContent);

   switch (selectedOption) {
     case 'a-z':
       return a.getAttribute('id').localeCompare(b.getAttribute('id'));
     case 'z-a':
       return b.getAttribute('id').localeCompare(a.getAttribute('id'));
     case 'low-to-high':
       return aId - bId;
     case 'high-to-low':
       return bId - aId;
     default:
       return 0;
   }
 });

  // Re-append the sorted Pokémon cards to the container
  const pokemonsContainer = document.getElementById('pokemons');
  pokemonCards.forEach(pokemonCard => {
    pokemonsContainer.appendChild(pokemonCard);
  });
});
})
.catch(error => {
  console.log(error);
});