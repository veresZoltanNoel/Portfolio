function createLightbox() {
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox','fixed','top-0','left-0','w-full','h-full','flex','justify-center','items-center','z-50');
  return lightbox;
}

function createContentContainer(types) {
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('lightbox-content-container','p-5','rounded-md','text-center');

  const pokemonTypes = extractPokemonTypes(types);
  applyContentContainerStyle(contentContainer, pokemonTypes);

  return contentContainer;
}

function extractPokemonTypes(types) {
  const pokemonTypes = [];
  for (const { type } of types) {
    pokemonTypes.push(type.name);
  }
  return pokemonTypes;
}

function applyContentContainerStyle(contentContainer, pokemonTypes) {
  if (pokemonTypes.length === 1) {
    contentContainer.style.backgroundColor = `var(--${pokemonTypes[0]}-color)`;
  } else {
    contentContainer.style.backgroundImage = `linear-gradient(to bottom right, var(--${pokemonTypes[0]}-color) 50%, var(--${pokemonTypes[1]}-color) 50%)`;
  }
}

function createContent(imageUrl, name, types) {
  const content = document.createElement("div");
  content.classList.add('grid','grid-cols-2','justify-items-center','pt-4','px-4');
  content.style.backgroundColor ='rgba(0, 0, 0, 0.4)';

  const image = createImage(imageUrl);
  const nameElement = createNameElement(name);
  const typeDataContainer = createTypeDataContainer(types);
  const typeInfoContainer = createTypeInfoContainer(types);

  appendChildElements(content, [nameElement, image, typeDataContainer, typeInfoContainer]);
  return content;
}

function createImage(imageUrl) {
  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = 'Pokemon Image';
  image.style.width = "200px";
  image.style.height = "200px";
  image.classList.add('col-span-2')
  return image;
}

function createNameElement(name) {
  const nameElement = document.createElement('h2');
  nameElement.textContent = name;
  nameElement.classList.add('col-span-2','text-white','font-bold','text-2xl');
  return nameElement;
}

function createTypeDataContainer(types) {
  const typeDataContainer = document.createElement("div");
  typeDataContainer.classList.add('flex','flex-col','p-4','justify-center','col-span-2');

  const typeData = document.createElement('div');
  typeData.classList.add('flex','flex-row','gap-4','justify-center');

  const type = document.createElement('h2');
  type.textContent = "Pokemon type:";
  type.classList.add('text-white','font-bold','text-lg');

  typeDataContainer.appendChild(type);
  typeDataContainer.appendChild(typeData);

  const pokemonTypes = extractPokemonTypes(types);
  createTypeIcons(typeData, pokemonTypes);

  return typeDataContainer;
}

function createTypeIcons(typeData, pokemonTypes) {
  pokemonTypes.forEach(type => {
    const typeImg = document.createElement("img");
    typeImg.src = `./imgs/pokemonTypes/${type}.png`;
    typeImg.width = "50";
    typeImg.height = "50";
    typeData.appendChild(typeImg);
  });
}

function createTypeInfoContainer(types) {
  const typeInfoContainer = document.createElement('div');
  typeInfoContainer.classList.add('p-4','justify-center','col-span-2','gap-4','flex','flex-col');

  const weakAganistContainer = createTypeMatchupContainer('Weak against:');
  const strongAganistContainer = createTypeMatchupContainer('Strong against:');

  const pokemonTypes = extractPokemonTypes(types);
  fillTypeMatchupContainer(pokemonTypes, weakAganistContainer, 'weak');
  fillTypeMatchupContainer(pokemonTypes, strongAganistContainer, 'strong');

  appendChildElements(typeInfoContainer, [strongAganistContainer, weakAganistContainer]);
  return typeInfoContainer;
}

function createTypeMatchupContainer(labelText) {
  const container = document.createElement("div");
  const icons = document.createElement("div");
  const label = document.createElement('h2');

  label.classList.add('text-white','font-bold','text-lg');
  label.textContent = labelText;
  icons.classList.add('grid','grid-cols-6','gap-4','justify-center');

  appendChildElements(container, [label, icons]);
  return container;
}

function fillTypeMatchupContainer(pokemonTypes, container, matchupType) {
  for (const type in pokemonTypeInformations) {
    if (pokemonTypes.includes(type)) {
      const matchupIcons = container.querySelector("div");
      const matchupTypeArr = pokemonTypeInformations[type][matchupType];

      for (const matchupType of matchupTypeArr) {
        const matchupImg = document.createElement("img");
        matchupImg.src = `./imgs/pokemonTypes/${matchupType}.png`;
        matchupImg.width = "35";
        matchupImg.height = "35";

        const existingMatchupImages = matchupIcons.querySelectorAll("img");
        const isAlreadyAdded = Array.from(existingMatchupImages).some(
          (img) => img.src === matchupImg.src
        );

        if (!isAlreadyAdded) {
          matchupIcons.appendChild(matchupImg);
        }
      }
    }
  }
}

function createChartContainer(stats) {
  const chartContainer = document.createElement('div');
  chartContainer.id = 'chart_div';
  chartContainer.classList.add('chart-container', 'col-span-2','-mx-4');

  const statValueArr = stats.map(stat => stat.base_stat);
  drawChart(statValueArr);

  return chartContainer;
}

function drawChart(statValueArr) {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(() => {
    const data = google.visualization.arrayToDataTable([
      ['Ability', 'Value',{ role: 'style' }],
      ['Hp', statValueArr[0],'#ff5959'],
      ['Attack', statValueArr[1],'#f5ac79'],
      ['Defense', statValueArr[2],'#f9e079'],
      ['Sp. Atk', statValueArr[3],'#9db7f4'],
      ['Sp. Def', statValueArr[4],'#a7dc8e'],
      ['Speed', statValueArr[5],'#fb92b1']
    ]);

    const options = {
      title: '',
      vAxis: {
        viewWindow: { max: 255 },
        textStyle: { color: '#FFF' }
      },
      hAxis: {
         textStyle: { color: '#FFF' }
      },
      backgroundColor: {
        fill: 'black',
        fillOpacity: 0.4
      },
      legend: 'none',
      annotations: {
        textStyle: {
          bold: true,
          auraColor: "none",
        }
      }
    };

    const view = new google.visualization.DataView(data);
    view.setColumns([
      0, 1,
      { calc: "stringify", sourceColumn: 1, type: "string", role: "annotation" },
      2
    ]);

    const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(view, options);
  });
}
function openLightbox(imageUrl, name, stats, types) {
  const lightbox = createLightbox();
  const contentContainer = createContentContainer(types);
  const content = createContent(imageUrl, name, types);
  const chartContainer = createChartContainer(stats);

  appendChildElements(content, [chartContainer]);
  appendChildElements(contentContainer, [content]);
  lightbox.appendChild(contentContainer);
  document.body.appendChild(lightbox);

  lightbox.addEventListener('click', () => {
    lightbox.remove();
  });
}

console.log(pokemonTypeInformations);