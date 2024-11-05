import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const _layout = () => {
  // const {setAuth} = useAuth();
  //
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session', session);
    });
  }, []);

  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout: React.FC = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default _layout;
