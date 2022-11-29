import React, { useEffect, useState } from 'react';
import { Stack, Avatar, Button } from '@react-native-material/core';
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

function TelaInicial({ navigation, route }) {
  const { usuario, usuarios, setUsers } = route.params;
  // função que navega para a tela de listagem de agiotas
  const selecionarAgiotas = () => {
    navigation.navigate('Agiotas', { usuario: usuario, usuarios: usuarios, setUsers: setUsers });
  };
  // retorna a cor do texto do Lançamentos Futuros, retornando vermelho quando existir lançamento
  function corLancamentoFuturo() {
    return usuario.lancamentoFuturo && usuario.lancamentoFuturo > 0 ? 'red' : 'black';
  }
  return (
    <View style={{ flex: 1 }}>
      <Stack fill spacing={4}>
        <View style={styles.cabecalho}>
          <Avatar
            style={{ marginLeft: 10, size: '5em' }}
            color="#565656"
            icon={(props) => <Icon name="account" {...props} />}
          />
          <Text style={{ marginLeft: 10 }}> Bem vindo, {usuario.name}</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={styles.saldo}>
          <View style={[styles.valores, {borderRightWidth: 2}]}>
            <Text style={{marginBottom: 10}}>Saldo</Text>
            <Text>
              {usuario.saldo.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>
          </View>
          <View style={styles.valores}>
            <Text style={{marginBottom: 10}}>Lançamentos Futuros</Text>
            <Text style={{color: corLancamentoFuturo()}}>
              {usuario.lancamentoFuturo.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 6,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Icon size="96px" name="account-tie" />
          <Button
            style={{ borderWidth: 2, borderRadius: 105 }}
            color="#487DF8"
            title="Selecionar agiotas"
            onPress={selecionarAgiotas}></Button>
        </View>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    flex: 4,
    flexDirection: 'row',
    borderBottomWidth: 4,
    borderBottomColor: 'black',
    backgroundColor: '#487DF8',
    borderTopWidth: 4,
    borderTopColor: 'black',
    alignItems: 'center',
  },
  saldo: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    backgroundColor: '#487DF8',
    borderBottomColor: 'black',
    borderTopWidth: 4,
    borderTopColor: 'black',
    flexDirection: 'row',
  },
  valores: {
    flex: 1,    
    marginLeft: 10,
  },
});
export default TelaInicial;
