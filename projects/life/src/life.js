/**
 * Implementation of Conway's game of Life
 */

const MODULO = 2;

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  // NOTE:  Iterate through Array2D row first then column
  const a = new Array(height);

  for (let i = 0; i < height; i += 1) {
    a[i] = new Array(width);
  }

  return a;
}

/**
 * Life class
 */
class Life {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.activeBufferIdx = 0;

    // 2 buffers this.buffer[0] current buffer this.buffer[1] is hidden until
    // switch occurs (active vs inactive)
    this.buffer = [Array2D(width, height), Array2D(width, height)];

    this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffer[this.activeBufferIdx];
  }

  /**
   * Clear the life grid
   */
  clear() {
    for (let row = 0; row < this.height; row += 1) {
      this.buffer[this.activeBufferIdx][row].fill(0);
    }
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    const buffer = this.buffer[this.activeBufferIdx];
    // filling in activeBuffer with random 0s or 1s
    for (let row = 0; row < this.height; row += 1) {
      for (let col = 0; col < this.width; col += 1) {
        buffer[row][col] = (Math.random() * MODULO) | 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */

  step() {
    // whichever index is not the activeBufferIdx
    const offBufferIdx = this.activeBufferIdx === 0 ? 1 : 0;
    const offBuffer = this.buffer[offBufferIdx];
    const activeBuffer = this.buffer[this.activeBufferIdx];
    // Rules of life
    /*
    [ To help visualize neighbors and cell movements
      [1,0,0,0,1],
      [0,1,0,0,0],
      [0,0,0,0,1],
      [0,0,0,1,0],
      [1,0,0,0,0],
      [0,1,0,0,1]
    ]
    */
    function countOfNeighbors(row, col) {
      let count = 0;

      for (let rowAdjustment = -1; rowAdjustment <= 1; rowAdjustment += 1) {
        const rowIdx = (row + rowAdjustment);

        if (rowIdx < 0 || rowIdx === this.height) continue;

        for (let colAdjustment = -1; colAdjustment <= 1; colAdjustment += 1) {
          const colIdx = (col + colAdjustment);

          if (colIdx < 0 || colAdjustment === this.width) continue;
          if (colAdjustment === 0 && rowAdjustment === 0) continue;
          count += activeBuffer[rowIdx][colIdx];
        }
      }
      return count;
    }

    for (let row = 0; row < this.height; row += 1) {
      for (let col = 0; col < this.width; col += 1) {
        let neighborCount = (countOfNeighbors.bind(this))(row, col);

        let activeCell = activeBuffer[row][col];

        if (activeCell === 1) {
          if (neighborCount < 2 || neighborCount > 3) {
            offBuffer[row][col] = 0;
          } else {
            offBuffer[row][col] = 1;
          }
        } else {
          if (neighborCount === 3) {
            offBuffer[row][col] = 1;
          } else {
            offBuffer[row][col] = 0;
          }
        }
      }
    }

    this.activeBufferIdx = this.activeBufferIdx === 0 ? 1 : 0;
  }
}

export default Life;
