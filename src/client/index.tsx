import * as React from 'react'
import {render} from 'react-dom'
import App from './app'

class Router extends React.Component<null, {}>{
  render(){
    return <App />
  }
}

render(<Router />, document.getElementById('root'))