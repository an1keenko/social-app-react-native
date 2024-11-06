import { View, Text, Button } from 'react-native';
import {router, useRouter} from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';
import Loading from "@/components/Loading";

const index = () => {
    const router = useRouter()
  return (
    // <ScreenWrapper>
    //   <Text>index</Text>
    //   <Button title="welcome" onPress={() => router.push('/welcome')}></Button>
    // </ScreenWrapper>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Loading />
      </View>
  );
};

export default index;
