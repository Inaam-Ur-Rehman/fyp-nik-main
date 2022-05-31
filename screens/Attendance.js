import React, { useEffect, useState } from 'react'
import { FlatList, ListView, ScrollView, Text, TextInput, View } from 'react-native'
import { ListItem } from "@rneui/themed";


const Attendance = ({ navigation }) => {

    const [ attendance, setAttendance ] = useState([]);
    const [ filteredAttendance, setfilteredAttendance ] = useState([]);

    useEffect(() => {
        fetch('http://192.168.255.97:3000/employees').then(res => res.json()).then(data => {
            setfilteredAttendance(data);
            setAttendance(data);
        }).catch(err => alert(err));
        return () => { }
    }, [])

    const StockChange = (text) => {
        const newStock = attendance.filter(attendance => attendance.EmployeeName.toLowerCase().includes(text.toLowerCase()));
        setfilteredAttendance(newStock);
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
                filteredAttendance && filteredAttendance.map(attendance => (
                    <ListItem onTouchStart={ () => navigation.navigate("Attendance Details", {
                        id: attendance.EMP_ID && attendance.EMP_ID
                    }) } key={ attendance.EMP_ID } bottomDivider containerStyle={ {
                    } }>
                        <ListItem.Content >
                            <ListItem.Title style={ {
                                color: 'black'
                            } }>{ attendance.EmployeeName }</ListItem.Title>
                            <ListItem.Subtitle style={ {
                                color: 'black'
                            } }>{ attendance.Present == 1 ? 'Present' : "Absent" }</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </ScrollView >
    )
}

export default Attendance