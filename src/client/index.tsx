import * as React from 'react'
import {render} from 'react-dom'

interface AppProps {}

class App extends React.Component<AppProps, undefined>{
  render(){
    return (
      <h1>it's alive!</h1>
    )
  }
}

render(<App />, document.getElementById('root'))