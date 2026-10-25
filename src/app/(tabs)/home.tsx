import { router } from 'expo-router';
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  LogOut,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const handleLogout = () => {
    // Navigate back to login screen
    router.replace('/' as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#051424]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 }}>
        
        {/* Top Header */}
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-xs text-[#909098] uppercase tracking-wider">Treasury Node</Text>
            <Text className="text-2xl font-bold text-[#d4e4fa]">Welcome Home</Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center gap-1.5 px-3 py-2 rounded-xl bg-[#122131] border border-[#46464d]/30">
            <LogOut size={16} color="#ffb4ab" />
            <Text className="text-xs font-semibold text-[#ffb4ab]">Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Security Badge */}
        <View className="flex-row items-center gap-2 bg-[#122131]/60 border border-[#00e296]/30 rounded-xl px-3 py-2 mb-6 self-start">
          <ShieldCheck size={16} color="#00e296" />
          <Text className="text-xs font-medium text-[#70ffba]">
            256-Bit Hardware Node Encrypted
          </Text>
        </View>

        {/* Total Balance Card */}
        <View className="bg-[#122131] border border-[#46464d]/30 rounded-2xl p-5 mb-6 shadow-lg">
          <Text className="text-xs font-medium text-[#909098] mb-1">Total Net Liquidity</Text>
          <Text className="text-3xl font-extrabold text-[#d4e4fa] tracking-tight mb-2">
            $124,580.00
          </Text>
          <View className="flex-row items-center gap-1.5">
            <TrendingUp size={16} color="#00e296" />
            <Text className="text-xs font-semibold text-[#00e296]">+14.2%</Text>
            <Text className="text-xs text-[#909098]">vs last month</Text>
          </View>

          {/* Quick Actions */}
          <View className="flex-row justify-between items-center mt-6 pt-5 border-t border-[#46464d]/20">
            <TouchableOpacity className="items-center gap-1 flex-1">
              <View className="w-12 h-12 rounded-xl bg-[#00e296] items-center justify-center">
                <ArrowUpRight size={22} color="#003822" />
              </View>
              <Text className="text-xs font-semibold text-[#d4e4fa] mt-1">Send</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center gap-1 flex-1">
              <View className="w-12 h-12 rounded-xl bg-[#1c2b3c] items-center justify-center border border-[#46464d]/30">
                <ArrowDownLeft size={22} color="#00e296" />
              </View>
              <Text className="text-xs font-semibold text-[#d4e4fa] mt-1">Receive</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center gap-1 flex-1">
              <View className="w-12 h-12 rounded-xl bg-[#1c2b3c] items-center justify-center border border-[#46464d]/30">
                <RefreshCw size={20} color="#00e296" />
              </View>
              <Text className="text-xs font-semibold text-[#d4e4fa] mt-1">Swap</Text>
            </TouchableOpacity>

            <TouchableOpacity className="items-center gap-1 flex-1">
              <View className="w-12 h-12 rounded-xl bg-[#1c2b3c] items-center justify-center border border-[#46464d]/30">
                <CreditCard size={20} color="#00e296" />
              </View>
              <Text className="text-xs font-semibold text-[#d4e4fa] mt-1">Cards</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mb-4">
          <Text className="text-lg font-bold text-[#d4e4fa] mb-3">Recent Transactions</Text>

          <View className="gap-2.5">
            <View className="flex-row items-center justify-between bg-[#122131] border border-[#46464d]/30 rounded-xl p-4">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-[#00e296]/15 items-center justify-center">
                  <ArrowDownLeft size={18} color="#00e296" />
                </View>
                <View>
                  <Text className="text-sm font-semibold text-[#d4e4fa]">Vault Deposit</Text>
                  <Text className="text-xs text-[#909098]">Today, 10:24 AM</Text>
                </View>
              </View>
              <Text className="text-sm font-bold text-[#00e296]">+$4,200.00</Text>
            </View>

            <View className="flex-row items-center justify-between bg-[#122131] border border-[#46464d]/30 rounded-xl p-4">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-[#ffb4ab]/15 items-center justify-center">
                  <ArrowUpRight size={18} color="#ffb4ab" />
                </View>
                <View>
                  <Text className="text-sm font-semibold text-[#d4e4fa]">Cloud Node License</Text>
                  <Text className="text-xs text-[#909098]">Yesterday, 04:15 PM</Text>
                </View>
              </View>
              <Text className="text-sm font-bold text-[#ffb4ab]">-$180.00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}