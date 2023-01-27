import { controlPanelStyle, controlStyle, inputStyle } from '../../styles'
import { useControlPanel } from '../stores/controls';
import { gridDimensions } from '../utils'
let cellWidthInput
let fillInput
let strokeInput
let strokeWidthInput

const ControlPanel = props => {
  const [controls, { setCellWidth, setFill, setStroke, setStrokeWidth, reset }] = useControlPanel()
  return (<div class={"no-print"} style={controlPanelStyle}>
    <div>Controls</div>
    <div style={controlStyle}>
      <label for="cell-width">cell-width</label>
      <input style={inputStyle} id="cell-width" value={controls["cell-width"]} onChange={(e) => setCellWidth(+e.target.value)} type="number" ref={cellWidthInput} />
    </div>
    <div style={controlStyle}>
      <label for="fill">fill</label>
      <input style={inputStyle} id="fill" value={controls.fill} onChange={(e) => setFill(e.target.value)} type="text" ref={fillInput} />
    </div>
    <div style={controlStyle}>
      <label for="stroke">stroke</label>
      <input style={inputStyle} id="stroke" value={controls.stroke} onChange={(e) => setStroke(e.target.value)} type="text" ref={strokeInput} />
    </div>
    <div style={controlStyle}>
      <label for="stroke-width">stroke-width</label>
      <input style={inputStyle} id="stroke-width" value={controls["stroke-width"]} onChange={(e) => setStrokeWidth(+e.target.value)} type="number" ref={strokeWidthInput} />
    </div>
    <div>
      <button onClick={reset}>reset</button>
    </div>
  </div>)
}
export default ControlPanel