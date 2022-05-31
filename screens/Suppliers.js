import React, { useEffect, useState } from 'react'
import { FlatList, ListView, ScrollView, Text, TextInput, View } from 'react-native'
import { ListItem } from "@rneui/themed";


const Suppliers = () => {

    const [ suppliers, setSuppliers ] = useState([]);
    const [ filteredStock, setfilteredSuppliers ] = useState([]);

    useEffect(() => {
        fetch('http://192.168.255.97:3000/suppliers').then(res => res.json()).then(data => {
            setfilteredSuppliers(data);
            setSuppliers(data);
        }).catch(err => alert(err));
        return () => { }
    }, [])

    const StockChange = (text) => {
        const newStock = suppliers.filter(suppliers => suppliers.SupplierName.toLowerCase().includes(text.toLowerCase()));
        setfilteredSuppliers(newStock);
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
                filteredStock && filteredStock.map(suppliers => (
                    <ListItem key={ suppliers.SUPP_ID } bottomDivider >
                        <ListItem.Content >
                            <ListItem.Title style={ {
                                color: 'black'
                            } }>{ suppliers.SupplierName }</ListItem.Title>
                            <ListItem.Subtitle style={ {
                                color: 'black'
                            } }>{ suppliers.Address }</ListItem.Subtitle>
                            <ListItem.Subtitle style={ {
                                color: 'black'
                            } }>{ suppliers.PhoneNo }</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </ScrollView >
    )
}

export default Suppliers