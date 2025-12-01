import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
// Importe as funções do seu arquivo de serviço unificado
import { getUsuarioLocal, logout } from '../services/serviceLogin'; 

export default function Settings({ navigation }) {
  // Estado para simular uma opção (ex: notificações)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // Estado para guardar os dados reais do usuário
  const [user, setUser] = useState({ nome: 'Carregando...', email: '...', id: '' });

  // 1. CARREGA DADOS DO USUÁRIO SALVO (AsyncStorage)
  useEffect(() => {
    async function carregarDados() {
      const dados = await getUsuarioLocal(); 
      if (dados) {
        setUser(dados);
      }
    }
    carregarDados();
  }, []); // O array vazio garante que roda apenas na primeira vez

  const toggleSwitch = () => setNotificationsEnabled(previousState => !previousState);

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Deseja realmente sair do aplicativo?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim", onPress: async () => {
             await logout(); // Limpa os dados de login salvos
             navigation.replace('Login'); // Navega para o login (ajuste o nome da sua tela inicial se for diferente)
        }}
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        
        {/* Seção 1: Perfil (AGORA DINÂMICO) */}
        <Text style={styles.sectionTitle}>PERFIL</Text>
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <View style={styles.avatarPlaceholder}>
              {/* Pega a primeira letra do nome real para o avatar */}
              <Text style={styles.avatarText}>
                {user.nome ? user.nome.charAt(0).toUpperCase() : '?'}
              </Text>
            </View>
            <View>
              {/* MOSTRA OS DADOS REAIS DO USUÁRIO */}
              <Text style={styles.userName}>{user.nome}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>
        </View>

        {/* Seção 2: Preferências do App (IGUAL AO ORIGINAL) */}
        <Text style={styles.sectionTitle}>GERAL</Text>
        <View style={styles.card}>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Receber Notificações</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notificationsEnabled ? "#007AFF" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={notificationsEnabled}
            />
          </View>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Sobre o App</Text>
            <Text style={styles.versionText}>v1.0.0</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Termos de Uso</Text>
            <Text style={styles.arrow}>&gt;</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Sair (AGORA LIMPA O LOGIN) */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>SAIR DA CONTA</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

// O restante dos estilos permanece exatamente o mesmo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  /* Estilos do Perfil */
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  /* Estilos das Opções */
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  versionText: {
    fontSize: 14,
    color: '#888',
  },
  arrow: {
    fontSize: 22,
    color: '#ccc',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  /* Botão Logout */
  logoutButton: {
    marginTop: 10,
    marginBottom: 40,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff4444',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoutText: {
    color: '#ff4444',
    fontWeight: 'bold',
    fontSize: 16,
  },
});