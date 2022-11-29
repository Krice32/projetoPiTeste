import React from 'react';
import { Text, StyleSheet, View, TextInput, Button, Modal } from 'react-native';

export default function ModalView({modalVisible, setModalVisible, textModal}) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{textModal}</Text>
          <View style={styles.button}>
            <Button
              color="white"
              onPress={() => setModalVisible(!modalVisible)}
              title="Fechar"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
  backgroundColor: "#318FFE",
  color: 'white',
  fontSize: 15,
  borderColor: "black",
  width: "60%",
  height: 40,
  marginTop: 20,
  marginHorizontal: 20,
  textAlign: 'center',
  alignSelf: 'center',
  borderRadius: 105 
  }, 

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});
