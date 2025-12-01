import { useState, useEffect, useRef } from "react";
import {
    TouchableOpacity,
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    Linking,
    Modal,
    Animated,
    Easing
} from "react-native";

import { getProduct } from "../services/servicesProducts";

export default function Products({ navigation }) {

    const [products, setProducts] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);

    const slideAnim = useRef(new Animated.Value(-260)).current;

    const openMenu = () => {
        setMenuVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false
        }).start();
    };

    const closeMenu = () => {
        Animated.timing(slideAnim, {
            toValue: -260,
            duration: 300,
            useNativeDriver: false
        }).start(() => setMenuVisible(false));
    };

    const loadProducts = async () => {
        const data = await getProduct();
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const renderItem = ({ item }) => (
        <View style={Styles.blockOne}>
            <Image style={Styles.image} source={{ uri: item.url }} />

            <Text style={Styles.textName}>{item.nome_produto}</Text>
            <Text style={Styles.textDescription}>{item.descricao}</Text>

            <TouchableOpacity
                style={Styles.button}
                onPress={() => Linking.openURL(item.direcionamento)}
            >
                <Text style={Styles.buttonText}>IR AO SITE</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={Styles.container}>

            {/* BOTÃO MENU */}
            <View style={Styles.menu}>
                <TouchableOpacity onPress={openMenu}>
                    <Text style={Styles.menuText}>☰ MENU</Text>
                </TouchableOpacity>
            </View>

            {/* MODAL DO MENU */}
            <Modal transparent visible={menuVisible} animationType="none">
                <TouchableOpacity style={Styles.overlay} activeOpacity={1} onPress={closeMenu}>

                    <Animated.View style={[Styles.sideMenu, { left: slideAnim }]}>

                        <Text style={Styles.menuTitle}>MENU</Text>

                        <TouchableOpacity>
                            <Text style={Styles.menuItem}>Categoria</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={Styles.menuItem}>Fornecedor</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={Styles.menuItem}>Carrinho</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={Styles.menuItem}>Usuário</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            closeMenu();
                            navigation.navigate('Settings');
                        }}>
                            <Text style={Styles.menuItem}>Settings</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={closeMenu} style={Styles.backArrow}>
                            <Text style={{ fontSize: 24 }}>←</Text>
                        </TouchableOpacity>

                    </Animated.View>
                </TouchableOpacity>
            </Modal>

            {/* LISTA DE PRODUTOS */}
            <View style={Styles.blocks}>
                <FlatList
                    data={products}
                    keyExtractor={item => item.id_produto.toString()}
                    renderItem={renderItem}
                    numColumns={2}
                />
            </View>

        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        borderRadius: 180,
        // padding:10
    },

    /* HEADER MENU */
    menu: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        elevation: 3,
    },
    menuText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },

    /* MODAL FUNDO */
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.25)",
    },

    /* MENU LATERAL */
    sideMenu: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 260,
        backgroundColor: "#fff",
        paddingTop: 50,
        paddingHorizontal: 20,
        borderRightWidth: 2,
        borderColor: "#000",
    },

    menuTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },

    menuItem: {
        fontSize: 18,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },

    backArrow: {
        marginTop: 25,
    },

    /* PRODUTOS */
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,

        alignItems: 'center',
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
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
        textTransform: 'uppercase',
    },
});
