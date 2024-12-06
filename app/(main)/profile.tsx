import { Alert, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import ScreenWrapper from '@/components/ScreenWrapper';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { hp, wp } from '@/helpers/common';
import Icon from '@/assets/icons';
import { theme } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import Avatar from '@/components/Avatar';
import React, { useState } from 'react';
import { fetchPosts } from '@/services/postService';
import PostCard from '@/components/PostCard';
import Loading from '@/components/Loading';

const limit = 0;

const Profile = () => {
  const { user, setAuth } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const onLogout = async () => {
    setAuth(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Sign out', 'Error signing out!');
    }
  };

  const getPosts = async () => {
    if (!hasMore) return;

    const newLimit = limit + 4;
    const res = await fetchPosts(newLimit, user.id);

    if (res.success) {
      if (res.data.length <= posts.length) {
        setHasMore(false);
      } else {
        setPosts(res.data);
        limit = newLimit;
      }
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
      <FlatList
        data={posts}
        ListHeaderComponent={<UserHeader user={user} router={router} handleLogout={handleLogout} />}
        ListHeaderComponentStyle={{ marginBottom: 30 }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listStyle}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard item={item} currentUser={user} router={router} />}
        onEndReached={() => {
          getPosts();
        }}
        ListFooterComponent={
          hasMore ? (
            <View style={{ marginVertical: posts.length == 0 ? 200 : 30 }}>
              <Loading />
            </View>
          ) : (
            <View style={{ marginVertical: 30 }}>
              <Text style={styles.noPosts}>No more posts</Text>
            </View>
          )
        }
      />
    </ScreenWrapper>
  );
};

const UserHeader = ({ user, router, handleLogout }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: wp(4) }}>
      <View>
        <Header title="Profile" mb={30} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" color={theme.colors.rose} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={{ gap: 15 }}>
          <View style={styles.avatarContainer}>
            <Avatar uri={user?.image} size={hp(12)} rounded={theme.radius.xxl * 1.4} />
            <Pressable style={styles.editIcon} onPress={() => router.push('/editProfile')}>
              <Icon name="edit" strokeWidth={2.5} size={20} />
            </Pressable>
          </View>
          <View style={{ alignItems: 'center', gap: 4 }}>
            <Text style={styles.userName}>{user && user.name}</Text>
            <Text style={styles.infoText}>{user && user.address}</Text>
          </View>
          <View style={{ gap: 10 }}>
            <View style={styles.info}>
              <Icon name="mail" size={20} color={theme.colors.textLight} />
              <Text style={styles.infoText}>{user && user.email}</Text>
            </View>
            {user && user.phoneNubmer && (
              <View style={styles.info}>
                <Icon name="call" size={20} color={theme.colors.textLight} />
                <Text style={styles.infoText}>{user && user.phoneNumber}</Text>
              </View>
            )}
            {user && user.bio && <Text style={styles.infoText}>{user.bio}</Text>}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {},
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: 'center',
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
    padding: 5,
    borderRadius: theme.radius.sm,
    borderColor: '#fee2e2',
    backgroundColor: 'rgba(255,0,0,0.15)',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  userName: {
    fontSize: hp(3),
    fontWeight: 500,
    color: theme.colors.textDark,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: 500,
    color: theme.colors.textLight,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text,
  },
});
