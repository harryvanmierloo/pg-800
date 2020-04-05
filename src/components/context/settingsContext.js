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

export { SettingsContext, SettingsProvider };