import { AppHeader } from "@/src/components/common";
import { Text, View } from "react-native";

export default function HomeScreen() {
    return (
        <View className="w-full h-full">
            <AppHeader />
            <View className="p-4 gap-4">
                <Text className="text-2xl" style={{ fontFamily: "DungGeunMo" }}>
                    Gotta catch &apos;em all
                </Text>
                <View className="flex flex-row flex-wrap -mx-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <View key={i} className="w-1/2 px-2 mb-4">
                            <View className="h-72 bg-neutral-300 rounded-xl" />
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}
