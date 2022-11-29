import React, { useEffect, useState } from 'react';
import { Stack, Avatar, Button, ListItem } from '@react-native-material/core';
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

export default function Agiotas({ navigation, route }) {
  const {usuario, usuarios, setUsers } = route.params;
  const selecionarAgiota = (agiota) => {
    navigation.navigate('Emprestimo', { usuario, usuarios, agiota, setUsers: setUsers });
  }
  // função que retorna um ListItem de cada agiota, para ser renderizado pelo FlatList
  const renderizarListItem = (user) => {
    return <ListItem
      title={user.name}
      secondaryText={'Avaliação: ' + user.avaliacao}
      leading={<Icon name="account-tie" size={24} />}
      trailing={(props) => <Icon name="chevron-right" {...props} />}
      onPress={() => {selecionarAgiota(user)}}
    />;
  };
  // função responsável por filtrar os usuários para retornar apenas os agiotas.
  const filtraAgiotas = () => {
    var lista = usuarios.filter(function (user) {
      if (user.agiota && user.cpf !== usuario.cpf) {
        return user;
      }
    });
    return lista;
  };
  return (
    <View>
      <FlatList
        data={filtraAgiotas()}
        renderItem={({item}) => renderizarListItem(item)}
        keyExtracto={({ cpf }) => cpf}
      />
    </View>
  );
}
