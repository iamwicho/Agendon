import React, { useState } from "react";
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
  Row,
  Col,
  Grid,
  View,
} from "native-base";
import Axios from "axios";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import customTheme from "../variables";
import { TouchableWithoutFeedback } from "react-native";

import { Calendar, CalendarList } from "react-native-calendars";
const testIDs = require("../assets/testIDs");

function modificarEvento({ navigation, route }) {
  const [selectedDate, setSelectedDate] = React.useState("2020-12-08");
  const [markedDates, setMarkedDates] = React.useState("");

  const setNewDaySelected = (date) => {
    const markedDate = Object.assign({});
    markedDate[date] = {
      selected: true,
      selectedColor: "#723FFC",
    };

    setFecha(date);
    setSelectedDate(date);
    setMarkedDates(markedDate);
  };

  const { idEvento, nombre, fecha } = route.params;

  const [nombreE, setNombre] = useState(nombre);
  const [fechaE, setFecha] = useState(fecha);

  const handleUpdate = async () => {
    let formData = new FormData();

    formData.append("option", "updateEvent");
    formData.append("idEvento", idEvento);
    formData.append("nombre", nombreE);
    formData.append("fecha", fechaE);

    await Axios({
      method: "post",
      url: "http://192.168.1.11/Agendon/Agendon/api.php",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((response) => {
        console.log("Respuesta de conexión: ", response);
        alert("Elemento editado correctamente");
        navigation.navigate("main");
      })

      .catch((error) => {
        console.log("Error de conexión: ", error);
        alert("No se pudo editar el evento correctamente");
      });
  };

  const handleDelete = async () => {
    let formData = new FormData();

    formData.append("option", "deleteEvent");
    formData.append("idEvento", idEvento);

    await Axios({
      method: "post",
      url: "http://192.168.1.11/Agendon/Agendon/api.php",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((response) => {
        console.log("Respuesta de conexión: ", response);
        alert("Elemento eliminado correctamente");
        navigation.navigate("main");
      })

      .catch((error) => {
        console.log("Error de conexión: ", error);
        alert("No se pudo eliminar el evento correctamente");
      });
  };

  const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

  return (
    <StyleProvider style={getTheme(customTheme)}>
      <Container style={{ backgroundColor: "transparent" }}>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                name="backspace"
                onPress={() => navigation.navigate("calendario")}
              />
            </Button>
          </Left>

          <Title style={{ margin: 10, alignSelf: "center", fontSize: 18 }}>
            Editar Evento
          </Title>
          <Right />
        </Header>
        <Content>
          <Calendar
            testID={testIDs.horizontalList.CONTAINER}
            markedDates={markedDates}
            current={selectedDate}
            pastScrollRange={24}
            futureScrollRange={24}
            horizontal
            pagingEnabled
            onDayPress={(day) => {
              setNewDaySelected(day.dateString);
            }}
          />
          <Form style={{ marginLeft: 10, marginRight: 10 }}>
            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="remove" />

              <Input
                placeholder="Nombre del Evento"
                value={nombreE}
                onChangeText={setNombre}
              />
            </Item>
          </Form>
        </Content>
        <Footer style={{ backgroundColor: "none" }}>
          <Button
            style={{
              backgroundColor: "#64DDED",
              width: 150,
              height: 40,
              margin: 10,
            }}
            onPress={handleUpdate}
            rounded
          >
            <Icon name="save" />
            <Text> Guardar </Text>
          </Button>
          <Button
            style={{
              backgroundColor: "#ff0000",
              width: 150,
              height: 40,
              margin: 10,
            }}
            onPress={handleDelete}
            rounded
          >
            <Icon name="trash" />
            <Text> Eliminar</Text>
          </Button>
        </Footer>
      </Container>
    </StyleProvider>
  );
}

export default modificarEvento;
