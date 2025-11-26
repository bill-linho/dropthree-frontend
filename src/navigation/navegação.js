import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

import ProductDetails from '../screens/paginadoProduto'
import Home from '../screens/home'
import Products from '../screens/product';
import login from '../screens/Login';
import SignUpScreen from '../screens/Cadastro';

export default function stackRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">

                <Stack.Screen name="Home" component={Home} />

                <Stack.Screen name="Login" component={login} />

                <Stack.Screen name="Cadastro" component={SignUpScreen} />

                <Stack.Screen name="InterfaceDosProdutos" component={Products} options={{tabBarVisible: false,headerTransparent:true,headerShown:false}} />

                <Stack.Screen name="PaginaProduto" component={ProductDetails} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}