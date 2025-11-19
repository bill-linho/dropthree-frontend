import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Escolha uma opção para começar</Text>

      <TouchableOpacity 
  style={styles.button}
  onPress={() => navigation.navigate('InterfaceDosProdutos')}
>
  <Text style={styles.buttonText}>Ver Produtos</Text>
</TouchableOpacity>

<TouchableOpacity 
  style={[styles.button, { backgroundColor: '#555' }]}
  onPress={() => navigation.navigate('PaginaProduto')}
>
  <Text style={styles.buttonText}>Meu Perfil</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10
  },

  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 30
  },

  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    marginBottom: 15,
    alignItems: 'center'
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  }
});