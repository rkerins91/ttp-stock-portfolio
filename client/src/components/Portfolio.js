import React, { Component } from 'react'
import AddStock from './AddStock'
import PortfolioDisplay from './PortfolioDisplay'

export default class Portfolio extends Component {

  render() {
    return (
      <div>
        <PortfolioDisplay />
        <AddStock />
      </div>
    )
  }
}
