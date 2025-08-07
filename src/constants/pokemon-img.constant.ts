export const POKEMON_IMG = Array.from({ length: 151 }, (_, index) => {
    const id = (index + 1).toString().padStart(3, "0");

    return {
        id,
        imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    };
});
