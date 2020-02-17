import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { Animated } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

import Header from './../../components/Header'
import Tabs from './../../components/Tabs'
import Menu from './../../components/Menu'
import { 
  Container, 
  Content, 
  Card, 
  CardHeader, 
  CardContent, 
  Button,
  CardFooter,
  Title,
  Description,
  Annotation
} from './style';

export default function Main() {

  let offset = 0
  const [ visibility, setVisibility ] = useState( false )
  const translateY = new Animated.Value( 0 )

  const animatedEvent = Animated.event( [
    {
      nativeEvent: { trasnlationY: translateY }
    }
  ], {
    useNativeDriver: true
  } )

  const onHandlerStateChanged = ( event ) => {
    if( event.nativeEvent.oldState === State.ACTIVE ) {
      let opened = false
      const { translateY } = event.nativeEvent

      offset += translateY

      if( translateY >= 100 ) {
        opened = true

        Animated.timing( translateY, {
          toValue: 330,
          duration: 200,
          useNativeDriver: true
        } ).start()
      } else {
        translateY.setOffset( 0 )
        translateY.setValue( offset )
        offset = 0
      }

      Animated.timing( translateY, {
        toValue: opened ? 330 : 0,
        duration: 200,
        useNativeDriver: true
      } ).start( () => {
        offset = opened ? 330 : 0
        translateY.setOffset( offset )
        translateY.setValue( 0 )
      } )

    }
  }

  return (
    <Container>

      <Header />
    
      <Content>

        <Menu translateY={ translateY }/>

        <PanGestureHandler
          onGestureEvent={ animatedEvent }
          onHandlerStateChange={ onHandlerStateChanged }
        >
          <Card style={ {
            transform: [ {
              translateY: translateY.interpolate( {
                inputRange: [ -350, 0, 330],
                outputRange: [ -50, 0, 330 ],
                extrapolate: "clamp"
              } )
            } ]
          } }>
            <CardHeader>
              <MaterialIcons name="attach-money" size={28} color="#CCC" />
              <Button onPress={ () => setVisibility( !visibility ) }>
                { visibility 
                  ? <MaterialIcons name="visibility-off" size={28} color="#CCC" /> 
                  : <MaterialIcons name="visibility" size={28} color="#CCC" />
                }
              </Button>
            </CardHeader>

            <CardContent>
              <Title>Saldo disponível</Title>
              { visibility && <Description>R$ 197.611,65</Description> }
            </CardContent>

            <CardFooter>
              <Annotation>
                Transferência de R$ 20,00 recebida de Gui Silva hoje às 18:00hs
              </Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>

      </Content>

      <Tabs translateY={ translateY }/>
    </Container>
  );
}
