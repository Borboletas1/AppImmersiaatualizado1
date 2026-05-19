import { Feather } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import * as DropdownMenu from "zeego/dropdown-menu";

function ProdutosMenuTrigger() {
  const router = useRouter();

  const navigateTo = (route: string) => {
    router.push(`/${route}`);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Pressable style={styles.menuButton}>
          <Feather name="grid" size={24} color="#ffffff" />
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
          onSelect={() => navigateTo("experiencias")}
        >
          <View style={styles.dropdownItem}>
            <Feather name="star" size={18} color="#FFD700" />
            <DropdownMenu.ItemTitle style={styles.itemTitle}>
              Experiências
            </DropdownMenu.ItemTitle>
          </View>
        </DropdownMenu.Item>

        <DropdownMenu.Item key="pacotes" onSelect={() => navigateTo("pacotes")}>
          <View style={styles.dropdownItem}>
            <Feather name="package" size={18} color="#FFD700" />
            <DropdownMenu.ItemTitle style={styles.itemTitle}>
              Pacotes
            </DropdownMenu.ItemTitle>
          </View>
        </DropdownMenu.Item>

        <DropdownMenu.Item
          key="hospedagens"
          onSelect={() => navigateTo("hospedagens")}
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
        tabBarActiveTintColor: "#fded8f",
        tabBarInactiveTintColor: "rgba(255,255,255,0.6)",
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen name="experiencias" options={{ href: null }} />

      <Tabs.Screen name="pacotes" options={{ href: null }} />

      <Tabs.Screen name="hospedagens" options={{ href: null }} />

      <Tabs.Screen
        name="produtos"
        options={{
          title: "Produtos",
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />

      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color }) => (
            <Feather name="heart" size={24} color={color} />
          ),
        }}
      />
        <Tabs.Screen
  name="cupons"
  options={{
    title: "Cupons",
    tabBarIcon: ({ color, size }) => (
      <Feather name="tag" size={size} color={color} />
    ),
    headerShown: false,
  }}
/>
      <Tabs.Screen
        name="blog"
        options={{
          title: "Blog",
          tabBarIcon: ({ color }) => (
            <Feather name="edit-3" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 72,
    paddingBottom: 8,
    paddingTop: 6,
    backgroundColor: "#584128",
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },

  // ✅ Estilo padronizado para TODOS os botões da tab bar
  tabBarItem: {
    backgroundColor: "transparent",
    paddingVertical: 0,
    paddingHorizontal: 8,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0,
    marginHorizontal: 2,
  },

  // ✅ Estilo do texto abaixo do ícone
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.3,
    marginTop: 2,
  },

  // Container do botão Produtos
  tabItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
    width: '100%',
  },

  // Botão Produtos - Estilizado para ficar igual aos outros
  menuButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    paddingHorizontal: 0,
    backgroundColor: "#584128",
    borderRadius: 0,
    gap: 0,
    borderWidth: 0,
    overflow: "hidden",
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },

  menuText: {
    fontSize: 11,
    color: "#ffffff",
    marginTop: 2,
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  dropdownContent: {
    backgroundColor: "#584128",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 200,
  },

  dropdownLabel: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.15)",
    marginBottom: 4,
  },

  labelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fadb2b",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  itemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
    marginLeft: 8,
    letterSpacing: 0.3,
  },
});