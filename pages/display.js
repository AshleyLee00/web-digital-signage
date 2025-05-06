/**
 * @fileoverview Preview page (shows the display frame and renders all the
 * widgets inside of it)
 */

import React from 'react'
import { view } from 'react-easy-state'

import Display from '../components/Display/Display.js'
import { display } from '../stores'

class DisplayPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleOrientationChange = this.handleOrientationChange.bind(this)
  }

  static async getInitialProps({ query, req }) {
    const displayId = query && query.display
    const host =
      req && req.headers && req.headers.host ? 'http://' + req.headers.host : window.location.origin

    return { host, displayId }
  }

  componentDidMount() {
    const { displayId } = this.props
    display.setId(displayId)
  }

  handleOrientationChange(e) {
    display.setOrientation(e.target.value)
  }

  handleRatioChange = (e) => {
    display.setRatio(e.target.value)
  }

  render() {
    const { host } = this.props
    const ratio = display.ratio
    const orientation = display.orientation
    let width = '100vw', height = '100vh'
    if (orientation === 'landscape') {
      if (ratio === '16:9') { width = '100vw'; height = '56.25vw'; }
      else if (ratio === '4:3') { width = '100vw'; height = '75vw'; }
      else if (ratio === '1:1') { width = '100vw'; height = '100vw'; }
    } else {
      if (ratio === '9:16') { width = '56.25vh'; height = '100vh'; }
      else if (ratio === '3:4') { width = '75vh'; height = '100vh'; }
      else if (ratio === '1:1') { width = '100vh'; height = '100vh'; }
    }
    return (
      <div className={`container ${display.orientation}`} style={{ width, height, margin: '0 auto', display: 'flex' }}>
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, display: 'flex', gap: 12 }}>
          <label htmlFor="orientation-select" style={{ color: 'white', marginRight: 8 }}>화면 방향:</label>
          <select id="orientation-select" value={display.orientation} onChange={this.handleOrientationChange}>
            <option value="landscape">가로</option>
            <option value="portrait">세로</option>
          </select>
          <label htmlFor="ratio-select" style={{ color: 'white', marginLeft: 16, marginRight: 8 }}>비율:</label>
          <select id="ratio-select" value={display.ratio} onChange={this.handleRatioChange}>
            <option value="16:9">16:9</option>
            <option value="4:3">4:3</option>
            <option value="9:16">9:16</option>
            <option value="3:4">3:4</option>
            <option value="1:1">1:1</option>
          </select>
        </div>
        <Display host={host} display={display.id} />
        <style jsx>
          {`
            .container {
              display: flex;
              /* width, height는 style 속성에서 동적으로 지정 */
            }
          `}
        </style>
        <style>
          {`
            * {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            *::-webkit-scrollbar {
                display: none;  // Safari and Chrome
            }
          `}
        </style>
      </div>
    )
  }
}

export default view(DisplayPage)
