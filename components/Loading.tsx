import React from 'react';

import { ActivityIndicator, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 'large', color = theme.colors.primary }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;
