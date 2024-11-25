import React from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Button from '@/components/Button';
import { hp, wp } from '@/helpers/common';
import { theme } from '@/constants/theme';
import Icon from '@/assets/icons';

const Home = () => {
  const { setAuth } = useAuth();

  const onLogout = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Sign out', 'Error signing out!');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>LinkUp</Text>
          <View style={styles.icon}>
            <Pressable>
              <Icon name="heart" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}></Icon>
            </Pressable>
            <Pressable>
              <Icon name="plus" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}></Icon>
            </Pressable>
            <Pressable>
              <Icon name="user" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}></Icon>
            </Pressable>
          </View>
        </View>
      </View>
      <Button title="Log out" onPress={onLogout}></Button>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous',
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  footer: {
    gap: 30,
    width: '100%',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  loginText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
