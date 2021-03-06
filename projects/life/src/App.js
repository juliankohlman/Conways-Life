import React, { Component } from 'react';
import Life from './life';
import './App.css';

class LifeCanvas extends Component {
  constructor(props) {
    super(props);

    this.life = new Life(props.width, props.height);
    this.life.randomize();
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.handleAnimation();
    });
  }

  handleAnimation() {
    const width = this.props.width;
    const height = this.props.height;

    const cells = this.life.getCells();
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);

    for (let col = 0; col < height; col += 1) {
      for (let row = 0; row < width; row += 1) {
        const index = (col * width + row) * 4;

        const status = cells[col][row];
        const color = status === 0 ? 0x00 : 0xff;

        imageData.data[index + 0] = color; // R
        imageData.data[index + 1] = color; // G
        imageData.data[index + 2] = color; // B
        imageData.data[index + 3] = 0xff;  // A
      }
    }

    ctx.putImageData(imageData, 0, 0);

    this.life.step();

    // requestAnimationFrame(() => this.handleAnimation());
  }

  render() {
    return (
      <canvas
        ref="canvas"
        width={this.props.width}
        height={this.props.height}
        style={{
          border: '2px solid black',
          display: 'block',
          margin: 'auto',
          marginTop: '200px',
          padding: 0,
        }}
      />
    );
  }
}

const LifeApp = () => (
  <div>
    <LifeCanvas width={600} height={425} />
  </div>
);

const App = () => (
  <div className="App">
    <LifeApp />
  </div>
);

export default App;
