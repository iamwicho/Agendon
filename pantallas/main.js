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

import customTheme from "../variables";

import Axios from "axios";
const uri = "https://i.ibb.co/k9mJknG/1-1-Logo.png";

function main({ navigation }) {
  return (
    <StyleProvider style={getTheme(customTheme)}>
      <Container>
        <Content style={{ backgroundColor: "#ffffff" }}>
          <Thumbnail
            style={{
              width: 350,
              height: 350,
              marginTop: 100,
              alignSelf: "center",
            }}
            source={{ uri: uri }}
          />
          <Text
            style={{
              marginTop: 10,
              alignSelf: "center",
              fontSize: 30,
            }}
          >
            Agend-ON
          </Text>
        </Content>

        <Footer>
          <FooterTab style={{ backgroundColor: "#723FFC" }}>
            <Button>
              <Icon
                name="ios-people"
                onPress={() => navigation.navigate("contactos")}
              />
              <Text>Contactos</Text>
            </Button>

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

export default main;
