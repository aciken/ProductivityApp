import { View, TouchableOpacity, Text } from 'react-native';
import { usePathname, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CustomTabBar() {
  const pathname = usePathname();

  const tabs = [
    { 
      name: 'Home', 
      path: '/home', 
      ionIcon: 'home'
    },
    { 
      name: 'Friends', 
      path: '/friends', 
      ionIcon: 'people'
    },
    { 
      name: 'Profile', 
      path: '/profile', 
      ionIcon: 'person'
    },
  ];

  const handleTabPress = (path) => {
    router.push(path);
  };

  return (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      alignItems: 'center', 
      backgroundColor: '#121212', 
      paddingVertical: 12,
    }}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <TouchableOpacity
            key={tab.path}
            style={{ 
              alignItems: 'center', 
              justifyContent: 'center',
            }}
            onPress={() => handleTabPress(tab.path)}
          >
            <Ionicons name={tab.ionIcon} size={24} color={isActive ? '#FFFFFF' : '#B3B8C8'} />
            <Text style={{ color: isActive ? '#FFFFFF' : '#B3B8C8', fontSize: 12, marginTop: 4 }}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}