import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { getUserData } from '@/services/userService';

const MainLayout: React.FC = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session', session);

      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user, session?.user?.email);
        router.push('/home');
      } else {
        setAuth(null);
        router.replace('/welcome');
      }
    });
  }, []);

  const updateUserData = async (user, email) => {
    let res = await getUserData(user?.id);
    if (res.success) setUserData({ ...res.data, email });
  };

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
