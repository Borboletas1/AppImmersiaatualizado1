import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SobreScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header com Botão Voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#584128" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sobre Nós</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Logo e Nome */}
      <View style={styles.logoContainer}>
     <View style={styles.logoCircle}>
  <Image 
    source={require('../../assets/images/logo2.png')} // Caminho da sua imagem local
    style={styles.logoImage}
    resizeMode="contain"
  />
</View>
        <Text style={styles.companyName}>Brasil em Foco</Text>
        <Text style={styles.projectName}>Apresenta</Text>
        <Text style={styles.immersiaTitle}>IMMERSIA</Text>
        <View style={styles.divider} />
      </View>

      {/* Sobre o Projeto */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="info" size={24} color="#584128" />
          <Text style={styles.sectionTitle}>Sobre o Projeto</Text>
        </View>
        <Text style={styles.sectionText}>
          O Immersia é uma plataforma inovadora criada para oferecer experiências, 
          hospedagens e pacotes únicos em todo o território brasileiro. Nossa missão 
          é conectar viajantes às melhores vivências que o Brasil tem a oferecer, 
          desde praias paradisíacas até florestas exuberantes.
        </Text>
      </View>

      {/* Nossa Missão */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="target" size={24} color="#584128" />
          <Text style={styles.sectionTitle}>Nossa Missão</Text>
        </View>
        <Text style={styles.sectionText}>
          Proporcionar experiências autênticas e memoráveis, valorizando a cultura 
          local, a sustentabilidade e o turismo consciente em cada destino brasileiro.
        </Text>
      </View>

      {/* Valores */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="heart" size={24} color="#584128" />
          <Text style={styles.sectionTitle}>Nossos Valores</Text>
        </View>
        
        <View style={styles.valuesGrid}>
          <View style={styles.valueCard}>
            <Feather name="globe" size={28} color="#584128" />
            <Text style={styles.valueTitle}>Sustentabilidade</Text>
            <Text style={styles.valueText}>Turismo responsável que preserva o meio ambiente</Text>
          </View>
          
          <View style={styles.valueCard}>
            <Feather name="users" size={28} color="#584128" />
            <Text style={styles.valueTitle}>Cultura Local</Text>
            <Text style={styles.valueText}>Valorização das tradições e comunidades</Text>
          </View>
          
          <View style={styles.valueCard}>
            <Feather name="shield" size={28} color="#584128" />
            <Text style={styles.valueTitle}>Segurança</Text>
            <Text style={styles.valueText}>Experiências seguras e confiáveis</Text>
          </View>
          
          <View style={styles.valueCard}>
            <Feather name="smile" size={28} color="#584128" />
            <Text style={styles.valueTitle}>Autenticidade</Text>
            <Text style={styles.valueText}>Experiências genuinamente brasileiras</Text>
          </View>
        </View>
      </View>

      {/* O que oferecemos */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="gift" size={24} color="#584128" />
          <Text style={styles.sectionTitle}>O que Oferecemos</Text>
        </View>
        
        <View style={styles.offeringsList}>
          <View style={styles.offeringItem}>
            <Feather name="star" size={20} color="#FFD700" />
            <Text style={styles.offeringText}>
              <Text style={styles.offeringBold}>Experiências Únicas:</Text> Atividades exclusivas e imersivas
            </Text>
          </View>
          
          <View style={styles.offeringItem}>
            <Feather name="home" size={20} color="#FFD700" />
            <Text style={styles.offeringText}>
              <Text style={styles.offeringBold}>Hospedagens Selecionadas:</Text> Hotéis e pousadas com alma brasileira
            </Text>
          </View>
          
          <View style={styles.offeringItem}>
            <Feather name="package" size={20} color="#FFD700" />
            <Text style={styles.offeringText}>
              <Text style={styles.offeringBold}>Pacotes Completos:</Text> Roteiros planejados para você
            </Text>
          </View>
          
          <View style={styles.offeringItem}>
            <Feather name="map" size={20} color="#FFD700" />
            <Text style={styles.offeringText}>
              <Text style={styles.offeringBold}>Destinos por Todo Brasil:</Text> De Norte a Sul
            </Text>
          </View>
        </View>
      </View>

      {/* Diferenciais */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="award" size={24} color="#584128" />
          <Text style={styles.sectionTitle}>Nossos Diferenciais</Text>
        </View>
        
        <View style={styles.differentialsList}>
          <View style={styles.differentialItem}>
            <View style={styles.differentialDot} />
            <Text style={styles.differentialText}>Atendimento personalizado 24/7</Text>
          </View>
          <View style={styles.differentialItem}>
            <View style={styles.differentialDot} />
            <Text style={styles.differentialText}>Guias locais especializados</Text>
          </View>
          <View style={styles.differentialItem}>
            <View style={styles.differentialDot} />
            <Text style={styles.differentialText}>Roteiros exclusivos e sob medida</Text>
          </View>
          <View style={styles.differentialItem}>
            <View style={styles.differentialDot} />
            <Text style={styles.differentialText}>Parcerias com comunidades locais</Text>
          </View>
          <View style={styles.differentialItem}>
            <View style={styles.differentialDot} />
            <Text style={styles.differentialText}>Compromisso com a sustentabilidade</Text>
          </View>
        </View>
      </View>

      {/* Contato */}
      

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Brasil em Foco - Immersia</Text>
        <Text style={styles.footerSubtext}>Descubra o Brasil de verdade</Text>
      </View>
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
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EDEAE0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#584128',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 5,
  },
  immersiaTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#584128',
    letterSpacing: 2,
    marginTop: 5,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#d4a373',
    marginTop: 20,
    borderRadius: 2,
  },
  section: {
    backgroundColor: '#ffffff',
    marginTop: 10,
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#666666',
    textAlign: 'justify',
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  valueCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#584128',
    textAlign: 'center',
  },
  valueText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 16,
  },
  offeringsList: {
    gap: 12,
  },
  offeringItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  offeringText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  offeringBold: {
    fontWeight: 'bold',
    color: '#584128',
  },
  differentialsList: {
    gap: 12,
  },
  differentialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  differentialDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d4a373',
  },
  differentialText: {
    fontSize: 14,
    color: '#666666',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#584128',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  contactButtonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#584128',
  },
  contactButtonSocial: {
    backgroundColor: '#E4405F',
  },
  contactButtonText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '500',
  },
  footer: {
    paddingVertical: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#cccccc',
  },
  logoImage: {
  width: 80,
  height: 90,
},
});