import React, { useEffect, useState } from 'react'
import { FlatList, ListView, ScrollView, Text, TextInput, View } from 'react-native'
import { ListItem } from "@rneui/themed";


const Stock = () => {

    const [ stock, setStock ] = useState([]);
    const [ filteredStock, setfilteredStock ] = useState([]);

    useEffect(() => {
        fetch('http://192.168.255.97:3000/stock').then(res => res.json()).then(data => {
            setfilteredStock(data);
            setStock(data);
        }).catch(err => alert(err));
        return () => { }
    }, [])

    const StockChange = (text) => {
        const newStock = stock.filter(stock => stock.ItemName.toLowerCase().includes(text.toLowerCase()));
        setfilteredStock(newStock);
    }

    return (
        <ScrollView style={ {
            backgroundColor: "white"
        } }>
            <TextInput
                style={ { height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, borderRadius: 5, paddingHorizontal: 5 } }
                placeholder="Search"
                onChangeText={ StockChange }
            />
            {
                filteredStock && filteredStock.map(stock => (
                    <ListItem key={ stock.STOCK_ID } bottomDivider containerStyle={ {

                    } }>
                        <ListItem.Content >
                            <ListItem.Title style={ {
                                color: 'black'
                            } }>{ stock.ItemName }</ListItem.Title>
                            <ListItem.Subtitle style={ {
                                color: 'black'
                            } }>Remaining Stock: { stock.Quantity }</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </ScrollView >
    )
}

export default Stock