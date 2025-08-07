import axios from "axios";
import { useState } from "react";

interface Pokemon {
    id: number; // 포켓몬 id
    ko: string; // 한글 이름
    en: string; // 영어 이름
    imgUrl: string; // 포켓몬 이미지
    types: string[]; // 포켓몬 타입
    weight: number; // 포켓몬 무게
    height: number; // 포켓몬 신장
    abilities: {
        ability: {
            name: string;
        };
    }[]; // 포켓몬 특성
    species: string; // 포켓몬 분류
    description: string; // 포켓몬 소개
    captureRate: number; // 포켓몬 포획률
    stats: number[]; // 포켓몬 스텟
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

                console.log(pokemon.stats);

                return {
                    id: pokemon.id,
                    ko: koreanEntry?.name || pokemon.name,
                    en: pokemon.name,
                    imgUrl: pokemon.sprites.front_default,
                    types: pokemon.types.map((t: any) => t.type.name),
                    weight: pokemon.weight,
                    height: pokemon.height,
                    abilities: pokemon.abilities.splice(0, 5),
                    species: species.genera.find((genera: any) => genera.language.name === "ko").genus,
                    description: species.flavor_text_entries.find((genera: any) => genera.language.name === "ko").flavor_text,
                    captureRate: species.capture_rate,
                    stats: pokemon.stats.map((stat: any) => stat.base_stat),
                };
            });

            setPokemons(newPokemons);
            // console.log(newPokemons);
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
