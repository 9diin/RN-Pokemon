import { AppHeader } from "@/src/components/common";
import { supabase } from "@/src/utils/supabase";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
    const [nickname, setNickname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignUp = async () => {
        if (!nickname || !email || !password) {
            Alert.alert("닉네임, 이메일, 비밀번호는 필수입니다.");

            return;
        }

        // Supabase Auth의 SignUp 진행
        const {
            data: { session, user },
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
            Alert.alert("회원가입 실패!");
            return;
        }

        // 회원가입 성공적으로 완료되었을 경우, 반환하는 user와 session 데이터가 있을 때
        // 우리가 커스텀으로 생성한 User 테이블에 유저 정보를 주입한다.
        if (user && session) {
            const { error } = await supabase.from("user").insert([
                {
                    id: user.id,
                    nickname: user.user_metadata.display_name,
                    email: user.user_metadata.email,
                    last_logginedAt: new Date(),
                },
            ]);

            if (error) {
                Alert.alert("유저 정보 저장을 실패하였습니다.");
                return;
            }
            Alert.alert("회원가입 성공!");
            router.push("/(tabs)");
        }
    };

    return (
        <View className="w-full h-full">
            <AppHeader />
            <View className="flex-1 items-center p-8 gap-6">
                <Text className="text-3xl" style={{ fontFamily: "DungGeunMo" }}>
                    회원가입
                </Text>
                <View className="w-full gap-2">
                    <Text>닉네임</Text>
                    <TextInput placeholder="닉네임을 입력하세요." value={nickname} onChangeText={setNickname} className="px-4 py-3 border border-neutral-200 bg-white rounded-lg" />
                </View>
                <View className="w-full gap-2">
                    <Text>이메일</Text>
                    <TextInput placeholder="이메일을 입력하세요." value={email} onChangeText={setEmail} className="px-4 py-3 border border-neutral-200 bg-white rounded-lg" />
                </View>
                <View className="w-full gap-2">
                    <Text>비밀번호</Text>
                    <TextInput secureTextEntry placeholder="비밀번호를 입력하세요." value={password} onChangeText={setPassword} className="px-4 py-3 border border-neutral-200 bg-white rounded-lg" />
                </View>
                <View className="h-[1px] w-full bg-neutral-200" />
                <TouchableOpacity className="w-full py-3 items-center bg-[#FFCB05] border-2 border-[#3B60A8]/50 rounded-lg" onPress={handleSignUp}>
                    <Text>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
