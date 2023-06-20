
  function appendChildElements(parentElement, elements) {
    elements.forEach(element => {
      parentElement.appendChild(element);
    });
  }
  function createPokemonCard(types,name) {
    const pokemonCard = document.createElement("div");
    const pokemonCardContent = document.createElement("div");
    const pokemonTypes = [];

    pokemonCard.classList.add("pokemon-card", "p-4","rounded-2xl");
    pokemonCard.id = `${name}`;
    pokemonCardContent.classList.add("flex","flex-col","gap-4","text-center","rounded-2xl","p-4");
    pokemonCardContent.style.backgroundColor = "rgba(255, 255, 255, 0.216)";

    for (const { type } of types) {
      pokemonTypes.push(type.name);
      pokemonCard.classList.add(`type-${type.name}`);

      if (pokemonTypes.length === 1) {
        pokemonCard.style.backgroundColor = `var(--${type.name}-color)`;
      }
      else{
        pokemonCard.style.backgroundImage= `linear-gradient(to bottom right, var(--${pokemonTypes[0]}-color) 50%, var(--${pokemonTypes[1]}-color) 50%)`;
      }
    }
    pokemonCard.appendChild(pokemonCardContent);

    return pokemonCard;
  }
  function createPokemonCardTop(image, name) {
    const pokemonCardTop = document.createElement("div");
    const pokemonImg = document.createElement("img");
    const pokemonImgBackDesingContainer = document.createElement("div");
    const pokemonImgBackDesing = document.createElement("div");

    pokemonCardTop.classList.add("relative");
    pokemonImg.classList.add("mx-auto", "relative", "z-10");
    pokemonImg.style.width = "150px";
    pokemonImg.style.height = "150px";
    pokemonImg.src = `${image}`;
    pokemonImg.alt = `Svg image contains: ${name}`;

    pokemonImgBackDesingContainer.classList.add("absolute", "top-0", "h-full", "w-full", "flex", "justify-center", "items-center");
    pokemonImgBackDesing.classList.add("bg-white", "rounded-full","opacity-50");

    pokemonImgBackDesingContainer.appendChild(pokemonImgBackDesing);
    pokemonCardTop.appendChild(pokemonImg);
    pokemonCardTop.appendChild(pokemonImgBackDesingContainer);

    return pokemonCardTop;
  }
  function createPokemonCardBottom(id, name, types) {
    const pokemonCardBottom = document.createElement("div");
    const pokemonIdContainer = document.createElement("div")
    const pokemonId = document.createElement("span")
    const pokemonName = document.createElement("h2")
    const pokemonTypes = document.createElement("span")

    pokemonCardBottom.classList.add("flex", "flex-col", "gap-4");
    pokemonIdContainer.classList.add("flex-0");
    pokemonId.classList.add("pokemon-id","bg-gray-300", "rounded-full", "py-1", "px-4");
    pokemonId.textContent = `${id}`;
    pokemonName.classList.add("font-bold", "text-lg");
    pokemonName.textContent = `${name}`;
    pokemonTypes.textContent = "Type: ";

    for (const { type } of types) {
      pokemonTypes.textContent += ` ${type.name}`;
    }

    pokemonIdContainer.appendChild(pokemonId);
    pokemonCardBottom.appendChild(pokemonIdContainer);
    pokemonCardBottom.appendChild(pokemonName);
    pokemonCardBottom.appendChild(pokemonTypes);

    pokemonName.style.maxWidth = "200px";
    pokemonName.style.overflow = "hidden";
    pokemonName.style.textOverflow = "ellipsis";
    pokemonName.style.whiteSpace = "nowrap";

    return pokemonCardBottom;
  }
  function createTypeFilter(types) {
    const select = document.getElementById("filterDropdown");

    types.forEach(type => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      select.appendChild(option);
    });

    // Add event listener to the filter dropdown
    select.addEventListener("change", () => {
      const selectedType = select.value.toLowerCase();

      // Iterate over the existing Pokémon cards and hide/show them based on the selected type
      const pokemonCards = document.querySelectorAll(".pokemon-card");
      pokemonCards.forEach(pokemonCard => {
        const pokemonTypes = Array.from(pokemonCard.classList).filter(className => className.startsWith("type-"));

        if (selectedType === "none") {
          pokemonCard.style.display = "block";
        } else if (pokemonTypes.includes(`type-${selectedType}`)) {
          pokemonCard.style.display = "block";
        } else {
          pokemonCard.style.display = "none";
        }
      });
    });
  }


