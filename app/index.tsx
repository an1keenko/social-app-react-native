import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';

const index = () => {
  return (
    <ScreenWrapper>
      <Text>index</Text>
      <Button title="welcome" onPress={() => router.push('/welcome')}></Button>
    </ScreenWrapper>
  );
};

export default index;
