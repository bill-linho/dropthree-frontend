import React, { useState, useEffect, useRef } from "react";
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

// Importando as funções unificadas do seu serviço
import { getProducts, getCategories } from "../services/serviceLogin";

export default function Products({ navigation }) {

    // --- ESTADOS ---
    const [allProducts, setAllProducts] = useState([]); // Todos os produtos (backup)
    const [filteredProducts, setFilteredProducts] = useState([]); // Produtos exibidos na tela
    const [categories, setCategories] = useState([]); // Lista de categorias
    const [selectedCategory, setSelectedCategory] = useState(null); // null = 'Todos'
    
    const [menuVisible, setMenuVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(-260)).current;

    // --- CARREGAMENTO DE DADOS (Ao abrir a tela) ---
    useEffect(() => {
        async function loadData() {
            // 1. Busca Categorias
            const catData = await getCategories();
            // Adiciona a opção "Todos" manualmente no início
            const categoriasComOpcaoTodos = [{ id_categoria: null, nome: 'Todos' }, ...catData];
            setCategories(categoriasComOpcaoTodos);

            // 2. Busca Produtos
            const prodData = await getProducts();
            setAllProducts(prodData);
            setFilteredProducts(prodData); // Começa mostrando tudo
        }
        loadData();
    }, []);

    // --- LÓGICA DO FILTRO ---
    const handleFilter = (idCategoria) => {
        setSelectedCategory(idCategoria);

        if (idCategoria === null) {
            // Se escolheu "Todos", reseta a lista
            setFilteredProducts(allProducts);
        } else {
            // Filtra comparando o ID do banco
            const filtrados = allProducts.filter(item => item.id_categoria === idCategoria);
            setFilteredProducts(filtrados);
        }
    };

    // --- LÓGICA DO MENU LATERAL (Animação) ---
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

    // Navegação para Settings
    const navigateToSettings = () => {
        closeMenu();
        navigation.navigate('Settings'); 
    };

    // --- RENDERIZADORES (Componentes Visuais) ---

    // Item da Categoria (Botão horizontal)
    const renderCategoriaItem = ({ item }) => {
        const isSelected = selectedCategory === item.id_categoria;
        return (
            <TouchableOpacity
                style={[Styles.catButton, isSelected && Styles.catButtonActive]}
                onPress={() => handleFilter(item.id_categoria)}
            >
                <Text style={[Styles.catText, isSelected && Styles.catTextActive]}>
                    {item.nome}
                </Text>
            </TouchableOpacity>
        );
    };

    // Item do Produto (Card)
    const renderProductItem = ({ item }) => (
        <View style={Styles.blockOne}>
            <Image style={Styles.image} source={{ uri: item.url }} />
            <Text style={Styles.textName}>{item.nome_produto}</Text>
            <Text style={Styles.textDescription} numberOfLines={2}>{item.descricao}</Text>

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

            {/* --- CABEÇALHO / BOTÃO MENU --- */}
            <View style={Styles.menuHeader}>
                <TouchableOpacity onPress={openMenu}>
                    <Text style={Styles.menuTriggerText}>☰ MENU</Text>
                </TouchableOpacity>
            </View>

            {/* --- LISTA DE CATEGORIAS (HORIZONTAL) --- */}
            <View style={Styles.categoriesContainer}>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id_categoria ? item.id_categoria.toString() : 'todos'}
                    renderItem={renderCategoriaItem}
                    contentContainerStyle={{ paddingHorizontal: 10, alignItems: 'center' }}
                />
            </View>

            {/* --- LISTA DE PRODUTOS (VERTICAL) --- */}
            <View style={Styles.productsContainer}>
                <FlatList
                    data={filteredProducts}
                    keyExtractor={item => item.id_produto.toString()}
                    renderItem={renderProductItem}
                    numColumns={2}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={
                        <Text style={{textAlign:'center', marginTop: 20, color: '#999'}}>
                            Nenhum produto encontrado nesta categoria.
                        </Text>
                    }
                />
            </View>

            {/* --- MODAL DO MENU LATERAL --- */}
            <Modal transparent visible={menuVisible} animationType="none" onRequestClose={closeMenu}>
                <TouchableOpacity style={Styles.overlay} activeOpacity={1} onPress={closeMenu}>
                    <Animated.View style={[Styles.sideMenu, { left: slideAnim }]}>
                        
                        {/* Conteúdo do Menu */}
                        <Text style={Styles.menuTitle}>MENU</Text>

                        {/* Note: Aqui você pode colocar links reais ou placeholders */}
                        <TouchableOpacity style={Styles.menuItemContainer}>
                            <Text style={Styles.menuItem}>Início</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.menuItemContainer}>
                            <Text style={Styles.menuItem}>Carrinho</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.menuItemContainer} onPress={navigateToSettings}>
                            <Text style={Styles.menuItem}>Configurações</Text>
                        </TouchableOpacity>

                        {/* Botão Voltar */}
                        <TouchableOpacity onPress={closeMenu} style={Styles.backArrow}>
                            <Text style={{ fontSize: 24, color: '#333' }}>← Voltar</Text>
                        </TouchableOpacity>

                    </Animated.View>
                </TouchableOpacity>
            </Modal>

        </View>
    );
}

// --- ESTILOS ---
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },

    /* HEADER */
    menuHeader: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        elevation: 3,
    },
    menuTriggerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },

    /* CATEGORIAS */
    categoriesContainer: {
        height: 60,
        backgroundColor: '#F5F7FA', 
        justifyContent: 'center',
    },
    catButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 38,
        justifyContent: 'center',
        elevation: 1,
    },
    catButtonActive: {
        backgroundColor: '#0984e3', // Azul do tema
        borderColor: '#0984e3',
    },
    catText: {
        color: '#555',
        fontWeight: '600',
        fontSize: 14,
    },
    catTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },

    /* PRODUTOS */
    productsContainer: {
        flex: 1,
        paddingHorizontal: 5,
    },
    blockOne: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 10,
        margin: 6,
        marginBottom: 10,
        elevation: 3, // Sombra Android
        shadowColor: "#000", // Sombra iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
        resizeMode: 'contain',
        backgroundColor: '#fff',
    },
    textName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2D3436',
        textAlign: 'center',
        marginBottom: 4,
    },
    textDescription: {
        fontSize: 11,
        color: '#636E72',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#0984e3',
        paddingVertical: 8,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 11,
        textTransform: 'uppercase',
    },

    /* MENU LATERAL (MODAL) */
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    sideMenu: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 280,
        backgroundColor: "#fff",
        paddingTop: 50,
        paddingHorizontal: 20,
        // Sombra lateral do menu
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        color: '#0984e3',
    },
    menuItemContainer: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: "#f0f0f0",
    },
    menuItem: {
        fontSize: 18,
        color: '#333',
    },
    backArrow: {
        marginTop: 40,
        padding: 10,
    },
})