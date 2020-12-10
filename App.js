import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import main from "../Agendon/pantallas/main";

import contactos from "../Agendon/pantallas/contactos";
import nuevoContacto from "../Agendon/pantallas/nuevoContacto";
import modificarContacto from "../Agendon/pantallas/modificarContacto";

import calendario from "../Agendon/pantallas/calendario";
import nuevoEvento from "../Agendon/pantallas/nuevoEvento";
import modificarEvento from "../Agendon/pantallas/modificarEvento";

// const Auth = createStackNavigator();
// const AuthStack = () => (
//   <Auth.Navigator
//     screenOptions={{
//       animationEnabled: true,
//       headerShown: false,
//     }}
//   >
//     <Auth.Screen
//       name="nuevoContacto"
//       component={nuevoContacto}
//       headerMode="float"
//     />
//     <Auth.Screen
//       name="modificarContacto"
//       component={modificarContacto}
//       headerMode="float"
//     />
//   </Auth.Navigator>
// );

// const Drawer = createDrawerNavigator();
// const DrawerStack = () => (
//   <Drawer.Navigator initialRouteName="contactos">
//     <Drawer.Screen
//       name="Contactos"
//       component={contactos}
//       options={{
//         drawerIcon: ({ focused, size }) => (
//           <Ionicons
//             name="md-home"
//             size={size}
//             color={focused ? "#6bd1d4" : "#dcdcdc"}
//           />
//         ),
//       }}
//     />
//     <Drawer.Screen
//       name="Calendario"
//       component={calendario}
//       options={{
//         drawerIcon: ({ focused, size }) => (
//           <Ionicons
//             name="ios-bookmark"
//             size={size}
//             color={focused ? "#6bd1d4" : "#dcdcdc"}
//           />
//         ),
//       }}
//     />
//   </Drawer.Navigator>
// );

// const RootStack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <RootStack.Navigator headerMode="none">
//         <RootStack.Screen name="App" component={DrawerStack} />
//         <RootStack.Screen name="Auth" component={AuthStack} />
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// }

const stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <stack.Navigator headerMode="none" initialRouteName="main">
        <stack.Screen name="main" component={main} />

        <stack.Screen name="contactos" component={contactos} />
        <stack.Screen name="nuevoContacto" component={nuevoContacto} />
        <stack.Screen name="modificarContacto" component={modificarContacto} />

        <stack.Screen name="calendario" component={calendario} />
        <stack.Screen name="nuevoEvento" component={nuevoEvento} />
        <stack.Screen name="modificarEvento" component={modificarEvento} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
