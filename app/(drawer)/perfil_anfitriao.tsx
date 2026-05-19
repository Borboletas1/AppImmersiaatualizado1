import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useState } from 'react';

export default function PerfilAnfitriaoScreen() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Dados do anfitrião (simulados)
  const hostData = {
    nome: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    telefone: "(11) 98888-8888",
    cpf: "987.654.321-00",
    dataNascimento: "20/08/1988",
    membroDesde: "Março 2023",
    tipoUsuario: "Anfitrião",
    totalPropriedades: 5
  };

  const menuItems = [,
    { icon: "home-outline", title: "Gerenciar Produtos", route: "/minhas-experiencias", color: "#584128" },
    { icon: "calendar-outline", title: "Ver Reservas", route: "/reservas", color: "#4ECDC4" },
    { icon: "person-outline", title: "Editar Perfil", route: "/configuracoes-anfitriao", color: "#96CEB4" },
    { icon: "stats-chart-outline", title: "Dashboard", route: "/dashboard", color: "#45B7D1" },
    { icon: "chatbubble-outline", title: "Mensagens Clientes", route: "/mensagens", color: "#FFEAA7" },
    { icon: "document-text-outline", title: "Termos e Privacidade", route: "/termos", color: "#DDA0DD" },
  ];

  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          onPress: () => {
            setIsLoggedIn(false);
            router.replace("/login");
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
<TouchableOpacity onPress={() => router.replace('/')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#584128" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil do Anfitrião</Text>
        <TouchableOpacity onPress={() => router.push("/editar-perfil")} style={styles.editButton}>
          <Feather name="edit-2" size={20} color="#584128" />
        </TouchableOpacity>
      </View>

      {/* Informações do Anfitrião */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{hostData.nome.charAt(0)}</Text>
          </View>
          <TouchableOpacity style={styles.changePhotoButton}>
            <Feather name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.userName}>{hostData.nome}</Text>
        <Text style={styles.userEmail}>{hostData.email}</Text>
        
        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🏠 {hostData.tipoUsuario}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{hostData.totalPropriedades}</Text>
            <Text style={styles.statLabel}>Propriedades</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>Reservas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Avaliação</Text>
          </View>
        </View>
      </View>

      {/* Informações Pessoais */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>
        
        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={20} color="#584128" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Telefone</Text>
            <Text style={styles.infoValue}>{hostData.telefone}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="calendar-outline" size={20} color="#584128" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Data de Nascimento</Text>
            <Text style={styles.infoValue}>{hostData.dataNascimento}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={20} color="#584128" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Membro desde</Text>
            <Text style={styles.infoValue}>{hostData.membroDesde}</Text>
          </View>
        </View>
      </View>

      {/* Menu do Anfitrião */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Gerenciamento do Anfitrião</Text>
        
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(item.route)}
          >
            <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão Sair */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>

      {/* Versão do App */}
      <Text style={styles.versionText}>Versão 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEAE0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#584128',
  },
  editButton: {
    padding: 8,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#584128',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#584128',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  badgeContainer: {
    marginBottom: 20,
  },
  badge: {
    backgroundColor: '#584128',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#584128',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e0e0e0',
  },
  infoSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  menuSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 16,
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginBottom: 30,
    marginTop: 10,
  },
});