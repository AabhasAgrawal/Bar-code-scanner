import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet ,TextInput , Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner  } from 'expo-barcode-scanner';


export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal',
        scannedBookID :'',
        scannedStudentID :''
      }
    }

    getCameraPermissions = async (id) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
       /* status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: id ,
        scanned: false,
        
      });
    }

    handleBarCodeScanned = async({type, data})=>{

      const{buttonState}=this.state
      if(buttonState === 'BookID'){
        this.setState({
          scanned: true,
          scannedBookID: data ,
          buttonState: 'normal'
        });
      }else if (buttonState === 'StudentID'){
        this.setState({
          scanned: true,
          scannedStudentID: data ,
          buttonState: 'normal'
        });
      }

      
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>
          <View>
            <Image style = {{width : 200 , height : 200 ,alignSelf : 'center' }} source = {require ("../assets/booklogo.jpg")} />
            <Text style = {{textAlign : 'center' , fontSize : 30}}>Online Library</Text>


            </View>
          <Text style={styles.displayText}>{
            hasCameraPermissions===true ? this.state.scannedData: "Request Camera Permission"
          }</Text> 

<TextInput style = {styles.textinput} placeholder = {"Book ID"} value = {this.state.scannedBookID}  />

            <TouchableOpacity
            onPress={()=>this.getCameraPermissions ( "BookId")}
            style={styles.scanbutton}>
            <Text style={styles.buttonText}>Scan </Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={()=>this.getCameraPermissions ("StudentId")}
            style={styles.scanbutton}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>

          <TextInput style = {styles.textinput} placeholder = {"Student ID"} value = {this.state.scannedStudentID}  />

        

        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF"
    },
    bgImage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    upperContainer: {
      flex: 0.5,
      justifyContent: "center",
      alignItems: "center"
    },
    appIcon: {
      width: 200,
      height: 200,
      resizeMode: "contain",
      marginTop: 80
    },
    appName: {
      width: 80,
      height: 80,
      resizeMode: "contain"
    },
    lowerContainer: {
      flex: 0.5,
      alignItems: "center"
    },
    textinputContainer: {
      borderWidth: 2,
      borderRadius: 10,
      flexDirection: "row",
      backgroundColor: "#9DFD24",
      borderColor: "#FFFFFF"
    },
    textinput: {
      width: "57%",
      height: 50,
      padding: 10,
      borderColor: "#FFFFFF",
      borderRadius: 10,
      borderWidth: 3,
      fontSize: 18,
      backgroundColor: "#5653D4",
      fontFamily: "Rajdhani_600SemiBold",
      color: "#FFFFFF"
    },
    scanbutton: {
      width: 100,
      height: 50,
      backgroundColor: "#9DFD24"
    },
  })