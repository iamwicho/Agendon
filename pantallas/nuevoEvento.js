import React, { useState, useEffect } from "react";
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
  Grid,
  Row,
  Col,
  DatePicker,
} from "native-base";
import Axios from "axios";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import customTheme from "../variables";
import { TouchableWithoutFeedback } from "react-native";

import { Calendar, CalendarList } from "react-native-calendars";
const testIDs = require("../assets/testIDs");

function nuevoEvento({ navigation }) {
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

  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");

  const handlesubmit = async () => {
    let formData = new FormData();

    formData.append("option", "createEvent");
    formData.append("nombre", nombre);
    formData.append("fecha", fecha);

    if (nombre && fecha) {
      await Axios({
        method: "post",
        url: "http://192.168.1.11/Agendon/Agendon/api.php",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((response) => {
          console.log("Respuesta de conexión: ", response);
          alert("Evento creado correctamente");
          navigation.navigate("main");
        })

        .catch((error) => {
          console.log("Error de conexión: ", error);
          alert("No se pudo crear el evento correctamente");
        });
    } else {
      alert(
        "Datos Incompletos: Es necesario completar mínimo los campos de [Nombre y Fecha]"
      );
      navigation.navigate("nuevoEvento");
    }
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
            Nuevo Evento
          </Title>
          <Right />
        </Header>

        <Content>
          <Text
            style={{
              margin: 10,
              alignSelf: "center",
              fontSize: 18,
            }}
          >
            Selecciona tu fecha:
          </Text>
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
              <Icon name="add" />

              <Input
                placeholder="Nombre del Evento"
                value={nombre}
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
            onPress={handlesubmit}
            rounded
          >
            <Icon name="save" />
            <Text> Guardar </Text>
          </Button>
        </Footer>
      </Container>
    </StyleProvider>
  );
}

export default nuevoEvento;
