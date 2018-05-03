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
    },
    glslEditor: {
      vertexShader: {
        content: ``
      },
      fragmentShader: {
        content: ``
      }
    }
  },
  dividerPosition: {
    verticalDivider: 0,
    leftHorizontalDivider: {
      [0]: 36,
      [1]: 250
    },
    rightHorizontalDivider: {
      [0]: 36,
      [1]: 250
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
    case(types.SET_GLSLEDITOR_CONTENT): {
      console.log(action)
      return update(state, {
        editor: {
          glslEditor: {
            [action.name]: {
              content: {
                $set: action.glsl
              }
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
        js: (window as any).ts.transpile(state.editor.jsEditor.content),
        glsl: state.editor.glslEditor
      })
      return update(state, {
        result: {
          content: {
            $set: result
          }
        }
      })
    }
    case(types.SET_VERTICAL_DIVIDER_POSITION): {
      return update(state, {
        dividerPosition: {
          verticalDivider: {
            $set: action.position
          }
        }
      })
    }
    case(types.SET_LEFT_HORIZONTAL_DIVIDER_POSITION): {
      return update(state, {
        dividerPosition: {
          leftHorizontalDivider: {
            [action.index]: {
              $set: action.position
            }
          }
        }
      })
    }
    case(types.SET_RIGHT_HORIZONTAL_DIVIDER_POSITION): {
      return update(state, {
        dividerPosition: {
          rightHorizontalDivider: {
            [action.index]: {
              $set: action.position
            }
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
