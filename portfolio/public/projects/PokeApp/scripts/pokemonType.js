const pokemonTypeInformations = {
    normal: {
      strong: [],
      weak: ["rock", "steel"]
    },
    fire: {
      strong: ["grass", "bug", "ice", "steel"],
      weak: ["fire", "water", "rock", "dragon"]
    },
    water: {
      strong: ["fire", "ground", "rock"],
      weak: ["water", "grass", "dragon"]
    },
    electric: {
      strong: ["water", "flying"],
      weak: ["grass", "electric", "ground", "dragon"]
    },
    grass: {
      strong: ["water", "ground", "rock"],
      weak: ["grass", "dragon", "steel", "bug", "fire", "flying", "poison"]
    },
    ice: {
      strong: ["grass", "ground", "flying", "dragon"],
      weak: ["fire", "water", "steel"]
    },
    fighting: {
      strong: ["normal", "steel", "ice", "rock", "dark"],
      weak: ["poison", "flying", "psychic", "bug", "fairy"]
    },
    poison: {
      strong: ["grass", "fairy"],
      weak: ["poison", "ground", "rock", "ghost", "steel"]
    },
    ground: {
      strong: ["electric", "fire", "poison", "rock", "steel"],
      weak: ["grass", "bug"]
    },
    flying: {
      strong: ["fighting", "grass", "bug"],
      weak: ["electric", "rock", "steel"]
    },
    psychic: {
      strong: ["fighting", "poison"],
      weak: ["psychic", "dark", "steel"]
    },
    bug: {
      strong: ["grass", "psychic", "dark"],
      weak: ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"]
    },
    rock: {
      strong: ["fire", "ice", "flying", "bug"],
      weak: ["fighting", "ground", "steel"]
    },
    ghost: {
      strong: ["psychic", "ghost"],
      weak: ["dark"]
    },
    dragon: {
      strong: ["dragon"],
      weak: ["steel", "fairy"]
    },
    dark: {
      strong: ["psychic", "ghost"],
      weak: ["fighting", "dark", "fairy"]
    },
    steel: {
      strong: ["ice", "rock", "fairy"],
      weak: ["fire", "water", "electric", "steel"]
    },
    fairy: {
      strong: ["dragon", "fighting", "dark"],
      weak: ["fire", "poison", "steel"]
    }
};
