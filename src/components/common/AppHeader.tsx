import { Image, View } from "react-native";

export function AppHeader() {
    return (
        <View className="w-full py-1 bg-white border-b-[1px] border-neutral-200">
            <Image source={require("@/assets/images/logo.png")} className="w-32 h-10 mx-auto" />
        </View>
    );
}
