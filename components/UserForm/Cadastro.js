import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button, Modal} from 'react-native';


export default function RegisterScreen({ navigation, route }) {
  const {setUsers} = route.params;
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');  
  const [textModal, setTextModal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const ValidateLogin =  async(cpf, password, email, confirmPassword, phone, name) => {

  if (cpf.trim().length === 0) {
    setModalVisible(true);
    setTextModal("CPF é Obrigatório")
    return false;
  }
  else if (password.trim().length === 0) {
    setModalVisible(true);
    setTextModal("Senha é obrigatório")
    
    return false;
  } else if (name.trim().length === 0) {
   
    setModalVisible(true);
    setTextModal("Nome é obrigatório")
    return false;
  }  else if (phone.trim().length === 0) {
    setModalVisible(true);
    setTextModal("Telefone é obrigatório")   
    return false;
  } else if (email.trim().length === 0) {
    setModalVisible(true);
    setTextModal("Email é obrigatório")
    return false;
  }  else if (confirmPassword.trim().length === 0) {
    setModalVisible(true);
    setTextModal("Confirmação de senha é obrigatório")
    return false;
  } else {
    const data = {
      name,
      cpf,
      email,
      phone,
      confirmPassword,
      password
    }

    setUsers((oldData) => {return [...oldData, data]})
    setModalVisible(true);
    setTextModal("usuario cadastrado com sucesso")
    return true;
  }
}

  return (
    <View style={styles.container}>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{textModal}</Text>
            <View style={styles.button}>
              <Button color="white" onPress={() => setModalVisible(!modalVisible)} title="Fechar"/>
            </View>                  
          </View>
        </View>
      </Modal> 
  
      <Text style={styles.title}>Cadastrar Usuario</Text>

      <Text>Email</Text>
       <TextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        type="email"
        required
        style={styles.TextInput}
        />
             
      <Text>Nome Completo</Text>
      <TextInput
        onChangeText={(text) => setName(text)}
        value={name}
        style={styles.TextInput}
      />
    
     
      <Text>CPF</Text>
      <TextInput 
        onChangeText={(text) => setCpf(text)}
        value={cpf}
        style={styles.TextInput}
        type="number"
      />

      
      <Text>Telefone</Text>
      <TextInput
        onChangeText={(text) => setPhone(text)}
        value={phone}
        style={styles.TextInput}
        type="number"
      />

      <Text>Senha</Text>
        <TextInput
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
          style={styles.TextInput}
          type="password"
        />

      <Text>Confirme a senha</Text>
        <TextInput
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          style={styles.TextInput}
        />

      
      <View style={styles.button}>
        <Button  color="white" onPress={() => {
         
        ValidateLogin(cpf, password, email, confirmPassword, phone, name);
        }} title="Cadastrar"/>
      </View>     
 
    </View>
   
  );
}

const styles = StyleSheet.create({
container: {
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
marginTop: 80,
},

TextInput: {
   backgroundColor: 'white',
    color: 'black',
    marginBottom: 16,
    fontSize: 15,
    height: 40,
    width: "80%",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 105
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

  title: {
    fontSize: 30,
    marginBottom: 24,
  }
})

