import React, {Component} from 'react';
import axios from 'axios';
import {
  FlatList,
  Text,
  View,
  Image
} from 'react-native';
import { ButtonGroup,Header } from 'react-native-elements'
import moment from 'moment';
import CardView from '../Components/CardView';
import Styles from '../Styles';

// Number is a class component where both number and api tasks are done here
const n = 100;
class Number extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse:[],
            selectedIndex:0,
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    //  function to greet the user based on the current time
    getGreetingTime = (currentTime) => {
        if (!currentTime || !currentTime.isValid()) {
          return 'Hello';
        }
    
        const splitAfternoon = 12; // 24hr time to split the afternoon
        const splitEvening = 17; // 24hr time to split the evening
        const currentHour = parseFloat(currentTime.format('HH'));
    
        if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
          // Between 12 PM and 5PM
          return 'Good afternoon';
        }
        if (currentHour >= splitEvening) {
          // Between 5PM and Midnight
          return 'Good evening';
        }
        // Between dawn and noon
        return 'Good morning';
      };


      // Used switch case to seggregate number and api task
        showList() {
            const { selectedIndex, apiResponse } = this.state;
            let i;
            let numberArray=[];
            for(i=1; i<=n; i++){
                numberArray.push({'value':i});
            }
            console.log('find the array', this.state.selectedIndex);
            switch (selectedIndex) {
              case 0:
                return (
                    <FlatList
                    contentContainerStyle={{padding:10}}
                    data={numberArray}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                        if (item) {
                        return (
                            <CardView>
                            <View>
                                {item.value%5 === 0? 
                                <Text style={[Styles.number,{textAlign:'center'}]}>{item.value.toString().replace(item.value.toString(), 'abc')}</Text>
                                 : <Text style={[Styles.number,{textAlign:'center'}]}>{item.value.toString()}</Text>}
                            </View>
                            </CardView>
                        )}}}/>
                );
              case 1:
                return (
                    <FlatList
                    contentContainerStyle={{padding:10}}
                    data={apiResponse}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                        if (item) {
                        return (
                            <View>
                                <CardView>
                                <View style={{flexDirection:'column',padding:10}}> 
                                <View style={{flexDirection:'row'}}>
                                <Image style ={{justifyContent:'center',height:20,width:20}} source={require('../Assets/user.png')}/>
                                <Text style={[{fontWeight:'100',paddingLeft:10}]}>{item.name}</Text>
                                </View>                                                                  
                                <Text style={{fontWeight:'bold', paddingTop:10}}>{item.email}</Text>
                                <Text>{item.body}</Text>
                                </View>
                                </CardView>
                            </View>
                        )}}}/>
                        );             
              default:
                return null;
            } 
          }

    // When upper buttons are clicked meanwhile their index value keepon updating
    updateIndex(selectedIndex){
        this.setState({selectedIndex})
    }
    
    // api is called only once and updated to the state, hence written inside did mount lifecycle
    componentDidMount(){
        let API_URL = `https://jsonplaceholder.typicode.com/comments?postId=1`;
        axios
            .get(API_URL)
            .then((response) => {
            console.log('api success', response.data);
            this.setState({apiResponse:response.data})
            })
            .catch((error) => {
            console.log('api error', error);
            });
    }

    // main render function
    render(){
        let message = this.getGreetingTime(moment());
        const buttons = ['Number', 'ApiInfo'];
        return(
            <View style={{flex:1}}>
                <Header
                centerComponent={{ text: message+' ' + 'CodeWave', style: { color: '#fff' } }}
                />
                <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={this.state.selectedIndex}
              buttons={buttons}
              style={{ padding: 0 }}
              textStyle={{ color: "#000", fontWeight: 'bold', fontSize: 14 }}
              selectedTextStyle={{ color: 'white' }}
              buttonStyle={{ backgroundColor: 'transparent' }}
              selectedButtonStyle={{ backgroundColor: '#3D6DCC' }}
              containerStyle={{ height: 30, borderColor: '#000', backgroundColor: 'transparent' }}
            />
            {this.showList()}
            </View>
        )
    }
}

export default Number;