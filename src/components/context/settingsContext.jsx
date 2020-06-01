import React, {useState} from 'react';
import WebMidi from "webmidi";

const SettingsContext = React.createContext([{}, () => {}]);
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
      switch (retrievedData.synth) {
        case "JX-8P" || "JX8P": // Backwards compatibility with older local storage value
          initialSettings.synth = "JX8P";
          break;
        case "JX-10" || "JX10": // Backwards compatibility with older local storage value
          initialSettings.synth = "JX10";
          break;
        case "MKS-70" || "MKS70" || "MKS": // Backwards compatibility with older local storage value
          initialSettings.synth = "MKS";
          break;
        default: 
          initialSettings.synth = retrievedData.synth;
          break;;
      }
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

export { SettingsContext, SettingsProvider };