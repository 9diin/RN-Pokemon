import { POKEMON_TYPE_COLORS } from "@/src/constants/pokemon-type.constant";
import { useState } from "react";
import { FlatList, Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Pokemon {
    id: number; // 포켓몬 id
    ko: string; // 한글 이름
    en: string; // 영어 이름
    imgUrl: string; // 포켓몬 이미지
    types: string[]; // 포켓몬 타입
    weight: number;
    height: number;
    abilities: {
        ability: {
            name: string;
        };
    }[];
    species: string;
    description: string;
    captureRate: number;
    stats: number[];
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
            <Modal visible={modalVisible} presentationStyle="fullScreen" animationType="slide">
                {/* SafeAreaView는 루트에 한 번만! */}
                <SafeAreaView className="flex-1 bg-neutral-50">
                    {/* 전체 레이아웃: 스크롤 영역 + 버튼 영역 */}
                    <View className="flex-1 p-4">
                        {/* 콘텐츠 영역 (스크롤 가능) */}
                        <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
                            {/* 이름 + 타입 */}
                            <View className="flex-row items-end gap-2 mb-4">
                                <Text className="text-3xl font-bold -mb-1">{props.ko}</Text>
                                <FlatList
                                    data={props.types}
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
                            <View className="flex-row gap-4 w-full">
                                {/* 이미지 영역 - 고정 비율 대신 높이 고정 or flex 정렬 */}
                                <View className="w-[116px]">
                                    <Image source={{ uri: props.imgUrl }} className="w-full aspect-square border border-neutral-200 rounded-xl bg-white" />
                                </View>
                                {/* 정보 영역 */}
                                <View className="flex-1">
                                    {/* 능력 수치들 */}
                                    <View className="gap-2">
                                        {[
                                            { label: "포획률", value: (props.captureRate / 2.55).toFixed(2) + "%" },
                                            { label: "체력", value: props.stats[0] },
                                            { label: "공격력", value: props.stats[1] },
                                            { label: "방어력", value: props.stats[2] },
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

                            <View className="w-full gap-4 items-center mt-5">
                                {/* 설명 */}
                                <View className="w-full px-[1px]">
                                    <View className="w-full gap-1 p-4 bg-white rounded-2xl border border-neutral-200">
                                        <Text className="text-neutral-500 font-bold text-base">소개</Text>
                                        <Text>{props.description}</Text>
                                    </View>
                                </View>

                                {/* 구분선 */}
                                <View className="h-[1px] w-full bg-neutral-200" />

                                {/* 특징 */}
                                <View className="flex-row flex-wrap justify-between px-[1px]">
                                    {/* HEIGHT */}
                                    <View className="w-[48%] p-4 bg-white rounded-2xl border border-neutral-200 mb-4">
                                        <Text className="text-neutral-500 font-bold text-base">키</Text>
                                        <Text className="text-base">{(props.height * 0.1).toFixed(2)}m</Text>
                                    </View>
                                    {/* WEIGHT */}
                                    <View className="w-[48%] p-4 bg-white rounded-2xl border border-neutral-200 mb-4">
                                        <Text className="text-neutral-500 font-bold text-base">몸무게</Text>
                                        <Text className="text-base">{(props.weight * 0.1).toFixed(2)}kg</Text>
                                    </View>
                                    {/* SPECIES */}
                                    <View className="w-[48%] p-4 bg-white rounded-2xl border border-neutral-200">
                                        <Text className="text-neutral-500 font-bold text-base">분류</Text>
                                        <Text className="text-base">{props.species}</Text>
                                    </View>
                                    {/* ABILITIES */}
                                    <View className="w-[48%] p-4 bg-white rounded-2xl border border-neutral-200">
                                        <Text className="text-neutral-500 font-bold text-base">특성</Text>
                                        <View className="flex-row flex-wrap gap-x-2 gap-y-1 mt-2">
                                            {props.abilities.map((item) => (
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
                                <Pressable className="bg-neutral-200 py-4 px-6 rounded-lg" onPress={() => setModalVisible(false)}>
                                    <Text className="font-semibold">Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </>
    );
}
