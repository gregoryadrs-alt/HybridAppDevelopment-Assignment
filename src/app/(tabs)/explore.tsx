import {
  Calculator,
  Calendar,
  CheckCircle2,
  Gift,
  Heart,
  Plus,
  Sparkles,
  X,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProgressBar } from '../../components/ProgressBar';
import { initialWishlists, WishlistItem } from '../../data/mockData';

const cardShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 2,
};

export default function WishlistExploreScreen() {
  const [wishlists, setWishlists] = useState<WishlistItem[]>(initialWishlists);
  const [dailySavingsInput, setDailySavingsInput] = useState('25000');
  const [selectedItem, setSelectedItem] = useState<WishlistItem>(initialWishlists[0]);
  const [depositSuccess, setDepositSuccess] = useState(false);

  // Modal State for Adding New Wishlist Item
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory] = useState('Gadget');
  const [newTarget, setNewTarget] = useState('');
  const [newDeadline, setNewDeadline] = useState('Februari 2027');

  // Calculate estimated days remaining based on daily savings
  const remainingNeeded = Math.max(0, selectedItem.targetAmount - selectedItem.currentAmount);
  const dailyRate = parseInt(dailySavingsInput.replace(/\D/g, ''), 10) || 1;
  const daysRemaining = Math.ceil(remainingNeeded / dailyRate);

  // Action: Add new wishlist item
  const handleAddNewWishlist = () => {
    if (!newTitle.trim() || !newTarget.trim()) return;
    const targetNum = parseInt(newTarget.replace(/\D/g, ''), 10) || 0;
    if (targetNum <= 0) return;

    const newItem: WishlistItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      category: newCategory,
      targetAmount: targetNum,
      currentAmount: 0,
      icon: Gift,
      color: '#10b981',
      bgLight: '#ecfdf5',
      deadline: newDeadline || 'Tahun Depan',
    };

    const updated = [newItem, ...wishlists];
    setWishlists(updated);
    setSelectedItem(newItem);
    setNewTitle('');
    setNewTarget('');
    setIsAddModalOpen(false);
  };

  // Action: Setor Tabungan Hari Ini
  const handleDepositToday = () => {
    const depositAmount = dailyRate;
    const updated = wishlists.map((w) => {
      if (w.id === selectedItem.id) {
        const nextAmount = Math.min(w.targetAmount, w.currentAmount + depositAmount);
        const nextItem = { ...w, currentAmount: nextAmount };
        setSelectedItem(nextItem);
        return nextItem;
      }
      return w;
    });
    setWishlists(updated);
    setDepositSuccess(true);
    setTimeout(() => setDepositSuccess(false), 2500);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 }}>
        
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(400)} className="flex-row items-center justify-between mb-5">
          <View>
            <View className="flex-row items-center gap-1.5 mb-1">
              <Sparkles size={16} color="#6366f1" />
              <Text className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Wishlist & Goals
              </Text>
            </View>
            <Text className="text-2xl font-bold text-slate-900">Target Impian</Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsAddModalOpen(true)}
            style={cardShadow}
            className="flex-row items-center gap-1 bg-indigo-600 px-3.5 py-2 rounded-xl active:bg-indigo-700">
            <Plus size={16} color="#ffffff" />
            <Text className="text-xs font-bold text-white">Tambah</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Motivational Banner */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(500)}
          style={cardShadow}
          className="rounded-3xl p-5 mb-6 bg-indigo-600">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 mr-3">
              <Text className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">
                Semangat Menabung! 🔥
              </Text>
              <Text className="text-lg font-bold text-white mt-1">
                {wishlists.length} Impian Sedang Berjalan
              </Text>
              <Text className="text-xs text-indigo-100 mt-1">
                Pilih kartu di bawah untuk melihat simulasi kalkulator dan tahapan milestone.
              </Text>
            </View>
            <View className="w-14 h-14 rounded-2xl bg-white/20 items-center justify-center">
              <Heart size={28} color="#ffffff" fill="#ffffff" />
            </View>
          </View>
        </Animated.View>

        {/* Wishlist Cards Grid/List */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-slate-900 mb-3">Daftar Keinginan</Text>
          <View className="gap-3.5">
            {wishlists.map((item, idx) => {
              const Icon = item.icon;
              const percent = Math.min(100, Math.round((item.currentAmount / item.targetAmount) * 100));
              const isSelected = selectedItem.id === item.id;

              return (
                <Animated.View
                  key={item.id}
                  entering={FadeInRight.delay(200 + idx * 80).duration(400)}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setSelectedItem(item)}
                    style={[
                      cardShadow,
                      isSelected ? { borderColor: item.color, borderWidth: 2 } : { borderColor: '#e2e8f0', borderWidth: 1 }
                    ]}
                    className="bg-white rounded-2xl p-4">
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-row items-center gap-3">
                        <View
                          className="w-11 h-11 rounded-xl items-center justify-center"
                          style={{ backgroundColor: item.bgLight }}>
                          <Icon size={22} color={item.color} />
                        </View>
                        <View>
                          <Text className="text-base font-bold text-slate-900">{item.title}</Text>
                          <Text className="text-xs text-slate-400">{item.category}</Text>
                        </View>
                      </View>
                      <View className="items-end">
                        <Text className="text-sm font-extrabold" style={{ color: item.color }}>
                          {percent}%
                        </Text>
                        <View className="flex-row items-center gap-1 mt-0.5">
                          <Calendar size={11} color="#94a3b8" />
                          <Text className="text-[11px] text-slate-400">{item.deadline}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Reusable Animated Progress Bar */}
                    <View className="mb-2">
                      <ProgressBar progress={percent / 100} color={item.color} height={8} />
                    </View>

                    {/* Amount info */}
                    <View className="flex-row items-center justify-between text-xs">
                      <Text className="text-xs text-slate-500">
                        Terkumpul:{' '}
                        <Text className="font-semibold text-slate-800">
                          Rp {item.currentAmount.toLocaleString('id-ID')}
                        </Text>
                      </Text>
                      <Text className="text-xs text-slate-400">
                        Target: Rp {item.targetAmount.toLocaleString('id-ID')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </View>

        {/* Savings Calculator & Milestone */}
        <Animated.View
          entering={FadeInDown.delay(450).duration(500)}
          style={cardShadow}
          className="bg-white rounded-3xl p-5 border border-slate-100">
          <View className="flex-row items-center gap-2 mb-3">
            <View className="w-9 h-9 rounded-xl bg-indigo-50 items-center justify-center">
              <Calculator size={18} color="#6366f1" />
            </View>
            <View>
              <Text className="text-base font-bold text-slate-900">Kalkulator Impian</Text>
              <Text className="text-xs text-slate-500">
                Hitung proyeksi tercapainya: <Text className="font-bold text-indigo-600">{selectedItem.title}</Text>
              </Text>
            </View>
          </View>

          {/* Calculator Input */}
          <View className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 mb-4">
            <Text className="text-xs font-semibold text-slate-600 mb-1.5">
              Rencana Tabungan Harian (Rp/hari)
            </Text>
            <View className="flex-row items-center bg-white border border-slate-300 rounded-xl px-3 py-2">
              <Text className="text-sm font-bold text-slate-700 mr-2">Rp</Text>
              <TextInput
                value={dailySavingsInput}
                onChangeText={setDailySavingsInput}
                keyboardType="numeric"
                className="flex-1 text-base font-bold text-slate-900"
                placeholder="25000"
              />
            </View>
          </View>

          {/* Projection Result */}
          <View className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 mb-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-xs text-indigo-600 font-medium">Sisa Kekurangan</Text>
                <Text className="text-base font-extrabold text-indigo-900">
                  Rp {remainingNeeded.toLocaleString('id-ID')}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-xs text-indigo-600 font-medium">Perkiraan Waktu</Text>
                <Text className="text-base font-extrabold text-indigo-900">
                  {daysRemaining} Hari Lagi
                </Text>
              </View>
            </View>
          </View>

          {/* Setor Tabungan Button */}
          <TouchableOpacity
            onPress={handleDepositToday}
            activeOpacity={0.8}
            className="w-full py-3 rounded-xl bg-emerald-600 items-center mb-4 active:bg-emerald-700">
            <Text className="text-xs font-bold text-white">
              + Setor Tabungan Hari Ini (+Rp {dailyRate.toLocaleString('id-ID')})
            </Text>
          </TouchableOpacity>

          {depositSuccess && (
            <View className="bg-emerald-100 border border-emerald-300 rounded-xl p-2.5 mb-4 items-center">
              <Text className="text-xs font-bold text-emerald-800">
                ✓ Berhasil menyetor ke target {selectedItem.title}!
              </Text>
            </View>
          )}

          {/* Milestones Breakdown (25%, 50%, 75%, 100%) */}
          <Text className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Tahapan Milestone
          </Text>
          <View className="gap-2">
            {[25, 50, 75, 100].map((step) => {
              const stepAmount = (selectedItem.targetAmount * step) / 100;
              const isAchieved = selectedItem.currentAmount >= stepAmount;
              return (
                <View
                  key={step}
                  className={`flex-row items-center justify-between p-2.5 rounded-xl border ${
                    isAchieved
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : 'bg-slate-50 border-slate-100'
                  }`}>
                  <View className="flex-row items-center gap-2">
                    <CheckCircle2
                      size={16}
                      color={isAchieved ? '#10b981' : '#cbd5e1'}
                    />
                    <Text
                      className={`text-xs font-semibold ${
                        isAchieved ? 'text-emerald-900' : 'text-slate-600'
                      }`}>
                      Milestone {step}%
                    </Text>
                  </View>
                  <Text
                    className={`text-xs font-bold ${
                      isAchieved ? 'text-emerald-700' : 'text-slate-400'
                    }`}>
                    Rp {stepAmount.toLocaleString('id-ID')}
                  </Text>
                </View>
              );
            })}
          </View>
        </Animated.View>

      </ScrollView>

      {/* Modal Tambah Impian */}
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
              <Text className="text-lg font-bold text-slate-900">Tambah Target Impian Baru</Text>
              <TouchableOpacity
                onPress={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center">
                <X size={16} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View className="mb-3">
              <Text className="text-xs font-semibold text-slate-600 mb-1">Nama Barang Impian</Text>
              <TextInput
                value={newTitle}
                onChangeText={setNewTitle}
                placeholder="Contoh: iPad Air, Liburan ke Bali"
                className="h-12 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm text-slate-900"
              />
            </View>

            <View className="mb-3">
              <Text className="text-xs font-semibold text-slate-600 mb-1">Target Nominal (Rp)</Text>
              <TextInput
                value={newTarget}
                onChangeText={setNewTarget}
                keyboardType="numeric"
                placeholder="Contoh: 12000000"
                className="h-12 bg-slate-50 border border-slate-200 rounded-xl px-3 text-base font-bold text-slate-900"
              />
            </View>

            <View className="mb-4">
              <Text className="text-xs font-semibold text-slate-600 mb-1">Target Selesai (Bulan & Tahun)</Text>
              <TextInput
                value={newDeadline}
                onChangeText={setNewDeadline}
                placeholder="Contoh: Maret 2027"
                className="h-12 bg-slate-50 border border-slate-200 rounded-xl px-3 text-sm text-slate-900"
              />
            </View>

            <TouchableOpacity
              onPress={handleAddNewWishlist}
              activeOpacity={0.8}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 items-center active:bg-indigo-700">
              <Text className="text-base font-bold text-white">Simpan Impian</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
