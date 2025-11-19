import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, FlatList, ScrollView, Image } from "react-native";
import { StyleSheet } from "react-native";

import { getProduct } from "../services/servicesProducts";

export default function Products() {

    const loadProduct = async () => {
        const data = await getProduct()
    }

    useEffect(() => {
        loadProduct()
    }, [])

    return (

  <View style={Styles.container}>

    <View style={Styles.menu}>
        <TouchableOpacity>
            <Text>MENU</Text>
        </TouchableOpacity>
    </View>

     <View style={Styles.blocks}>


          <View style={Styles.blockOne}>


                    <View>
                        
                        <Image>
                            
                        </Image>
                    </View>
                    <Text>NOME_ITEM</Text>
                    <Text>DESCRIÇÃO_ITEM</Text>



          </View>
     </View>
 </View>


    )
}
const Styles = StyleSheet.create({
    container: {
        flex: 1

    },
    menu:{
        padding: '10',
       
    },
    blocks: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'darkgray'

    },
    blockOne: {
        flex: 1,
        textAlign: 'center',
        borderRadius: '36px',
        fontSize: 18,

    },
    blockTwo: {
        flex: 1,
        textAlign: 'center'
    },
    blockThree: {
        flex: 1,
        textAlign: 'center'
    },
    blockFour: {
        flex: 1,
        textAlign: 'center'
    },

})
