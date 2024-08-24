import React, { Component } from 'react';

class Coin extends Component {
  render() {
    const { score, coinClickHandler } = this.props;
    return (
      <div>
        <span className="score">{score}</span>
        <button className="coin" onClick={coinClickHandler}></button>
      </div>
    );
  }
}

export default Coin;