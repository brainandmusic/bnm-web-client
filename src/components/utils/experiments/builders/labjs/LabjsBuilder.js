import React, { useEffect, useState } from 'react'

// Why did you (re)render?
import './wdyr.js'

// React-redux integration
import { Provider as ReduxProvider } from 'react-redux'
import configureStore from './store'

// React-dnd integration
import { DragDropContext } from 'react-dnd'
import HTML5DragDropBackend from 'react-dnd-html5-backend'

// App content
import App from './components/App'
import './index.css'

// Sentry error reporting for production releases
// (if a DSN is specified as an environment parameter, that is)
import * as Sentry from '@sentry/browser'

/* eslint-disable import/first */
import { check } from './logic/util/compatibility'
import { persistState } from './logic/util/persistence'
import installPreviewWorker from './logic/io/preview/worker'
import { SystemContextProvider } from './components/System'
/* eslint-enable import/first */

async function initialization() {
  let previewActive
  const store = await configureStore()

  // Check browser compatibility
  check(store)

  // Persist store to localFtorage
  await persistState(store)

  // Enable preview service worker
  try {
    await installPreviewWorker(store)
    previewActive = true
  } catch (e) {
    console.log('Error during preview worker registration:', e)
    previewActive = false

    // A lack of service worker support is now well-captured
    // in the remaining app, and need not be logged
    if (e.message !== 'Service workers not available') {
      Sentry.withScope((scope) => {
        scope.setTag('scope', 'worker')
        Sentry.captureException(e)
      })
    }
  } finally {
    return [previewActive, store];
  }
}

function LabjsBuilder() {
  const [loading, setLoading] = useState(true);
  const [previewActive, setPreviewActive] = useState(false);
  const [store, setStore] = useState({});
  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' &&
      process.env.REACT_APP_SENTRY_DSN
    ) {
      Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        release: `@lab.js/builder@${process.env.REACT_APP_SENTRY_RELEASE}`,
      })
    }

    async function init() {
      const [activated, labStore] = await initialization();
      setPreviewActive(activated);
      setStore(labStore);
      setLoading(false);
    }

    init();
  }, []);

  // Wrap main app component
  const WrappedApp = DragDropContext(HTML5DragDropBackend)(App)

  // Render wrapped app
  return loading ? (<div>loading Lab.js builder...</div>) : (
    <SystemContextProvider
      value={{
        previewActive
      }}
    >
      <ReduxProvider store={store}>
        <WrappedApp />
      </ReduxProvider>
    </SystemContextProvider>
  );

}

export default LabjsBuilder;
