import { router } from 'expo-router';
import { ArrowRight, Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Navigate to homepage inside (tabs)
    console.log('-> TOMBOL SIGN IN DIKLIK!');
    router.replace('/(tabs)/home' as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#051424] justify-center px-6">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-[#d4e4fa] mb-2">Welcome Back</Text>
        <Text className="text-sm text-[#909098]">
          Sign in to access your encrypted treasury node.
        </Text>
      </View>

      {/* Form Input */}
      <View className="gap-4 mb-6">
        {/* Email Input */}
        <View className="flex-row items-center bg-[#122131] border border-[#46464d]/30 rounded-xl px-4 py-3">
          <Mail size={18} color="#909098" />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#909098"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="flex-1 ml-3 text-sm text-[#d4e4fa]"
          />
        </View>

        {/* Password Input */}
        <View className="flex-row items-center bg-[#122131] border border-[#46464d]/30 rounded-xl px-4 py-3">
          <Lock size={18} color="#909098" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#909098"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="flex-1 ml-3 text-sm text-[#d4e4fa]"
          />
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.8}
        className="flex-row items-center justify-center gap-2 py-3.5 rounded-xl bg-[#00e296] mb-4"
      >
        <Text className="font-bold text-[#003822] text-base">Sign In</Text>
        <ArrowRight size={18} color="#003822" />
      </TouchableOpacity>

      {/* Footer Nav to Register */}
      <View className="flex-row justify-center items-center gap-1">
        <Text className="text-xs text-[#909098]">Don&apos;t have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register' as any)}>
          <Text className="text-xs font-bold text-[#70ffba]">Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
