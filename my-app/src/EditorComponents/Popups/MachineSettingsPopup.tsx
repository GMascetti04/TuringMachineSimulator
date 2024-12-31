import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  View, Text,
  StyleSheet, TextInput, Pressable,

} from 'react-native';


import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MachineSettings, MachineSpeed } from '../../TM';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const marks = [
  {
    value: MachineSpeed.STEP_BY_STEP,
    label: 'Slowest',
  },

  {
    value: MachineSpeed.INSTANT,
    label: 'Fastest',
  }
];

function valuetext(value: number) {
  switch (value) {
    case MachineSpeed.STEP_BY_STEP: return "Step-By-Step";
    case MachineSpeed.SLOW: return "Slow";
    case MachineSpeed.MEDIUM: return "Medium";
    case MachineSpeed.FAST: return "Fast";
    case MachineSpeed.INSTANT: return "Instant";

    default: return "UNKOWN";
  }
}

function validInputString(s: string) : string {
  if (s.length == 0) {
      return "Enter number";
  }
  let a = Number(s);
  if (Number.isNaN(a)) {
      return "must be a number";
  }
  if (a < 0) {
      return "cannot be negative";
  }
  return "";
}


function MachineSettingsPopup({ shouldDisplay, curMaxTransitions, curSpeed, 
  curLeftTapeSize, changeCurLeftTapeSize, curRightTapeSize, changeCurRightTapeSize,  changeCurSpeed, changeCurMaxTransitions, onClose, onUpdateSettings }) {

    const leftTapeErrorMsg : string = validInputString(curLeftTapeSize);
    const rightTapeErrorMsg : string = validInputString(curRightTapeSize);
    const maxTransitionsErrorMsg : string = validInputString(curMaxTransitions);


    const allowUpdate : boolean = leftTapeErrorMsg.length == 0 && 
                                  rightTapeErrorMsg.length == 0 &&
                                  maxTransitionsErrorMsg.length==0;
    

  return (
    <Modal
      open={shouldDisplay}
      onClose={() => { onClose(); }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>

        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Text>Machine Speed</Text>
          </Grid>
          <Grid item xs={6} md={4}>
            <Slider
              aria-label="Always visible"
              //defaultValue={curMachineSettings.machineSpeed}
              max={MachineSpeed.INSTANT}
              value={curSpeed}
              onChange={(event: Event, a: number | number[]) => {
                if (typeof a === 'number')
                  changeCurSpeed(a);
              }}
              getAriaValueText={valuetext}
              valueLabelFormat={valuetext}
              step={1}
              marks={marks}
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item xs={6} md={8}>
            <Text>Max Transition</Text>
          </Grid>
          <Grid item xs={6} md={4}>
          <TextField
          error = {maxTransitionsErrorMsg.length != 0}
          id="standard-error-helper-text"
          //defaultValue={curMachineSettings.maximumTransitions.toString()}
          helperText={maxTransitionsErrorMsg}
          variant="standard"
          value={curMaxTransitions}
  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    changeCurMaxTransitions(event.target.value);
  }}
        /> 
          </Grid>

          <Grid item xs={6} md={8}>
            <Text>Left Tape Size</Text>
          </Grid>
          <Grid item xs={6} md={4}>
          <TextField
          error = {leftTapeErrorMsg.length != 0}
          id="standard-error-helper-text"
          //defaultValue={curMachineSettings.maximumTransitions.toString()}
          helperText={leftTapeErrorMsg}
          variant="standard"
          value={curLeftTapeSize}
  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    changeCurLeftTapeSize(event.target.value);
  }}
        /> 
          </Grid>

          <Grid item xs={6} md={8}>
            <Text>Right Tape Size</Text>
          </Grid>
          <Grid item xs={6} md={4}>
          <TextField
          error = {rightTapeErrorMsg.length != 0}
          id="standard-error-helper-text"
          //defaultValue={curMachineSettings.maximumTransitions.toString()}
          helperText={rightTapeErrorMsg}
          variant="standard"
          value={curRightTapeSize}
  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
    changeCurRightTapeSize(event.target.value);
  }}
        /> 
          </Grid>




        </Grid>

       <Button onClick = {() => {
        onUpdateSettings();
        onClose();
       }} disabled={!allowUpdate}>Apply</Button>


      </Box>
    </Modal>
  );
}

export default MachineSettingsPopup;