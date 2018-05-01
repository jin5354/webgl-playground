import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {setJS, updateResult} from '../../store/actions'
const debounce = require('lodash.debounce')
import './JSEditor.scss'

interface JSEditorProps {
  content: string,
  setJS: Function,
  updateResult: Function
}

interface JSEditorStates {
  editor: any,
  timer: number
}

const mapStateToProps = (state: RootState) => {
  return {
    content: state.editor.jsEditor.content
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setJS(js:string) {
      dispatch(setJS(js))
    },
    updateResult() {
      dispatch(updateResult())
    }
  }
}

class JSEditor extends React.Component<JSEditorProps> {

  constructor(props: JSEditorProps) {
    super(props)
  }

  state: JSEditorStates = {
    editor: null,
    timer: 0
  }

  render() {
    return (
      <div className="jseditor-container editor-item">
        <header>Typescript / JavaScript</header>
        <div id="jseditor"></div>
      </div>
    )
  }

  componentDidMount() {
    this.state.timer = window.setInterval(() => {
      if((window as any).monaco) {
        window.clearInterval(this.state.timer)
        this.state.editor = (window as any).monaco.editor.create(document.getElementById('jseditor') as HTMLElement, {
          value: this.props.content,
          language: 'typescript',
          theme: 'vs-dark',
          automaticLayout: true,
          minimap: {
            enabled: false
          }
        })
        this.state.editor.onDidChangeModelContent(this.modelDidChangeHandler)
        this.state.editor.addCommand([(window as any).monaco.KeyMod.Shift | (window as any).monaco.KeyMod.CtrlCmd | (window as any).monaco.KeyCode.KEY_P], () => {
          this.state.editor.trigger('anyString', 'editor.action.quickCommand')
        })
      }
    }, 200)
  }

  modelDidChangeHandler = () => {
    if(this.props.content !== this.state.editor.getValue()) {
      this.setJS()
    }
  }

  setJS = debounce(() => {
    this.props.setJS(this.state.editor.getValue())
    this.props.updateResult()
  }, 1000)

  shouldComponentUpdate(nextProps: JSEditorProps) {
    return this.state.editor && nextProps.content !== this.state.editor.getValue()
  }

  componentDidUpdate() {
    this.state.editor.setValue(this.props.content)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JSEditor as any)