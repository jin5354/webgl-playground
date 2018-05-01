import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import update from 'immutability-helper'
import {composeWithDevTools} from 'redux-devtools-extension'
import * as types from './types'
import {generateResult} from '../utils/generateResult'
import data from '../data/data'
const persistState = require('redux-sessionstorage')

const initialState: RootState = {
  title: 'Default Title',
  selected: {
    sub: '',
    item: ''
  },
  editor: {
    htmlEditor: {
      content: ``
    },
    cssEditor: {
      content: ``
    },
    jsEditor: {
      content: ``
    }
  },
  result: {
    content: ``
  }
}

const reducer = (state: RootState = initialState, action: Action) => {
  switch(action.type) {
    case(types.SET_TITLE): {
      return update(state, {
        title: {
          $set: action.title
        }
      })
    }
    case(types.SET_HTMLEDITOR_CONTENT): {
      return update(state, {
        editor: {
          htmlEditor: {
            content: {
              $set: action.html
            }
          }
        }
      })
    }
    case(types.SET_CSSEDITOR_CONTENT): {
      return update(state, {
        editor: {
          cssEditor: {
            content: {
              $set: action.css
            }
          }
        }
      })
    }
    case(types.SET_JSEDITOR_CONTENT): {
      return update(state, {
        editor: {
          jsEditor: {
            content: {
              $set: action.js
            }
          }
        }
      })
    }
    case(types.SET_SELECTED): {
      return update(state, {
        selected: {
          $set: action.selected
        }
      })
    }
    case(types.UPDATE_RESULT): {
      let result = generateResult({
        html: state.editor.htmlEditor.content,
        css: state.editor.cssEditor.content,
        js: (window as any).ts.transpile(state.editor.jsEditor.content)
      })
      return update(state, {
        result: {
          content: {
            $set: result
          }
        }
      })
    }
    default: {
      return state
    }
  }
}

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk), persistState()))
