import { POKEMON_TYPE_COLORS } from "@/src/constants/pokemon-type.constant";
import { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { PokemonDetailModal } from "../modal";

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

interface Props {
    props: Pokemon;
}

export function PokemonCard({ props }: Props) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <>
            <Pressable className="w-full p-4 bg-white rounded-2xl border border-neutral-200" onPress={handleModal}>
                <FlatList
                    data={props.types}
                    renderItem={({ item }) => (
                        <View className="px-3 py-[2px] rounded-md" style={{ backgroundColor: POKEMON_TYPE_COLORS[item as keyof typeof POKEMON_TYPE_COLORS].color }}>
                            <Text className="text-sm text-white font-semibold">{POKEMON_TYPE_COLORS[item as keyof typeof POKEMON_TYPE_COLORS].type_ko}</Text>
                        </View>
                    )}
                    horizontal={true}
                    ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
                />
                <Image source={{ uri: props.imgUrl }} className="w-full aspect-square object-contain bg-white" />
                <View className="gap-4 -mt-2">
                    <View>
                        <View className="flex-row items-end gap-1">
                            <Text className="text-xl font-bold">{props.ko}</Text>
                            <Text className="text-sm text-neutral-400 font-semibold">{props.en}</Text>
                        </View>
                        <Text className="text-neutral-400">2 owned</Text>
                    </View>
                </View>
            </Pressable>
            {/* 상세 모달 컴포넌트 */}
            <PokemonDetailModal visible={modalVisible} onClose={() => setModalVisible(false)} pokemon={props} />
        </>
    );
}
