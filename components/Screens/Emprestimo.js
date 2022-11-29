import React, { useEffect, useState } from 'react';
import {
  Stack,
  Avatar,
  Button,
  ListItem,
  Backdrop,
  BackdropSubheader,
  AppBar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Provider
} from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Image,
  StyleSheet,
  BackHandler,
  Modal,
} from 'react-native';
import ModalView from '../Modal';

export default function Emprestimo({ navigation, route }) {
  const { usuario, usuarios, agiota, setUsers } = route.params;
  const [revealed, setRevealed] = useState(false);
  const [valor, setValor] = useState(0);
  const [juros, setJuros] = useState(0);
  const [pagamento, setPagamento] = useState(0);
  const [textModal, setTextModal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // função responsável por calcular os juros a partir do valor de empréstimo solicitado
  function calculaJuros(saldo) {
    if (!saldo) {
      saldo = valor;
    }
    if (saldo >= 0 && saldo < 10000) {
      setJuros(10);
    } else if (saldo < 200000) {
      setJuros(13);
    } else if (saldo < 2000000) {
      setJuros(15);
    } else {
      setJuros(20);
    }
  }
  // funcção responsável por calcular o valor que vai ser necessário pagar sobre os juros cobrados e o valor solicitado
  function calculaPagamento(val) {
    setPagamento(val * (1.0 + parseFloat(juros) / 100.0));
  }

  // utilizado useEffect para calcular os valores ao entrar na tela
  // useEffect(() => {
  //   calculaJuros(valor);
  //   calculaPagamento(valor);
  // });

  // função que confirma a a solicitação de empréstimo alterando o saldo do agiota e do usuário que solicitou o empréstimo, alterando também os valores futuros baseado no valor que vai ser necessário pagar ao agiota no futuro e retorna para a tela incial.
  function confirmarEmprestimo() {
    if (valor > agiota.saldo) {
      setTextModal(
        'Valor não pode ser maior que o saldo do Agiota : ' +
          agiota.saldo.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })
      );
      setModalVisible(true);
      return false;
    }
    var agiotaFiltrado = usuarios.find((filtro) => filtro.cpf == agiota.cpf);
    if (agiotaFiltrado) {
      agiotaFiltrado.saldo =
        parseFloat(agiotaFiltrado.saldo) - parseFloat(valor);
    }

    var usuarioFiltrado = usuarios.find((filtro) => filtro.cpf == usuario.cpf);
    if (usuarioFiltrado) {
      usuarioFiltrado.saldo =
        parseFloat(usuarioFiltrado.saldo) + parseFloat(valor);
      usuarioFiltrado.lancamentoFuturo =
        parseFloat(usuarioFiltrado.lancamentoFuturo) + parseFloat(pagamento);
    }

    setUsers(usuarios);
    navigation.navigate('Home', route.params);
  }
  return (
    <View style={{ flex: 1 }}>
      <Backdrop
        style={{ backgroundColor: '#487DF8' }}
        revealed={revealed}
        header={
          <AppBar
            title={agiota.name}
            transparent
            leading={(props) => (
              <IconButton
                icon={(props) => (
                  <Icon name={revealed ? 'close' : 'account-tie'} {...props} />
                )}
                onPress={() => setRevealed((prevState) => !prevState)}
                {...props}
              />
            )}
          />
        }
        backLayer={
          <View
            style={{
              height: 120,
              borderTopWidth: 1,
              borderTopColor: 'white',
              backgroundColor: '#487DF8',
            }}>
            <Text style={styles.texto}>Nome: {agiota.name}</Text>
            <Text style={styles.texto}>E-mail: {agiota.email}</Text>
            <Text style={styles.texto}>Telefone: {agiota.phone}</Text>
            <Text style={styles.texto}>Avaliação: {agiota.avaliacao}</Text>
          </View>
        }>
        <BackdropSubheader title="Simulação de Empréstimo" />
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={styles.label}>Quanto voce quer?</Text>
          <TextInput
            onChangeText={(val) => {
              setValor(val);
              calculaJuros(val);
              calculaPagamento(val);
            }}
            value={valor}
            style={styles.TextInput}
            type="number"
          />
          <Text style={styles.label}>Juros</Text>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            value={juros + ' %'}
            style={[styles.TextInput, { backgroundColor: 'grey' }]}
          />
          <Text style={styles.label}>Quanto você vai pagar</Text>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            value={parseFloat(pagamento).toFixed(2)}
            style={[styles.TextInput, { backgroundColor: 'grey' }]}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            style={styles.button}
            title="Voltar"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Button
            style={styles.button}
            title="Confirmar"
            onPress={confirmarEmprestimo}
          />
        </View>
      </Backdrop>
      <ModalView
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        textModal={textModal}
      />      
    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    marginHorizontal: 20,
  },
  TextInput: {
    backgroundColor: 'white',
    color: 'black',
    marginBottom: 16,
    fontSize: 15,
    height: 40,
    width: '80%',
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 105,
  },
  label: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#487DF8',
    color: '#fff',
    fontSize: 15,
    height: 35,
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 105,
  },
});
