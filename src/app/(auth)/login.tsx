import { router } from 'expo-router';
import { ArrowRight, Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.replace('/(tabs)/home' as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 justify-center px-6">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-slate-900 mb-2">Selamat Datang 👋</Text>
        <Text className="text-sm text-slate-500">
          Masuk ke akun Smart Budget Tracker Anda.
        </Text>
      </View>

      {/* Form Input */}
      <View className="gap-4 mb-6">
        <View className="flex-row items-center bg-white border border-slate-300 rounded-xl px-4 py-3">
          <Mail size={18} color="#94a3b8" />
          <TextInput
            placeholder="Alamat Email"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="flex-1 ml-3 text-sm text-slate-900"
          />
        </View>

        <View className="flex-row items-center bg-white border border-slate-300 rounded-xl px-4 py-3">
          <Lock size={18} color="#94a3b8" />
          <TextInput
            placeholder="Kata Sandi"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="flex-1 ml-3 text-sm text-slate-900"
          />
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.8}
        className="flex-row items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 mb-4">
        <Text className="font-bold text-white text-base">Masuk Sekarang</Text>
        <ArrowRight size={18} color="#ffffff" />
      </TouchableOpacity>

      {/* Footer Nav to Register */}
      <View className="flex-row justify-center items-center gap-1">
        <Text className="text-xs text-slate-500">Belum punya akun?</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register' as any)}>
          <Text className="text-xs font-bold text-indigo-600">Daftar Akun</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
