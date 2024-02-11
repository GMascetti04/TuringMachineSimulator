import React from 'react';
import { useState } from 'react';
import {
  Button,StyleSheet, TextInput,View, Pressable,Text
  
} from 'react-native';


function MyButton(props ) {

    const [hoveredOver, changeHoveredOver]  = useState(false);

    return (
        <Pressable onHoverIn = {() => changeHoveredOver(true)}
        onHoverOut = {() => changeHoveredOver(false)}
        style={({pressed}) => [
            {
              backgroundColor: hoveredOver ? 'rgb(210, 230, 255)' : 'white',
              width: (props.width == undefined) ? 100 : props.width
            },
            
          ]}
          onPress = {()=> props.onPressCallback()}
        disabled = {props.disabled}
        >
            <Text> {props.text} </Text>
        </Pressable>
    );
}

export default MyButton;