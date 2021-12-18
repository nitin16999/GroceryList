import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, StatusBar, View, ScrollView, TextInput, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Splash() {



    //Getting the Grocery list into Items Variable
    const [Items, setItems] = useState([])

    //For Getting the filtered Grocery list into Items Variable
    const [filteredItem, setfilteredItem] = useState(Items)

    //To Check list is empty or not
    const [dataAvailable, setdataAvailable] = useState(false)

    //User input Captured here..
    const [SearchEntry, setSearchEntry] = useState('')



    //this function handles the Initial Boot process like getting the data and preventing use from Going back to the Splash screen, which is kind of intro Screen
    useEffect(() => {
        getData();

        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);

    }, [])


    // Getting the Grocery List Data form the Assync Storage and checking if it is empty or not and handling the situation accordingly
    async function getData() {
        let data = []
        data = (await AsyncStorage.getItem('@items')).split(',');
        if (data.length == 0) {
            setdataAvailable(false)
        }
        else {
            setItems(data)
            setfilteredItem(data)
            setdataAvailable(true)
        }
    }


    // Updating the user input value to the state and filtering the existing lsit
    function handleSearch(input) {
        setSearchEntry(input)
        setfilteredItem(
            Items.filter(data =>
                data.toLowerCase().includes(input.toLowerCase())
            )
        )
    }




    // adding new item to the Grocery list by checking some condition
    async function addItem() {
        if (chechEntry()) {
            let s = SearchEntry.toLowerCase()

            //tried to write a code for Word containing Space at start and end but it didn't work...
            // for(let i=0;i<SearchEntry.length;i++){
            //     if(SearchEntry.charAt(i)==" "){
            //         SearchEntry.slice(i)
            //     }
            //     else{
            //         break
            //     }
            // }
            // for(let i=SearchEntry.length-1;i>-1;i--){
            //     if(SearchEntry.charAt(i)==" "){
            //         SearchEntry.slice(i)
            //     }
            //     else{
            //         break
            //     }
            // }

            if (Items.includes(s) == false) {
                let s = SearchEntry.toLowerCase()
                Items.push(s)
                await AsyncStorage.setItem('@items', Items.toString())
                setSearchEntry("")
            }
            else {
                Alert.alert("Item Already Exist", "Enter new Item into the Grocery List.")
            }
        }
        else {
            Alert.alert("Item Name required", "Enter the Name into the search field to add new Item into the Grocery List.")
        }
        getData()
    }


    //To check if the input field is empty or not
    function chechEntry() {
        if (SearchEntry == "") {
            return false
        }
        else {
            return true
        }
    }

    //For deleting the item from the grocery list
    async function deleteItem(Value) {
        const id = Items.indexOf(Value)
        if (id == 0) {
            setdataAvailable(false)
        }
        if (id > -1) {
            Items.splice(id, 1)
            await AsyncStorage.setItem('@items', Items.toString())
        }
        getData()
    }

    // If no Grocery Items Found in the list then Display the following slippet
    const NoDataFound = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 200 }}>
                <Text style={{ color: "#000", fontSize: 25, fontWeight: 'bold' }}>List is empty</Text>
            </View >
        );
    }


    return (
        <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
            <View style={styles.container}>
                <StatusBar backgroundColor="#fff" barStyle="light-content" />
                <LinearGradient colors={['#DFDFDF', '#FFFFFF']} style={styles.container}>

                    <CardView cardElevation={40} cornerRadius={30} style={styles.topContainer}>
                        <View flexDirection='row' style={{ alignItems: "center", justifyContent: "center" }}>

                            <TextInput style={styles.searchBox}
                                value={SearchEntry}
                                placeholder="Search Items..."
                                placeholderTextColor="#000"
                                selectionColor="#D0D0D0"
                                color="#000"
                                keyboardType="default"
                                onChangeText={entry => handleSearch(entry)}
                            />
                            <View style={styles.verticleLine}></View>
                            <TouchableOpacity style={styles.addButton} onPress={() => addItem()}>
                                <Icon name='add' size={27} color='#000' />
                            </TouchableOpacity>
                        </View>
                    </CardView>



                    <CardView cardElevation={40} cornerRadius={40} style={styles.bottomContainer}>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#000000', fontSize: 25, fontWeight: 'bold' }}>Items List</Text>
                        </View>

                        <CardView cardElevation={40} cornerRadius={40} style={styles.bottomInnerContainer}>

                            <ScrollView contentContainerStyle={{ flexGrow: 1 }} nestedScrollEnabled={true}>


                                {
                                    dataAvailable ?

                                        filteredItem.map(Value => {

                                            return (

                                                <CardView cardElevation={40} cornerRadius={40} style={styles.itemContainer}>
                                                    <View flexDirection='row' style={{ alignItems: 'center' }}>
                                                        <Icon name='caret-forward-circle' size={20} color='#000' />
                                                        <Text style={{ color: '#000', fontSize: 25, fontWeight: 'bold', marginLeft: 5 }}>{Value.charAt(0).toUpperCase() + Value.slice(1)}</Text>
                                                        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(Value)}>
                                                            <Icon name='trash' size={20} color='#000' />
                                                        </TouchableOpacity>
                                                    </View>
                                                </CardView>

                                            )
                                        })
                                        :
                                        <NoDataFound />
                                }

                            </ScrollView>
                        </CardView>
                    </CardView>

                </LinearGradient>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: hp('93%'),
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoText: {
        marginVertical: 5,
        fontSize: 25,
        fontWeight: 'bold',
        color: "#fff"
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        height: hp('10%'),
        width: wp('95%')
    },
    bottomContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        height: hp('75%'),
        width: wp('95%')
    },
    bottomInnerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#DFDFDF',
        height: hp('65%'),
        width: wp('90%'),
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        height: hp('7%'),
        width: wp('85%')
    },
    searchBox: {
        width: wp('69%'),
        backgroundColor: 'rgba(40, 40,40,0.15)',
        borderRadius: 25,
        paddingHorizontal: 15,
        fontSize: 17,
        color: '#fff'
    },
    addButton: {
        width: wp('12.4%'),
        backgroundColor: 'rgba(40, 40,40,0.15)',
        borderRadius: 26,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginLeft: 8
    },
    deleteButton: {
        width: wp('11%'),
        backgroundColor: 'rgba(40, 40,40,0.15)',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 11,
        marginLeft: 80
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#DFDFDF',
        marginLeft: 8
    }
});
