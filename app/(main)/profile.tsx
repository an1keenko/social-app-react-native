import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import { wp } from '@/helpers/common';
import Icon from '@/assets/icons';
import { theme } from '@/constants/theme';

const Profile = () => {
  const { user, setAuth } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {};

  return (
    <ScreenWrapper background="white">
      <UserHeader user={user} router={router} handleLogout={handleLogout} />
    </ScreenWrapper>
  );
};

const UserHeader = ({ user, router }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: wp(4) }}>
      <Header title="Profile" showBackButton />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" color={theme.colors.rose} />
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
