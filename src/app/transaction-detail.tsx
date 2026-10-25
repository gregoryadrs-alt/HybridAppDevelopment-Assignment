import { router } from 'expo-router';
import { ArrowDownLeft, ArrowLeft, Copy, ExternalLink, ShieldCheck } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransactionDetailScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#051424]">
      {/* Header with Back Button */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-[#46464d]/20">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-lg bg-[#122131] items-center justify-center">
          <ArrowLeft size={20} color="#d4e4fa" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-[#d4e4fa]">Transaction Details</Text>
        <View className="w-9" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 }}>
        
        {/* Top Summary Card */}
        <View className="bg-[#122131] border border-[#46464d]/30 rounded-2xl p-6 items-center mb-6">
          <View className="w-14 h-14 rounded-2xl bg-[#00e296]/15 items-center justify-center mb-4">
            <ArrowDownLeft size={28} color="#00e296" />
          </View>
          <Text className="text-3xl font-extrabold text-[#d4e4fa] mb-1">+$4,250.00</Text>
          <Text className="text-xs text-[#00e296] font-semibold bg-[#00e296]/10 px-3 py-1 rounded-full mt-1">
            Confirmed & Settled
          </Text>
        </View>

        {/* Breakdown List */}
        <View className="bg-[#122131] border border-[#46464d]/30 rounded-2xl p-4 mb-6 gap-3">
          <View className="flex-row justify-between py-2 border-b border-[#46464d]/15">
            <Text className="text-xs text-[#909098]">Type</Text>
            <Text className="text-xs font-semibold text-[#d4e4fa]">Incoming Transfer</Text>
          </View>
          <View className="flex-row justify-between py-2 border-b border-[#46464d]/15">
            <Text className="text-xs text-[#909098]">Timestamp</Text>
            <Text className="text-xs font-semibold text-[#d4e4fa]">Oct 25, 2026 • 11:42 AM</Text>
          </View>
          <View className="flex-row justify-between py-2 border-b border-[#46464d]/15">
            <Text className="text-xs text-[#909098]">Sender Node</Text>
            <Text className="text-xs font-mono text-[#d4e4fa]">0x4f...92e1</Text>
          </View>
          <View className="flex-row justify-between py-2">
            <Text className="text-xs text-[#909098]">Network Fee</Text>
            <Text className="text-xs font-semibold text-[#70ffba]">$0.00 (Gasless)</Text>
          </View>
        </View>

        {/* Security / Verification Badge */}
        <View className="flex-row items-center gap-2 bg-[#122131]/60 border border-[#00e296]/30 rounded-xl p-3 mb-6">
          <ShieldCheck size={18} color="#00e296" />
          <Text className="text-xs text-[#909098] flex-1">
            Verified by 24 validator consensus nodes with cryptographic finality.
          </Text>
        </View>

        {/* Actions Placeholder */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => console.log('Copy receipt ID')}
            className="flex-1 py-3.5 rounded-xl bg-[#122131] border border-[#46464d]/30 flex-row items-center justify-center gap-2">
            <Copy size={16} color="#d4e4fa" />
            <Text className="text-sm font-semibold text-[#d4e4fa]">Copy ID</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('View explorer')}
            className="flex-1 py-3.5 rounded-xl bg-[#00e296] flex-row items-center justify-center gap-2">
            <ExternalLink size={16} color="#003822" />
            <Text className="text-sm font-bold text-[#003822]">Explorer</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
