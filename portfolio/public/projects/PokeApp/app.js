// Define the base URL of the PokeAPI
const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
const pokemonTypes = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying",
  "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

createFilterBar(pokemonTypes);

const filterButtons = document.querySelectorAll(".filter-button");
const filteredPokemons = document.getElementById("filtered-pokemons");
let filteredPokemontypes = [];

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedType = button.id;
    button.classList.toggle('active');

    // Toggle the selection
    if (filteredPokemontypes.includes(selectedType)) {
      filteredPokemontypes = filteredPokemontypes.filter(type => type !== selectedType);
    } else {
      filteredPokemontypes.push(selectedType);
    }

    filterPokemons(filteredPokemontypes);
  });
});



// Add click event listeners to each list item
const sortItems = document.querySelectorAll("#sort-by li");
sortItems.forEach(li => {
  li.addEventListener("click", function() {
    const selectedOption = this.getAttribute("data-value");
    // Remove active class from all li elements
    sortItems.forEach(item => {
      item.classList.remove("active");
    });
    // Add active class to the clicked li element
    this.classList.add("active");

    sortPokemons(selectedOption);
  });
});

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

          // Extract the Pokémon's name and image URL
          const pokemonName = pokemonData.name;
          const pokemonImageUrl = pokemonData.sprites.front_default;
          // Check if the Pokémon has an image URL
          if (pokemonImageUrl) {
            // Create HTML elements to display Pokémon name, image, and stats
            const container = createPokemonContainer();
            const name = createPokemonName(pokemonName);
            const image = createPokemonImage(pokemonImageUrl, pokemonName)
            const statContainer = createPokemonStats(pokemonData.stats)
            const hpDiv = createHpElement(pokemonData.stats);
            const cardTopDesign = createcardTopDesignElement();
            const typeImgContainerElement = createPokemonTypesAndColorDesign(pokemonData.types, name, cardTopDesign);

            // Append child elements to the container element
            appendChildElements(container,[hpDiv,name,image]);

            // Append child elements to the container element
            appendChildElements(container,[...typeImgContainerElement, ...statContainer, cardTopDesign]);

            // Append the container element to the pokemonsContainer
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
