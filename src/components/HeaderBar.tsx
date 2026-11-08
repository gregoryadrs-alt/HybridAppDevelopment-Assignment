import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface HeaderBarProps {
  title: string;
  onBack?: () => void;
  rightLabel?: string;
  onRightPress?: () => void;
  rightActionVariant?: 'text' | 'button';
}

export function HeaderBar({
  title,
  onBack,
  rightLabel,
  onRightPress,
  rightActionVariant = 'text',
}: HeaderBarProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-row items-center justify-between px-5 py-3 border-b border-slate-200/80 bg-white">
      <TouchableOpacity
        onPress={handleBack}
        className="px-3 py-1.5 rounded-xl bg-slate-100 items-center justify-center active:bg-slate-200">
        <Text className="text-sm font-semibold text-slate-700">← Kembali</Text>
      </TouchableOpacity>

      <Text className="text-lg font-bold text-slate-900" numberOfLines={1}>
        {title}
      </Text>

      {rightLabel ? (
        <TouchableOpacity
          onPress={onRightPress}
          className={
            rightActionVariant === 'button'
              ? 'px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 items-center justify-center active:bg-indigo-100'
              : 'bg-indigo-50 px-2.5 py-1 rounded-lg'
          }>
          <Text
            className={
              rightActionVariant === 'button'
                ? 'text-xs font-bold text-indigo-600'
                : 'text-xs font-semibold text-indigo-600'
            }>
            {rightLabel}
          </Text>
        </TouchableOpacity>
      ) : (
        <View className="w-16" />
      )}
    </View>
  );
}

export default HeaderBar;
