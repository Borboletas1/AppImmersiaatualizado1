import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function CamposDoJordaoScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#6e3821ff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Blog</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Blog Container */}
        <View style={styles.blogContainer}>
          
          {/* Header do Artigo */}
          <View style={styles.articleHeader}>
          </View>

          {/* Artigo */}
          <View style={styles.articleContent}>
            
            {/* Título e Meta */}
            <View style={styles.articleHeaderContent}>
              <Text style={styles.articleTitle}>Os Segredos de Campos do Jordão: A Suíça Brasileira</Text>
              
              <View style={styles.articleMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="location-outline" size={14} color="#7f8c8d" />
                  <Text style={styles.metaText}>Campos do Jordão, SP</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="calendar-outline" size={14} color="#7f8c8d" />
                  <Text style={styles.metaText}>15 Jan, 2024</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={14} color="#7f8c8d" />
                  <Text style={styles.metaText}>8 min de leitura</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="eye-outline" size={14} color="#7f8c8d" />
                  <Text style={styles.metaText}>2.5k visualizações</Text>
                </View>
              </View>
            </View>

            {/* Imagem Destacada */}
            <View style={styles.featuredImageContainer}>
              <Image 
                source={require('../../assets/images/campos_do_jordao.jpeg')}
                style={styles.featuredImage}
                resizeMode="cover"
              />
            </View>

            {/* Conteúdo */}
            <View style={styles.contentSection}>
              <Text style={styles.paragraph}>
                Localizada na Serra da Mantiqueira, a 1.628 metros de altitude, Campos do Jordão é conhecida como a "Suíça Brasileira" não apenas pelo clima europeu, mas pelos segredos que esconde entre suas montanhas e construções charmosas. Neste guia completo, revelamos os tesouros escondidos dessa joia paulista.
              </Text>
            </View>

            {/* Seção 1 */}
            <View style={styles.contentSection}>
              <Text style={styles.sectionTitle}>🌲 A Natureza que Poucos Conhecem</Text>
              <Text style={styles.paragraph}>
                Além do famoso Parque Estadual de Campos do Jordão, existem trilhas secretas que levam a mirantes deslumbrantes. A <Text style={styles.boldText}>Trilha da Pedra do Baú</Text>, por exemplo, oferece uma vista panorâmica que poucos turistas têm a oportunidade de presenciar.
              </Text>
              
              <View style={styles.highlightBox}>
                <Text style={styles.highlightTitle}>💡 Dica do Local</Text>
                <Text style={styles.highlightText}>
                  Visite o Parque Amantikir para conhecer jardins temáticos inspirados em diversos países - um verdadeiro passeio pelo mundo em meio à natureza brasileira.
                </Text>
              </View>
            </View>

            {/* Seção 2 */}
            <View style={styles.contentSection}>
              <Text style={styles.sectionTitle}>🍷 A Gastronomia Além do Fondue</Text>
              <Text style={styles.paragraph}>
                Enquanto o fondue é a atração principal, os restaurantes familiares escondem segredos culinários. Experimente o <Text style={styles.boldText}>truto fresco dos riachos locais</Text> no restaurante Dona Chica ou os doces artesanais da Família Capuani, que mantém receitas tradicionais há gerações.
              </Text>
            </View>

            {/* Galeria de Imagens */}
            <View style={styles.imageGallery}>
              <Image 
                source={require('../../assets/images/arquitetura.webp')}
                style={styles.galleryImage}
                resizeMode="cover"
              />
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }}
                style={styles.galleryImage}
                resizeMode="cover"
              />
              <Image 
                source={require('../../assets/images/gastronomia.webp')}
                style={styles.galleryImage}
                resizeMode="cover"
              />
            </View>

            {/* Seção 3 */}
            <View style={styles.contentSection}>
              <Text style={styles.sectionTitle}>🏨 Hospedagem com História</Text>
              <Text style={styles.paragraph}>
                Fuja das redes de hotéis e descubra as pousadas charmosas que contam a história da cidade. A <Text style={styles.boldText}>Pousada Vila Inglesa</Text>, construída em 1938, mantém a arquitetura original e oferece experiências únicas como tardes de chá britânico.
              </Text>
            </View>

            {/* Dicas */}
            <View style={styles.tipsList}>
              <Text style={styles.tipsTitle}>🌟 Segredos que Todo Visitante Deveria Saber</Text>
              <View style={styles.tipItem}>
                <Text style={styles.tipText}>✓ Visite durante a baixa temporada (março a junho) para evitar multidões</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipText}>✓ Alugue uma bicicleta para explorar as ruas menos movimentadas</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipText}>✓ Experimente o chocolate quente da Chocolate Caseiro da Serra</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipText}>✓ Acorde cedo para ver o nascer do sol no Morro do Elefante</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipText}>✓ Converse com os moradores locais - eles têm as melhores histórias</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipText}>✓ Visite as feiras de artesanato nas manhãs de domingo</Text>
              </View>
            </View>

            {/* Seção 4 */}
            <View style={styles.contentSection}>
              <Text style={styles.sectionTitle}>🎭 Cultura e Eventos Exclusivos</Text>
              <Text style={styles.paragraph}>
                Além do famoso Festival de Inverno, Campos do Jordão oferece eventos íntimos durante todo o ano. O <Text style={styles.boldText}>Festival de Jardins</Text> no Parque Amantikir e as <Text style={styles.boldText}>Noites de Seresta</Text> nas pousadas são experiências autênticas que poucos descobrem.
              </Text>
            </View>

            {/* Seção 5 */}
            <View style={styles.contentSection}>
              <Text style={styles.sectionTitle}>🚗 Como Chegar e Se Locomover</Text>
              <Text style={styles.paragraph}>
                O acesso pela <Text style={styles.boldText}>Rodovia Floriano Rodrigues Pinheiro</Text> é cênico, mas exige cuidado. Dentro da cidade, a dica é: <Text style={styles.boldText}>caminhe</Text>! O centro é compacto e cada esquina reserva uma nova descoberta.
              </Text>
            </View>

            {/* Autor */}
            <View style={styles.authorBio}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' }}
                style={styles.authorAvatar}
              />
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>Carlos Silva</Text>
                <Text style={styles.authorDescription}>
                  Guia de turismo especializado em destinos brasileiros há 15 anos. Já visitou Campos do Jordão mais de 50 vezes e continua descobrindo novos segredos a cada visita.
                </Text>
              </View>
            </View>

            {/* Navegação */}
            <View style={styles.navigationButtons}>
              <TouchableOpacity style={styles.btnSecondary} onPress={() => router.push('/blog')}>
                <Ionicons name="arrow-back" size={16} color="#fff" />
                <Text style={styles.btnText}>Voltar para o Blog</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.btnPrimary} onPress={() => router.push('/blog/buzios')}>
                <Text style={styles.btnText}>Próximo Artigo: Praias de Búzios</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e0d3',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  
  // Header
 // No header View
