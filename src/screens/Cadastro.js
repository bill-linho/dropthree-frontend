import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { register } from "../services/serviceLogin";

export default function Cadastro({ navigation }) {

  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passwords, setPasswords] = useState('');

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const handleRegister = async () => {
  if (!names || !email || !phone || !passwords) {
    console.log("Erro: Preencha todos os campos.");
    return { erro: "Preencha todos os campos." };
  }

  if (!validarEmail(email)) {
    console.log("Erro: Email inválido.");
    return { erro: "Digite um email válido." };
  }

  // senha tem que ter mais de seis caracteres
  if (passwords.length < 6) {
    console.log("Erro: Senha curta.");
    return { erro: "A senha deve ter pelo menos 6 caracteres." };
  }

  const response = await register(names, email, phone, passwords);

  if (!response) {
    console.log("Erro: Sem resposta do servidor.");
    return { erro: "Falha ao conectar ao servidor." };
  }

  if (response.mensagem !== "Sucesso") {
    console.log("Erro:", response.mensagem);
    return { erro: response.mensagem || "Não foi possível cadastrar." };
  }

  console.log("Usuário cadastrado com sucesso!");

  setNames("");
  setEmail("");
  setPhone("");
  setPasswords("");

  navigation.navigate("Login");

  return { sucesso: true };
};


  const handleBack = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>

        <Text style={styles.title}>Cadastre-se</Text>
        <Text style={styles.subtitle}>Crie sua Conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu Nome Completo"
          placeholderTextColor="#aaa"
          value={names}
          onChangeText={setNames}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite seu Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite seu Telefone"
          placeholderTextColor="#aaa"
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite sua Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={passwords}
          onChangeText={setPasswords}
        />

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>REGISTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>VOLTAR</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  registerButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 15,
    padding: 10,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});
