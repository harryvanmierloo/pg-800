import React, {useState} from 'react';
import WebMidi from "webmidi";
import MKS from '../MKS-70/MKS-70';

const initialState = () => {
  let defaultParameterValues = [];
  for (let p = 0; p < 59; p++) {
    // Use defined default parameter value, otherwise 0
    let defaultValue = MKS.parameters[p].defaultValue ? MKS.parameters[p].defaultValue : 0;
    defaultParameterValues.push(defaultValue);
  }
  return { values: defaultParameterValues };
}

const StateContext = React.createContext([{}, () => {}]);
const SettingsContext = React.createContext([{}, () => {}]);

const StateProvider = (props) => {
  const [state, setState] = useState(initialState);

  return (
    <StateContext.Provider value={[ state, setState ]}>
      { props.children }
    </StateContext.Provider>
  );
};

const SettingsProvider = (props) => {

  let initialSettings = {
    synth: "MKS",
    midiIn: WebMidi.inputs[0],
    midiOut: WebMidi.outputs[0],
    midiChannelA: 1,
    midiChannelB: 1,
    midiControlChannel: 1,
  }

  // Retrieve the local storage object
  // NEEDS ATTENTION, BECAUSE GET CALLED DURING EVERY UPDATE
  const retrievedData = JSON.parse(localStorage.getItem('PG-800'));

  if (retrievedData) {
    if (retrievedData.synth) {
      initialSettings.synth = retrievedData.synth;
    }
    if (WebMidi.getInputByName(retrievedData.midiIn) !== false) {
        initialSettings.midiIn = WebMidi.getInputByName(retrievedData.midiIn);
    }
    if (WebMidi.getInputByName(retrievedData.midiOut) !== false) {
        initialSettings.midiOut = WebMidi.getOutputByName(retrievedData.midiOut);        
    }
    if (retrievedData.midiChannelA) {
      initialSettings.midiChannelA = retrievedData.midiChannelA;
    }
    if (retrievedData.midiChannelB) {
      initialSettings.midiChannelB = retrievedData.midiChannelB;
    }
    if (retrievedData.midiControlChannel) {
      initialSettings.midiControlChannel = retrievedData.midiControlChannel;
    }
  }

  const [settings, setSettings] = useState(initialSettings);

  return (
    <SettingsContext.Provider value={[ settings, setSettings ]}>
      { props.children }
    </SettingsContext.Provider>
  );
};

export { StateContext, SettingsContext, StateProvider, SettingsProvider };