header: {
  flexDirection: 'row',
  alignItems: 'center',  // ✅ Centraliza verticalmente
  justifyContent: 'center', // ✅ Centraliza horizontalmente todo o conteúdo
  paddingHorizontal: 50,
  paddingTop: 15,
  paddingBottom: 15,
  backgroundColor: '#ffffff',
  borderBottomWidth: 1,
  borderBottomColor: '#e0e0e0',
  position: 'relative', // Para posicionar os botões
  height: 70, // Altura fixa para garantir centralização
},

// Botão voltar posicionado na esquerda
backButton: {
  padding: 8,
  position: 'absolute',
  left: 20,
  top: 25,
  transform: [{ translateY: -12 }], // Centraliza verticalmente
},

// Título centralizado
headerTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#6e3821ff',
  textAlign: 'center',
},

// Espaço vazio na direita (para balancear)
headerRight: {
  width: 40,
  position: 'absolute',
  right: 20,
  top: '50%',
  transform: [{ translateY: -12 }], // Centraliza verticalmente
},
  
  // Blog Container
  blogContainer: {
    maxWidth: 1200,
    padding: 20,
  },
  
  // Article Header
  articleHeader: {
    textAlign: 'center',
    marginBottom: 0,
    paddingTop: 0,
  },
  blogTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6e3821ff',
    marginBottom: 10,
    textAlign: 'center',
  },
  blogSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
  // Article Content
  articleContent: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  
  // Article Title and Meta
  articleHeaderContent: {
    marginBottom: 20,
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6e3821ff',
    marginBottom: 15,
    textAlign: 'center',
    lineHeight: 32,
  },
  articleMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  
  // Featured Image
  featuredImageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 25,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  
  // Content Sections
  contentSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(82, 41, 24)',
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#6e3821ff',
    paddingLeft: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6e3821ff',
    marginBottom: 15,
    textAlign: 'justify',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#6e3821ff',
  },
  
  // Highlight Box
  highlightBox: {
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 4,
    borderLeftColor: '#6e3821ff',
    padding: 20,
    marginVertical: 15,
    borderRadius: 8,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6e3821ff',
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6e3821ff',
  },
  
  // Image Gallery
  imageGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 15,
  },
  galleryImage: {
    width: '31%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  
  // Tips List
  tipsList: {
    backgroundColor: '#e8f4f8',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6e3821ff',
    marginBottom: 15,
  },
  tipItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#b8d4e0',
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  
  // Author Bio
  authorBio: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    marginTop: 30,
  },
  authorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6e3821ff',
    marginBottom: 4,
  },
  authorDescription: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 18,
  },
  
  // Navigation Buttons
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 10,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: '#6e3821ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#95a5a6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13,
  },
});