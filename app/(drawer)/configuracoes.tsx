import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface SettingItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  type: 'switch' | 'button';
  value?: boolean;
}

export default function ConfiguracoesScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(false);

  const settingsSections = [
    {
      title: "Preferências",
      data: [
        {
          id: 'notifications',
          title: 'Notificações',
          icon: 'notifications-outline',
          type: 'switch' as const,
          value: notifications,
          onValueChange: setNotifications
        },
        {
          id: 'darkMode',
          title: 'Modo Escuro',
          icon: 'moon-outline',
          type: 'switch' as const,
          value: darkMode,
          onValueChange: setDarkMode
        },
      ]
    },
    {
      title: "Preferências de Exibição",
      data: [
        {
          id: 'language',
          title: 'Idioma',
          icon: 'language-outline',
          type: 'button' as const,
          subtitle: 'Português'
        },
      ]
    },
    {
      title: "Privacidade",
      data: [
        {
          id: 'privacy',
          title: 'Política de Privacidade',
          icon: 'lock-closed-outline',
          type: 'button' as const
        },
      ]
    }
  ];

  const handleButtonPress = (id: string) => {
    switch(id) {
      case 'language':
        alert('Abrir seletor de idioma');
        break;
      case 'fontSize':
        alert('Abrir seletor de tamanho de fonte');
        break;
      case 'privacy':
        alert('Abrir política de privacidade');
        break;
      case 'data':
        alert('Gerenciar dados do usuário');
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {settingsSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionCard}>
            {section.data.map((item, itemIndex) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.settingItem,
                  itemIndex === section.data.length - 1 && styles.lastItem
                ]}
                onPress={() => item.type === 'button' && handleButtonPress(item.id)}
                activeOpacity={item.type === 'button' ? 0.7 : 1}
              >
                <View style={styles.settingLeft}>
                  <Ionicons name={item.icon} size={24} color="#007AFF" />
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    {'subtitle' in item && item.subtitle && (
                      <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                    )}
                  </View>
                </View>
                
                {item.type === 'switch' && (
                  <Switch
                    value={item.value}
                    onValueChange={item.onValueChange}
                    trackColor={{ false: '#767577', true: '#007AFF' }}
                    thumbColor={item.value ? '#fff' : '#f4f3f4'}
                  />
                )}
                
                {item.type === 'button' && (
                  <Ionicons name="chevron-forward-outline" size={20} color="#666" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEAE0',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});