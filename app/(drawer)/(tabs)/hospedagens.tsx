import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Hospedagem {
  id: number;
  titulo: string;
  preco: string;
  localizacao: string;
  imagem: any;
}

const hospedagens: Hospedagem[] = [
  {
    id: 16,
    titulo: 'Refúgio da Serra - Campos do Jordão, SP',
    preco: 'R$620/noite',
    localizacao: 'Campos do Jordão, SP',
    imagem: require('../../../assets/images/hospedagem1.jpg'),
  },
  {
    id: 17,
    titulo: 'Studio moderno - São Paulo, SP',
    preco: 'R$290/noite',
    localizacao: 'São Paulo, SP',
    imagem: require('../../../assets/images/hospedagem2.jpg'),
  },
  {
    id: 18,
    titulo: 'Casa de praia - Búzios, RJ',
    preco: 'R$1.100/noite',
    localizacao: 'Búzios, RJ',
    imagem: require('../../../assets/images/hospedagem3.jpeg'),
  },
  {
    id: 19,
    titulo: 'Cabana de madeira - Gonçalves, MG',
    preco: 'R$480/noite',
    localizacao: 'Gonçalves, MG',
    imagem: require('../../../assets/images/hospedagem4.jpg'),
  },
  {
    id: 20,
    titulo: 'Loft Industrial Zona Portuária - Rio de Janeiro, RJ',
    preco: 'R$320/noite',
    localizacao: 'Rio de Janeiro, RJ',
    imagem: require('../../../assets/images/hospedagem5.jpg'),
  },
  {
    id: 21,
    titulo: 'Bangâlo Lua Tropical - Maraú, BA',
    preco: 'R$790/noite',
    localizacao: 'Maraú, BA',
    imagem: require('../../../assets/images/hospedagem6.webp'),
  },
  {
    id: 22,
    titulo: 'Sítio Recanto da Paz - Serra Negra, SP',
    preco: 'R$950/noite',
    localizacao: 'Serra Negra, SP',
    imagem: require('../../../assets/images/hospedagem7.jpg'),
  },
  {
    id: 23,
    titulo: 'Suíte Vista Mar Ponta Negra - Natal, RN',
    preco: 'R$370/noite',
    localizacao: 'Natal, RN',
    imagem: require('../../../assets/images/hospedagem8.jpg'),
  },
  {
    id: 24,
    titulo: 'Casa de campo - Capitólio, MG',
    preco: 'R$740/noite',
    localizacao: 'Capitólio, MG',
    imagem: require('../../../assets/images/hospedagem9.jpg'),
  },
  {
    id: 25,
    titulo: 'Pousada Sonhos - Paraty, RJ',
    preco: 'R$280/noite (quarto duplo)',
    localizacao: 'Paraty, RJ',
    imagem: require('../../../assets/images/hospedagem10.webp'),
  },
  {
    id: 26,
    titulo: 'Flat Mar & Sol - Porto de Galinhas, PE',
    preco: 'R$390/noite',
    localizacao: 'Porto de Galinhas, PE',
    imagem: require('../../../assets/images/hospedagem11.jpg'),
  },
  {
    id: 27,
    titulo: 'Chalé ecológico - Alto Paraíso de Goiás, GO',
    preco: 'R$550/noite',
    localizacao: 'Alto Paraíso de Goiás, GO',
    imagem: require('../../../assets/images/hospedagem12.jpeg'),
  },
  {
    id: 28,
    titulo: 'Flat Beira-Mar Tropical – João Pessoa, PB',
    preco: 'R$280/noite',
    localizacao: 'João Pessoa, PB',
    imagem: require('../../../assets/images/residencial_praia_norte.jpg'),
  },
  {
    id: 29,
    titulo: 'Suíte Vista Mar – Arraial do Cabo, RJ',
    preco: 'R$450/noite',
    localizacao: 'Arraial do Cabo, RJ',
    imagem: require('../../../assets/images/suite_vista_mar.webp'),
  },
  {
    id: 30,
    titulo: 'Residencial Praia Norte – São Luís, MA',
    preco: 'R$320/noite',
    localizacao: 'São Luís, MA',
    imagem: require('../../../assets/images/flat_beira_mar.jpg'),
  },
];

