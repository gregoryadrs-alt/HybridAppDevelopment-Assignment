import React from 'react';
import { Text, View } from 'react-native';

const cardShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 2,
};

interface BadgeCardProps {
  name: string;
  desc: string;
  icon: any;
  color: string;
  bg: string;
  unlocked: boolean;
}

export function BadgeCard({
  name,
  desc,
  icon: Icon,
  color,
  bg,
  unlocked,
}: BadgeCardProps) {
  return (
    <View
      style={cardShadow}
      className={`w-[48%] rounded-2xl p-3.5 border ${
        unlocked
          ? 'bg-white border-slate-100'
          : 'bg-slate-100/70 border-dashed border-slate-300 opacity-60'
      }`}>
      <View
        className="w-10 h-10 rounded-xl items-center justify-center mb-2"
        style={{ backgroundColor: bg }}>
        <Icon size={20} color={color} />
      </View>
      <Text className="text-sm font-bold text-slate-900">{name}</Text>
      <Text className="text-[11px] text-slate-500 mt-0.5" numberOfLines={1}>
        {desc}
      </Text>
    </View>
  );
}

export default BadgeCard;
