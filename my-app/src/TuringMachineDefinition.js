import React from "react";
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css'; // Import Katex CSS
import Popup from "./GeneralComponents/Popup";


function TuringMachineDefinition({viewDefinitionPopup , changeViewDefinitionPopup} ) {
    return (
        <div>
            <Popup open={viewDefinitionPopup} setTrigger={(v ) => {
                changeViewDefinitionPopup(v);
            }}>
            <h1>Turing Machine Definition</h1>
            
            <p>A <a href="https://en.wikipedia.org/wiki/Turing_machine#:~:text=A%20Turing%20machine%20is%20a,A%20physical%20Turing%20machine%20model."
            target="_blank">Turing Machine</a> can be formally defined as a 7-tuple <InlineMath math = "M = <Q,\Gamma, b, \Sigma, \delta, q_0, F >"/> where</p>
            
            <ul>
              <li><InlineMath math = "Q"/>: finite set of states</li>
              <li><InlineMath math = "\Gamma"/>: finite tape alphabet set </li>
              <li><InlineMath math = "b \in \Gamma"/>: (blank symbol) </li>
              <li><InlineMath math = "\Sigma \subseteq \Gamma \setminus \{b \}"/>: set of input symbols</li>
              <li><InlineMath math = "\delta: (Q \setminus F) \times \Gamma \nrightarrow Q \times \Gamma \times \{ L,R \}"/> (transition partial function)</li>
              <li><InlineMath math = "q_0 \in Q"/>: initial state </li>
              <li><InlineMath math = "F \subseteq Q"/>: set of final/accepting states </li>
            </ul>
            </Popup>
  
        </div>
    );
}

export default TuringMachineDefinition;