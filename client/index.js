import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { injectGlobal } from 'styled-components'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { globalStyles } from 'ui/theme'
import { configureStore } from 'configure-store'
import { Root } from 'routes'
import App from 'ui/layout'
const history = createBrowserHistory()
const store = configureStore({ history })

injectGlobal`${globalStyles}`

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  )
}

renderApp()

if (module.hot) {
  module.hot.accept('ui/layout', renderApp)
}
