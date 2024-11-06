import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const MainLayout: React.FC = () => {
  const { setAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session', session);

      if (session) {
        setAuth(session?.user);
        router.push('/home');
      } else {
        setAuth(null);
        router.replace('/welcome');
      }
    });
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
};

const _layout = () => {
  return (
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
  );
};

export default _layout;