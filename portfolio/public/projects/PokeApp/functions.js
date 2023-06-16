// Utility function to convert a hexadecimal color code to RGB format
function hexToRgb(hex) {
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
  function createFilterBar(types) {
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
      const typeImgContainerElement = pokemon.getElementsByClassName('grid')[0];
      const typeImages = typeImgContainerElement.getElementsByTagName('img');

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

  // This function filters the pokemons based on the selected option.
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

  // Utility function to append child elements to a parent element
  function appendChildElements(parentElement, elements) {
    elements.forEach(element => {
      parentElement.appendChild(element);
    });
  }

  // Function to create a container element for a Pokemon
  function createPokemonContainer() {
    const containerElement = document.createElement('div');
    containerElement.classList.add('poke-container', 'relative', 'flex', 'flex-col', 'items-center', 'py-12', 'bg-gray-100');
    containerElement.style.boxShadow = "0 10px 30px 5px rgba(0, 0, 0, 0.2)";
    return containerElement;
  }

  // Function to create an element for Pokemon name
  function createPokemonName(name) {
    const nameElement = document.createElement('h3');
    nameElement.classList.add('font-bold', 'text-lg');
    nameElement.textContent = name;
    return nameElement;
  }

  // Function to create an element for Pokemon image
  function createPokemonImage(imageUrl, altText) {
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = `Image showing ${altText}`;
    return imageElement;
  }

  // Function to create elements for Pokemon stats
  function createPokemonStats(stats) {
    const statContainerElement = document.createElement('div');

    statContainerElement.classList.add('flex', 'flex-row', 'gap-4', 'text-center', 'p-2');

    for (const { stat, base_stat } of stats) {
      if (!['special-attack', 'special-defense', 'hp'].includes(stat.name)) {
        const statElement = document.createElement('div');
        const statName = document.createElement('span');
        const statValue = document.createElement('span');

        statElement.classList.add('grid', 'grid-rows-2');
        statName.classList.add('block');
        statValue.classList.add('block', 'font-bold', 'stat-value');

        statName.textContent = stat.name;
        statValue.textContent = base_stat;

        appendChildElements(statElement,[statValue,statName]);
        statContainerElement.appendChild(statElement);
      }
    }

    return [statContainerElement];
  }

  // Function to create elements for Pokemon types and color design
  function createPokemonTypesAndColorDesign(types, name, cardTopDesign) {
    const typeImgContainer = document.createElement('div');
    const typeCount = [];

    typeImgContainer.classList.add('grid', 'gap-4');
    types.length === 1 ? typeImgContainer.classList.add('grid-cols-1') : typeImgContainer.classList.add('grid-cols-2');

    for (const { type } of types) {
      typeCount.push(type.name);
      const typeImg = document.createElement('img');
      typeImg.style.width = '25px';
      typeImg.src = `pokemonTypes/${type.name}.png`;
      name.classList.add(`type-${type.name}`);
      typeImgContainer.appendChild(typeImg);

      if (typeCount.length === 1) {
        cardTopDesign.style.backgroundColor = `var(--${type.name}-color)`;
      } else {
        // Get the color values from CSS variables
        let hexColor1 = getComputedStyle(document.documentElement).getPropertyValue(`--${typeCount[0]}-color`);
        let hexColor2 = getComputedStyle(document.documentElement).getPropertyValue(`--${typeCount[1]}-color`);

        // Convert hex colors to RGB format
        let rgbColor1 = hexToRgb(hexColor1);
        let rgbColor2 = hexToRgb(hexColor2);

        // Calculate the combined color
        let combinedColor = mixColors(rgbColor1, rgbColor2);

        // Set the background color of cardTopDesign using the combined color
        cardTopDesign.style.backgroundColor = `rgb(${combinedColor.r}, ${combinedColor.g}, ${combinedColor.b})`;
      }
    }

    return [typeImgContainer];
  }

  // Function to create an element for HP (hit points)
  function createHpElement(hp) {
    const hpDivElement = document.createElement("div");
    const hpValueElement = document.createElement("span");
    const hpTextElement = document.createElement("span");

    hpDivElement.classList.add("px-2", "py-1", "rounded-full", 'flex', 'flex-row', 'gap-2', 'bg-gray-400');
    hpTextElement.classList.add("block","stat-name");
    hpValueElement.classList.add("block","stat-value");

    hpTextElement.textContent = hp[0].stat.name;
    hpValueElement.textContent = hp[0].base_stat;

    appendChildElements(hpDivElement,[hpTextElement, hpValueElement]);

    return hpDivElement;
  }

  // Function to create a decorative element for the top design of a Pokemon card
  function createcardTopDesignElement() {
    const cardTopDesign = document.createElement("div");
    cardTopDesign.style.position = "absolute";
    cardTopDesign.style.top = "0";
    cardTopDesign.style.width = "100%";
    cardTopDesign.style.height = "120px";
    cardTopDesign.style.borderRadius = "0 0 100% 100%";
    cardTopDesign.style.zIndex = "-1";

    return cardTopDesign;
  }
