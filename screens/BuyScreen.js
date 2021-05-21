import React from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import MyHeader from '../components/MyHeader'
import {ListItem} from 'react-native-elements'
import db from '../config'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {SafeAreaView} from 'react-navigation'
export default class Buy extends React.Component{
    constructor(){
        super();
        this.state={
            requestedBooksList : []
        }
        this.requestRef=null
    }
    getRequestedBooksList =()=>{
        this.requestRef = db.collection('Items')
        .onSnapshot((snapshot)=>{

          var requestedBooksList =[]
           snapshot.forEach((doc)=>{
             requestedBooksList.push(doc.data())
           })
          this.setState({
            requestedBooksList : requestedBooksList
          });
        })
      }
    
      componentDidMount(){
        console.log("buy Screen")
        this.getRequestedBooksList()
      }
    
      componentWillUnmount(){
        this.requestRef();
      }
    
      keyExtractor = (item, index) => index.toString()
    
      renderItem=({item,i})=>{ 
        return( 
        <ListItem bottomDivider>
         <ListItem.Content> 
          <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
          {item.ItemName} </ListItem.Title>
           <ListItem.Subtitle> Price: {item.itemPrice} 
           </ListItem.Subtitle> 
           </ListItem.Content> 
           <TouchableOpacity style={styles.button}
           onPress={()=>{
           this.props.navigation.navigate('myTranstionsScreen',{'details':item})
           }
           }
           > 
           <Text style={{ color: '#ffff' }}>Buy</Text> </TouchableOpacity>
       </ListItem> ) }
     
    render(){
        return(
          <SafeAreaProvider>
         <MyHeader navigation={this.props.navigation} title="NS App" />
         <View style={{flex:1}}>
          {
            this.state.requestedBooksList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested List</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedBooksList}
                renderItem={this.renderItem}
              />
            )
          }
            </View>
            </SafeAreaProvider>
        )
    }
}
const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })