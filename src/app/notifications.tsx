import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderBar } from '../components/HeaderBar';
import { initialNotifications, NotificationItem } from '../data/mockData';

const cardShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 6,
  elevation: 2,
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Reusable HeaderBar */}
      <HeaderBar
        title={`Notifikasi ${unreadCount > 0 ? `(${unreadCount})` : ''}`}
        rightLabel="Tandai Baca"
        onRightPress={handleMarkAllRead}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}>
        
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Aktivitas Keuangan
        </Text>

        <View className="gap-3">
          {notifications.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Animated.View
                key={item.id}
                entering={FadeInRight.delay(idx * 80).duration(350)}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleToggleRead(item.id)}
                  style={cardShadow}
                  className={`rounded-2xl p-4 border flex-row items-start gap-3.5 ${
                    item.unread
                      ? 'bg-white border-indigo-200/80'
                      : 'bg-white/70 border-slate-200/60'
                  }`}>
                  <View
                    className="w-10 h-10 rounded-xl items-center justify-center mt-0.5"
                    style={{ backgroundColor: item.bg }}>
                    <Icon size={20} color={item.color} />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                      <Text
                        className={`text-sm mr-2 ${
                          item.unread ? 'font-bold text-slate-900' : 'font-medium text-slate-700'
                        }`}>
                        {item.title}
                      </Text>
                      {item.unread && (
                        <View className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                      )}
                    </View>
                    <Text className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {item.desc}
                    </Text>
                    <View className="flex-row items-center gap-1 mt-2">
                      <Text className="text-[11px] text-slate-400">{item.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
