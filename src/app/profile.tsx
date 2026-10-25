import { router } from 'expo-router';
import { ArrowLeft, Mail, Shield, User } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#051424]">
      {/* Header with Back Button */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-[#46464d]/20">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-lg bg-[#122131] items-center justify-center">
          <ArrowLeft size={20} color="#d4e4fa" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-[#d4e4fa]">Profile</Text>
        <View className="w-9" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 }}>
        
        {/* User Avatar Placeholder */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-[#122131] border-2 border-[#00e296] items-center justify-center mb-3">
            <User size={42} color="#00e296" />
          </View>
          <Text className="text-xl font-bold text-[#d4e4fa]">Alex Morgan</Text>
          <Text className="text-xs text-[#909098] mt-0.5">alex.morgan@node.internal</Text>
        </View>

        {/* Section 1: Account Information Placeholder */}
        <View className="mb-6">
          <Text className="text-xs font-semibold text-[#909098] uppercase tracking-wider mb-3">
            Account Details
          </Text>
          <View className="bg-[#122131] border border-[#46464d]/30 rounded-2xl p-4 gap-4">
            <View className="flex-row items-center gap-3">
              <Mail size={18} color="#909098" />
              <View className="flex-1">
                <Text className="text-xs text-[#909098]">Email</Text>
                <Text className="text-sm font-medium text-[#d4e4fa]">alex.morgan@node.internal</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3 pt-3 border-t border-[#46464d]/20">
              <Shield size={18} color="#909098" />
              <View className="flex-1">
                <Text className="text-xs text-[#909098]">Security Tier</Text>
                <Text className="text-sm font-medium text-[#70ffba]">Node Tier 3 (Encrypted)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Button Placeholder */}
        <TouchableOpacity
          onPress={() => {
            // Add your edit or update action here
            console.log('Edit profile pressed');
          }}
          activeOpacity={0.8}
          className="py-3.5 rounded-xl bg-[#00e296] items-center mt-4">
          <Text className="font-bold text-[#003822] text-base">Edit Profile</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
