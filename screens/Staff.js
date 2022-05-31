import React, { useEffect, useState } from 'react'
import { FlatList, ListView, ScrollView, Text, TextInput, View } from 'react-native'
import { ListItem } from "@rneui/themed";



const Staff = () => {

    const [ staff, setStaff ] = useState([]);
    const [ filteredStaff, setfilteredStaff ] = useState([]);

    useEffect(() => {
        fetch('http://192.168.255.97:3000/users').then(res => res.json()).then(data => {
            setfilteredStaff(data);
            setStaff(data);
        }).catch(err => alert(err));
        return () => { }
    }, [])

    const StockChange = (text) => {
        const newStock = staff.filter(staff => staff.EmployeeName.toLowerCase().includes(text.toLowerCase()));
        setfilteredStaff(newStock);
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
                filteredStaff && filteredStaff.map(staff => (
                    <ListItem key={ staff.EMP_ID } bottomDivider >
                        <ListItem.Content >
                            <ListItem.Title style={ {
                                color: 'black'
                            } }>{ staff.EmployeeName }</ListItem.Title>
                            <ListItem.Subtitle style={ {
                                color: 'black'
                            } }>{ staff.Address }</ListItem.Subtitle>
                            <ListItem.Subtitle style={ {
                                color: 'black'
                            } }>{ staff.PhoneNo }</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </ScrollView >
    )
}

export default Staff