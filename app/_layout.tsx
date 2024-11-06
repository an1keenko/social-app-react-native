import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const _layout = () => {
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
