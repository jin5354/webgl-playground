import point from './Tutorial/Basic/point'
import param from './Tutorial/Basic/param'
import event from './Tutorial/Basic/event'
import buffer from './Tutorial/Basic/buffer'
import triangles from './Tutorial/Basic/triangles'
import butterfly from './Collections/Demos/butterfly'

export default [{
  title: 'Tutorial',
  type: 'submenu',
  children: [{
    title: 'ch02',
    type: 'group',
    children: [{
      title: '绘制一个点',
      type: 'item',
      content: point
    }, {
      title: '变量传递',
      type: 'item',
      content: param
    }, {
      title: '事件交互',
      type: 'item',
      content: event
    }]
  }, {
    title: 'ch03',
    type: 'group',
    children: [{
      title: '使用缓冲区',
      type: 'item',
      content: buffer
    }, {
      title: '三角形',
      type: 'item',
      content: triangles
    }]
  }]
}, {
  title: 'Collections',
  type: 'submenu',
  children: [{
    title: 'Demos',
    type: 'group',
    children: [{
      title: 'Butterfly',
      type: 'item',
      content: butterfly
    }]
  }]
}]