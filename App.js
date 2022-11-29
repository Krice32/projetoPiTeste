import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Modal,
  Button,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from './components/Screens/TelaInicial';
import TelaDeCadastro from './components/UserForm/Cadastro';
import Agiotas from './components/Screens/Agiotas'
import Emprestimo from './components/Screens/Emprestimo'
import usuarios from './mocks/usuarios'

//constantes de CPF e senha cadastrados para teste apenas
const CPF = '999999999';
const SENHA = 'senha123';

//função de validar o login, recebe um usuario, senha, o setActivity para alterar o
//estado do componente de carregamento, o navigation para navegar entre as telas,
//o setModalVisible para alterar o estado de visibilidade do pop up caso as infos
//digitadas estejam erradas e o setTextModal para alterar o texto do modal de acordo
//com a informação errada colocada pelo usuário
const ValidateLogin = async (
  cpf,
  senha,
  setActivity,
  navigation,
  setModalVisible,
  setTextModal,
  users,
  setUsers
) => {
  //se o tamanho do CPF digitado, retirando espaços em branco, for igual a 0,
  //ou seja, não tem nada digitado,
  //ele torna o Modal (componente pop-up) visivel, alterando seu texto para a info
  //que esta abaixo e retorna Falso para a função ValidateLogin
  if (cpf.trim().length === 0) {
    setTextModal('Digite seu CPF!');
    setModalVisible(true);
    return false;
  }

  //se o tamanho da senha digitada, retirando espaços em branco, for igual a 0,
  //ou seja, não tem nada digitado,
  //ele torna o Modal (componente pop-up) visivel, alterando seu texto para a info
  //que esta abaixo e retorna Falso para a função ValidateLogin
  else if (senha.trim().length === 0) {
    setTextModal('Digite sua senha!');
    setModalVisible(true);
    return false;
  }

  //se o tanto o CPF e senhas digitados forem equivalentes aos CPF e SENHA de teste,
  //salvos nas constantes das linhas 9 e 10, ele altera o componente de carregmento
  //visivel, por 2000 milisegundos e retorna a função navigate para alterar para a
  //Tela Inicial
  var senhaCorreta = false;
  if (users.length > 0) {
    var user = users.find((usuario) => {
      return usuario.cpf == cpf;
    });
    if (user && user.password === senha) {
      senhaCorreta = true;
      setActivity(true);
      setTimeout(function () {
        setActivity(false);
        return navigation.navigate('Home', {usuario: user, usuarios: users, setUsers: setUsers});
      }, 2000);
    }
  }

  //se o CPF e SENHA estiverem errados, ele altera o conteudo do Modal para o texto
  //abaixo, torna-o visivel e retorna Falso
  else{
    setTextModal('Usuário ou senha incorretos');
    setModalVisible(true);
    return false;
  }
};

//constante de criação do componente de navegação entre telas do React
const Stack = createNativeStackNavigator();

//tela de login (esta mesma) é criada como uma função que passa como paramento
// o modulo navigation para permitir navegação,
//são definidos constantes do que serão utilizado com a função useState para indicar
//que terão uso do usuário, sendo a primeira palavra o nome da constante e a segunda
//palavra o modo de alteração do seu conteúdo
function TelaLogin({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [activity, setActivity] = useState(false);
  const [textModal, setTextModal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState(usuarios);

  return (
    <View style={Estilos.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={Estilos.centeredView}>
          <View style={Estilos.modalView}>
            <Text style={Estilos.modalText}>{textModal}</Text>
            <View style={Estilos.button}>
              <Button
                onPress={() => setModalVisible(!modalVisible)}
                title="Fechar"
              />
            </View>
          </View>
        </View>
      </Modal>

      <Image style={Estilos.logo} source={require('./AgioBank.png')} />

      <Text style={Estilos.informacoes}>Usuario:</Text>
      <TextInput
        placeholder={'Digite o seu CPF:'}
        placeholderTextColor="grey"
        style={Estilos.textInput}
        clearButtonMode="always"
        onChangeText={(value) => setUser(value)}
      />

      <Text style={Estilos.informacoes}>Senha:</Text>
      <TextInput
        placeholder={'Digite a sua senha:'}
        placeholderTextColor="grey"
        secureTextEntry={true}
        style={Estilos.textInput}
        clearButtonMode="always"
        onChangeText={(value) => setPassword(value)}
      />

      <View style={Estilos.button}>
        <Button
          title="Login"
          color
          onPress={() => {
            //função onPress indica o que acontece ao pressionar o botão, no caso chama
            //a função validateLogin
            //se a função validateLogin retornar True ele navega para a proxima tela
            if (
              ValidateLogin(
                user,
                password,
                setActivity,
                navigation,
                setModalVisible,
                setTextModal,
                users,
                setUsers
              ) === true
            ) {
              navigation.navigate('Home');
            }
          }}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <ActivityIndicator size="large" color="#fff" animating={activity} />
      </View>

      <View>
        <Text
          style={{ fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>
          Ainda nao tem uma conta?
        </Text>

        <Text
          style={Estilos.link}
          onPress={() => {
            {
              navigation.navigate('Cadastro', { setUsers: setUsers });
            }
          }}>
          Cadastre-se
        </Text>
      </View>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#565656',
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name="Login"
          component={TelaLogin}
          options={{ title: 'AgioBank - Login' }}
        />

        <Stack.Screen
          name="Home"
          component={TelaInicial}
          options={{ title: 'AgioBank - Tela Incial' }}
        />

        <Stack.Screen
          name="Cadastro"
          component={TelaDeCadastro}
          options={{ title: 'AgioBank - Tela de Cadastro' }}
        />
        
        <Stack.Screen
          name="Agiotas"
          component={Agiotas}
          options={{ title: 'AgioBank - Lista de Agiotas' }}
        />
        
        <Stack.Screen
          name="Emprestimo"
          component={Emprestimo}
          options={{ title: 'AgioBank - Empréstimo' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const Estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#487DF8',
    padding: 20,
  },
  link: {
    backgroundColor: 'Transparent',
    border: 0,
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#fff',
    display: 'inline-block',
    padding: 0,
    textAlign: 'center',
    textDecoration: 'underline',
  },
  logo: {
    marginTop: 30,
    marginBottom: -40,
    width: 360,
    height: 100,
    alignSelf: 'center',
  },
  informacoes: {
    color: 'white',
    marginTop: 20,
    marginBottom: -10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    color: 'black',
    marginTop: 20,
    fontSize: 15,
    height: 40,
    width: 250,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 105,
  },
  button: {
    backgroundColor: '#565656',
    color: '#fff',
    fontSize: 15,
    width: 120,
    height: 35,
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 105,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
