import React from 'react';
import { useState } from 'react';

import MachineSettingsPopup from '../EditorComponents/Popups/MachineSettingsPopup.tsx';
import { MachineSpeed } from '../TM';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Text } from 'react-native-web';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


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

function MachineSettings({leftTapeSize, rightTapeSize, machineSpeed, maxTransitions, onChangeSettings} : 
    {leftTapeSize: number, rightTapeSize: number, machineSpeed: number, maxTransitions : number,
        onChangeSettings: (leftTapeSize: number, rightTapeSize: number, machineSpeed: number, maxTransitions: number)=> void
    }
) {
    const [displaySettingsModal, changeDisplaySettingsModal] = React.useState(false);


    const [curMachineSpeed, changeCurMachineSpeed] = React.useState(MachineSpeed.MEDIUM);
    const [curEditMaxTrans, changeCurEditMaxTrans] = React.useState(100);
    const [curLeftTapeSize, changeCurLeftTapeSize] = React.useState(0);
    const [curRightTapeSize, changeCurRightTapeSize] = React.useState(0);



    return (
        <Box>
            
            <Grid container spacing={1} columns={4}>
                <Grid item xs={2}>
                    <Text>Left Tape Size:</Text>
                </Grid>
                <Grid item xs={2}>
                    <Text>{leftTapeSize}</Text>
                </Grid>

                <Grid item xs={2}>
                    <Text>Right Tape Size:</Text>
                </Grid>
                <Grid item xs={2}>
                    <Text>{rightTapeSize}</Text>
                </Grid>

                <Grid item xs={2}>
                    <Text>Machine Speed:</Text>
                </Grid>
                <Grid item xs={2}>
                    <Text>{valuetext(machineSpeed)}</Text>
                </Grid>

                <Grid item xs={2}>
                    <Text>Maximum Transitions:</Text>
                </Grid>
                <Grid item xs={2}>
                    <Text>{maxTransitions}</Text>
                </Grid>

            </Grid>

            <Button variant="outlined" onClick={() => {
                changeCurMachineSpeed(machineSpeed);
                changeCurEditMaxTrans(maxTransitions);
                changeCurLeftTapeSize(leftTapeSize);
                changeCurRightTapeSize(rightTapeSize);
                changeDisplaySettingsModal(true);
            }} startIcon={<EditIcon />}>
                Edit
            </Button>

            <MachineSettingsPopup shouldDisplay={displaySettingsModal} curMaxTransitions={curEditMaxTrans}
                curSpeed={curMachineSpeed} changeCurMaxTransitions={(a) => { changeCurEditMaxTrans(a); }} changeCurSpeed={(a) => { changeCurMachineSpeed(a); }}
                onClose={() => { changeDisplaySettingsModal(false); }}
                onUpdateSettings={() => {
                    onChangeSettings(curLeftTapeSize, curRightTapeSize, curMachineSpeed, curEditMaxTrans);
                    //updateMachineSettings(curMachineSpeed, changeCurMachineSettings, curEditMaxTrans, changeCurEditMaxTrans, curLeftTapeSize, curRightTapeSize, curTapeWriter);
                }}
                curLeftTapeSize={curLeftTapeSize} changeCurLeftTapeSize={(a) => { changeCurLeftTapeSize(a); }}
                curRightTapeSize={curRightTapeSize} changeCurRightTapeSize={(a) => { changeCurRightTapeSize(a); }}
            >

            </MachineSettingsPopup>
        </Box>
    );
}


export default MachineSettings;