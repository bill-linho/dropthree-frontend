import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

import ProductDetails from '../screens/paginadoProduto'
import Home from '../screens/home'
import Products from '../screens/product';

export default function stackRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="InterfaceDosProdutos">

                <Stack.Screen name="Home" component={Home} />

                <Stack.Screen name="Login" component={Home} />

                <Stack.Screen name="Cadastro" component={Home} />

                <Stack.Screen name="InterfaceDosProdutos" component={Products} />

                <Stack.Screen name="PaginaProduto" component={ProductDetails} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}