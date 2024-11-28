import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import { wp } from '@/helpers/common';
import Icon from '@/assets/icons';
import { theme } from '@/constants/theme';
import { supabase } from '@/lib/supabase';

const Profile = () => {
  const { user, setAuth } = useAuth();
  const router = useRouter();

  const onLogout = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Sign out', 'Error signing out!');
    }
  };

  const handleLogout = async () => {
    Alert.alert('Confirm', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => onLogout(),
        style: 'destructive',
      },
    ]);
  };

  return (
    <ScreenWrapper background="white">
      <UserHeader user={user} router={router} handleLogout={handleLogout} />
    </ScreenWrapper>
  );
};

const UserHeader = ({ user, router, handleLogout }) => {
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
