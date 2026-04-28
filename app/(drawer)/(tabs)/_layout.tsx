import { Tabs, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import * as DropdownMenu from 'zeego/dropdown-menu';
import { View, Text, StyleSheet, Pressable } from 'react-native';

function ProdutosMenuTrigger() {
  const router = useRouter();

  const navigateTo = (route: string) => {
    router.push(`/${route}`);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Pressable style={styles.menuButton}>
          <Feather name="grid" size={24} color="#ffffff"/>
          <Text style={styles.menuText}>Produtos</Text>
        </Pressable>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        style={styles.dropdownContent}
        align="center"
        side="top"
      >
        <View style={styles.dropdownLabel}>
          <Text style={styles.labelText}>Categorias</Text>
        </View>
        
        <DropdownMenu.Item 
          key="experiencias" 
          onSelect={() => navigateTo('experiencias')}
        >
          <View style={styles.dropdownItem}>
            <Feather name="star" size={18} color="#FFD700" />
            <DropdownMenu.ItemTitle style={styles.itemTitle}>
              Experiências
            </DropdownMenu.ItemTitle>
          </View>
        </DropdownMenu.Item>
        
        <DropdownMenu.Item 
          key="pacotes" 
          onSelect={() => navigateTo('pacotes')}
        >
          <View style={styles.dropdownItem}>
            <Feather name="package" size={18} color="#FFD700" />
            <DropdownMenu.ItemTitle style={styles.itemTitle}>
              Pacotes
            </DropdownMenu.ItemTitle>
          </View>
        </DropdownMenu.Item>
        
        <DropdownMenu.Item 
          key="hospedagens" 
          onSelect={() => navigateTo('hospedagens')}
        >
          <View style={styles.dropdownItem}>
            <Feather name="home" size={18} color="#FFD700" />
            <DropdownMenu.ItemTitle style={styles.itemTitle}>
              Hospedagens
            </DropdownMenu.ItemTitle>
          </View>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function CustomTabBarButton(props) {
  return (
    <View style={styles.tabItemContainer}>
      <ProdutosMenuTrigger />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#ffffff',
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Início', 
          tabBarIcon: ({ color }) => <Feather name="home" size={22} color={color} />
        }} 
      />
      
      <Tabs.Screen 
        name="experiencias" 
        options={{ href: null }} 
      />
      
      <Tabs.Screen 
        name="pacotes" 
        options={{ href: null }} 
      />
      
      <Tabs.Screen 
        name="hospedagens" 
        options={{ href: null }} 
      />
      
      <Tabs.Screen
        name="produtos"
        options={{
          title: 'Produtos',
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      
      <Tabs.Screen 
        name="favoritos" 
        options={{ 
          title: 'Favoritos', 
          tabBarIcon: ({ color }) => <Feather name="heart" size={22} color={color} />
        }} 
      />
      
      <Tabs.Screen 
        name="perfil" 
        options={{ 
          title: 'Perfil', 
          tabBarIcon: ({ color }) => <Feather name="user" size={22} color={color} />
        }} 
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: '#584128',
    borderTopWidth: 0,
  },
  
  tabItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: '#584128',
    borderRadius: 10,
    gap: 2,
    borderWidth: 0,
    overflow: 'hidden',
  },
  
  menuText: {
    fontSize: 11,
    color: '#ffffff',
    marginTop: 2,
    fontWeight: '500',
  },
  
  dropdownContent: {
    backgroundColor: '#584128',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 200,
  },
  
  dropdownLabel: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d4a373',
    marginBottom: 4,
  },
  
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  
  itemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    marginLeft: 8,
  },
});