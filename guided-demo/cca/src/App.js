import React, { Component } from 'react';
import CCA from './cca';
import './App.css';

const COLORS = [
  [0, 0, 0],
  [0x28, 0xab, 0xe2],
  [0x66, 0x0c, 0xe8],
  [0xff, 0, 0],
  [0, 0x5f, 0x7f],
  [0xe8, 0x90, 0x0c],
  [0xed, 0xff, 0x0d],
  [0xff, 0x5f, 0x7f],
];

/**
 * CCA canvas
 */
class CCACanvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.cca = new CCA(props.width, props.height);
    this.cca.randomize();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => this.animFrame());
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    this.cca.step();
    let width = this.props.width;
    let height = this.props.height;

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.fill();

    let imageData = ctx.getImageData(0, 0, width, height);

    // for(let pixel of imageData.data)
    // {
    //   pixel = 128;
    //   //console.log(pixel);
    // }

    // blueComponent = imageData.data[((50 * (imageData.width * 4)) + (200 * 4)) + 2];

    for (let row = 0; row < width; row++) {
      for (let col = 0; col < height; col++) {
        let ccaGrid = this.cca.getCells();
        let index = (row * width + col) * 4;
        let color = ccaGrid[row][col];
        //change red value
        imageData.data[index + 0] = COLORS[color][1];
        //change green value
        imageData.data[index + 1] = COLORS[color][6];
        //change blue value
        imageData.data[index + 2] = COLORS[color][5];

        imageData.data[index + 3] = 0xff; //alpha channel solid
      }
    }

    //console.log("imageData", imageData);
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(() => this.animFrame());
  }

  /**
   * Render
   */
  render() {
    return (
      <canvas
        ref="canvas"
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

/**
 * CCA holder component
 */
class CCAApp extends Component {
  /**
   * Render
   */
  render() {
    return (
      <div>
        <CCACanvas width={400} height={300} />
      </div>
    );
  }
}

/**
 * Outer App component
 */
class App extends Component {
  /**
   * Render
   */
  render() {
    return (
      <div className="App">
        <CCAApp />
      </div>
    );
  }
}

export default App;
