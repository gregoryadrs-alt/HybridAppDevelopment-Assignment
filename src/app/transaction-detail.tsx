import { router, useLocalSearchParams } from 'expo-router';
import {
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  FileText,
  ShoppingBag,
  Tag,
  TrendingDown,
  TrendingUp,
  Utensils,
  Wallet,
  Zap,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Share as RNShare,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderBar } from '../components/HeaderBar';

const cardShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 2,
};

const categoryOptions = [
  'Makanan & Minuman',
  'Transportasi',
  'Belanja & Hiburan',
  'Kebutuhan Harian',
  'Gaji & Penghasilan',
];

export default function TransactionDetailScreen() {
  const params = useLocalSearchParams<{
    id?: string;
    name?: string;
    amount?: string;
    time?: string;
    type?: string;
    category?: string;
    paymentMethod?: string;
    trxId?: string;
  }>();

  // Parse parameters with fallbacks
  const name = params.name || 'Transaksi';
  const rawAmount = parseInt(params.amount || '-45000', 10);
  const time = params.time || 'Hari ini, 15:15 WIB';
  const type = (params.type === 'income' ? 'income' : 'expense') as 'income' | 'expense';
  const initialCategory = params.category || (type === 'income' ? 'Gaji & Penghasilan' : 'Makanan & Minuman');
  const paymentMethod = params.paymentMethod || (type === 'income' ? 'BCA Transfer' : 'GoPay (QRIS)');
  const trxId = params.trxId || 'TRX-20261108-9842';

  const [category, setCategory] = useState(initialCategory);
  const [modalVisible, setModalVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Icon selector based on category / type
  const getCategoryIcon = () => {
    if (type === 'income') return <TrendingUp size={30} color="#10b981" />;
    if (category.toLowerCase().includes('makan') || category.toLowerCase().includes('minum')) {
      return <Utensils size={30} color="#f97316" />;
    }
    if (category.toLowerCase().includes('transport') || category.toLowerCase().includes('gojek')) {
      return <Zap size={30} color="#06b6d4" />;
    }
    if (category.toLowerCase().includes('belanja')) {
      return <ShoppingBag size={30} color="#8b5cf6" />;
    }
    return <TrendingDown size={30} color="#ef4444" />;
  };

  const handleCopyTrx = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await RNShare.share({
        message: `Bukti Transaksi Smart Budget:\nNama: ${name}\nNominal: ${
          type === 'income' ? '+' : '-'
        }Rp ${Math.abs(rawAmount).toLocaleString('id-ID')}\nWaktu: ${time}\nNo. Ref: ${trxId}`,
      });
    } catch {
      // Ignored
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Reusable HeaderBar */}
      <HeaderBar
        title="Rincian Transaksi"
        rightLabel="Bagikan"
        rightActionVariant="button"
        onRightPress={handleShare}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}>
        
        {/* Receipt Header Card */}
        <Animated.View
          entering={FadeInDown.duration(400)}
          style={cardShadow}
          className="bg-white rounded-3xl p-6 items-center border border-slate-100 mb-5">
          <View
            className="w-16 h-16 rounded-2xl items-center justify-center mb-3"
            style={{
              backgroundColor: type === 'income' ? '#ecfdf5' : '#fff7ed',
            }}>
            {getCategoryIcon()}
          </View>
          <Text
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: type === 'income' ? '#10b981' : '#ef4444' }}>
            {type === 'income' ? '+' : '-'}Rp {Math.abs(rawAmount).toLocaleString('id-ID')}
          </Text>
          <Text className="text-base font-semibold text-slate-800 mt-1">{name}</Text>
          <View className="flex-row items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full mt-2.5">
            <CheckCircle2 size={13} color="#10b981" />
            <Text className="text-xs font-bold text-emerald-600">Berhasil & Dicatat</Text>
          </View>
        </Animated.View>

        {/* Transaction Details */}
        <Animated.View
          entering={FadeInDown.delay(150).duration(400)}
          style={cardShadow}
          className="bg-white rounded-3xl p-5 border border-slate-100 mb-5">
          <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Informasi Transaksi
          </Text>

          <View className="gap-3.5">
            {/* Category */}
            <View className="flex-row items-center justify-between py-2 border-b border-slate-100">
              <View className="flex-row items-center gap-2">
                <Tag size={16} color="#64748b" />
                <Text className="text-xs text-slate-500">Kategori</Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg flex-row items-center gap-1">
                <Text className="text-xs font-bold text-indigo-700">{category}</Text>
                <Text className="text-[10px] text-indigo-500 font-bold">✎ Ubah</Text>
              </TouchableOpacity>
            </View>

            {/* Time */}
            <View className="flex-row items-center justify-between py-2 border-b border-slate-100">
              <View className="flex-row items-center gap-2">
                <Calendar size={16} color="#64748b" />
                <Text className="text-xs text-slate-500">Tanggal & Waktu</Text>
              </View>
              <Text className="text-xs font-semibold text-slate-800">{time}</Text>
            </View>

            {/* Payment Method */}
            <View className="flex-row items-center justify-between py-2 border-b border-slate-100">
              <View className="flex-row items-center gap-2">
                <CreditCard size={16} color="#64748b" />
                <Text className="text-xs text-slate-500">Metode Transaksi</Text>
              </View>
              <Text className="text-xs font-semibold text-slate-800">{paymentMethod}</Text>
            </View>

            {/* Transaction ID */}
            <View className="flex-row items-center justify-between py-2 border-b border-slate-100">
              <View className="flex-row items-center gap-2">
                <FileText size={16} color="#64748b" />
                <Text className="text-xs text-slate-500">Nomor Transaksi</Text>
              </View>
              <TouchableOpacity
                onPress={handleCopyTrx}
                className="flex-row items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg">
                <Text className="text-xs font-mono font-medium text-slate-700">{trxId}</Text>
                <Copy size={13} color="#6366f1" />
              </TouchableOpacity>
            </View>

            {/* Budget Impact */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-row items-center gap-2">
                <Wallet size={16} color="#64748b" />
                <Text className="text-xs text-slate-500">Status Saldo</Text>
              </View>
              <Text
                className="text-xs font-bold"
                style={{ color: type === 'income' ? '#10b981' : '#ef4444' }}>
                {type === 'income' ? 'Menambah Tabungan (+)' : 'Mengurangi Budget (-)'}
              </Text>
            </View>
          </View>
        </Animated.View>

        {copied && (
          <View className="bg-emerald-500/15 border border-emerald-400 rounded-xl py-2 px-3 mb-4 items-center">
            <Text className="text-xs font-bold text-emerald-600">
              ✓ Nomor transaksi berhasil disalin!
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} className="gap-3">
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.85}
            className="w-full py-3.5 rounded-2xl bg-indigo-600 items-center active:bg-indigo-700">
            <Text className="text-sm font-bold text-white">Ubah Kategori Transaksi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            className="w-full py-3.5 rounded-2xl bg-slate-100 items-center border border-slate-200">
            <Text className="text-sm font-bold text-slate-700">Kembali ke Beranda</Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>

      {/* Category Selector Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          onPress={() => setModalVisible(false)}
          className="flex-1 bg-black/40 justify-center items-center px-6">
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-3xl p-5 border border-slate-100">
            <Text className="text-lg font-bold text-slate-900 mb-1">Pilih Kategori</Text>
            <Text className="text-xs text-slate-500 mb-4">
              Sesuaikan kategori pengeluaran agar pencatatan budget lebih akurat.
            </Text>

            <View className="gap-2 mb-4">
              {categoryOptions.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  onPress={() => {
                    setCategory(opt);
                    setModalVisible(false);
                  }}
                  className={`flex-row items-center justify-between p-3 rounded-xl border ${
                    category === opt
                      ? 'bg-indigo-50 border-indigo-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}>
                  <Text
                    className={`text-sm font-semibold ${
                      category === opt ? 'text-indigo-900' : 'text-slate-700'
                    }`}>
                    {opt}
                  </Text>
                  {category === opt && <Check size={18} color="#4f46e5" />}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="py-3 rounded-xl bg-slate-100 items-center">
              <Text className="text-xs font-bold text-slate-600">Batal</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
