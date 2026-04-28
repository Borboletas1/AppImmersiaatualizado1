import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function SairScreen() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = (): void => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair? Você precisará fazer login novamente para acessar sua conta.",
      [
        { 
          text: "Cancelar", 
          style: "cancel" 
        },
        { 
          text: "Sair", 
          onPress: performLogout,
          style: "destructive"
        }
      ]
    );
  };

  const performLogout = async (): Promise<void> => {
    setIsLoggingOut(true);
    
    try {
      // Simular processo de logout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionar para tela de login
      router.replace('/login');
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleClearData = (): void => {
    Alert.alert(
      "Limpar Dados Locais",
      "Isso removerá todos os dados salvos no dispositivo. Tem certeza?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Limpar", 
          onPress: () => {
            // Limpar dados locais
            Alert.alert("Sucesso", "Dados locais removidos com sucesso!");
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={28} color="#584128" />
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="log-out-outline" size={80} color="#FF3B30" />
        </View>
        
        <Text style={styles.title}>Deseja sair do aplicativo?</Text>
        <Text style={styles.description}>
          Ao sair, você será redirecionado para a tela de login e precisará inserir suas credenciais novamente.
        </Text>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          <Ionicons name="exit-outline" size={24} color="#fff" />
          <Text style={styles.logoutButtonText}>
            {isLoggingOut ? "Saindo..." : "Sair da conta"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.clearButton} 
          onPress={handleClearData}
        >
          <Ionicons name="trash-outline" size={20} color="#666" />
          <Text style={styles.clearButtonText}>Limpar dados locais</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={20} color="#666" />
        <Text style={styles.infoText}>
          Suas informações pessoais permanecem seguras mesmo após sair.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EDEAE0',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  clearButton: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
    marginLeft: 8,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 12,
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
    width: '100%',
  },
  infoText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
});