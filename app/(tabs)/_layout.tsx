import { Tabs } from "expo-router";
import { BookMarked, Crown, LayoutDashboard, Swords, User } from "lucide-react-native";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { height: 60 },
                tabBarLabelStyle: {
                    marginTop: 2,
                },
            }}
        >
            <Tabs.Screen name="index" options={{ title: "사냥터", tabBarIcon: ({ color }) => <Swords size={20} color={color} /> }} />
            <Tabs.Screen name="pokedex" options={{ title: "도감", tabBarIcon: ({ color }) => <BookMarked size={20} color={color} /> }} />
            <Tabs.Screen name="rank" options={{ title: "랭킹", tabBarIcon: ({ color }) => <Crown size={20} color={color} /> }} />
            <Tabs.Screen name="dashboard" options={{ title: "대시보드", tabBarIcon: ({ color }) => <LayoutDashboard size={20} color={color} /> }} />
            <Tabs.Screen name="profile" options={{ title: "프로필", tabBarIcon: ({ color }) => <User size={20} color={color} /> }} />
        </Tabs>
    );
}
