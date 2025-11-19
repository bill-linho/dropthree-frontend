import { View, Text, Button, Image } from 'react-native';

export default function ProductDetails({ route, navigation }) {
  const { produto } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      
      <Text style={{ fontSize: 28, fontWeight: 'bold' }}>
        {produto.nome}
      </Text>

      <Text style={{ fontSize: 20, marginVertical: 10 }}>
        R$ {produto.preco}
      </Text>

      <Text style={{ fontSize: 16, color: '#555' }}>
        {produto.descricao}
      </Text>

      <Button 
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}