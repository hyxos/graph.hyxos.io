import { ceil, floor, range } from 'mathjs';

const baseCoordinates = (w, h) => {
  const quadraticArray = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]
  return quadraticArray.map(el => [el[0] * w, el[1] * h])
}

const cellGroupDimensions = (w, h) => { return { width: w * 2, height: h * 2, area: w * h * 4 } }
const roundUpToOdd = n => {
  let up = ceil(n)
  if (up % 2 === 0) {
    return up + 1
  } else return up
}

const genCellGroupCoordinates = (axis, w, h) => {
  const cellCoordIndexes = [[1, 0], [1, 2], [3, 2], [3, 4], [5, 4], [5, 6], [7, 6], [7, 0]]
  const cellCoordinates = baseCoordinates(w, h).map(a => [axis[0] + a[0], axis[1] + a[1]])
  return cellCoordIndexes.map((cci) => [axis, cellCoordinates[cci[0]], cellCoordinates[cci[1]]])
}


const genCellAxes = (xRange, yRange) => {
  if (xRange.length > yRange.length) {
    return xRange.map(x => yRange.map(y => [x, y]))
  } else return yRange.map(x => xRange.map(y => [x, y]))
}

const xfaxis = (axis, w, h) => [axis[0] * w * 2, axis[1] * h * 2]

export const gridDimensions = (w, h, viewPort) => {
  const dimensions = cellGroupDimensions(w, h)
  const cols = roundUpToOdd(viewPort.width / dimensions.width)
  const rows = roundUpToOdd(viewPort.height / dimensions.height)
  const xRangeBase = floor(cols / 2)
  const yRangeBase = floor(rows / 2)
  const xRange = range(-xRangeBase, xRangeBase, true)._data
  const yRange = range(-yRangeBase, yRangeBase, true)._data
  const cellAxes = genCellAxes(xRange, yRange).flat()
  const genCellCoords = (axes, w, h) => axes.map(a => xfaxis(a, w, h))
  const cellCoords = genCellCoords(cellAxes, w, h)
  let output = {
    cols,
    rows,
    xRange,
    yRange,
    cellAxes,
    cellCoords
  }
  return output
}

const cellDrawString = coords => `M ${coords[0]} L ${coords[1]} L ${coords[2]} z`

const genCellsCoords = (w, h, viewPort) => {
  const gd = gridDimensions(w, h, viewPort)
  const output = gd.cellCoords.map((axis, i) => { return { "grid-axis": gd.cellAxes[i], axis, coords: genCellGroupCoordinates(axis, w, h) } }).flat()
  return output
}
export const toggleCells = (cells, cellmap) => {

  let xfcell = ({ axis, w, h, byte }) => {
    return {
      axis: xfaxis(axis, w, h),
      byte
    }
  }

  console.log({ cellmap: cellmap.map(xfcell), cells })
}

export default function (w, h, viewPort, bitmap) {
  const cells = genCellsCoords(w, h, viewPort)
  const output = cells.map(cell => {
    return { "grid-axis": cell["grid-axis"], axis: cell.axis, coords: cell.coords, d: cell.coords.map(cellDrawString), bitmap: bitmap[cell["grid-axis"].toString()] }
  })
  return output
}
