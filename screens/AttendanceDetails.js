import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements';
import { TextInput } from 'react-native-web';

const AttendanceDetails = ({ route, navigation }) => {
    const [ attendance, setAttendance ] = useState([]);
    useEffect(() => {
        if (route.params?.id) {
            fetch(`http://192.168.255.97:3000/employee/${route.params?.id
                }`).then(res => res.json()).then(data => {
                    setAttendance(data);
                }).catch(err => alert(err));

        }
        return () => { }
    }, [ route.params?.id ])


    return (
        <ScrollView style={ {
            backgroundColor: "white"
        } }>
            {
                attendance && attendance.map((attendance, index) => (
                    <ListItem onTouchStart={ () => navigation.navigate("Attendance Details", {
                        id: attendance.EMP_ID && attendance.EMP_ID
                    }) } key={ index } bottomDivider containerStyle={ {
                    } }>
                        <ListItem.Content >
                            <ListItem.Title style={ {
                                color: 'black'
                            } }>{ attendance.EmployeeName }</ListItem.Title>
                            <ListItem.Subtitle style={ {
                                color: 'black'
                            } }>{ new Date(attendance.AttendanceDate).toDateString() }</ListItem.Subtitle>
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

export default AttendanceDetails