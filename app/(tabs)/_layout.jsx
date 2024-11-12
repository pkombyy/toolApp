import { Link, Tabs } from 'expo-router';
import React from 'react';
import QrIcon from '@/assets/icons/qr';
import ListIcon from '@/assets/icons/list';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // headerShown: false,
      }}>
       <Tabs.Screen
            name="index"
            options={{
              headerTitle: 'Сканер QR',
              tabBarShowLabel: false,
              headerRight: () =>(
                <Link href={'/scanStory'}>
                  <ListIcon width={32} height={32} fill={Colors.dark.tabIconDefault}/>
                  </Link>
              ),
              // href: isRegUser?'reader':null,
              tabBarIcon: () => {
                return <QrIcon width={32} height={32} fill={Colors.dark.tabIconDefault} />
              },
            }}
          />
           <Tabs.Screen
            name="scanStory"
            options={{
              headerTitle: 'История сканирования',
              tabBarShowLabel: false,
              href: null,
            }}
          />
    </Tabs>
  );
}
