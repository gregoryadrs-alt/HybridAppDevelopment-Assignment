import { router } from 'expo-router';
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  LogOut,
  PiggyBank,
  Plus,
  TrendingUp,
  User,
  Wallet,
  X,
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProgressBar } from '../../components/ProgressBar';
import {
  categories,
  initialTransactions,
  TransactionItem,
} from '../../data/mockData';

// Shadow style (native prop to avoid NativeWind shadow bug)
const cardShadow = {
  shadowColor: '#6366f1',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 3,
};

const softShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 6,
  elevation: 2,
};

export default function HomeScreen() {
  const [transactions, setTransactions] = useState<TransactionItem[]>(initialTransactions);
  const [totalBudget] = useState(3500000);
  const [filterType, setFilterType] = useState<'all' | 'expense' | 'income'>('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Form state for adding transaction
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<'expense' | 'income'>('expense');
  const [newCategory, setNewCategory] = useState('Makanan & Minuman');

  // Calculate live totals
  const totalSpent = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => acc + Math.abs(tx.amount), 0);
  const remaining = totalBudget - totalSpent;
  const spentPercent = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  // Pulse animation for the savings badge
  const pulseScale = useSharedValue(1);
  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1200 }),
        withTiming(1, { duration: 1200 }),
      ),
      -1,
      true,
    );
  }, [pulseScale]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const handleLogout = () => {
    router.replace('/' as any);
  };

  const handleAddTransaction = () => {
    if (!newName.trim() || !newAmount.trim()) return;
    const numAmount = parseInt(newAmount.replace(/\D/g, ''), 10) || 0;
    if (numAmount <= 0) return;

    const newTx: TransactionItem = {
      id: Date.now().toString(),
      name: newName.trim(),
      amount: newType === 'expense' ? -numAmount : numAmount,
      time: 'Baru saja',
      type: newType,
      category: newCategory,
      paymentMethod: 'Dompet Digital',
      trxId: `TRX-${Date.now().toString().slice(-8)}`,
    };

    setTransactions([newTx, ...transactions]);
    setNewName('');
    setNewAmount('');
    setIsAddModalOpen(false);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (filterType === 'all') return true;
    return tx.type === filterType;
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 }}>

        {/* Top Header */}
        <Animated.View entering={FadeInDown.duration(400)} className="flex-row items-center justify-between mb-5">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/profile' as any)}
            className="flex-row items-center gap-3">
            <View className="w-11 h-11 rounded-full bg-indigo-100 border-2 border-indigo-600 items-center justify-center">
              <User size={22} color="#4f46e5" />
            </View>
            <View>
              <Text className="text-xs text-slate-400 font-medium">Selamat Pagi 👋</Text>
              <Text className="text-lg font-bold text-slate-900">Alex Morgan</Text>
            </View>
          </TouchableOpacity>

          <View className="flex-row items-center gap-2">
            {/* Notifications Button */}
            <TouchableOpacity
              onPress={() => router.push('/notifications' as any)}
              activeOpacity={0.8}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 items-center justify-center relative">
              <Bell size={18} color="#334155" />
              <View className="w-2.5 h-2.5 rounded-full bg-indigo-600 absolute top-2 right-2 border-2 border-white" />
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity
              onPress={handleLogout}
              activeOpacity={0.8}
              className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 items-center justify-center">
              <LogOut size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Main Budget Card */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(500)}
          style={cardShadow}
          className="bg-indigo-600 rounded-3xl p-5 mb-5">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center">
                <Wallet size={16} color="#ffffff" />
              </View>
              <Text className="text-sm font-medium text-indigo-100">Budget Bulan Ini</Text>
            </View>
            <View className="bg-white/20 px-2.5 py-1 rounded-full">
              <Text className="text-[11px] font-bold text-white">Aktif</Text>
            </View>
          </View>

          <Text className="text-3xl font-extrabold text-white tracking-tight mb-1">
            Rp {totalBudget.toLocaleString('id-ID')}
          </Text>

          {/* Budget Stats Row */}
          <View className="flex-row items-center gap-3 mt-2 mb-4">
            <View className="flex-row items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-xl">
              <ArrowUpRight size={14} color="#fcd34d" />
              <Text className="text-xs font-semibold text-yellow-200">
                Rp {totalSpent.toLocaleString('id-ID')} terpakai
              </Text>
            </View>
            <View className="flex-row items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-xl">
              <ArrowDownRight size={14} color="#86efac" />
              <Text className="text-xs font-semibold text-green-200">
                Rp {remaining.toLocaleString('id-ID')} sisa
              </Text>
            </View>
          </View>

          {/* Spend Progress */}
          <View className="h-2 rounded-full bg-indigo-500/50 overflow-hidden">
            <View
              className="h-full rounded-full bg-white"
              style={{ width: `${spentPercent}%` }}
            />
          </View>
          <Text className="text-xs text-indigo-200 mt-1.5">{spentPercent}% kuota budget telah dipakai</Text>

          {/* Quick Actions (Tagihan is removed) */}
          <View className="flex-row justify-around items-center mt-5 pt-4 border-t border-indigo-500/30">
            {/* 1. Catat Transaksi */}
            <TouchableOpacity
              onPress={() => setIsAddModalOpen(true)}
              activeOpacity={0.8}
              className="items-center gap-1 flex-1">
              <View className="w-12 h-12 rounded-2xl bg-white/20 items-center justify-center">
                <Plus size={22} color="#ffffff" />
              </View>
              <Text className="text-xs font-semibold text-indigo-100 mt-0.5">Catat</Text>
            </TouchableOpacity>

            {/* 2. Target Impian */}
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/explore' as any)}
              activeOpacity={0.8}
              className="items-center gap-1 flex-1">
              <View className="w-12 h-12 rounded-2xl bg-white/20 items-center justify-center">
                <PiggyBank size={22} color="#ffffff" />
              </View>
              <Text className="text-xs font-semibold text-indigo-100 mt-0.5">Impian</Text>
            </TouchableOpacity>

            {/* 3. Laporan Analisis */}
            <TouchableOpacity
              onPress={() => setIsReportModalOpen(true)}
              activeOpacity={0.8}
              className="items-center gap-1 flex-1">
              <View className="w-12 h-12 rounded-2xl bg-white/20 items-center justify-center">
                <TrendingUp size={22} color="#ffffff" />
              </View>
              <Text className="text-xs font-semibold text-indigo-100 mt-0.5">Laporan</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Savings Goal Card */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(500)}
          style={softShadow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push('/(tabs)/explore' as any)}
            className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-5 flex-row items-center">
            <Animated.View style={pulseStyle}>
              <View className="w-12 h-12 rounded-2xl bg-emerald-500 items-center justify-center mr-3">
                <PiggyBank size={22} color="#ffffff" />
              </View>
            </Animated.View>
            <View className="flex-1 ml-1">
              <Text className="text-sm font-bold text-emerald-900">Target Impian: MacBook Pro 🎯</Text>
              <Text className="text-xs text-emerald-600 mt-0.5">Rp 18.000.000 / Rp 24.000.000</Text>
              <View className="h-1.5 rounded-full bg-emerald-200 mt-2 overflow-hidden">
                <View className="h-full rounded-full bg-emerald-500" style={{ width: '75%' }} />
              </View>
            </View>
            <Text className="text-base font-extrabold text-emerald-600 ml-2">75%</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Spending Categories */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-slate-900">Kategori Pengeluaran</Text>
            <TouchableOpacity
              onPress={() => setIsReportModalOpen(true)}
              className="bg-indigo-50 px-2.5 py-1 rounded-lg">
              <Text className="text-xs font-bold text-indigo-600">Rincian Lengkap</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              const progress = cat.spent / cat.budget;
              return (
                <Animated.View
                  key={cat.id}
                  entering={FadeInRight.delay(350 + index * 70).duration(400)}
                  style={softShadow}
                  className="bg-white rounded-2xl p-4 border border-slate-100">
                  <View className="flex-row items-center justify-between mb-2.5">
                    <View className="flex-row items-center gap-3">
                      <View
                        className="w-10 h-10 rounded-xl items-center justify-center"
                        style={{ backgroundColor: cat.bg }}>
                        <Icon size={18} color={cat.color} />
                      </View>
                      <View>
                        <Text className="text-sm font-bold text-slate-900">{cat.name}</Text>
                        <Text className="text-xs text-slate-400">
                          Rp {(cat.spent / 1000).toFixed(0)}rb dari Rp {(cat.budget / 1000).toFixed(0)}rb
                        </Text>
                      </View>
                    </View>
                    <Text className="text-sm font-bold" style={{ color: cat.color }}>
                      {Math.round(progress * 100)}%
                    </Text>
                  </View>
                  <ProgressBar progress={progress} color={cat.color} />
                </Animated.View>
              );
            })}
          </View>
        </Animated.View>

        {/* Recent Transactions */}
        <Animated.View entering={FadeInDown.delay(500).duration(500)} className="mt-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-slate-900">Transaksi Terakhir</Text>
            {/* Filter buttons */}
            <View className="flex-row gap-1 bg-slate-200/80 p-0.5 rounded-lg">
              <TouchableOpacity
                onPress={() => setFilterType('all')}
                className={`px-2 py-1 rounded-md ${
                  filterType === 'all' ? 'bg-white' : ''
                }`}>
                <Text className={`text-[10px] font-bold ${filterType === 'all' ? 'text-indigo-600' : 'text-slate-500'}`}>
                  Semua
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFilterType('expense')}
                className={`px-2 py-1 rounded-md ${
                  filterType === 'expense' ? 'bg-white' : ''
                }`}>
                <Text className={`text-[10px] font-bold ${filterType === 'expense' ? 'text-red-500' : 'text-slate-500'}`}>
                  Keluar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFilterType('income')}
                className={`px-2 py-1 rounded-md ${
                  filterType === 'income' ? 'bg-white' : ''
                }`}>
                <Text className={`text-[10px] font-bold ${filterType === 'income' ? 'text-green-600' : 'text-slate-500'}`}>
                  Masuk
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={softShadow} className="bg-white rounded-2xl overflow-hidden border border-slate-100">
            {filteredTransactions.map((tx, index) => (
              <TouchableOpacity
                key={`${tx.id}-${index}`}
                activeOpacity={0.7}
                onPress={() =>
                  router.push({
                    pathname: '/transaction-detail',
                    params: {
                      id: tx.id,
                      name: tx.name,
                      amount: tx.amount.toString(),
                      time: tx.time,
                      type: tx.type,
                      category: tx.category,
                      paymentMethod: tx.paymentMethod,
                      trxId: tx.trxId,
                    },
                  })
                }
                className={`flex-row items-center justify-between p-4 ${
                  index < filteredTransactions.length - 1 ? 'border-b border-slate-100' : ''
                }`}>
                <View className="flex-row items-center gap-3">
                  <View
                    className="w-10 h-10 rounded-xl items-center justify-center"
                    style={{
                      backgroundColor: tx.type === 'income' ? '#ecfdf5' : '#fef2f2',
                    }}>
                    {tx.type === 'income' ? (
                      <ArrowDownRight size={18} color="#10b981" />
                    ) : (
                      <ArrowUpRight size={18} color="#ef4444" />
                    )}
                  </View>
                  <View>
                    <Text className="text-sm font-bold text-slate-900">{tx.name}</Text>
                    <Text className="text-xs text-slate-400">{tx.time}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text
                    className="text-sm font-bold"
                    style={{ color: tx.type === 'income' ? '#10b981' : '#ef4444' }}>
                    {tx.type === 'income' ? '+' : '-'}Rp {Math.abs(tx.amount).toLocaleString('id-ID')}
                  </Text>
                  <Text className="text-[11px] text-indigo-500 font-semibold">Ketuk rincian →</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

      </ScrollView>

      {/* Modal 1: Catat Transaksi Baru */}
      <Modal
        visible={isAddModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsAddModalOpen(false)}>
        <Pressable
          onPress={() => setIsAddModalOpen(false)}
          className="flex-1 bg-black/40 justify-end">
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="bg-white rounded-t-3xl p-6 border-t border-slate-200">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-900">Catat Transaksi Baru</Text>
              <TouchableOpacity
                onPress={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center">
                <X size={16} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Type selector */}
            <View className="flex-row bg-slate-100 rounded-xl p-1 mb-4">
              <TouchableOpacity
                onPress={() => setNewType('expense')}
                className={`flex-1 py-2 rounded-lg items-center ${
                  newType === 'expense' ? 'bg-red-500' : ''
                }`}>
                <Text
                  className={`text-xs font-bold ${
                    newType === 'expense' ? 'text-white' : 'text-slate-600'
                  }`}>
                  Pengeluaran
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setNewType('income')}
                className={`flex-1 py-2 rounded-lg items-center ${
                  newType === 'income' ? 'bg-emerald-500' : ''
                }`}>
                <Text
                  className={`text-xs font-bold ${
                    newType === 'income' ? 'text-white' : 'text-slate-600'
                  }`}>
                  Pemasukan
                </Text>
              </TouchableOpacity>
            </View>

            {/* Name input */}
            <View className="mb-3">
              <Text className="text-xs font-semibold text-slate-600 mb-1">Nama Transaksi</Text>
              <TextInput
                value={newName}
                onChangeText={setNewName}
                placeholder="Contoh: Kopi Janji Jiwa, Gaji Bonus"
                className="h-12 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm text-slate-900"
              />
            </View>

            {/* Amount input */}
            <View className="mb-3">
              <Text className="text-xs font-semibold text-slate-600 mb-1">Nominal (Rp)</Text>
              <TextInput
                value={newAmount}
                onChangeText={setNewAmount}
                keyboardType="numeric"
                placeholder="Contoh: 35000"
                className="h-12 bg-slate-50 border border-slate-200 rounded-xl px-3 text-base font-bold text-slate-900"
              />
            </View>

            {/* Category selection */}
            <View className="mb-5">
              <Text className="text-xs font-semibold text-slate-600 mb-2">Kategori</Text>
              <View className="flex-row flex-wrap gap-2">
                {[
                  'Makanan & Minuman',
                  'Transportasi',
                  'Belanja & Fashion',
                  'Gaji & Penghasilan',
                ].map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setNewCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl border ${
                      newCategory === cat
                        ? 'bg-indigo-50 border-indigo-500'
                        : 'bg-slate-50 border-slate-200'
                    }`}>
                    <Text
                      className={`text-xs font-semibold ${
                        newCategory === cat ? 'text-indigo-700' : 'text-slate-600'
                      }`}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Submit button */}
            <TouchableOpacity
              onPress={handleAddTransaction}
              activeOpacity={0.8}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 items-center active:bg-indigo-700">
              <Text className="text-base font-bold text-white">Simpan Transaksi</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Modal 2: Laporan & Analisis Budget */}
      <Modal
        visible={isReportModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsReportModalOpen(false)}>
        <Pressable
          onPress={() => setIsReportModalOpen(false)}
          className="flex-1 bg-black/40 justify-center items-center px-6">
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-3xl p-6 border border-slate-100">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-900">Laporan Anggaran Bulanan</Text>
              <TouchableOpacity
                onPress={() => setIsReportModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center">
                <X size={16} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4">
              <Text className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                Status Kesehatan Keuangan: Baik (A+) 🌟
              </Text>
              <Text className="text-xs text-emerald-700 mt-1 leading-relaxed">
                Pengeluaran Anda terkontrol di angka {spentPercent}%. Anda berhasil menyisihkan lebih dari 20% penghasilan untuk target impian!
              </Text>
            </View>

            <View className="gap-2.5 mb-5">
              <View className="flex-row justify-between py-1.5 border-b border-slate-100">
                <Text className="text-xs text-slate-500">Total Pagu Anggaran</Text>
                <Text className="text-xs font-bold text-slate-800">
                  Rp {totalBudget.toLocaleString('id-ID')}
                </Text>
              </View>
              <View className="flex-row justify-between py-1.5 border-b border-slate-100">
                <Text className="text-xs text-slate-500">Total Pengeluaran Tercatat</Text>
                <Text className="text-xs font-bold text-red-500">
                  -Rp {totalSpent.toLocaleString('id-ID')}
                </Text>
              </View>
              <View className="flex-row justify-between py-1.5">
                <Text className="text-xs text-slate-500">Sisa Kuota Anggaran</Text>
                <Text className="text-xs font-bold text-emerald-600">
                  +Rp {remaining.toLocaleString('id-ID')}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setIsReportModalOpen(false)}
              className="py-3 rounded-xl bg-indigo-600 items-center">
              <Text className="text-sm font-bold text-white">Tutup Laporan</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
