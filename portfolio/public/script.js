
import { skillArr } from './data.js';
import { projectsArr } from './data.js';

//Skill Section content
const webSKillContainer = document.getElementById("web")
const designSKillContainer = document.getElementById("design")
const otherSKillContainer = document.getElementById("other")

function createSkillElement (skill) {
    const container = document.createElement("div");
    const iconContainer = document.createElement("div");
    const icon = document.createElement("img");
    const title = document.createElement("h4");

    container.classList.add('skill', 'flex', 'flex-col', 'items-center', 'gray')

    iconContainer.classList.add('icon-container')
    iconContainer.style.borderColor = skill.color;

    icon.className ="w-8 h-8"
    icon.title = `${skill.name} icon`
    icon.src = `./imgs/icon/${skill.icon}.svg`;
    icon.loading = 'lazy'

    title.textContent = skill.name
    title.style.color = skill.color

    container.appendChild(iconContainer)
    iconContainer.appendChild(icon)
    container.appendChild(title)

    return container
}

for (const category in skillArr) {
    const subSkills = skillArr[category];
    for (const skillId in subSkills) {
        const skill = subSkills[skillId];
        //append to dom when the category if the statement is true 
        switch (category) {
            case "web":
                webSKillContainer.appendChild(createSkillElement(skill));
                break;
            case "design":
                designSKillContainer.appendChild(createSkillElement(skill));
                break;
            case "other":
                otherSKillContainer.appendChild(createSkillElement(skill));
                break;
            default:
                break;
        }
    }
}

const skills = document.querySelectorAll('.skill');
function removeGrayscale() {
  //Random 1 - 4
  const elementsToChange = Math.floor(Math.random() * 4) + 1;
  
  //Shuffle the array of skills
  const shuffledSkillElements = Array.from(skills).sort(() => 0.5 - Math.random());
  
  //Remove grayscale from "elementsToChange"-> elements = colored
  for (let i = 0; i < elementsToChange; i++) {
    shuffledSkillElements[i].classList.remove('gray');
    
    //Add the "scale" class to the colored els
    if (!shuffledSkillElements[i].classList.contains('gray')) {
      shuffledSkillElements[i].classList.add('scale');
    }
  }
  
  //Add back to the grayscale to the remaining elements
  for (let i = elementsToChange; i < skills.length; i++) {
    shuffledSkillElements[i].classList.add('gray');
    shuffledSkillElements[i].classList.remove('scale');
  }
} setInterval(removeGrayscale, 1000);


//Mobile navigation
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
  
    mobileMenuBtn.addEventListener('click', function () {
      mobileNav.classList.toggle('hidden');
    });
});


//Projects section content
const projectGrid = document.querySelector('.project-grid');
function createProjectCard(project) {
  const card = document.createElement('div');
  const image = document.createElement('img');
  const cardBody = document.createElement('div');
  const title = document.createElement('h3');
  const description = document.createElement('p');
  const badge = document.createElement('span');

  card.classList.add('project-card', 'rounded-lg', 'overflow-hidden', 'shadow-lg', 'w-3/4', 'cursor-pointer');

  image.classList.add('w-full');
  image.src = project.image;
  image.alt = project.title;
  image.loading = 'lazy'
  image.style.filter = 'grayscale(100%)';
  image.style.transition = 'filter .7s ease';

  cardBody.classList.add('p-4');

  title.classList.add('text-xl', 'font-bold');
  title.textContent = project.title;

  description.classList.add('text-gray-700', 'mt-2');
  description.textContent = project.description;

  // Add badge for projects in development
  if (project.isInDevelopment) {
    badge.classList.add('bg-red-500', 'text-white', 'px-2', 'py-1', 'text-xs', 'absolute', 'top-2', 'right-2','z-50');
    badge.textContent = 'In Development';
    card.classList.add('relative');
    card.appendChild(badge);
  }

  card.appendChild(image);
  card.appendChild(cardBody);
  cardBody.appendChild(title);
  cardBody.appendChild(description);

  // Add hover effect to remove grayscale
  card.addEventListener('mouseenter', () => {
    image.style.filter = 'grayscale(0)';
  });

  // Reset grayscale on mouse leave
  card.addEventListener('mouseleave', () => {
    image.style.filter = 'grayscale(100%)';
  });

  card.addEventListener('click', () => {
    window.open(project.link, '_blank');
  });

  return card;
}



projectsArr.forEach((project) => {
  const card = createProjectCard(project);
  projectGrid.appendChild(card);
});
