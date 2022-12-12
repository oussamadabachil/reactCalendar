import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { DatePickerIOSComponent } from "react-native";
import {
  Modal,
  Picker,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

export default function CalendrierScreen() {
  const [selectedIdBooking, setSelectedIdBooking] = useState(null);

  const [lottieDisable, setLottieDisable] = useState(false);
  const styleLottie = {
    display: "block",
  };

  const useriD = "1000";
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [arrayS, setArrays] = useState([]);
  const [datee, setDatee] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [firstDate, setFirstDate] = useState('')
  
  const [counter, setCounter] = useState(7);
  const arrayDate = [];
  let tomorrow = new Date();
  const Mois = [
    "Janv",
    "Févr",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sept",
    "Oct",
    "Nov",
    "Déc",
  ];

 

  const reserve = (x) => {
    setLottieDisable(false);

    fetch("http://192.168.10.196:3000/check/" + x, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.result) {
          fetch("http://192.168.10.196:3000/minus/" + x, {
            method: "PUT",
          })
            .then((response) => response.json())
            .then((json) => {});
        } else {
          Alert.alert(
            "Réservation impossible",
            "Cette date est déjà réservée",
            [
              {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
        }

        // console.log(json);
      });
  };

  let today = new Date().toISOString().slice(0, 10);


  useEffect(() => {
    setTimeout(() => {
    fetch("http://192.168.10.196:3000/all")
      .then((response) => response.json())
      .then((json) => {

        
        if (json) {
          setLottieDisable(true);
        }
        const arrayJson = json.map((item) => {
          return item;
        });
        setArrays(arrayJson);

           const moisdate = arrayS[counter-7].date.slice(5, 7);
        const jourdate =arrayS[counter-7].date.slice(8, 10);
        const moisdate2 = arrayS[counter].date.slice(5, 7);
        const jourdate2 =arrayS[counter].date.slice(8, 10);
        setFirstDate(jourdate + " " + Mois[moisdate - 1]);
   
        setLastDate(jourdate2 + " " + Mois[moisdate2 - 1]);
      
      });
  },

  
  );
  }, [arrayS]);


  if (lottieDisable) {
    styleLottie.display = "none";
  }


  const addWeek = () => {
    setCounter(counter + 7);
    // setLastDate(arrayS[counter].date);
    // setFirstDate(arrayS[counter - 7].date);
    

    // const moisdate = arrayS[counter-7].date.slice(5, 7);
    // const jourdate =arrayS[counter-7].date.slice(8, 10);
    // const moisdate2 = arrayS[counter].date.slice(5, 7);
    // const jourdate2 =arrayS[counter].date.slice(8, 10);
    // setFirstDate(jourdate + " " + Mois[moisdate - 1]);
    // setLastDate(jourdate2 + " " + Mois[moisdate2 - 1]);
  };

  

  const minusWeek = () => {
       // setLastDate(jourdate2 + " " + Mois[moisdate2 - 1]);
       setLastDate(arrayS[counter].date);
       setFirstDate(arrayS[counter - 7].date);
    if (counter > 7) {

      setCounter(counter - 7);

        // const moisdate = arrayS[counter-7].date.slice(5, 7);
        // const jourdate =arrayS[counter-7].date.slice(8, 10);
        // const moisdate2 = arrayS[counter].date.slice(5, 7);
        // const jourdate2 =arrayS[counter].date.slice(8, 10);
        // setFirstDate(jourdate + " " + Mois[moisdate - 1]);
     


    }else{
      Alert.alert(
        "Réservation impossible",
        "Vous ne pouvez pas réserver avant la date du jour",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

;

//display the date of the day


  // console.log(arrayS);
  const allDates = arrayS.slice(counter - 7, counter + 1).map((date) => {
    
   
    //date of the day
   

    let reserverOrAlert = (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setSelectedDate(date.date);
          setSelectedIdBooking(date._id);
          setModalVisible(true);
        }}
      >
        <Text style={styles.textButton}>Réserver</Text>
      </TouchableOpacity>
    );

    let palcesPlu = "places";
    let NbreDePlaceOrComplete = (
      <Text style={styles.text}>
        {date.NbreDePlace} {palcesPlu}
      </Text>
    );
    if (date.NbreDePlace <= 1) {
      palcesPlu = "place";
    }

    if (date.NbreDePlace === 0) {
      reserverOrAlert = (
        <TouchableOpacity style={styles.buttonsBell} onPress={() => {}}>
          <FontAwesome name="bell" size={29} color="#F12054" />
        </TouchableOpacity>
      );

      NbreDePlaceOrComplete = <Text style={styles.textComplet}>Complet</Text>;
    }

    /*icon fontawesome delete  */
    
    const moisdate = date.date.slice(5, 7);
    const jourdate = date.date.slice(8, 10);

    return (
      <>
        <View style={styles.viewDate}>
          <Text onPress={() => {}} style={styles.text}>
            {jourdate} {Mois[moisdate - 1]}
          </Text>
          {NbreDePlaceOrComplete}

          {reserverOrAlert}
        </View>
      </>
    );
  });

  return (
    <>
      <Modal animationType="slide"
      
       transparent={true} visible={modalVisible}>
      
        <KeyboardAvoidingView
          onPress={() => {
            console.log("hello");
            setModalVisible(!modalVisible);
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modal}
        >
          <View style={styles.viewModal}>
            <FontAwesome
              name="times"
              size={24}
              color="black"
              style={styles.iconClose}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />

            <Text style={styles.textModal}>{selectedDate}</Text>
            <Text style={styles.labelModal}>Horaire de dépose</Text>
            <TextInput
              style={styles.inputModal}
              placeholder="Heure de dépose"
            />
            <Text style={styles.labelModal}>Horaire de récupération</Text>
            <TextInput
              style={styles.inputModal}
              placeholder="Heure de récupération"
            />

            <Text style={styles.labelModal}>Commentaire</Text>
            <TextInput
              style={styles.inputModalTextArea}
              placeholder="Commentaire"
            />
            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => {
                setModalVisible(!modalVisible);
                reserve(selectedIdBooking);
              }}
            >
              <Text style={styles.textButtonModal}>Valider</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <SafeAreaView style={styles.container}>
        {/* <LottieView
          style={[styles.lottie, styleLottie]}
          source={require("./assets/95494-double-loader.json")}
          autoPlay
          loop
        /> */}

        <View style={styles.flexButton}>
          <FontAwesome
            name="chevron-left"
            onPress={() => {
              minusWeek();
              setFirstDate("");
              setLastDate("");

            }}
            size={24}
            color="black"
          />

          <Text style={styles.text}>
            {firstDate} - {lastDate}
          </Text>
          <FontAwesome
            name="chevron-right"
            onPress={() => {
              addWeek();
            }}
            size={24}
            color="black"
          />
        </View>
        <ScrollView style={styles.scroll}>{allDates}</ScrollView>
      </SafeAreaView>
    </>
  );
}

//import datePicker from "react-native-datepicker";
//install npm install react-native-datepicker --save
const styles = StyleSheet.create({
  textComplet: {
    textAlign: "right",
    marginLeft: "auto",
    marginRight: 10,
    color: "#F12054",
    fontWeight: "bold",
    fontSize: 20,
  },

  viewModal: {
    width: "90%",
    backgroundColor: "#008486",
    padding: 20,
    borderRadius: 10,
  },

  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  inputModal: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",

    width: "40%",
    marginBottom: 20,
  },

  textModal: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
  },
  inputModalTextArea: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",

    width: "100%",
    marginBottom: 20,
  },

  labelModal: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
    marginBottom: 20,
  },
  buttonModal: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textButtonModal: {
    fontWeight: "bold",
    color: "#008486",
    textAlign: "center",
    fontSize: 20,
  },
  iconClose: {
    backgroundColorw: "#fff",

    fontWeight: "light",
    fontSize: 40,
    color: "#fff",
    position: "absolute",
    top: 10,
    right: 10,
  },

  lottie: {
    width: 200,
    height: 200,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -100,
    marginTop: -100,

    zIndex: 1000,
    opacity: 1,
  },

  container: {
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    marginTop: 60,
    marginBottom: 0  ,
    flex: 1,
    borderRadius: 23,
    backgroundColor: "rgba(207,219,213,0.4)",
    height: "100%",
    width: "100%",
  },
  view: {
    borderWidth: 1,
    top: 120,
    width: "90%",
    paddingVertical: 23,
    borderRadius: 23,
    padding: 12,
  },
  viewDate: {
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    marginTop: 20,
    marginBottom: 10,
    width: "90%",
    paddingVertical: 23,
    borderRadius: 23,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonDisable: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: "#D3D3D3",
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  flexButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 20,
  },

  text: {
    textAlign: "center",
    fontSize: 20,
  },

  buttonBell: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: "#008486",
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",

    fontSize: 20,
  },
});

//fomat json date
/*
{
  "date": "2022-12-10",
  "nbrePlace": 3
},
{
  "date": "2022-12-11",
  "nbrePlace": 3
},
{
  "date": "2022-12-12",
  "nbrePlace": 3
},

*/
