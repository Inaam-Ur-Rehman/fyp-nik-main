import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { ListItem } from 'react-native-elements';
import styled from 'styled-components';
import { Icon } from 'react-native-elements'
import { Alert, Pressable, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const options = [
    {
        title: 'Sales',
        icon: 'money',
        color: '#f4a261',
        screen: 'Sales'
    },
    {
        title: 'Stock',
        icon: 'inventory',
        color: '#ffb4a2',
        screen: 'Stock'
    },
    {
        title: 'Supppliers',
        icon: 'people',
        color: '#8ecae6',
        screen: 'Suppliers'
    },
    {
        title: 'Staff',
        icon: 'people',
        color: '#83c5be',
        screen: 'Staff'
    },
    {
        title: 'Attendance',
        icon: 'edit',
        color: '#a3b18a',
        screen: 'Attendance'
    },
    {
        title: 'Logout',
        icon: 'logout',
        color: '#f4978e',
        screen: 'Settings'
    }
]


const Dashboard = ({ navigation }) => {

    const [ today, setToday ] = useState([]);
    const [ top, setTop ] = useState([]);
    const [ shop, setShop ] = useState([]);
    const [ refreshing, setRefreshing ] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        fetch('http://192.168.255.97:3000/sales/today').then(res => res.json()).then(data => setToday(data[ 0 ])).catch(err => alert(err));
        fetch('http://192.168.255.97:3000/shop').then(res => res.json()).then(data => setShop(data[ 0 ])).catch(err => alert(err));
        fetch('http://192.168.255.97:3000/sales/top').then(res => res.json()).then(data => setTop(data)).catch(err => alert(err)).finally(setRefreshing(false));
        console.log(shop)
    };
    useEffect(() => {
        onRefresh();
        return () => { }
    }, [])
    return (
        <Container
            refreshControl={
                <RefreshControl
                    refreshing={ refreshing }
                    onRefresh={ onRefresh }
                />
            }
        >
            <StatusBar style='light' />
            <Heading>Welcome to, { shop.LegalName }</Heading>

            <SalesConatiner>
                <SalesHeading>Today's Sales</SalesHeading>
                <AmountContainer>
                    {
                        today.sum && today.cost && <>
                            <SalesAmount>Total Sales: { today.sum }</SalesAmount>
                            <SalesProfit>Est. Profit: { today.sum - today.cost }</SalesProfit>
                        </>

                    }
                </AmountContainer>
                {/* <Button
                    buttonStyle={{
                        backgroundColor: '#f4a261',
                    }}
                    title="My Button" /> */}
            </SalesConatiner>

            <OptionsConatiner>
                {
                    options.map((option, index) => (
                        <OptionConatiner key={ index }>

                            <Pressable style={ {
                                backgroundColor: option.color,
                                elevation: 5,
                                width: "100%",
                                height: 120,
                                borderRadius: 10,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            } }
                                android_ripple={ {
                                    color: "white",
                                } }
                                onPress={ () => option.title === 'Logout' ?
                                    Alert.alert(
                                        "Logout",
                                        "Do you want to logout?",
                                        [
                                            {
                                                text: "Cancel",
                                                onPress: () => console.log("Cancel Pressed"),
                                            },
                                            {
                                                text: "OK",
                                                onPress: () => {
                                                    AsyncStorage.removeItem("user").then(() => {
                                                        navigation.replace('Login')
                                                    })
                                                }
                                            },
                                        ]
                                    ) : navigation.navigate(option.screen) }>
                                <Icon
                                    type='material-icons'
                                    color="black"
                                    name={ option.icon } />
                                <SalesOptionHeading>{ option.title }</SalesOptionHeading>
                            </Pressable>
                        </OptionConatiner>
                    ))
                }
            </OptionsConatiner>
            <TopContainer>
                <TopHeading>Top Trendings Today</TopHeading>
                {
                    top && top.map((item, index) => (
                        <ListItem key={ index } bottomDivider containerStyle={ {
                        } }>
                            <ListItem.Content >
                                <ListItem.Title style={ {
                                    color: 'black'
                                } }>{ item.ItemName }</ListItem.Title>
                                <ListItem.Subtitle style={ {
                                    color: 'black'
                                } }>Sales: { item.total }</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </TopContainer>
        </Container>
    )
}

export default Dashboard


// Styled Components

const Container = styled.ScrollView`
    flex: 1;
    background-color: #fff;

`;

const Heading = styled.Text`
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`;

const SalesConatiner = styled.View`
    background-color: #2a9d8f;
    width: 90%;
    margin: 10px auto;
    min-height: 100px;
    border-radius: 5px;
    padding: 10px;
`;
const SalesHeading = styled.Text`
    color: #fff;
    font-size: 18px;
    text-align: center;
    justify-content: center;

`;
const AmountContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 20px;
`;
const SalesAmount = styled.Text`
    color: #fff;
    font-size: 16px;
    text-align: center;
    justify-content: center;

`;
const SalesProfit = styled.Text`
    color: #fff;
    font-size: 16px;
    text-align: center;
    justify-content: center;

`;
const OptionsConatiner = styled.View`
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const OptionConatiner = styled.View`
    width: 40%;
    margin: 10px auto;
    display: flex;
    justify-content: space-evenly;
    
`;
const SalesOptionHeading = styled.Text`
    text-align: center;
    margin-top: 10px;
    font-size: 20px;
`;

const TopContainer = styled.View`
    width: 90%;
    margin: 10px auto;
`;

const TopHeading = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;