import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NavegacaoPaginas() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Explore a Immersia</Text>
        
        {/* Botão Experiências */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/experiencias')}
        >
          <Ionicons name="star-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Experiências</Text>
        </TouchableOpacity>

        {/* Botão Hospedagens */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#5D4037' }]} 
          onPress={() => router.push('/hospedagens')}
        >
          <Ionicons name="bed-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Hospedagens</Text>
        </TouchableOpacity>

        {/* Botão Pacotes */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#2E7D32' }]} 
          onPress={() => router.push('/pacotes')}
        >
          <Ionicons name="gift-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Pacotes</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    gap: 15, // Espaçamento entre os botões
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    elevation: 3, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});