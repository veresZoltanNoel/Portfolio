// Define the base URL of the PokeAPI
const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
const pokemonTypes = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying",
  "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

generateFilterBar(pokemonTypes);

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


const sortBySelect = document.getElementById("sort-by");
sortBySelect.addEventListener("change", () => {
  const selectedOption = sortBySelect.value;
  sortPokemons(selectedOption);
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
          // Process the data for each Pokémon

          // Get the container element to hold Pokémon information
          const pokemonsContainer = document.getElementById('pokemons');

          // Extract the Pokémon's name and image URL from the data
          const pokemonName = pokemonData.name;
          const pokemonImageUrl = pokemonData.sprites.front_default;
          // Check if the Pokémon has an image URL
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

            // Set the styles for the cardTopDesign element
            cardTopDesign.style.position = "absolute";
            cardTopDesign.style.top = "0";
            cardTopDesign.style.width = "100%";
            cardTopDesign.style.height = "120px";
            cardTopDesign.style.borderRadius = "0 0 100% 100%";
            cardTopDesign.style.zIndex = "-1";

            // Add classes to the container element
            container.classList.add('poke-container', 'relative', 'flex', 'flex-col', 'items-center', 'py-12', 'bg-gray-100');
            container.style.boxShadow = "0 10px 30px 5px rgba(0, 0, 0, 0.2)";
            // Add classes and content to the hpDiv element
            hpDiv.classList.add("px-2", "py-1", "rounded-full", 'flex', 'flex-row', 'gap-2', 'bg-gray-400');
            hpText.classList.add("block","stat-name");
            hpValue.classList.add("block","stat-value");
            hpText.textContent = pokemonData.stats[0].stat.name;
            hpValue.textContent = pokemonData.stats[0].base_stat;

            // Add classes and content to the name element
            name.classList.add('font-bold', 'text-lg');
            name.textContent = pokemonName;

            // Set the image source and alt attribute
            image.src = pokemonImageUrl;
            image.alt = pokemonName;

            // Add classes to the typeImgContainer element
            typeImgContainer.classList.add('grid', 'gap-4');
            pokemonData.types.length === 1 ? typeImgContainer.classList.add('grid-cols-1') : typeImgContainer.classList.add('grid-cols-2');

            // Append child elements to the hpDiv element
            hpDiv.appendChild(hpText);
            hpDiv.appendChild(hpValue);

            // Append child elements to the container element
            container.appendChild(hpDiv);
            container.appendChild(name);
            container.appendChild(image);

            // Loop through the stats of the Pokémon and create elements for 3 of the stats
            for (const { stat, base_stat } of pokemonData.stats) {
              if (!['special-attack', 'special-defense', 'hp'].includes(stat.name)) {
                const statElement = document.createElement('div');
                const statName = document.createElement('span');
                const statValue = document.createElement('span');

                // Add classes and content to the statElement
                statContainer.classList.add('flex', 'flex-row', 'gap-4', 'text-center', 'p-2');
                statElement.classList.add('grid', 'grid-rows-2');
                statName.textContent = stat.name;
                statValue.textContent = base_stat;

                // Add classes to the statName and statValue elements
                statName.classList.add('block');
                statValue.classList.add('block', 'font-bold','stat-value');

                // Append child elements to the statElement
                statElement.appendChild(statValue);
                statElement.appendChild(statName);

                // Append the statElement to the statContainer
                statContainer.appendChild(statElement);
              }
            }

            // Create an array to store the Pokémon types
            let typeCount = [];

            // Loop through the types of the Pokémon
            for (const { type } of pokemonData.types) {
              // Add the type name to the typeCount array
              typeCount.push(type.name);

              // Create an image element for the type
              const typeImg = document.createElement('img');
              typeImg.style.width = '25px';
              typeImg.src = `pokemonTypes/${type.name}.png`;

              // Add a class to the name element based on the type
              name.classList.add(`type-${type.name}`);

              // Append the typeImg to the typeImgContainer
              typeImgContainer.appendChild(typeImg);

              // Set the background color of cardTopDesign based on the type count
              if (typeCount.length === 1) {
                cardTopDesign.style.backgroundColor = `var(--${type.name}-color)`;
              } else {
                // Get the color values from CSS variables
                let color1 = getComputedStyle(document.documentElement).getPropertyValue(`--${typeCount[0]}-color`);
                let color2 = getComputedStyle(document.documentElement).getPropertyValue(`--${typeCount[1]}-color`);

                // Convert hex colors to RGB format
                let rgbColor1 = hexToRgb(color1);
                let rgbColor2 = hexToRgb(color2);

                // Calculate the combined color
                let combinedColor = mixColors(rgbColor1, rgbColor2);

                // Set the background color of cardTopDesign using the combined color
                cardTopDesign.style.backgroundColor = `rgb(${combinedColor.r}, ${combinedColor.g}, ${combinedColor.b})`;
              }
            }

            // Append child elements to the container element
            container.appendChild(typeImgContainer);
            container.appendChild(statContainer);
            container.appendChild(cardTopDesign);

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

// Utility function to convert a hexadecimal color code to RGB format
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return { r, g, b };
  }
  return null;
}

