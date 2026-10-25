import { router } from 'expo-router';
import { ArrowLeft, Lock, Mail, User } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Setelah sukses register & login:
    router.replace('/(tabs)/home' as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#051424] justify-center px-6">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="mb-6 p-2 rounded-lg bg-[#122131] w-10 items-center"
      >
        <ArrowLeft size={20} color="#d4e4fa" />
      </TouchableOpacity>

      <View className="mb-8">
        <Text className="text-3xl font-bold text-[#d4e4fa] mb-2">Create Account</Text>
        <Text className="text-sm text-[#909098]">
          Start managing your daily wealth with bank-grade security.
        </Text>
      </View>

      <View className="gap-4 mb-6">
        {/* Name Input */}
        <View className="flex-row items-center bg-[#122131] border border-[#46464d]/30 rounded-xl px-4 py-3">
          <User size={18} color="#909098" />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#909098"
            value={fullName}
            onChangeText={setFullName}
            className="flex-1 ml-3 text-sm text-[#d4e4fa]"
          />
        </View>

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

      <TouchableOpacity
        onPress={handleRegister}
        activeOpacity={0.8}
        className="py-3.5 rounded-xl bg-[#00e296] items-center mb-4"
      >
        <Text className="font-bold text-[#003822] text-base">Register Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}