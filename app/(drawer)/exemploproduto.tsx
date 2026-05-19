import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PasseioBalaoScreen() {
  const router = useRouter();
  
  // Estados
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [hospedes, setHospedes] = useState(1);
  const [modalHospedesVisible, setModalHospedesVisible] = useState(false);
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [galeriaModalVisible, setGaleriaModalVisible] = useState(false);
  const [fotoAtual, setFotoAtual] = useState(0);

  // Todas as fotos da experiência
  const todasFotos = [
    require('../../assets/images/exp6.png'),
    require('../../assets/images/exp1.jpg'),
    require('../../assets/images/exp3.jpg'),
    require('../../assets/images/exp9.jpg'),
    require('../../assets/images/exp5.webp'),
  ];

  // Verificar login ao carregar
  useEffect(() => {
    verificarUsuario();
    carregarFavoritos();
  }, []);

  const verificarUsuario = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setIsLoggedIn(!!userToken);
  };

  const carregarFavoritos = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const favoritosSalvos = await AsyncStorage.getItem(`favoritos_experiencias_${userId}`);
        if (favoritosSalvos) {
          setFavoritos(JSON.parse(favoritosSalvos));
        }
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
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
        await AsyncStorage.setItem(
          `favoritos_experiencias_${userId}`,
          JSON.stringify(novosFavoritos)
        );
        Alert.alert('Favoritos', 'Experiência adicionada aos favoritos!');
      }
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
    }
  };

  const removerFavorito = async (id: number) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const novosFavoritos = favoritos.filter((favId) => favId !== id);
        setFavoritos(novosFavoritos);
        await AsyncStorage.setItem(
          `favoritos_experiencias_${userId}`,
          JSON.stringify(novosFavoritos)
        );
        Alert.alert('Favoritos', 'Experiência removida dos favoritos!');
      }
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  const isFavorito = favoritos.includes(1);

  const handleReservar = () => {
    if (!checkin || !checkout) {
      Alert.alert('Atenção', 'Por favor, selecione as datas de check-in e check-out.');
      return;
    }
    Alert.alert(
      'Reserva Confirmada!',
      `Sua reserva para ${hospedes} cliente(s) foi realizada com sucesso!`,
      [{ text: 'OK', onPress: () => router.push('/') }]
    );
  };

  const abrirGaleria = (index: number) => {
    setFotoAtual(index);
    setGaleriaModalVisible(true);
  };

  const proximaFoto = () => {
    setFotoAtual((prev) => (prev + 1) % todasFotos.length);
  };

  const fotoAnterior = () => {
    setFotoAtual((prev) => (prev - 1 + todasFotos.length) % todasFotos.length);
  };

  const ModalLogin = () => (
    <Modal
      visible={modalLoginVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setModalLoginVisible(false)}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalLoginVisible(false)}>
        <View style={styles.modalContent}>
          <View style={styles.modalIcon}>
            <Feather name="heart" size={40} color="#FF3B30" />
          </View>
          <Text style={styles.modalTitle}>Faça login para favoritar</Text>
          <Text style={styles.modalText}>Você precisa estar logado para salvar experiências nos favoritos.</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Banner Hero */}
        <View style={styles.heroContainer}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#584128" />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/imagem-fundo-immersia.png')}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>EXPERIÊNCIAS</Text>
          </View>
        </View>

        {/* Título */}
        <View style={styles.titleContainer}>
          <Text style={styles.packageTitle}>
            Experiência <Text style={styles.highlight}>"Voo de Balão em Campos do Jordão"</Text> – São Paulo
          </Text>
        </View>

        {/* Galeria - 4 fotos */}
        <View style={styles.galleryContainer}>
          <View style={styles.galleryGrid}>
            {/* Foto 1 - Principal */}
            <View style={[styles.galleryItem, styles.mainImage]}>
              <Image source={todasFotos[0]} style={styles.galleryImage} resizeMode="cover" />
            </View>
            
            {/* Foto 2 */}
            <View style={styles.galleryItem}>
              <Image source={todasFotos[1]} style={styles.galleryImage} resizeMode="cover" />
            </View>
            
            {/* Foto 3 */}
            <View style={styles.galleryItem}>
              <Image source={todasFotos[2]} style={styles.galleryImage} resizeMode="cover" />
            </View>
            
            {/* Foto 4 - Com botão "Mais fotos" */}
            <View style={[styles.galleryItem, styles.lastImage]}>
              <Image source={todasFotos[3]} style={styles.galleryImage} resizeMode="cover" />
              <TouchableOpacity style={styles.showAllPhotosBtn} onPress={() => abrirGaleria(0)}>
                <Text style={styles.showAllPhotosText}>+{todasFotos.length - 4} fotos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Localização */}
        <View style={styles.locationContainer}>
          <Feather name="map-pin" size={16} color="#584128" />
          <Text style={styles.locationText}>Localização: Campos do Jordão – SP (Serra da Mantiqueira)</Text>
        </View>

        {/* Detalhes */}
        <View style={styles.detailsContainer}>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Sobre a Experiência</Text>
            <Text style={styles.description}>
              Viva uma experiência inesquecível sobrevoando as montanhas da Serra da Mantiqueira em um voo de balão cheio de emoção, tranquilidade e vistas panorâmicas de tirar o fôlego. A atividade acontece durante o nascer do sol, proporcionando um espetáculo único com o céu colorido e a neblina típica da região. A equipe oferece instruções completas, garantindo total segurança e conforto durante todo o passeio.
            </Text>

            <Text style={styles.sectionTitle}>O Que Está Incluso</Text>
            <View style={styles.inclusoList}>
              <Text style={styles.inclusoItem}>• Voo de balão com duração entre <Text style={styles.bold}>1h e 1h30</Text>.</Text>
              <Text style={styles.inclusoItem}>• Café da manhã especial pós-pouso.</Text>
              <Text style={styles.inclusoItem}>• Brinde com espumante para celebrar o voo.</Text>
              <Text style={styles.inclusoItem}>• Transporte da área de pouso até o ponto de encontro.</Text>
              <Text style={styles.inclusoItem}>• Equipe especializada e acompanhamento completo.</Text>
              <Text style={styles.inclusoItem}>• Certificado de voo personalizado.</Text>
            </View>

            <Text style={styles.sectionTitle}>Investimento</Text>
            <View style={styles.inclusoList}>
              <Text style={styles.inclusoItem}><Text style={styles.bold}>Valor por pessoa: R$ 900,00</Text></Text>
              <Text style={styles.inclusoItem}>Incluso: voo, café da manhã, brinde, equipe técnica, seguro e traslado após o pouso.</Text>
            </View>
          </View>

          {/* Widget de Reserva */}
          <View style={styles.bookingWidget}>
            <View style={styles.priceBox}>
              <Text style={styles.price}>R$900</Text>
              <View style={styles.priceDetails}>
                <Text style={styles.duration}>1h - 1h30 de duração</Text>
                <Text style={styles.type}>(por pessoa)</Text>
              </View>
            </View>

            <View style={styles.datePicker}>
              <View style={styles.dateField}>
                <Text style={styles.dateLabel}>CHECK-IN:</Text>
                <TextInput style={styles.dateInput} placeholder="Selecionar data" value={checkin} onChangeText={setCheckin} />
              </View>
              <View style={styles.dateField}>
                <Text style={styles.dateLabel}>CHECK-OUT:</Text>
                <TextInput style={styles.dateInput} placeholder="Selecionar data" value={checkout} onChangeText={setCheckout} />
              </View>
            </View>

            <View style={styles.guestPicker}>
              <Text style={styles.guestLabel}>HÓSPEDES:</Text>
              <TouchableOpacity style={styles.guestSelect} onPress={() => setModalHospedesVisible(true)}>
                <Text style={styles.guestText}>{hospedes} cliente{hospedes > 1 ? 's' : ''}</Text>
                <Feather name="chevron-down" size={16} color="#584128" />
              </TouchableOpacity>
            </View>

            <View style={styles.ratingBox}>
              <View style={styles.ratingScore}>
                <Text style={styles.ratingText}>5,0</Text>
                <View style={styles.stars}>
                  <Text style={styles.starFilled}>★</Text>
                  <Text style={styles.starFilled}>★</Text>
                  <Text style={styles.starFilled}>★</Text>
                  <Text style={styles.starFilled}>★</Text>
                  <Text style={styles.starFilled}>★</Text>
                </View>
              </View>
              <TouchableOpacity><Text style={styles.reviewsLink}>25 avaliações</Text></TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.reserveButton} onPress={handleReservar}>
              <Text style={styles.reserveButtonText}>RESERVAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.favoriteContainer} onPress={() => isFavorito ? removerFavorito(1) : adicionarFavorito(1)}>
              <Feather name="heart" size={20} color={isFavorito ? '#FF3B30' : '#584128'} />
              <Text style={styles.favoriteText}>{isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerSpacer} />
      </ScrollView>

      {/* Modal Galeria de Fotos */}
      <Modal
        visible={galeriaModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setGaleriaModalVisible(false)}
      >
        <View style={styles.galeriaModalOverlay}>
          <TouchableOpacity style={styles.galeriaCloseButton} onPress={() => setGaleriaModalVisible(false)}>
            <Feather name="x" size={30} color="#ffffff" />
          </TouchableOpacity>
          
          <View style={styles.galeriaContent}>
            <TouchableOpacity style={styles.galeriaNavButton} onPress={fotoAnterior}>
              <Feather name="chevron-left" size={40} color="#ffffff" />
            </TouchableOpacity>
            
            <Image source={todasFotos[fotoAtual]} style={styles.galeriaImage} resizeMode="contain" />
            
            <TouchableOpacity style={styles.galeriaNavButton} onPress={proximaFoto}>
              <Feather name="chevron-right" size={40} color="#ffffff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.galeriaCounter}>
            {fotoAtual + 1} / {todasFotos.length}
          </Text>
        </View>
      </Modal>

      {/* Modal Hóspedes */}
      <Modal
        visible={modalHospedesVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalHospedesVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalHospedesVisible(false)}>
          <View style={styles.modalContentHospedes}>
            <Text style={styles.modalTitleHospedes}>Selecionar hóspedes</Text>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity
                key={num}
                style={[styles.hospedeOption, hospedes === num && styles.hospedeOptionSelected]}
                onPress={() => {
                  setHospedes(num);
                  setModalHospedesVisible(false);
                }}
              >
                <Text style={styles.hospedeOptionText}>{num} cliente{num > 1 ? 's' : ''}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <ModalLogin />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEAE0',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#584128",
  },
  heroContainer: {
    height: 100,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 0,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  packageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#584128',
    textAlign: 'center',
    lineHeight: 30,
    marginTop: 80,
    marginBottom: 30,
  },
  highlight: {
    color: '#C5A87B',
  },
  
  // Galeria
  galleryContainer: {
    paddingHorizontal: 16,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  galleryItem: {
    width: '31%',
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  mainImage: {
    width: '100%',
    height: 250,
    marginBottom: 8,
  },
  lastImage: {
    position: 'relative',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  showAllPhotosBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  showAllPhotosText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  
  // Localização
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  locationText: {
    fontSize: 14,
    color: '#584128',
    marginLeft: 8,
    fontWeight: '500',
  },
  
  // Detalhes
  detailsContainer: {
    paddingHorizontal: 20,
  },
  infoSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#584128',
    marginTop: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  inclusoList: {
    marginTop: 8,
  },
  inclusoItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    lineHeight: 18,
  },
  bold: {
    fontWeight: 'bold',
    color: '#584128',
  },
  
  // Widget de Reserva
  bookingWidget: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#584128',
  },
  priceDetails: {
    marginLeft: 10,
  },
  duration: {
    fontSize: 12,
    color: '#666',
  },
  type: {
    fontSize: 10,
    color: '#999',
  },
  
  // Datas
  datePicker: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  dateField: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#584128',
    marginBottom: 4,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f8f9fa',
  },
  
  // Hóspedes
  guestPicker: {
    marginBottom: 16,
  },
  guestLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#584128',
    marginBottom: 4,
  },
  guestSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  guestText: {
    fontSize: 14,
    color: '#333',
  },
  
  // Avaliação
  ratingBox: {
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#584128',
  },
  stars: {
    flexDirection: 'row',
  },
  starFilled: {
    fontSize: 16,
    color: '#FFD700',
  },
  reviewsLink: {
    fontSize: 12,
    color: '#C5A87B',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  
  // Botão Reservar
  reserveButton: {
    backgroundColor: '#584128',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  reserveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Favoritar
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  favoriteText: {
    fontSize: 14,
    color: '#584128',
  },
  
  // Modal Galeria
  galeriaModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galeriaCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  galeriaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '70%',
  },
  galeriaNavButton: {
    padding: 20,
  },
  galeriaImage: {
    width: '80%',
    height: '100%',
    borderRadius: 10,
  },
  galeriaCounter: {
    position: 'absolute',
    bottom: 50,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Modais
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
  modalContentHospedes: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
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
  modalTitleHospedes: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#584128',
    marginBottom: 16,
    textAlign: 'center',
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
  hospedeOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  hospedeOptionSelected: {
    backgroundColor: '#f5f0eb',
  },
  hospedeOptionText: {
    fontSize: 16,
    color: '#584128',
    textAlign: 'center',
  },
  
  // Footer
  footerSpacer: {
    height: 40,
  },
});