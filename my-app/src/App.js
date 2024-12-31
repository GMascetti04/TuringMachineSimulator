import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  Button, StyleSheet, TextInput, View, Pressable, Text

} from 'react-native-web';


import TMEditorComponent from './EditorComponents/TMEditorComponent.js'
import MachineSimulatorComponent from './SimulatorComponents/MachineSimulator.js';
import MenuBar from './GeneralComponents/MenuBar.js';



function App() {
  const [curTM, changeCurTM] = useState(null);
  const [viewTMDefinition, changeVewTMDefinition] = useState(false);
  const [allowEdit, changeAllowEdit] = React.useState(true);

  useEffect(() => {

    console.log("asd");
    changeCurTM({
      InitialState: "init",
      Blank: "0",
      InputAlphabet: ["a"],
      TapeAlphabet: [],
      States: new Map([
        ["init", {
          isFinalState: false, Transitions: new Map([
            ["a", { newState: "init", writeChar: "0", tapeMove: "R" }],
            ["0", { newState: "final", writeChar: "0", tapeMove: "R" }]
          ]
          )
        }],
        ["final", { isFinalState: true, Transitions: new Map() }]
      ])
    });

  }, []);


  return (
    <div>

      <MenuBar />

      <div className='stay'>
        <MachineSimulatorComponent turingMachine={curTM} setEdit={function (v) {
          changeAllowEdit(v);
        }} allowEdit={allowEdit} />
      </div>

      <div className='move'>
        <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <TMEditorComponent curTM={curTM}
            createState={(s) => {
              if (curTM != null && curTM != undefined) {
                changeCurTM({
                  ...curTM, States: curTM.States.set(s, {
                    isFinalState: false,
                    Transitions: new Map()
                  })
                });
              }
            }}
            setInitialState={(s) => {
              if (curTM != null && curTM != undefined) {
                changeCurTM({ ...curTM, InitialState: s });
              }
            }}
            setFinalState={(state, value) => {
              if (curTM != null && curTM != undefined) {
                changeCurTM({
                  ...curTM, States: curTM.States.set(state, {
                    isFinalState: value,
                    Transitions: curTM.States.get(state)?.Transitions
                  })
                });
              }
            }}
            addTransition={(curState, readChar, newState, writeChar, tapeMove) => {
              if (curTM != null && curTM != undefined) {
                changeCurTM({
                  ...curTM, States: curTM.States.set(curState, {
                    isFinalState: curTM.States.get(curState)?.isFinalState,
                    Transitions: curTM.States.get(curState)?.Transitions.set(readChar, {
                      newState: newState,
                      writeChar: writeChar,
                      tapeMove: tapeMove
                    })
                  })
                });
              }
            }}
            deleteTransition={(curState, readChar) => {
              if (curTM != null && curTM != undefined) {
                curTM.States.get(curState)?.Transitions.delete(readChar);
                changeCurTM({
                  ...curTM, States: curTM.States.set(curState, {
                    isFinalState: curTM.States.get(curState)?.isFinalState,
                    Transitions: curTM.States.get(curState)?.Transitions
                  })
                });
              }
            }}
            deleteState={(stateName) => {
              if (curTM != null && curTM != undefined) {
                curTM.States.delete(stateName);
                changeCurTM({ ...curTM, States: curTM.States });
              }
            }} addInputAlphabetChar={(newInputChar) => {
              if (curTM != null && curTM != undefined) {
                curTM.InputAlphabet?.push(newInputChar);
                changeCurTM({ ...curTM, InputAlphabet: curTM.InputAlphabet });
              }
            }} deleteInputAlphabetChar={(index) => {
              if (curTM != null && curTM != undefined) {
                curTM.InputAlphabet?.splice(index, 1);
                changeCurTM({ ...curTM, InputAlphabet: curTM.InputAlphabet });
              }

            }} addTapeAlphabetChar={(newTapeChar) => {
              if (curTM != null && curTM != undefined) {
                curTM.TapeAlphabet?.push(newTapeChar);
                changeCurTM({ ...curTM, TapeAlphabet: curTM.TapeAlphabet });
              }
            }} deleteTapeAlphabetChar={(index) => {
              if (curTM != null && curTM != undefined) {
                curTM.TapeAlphabet?.splice(index, 1);
                changeCurTM({ ...curTM, TapeAlphabet: curTM.TapeAlphabet });
              }
            }} allowEditing={allowEdit} />


        </View>

      </div>
    </div>

  );
}

export default App;
