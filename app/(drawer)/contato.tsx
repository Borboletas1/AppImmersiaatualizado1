import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface ContactOption {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  color: string;
  action: () => void;
}

export default function ContatoScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const contactOptions: ContactOption[] = [
    {
      id: 'email',
      title: 'E-mail',
      icon: 'mail-outline',
      value: 'contato@brasilemfoco.com.br',
      color: '#007AFF',
      action: () => handleEmailPress()
    },
    {
      id: 'phone',
      title: 'Telefone',
      icon: 'call-outline',
      value: '(11) 99999-9999',
      color: '#34C759',
      action: () => handlePhonePress()
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      icon: 'logo-whatsapp',
      value: '(11) 99999-9999',
      color: '#25D366',
      action: () => handleWhatsAppPress()
    },
    {
      id: 'instagram',
      title: 'Instagram',
      icon: 'logo-instagram',
      value: '@brasilemfoco',
      color: '#E4405F',
      action: () => handleInstagramPress()
    }
  ];

  const handleEmailPress = () => {
    Linking.openURL('mailto:contato@brasilemfoco.com.br');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:+5511999999999');
  };

  const handleWhatsAppPress = () => {
    Linking.openURL('https://wa.me/5511999999999');
  };

  const handleInstagramPress = () => {
    Linking.openURL('https://instagram.com/brasilemfoco');
  };

  const handleSendMessage = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu nome');
      return;
    }
    
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Erro', 'Por favor, informe um e-mail válido');
      return;
    }
    
    if (!message.trim()) {
      Alert.alert('Erro', 'Por favor, escreva sua mensagem');
      return;
    }

    setIsSending(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Mensagem Enviada!',
        'Agradecemos seu contato. Responderemos em breve.',
        [
          {
            text: 'OK',
            onPress: () => {
              setName('');
              setEmail('');
              setMessage('');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar sua mensagem. Tente novamente.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Botão Voltar */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#584128" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Ionicons name="chatbubbles-outline" size={40} color="#584128" />
          <Text style={styles.headerTitle}>Fale Conosco</Text>
          <Text style={styles.headerSubtitle}>
            Estamos aqui para ajudar! Escolha uma das opções abaixo ou envie uma mensagem.
          </Text>
        </View>
      </View>

      <View style={styles.contactGrid}>
        {contactOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.contactCard}
            onPress={option.action}
          >
            <View style={[styles.contactIcon, { backgroundColor: option.color + '20' }]}>
              <Ionicons name={option.icon} size={28} color={option.color} />
            </View>
            <Text style={styles.contactTitle}>{option.title}</Text>
            <Text style={styles.contactValue}>{option.value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Envie uma mensagem</Text>
        
        <View style={styles.inputGroup}>
          <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Seu nome"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="chatbubble-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Sua mensagem"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity 
          style={[styles.sendButton, isSending && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={isSending}
        >
          <Ionicons name="send-outline" size={20} color="#fff" />
          <Text style={styles.sendButtonText}>
            {isSending ? "Enviando..." : "Enviar mensagem"}
          </Text>
        </TouchableOpacity>
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
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  contactCard: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  contactIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  contactValue: {
    fontSize: 12,
    color: '#666',
  },
  formContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 30,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  sendButton: {
    backgroundColor: '#584128',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  sendButtonDisabled: {
    backgroundColor: '#999',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});