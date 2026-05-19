import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  Share,
  Platform,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Dados dos cupons
const initialCupons = [
  {
    id: '1',
    code: 'IMMERSIAN10',
    discount: '10%',
    description: 'Desconto de 10% em qualquer pacote',
    validUntil: '31/12/2024',
    category: 'Pacotes',
    minPurchase: 'R$ 500',
    used: false,
  },
  {
    id: '2',
    code: 'HOTEL20',
    discount: 'R$ 80',
    description: 'R$ 80 de desconto em hospedagens',
    validUntil: '30/11/2024',
    category: 'Hospedagens',
    minPurchase: 'R$ 300',
    used: false,
  },
  {
    id: '3',
    code: 'EXPERIENCE15',
    discount: '15%',
    description: '15% off em experiências',
    validUntil: '15/12/2024',
    category: 'Experiências',
    minPurchase: 'R$ 200',
    used: false,
  },
  {
    id: '4',
    code: 'MILES300',
    discount: '300',
    description: '300 milhas extras por viagem',
    validUntil: '20/12/2024',
    category: 'Milhas',
    minPurchase: 'R$ 1000',
    used: false,
  },
  {
    id: '5',
    code: 'BEMVINDO5',
    discount: '5%',
    description: '5% de desconto na primeira compra',
    validUntil: '31/01/2025',
    category: 'Primeira Compra',
    minPurchase: 'R$ 100',
    used: false,
  },
  {
    id: '6',
    code: 'VERAO2024',
    discount: 'R$ 100',
    description: 'R$ 100 de desconto em pacotes de verão',
    validUntil: '15/02/2025',
    category: 'Verão',
    minPurchase: 'R$ 800',
    used: false,
  },
  {
    id: '7',
    code: 'GRUPO20',
    discount: '20%',
    description: '20% off para grupos acima de 4 pessoas',
    validUntil: '30/12/2024',
    category: 'Grupos',
    minPurchase: 'R$ 1500',
    used: false,
  },
  {
    id: '8',
    code: 'LASTMINUTE',
    discount: 'R$ 50',
    description: 'R$ 50 de desconto em reservas de última hora',
    validUntil: '25/12/2024',
    category: 'Última Hora',
    minPurchase: 'R$ 400',
    used: false,
  },
];

// Categorias para filtro
const categories = ['Todos', 'Pacotes', 'Hospedagens', 'Experiências', 'Milhas', 'Verão', 'Grupos'];

