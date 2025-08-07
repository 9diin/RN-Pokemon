import { PokemonCard } from "@/src/components/card";
import { AppHeader } from "@/src/components/common";
import { usePokemons } from "@/src/hooks";
import { ListRestart } from "lucide-react-native";
import { useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function HomeScreen() {
    const { pokemons, fetchData } = usePokemons();

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View className="flex-1">
            <AppHeader />
            <View className="w-full flex-1 p-4 pb-0 gap-4">
                <View className="w-full flex-row items-center justify-between">
                    <View className="bg-white px-3 py-1 rounded-lg shadow-sm">
                        <Text className="text-3xl" style={{ fontFamily: "DungGeunMo" }}>
                            Gotta catch &apos;em all
                        </Text>
                    </View>
                    <Pressable className="bg-white p-2 rounded-lg shadow-sm" onPress={fetchData}>
                        <ListRestart />
                    </Pressable>
                </View>
                <FlatList
                    data={pokemons}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                flex: 1,
                                marginRight: index % 2 === 0 ? 8 : 0, // 왼쪽 아이템은 오른쪽 마진
                                marginLeft: index % 2 === 1 ? 8 : 0, // 오른쪽 아이템은 왼쪽 마진
                            }}
                        >
                            <PokemonCard props={item} />
                        </View>
                    )}
                />
            </View>
        </View>
    );
}
