import { PokemonCard } from "@/src/components/card";
import { AppHeader } from "@/src/components/common";
import { usePokemons } from "@/src/hooks";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

export default function HomeScreen() {
    const { pokemons, fetchData } = usePokemons();

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View className="w-full h-full">
            <AppHeader />
            <View className="w-full flex-1 pt-4 px-2 gap-4">
                <Text className="text-3xl ml-2" style={{ fontFamily: "DungGeunMo" }}>
                    Gotta catch &apos;em all
                </Text>
                <FlatList
                    data={pokemons}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 4, marginBottom: 16 }}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, marginHorizontal: 6 }}>
                            <PokemonCard props={item} />
                        </View>
                    )}
                />
            </View>
        </View>
    );
}
