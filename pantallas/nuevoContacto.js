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
  Grid,
  Row,
  Col,
} from "native-base";
import Axios from "axios";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import customTheme from "../variables";
import { TouchableWithoutFeedback } from "react-native";

function nuevoContacto({ navigation }) {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [apodo, setApodo] = useState("");
  const [lugarTrabajo, setLugarTrabajo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [foto, setFoto] = useState(
    "https://facebook.github.io/react-native/docs/assets/favicon.png"
  );
  const [notas, setNotas] = useState("");

  const handlesubmit = async () => {
    let formData = new FormData();

    formData.append("option", "createContact");
    formData.append("nombres", nombres);
    formData.append("apellidos", apellidos);
    formData.append("apodo", apodo);
    formData.append("lugarTrabajo", lugarTrabajo);
    formData.append("telefono", telefono);
    formData.append("email", email);
    formData.append("direccion", direccion);
    formData.append("foto", foto);
    formData.append("notas", notas);

    if (nombres && telefono) {
      await Axios({
        method: "post",
        url: "http://192.168.1.11/Agendon/Agendon/api.php",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((response) => {
          console.log("Respuesta de conexión: ", response);
          alert("Elemento creado correctamente");
          navigation.navigate("main");
        })

        .catch((error) => {
          console.log("Error de conexión: ", error);
          alert("No se pudo crear el contacto correctamente");
        });
    } else {
      alert(
        "Datos Incompletos: Es necesario completar mínimo los campos de [Nombres y Número de teléfono]"
      );
      navigation.navigate("nuevoContacto");
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
                onPress={() => navigation.navigate("contactos")}
              />
            </Button>
          </Left>

          <Title style={{ margin: 10, alignSelf: "center", fontSize: 18 }}>
            Nuevo Contacto
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
            source={{ uri: uri }}
          />

          <Form style={{ marginLeft: 10, marginRight: 10 }}>
            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="person" />

              <Input
                placeholder="Nombre(s)"
                value={nombres}
                onChangeText={setNombres}
              />
            </Item>

            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="remove" />
              <Input
                placeholder="Apellidos(s)"
                value={apellidos}
                onChangeText={setApellidos}
              />
            </Item>

            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="body" />
              <Input
                placeholder="Apodo"
                value={apodo}
                onChangeText={setApodo}
              />
            </Item>

            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="business" />
              <Input
                placeholder="Lugar de Trabajo"
                value={lugarTrabajo}
                onChangeText={setLugarTrabajo}
              />
            </Item>

            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="call" />
              <Input
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
              />
            </Item>

            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="mail" />
              <Input
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
              />
            </Item>

            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="pin" />
              <Input
                placeholder="Dirección"
                value={direccion}
                onChangeText={setDireccion}
              />
            </Item>
            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="image" />
              <Input
                placeholder="Ruta-Foto"
                value={foto}
                onChangeText={setFoto}
              />
            </Item>
            <Item style={{ marginTop: 10 }} rounded>
              <Icon name="bookmark" />
              <Input
                placeholder="Notas"
                value={notas}
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

export default nuevoContacto;
