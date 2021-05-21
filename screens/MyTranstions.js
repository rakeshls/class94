import React from 'react'
import {View} from 'react-native'
import firebase from 'firebase'
import db from '../config'
export default class myTranstionsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
       currentUserId=firebase.auth().currentUser.email,
       itemName='',
       itemId=this.props.navigation.getParam('details')['itemId'],
       Price=''
        }
    }
    updateCart=()=>{
        db.collection("all_transtion").add({})
    }
    getUserDetalis=(userId)=>{
        db.collection('Users').where('EmailId','==',userId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc)=>{
            this.setState({
              userName:doc.data().FirstName+" "+doc.data().LastName
            })
          })
        })
      }
componentDidMount(){
    this.getUserDetalis()
}      
    render(){
        return(
            <View>

            </View>
        )
    }
}