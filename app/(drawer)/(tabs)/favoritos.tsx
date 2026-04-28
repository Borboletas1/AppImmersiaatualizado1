import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Dados de exemplo para favoritos
const favoritosIniciais = [
  {
    id: '1',
    nome: 'PACOTE SERTÕES DO BRASIL',
    preco: '3200,00',
    imagem: require('../../../assets/images/sertao.webp'),
    tipo: 'Pacote',
    localizacao: 'Sertão Brasileiro',
    avaliacao: 4.8,
  },
  {
    id: '2',
    nome: 'FAZENDA CAFÉ ESPECIAL',
    preco: '1800,00',
    imagem: require('../../../assets/images/img2.webp'),
    tipo: 'Hospedagem',
    localizacao: 'Minas Gerais',
    avaliacao: 4.9,
  },
  {
    id: '3',
    nome: 'CHALÉ MONTANHA',
    preco: '2500,00',
    imagem: require('../../../assets/images/img3.jpg'),
    tipo: 'Hospedagem',
    localizacao: 'Serra do Rio do Rastro',
    avaliacao: 4.7,
  },
  {
    id: '4',
    nome: 'PRAIA DO FORTE',
    preco: '3500,00',
    imagem: require('../../../assets/images/img4.jpg'),
    tipo: 'Pacote',
    localizacao: 'Bahia',
    avaliacao: 4.9,
  },
  {
    id: '5',
    nome: 'SERRA GAÚCHA',
    preco: '2200,00',
    imagem: require('../../../assets/images/img5.jpg'),
    tipo: 'Experiência',
    localizacao: 'Rio Grande do Sul',
    avaliacao: 4.8,
  },
];

export default function FavoritosScreen() {
  const [favoritos, setFavoritos] = useState(favoritosIniciais);

  const removerFavorito = (id) => {
    Alert.alert(
      'Remover favorito',
      'Deseja realmente remover este item dos favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            const novosFavoritos = favoritos.filter(item => item.id !== id);
            setFavoritos(novosFavoritos);
            Alert.alert('Sucesso', 'Item removido dos favoritos!');
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.imagem} style={styles.cardImage} />
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.tipoContainer}>
            <Text style={styles.tipo}>{item.tipo}</Text>
          </View>
          <TouchableOpacity 
            onPress={() => removerFavorito(item.id)}
            style={styles.favoriteButton}
          >
            <Ionicons name="heart" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.nome}>{item.nome}</Text>
        
        <View style={styles.localContainer}>
          <Ionicons name="location-outline" size={14} color="#C5A87B" />
          <Text style={styles.localizacao}>{item.localizacao}</Text>
        </View>
        
        <View style={styles.avaliacaoContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.avaliacao}>{item.avaliacao}</Text>
          <Text style={styles.avaliacaoTexto}>avaliações</Text>
        </View>
        
        <View style={styles.precoContainer}>
          <Text style={styles.cifrao}>R$</Text>
          <Text style={styles.preco}>{item.preco}</Text>
        </View>
        
        <TouchableOpacity style={styles.botaoReservar}>
          <Text style={styles.botaoTexto}>RESERVAR AGORA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={80} color="#C5A87B" />
      <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
      <Text style={styles.emptyText}>
        Explore nossos destinos e adicione seus lugares favoritos clicando no coração ♥
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Favoritos</Text>
        <Text style={styles.headerSubtitle}>
          {favoritos.length} {favoritos.length === 1 ? 'item salvo' : 'itens salvos'}
        </Text>
      </View>
      
      <FlatList
        data={favoritos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEAE0',
  },
  
  header: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#EDEAE0',
    borderBottomWidth: 1,
    borderBottomColor: '#E0DCD0',
  },
  
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#584128',
  },
  
  headerSubtitle: {
    fontSize: 14,
    color: '#C5A87B',
    marginTop: 4,
  },
  
  listContainer: {
    padding: 16,
    flexGrow: 1,
  },
  
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  
  cardContent: {
    padding: 16,
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  tipoContainer: {
    backgroundColor: '#584128',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
  tipo: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  
  favoriteButton: {
    padding: 4,
  },
  
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#584128',
    marginBottom: 8,
  },
  
  localContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  localizacao: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  
  avaliacaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  avaliacao: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#584128',
    marginLeft: 4,
    marginRight: 2,
  },
  
  avaliacaoTexto: {
    fontSize: 12,
    color: '#999',
  },
  
  precoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  
  cifrao: {
    fontSize: 14,
    color: '#C5A87B',
    fontWeight: 'bold',
    marginRight: 2,
  },
  
  preco: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#584128',
  },
  
  botaoReservar: {
    backgroundColor: '#4A3721',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  botaoTexto: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#584128',
    marginTop: 16,
    marginBottom: 8,
  },
  
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
});