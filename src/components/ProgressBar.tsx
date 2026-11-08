import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface ProgressBarProps {
  progress: number; // 0 to 1
  color: string;
  height?: number;
  trackColor?: string;
  duration?: number;
}

export function ProgressBar({
  progress,
  color,
  height = 8,
  trackColor = '#f1f5f9', // slate-100
  duration = 1000,
}: ProgressBarProps) {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(Math.min(1, Math.max(0, progress)), { duration });
  }, [progress, duration, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%`,
    height: '100%',
    borderRadius: 999,
    backgroundColor: color,
  }));

  return (
    <View
      style={{ height, backgroundColor: trackColor, width: '100%' }}
      className="rounded-full overflow-hidden">
      <Animated.View style={animatedStyle} />
    </View>
  );
}

export default ProgressBar;
