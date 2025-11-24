import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { login } from '../services/serviceLogin';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [spam, setSpam] = useState('');

    async function handleLogin() {
        setSpam("");
    
        if (!email || !password) {
            setSpam("Preencha email e senha.");
            return;
        }
    
        const result = await login(email, password);
    
        if (!result) {
            setSpam("Erro ao conectar ao servidor.");
            return;
        }
    
        if (result.mensagem !== "Login realizado com sucesso") {
            setSpam("Email ou senha inválidos.");
            return;
        }
    
        navigation.replace("InterfaceDosProdutos");
    }
    
    function handleCadastro() {
        navigation.navigate("Cadastro");
    }

    return (
        <View style={styles.container}>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Login do DropThree</Text>

                <Text style={styles.label}>Seu E-mail</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {spam !== "" && (
                    <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
                        {spam}
                    </Text>
                )}
            </View>

            <View style={styles.footerContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={handleCadastro}
                >
                    <Text style={styles.buttonTextSecondary}>CADASTRO</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.buttonPrimary]}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonTextPrimary}>ENTRAR</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between', // 
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center', // 
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
        fontWeight: '600',
        
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 20,
        fontSize: 16,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingBottom: 30,
        backgroundColor: '#f5f5f5',
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 8,
        minWidth: 120,
        alignItems: 'center',
    },
    buttonPrimary: {
        backgroundColor: '#007BFF',
    },
    buttonSecondary: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#007BFF',
    },
    buttonTextPrimary: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonTextSecondary: {
        color: '#007BFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});