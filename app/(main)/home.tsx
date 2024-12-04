import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import ScreenWrapper from '@/components/ScreenWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Button from '@/components/Button';
import { hp, wp } from '@/helpers/common';
import { theme } from '@/constants/theme';
import Icon from '@/assets/icons';
import Avatar from '@/components/Avatar';
import { fetchPosts } from '@/services/postService';
import PostCard from '@/components/PostCard';
import Loading from '@/components/Loading';
import { getUserData } from '@/services/userService';

let limit = 0;

const Home = () => {
  const { user, setAuth } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const handlePostEvent = async (payload) => {
    if (payload.eventType == 'INSERT' && payload?.new?.id) {
      let newPost = { ...payload.new };
      let res = await getUserData(newPost.userId);
      newPost.user = res.success ? res.data : {};
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  };

  useEffect(() => {
    let postChannel = supabase
      .channel('posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, handlePostEvent)
      .subscribe();

    // getPosts();

    return () => {
      supabase.removeChannel(postChannel);
    };
  }, []);

  const getPosts = async () => {
    if (!hasMore) return null;
    limit = limit + 4;

    let res = await fetchPosts(limit);
    if (res.success) {
      if (posts.length == res.data.length) setHasMore(false);
      setPosts(res.data);
    }
  };

  // const onLogout = async () => {
  //   setAuth(null);
  //   const { error } = await supabase.auth.signOut();
  //   if (error) {
  //     console.log('Sign out', 'Error signing out!');
  //   }
  // };

  return (
    <ScreenWrapper background="white">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>LinkUp</Text>
          <View style={styles.icon}>
            <Pressable onPress={() => router.push('/notifications')}>
              <Icon name="heart" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}></Icon>
            </Pressable>
            <Pressable onPress={() => router.push('/newPost')}>
              <Icon name="plus" size={hp(3.2)} strokeWidth={2} color={theme.colors.text}></Icon>
            </Pressable>
            <Pressable onPress={() => router.push('/profile')}>
              <Avatar uri={user?.image} size={hp(4.3)} rounded={theme.radius.sm} style={{ borderWidth: 2 }} />
            </Pressable>
          </View>
        </View>

        <FlatList
          data={posts}
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
      </View>
      {/*<Button title="Log out" onPress={onLogout}></Button>*/}
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
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text,
  },
  pill: {
    position: 'absolute',
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
