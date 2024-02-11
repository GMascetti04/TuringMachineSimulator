import React from 'react';
import { useState } from 'react';

  import 'katex/dist/katex.min.css'; // Import Katex CSS



function TransitionComponent({curState, readChar, newState, writeChar, tapeMove, onDelete, allowEditing} ) {




    return (
        <div>
            
            ({curState}, {readChar}) -&gt; ({newState}, {writeChar}, {tapeMove}) 
            
        
            <button disabled = {!allowEditing} type = "button" onClick={() => onDelete()}> Delete</button>
        </div>
        


            
    );
}

export default TransitionComponent;