// Utility function to mix two RGB colors
function mixColors(color1, color2) {
  const r = Math.round((color1.r + color2.r) / 2);
  const g = Math.round((color1.g + color2.g) / 2);
  const b = Math.round((color1.b + color2.b) / 2);
  return { r, g, b };
}

// This function generates a filter bar based on the given types.
function generateFilterBar(types) {
  let target = document.getElementById('filter-bar');

  // Loop through each type in the types array.
  for (let i = 0; i < types.length; i++) {
    const filterBtn = document.createElement('button');
    filterBtn.classList.add('filter-button','relative','flex','items-center','rounded-md', 'text-lg', 'font-bold','p-2');
    filterBtn.id = types[i];
    filterBtn.innerHTML = `<img width="25px" class="flex-none" src="pokemonTypes/${types[i]}.png" alt="Image"> <span class="grow">${types[i]}</span>`;
    filterBtn.style.backgroundColor = `var(--${types[i]}-color)`;

    // Append the filter button to the target element.
    target.appendChild(filterBtn);

    // Add a click event listener to the filter button.
    filterBtn.addEventListener("click", () => {
      filterBtn.classList.toggle('active');
      filterBtn.classList.toggle('clicked');

      // Get all the buttons with the 'active' class and create an array of their IDs.
      const selectedTypes = Array.from(target.getElementsByClassName('active')).map(button => button.id);

      // Call the filterPokemons function with the selected types.
      filterPokemons(selectedTypes);
    });
  }
}

// This function filters the pokemons based on the given types.
function filterPokemons(types) {
  const pokemonsContainer = document.getElementById('pokemons');
  const pokemons = pokemonsContainer.getElementsByClassName('poke-container');

  // Loop through each pokemon.
  Array.from(pokemons).forEach(pokemon => {
    const typeImgContainer = pokemon.getElementsByClassName('grid')[0];
    const typeImages = typeImgContainer.getElementsByTagName('img');

    let hasTypes = true;

    // Loop through each type image of the pokemon.
    Array.from(typeImages).forEach(image => {
      const type = image.getAttribute('src').split("/").pop().split(".")[0];

      // Check if the pokemon has any of the selected types.
      if (types.length > 0 && !types.includes(type)) {
        hasTypes = false;
      }
    });

    // Show or hide the pokemon based on the selected types.
    if (hasTypes || types.length === 0) {
      pokemon.style.display = 'flex';
    } else {
      pokemon.style.display = 'none';
    }
  });
}

function sortPokemons(option) {
  const pokemonsContainer = document.getElementById("pokemons");
  const pokemons = Array.from(pokemonsContainer.getElementsByClassName("poke-container"));

  // Sort the pokemons based on the selected option
  switch (option) {
    case "name":
      // Sorting by name remains the same as before
      pokemons.sort((a, b) => {
        const nameA = a.getElementsByTagName("h3")[0].textContent.toLowerCase();
        const nameB = b.getElementsByTagName("h3")[0].textContent.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      break;
    case "attackdmg":
      // Sorting by attack damage remains the same as before
      pokemons.sort((a, b) => {
        const attackDmgA = parseInt(a.getElementsByClassName("stat-value")[1].textContent);
        const attackDmgB = parseInt(b.getElementsByClassName("stat-value")[1].textContent);
        return attackDmgB - attackDmgA;
      });
      break;
    case "defense":
      // Sorting by defense
      pokemons.sort((a, b) => {
        const defenseA = parseInt(a.getElementsByClassName("stat-value")[2].textContent);
        const defenseB = parseInt(b.getElementsByClassName("stat-value")[2].textContent);
        return defenseB - defenseA;
      });
      break;
    case "speed":
      // Sorting by speed
      pokemons.sort((a, b) => {
        const speedA = parseInt(a.getElementsByClassName("stat-value")[3].textContent);
        const speedB = parseInt(b.getElementsByClassName("stat-value")[3].textContent);
        return speedB - speedA;
      });
      break;
    case "hp":
      // Sorting by HP
      pokemons.sort((a, b) => {
        const hpA = parseInt(a.getElementsByClassName("stat-value")[0].textContent);
        const hpB = parseInt(b.getElementsByClassName("stat-value")[0].textContent);
        return hpB - hpA;
      });
      break;
    default:
      // Do nothing for unknown options
      return;
  }

  // Append the sorted pokemons back to the container
  pokemons.forEach(pokemon => {
    pokemonsContainer.appendChild(pokemon);
  });
}
