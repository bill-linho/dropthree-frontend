import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ProductDetails({ route, navigation }) {
    const { product } = route.params || {};

    return (
      <View style={styles.container}>
        

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        {product?.image && (
          <Image 
            source={{ uri: product.image }} 
            style={styles.image}
          />
        )}
  
 
        <Text style={styles.title}>
          {product?.name || 'Nome do Produto'}
        </Text>
  

        <Text style={styles.price}>
          {product?.price ? `R$ ${product.price}` : 'Preço não informado'}
        </Text>
  

        <Text style={styles.description}>
          {product?.description || 'Descrição deste produto vai aqui...'}
        </Text>
  
      </View>
    );
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff'
    },
  
    backButton: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      backgroundColor: '#000',
      alignSelf: 'flex-start',
      borderRadius: 6,
      marginBottom: 10
    },
  
    backText: {
      color: '#fff',
      fontSize: 16
    },
  
    image: {
      width: '100%',
      height: 250,
      borderRadius: 10,
      marginBottom: 20
    },
  
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 10
    },
  
    price: {
      fontSize: 20,
      color: '#007AFF',
      marginBottom: 20
    },
  
    description: {
      fontSize: 16,
      color: '#555',
      lineHeight: 22
    }
  });