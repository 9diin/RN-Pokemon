import { PokemonCard } from "@/src/components/card";
import { AppHeader } from "@/src/components/common";
import { Text, View } from "react-native";

const DATA = Array.from({ length: 12 });

export default function HomeScreen() {
    return (
        <View className="w-full h-full bg-white">
            <AppHeader />
            <View className="p-4 gap-4 flex-1">
                <Text className="text-3xl" style={{ fontFamily: "DungGeunMo" }}>
                    Gotta catch &apos;em all
                </Text>
                <View className="flex flex-row flex-wrap -mx-2">
                    <PokemonCard number={9} />
                    <PokemonCard number={6} />
                    <PokemonCard number={3} />
                    <PokemonCard number={151} />

                    {/* <PokemonCard />
                    <PokemonCard />
                    <PokemonCard /> */}

                    {/* {[1, 2, 3, 4, 5, 6].map((i) => (
                        <View key={i} className="w-1/2 px-2 mb-4">
                            <View className="h-72 bg-neutral-200 rounded-xl" />
                        </View>
                    ))} */}
                </View>
            </View>
        </View>
    );
}
