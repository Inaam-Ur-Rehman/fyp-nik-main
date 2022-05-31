import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, StyleSheet, Pressable } from 'react-native'
import styled from 'styled-components';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";


const Sales = () => {

    const [ sales, setSales ] = useState("weekly");
    const [ weekly, setWeekly ] = useState([]);
    const [ weeklySum, setWeeklySum ] = useState(0);
    const [ monthly, setMonthly ] = useState([]);
    const [ monthlySum, setMonthlySum ] = useState(0);

    useEffect(() => {
        fetch('http://192.168.255.97:3000/sales/week').then(res => res.json()).then(data => setWeekly(data)).catch(err => alert(err));
        fetch('http://192.168.255.97:3000/sales/monthly').then(res => res.json()).then(data => setMonthly(data)).catch(err => alert(err));

        return () => { }
    }, [])

    return (
        <ScrollView style={ {
            backgroundColor: "white"
        } }>
            <ButtonsContainer>
                <Button
                    onPress={ () => setSales("weekly") }
                    android_ripple={ {
                        color: "white",
                    } }
                    style={ {
                        backgroundColor: sales === "weekly" ? "#f4a261" : "#264653",
                    } }
                >
                    <ButtonText>Weekly</ButtonText>
                </Button>
                <Button
                    onPress={ () => setSales("monthly") }
                    android_ripple={ {
                        color: "white",
                    } }
                    style={ {
                        backgroundColor: sales === "monthly" ? "#f4a261" : "#264653",
                    } }
                >
                    <ButtonText>Monthly</ButtonText>
                </Button>
            </ButtonsContainer>

            <SalesContainer>
                {
                    sales === "weekly" ? <SalesText>Weekly Sales: {
                        weekly.map(item => item.total).reduce((prev, curr) => prev + curr, 0)
                    }
                    </SalesText> : <SalesText>Monthly Sales: {
                        monthly.map(item => item.total).reduce((prev, curr) => prev + curr, 0)
                    }</SalesText>
                }
            </SalesContainer>

            <View style={ styles.container }>
                {
                    sales === "weekly" ? weekly && <VictoryChart theme={ VictoryTheme.material }>
                        <VictoryBar data={ weekly } x="day" y="total" />
                    </VictoryChart> : monthly && <VictoryChart theme={ VictoryTheme.material }>
                        <VictoryBar data={ monthly } x="month" y="total" />
                    </VictoryChart>
                }
            </View>
        </ScrollView>
    )
}

export default Sales

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }
});

const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    width: 50%;
    margin: auto;
`;
const Button = styled.Pressable`
    background-color: #264653;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 20px auto;
`;
const ButtonText = styled.Text`
    color: white;  
`;
const SalesContainer = styled.View`
    color: white;
    padding: 10px;  
`;
const SalesText = styled.Text`
    color: black;  
    font-size: 20px;
`;