export default function HospedagensScreen() {
  const router = useRouter();
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itensPorPagina = 6;

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const favoritosSalvos = await AsyncStorage.getItem(`favoritos_hospedagens_${userId}`);
        if (favoritosSalvos) {
          setFavoritos(JSON.parse(favoritosSalvos));
        }
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setCarregando(false);
    }
  };

  const verificarLogin = async (): Promise<boolean> => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (!userToken) {
      setModalLoginVisible(true);
      return false;
    }
    return true;
  };

  const adicionarFavorito = async (id: number) => {
    const isLoggedIn = await verificarLogin();
    if (!isLoggedIn) return;

    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const novosFavoritos = [...favoritos, id];
        setFavoritos(novosFavoritos);
        await AsyncStorage.setItem(`favoritos_hospedagens_${userId}`, JSON.stringify(novosFavoritos));
        Alert.alert('Favoritos', 'Hospedagem adicionada aos favoritos!');
      }
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
    }
  };

  const removerFavorito = async (id: number) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const novosFavoritos = favoritos.filter(favId => favId !== id);
        setFavoritos(novosFavoritos);
        await AsyncStorage.setItem(`favoritos_hospedagens_${userId}`, JSON.stringify(novosFavoritos));
        Alert.alert('Favoritos', 'Hospedagem removida dos favoritos!');
      }
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  const filtrarHospedagens = () => {
    let filtradas = hospedagens;
    if (searchQuery) {
      filtradas = filtradas.filter(hosp =>
        hosp.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hosp.localizacao.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtradas;
  };

  const hospedagensFiltradas = filtrarHospedagens();
  const totalPaginas = Math.ceil(hospedagensFiltradas.length / itensPorPagina);
  const hospedagensPaginadas = hospedagensFiltradas.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const renderHospedagemCard = ({ item }: { item: Hospedagem }) => {
    const isFavorito = favoritos.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/hospedagem/${item.id}`)}
        activeOpacity={0.9}
      >
        <Image source={item.imagem} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <View style={styles.cardText}>
            <Text style={styles.cardPrice}>{item.preco}</Text>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.titulo}
            </Text>
            <View style={styles.locationContainer}>
              <Feather name="map-pin" size={12} color="#999" />
              <Text style={styles.locationText}>{item.localizacao}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.favoriteBtn, isFavorito && styles.favoriteBtnActive]}
            onPress={() => isFavorito ? removerFavorito(item.id) : adicionarFavorito(item.id)}
          >
            <Feather
              name="heart"
              size={20}
              color={isFavorito ? '#FF3B30' : '#000000'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderPagination = () => {
    if (totalPaginas <= 1) return null;
    
    const paginas = [];
    const maxBotoes = 5;
    let inicio = Math.max(1, paginaAtual - Math.floor(maxBotoes / 2));
    let fim = Math.min(totalPaginas, inicio + maxBotoes - 1);

    if (fim - inicio + 1 < maxBotoes) {
      inicio = Math.max(1, fim - maxBotoes + 1);
    }

    for (let i = inicio; i <= fim; i++) {
      paginas.push(i);
    }

    if (inicio > 1) {
      paginas.unshift(1);
      if (inicio > 2) paginas.splice(1, 0, -1);
    }

    if (fim < totalPaginas) {
      if (fim < totalPaginas - 1) paginas.push(-1);
      paginas.push(totalPaginas);
    }

    return (
      <View style={styles.pagination}>
        <TouchableOpacity
          style={[styles.pageButton, paginaAtual === 1 && styles.pageButtonDisabled]}
          onPress={() => setPaginaAtual(paginaAtual - 1)}
          disabled={paginaAtual === 1}
        >
          <Feather name="chevron-left" size={20} color={paginaAtual === 1 ? '#ccc' : '#584128'} />
        </TouchableOpacity>

        {paginas.map((pag, index) => (
          pag === -1 ? (
            <Text key={`dots-${index}`} style={styles.pageDots}>...</Text>
          ) : (
            <TouchableOpacity
              key={pag}
              style={[styles.pageButton, paginaAtual === pag && styles.pageButtonActive]}
              onPress={() => setPaginaAtual(pag)}
            >
              <Text style={[styles.pageText, paginaAtual === pag && styles.pageTextActive]}>
                {pag}
              </Text>
            </TouchableOpacity>
          )
        ))}

        <TouchableOpacity
          style={[styles.pageButton, paginaAtual === totalPaginas && styles.pageButtonDisabled]}
          onPress={() => setPaginaAtual(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
        >
          <Feather name="chevron-right" size={20} color={paginaAtual === totalPaginas ? '#ccc' : '#584128'} />
        </TouchableOpacity>
      </View>
    );
  };

  const ModalLogin = () => (
    <Modal
      visible={modalLoginVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setModalLoginVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setModalLoginVisible(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalIcon}>
            <Feather name="heart" size={40} color="#FF3B30" />
          </View>
          <Text style={styles.modalTitle}>Faça login para favoritar</Text>
          <Text style={styles.modalText}>
            Você precisa estar logado para salvar hospedagens nos favoritos.
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonLogin]}
              onPress={() => {
                setModalLoginVisible(false);
                router.push('/login');
              }}
            >
              <Text style={styles.modalButtonText}>Fazer Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonCancel]}
              onPress={() => setModalLoginVisible(false)}
            >
              <Text style={[styles.modalButtonText, { color: '#666' }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#584128" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Banner Hero */}
      <View style={styles.heroContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#584128" />
        </TouchableOpacity>
        <Image
          source={require('../../../assets/images/imagem-fundo-immersia.png')}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>HOSPEDAGENS</Text>
        </View>
      </View>

      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar hospedagens..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Feather name="x" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Lista de Hospedagens */}
      <FlatList
        data={hospedagensPaginadas}
        renderItem={renderHospedagemCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderPagination()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="search" size={50} color="#ccc" />
            <Text style={styles.emptyText}>Nenhuma hospedagem encontrada</Text>
          </View>
        }
      />

      <ModalLogin />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEAE0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  heroContainer: {
    height: 100,
    position: 'relative',
    
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 0,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop: 45,
    marginBottom:30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#E4D5BE',
    marginHorizontal: 4,
    overflow: 'hidden',
    // Sombra preta na direita e embaixo
    shadowColor: '#000000',
    shadowOffset: { 
      width: 4,  // Sombra para a direita
      height: 2, // Sombra para baixo
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    // Borda no card
    borderWidth: 2,
    borderColor: '#584128',
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
  },
  cardPrice: {
    fontSize: 12,
    color: '#584128',
    fontWeight: '600',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
    lineHeight: 18,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 11,
    color: '#999',
    marginLeft: 4,
  },
  favoriteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E4D5BE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteBtnActive: {
    backgroundColor: '#ffe5e5',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  pageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  pageButtonActive: {
    backgroundColor: '#584128',
  },
  pageButtonDisabled: {
    opacity: 0.5,
  },
  pageText: {
    fontSize: 16,
    color: '#584128',
  },
  pageTextActive: {
    color: '#ffffff',
  },
  pageDots: {
    fontSize: 16,
    color: '#ff0404',
    marginHorizontal: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    width: '100%',
    gap: 10,
  },
  modalButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonLogin: {
    backgroundColor: '#584128',
  },
  modalButtonCancel: {
    backgroundColor: '#f0f0f0',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});