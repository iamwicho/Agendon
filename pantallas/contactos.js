import React, { Component, useState, useEffect } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Form,
  Item,
  Label,
  Input,
  List,
  ListItem,
  Thumbnail,
  Fab,
  StyleProvider,
  getTheme,
  StatusBar,
  Toast,
  Center,
} from "native-base";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Image, FlatList, ScrollView } from "react-native";

import Axios from "axios";
import customTheme from "../variables";

function contactos({ navigation }) {
  const [listContactos, setListContactos] = useState([]);

  useEffect(() => {
    getContactos();
  }, []);

  const getContactos = async () => {
    let formData = new FormData();
    formData.append("option", "Todos");

    await Axios({
      method: "post",
      url: "http://192.168.1.11/Agendon/Agendon/api.php",
      data: formData,
      config: { headers: { "Content-type": "multipart/form-data" } },
    })
      .then((response) => {
        setListContactos(response.data);
        console.log(response.data);
        if (response.data.login == true) {
          navigation.navigate("main");
        }
      })
      .catch((error) => {
        console.log("Error login", error);
        alert("Algo salió mal, ingresa de nuevo tus datos");
      });
  };

  return (
    <StyleProvider style={getTheme(customTheme)}>
      <Container style={{ backgroundColor: "white" }}>
        <Header style={{ margin: 10, padding: 10 }}>
          <Body>
            <Title style={{ paddingLeft: 10, padding: 5, margin: 5 }}>
              Contactos
            </Title>
          </Body>
          <Right>
            <Icon style={{ margin: 10, color: "white" }} name="contact" />
          </Right>
        </Header>

        <FlatList
          rounded
          data={listContactos}
          keyExtractor={(item) => item.idContacto}
          renderItem={({ item }) => (
            <List
              style={{
                margin: 2,
                borderColor: "#723FFC",
                borderWidth: 1.5,
              }}
            >
              <ListItem
                avatar
                bottomDivider
                button
                onPress={() => {
                  navigation.navigate("modificarContacto", {
                    idContacto: item.idContacto,
                    nombres: item.nombres,
                    apellidos: item.apellidos,
                    apodo: item.apodo,
                    lugarTrabajo: item.lugarTrabajo,
                    telefono: item.telefono,
                    email: item.email,
                    direccion: item.direccion,
                    foto: item.foto,
                    notas: item.notas,
                  });
                }}
              >
                <Left>
                  <Thumbnail
                    style={{
                      width: 50,
                      height: 50,
                    }}
                    source={{ uri: item.foto }}
                  />
                </Left>

                <Body>
                  <Text>{item.nombres}</Text>
                  <Text note>{item.apellidos}</Text>
                  <Text note>{item.telefono}</Text>
                </Body>
                <Right></Right>
              </ListItem>
            </List>
          )}
        />

        <Footer>
          <FooterTab style={{ backgroundColor: "#723FFC" }}>
            <Button>
              <Icon
                name="ios-people"
                onPress={() => navigation.navigate("contactos")}
              />
              <Text>Contactos</Text>
            </Button>
            <Fab
              containerStyle={{ left: "42%" }}
              direction="up"
              style={{ backgroundColor: "#64DDED" }}
              onPress={() => navigation.navigate("nuevoContacto")}
            >
              <Icon name="add" />
            </Fab>
            <Button>
              <Icon
                name="calendar"
                onPress={() => navigation.navigate("calendario")}
              />
              <Text> Calendario</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </StyleProvider>
  );
}

export default contactos;
