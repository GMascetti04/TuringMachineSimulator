import React from 'react';
import { useState } from 'react';

import {View, Text,
    Button,StyleSheet, TextInput, Pressable,
    
  } from 'react-native';

export const Switch = ({ isOn  ,  handleToggle, idnum, allowEditing } : any) => {
    return (
      <>
        <input
          checked={isOn}
          onChange={handleToggle}
          className="react-switch-checkbox"
          id={'react-switch-new' + idnum}
          type="checkbox"
          disabled = {!allowEditing}
        />
        <label
          className="react-switch-label"
          htmlFor={`react-switch-new`+ idnum}
        >
          <span className={`react-switch-button`} />
        </label>
      </>
    );
  };