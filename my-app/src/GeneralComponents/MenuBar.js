import React, { useState } from "react";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css'; // Import Katex CSS


const MenuBar = () => {

    const [definitionModalOpen, setDefinitionModalOpen] = useState(false)

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Turing Machine Simulator
                    </Typography>
                    <Button color="inherit" onClick={() => { setDefinitionModalOpen(true); }}>See Definition</Button>
                </Toolbar>
            </AppBar>


            <Dialog open={definitionModalOpen} onClose={() => { setDefinitionModalOpen(false); }}>

                <DialogTitle>
                    <Typography id="about-modal-title" variant="h5" component="h2" gutterBottom>
                        Turing Machine Definition
                    </Typography></DialogTitle>

                <DialogContent>

                    <p>A <a href="https://en.wikipedia.org/wiki/Turing_machine#:~:text=A%20Turing%20machine%20is%20a,A%20physical%20Turing%20machine%20model."
                        target="_blank">Turing Machine</a> can be formally defined as a 7-tuple <InlineMath math="M = <Q,\Gamma, b, \Sigma, \delta, q_0, F >" /> where</p>

                    <ul>
                        <li><InlineMath math="Q" />: finite set of states</li>
                        <li><InlineMath math="\Gamma" />: finite tape alphabet set </li>
                        <li><InlineMath math="b \in \Gamma" />: (blank symbol) </li>
                        <li><InlineMath math="\Sigma \subseteq \Gamma \setminus \{b \}" />: set of input symbols</li>
                        <li><InlineMath math="\delta: (Q \setminus F) \times \Gamma \nrightarrow Q \times \Gamma \times \{ L,R \}" /> (transition partial function)</li>
                        <li><InlineMath math="q_0 \in Q" />: initial state </li>
                        <li><InlineMath math="F \subseteq Q" />: set of final/accepting states </li>
                    </ul>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setDefinitionModalOpen(false); }}>Close</Button>
                </DialogActions>
            </Dialog>



        </div>
    );
};

export default MenuBar;
