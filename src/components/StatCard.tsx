import React from 'react';
import { Text, View } from 'react-native';

const softShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 6,
  elevation: 2,
};

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  valueColor?: string;
  icon?: React.ReactNode;
}

export function StatCard({
  label,
  value,
  subtext,
  valueColor = '#4f46e5',
  icon,
}: StatCardProps) {
  return (
    <View
      style={softShadow}
      className="bg-white rounded-2xl p-4 border border-slate-100 flex-1">
      <View className="flex-row items-center justify-between mb-1.5">
        <Text className="text-xs text-slate-400 font-medium">{label}</Text>
        {icon}
      </View>
      <Text className="text-xl font-extrabold" style={{ color: valueColor }}>
        {value}
      </Text>
      {subtext ? (
        <Text className="text-[11px] text-slate-400 mt-1">{subtext}</Text>
      ) : null}
    </View>
  );
}

export default StatCard;
