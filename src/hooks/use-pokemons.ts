import axios from "axios";
import { useState } from "react";

interface Pokemon {
    id: number;
    ko: string;
    en: string;
    imgUrl: string;
    types: string[];
}

export const usePokemons = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);

        try {
            // 1~151 중 랜덤한 숫자 10개 뽑기 (중복 없이)
            const randomIds = pickRandomUniqueNumbers(1, 151, 10);

            // 각각의 포켓몬 데이터 요청
            const requests = randomIds.map((id) => Promise.all([axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`), axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)]));

            const responses = await Promise.all(requests);

            const newPokemons: Pokemon[] = responses.map(([pokemonRes, speciesRes]) => {
                const pokemon = pokemonRes.data;
                const species = speciesRes.data;
                const koreanEntry = species.names.find((name: any) => name.language.name === "ko");

                return {
                    id: pokemon.id,
                    ko: koreanEntry?.name || pokemon.name,
                    en: pokemon.name,
                    imgUrl: pokemon.sprites.front_default,
                    types: pokemon.types.map((t: any) => t.type.name),
                };
            });

            setPokemons(newPokemons);
            console.log(newPokemons);
        } catch (error) {
            console.error("POKEMON API ERROR:", error);
        } finally {
            setLoading(false);
        }
    };

    return { pokemons, loading, fetchData };
};

// 중복 없이 랜덤 숫자 N개 뽑기
function pickRandomUniqueNumbers(min: number, max: number, count: number): number[] {
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
    const shuffled = numbers.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count);
}
