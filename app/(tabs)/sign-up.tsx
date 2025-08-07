import { AppHeader } from "@/src/components/common";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ProfileScreeen() {
    const [nickname, setNickname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignUp = async () => {
        if (!nickname || !email || !password) {
            Alert.alert("닉네임, 이메일, 비밀번호를 모두 입력해주세요!");
            return;
        }

        console.log(email, password, nickname);

        const {
            data: { user, session },
            error,
        } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: nickname,
                },
            },
        });

        if (error) {
            Alert.alert("회원가입 실패", error.message);
            return;
        }

        // user가 정상적으로 있을 때만 insert
        if (user) {
            const { error: insertError } = await supabase.from("user").insert([
                {
                    id: user.id, // auth.users의 id와 일치
                    nickname: nickname,
                    email: email,
                    last_login: new Date(),
                },
            ]);

            if (insertError) {
                Alert.alert("유저 정보 저장 실패", insertError.message);
                return;
            }

            Alert.alert("회원가입을 성공하였습니다.");
            router.push("/(tabs)");
        } else {
            Alert.alert("이메일 인증 후 다시 시도해주세요.");
        }
    };

    return (
        <View className="w-full h-full">
            <AppHeader />
            <View className="flex-1 items-center justify-start p-8 gap-6">
                <Text className="text-3xl" style={{ fontFamily: "DungGeunMo" }}>
                    회원가입
                </Text>
                <View className="w-full gap-2">
                    <Text>닉네임</Text>
                    <TextInput placeholder="닉네임을 입력하세요." onChangeText={setNickname} className="px-4 py-3 border border-neutral-200 bg-white rounded-lg" />
                </View>
                <View className="w-full gap-2">
                    <Text>이메일</Text>
                    <TextInput placeholder="이메일을 입력하세요." onChangeText={setEmail} className="px-4 py-3 border border-neutral-200 bg-white rounded-lg" />
                </View>
                <View className="w-full gap-2">
                    <Text>비밀번호</Text>
                    <TextInput secureTextEntry placeholder="비밀번호를 입력하세요." onChangeText={setPassword} className="px-4 py-3 border border-neutral-200 bg-white rounded-lg" />
                </View>
                <View className="h-[1px] w-full bg-neutral-200" />
                <TouchableOpacity className="w-full py-3 items-center bg-[#FFCB05] border-2 border-[#3B60A8]/50 rounded-lg" onPress={handleSignUp}>
                    <Text style={{ fontFamily: "DungGeunMo" }}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
