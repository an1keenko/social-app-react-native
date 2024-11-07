import React from 'react';

import { Text, View } from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Button from '@/components/Button';

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
      <Text>Home</Text>
      <Button title="Log out" onPress={onLogout}></Button>
    </ScreenWrapper>
  );
};

export default Home;
