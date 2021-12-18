import React, { Component } from 'react'
import { StyleSheet, Text, StatusBar, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'

class Splash extends Component {

    componentDidMount = () => {
        setTimeout(() => {
            this.props.navigation.navigate("GroceryList")
        }, 2000);
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#DFDFDF" barStyle="light-content" />
                <LinearGradient colors={['#DFDFDF', '#FFFFFF']} style={styles.container}>

                    <CardView cardElevation={40} cornerRadius={40} style={styles.logoContainer}>

                        <Icon name='list' size={60} color='#fff' />
                        <Text style={styles.logoText}>GroceryList</Text>
                    </CardView>

                </LinearGradient>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: hp('92%'),
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
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#000',
        height: hp('20%'),
        width: wp('40%')
    }
});

export default Splash