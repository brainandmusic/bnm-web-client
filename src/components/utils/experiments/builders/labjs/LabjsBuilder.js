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

// Sentry error reporting for production releases
// (if a DSN is specified as an environment parameter, that is)
import * as Sentry from '@sentry/browser'

/* eslint-disable import/first */
import { check } from './logic/util/compatibility'
import { persistState } from './logic/util/persistence'
import { fromObject } from './logic/io/load'
import installPreviewWorker from './logic/io/preview/worker'
import { SystemContextProvider } from './components/System'
/* eslint-enable import/first */

const exp_data = {
  "components": {
    "1": {
      "id": "1",
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "i-text",
          "version": "3.5.1",
          "originX": "center",
          "originY": "center",
          "left": 313,
          "top": 0,
          "width": 58.7,
          "height": 36.16,
          "fill": "#d6341a",
          "stroke": null,
          "strokeWidth": 1,
          "strokeDashArray": null,
          "strokeLineCap": "butt",
          "strokeDashOffset": 0,
          "strokeLineJoin": "round",
          "strokeMiterLimit": 4,
          "scaleX": 1,
          "scaleY": 1,
          "angle": 0,
          "flipX": false,
          "flipY": false,
          "opacity": 1,
          "shadow": null,
          "visible": true,
          "clipTo": null,
          "backgroundColor": "",
          "fillRule": "nonzero",
          "paintFirst": "fill",
          "globalCompositeOperation": "source-over",
          "transformMatrix": null,
          "skewX": 0,
          "skewY": 0,
          "text": "Red",
          "fontSize": 32,
          "fontWeight": "normal",
          "fontFamily": "sans-serif",
          "fontStyle": "normal",
          "lineHeight": 1.16,
          "underline": false,
          "overline": false,
          "linethrough": false,
          "textAlign": "center",
          "textBackgroundColor": "",
          "charSpacing": 0,
          "id": "3",
          "styles": {}
        }
      ],
      "viewport": [
        800,
        600
      ],
      "files": {
        "rows": []
      },
      "responses": {
        "rows": [
          [
            "",
            "",
            "",
            ""
          ]
        ]
      },
      "parameters": {
        "rows": [
          [
            {
              "name": "",
              "value": "",
              "type": "string"
            }
          ]
        ]
      },
      "messageHandlers": {
        "rows": [
          [
            {
              "title": "",
              "message": "",
              "code": ""
            }
          ]
        ]
      },
      "title": "load from json",
      "_tab": "Parameters"
    },
    "root": {
      "id": "root",
      "title": "root",
      "type": "lab.flow.Sequence",
      "children": [
        "1"
      ],
      "parameters": {
        "rows": [
          [
            {
              "name": "",
              "value": "",
              "type": "string"
            }
          ]
        ]
      },
      "plugins": [
        {
          "type": "lab.plugins.Metadata"
        }
      ],
      "metadata": {
        "title": "",
        "description": "",
        "repository": "",
        "contributors": ""
      }
    }
  },
  "version": [
    20,
    1,
    1
  ],
  "files": {
    "files": {
      "index.html": {
        "content": "data:text/html,%3C!doctype%20html%3E%0A%3Chtml%3E%0A%3Chead%3E%0A%20%20%3Cmeta%20charset%3D%22utf-8%22%3E%0A%20%20%3Ctitle%3EExperiment%3C%2Ftitle%3E%0A%20%20%3C!--%20viewport%20setup%20--%3E%0A%20%20%3Cmeta%20name%3D%22viewport%22%20content%3D%22width%3Ddevice-width%2C%20initial-scale%3D1%22%3E%0A%20%20%3C!--%20lab.js%20library%20and%20experiment%20code%20--%3E%0A%20%20%24%7B%20header%20%7D%0A%3C%2Fhead%3E%0A%3Cbody%3E%0A%20%20%3C!--%20If%20you'd%20rather%20have%20a%20container%20with%20a%20fixed%20width%0A%20%20%20%20%20%20%20and%20variable%20height%2C%20try%20removing%20the%20fullscreen%20class%20below%20--%3E%0A%20%20%3Cdiv%20class%3D%22container%20fullscreen%22%20data-labjs-section%3D%22main%22%3E%0A%20%20%20%20%3Cmain%20class%3D%22content-vertical-center%20content-horizontal-center%22%3E%0A%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%3Ch2%3ELoading%20Experiment%3C%2Fh2%3E%0A%20%20%20%20%20%20%20%20%3Cp%3EThe%20experiment%20is%20loading%20and%20should%20start%20in%20a%20few%20seconds%3C%2Fp%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%3C%2Fmain%3E%0A%20%20%3C%2Fdiv%3E%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A",
        "source": "library"
      },
      "style.css": {
        "content": "data:text/css,%2F*%20Please%20define%20your%20custom%20styles%20here%20*%2F",
        "source": "library"
      }
    },
    "bundledFiles": {
      "lib/lab.js": {
        "type": "application/javascript"
      },
      "lib/lab.js.map": {
        "type": "text/plain"
      },
      "lib/lab.fallback.js": {
        "type": "application/javascript"
      },
      "lib/lab.legacy.js": {
        "type": "application/javascript"
      },
      "lib/lab.legacy.js.map": {
        "type": "text/plain"
      },
      "lib/lab.css": {
        "type": "text/css"
      },
      "lib/loading.svg": {
        "type": "image/svg+xml"
      }
    }
  }
}

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

function LabjsBuilder({ eid }) {
  const [loading, setLoading] = useState(true);
  const [previewActive, setPreviewActive] = useState(false);
  const [store, setStore] = useState(null);
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

  useEffect(() => {
    if (store && eid) {
      // load experiment data from server
      const state = fromObject(exp_data)
      console.log(state)
      // Hydrate store from resulting object
      store.dispatch({
        type: 'HYDRATE', state,
      })
    }
  }, [eid, store]);

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
