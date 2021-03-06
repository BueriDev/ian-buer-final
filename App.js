import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Canvas from 'react-native-canvas';
import { Alert } from 'react-native-web';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import mbCHIP8 from './mbCHIP8';
import CHIP8Keypad from './mbCHIP8/keypad';
import CHIP8Screen from './mbCHIP8/screen';

// CHIP-8 used for testing purposes
const logo_rom = [
	// Offset 0x00000000 to 0x0000011F
	0x00, 0xE0, 0x60, 0x00, 0x61, 0x00, 0x62, 0x08, 0xA2, 0x20, 0x40, 0x40,
	0x22, 0x1A, 0x41, 0x20, 0x12, 0x10, 0xD0, 0x18, 0xF2, 0x1E, 0x70, 0x08,
	0x12, 0x0A, 0x60, 0x00, 0x71, 0x08, 0x00, 0xEE, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x7F, 0x40, 0x5F, 0x50, 0x57, 0x54, 0x54, 0x00, 0xFC, 0x04, 0xF4,
	0x14, 0xD4, 0x54, 0x54, 0x00, 0x3F, 0x20, 0x2F, 0x28, 0x2B, 0x2A, 0x2A,
	0x00, 0xFE, 0x02, 0xFA, 0x0A, 0xEA, 0x2A, 0x2A, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x54, 0x54, 0x54, 0x54, 0x54, 0x54, 0x74, 0x00,
	0x54, 0x54, 0x54, 0x54, 0x74, 0x00, 0x00, 0x00, 0x2A, 0x2A, 0x2A, 0x2A,
	0x2A, 0x2A, 0x3B, 0x00, 0x2A, 0x2A, 0x2A, 0x2A, 0x2A, 0x2A, 0xEE, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x74, 0x54, 0x54, 0x54,
	0x54, 0x54, 0x54, 0x54, 0x00, 0x00, 0x74, 0x54, 0x54, 0x54, 0x54, 0x54,
	0x3B, 0x2A, 0x2A, 0x2A, 0x2A, 0x2A, 0x2A, 0x2A, 0xEE, 0x2A, 0x2A, 0x2A,
	0x2A, 0x2A, 0x2A, 0x2A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x54, 0x54, 0x57, 0x50, 0x5F, 0x40, 0x7F, 0x00, 0x54, 0x54, 0xD4, 0x14,
	0xF4, 0x04, 0xFC, 0x00, 0x2A, 0x2A, 0x2B, 0x28, 0x2F, 0x20, 0x3F, 0x00,
	0x2A, 0x2A, 0xEA, 0x0A, 0xFA, 0x02, 0xFE, 0x00, 0x00, 0x00, 0x00, 0x00,
	0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
];


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.shutdown();
  }

  componentDidUpdate(prevProps, prevState)
  {
  }

  async init() {
    try {
      let init_res = await mbCHIP8.init();
      if (!init_res) {
        throw "mbCHIP8 could not be initialized!";
      }

      let rom_res = await mbCHIP8.loadROM(logo_rom);

      if (!rom_res) {
        throw "Could not start mbCHIP8.";
      }

      await this.runCore();
      await this.render();
    } catch (ex) {
      console.error(ex);
    }
  }

  async shutdown() {
    try {
      await mbCHIP8.shutdown();
    } catch (ex) {
      console.error(ex);
    }
  }

  async runCore() {
    try {
      for (var i = 0; i < 25; i++)
      {
        await mbCHIP8.run();
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  async keyPressed(key) {
    try {
      await mbCHIP8.keyChanged(key, true);
    } catch (ex) {
      console.error(ex);
    }
  }

  async keyReleased(key) {
    try {
      await mbCHIP8.keyChanged(key, false);
    } catch (ex) {
      console.error(ex);
    }
  }

  async getPixel(x, y)
  {
    let res = await mbCHIP8.getPixel(x, y);
    return res;
  }

  async renderScreen(canvas)
  {
    const ctx = canvas.getContext('2d');
    for (var i = 0; i < 64; i++)
    {
      for (var j = 0; j < 32; j++)
      {
        let res = await this.getPixel(i, j);
        if (res)
        {
          ctx.fillStyle = "rgb(255,255,255)";
        }
        else
        {
          ctx.fillStyle = "rgb(0,0,0)";
        }

        ctx.fillRect(i, j, 1, 1);
      }
    }


  }

  render() {
    return (
      <View style={styles.container}>
        <CHIP8Screen onDraw={(canvas) => {
          this.renderScreen(canvas);
        }}/>
        <CHIP8Keypad 
        onKeyPress={(key) => {
          this.keyPressed(key);
        }}
        
        onKeyRelease={(key) => {
          this.keyReleased(key);
        }}></CHIP8Keypad>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
