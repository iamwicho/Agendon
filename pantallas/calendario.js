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
} from "native-base";

import { FlatList, ScrollView } from "react-native";

import customTheme from "../variables";

import Axios from "axios";

const uri = "https://i.ibb.co/cw1TGFF/calendar1.png";

function calendario({ navigation }) {
  const [listEventos, setListEventos] = useState([]);

  useEffect(() => {
    getEventos();
  }, []);

  const getEventos = async () => {
    let formData = new FormData();
    formData.append("option", "allEvents");

    await Axios({
      method: "post",
      url: "http://192.168.1.11/Agendon/Agendon/api.php",
      data: formData,
      config: { headers: { "Content-type": "multipart/form-data" } },
    })
      .then((response) => {
        setListEventos(response.data);
        console.log(response.data);
        if (response.data.login == true) {
          navigation.navigate("App");
        }
      })
      .catch((error) => {
        console.log("Error login", error);
        alert("Algo salió mal...");
      });
  };

  return (
    <StyleProvider style={getTheme(customTheme)}>
      <Container style={{ backgroundColor: "white" }}>
        <Header
          style={{
            margin: 10,
            padding: 10,
          }}
        >
          <Body>
            <Title style={{ paddingLeft: 10, padding: 5, margin: 5 }}>
              Calendario
            </Title>
          </Body>
          <Right>
            <Icon style={{ margin: 10, color: "white" }} name="time" />
          </Right>
        </Header>

        <FlatList
          data={listEventos}
          keyExtractor={(item) => item.idEvento}
          renderItem={({ item }) => (
            <List
              style={{
                margin: 5,
                borderColor: "#723FFC",
                borderWidth: 1.5,
              }}
              rounded
            >
              <ListItem
                avatar
                bottomDivider
                button
                onPress={() => {
                  navigation.navigate("modificarEvento", {
                    idEvento: item.idEvento,
                    nombre: item.nombre,
                    fecha: item.fecha,
                  });
                }}
              >
                <Left>
                  <Thumbnail
                    style={{ width: 50, height: 50 }}
                    source={{ uri: uri }}
                  />
                </Left>
                <Body>
                  <Text>{item.nombre}</Text>
                  <Text note>{item.fecha}</Text>
                </Body>
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
              onPress={() => navigation.navigate("nuevoEvento")}
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

export default calendario;
