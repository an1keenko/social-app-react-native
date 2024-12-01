import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import ScreenWrapper from '@/components/ScreenWrapper';
import { hp, wp } from '@/helpers/common';
import { theme } from '@/constants/theme';
import Button from '@/components/Button';

const Welcome: React.FC = () => {
  const router = useRouter();

  return (
    <ScreenWrapper background="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image style={styles.welcomeImage} resizeMode="contain" source={require('@/assets/images/welcome.png')} />

        <View style={{ gap: 20 }}>
          <Text style={styles.title}>LinkUp!</Text>
          <Text style={styles.punchline}>Where every thought finds a home and every image tells a story.</Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Getting Started"
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => router.push('/signUp')}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account!</Text>
            <Pressable onPress={() => router.push('/login')}>
              <Text style={[styles.loginText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: wp(4),
  },
  welcomeImage: {
    width: wp(100),
    height: hp(30),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(4),
    textAlign: 'center',
    fontWeight: theme.fonts.bold,
  },
  punchline: {
    textAlign: 'center',
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.text,
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
