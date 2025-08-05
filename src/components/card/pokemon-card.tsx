import { useState } from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function PokemonCard({ number }: { number: number }) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <>
            <Pressable className="w-1/2 p-4 bg-white rounded-2xl shadow-sm" onPress={() => setModalVisible(!modalVisible)}>
                <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png` }} className="w-full aspect-square object-contain" />
                <View className="gap-4 -mt-4">
                    <View>
                        <Text className="text-2xl font-bold">어니부기</Text>
                        <Text className="text-neutral-500">2 owned</Text>
                    </View>
                    <View className="flex-row gap-2">
                        <View className="bg-neutral-100 px-4 py-1 rounded-md">
                            <Text className="text-neutral-400">노말</Text>
                        </View>
                        <View className="bg-sky-100 px-4 py-1 rounded-md">
                            <Text className="text-sky-400">물</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
            <Modal visible={modalVisible} animationType="slide">
                <SafeAreaView className="p-4 gap-6">
                    <View className="items-center">
                        <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png` }} className="w-3/4 aspect-square object-contain" />
                        <View className="gap-4 items-center">
                            <Text className="text-4xl font-bold">리자몽</Text>
                            <View className="flex-row items-center gap-2">
                                <View className="flex-row gap-2">
                                    <View className="bg-neutral-100 px-5 py-2 rounded-md">
                                        <Text className="text-neutral-400">Normal</Text>
                                    </View>
                                    <View className="bg-rose-100 px-5 py-2 rounded-md">
                                        <Text className="text-rose-400">Fire</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="h-[1px] w-full bg-neutral-200" />
                    <View className="flex-row w-full gap-3">
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
