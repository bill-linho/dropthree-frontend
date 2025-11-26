import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, FlatList, Image,StyleSheet, Linking } from "react-native";

import { getProduct } from "../services/servicesProducts";

export default function Products() {

    const [products, setProducts] = useState([])

    const loadProducts = async () => {
        const data = await getProduct()
        setProducts(data);
    }

    useEffect(() => {
        loadProducts()
    }, [])

    const renderItem = ({ item }) => {
        console.log(item)
        return (
            <View style={Styles.blockOne}>
                <Image
                    style={Styles.image}
                    source={{
                        uri: item.url
                    }}
                />
                <Text style={Styles.textName}>
                    {item.nome_produto}
                </Text>
                <Text style={Styles.textDescription}>
                    {item.descricao}
                </Text>
                <TouchableOpacity style={Styles.button} onPress={() => Linking.openURL(item.direcionamento)}>
                    <Text style={Styles.buttonText}>IR AO SITE</Text>
                    
                </TouchableOpacity>
            </View>
        )

    }
    return (
            <View style={Styles.container}>

                <View style={Styles.menu}>
                    <TouchableOpacity>
                        <Text style={Styles.menuText}>MENU</Text>
                    </TouchableOpacity>
                </View>

                <View style={Styles.blocks}>

                    <FlatList
                        data={products}
                        keyExtractor={item => item.id_produto.toString()}
                        renderItem={renderItem}
                        numColumns={2}
                    />
                </View>
            </View>

    )
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#F5F7FA',
    },
    menu: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E1E1E1',
        marginBottom: 10,
        alignItems: 'center',
        elevation: 2,
    },
    menuText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    blocks: {
        flex: 1,
        paddingHorizontal: 10,
    },
    blockOne: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        margin: 6,
        marginBottom: 15,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
        resizeMode: 'contain',
        backgroundColor: '#f9f9f9',
    },
    textName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#2D3436',
        textAlign: 'center',
        marginBottom: 4,
    },
    textDescription: {
        fontSize: 12,
        color: '#636E72',
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 16,
    },
    button: {
        backgroundColor: '#0984e3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
        textTransform: 'uppercase',
    }
});
