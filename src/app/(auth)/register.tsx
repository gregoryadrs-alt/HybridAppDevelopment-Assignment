import { router } from 'expo-router';
import { ArrowLeft, Lock, Mail, User } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    router.replace('/(tabs)/home' as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 justify-center px-6">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="mb-6 p-2 rounded-xl bg-white border border-slate-200 w-10 items-center justify-center">
        <ArrowLeft size={20} color="#334155" />
      </TouchableOpacity>

      <View className="mb-8">
        <Text className="text-3xl font-bold text-slate-900 mb-2">Buat Akun Baru ✨</Text>
        <Text className="text-sm text-slate-500">
          Mulai kelola keuangan dan raih barang impianmu hari ini.
        </Text>
      </View>

      <View className="gap-4 mb-6">
        {/* Name Input */}
        <View className="flex-row items-center bg-white border border-slate-300 rounded-xl px-4 py-3">
          <User size={18} color="#94a3b8" />
          <TextInput
            placeholder="Nama Lengkap"
            placeholderTextColor="#94a3b8"
            value={fullName}
            onChangeText={setFullName}
            className="flex-1 ml-3 text-sm text-slate-900"
          />
        </View>

        {/* Email Input */}
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

        {/* Password Input */}
        <View className="flex-row items-center bg-white border border-slate-300 rounded-xl px-4 py-3">
          <Lock size={18} color="#94a3b8" />
          <TextInput
            placeholder="Kata Sandi (min. 6 karakter)"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="flex-1 ml-3 text-sm text-slate-900"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleRegister}
        activeOpacity={0.8}
        className="py-3.5 rounded-xl bg-indigo-600 items-center mb-4">
        <Text className="font-bold text-white text-base">Daftar Sekarang</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center items-center gap-1">
        <Text className="text-xs text-slate-500">Sudah punya akun?</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-xs font-bold text-indigo-600">Masuk</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
