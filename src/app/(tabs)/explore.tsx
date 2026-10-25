import { Compass, Search, TrendingUp } from 'lucide-react-native';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#051424]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 }}>
        
        {/* Header */}
        <View className="mb-6">
          <Text className="text-xs text-[#909098] uppercase tracking-wider">Markets & Liquidity</Text>
          <Text className="text-2xl font-bold text-[#d4e4fa]">Explore Assets</Text>
        </View>

        {/* Search Input */}
        <View className="flex-row items-center bg-[#122131] border border-[#46464d]/30 rounded-xl px-4 py-3 mb-6">
          <Search size={18} color="#909098" />
          <TextInput
            placeholder="Search assets, tokens, nodes..."
            placeholderTextColor="#909098"
            className="flex-1 ml-3 text-sm text-[#d4e4fa]"
          />
        </View>

        {/* Top Movers */}
        <View className="mb-4">
          <Text className="text-lg font-bold text-[#d4e4fa] mb-3">Trending Liquidity Pools</Text>

          <View className="gap-2.5">
            <View className="flex-row items-center justify-between bg-[#122131] border border-[#46464d]/30 rounded-xl p-4">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-[#00e296]/15 items-center justify-center">
                  <Compass size={18} color="#00e296" />
                </View>
                <View>
                  <Text className="text-sm font-semibold text-[#d4e4fa]">USD Treasury Pool</Text>
                  <Text className="text-xs text-[#909098]">APR: 6.8%</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-sm font-bold text-[#d4e4fa]">$48.2M TVL</Text>
                <View className="flex-row items-center gap-1">
                  <TrendingUp size={12} color="#00e296" />
                  <Text className="text-xs font-semibold text-[#00e296]">+3.4%</Text>
                </View>
              </View>
            </View>

            <View className="flex-row items-center justify-between bg-[#122131] border border-[#46464d]/30 rounded-xl p-4">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-[#70ffba]/15 items-center justify-center">
                  <Compass size={18} color="#70ffba" />
                </View>
                <View>
                  <Text className="text-sm font-semibold text-[#d4e4fa]">ETH Liquidity Node</Text>
                  <Text className="text-xs text-[#909098]">APR: 9.1%</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-sm font-bold text-[#d4e4fa]">$112.5M TVL</Text>
                <View className="flex-row items-center gap-1">
                  <TrendingUp size={12} color="#00e296" />
                  <Text className="text-xs font-semibold text-[#00e296]">+8.7%</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}