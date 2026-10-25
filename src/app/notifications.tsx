import { router } from 'expo-router';
import { ArrowLeft, Bell, CheckCircle, Info } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#051424]">
      {/* Header with Back Button */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-[#46464d]/20">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-lg bg-[#122131] items-center justify-center">
          <ArrowLeft size={20} color="#d4e4fa" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-[#d4e4fa]">Notifications</Text>
        <View className="w-9" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}>
        
        <Text className="text-xs font-semibold text-[#909098] uppercase tracking-wider mb-3">
          Recent Activity
        </Text>

        {/* Notification Item 1 Placeholder */}
        <View className="bg-[#122131] border border-[#46464d]/30 rounded-2xl p-4 mb-3 flex-row items-start gap-3">
          <View className="w-9 h-9 rounded-xl bg-[#00e296]/15 items-center justify-center mt-0.5">
            <CheckCircle size={18} color="#00e296" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-[#d4e4fa]">Transfer Completed</Text>
            <Text className="text-xs text-[#909098] mt-1 leading-relaxed">
              Your deposit of $2,400.00 to Liquidity Pool #4 has been confirmed on-chain.
            </Text>
            <Text className="text-[11px] text-[#909098]/70 mt-2">10 mins ago</Text>
          </View>
        </View>

        {/* Notification Item 2 Placeholder */}
        <View className="bg-[#122131] border border-[#46464d]/30 rounded-2xl p-4 mb-3 flex-row items-start gap-3">
          <View className="w-9 h-9 rounded-xl bg-[#70ffba]/15 items-center justify-center mt-0.5">
            <Bell size={18} color="#70ffba" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-[#d4e4fa]">Security Alert</Text>
            <Text className="text-xs text-[#909098] mt-1 leading-relaxed">
              New session initiated from device Node-Mobile. Biometric lock is active.
            </Text>
            <Text className="text-[11px] text-[#909098]/70 mt-2">2 hours ago</Text>
          </View>
        </View>

        {/* Notification Item 3 Placeholder */}
        <View className="bg-[#122131] border border-[#46464d]/30 rounded-2xl p-4 mb-3 flex-row items-start gap-3">
          <View className="w-9 h-9 rounded-xl bg-[#bfc5e4]/15 items-center justify-center mt-0.5">
            <Info size={18} color="#bfc5e4" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-[#d4e4fa]">Network Update</Text>
            <Text className="text-xs text-[#909098] mt-1 leading-relaxed">
              Yield optimization protocol v2.4 upgrade scheduled for tonight at 02:00 UTC.
            </Text>
            <Text className="text-[11px] text-[#909098]/70 mt-2">1 day ago</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
