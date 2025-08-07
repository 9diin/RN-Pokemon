import { AppHeader } from "@/src/components/common";
import { POKEMON_IMG } from "@/src/constants/pokemon-img.constant";
import { FlatList, Image, Text, View } from "react-native";

export default function PokedexScreen() {
    return (
        <View className="flex-1 pb-8">
            <AppHeader />
            <View className="p-4 gap-4">
                <Text className="text-3xl" style={{ fontFamily: "DungGeunMo" }}>
                    내 도감
                </Text>
                <FlatList
                    data={POKEMON_IMG}
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        marginBottom: 14, // 행 간 간격
                    }}
                    renderItem={({ item }) => (
                        <View
                            className="h-52 bg-neutral-200/50 rounded-xl items-center justify-center"
                            style={{
                                width: "31%", // 대략 3등분 + 여백 고려
                            }}
                        >
                            <Image source={{ uri: item.imgUrl }} style={{ width: 80, height: 80 }} resizeMode="contain" className="opacity-20" />
                            <Text className="text-lg text-neutral-400">{item.id}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
}
