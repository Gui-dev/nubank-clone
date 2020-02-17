import React from 'react';
import { MaterialIcons } from '@expo/vector-icons'
// import QRCode from 'react-native-qrcode'

import { 
  Container,
  Code,
  Nav,
  NavItem,
  NavText,
  SignOutButton,
  SignOutButtonText 
} from './style';

export default function Menu( { translateY } ) {
  return (
    <Container style={ {
      opacity: translateY.interpolate( {
        inputRange: [ 0, 150 ],
        outputRange: [ 0, 1 ]
      } )
    } }
    >
      <Code>
        {/* <QRCode 
          value="https://github.com/Gui-dev/nubank-clone"
          size={ 80 }
          fgColor="#FFF"
          bgColor="#8B10AE"
        />     */}
      </Code>    
      <Nav>

        <NavItem>
          <MaterialIcons name="help-outline" size={ 20 } color="#FFF" />
          <NavText>Me ajuda</NavText>
        </NavItem>

        <NavItem>
          <MaterialIcons name="person-outline" size={ 20 } color="#FFF" />
          <NavText>Perfil</NavText>
        </NavItem>

        <NavItem>
          <MaterialIcons name="credit-card" size={ 20 } color="#FFF" />
          <NavText>Configurar cartão</NavText>
        </NavItem>

        <NavItem>
          <MaterialIcons name="smartphone" size={ 20 } color="#FFF" />
          <NavText>Configurações do app</NavText>
        </NavItem>

      </Nav>

      <SignOutButton onPress={ () => {} }>
        <SignOutButtonText>SAIR DO APP</SignOutButtonText>
      </SignOutButton>
    </Container>
  );
}
