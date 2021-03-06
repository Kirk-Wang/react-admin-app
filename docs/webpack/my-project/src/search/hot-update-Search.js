import React from 'react'
import './search.less'
import logo from './images/logo.png'
import { a } from './tree-shaking'
import evLargeNumber from 'ev-large-number'

export class Search extends React.Component {

  constructor() {
    super(...arguments)
    this.state = {
      Text: null
    }
  }

  loadComponent() {
    import('./text').then((text) => {
      this.setState({
        Text: text.default
      })
    })
  }

  render() {
    const { Text } = this.state
    return (
      <div className="search-text">
        <div>{evLargeNumber('9999999999', '10')}</div>
        {Text ? <Text/> : null}
        {a()}请输入搜索内容: <img src={logo} onClick={this.loadComponent.bind(this)}/> 
      </div>)
  }
}