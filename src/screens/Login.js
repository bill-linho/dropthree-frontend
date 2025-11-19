import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

export default function login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleEnter = () => {

        Alert.alert('Login', `Bem-vindo(a), ${name}! Redirecionando para o site principal...`);
    };

    const handleRegister = () => {

        Alert.alert('Cadastro', 'Redirecionando para a tela de cadastro...');
    };

    return (
        <View style={styles.container}>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>TELA DE LOGIN</Text>

                <Text style={styles.label}>Nome do Usuário</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <View style={styles.footerContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonTextSecondary}>CADASTRO</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.buttonPrimary]}
                    onPress={handleEnter}
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