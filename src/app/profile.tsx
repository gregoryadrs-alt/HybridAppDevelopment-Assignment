import { router } from 'expo-router';
import {
  ChevronRight,
  HelpCircle,
  LogOut,
  Shield,
  Trophy,
  User,
  Wallet,
  X,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BadgeCard } from '../components/BadgeCard';
import { HeaderBar } from '../components/HeaderBar';
import { badges } from '../data/mockData';

const cardShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 2,
};

export default function ProfileScreen() {
  const [activeModal, setActiveModal] = useState<'wallet' | 'security' | 'help' | null>(null);
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked'>('all');

  const handleLogout = () => {
    router.replace('/' as any);
  };

  const filteredBadges = badges.filter((b) => {
    if (badgeFilter === 'unlocked') return b.unlocked;
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Reusable Header */}
      <HeaderBar title="Profil & Prestasi" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}>
        
        {/* User Card */}
        <Animated.View
          entering={FadeInDown.duration(400)}
          style={cardShadow}
          className="bg-white rounded-3xl p-6 items-center border border-slate-100 mb-5">
          <View className="relative mb-3">
            <View className="w-24 h-24 rounded-full bg-indigo-50 border-4 border-indigo-500 items-center justify-center">
              <User size={44} color="#6366f1" />
            </View>
            <View className="absolute bottom-0 right-0 bg-amber-400 p-1.5 rounded-full border-2 border-white">
              <Trophy size={14} color="#ffffff" />
            </View>
          </View>
          <Text className="text-xl font-bold text-slate-900">Alex Morgan</Text>
          <Text className="text-xs text-slate-500 mt-0.5">alex.morgan@email.com</Text>

          {/* Gamification Stats */}
          <View className="flex-row items-center justify-around w-full mt-5 pt-4 border-t border-slate-100">
            <View className="items-center">
              <Text className="text-xs text-slate-400 font-medium">Level Tabungan</Text>
              <Text className="text-lg font-extrabold text-indigo-600 mt-0.5">Lvl 4 🚀</Text>
            </View>
            <View className="w-px h-8 bg-slate-200" />
            <View className="items-center">
              <Text className="text-xs text-slate-400 font-medium">Streak Rutin</Text>
              <Text className="text-lg font-extrabold text-amber-500 mt-0.5">14 Hari 🔥</Text>
            </View>
            <View className="w-px h-8 bg-slate-200" />
            <View className="items-center">
              <Text className="text-xs text-slate-400 font-medium">Badge Didapat</Text>
              <Text className="text-lg font-extrabold text-emerald-600 mt-0.5">3 / 8 🎖️</Text>
            </View>
          </View>
        </Animated.View>

        {/* Badges / Prestasi Section */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)} className="mb-5">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-1.5">
              <Trophy size={18} color="#eab308" />
              <Text className="text-lg font-bold text-slate-900">Koleksi Badge</Text>
            </View>
            <TouchableOpacity
              onPress={() => setBadgeFilter(badgeFilter === 'all' ? 'unlocked' : 'all')}
              className="bg-indigo-50 px-2.5 py-1 rounded-lg">
              <Text className="text-xs font-semibold text-indigo-600">
                {badgeFilter === 'all' ? 'Tampilkan Tercapai' : 'Tampilkan Semua'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Using Reusable BadgeCard Component */}
          <View className="flex-row flex-wrap gap-2.5">
            {filteredBadges.map((badge, idx) => (
              <Animated.View
                key={badge.id}
                entering={FadeInRight.delay(200 + idx * 70).duration(300)}
                className="w-[48%]">
                <BadgeCard
                  name={badge.name}
                  desc={badge.desc}
                  icon={badge.icon}
                  color={badge.color}
                  bg={badge.bg}
                  unlocked={badge.unlocked}
                />
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Account Details & Settings */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} className="mb-5">
          <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Pengaturan Akun
          </Text>

          <View style={cardShadow} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {/* Wallet Modal Trigger */}
            <TouchableOpacity
              onPress={() => setActiveModal('wallet')}
              className="flex-row items-center justify-between p-4 border-b border-slate-100 active:bg-slate-50">
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-xl bg-indigo-50 items-center justify-center">
                  <Wallet size={18} color="#6366f1" />
                </View>
                <View>
                  <Text className="text-sm font-semibold text-slate-900">Rekening & Dompet Terhubung</Text>
                  <Text className="text-xs text-slate-400">BCA, GoPay, OVO (3 Aktif)</Text>
                </View>
              </View>
              <ChevronRight size={18} color="#94a3b8" />
            </TouchableOpacity>

            {/* Security Modal Trigger */}
            <TouchableOpacity
              onPress={() => setActiveModal('security')}
              className="flex-row items-center justify-between p-4 border-b border-slate-100 active:bg-slate-50">
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-xl bg-emerald-50 items-center justify-center">
                  <Shield size={18} color="#10b981" />
                </View>
                <View>
                  <Text className="text-sm font-semibold text-slate-900">Keamanan & PIN</Text>
                  <Text className="text-xs text-slate-400">PIN 6 digit & Biometrik Aktif</Text>
                </View>
              </View>
              <ChevronRight size={18} color="#94a3b8" />
            </TouchableOpacity>

            {/* Help Modal Trigger */}
            <TouchableOpacity
              onPress={() => setActiveModal('help')}
              className="flex-row items-center justify-between p-4 active:bg-slate-50">
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-xl bg-amber-50 items-center justify-center">
                  <HelpCircle size={18} color="#f59e0b" />
                </View>
                <View>
                  <Text className="text-sm font-semibold text-slate-900">Pusat Bantuan</Text>
                  <Text className="text-xs text-slate-400">FAQ & Pertanyaan Umum</Text>
                </View>
              </View>
              <ChevronRight size={18} color="#94a3b8" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Sign Out Button */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)}>
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.8}
            className="flex-row items-center justify-center gap-2 py-3.5 rounded-2xl bg-red-50 border border-red-200">
            <LogOut size={16} color="#ef4444" />
            <Text className="text-sm font-bold text-red-500">Keluar dari Akun</Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>

      {/* Modal: Rekening & Dompet Terhubung */}
      <Modal
        visible={activeModal === 'wallet'}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveModal(null)}>
        <Pressable
          onPress={() => setActiveModal(null)}
          className="flex-1 bg-black/40 justify-center items-center px-6">
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-3xl p-6 border border-slate-100">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-900">Dompet Terhubung</Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <X size={18} color="#64748b" />
              </TouchableOpacity>
            </View>
            <View className="gap-2.5 mb-4">
              <View className="flex-row items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Text className="text-xs font-bold text-slate-800">Bank Central Asia (BCA)</Text>
                <Text className="text-xs text-emerald-600 font-bold">● Terhubung</Text>
              </View>
              <View className="flex-row items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Text className="text-xs font-bold text-slate-800">GoPay</Text>
                <Text className="text-xs text-emerald-600 font-bold">● Terhubung</Text>
              </View>
              <View className="flex-row items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Text className="text-xs font-bold text-slate-800">OVO Cash</Text>
                <Text className="text-xs text-emerald-600 font-bold">● Terhubung</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setActiveModal(null)}
              className="py-3 rounded-xl bg-indigo-600 items-center">
              <Text className="text-xs font-bold text-white">Tutup</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Modal: Keamanan & PIN */}
      <Modal
        visible={activeModal === 'security'}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveModal(null)}>
        <Pressable
          onPress={() => setActiveModal(null)}
          className="flex-1 bg-black/40 justify-center items-center px-6">
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-3xl p-6 border border-slate-100">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-900">Keamanan Akun</Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <X size={18} color="#64748b" />
              </TouchableOpacity>
            </View>
            <View className="gap-3 mb-4">
              <View className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <Text className="text-xs font-bold text-emerald-900">Enkripsi 256-Bit Aktif</Text>
                <Text className="text-[11px] text-emerald-700 mt-0.5">
                  Data transaksi Anda tersimpan dengan proteksi terenkripsi.
                </Text>
              </View>
              <View className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex-row items-center justify-between">
                <Text className="text-xs font-semibold text-slate-800">Biometrik / Face ID</Text>
                <Text className="text-xs font-bold text-indigo-600">Aktif ✓</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setActiveModal(null)}
              className="py-3 rounded-xl bg-indigo-600 items-center">
              <Text className="text-xs font-bold text-white">Selesai</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Modal: Pusat Bantuan */}
      <Modal
        visible={activeModal === 'help'}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveModal(null)}>
        <Pressable
          onPress={() => setActiveModal(null)}
          className="flex-1 bg-black/40 justify-center items-center px-6">
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-3xl p-6 border border-slate-100">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-900">Pusat Bantuan</Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <X size={18} color="#64748b" />
              </TouchableOpacity>
            </View>
            <View className="gap-2.5 mb-4">
              <View className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <Text className="text-xs font-bold text-slate-800">Cara menambah impian?</Text>
                <Text className="text-[11px] text-slate-500 mt-0.5">
                  Buka tab Target Impian, ketuk tombol Tambah di pojok kanan atas.
                </Text>
              </View>
              <View className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <Text className="text-xs font-bold text-slate-800">Bagaimana streak dihitung?</Text>
                <Text className="text-[11px] text-slate-500 mt-0.5">
                  Catat minimal 1 transaksi pengeluaran/tabungan setiap hari.
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setActiveModal(null)}
              className="py-3 rounded-xl bg-indigo-600 items-center">
              <Text className="text-xs font-bold text-white">Tutup</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
