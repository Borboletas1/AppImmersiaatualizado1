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

interface Pacote {
  id: number;
  titulo: string;
  preco: string;
  duracao: string;
  localizacao: string;
  imagem: any;
  descricao?: string;
}

const pacotes: Pacote[] = [
  {
    id: 31,
    titulo: 'Pacote "Cultura e Tradição no Sertão" – Pernambuco',
    preco: 'R$ 3.200',
    duracao: '5 dias',
    localizacao: 'Pernambuco',
    imagem: require('../../../assets/images/8665699427_16c427ccd5_z.jpg'),
  },
  {
    id: 32,
    titulo: 'Pacote "Amazon Experience" – Amazonas',
    preco: 'R$ 4.800',
    duracao: '6 dias',
    localizacao: 'Amazonas',
    imagem: require('../../../assets/images/28-08_manaus_SITE.webp'),
  },
  {
    id: 33,
    titulo: 'Pacote "Encantos do Litoral Sul" – Santa Catarina',
    preco: 'R$ 3.700',
    duracao: '5 dias',
    localizacao: 'Santa Catarina',
    imagem: require('../../../assets/images/_image.webp'),
  },
  {
    id: 34,
    titulo: 'Pacote "Raízes Gaúchas" – Rio Grande do Sul',
    preco: 'R$ 3.900',
    duracao: '4 dias',
    localizacao: 'Rio Grande do Sul',
    imagem: require('../../../assets/images/Gramado-RS.webp'),
  },
  {
    id: 35,
    titulo: 'Pacote "Caminho do Ouro e Cultura Colonial" – Minas Gerais',
    preco: 'R$ 3.400',
    duracao: '4 dias',
    localizacao: 'Minas Gerais',
    imagem: require('../../../assets/images/praca-tiradentes-in-the.jpg'),
  },
  {
    id: 36,
    titulo: 'Pacote "Maré Mansa" – Delta do Parnaíba, Piauí',
    preco: 'R$ 3.600',
    duracao: '5 dias',
    localizacao: 'Delta do Parnaíba, Piauí',
    imagem: require('../../../assets/images/9075514415_5a4c406ee0_o_952x476.jpg'),
  },
  {
    id: 37,
    titulo: 'Pacote "Chapada dos Encantos" – Chapada Diamantina, Bahia',
    preco: 'R$ 4.200',
    duracao: '3 dias',
    localizacao: 'Chapada Diamantina, Bahia',
    imagem: require('../../../assets/images/9.jpeg'),
  },
  {
    id: 38,
    titulo: 'Pacote "Ilha dos Sabores" – Ilha do Marajó, Pará',
    preco: 'R$ 3.800',
    duracao: '4 dias',
    localizacao: 'Ilha do Marajó, Pará',
    imagem: require('../../../assets/images/Belem-Ilha-de-Marajo-15.jpg'),
  },
  {
    id: 39,
    titulo: 'Pacote "Pantanal Selvagem" – Mato Grosso do Sul',
    preco: 'R$ 4.600',
    duracao: '5 dias',
    localizacao: 'Mato Grosso do Sul',
    imagem: require('../../../assets/images/Vista-aerea-de-Pantanal.-Photo-by-Shutterstock-Lucas-Leuzinger.jpg'),
  },
  {
    id: 40,
    titulo: 'Pacote "Coração do Cerrado" – Jalapão, Tocantins',
    preco: 'R$ 4.500',
    duracao: '5 dias',
    localizacao: 'Jalapão, Tocantins',
    imagem: require('../../../assets/images/jalapao_tocantins.jpg'),
  },
  {
    id: 41,
    titulo: 'Pacote "Praias Secretas do Espírito Santo" – Regência e região',
    preco: 'R$ 3.800',
    duracao: '6 dias',
    localizacao: 'Espírito Santo',
    imagem: require('../../../assets/images/e4dd4d_93cbe6903a4143cdaf90930f64d736ee~mv2.avif'),
  },
  {
    id: 42,
    titulo: 'Pacote "Rios e Sabores do Xingu" – Pará/Mato Grosso',
    preco: 'R$ 4.800',
    duracao: '5 dias',
    localizacao: 'Pará/Mato Grosso',
    imagem: require('../../../assets/images/images (2).jpg'),
  },
  {
    id: 43,
    titulo: 'Pacote "Belezas do Jalapão" – Tocantins',
    preco: 'R$ 3.900',
    duracao: '4 dias',
    localizacao: 'Tocantins',
    imagem: require('../../../assets/images/jalapao_tocantins.jpg'),
  },
  {
    id: 44,
    titulo: 'Pacote "Rota das Emoções" – Ceará, Piauí e Maranhão',
    preco: 'R$ 4.100',
    duracao: '5 dias',
    localizacao: 'Ceará, Piauí e Maranhão',
    imagem: require('../../../assets/images/rota_das_emoções.jpg'),
  },
  {
    id: 45,
    titulo: 'Pacote "História e Sabor no Recôncavo" – Bahia',
    preco: 'R$ 3.600',
    duracao: '4 dias',
    localizacao: 'Bahia',
    imagem: require('../../../assets/images/cachoeira_bahia.webp'),
  },
];

export default function PacotesScreen() {
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
        const favoritosSalvos = await AsyncStorage.getItem(`favoritos_pacotes_${userId}`);
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
        await AsyncStorage.setItem(`favoritos_pacotes_${userId}`, JSON.stringify(novosFavoritos));
        Alert.alert('Favoritos', 'Pacote adicionado aos favoritos!');
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
        await AsyncStorage.setItem(`favoritos_pacotes_${userId}`, JSON.stringify(novosFavoritos));
        Alert.alert('Favoritos', 'Pacote removido dos favoritos!');
      }
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  const filtrarPacotes = () => {
    let filtrados = pacotes;
    if (searchQuery) {
      filtrados = filtrados.filter(pac =>
        pac.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pac.localizacao.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtrados;
  };

  const pacotesFiltrados = filtrarPacotes();
  const totalPaginas = Math.ceil(pacotesFiltrados.length / itensPorPagina);
  const pacotesPaginados = pacotesFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const renderPacoteCard = ({ item }: { item: Pacote }) => {
    const isFavorito = favoritos.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/pacote/${item.id}`)}
        activeOpacity={0.9}
      >
        <Image source={item.imagem} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <View style={styles.cardText}>
            <Text style={styles.cardPrice}>{item.preco} ({item.duracao})</Text>
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
            Você precisa estar logado para salvar pacotes nos favoritos.
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
          <Text style={styles.heroTitle}>PACOTES</Text>
        </View>
      </View>

      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pacotes..."
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

      {/* Lista de Pacotes */}
      <FlatList
        data={pacotesPaginados}
        renderItem={renderPacoteCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderPagination()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="search" size={50} color="#ccc" />
            <Text style={styles.emptyText}>Nenhum pacote encontrado</Text>
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