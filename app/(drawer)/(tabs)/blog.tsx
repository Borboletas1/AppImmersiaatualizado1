import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BlogScreen() {
  const router = useRouter();
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [artigosFiltrados, setArtigosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Controle de modais
  const [modalEstadosVisible, setModalEstadosVisible] = useState(false);
  const [modalCidadesVisible, setModalCidadesVisible] = useState(false);

  // Dados dos artigos do blog - com links absolutos para fora das tabs
  const artigosBlog = [
    {
      id: 1,
      titulo: "Os Segredos de Campos do Jordão",
      estado: "SP",
      cidade: "Campos do Jordão", 
      imagem: require('../../../assets/images/campos_do_jordao.jpeg'),
      resumo: "Descubra as belezas escondidas da Suíça Brasileira...",
      data: "2024-01-15",
      destaque: true,
      link: "../../exemploblog"  // ✅ Caminho absoluto para fora das tabs
    },
    {
      id: 2,
      titulo: "Praias Paradisíacas de Búzios",
      estado: "RJ", 
      cidade: "Búzios",
      imagem: require('../../../assets/images/buzios.webp'),
      resumo: "Conheça as 23 praias que fazem de Búzios um destino único...",
      data: "2024-01-10",
      destaque: false,
      link: "/blog/buzios"  // ✅ Caminho absoluto
    },
    {
      id: 3,
      titulo: "As Dunas de Natal",
      estado: "RN",
      cidade: "Natal", 
      imagem: require('../../../assets/images/dunas.jpg'),
      resumo: "Aventura e beleza natural nas famosas dunas do Rio Grande do Norte...",
      data: "2024-01-08",
      destaque: true,
      link: "/blog/natal"  // ✅ Caminho absoluto
    },
    {
      id: 4,
      titulo: "Tranquilidade em Gonçalves",
      estado: "MG",
      cidade: "Gonçalves",
      imagem: require('../../../assets/images/gonçalves.webp'),
      resumo: "Um refúgio na Serra da Mantiqueira para quem busca paz...",
      data: "2024-01-05",
      destaque: false,
      link: "/blog/goncalves"  // ✅ Caminho absoluto
    },
    {
      id: 5,
      titulo: "Paraíso em Porto de Galinhas",
      estado: "PE",
      cidade: "Porto de Galinhas",
      imagem: require('../../../assets/images/porto-de-galinhas.webp'),
      resumo: "Piscinas naturais e águas cristalinas no litoral pernambucano...",
      data: "2024-01-03",
      destaque: true,
      link: "/blog/porto-galinhas"  // ✅ Caminho absoluto
    },
    {
      id: 6,
      titulo: "Cultura Paulistana",
      estado: "SP",
      cidade: "São Paulo",
      imagem: require('../../../assets/images/masp.jpg'),
      resumo: "Museus, teatros e a vibrante vida cultural da maior cidade do Brasil...",
      data: "2024-01-01",
      destaque: false,
      link: "/blog/sao-paulo"  // ✅ Caminho absoluto
    }
  ];

  useEffect(() => {
    carregarEstados();
    setArtigosFiltrados(artigosBlog);
    setLoading(false);
  }, []);

  useEffect(() => {
    filtrarArtigos();
  }, [estadoSelecionado, cidadeSelecionada]);

  const carregarEstados = async () => {
    try {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
      const data = await response.json();
      setEstados(data);
    } catch (error) {
      console.error('Erro ao carregar estados:', error);
      // Fallback para estados dos artigos
      const estadosArtigos = [...new Set(artigosBlog.map(artigo => artigo.estado))];
      const estadosFallback = estadosArtigos.map(sigla => ({ sigla, nome: sigla }));
      setEstados(estadosFallback);
    }
  };

  const carregarCidades = async (estadoSigla) => {
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSigla}/municipios`);
      const data = await response.json();
      setCidades(data);
    } catch (error) {
      console.error('Erro ao carregar cidades:', error);
      // Fallback para cidades dos artigos
      const cidadesEstado = artigosBlog
        .filter(artigo => artigo.estado === estadoSigla)
        .map(artigo => artigo.cidade);
      const cidadesUnicas = [...new Set(cidadesEstado)];
      const cidadesFallback = cidadesUnicas.map(nome => ({ nome }));
      setCidades(cidadesFallback);
    }
  };

  const filtrarArtigos = () => {
    let filtrados = artigosBlog;
    
    if (estadoSelecionado) {
      filtrados = filtrados.filter(artigo => artigo.estado === estadoSelecionado);
    }
    
    if (cidadeSelecionada) {
      filtrados = filtrados.filter(artigo => 
        artigo.cidade.toLowerCase() === cidadeSelecionada.toLowerCase()
      );
    }
    
    setArtigosFiltrados(filtrados);
  };

  const limparFiltros = () => {
    setEstadoSelecionado('');
    setCidadeSelecionada('');
    setCidades([]);
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const selecionarEstado = (sigla) => {
    setEstadoSelecionado(sigla);
    carregarCidades(sigla);
    setCidadeSelecionada('');
    setModalEstadosVisible(false);
  };

  const selecionarCidade = (cidade) => {
    setCidadeSelecionada(cidade);
    setModalCidadesVisible(false);
  };

  const renderModalEstados = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalEstadosVisible}
      onRequestClose={() => setModalEstadosVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecione um Estado</Text>
            <TouchableOpacity onPress={() => setModalEstadosVisible(false)}>
              <Ionicons name="close" size={24} color="#6e3821ff" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalList}>
            <TouchableOpacity 
              style={styles.modalItem}
              onPress={() => {
                setEstadoSelecionado('');
                setModalEstadosVisible(false);
              }}
            >
              <Text style={styles.modalItemText}>Todos os estados</Text>
            </TouchableOpacity>
            
            {estados.map((estado) => (
              <TouchableOpacity 
                key={estado.sigla}
                style={styles.modalItem}
                onPress={() => selecionarEstado(estado.sigla)}
              >
                <Text style={styles.modalItemText}>{estado.nome}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderModalCidades = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalCidadesVisible}
      onRequestClose={() => setModalCidadesVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecione um Município</Text>
            <TouchableOpacity onPress={() => setModalCidadesVisible(false)}>
              <Ionicons name="close" size={24} color="#6e3821ff" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalList}>
            <TouchableOpacity 
              style={styles.modalItem}
              onPress={() => {
                setCidadeSelecionada('');
                setModalCidadesVisible(false);
              }}
            >
              <Text style={styles.modalItemText}>Todos os municípios</Text>
            </TouchableOpacity>
            
            {cidades.map((cidade, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.modalItem}
                onPress={() => selecionarCidade(cidade.nome || cidade)}
              >
                <Text style={styles.modalItemText}>{cidade.nome || cidade}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6e3821ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
<TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6e3821ff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Blog</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Blog Content */}
      <View style={styles.blogSection}>
        <Text style={styles.blogTitle}>
        </Text>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          {/* Estado Select */}
          <View style={styles.selectWrapper}>
            <Text style={styles.filterLabel}>Selecione o Estado:</Text>
            <TouchableOpacity 
              style={styles.selectInput}
              onPress={() => setModalEstadosVisible(true)}
            >
              <Text style={styles.selectText}>
                {estadoSelecionado ? estados.find(e => e.sigla === estadoSelecionado)?.nome || estadoSelecionado : 'Todos os estados'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#7f8c8d" />
            </TouchableOpacity>
          </View>

          {/* Cidade Select */}
          <View style={styles.selectWrapper}>
            <Text style={styles.filterLabel}>Selecione o município:</Text>
            <TouchableOpacity 
              style={[styles.selectInput, !estadoSelecionado && styles.selectDisabled]}
              onPress={() => {
                if (estadoSelecionado) {
                  setModalCidadesVisible(true);
                }
              }}
            >
              <Text style={[styles.selectText, !estadoSelecionado && styles.textDisabled]}>
                {cidadeSelecionada || (estadoSelecionado ? 'Todos os municípios' : 'Selecione um estado primeiro')}
              </Text>
              <Ionicons name="chevron-down" size={20} color={estadoSelecionado ? "#7f8c8d" : "#ccc"} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnLimpar} onPress={limparFiltros}>
            <Text style={styles.btnLimparText}>Limpar Filtros</Text>
          </TouchableOpacity>
        </View>

        {/* Modais */}
        {renderModalEstados()}
        {renderModalCidades()}

        {/* Results Info */}
        <View style={styles.resultsInfo}>
          <Text style={styles.resultsInfoText}>
            {artigosFiltrados.length === artigosBlog.length 
              ? `Mostrando todos os ${artigosBlog.length} artigos`
              : `${artigosFiltrados.length} artigo(s) encontrado(s)`}
          </Text>
        </View>

        {/* Articles Grid */}
        {artigosFiltrados.length > 0 ? (
          <View style={styles.blogPostsContainer}>
            {artigosFiltrados.map((artigo) => (
              <TouchableOpacity 
                key={artigo.id}
                style={[styles.blogPost, artigo.destaque && styles.destaque]}
                onPress={() => router.push(artigo.link)}  // ✅ Agora usa o link absoluto
              >
                <View style={styles.postImage}>
                  <Image 
                    source={artigo.imagem} 
                    style={styles.postImageContent}
                    resizeMode="cover"
                  />
                  {artigo.destaque && (
                    <View style={styles.badgeDestaque}>
                      <Text style={styles.badgeDestaqueText}>Destaque</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.postContent}>
                  <View style={styles.postMeta}>
                    <View style={styles.postLocalizacao}>
                      <Text style={styles.postLocalizacaoText}>
                        {artigo.cidade}, {artigo.estado}
                      </Text>
                    </View>
                    <Text style={styles.postData}>{formatarData(artigo.data)}</Text>
                  </View>
                  
                  <Text style={styles.postTitulo} numberOfLines={2}>
                    {artigo.titulo}
                  </Text>
                  <Text style={styles.postResumo} numberOfLines={3}>
                    {artigo.resumo}
                  </Text>
                  
                  <View style={styles.btnLerMais}>
                    <Text style={styles.btnLerMaisText}>Ler mais</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsTitle}>Nenhum artigo encontrado</Text>
            <Text style={styles.noResultsText}>Tente ajustar os filtros para ver mais resultados.</Text>
          </View>
        )}

        {/* Footer Margin */}
        <View style={styles.footerSpacer} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e0d3',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e0d3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6e3821ff',
  },
  headerRight: {
    width: 40,
  },
  blogSection: {
    padding: 20,
    backgroundColor: '#e6e0d3',
  },
  blogTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#6e3821ff',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  highlight: {
    color: '#a47d09',
  },
  filtersContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectWrapper: {
    marginBottom: 15,
  },
  filterLabel: {
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#e6e0d3',
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  selectDisabled: {
    borderColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  selectText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  textDisabled: {
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6e3821ff',
  },
  modalList: {
    maxHeight: 400,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalItemText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  blogPostsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  blogPost: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  destaque: {
    borderWidth: 2,
    borderColor: '#e74c3c',
  },
  postImage: {
    height: 120,
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  postImageContent: {
    width: '100%',
    height: '100%',
  },
  badgeDestaque: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#e74c3c',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  badgeDestaqueText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  postContent: {
    padding: 15,
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  postLocalizacao: {
    backgroundColor: '#b4b403ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  postLocalizacaoText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  postData: {
    color: '#7f8c8d',
    fontSize: 10,
    fontWeight: '500',
  },
  postTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6e3821ff',
    marginBottom: 8,
    lineHeight: 20,
  },
  postResumo: {
    color: '#666',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
  },
  btnLerMais: {
    backgroundColor: '#6e3821ff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  btnLerMaisText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  noResults: {
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#bdc3c7',
    borderStyle: 'dashed',
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 10,
  },
  noResultsText: {
    fontSize: 14,
    color: '#95a5a6',
  },
  footerSpacer: {
    height: 40,
  },
});