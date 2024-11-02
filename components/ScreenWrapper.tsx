import React, { ReactNode } from 'react';
import { View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenWrapperProps {
  children: ReactNode;
  background?: string;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, background }) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  return <View style={{ flex: 1, backgroundColor: background, paddingTop }}>{children}</View>;
};

export default ScreenWrapper;
