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
        <View className="w-full h-full">
            <AppHeader />
            <View className="w-full flex-1 pt-4 px-2 gap-4">
                <View className="w-full flex-row items-center justify-between px-3">
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
                    columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 4, marginBottom: 16 }}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, marginHorizontal: 8 }}>
                            <PokemonCard props={item} />
                        </View>
                    )}
                />
            </View>
        </View>
    );
}