export default function CuponsScreen() {
  const router = useRouter();
  const [cupons, setCupons] = useState(initialCupons);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchText, setSearchText] = useState('');

  // Filtrar cupons
  const filteredCupons = cupons.filter(cupom => {
    const matchCategory = selectedCategory === 'Todos' || cupom.category === selectedCategory;
    const matchSearch = cupom.code.toLowerCase().includes(searchText.toLowerCase()) ||
                        cupom.description.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Copiar código do cupom
  const copyCode = async (code, discount) => {
    try {
      await Share.share({
        message: ` Cupom ${code}\n Desconto: ${discount}\n Aproveite no Immersian!`,
        title: 'Cupom Immersian',
      });
      Alert.alert('Sucesso!', 'Cupom compartilhado! Use no momento da compra.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar o cupom');
    }
  };

  // Usar cupom
  const useCupom = (id) => {
    setCupons(cupons.map(cupom => 
      cupom.id === id ? { ...cupom, used: true } : cupom
    ));
    Alert.alert('Cupom resgatado!', 'Aplique o código na hora do pagamento.');
  };

  // Contar cupons disponíveis
  const availableCount = cupons.filter(c => !c.used).length;

  // HEADER FIXO
  const HeaderFixo = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#584128" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Cupons</Text>
      <View style={styles.headerRight} />
    </View>
  );

  // SUBTITLE (parte que rola)
  const Subtitle = () => (
    <View style={styles.subtitleContainer}>
      <Text style={styles.headerSubtitle}>
        {availableCount} {availableCount === 1 ? 'cupom disponível' : 'cupons disponíveis'}
      </Text>
    </View>
  );

  // Barra de busca
  const SearchBar = () => (
    <View style={styles.searchContainer}>
      <Ionicons name="search-outline" size={20} color="#C5A87B" />
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar cupom..."
        placeholderTextColor="#C5A87B"
        value={searchText}
        onChangeText={setSearchText}
      />
      {searchText !== '' && (
        <TouchableOpacity onPress={() => setSearchText('')}>
          <Ionicons name="close-circle" size={20} color="#999" />
        </TouchableOpacity>
      )}
    </View>
  );

  // Categorias
  const CategoriesList = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.categoryButton,
            selectedCategory === cat && styles.categoryButtonActive,
          ]}
          onPress={() => setSelectedCategory(cat)}
        >
          <Text style={[
            styles.categoryText,
            selectedCategory === cat && styles.categoryTextActive,
          ]}>
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderItem = ({ item }) => (
    <View style={[styles.cupomCard, item.used && styles.cupomCardUsed]}>
      <View style={styles.cupomLeft}>
        <View style={styles.cupomIcon}>
          <Text style={styles.cupomIconText}>🎫</Text>
        </View>
      </View>
      
      <View style={styles.cupomCenter}>
        <Text style={styles.cupomDiscount}>{item.discount} OFF</Text>
        <Text style={styles.cupomDescription}>{item.description}</Text>
        <View style={styles.cupomDetails}>
          <Text style={styles.cupomDetail}> {item.category}</Text>
          <Text style={styles.cupomDetail}> Mínimo: {item.minPurchase}</Text>
          <Text style={styles.cupomDetail}> Válido até: {item.validUntil}</Text>
        </View>
      </View>
      
      <View style={styles.cupomRight}>
        <TouchableOpacity
          style={[styles.codeButton, item.used && styles.codeButtonUsed]}
          onPress={() => copyCode(item.code, item.discount)}
          disabled={item.used}
        >
          <Text style={styles.codeText}>{item.code}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.useButton, item.used && styles.useButtonUsed]}
          onPress={() => !item.used && useCupom(item.id)}
          disabled={item.used}
        >
          <Text style={styles.useButtonText}>
            {item.used ? '✅ Usado' : ' Resgatar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="pricetag-outline" size={80} color="#C5A87B" />
      <Text style={styles.emptyTitle}>Nenhum cupom encontrado</Text>
      <Text style={styles.emptyText}>
        Tente outra busca ou categoria
      </Text>
    </View>
  );

  const ListHeader = () => (
    <>
      <Subtitle />
      <SearchBar />
      <CategoriesList />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header fixo fora da FlatList */}
      <HeaderFixo />
      
      {/* FlatList com o resto do conteúdo */}
      <FlatList
        data={filteredCupons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={renderEmpty}
      />

      {/* Dicas */}
      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}> Como usar:</Text>
        <Text style={styles.tipsText}>
          1. Toque no código do cupom para compartilhar{'\n'}
          2. Clique em "Resgatar" para ativar o cupom{'\n'}
          3. Use o código no momento da sua compra{'\n'}
          4. Cada cupom pode ser usado apenas uma vez
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEAE0",
  },
  
  // HEADER FIXO - Fora da FlatList
  headerContainer: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    zIndex: 1,
  },
  
  backButton: {
    padding: 8,
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#584128',
  },
  
  headerRight: {
    width: 40,
  },
  
  // SUBTITLE (rolável)
  subtitleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#EDEAE0',
    marginBottom: 5,
  },
  
  headerSubtitle: {
    fontSize: 14,
    color: '#C5A87B',
    textAlign: 'center',
  },
  
  // Barra de busca
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: "#584128",
  },
  
  // Categorias
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFF",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#C5A87B",
  },
  categoryButtonActive: {
    backgroundColor: "#584128",
    borderColor: "#584128",
  },
  categoryText: {
    fontSize: 14,
    color: "#584128",
  },
  categoryTextActive: {
    color: "#FFF",
    fontWeight: "bold",
  },
  
  // LISTA
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 16,
  },
  
  cupomCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cupomCardUsed: {
    opacity: 0.6,
    backgroundColor: "#F5F5F5",
  },
  cupomLeft: {
    marginRight: 12,
  },
  cupomIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#584128",
    justifyContent: "center",
    alignItems: "center",
  },
  cupomIconText: {
    fontSize: 24,
  },
  cupomCenter: {
    flex: 1,
  },
  cupomDiscount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#584128",
  },
  cupomDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  cupomDetails: {
    marginTop: 8,
  },
  cupomDetail: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  cupomRight: {
    alignItems: "flex-end",
  },
  codeButton: {
    backgroundColor: "#584128",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8,
  },
  codeButtonUsed: {
    backgroundColor: "#CCC",
  },
  codeText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  useButton: {
    backgroundColor: "#C5A87B",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  useButtonUsed: {
    backgroundColor: "#27AE60",
  },
  useButtonText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  
  // Empty state
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
    color: '#C5A87B',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  
  // Dicas
  tipsCard: {
    margin: 16,
    marginTop: 5,
    marginBottom: 30,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#584128",
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#584128",
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 22,
  },
});