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
import { RefreshControl, TouchableWithoutFeedback } from "react-native";

function modificarContacto({ navigation, route }) {
  const {
    idContacto,
    nombres,
    apellidos,
    apodo,
    lugarTrabajo,
    telefono,
    email,
    direccion,
    foto,
    notas,
  } = route.params;

  const [nombresE, setNombres] = useState(nombres);
  const [apellidosE, setApellidos] = useState(apellidos);
  const [apodoE, setApodo] = useState(apodo);
  const [lugarTrabajoE, setLugarTrabajo] = useState(lugarTrabajo);
  const [telefonoE, setTelefono] = useState(telefono);
  const [emailE, setEmail] = useState(email);
  const [direccionE, setDireccion] = useState(direccion);
  const [fotoE, setFoto] = useState(foto);
  const [notasE, setNotas] = useState(notas);

  const handleUpdate = async () => {
    let formData = new FormData();

    formData.append("option", "updateContact");
    formData.append("idContacto", idContacto);
    formData.append("nombres", nombresE);
    formData.append("apellidos", apellidosE);
    formData.append("apodo", apodoE);
    formData.append("lugarTrabajo", lugarTrabajoE);
    formData.append("telefono", telefonoE);
    formData.append("email", emailE);
    formData.append("direccion", direccionE);
    formData.append("foto", fotoE);
    formData.append("notas", notasE);

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
        alert("No se pudo editar el contacto correctamente");
      });
  };

  const handleDelete = async () => {
    let formData = new FormData();

    formData.append("option", "deleteContact");
    formData.append("idContacto", idContacto);

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
        alert("No se pudo eliminar el contacto correctamente");
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
                onPress={() => navigation.navigate("contactos")}
              />
            </Button>
          </Left>

          <Title style={{ margin: 10, alignSelf: "center", fontSize: 18 }}>
            Editar contacto
          </Title>
          <Right />
        </Header>
        <Content>
          <Thumbnail
            style={{
              width: 80,
              height: 80,
              marginTop: 10,
              alignSelf: "center",
            }}
            source={{ uri: foto }}
          />

          <Form style={{ marginLeft: 10, marginRight: 10 }}>
            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="person" />

              <Input
                placeholder="Nombre(s)"
                value={nombresE}
                onChangeText={setNombres}
              />
            </Item>

            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="remove" />
              <Input
                placeholder="Apellidos(s)"
                value={apellidosE}
                onChangeText={setApellidos}
              />
            </Item>

            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="body" />
              <Input
                placeholder="Apodo"
                value={apodoE}
                onChangeText={setApodo}
              />
            </Item>

            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="business" />
              <Input
                placeholder="Lugar de Trabajo"
                value={lugarTrabajoE}
                onChangeText={setLugarTrabajo}
              />
            </Item>

            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="call" />
              <Input
                placeholder="Teléfono"
                value={telefonoE}
                onChangeText={setTelefono}
              />
            </Item>

            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="mail" />
              <Input
                placeholder="Correo Electrónico"
                value={emailE}
                onChangeText={setEmail}
              />
            </Item>

            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="pin" />
              <Input
                placeholder="Domicilio"
                value={direccionE}
                onChangeText={setDireccion}
              />
            </Item>

            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="image" />
              <Input
                placeholder="Ruta-Foto"
                value={fotoE}
                onChangeText={setFoto}
              />
            </Item>
            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="bookmark" />
              <Input
                placeholder="Notas"
                value={notasE}
                onChangeText={setNotas}
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
            onPressIn={handleUpdate}
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

export default modificarContacto;
