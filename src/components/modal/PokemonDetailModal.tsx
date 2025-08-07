import { POKEMON_TYPE_COLORS } from "@/src/constants/pokemon-type.constant";
import { FlatList, Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    visible: boolean;
    onClose: () => void;
    pokemon: Pokemon;
}

export function PokemonDetailModal({ visible, onClose, pokemon }: Props) {
    return (
        <Modal visible={visible} presentationStyle="fullScreen" animationType="slide">
            <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
                <View className="flex-1 p-4 bg-neutral-50">
                    <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
                        {/* 상단 이름 + 타입 */}
                        <View className="flex-row items-end gap-2 mb-4">
                            <Text className="text-3xl font-bold -mb-1">{pokemon.ko}</Text>
                            <FlatList
                                data={pokemon.types}
                                renderItem={({ item }) => (
                                    <View
                                        className="h-6 px-3 py-[2px] rounded-md"
                                        style={{
                                            backgroundColor: POKEMON_TYPE_COLORS[item as keyof typeof POKEMON_TYPE_COLORS].color,
                                        }}
                                    >
                                        <Text className="text-sm text-white font-semibold">{POKEMON_TYPE_COLORS[item as keyof typeof POKEMON_TYPE_COLORS].type_ko}</Text>
                                    </View>
                                )}
                                horizontal
                                ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
                                scrollEnabled={false}
                                style={{ flexGrow: 0 }}
                            />
                        </View>

                        {/* 이미지 + 스탯 */}
                        <View className="flex-row gap-4 w-full">
                            <View className="w-[116px]">
                                <Image source={{ uri: pokemon.imgUrl }} className="w-full aspect-square border border-neutral-200 rounded-xl bg-white" />
                            </View>
                            <View className="flex-1">
                                <View className="gap-2">
                                    {[
                                        { label: "포획률", value: (pokemon.captureRate / 2.55).toFixed(2) + "%" },
                                        { label: "체력", value: pokemon.stats[0] },
                                        { label: "공격력", value: pokemon.stats[1] },
                                        { label: "방어력", value: pokemon.stats[2] },
                                    ].map((stat) => (
                                        <View key={stat.label} className="flex-row items-center gap-2">
                                            <View className="bg-neutral-100 px-[10px] py-[2px] rounded-md border border-neutral-200">
                                                <Text className="text-sm text-neutral-700 font-semibold">{stat.label}</Text>
                                            </View>
                                            <Text>{stat.value}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>

                        {/* 설명 */}
                        <View className="w-full gap-4 items-center mt-5">
                            <View className="w-full px-[1px]">
                                <View className="w-full gap-1 p-4 bg-white rounded-2xl border border-neutral-200">
                                    <Text className="text-neutral-500 font-bold text-base">소개</Text>
                                    <Text>{pokemon.description}</Text>
                                </View>
                            </View>

                            <View className="h-[1px] w-full bg-neutral-200" />

                            {/* 기타 정보 */}
                            <View className="flex-row flex-wrap justify-between px-[1px]">
                                <View className="w-[48%] p-4 bg-white rounded-2xl border border-neutral-200 mb-4">
                                    <Text className="text-neutral-500 font-bold text-base">키</Text>
                                    <Text className="text-base">{(pokemon.height * 0.1).toFixed(2)}m</Text>
                                </View>
                                <View className="w-[48%] p-4 bg-white rounded-2xl border border-neutral-200 mb-4">
                                    <Text className="text-neutral-500 font-bold text-base">몸무게</Text>
                                    <Text className="text-base">{(pokemon.weight * 0.1).toFixed(2)}kg</Text>
                                </View>
                                <View className="w-[48%] p-4 bg-white rounded-2xl border border-neutral-200">
                                    <Text className="text-neutral-500 font-bold text-base">분류</Text>
                                    <Text className="text-base">{pokemon.species}</Text>
                                </View>
                                <View className="w-[48%] p-4 bg-white rounded-2xl border border-neutral-200">
                                    <Text className="text-neutral-500 font-bold text-base">특성</Text>
                                    <View className="flex-row flex-wrap gap-x-2 gap-y-1 mt-2">
                                        {pokemon.abilities.map((item) => (
                                            <View key={item.ability.name} className="bg-neutral-100 px-3 py-[2px] rounded-md">
                                                <Text className="text-sm text-neutral-700 font-semibold">{item.ability.name}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    {/* 하단 버튼 */}
                    <View className="w-full">
                        <View className="h-[1px] w-full bg-neutral-200 mb-4" />
                        <View className="flex-row w-full gap-4 mb-4">
                            <Pressable className="flex-1 flex-row justify-center items-center gap-2 bg-amber-200 py-3 px-6 rounded-lg" onPress={() => alert("포획 버튼을 클릭하였습니다.")}>
                                <Image source={require("@/assets/images/pokeball.png")} className="w-6 aspect-square" />
                                <Text className="font-semibold">Catch !!</Text>
                            </Pressable>
                            <Pressable className="bg-neutral-200 py-4 px-6 rounded-lg" onPress={onClose}>
                                <Text className="font-semibold">Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}
