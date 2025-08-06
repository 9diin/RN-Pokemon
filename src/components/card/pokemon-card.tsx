import { POKEMON_TYPE_COLORS } from "@/src/constants/pokemon-type.constant";
import { useState } from "react";
import { FlatList, Image, Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Pokemon {
    id: number; // 포켓몬 id
    ko: string; // 한글 이름
    en: string; // 영어 이름
    imgUrl: string; // 포켓몬 이미지
    types: string[]; // 포켓몬 타입
}

interface Props {
    props: Pokemon;
}

export function PokemonCard({ props }: Props) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <>
            <Pressable className="w-full p-4 bg-white rounded-2xl shadow-sm" onPress={() => setModalVisible(!modalVisible)}>
                <Image source={{ uri: props.imgUrl }} className="w-full aspect-square object-contain" />
                <View className="gap-4 -mt-2">
                    <View>
                        <View className="flex-row items-end gap-2">
                            <Text className="text-2xl font-bold">{props.ko}</Text>
                            <Text className="text-base text-neutral-400 font-bold">{props.en}</Text>
                        </View>

                        <Text className="text-neutral-400">2 owned</Text>
                    </View>
                    <View className="flex-row gap-2">
                        <FlatList
                            data={props.types}
                            renderItem={({ item }) => (
                                <View className="px-3 py-1 rounded-md" style={{ backgroundColor: POKEMON_TYPE_COLORS[item as keyof typeof POKEMON_TYPE_COLORS].color }}>
                                    <Text className="text-white font-semibold">{POKEMON_TYPE_COLORS[item as keyof typeof POKEMON_TYPE_COLORS].type_ko}</Text>
                                </View>
                            )}
                            horizontal={true}
                            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                        />
                    </View>
                </View>
            </Pressable>
            <Modal visible={modalVisible} animationType="slide">
                <SafeAreaView className="p-4 gap-4">
                    <View className="items-center">
                        <Image source={{ uri: props.imgUrl }} className="w-3/4 aspect-square object-contain" />
                        <View className="gap-4 items-center">
                            <Text className="text-4xl font-bold">리자몽</Text>
                            <View className="flex-row items-center gap-2">
                                <View className="flex-row gap-2">
                                    <View className="bg-neutral-100 px-4 py-[6px] rounded-md">
                                        <Text className="text-neutral-400">Normal</Text>
                                    </View>
                                    <View className="bg-rose-100 px-4 py-[6Px] rounded-md">
                                        <Text className="text-rose-400">Fire</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="h-[1px] w-full bg-neutral-200" />
                    <View className="flex-row w-full gap-4">
                        <Pressable className="flex-1 flex-row justify-center items-center gap-2 bg-amber-200 py-3 px-6 rounded-lg" onPress={() => alert("포획 버튼을 클릭하였습니다.")}>
                            <Image source={require("@/assets/images/pokeball.png")} className="w-6 aspect-square" />
                            <Text className="font-semibold">Catch !!</Text>
                        </Pressable>
                        <Pressable className="bg-neutral-200 py-4 px-6 rounded-lg" onPress={() => setModalVisible(false)}>
                            <Text className="font-semibold">Close</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </Modal>
        </>
    );
}
