import { adjustAxis } from "../utils"

const yy = (axis = [0, 0]) => {

  const base = {
    "0,0": 255,
    "-5,0": 255,
    "-4,0": 255,
    "-3,0": 255,
    "-2,0": 255,
    "-1,0": 255,
    "-4,1": 255,
    "-3,1": 30,
    "-6,0": 225,
    "-5,-1": 225,
    "-4,-1": 255,
    "-6,1": 120,
    "-5,1": 255,
    "-4,2": 30,
    "1,0": 231,
    "2,0": 255,
    "3,0": 30,
    "3,-1": 255,
    "-3,-1": 255,
    "-2,-1": 255,
    "-1,-1": 255,
    "0,-1": 255,
    "1,-1": 255,
    "2,-1": 255,
    "4,-1": 30,
    "5,-1": 120,
    "-5,2": 120,
    "5,2": 225,
    "6,-1": 135,
    "6,0": 120,
    "7,0": 135,
    "6,1": 225,
    "7,1": 30,
    "6,2": 30,
    "-1,1": 129,
    "5,-2": 129,
    "-4,3": 60,
    "-5,3": 32,
    "-3,3": 60,
    "-2,3": 60,
    "-1,3": 60,
    "0,3": 60,
    "1,3": 60,
    "2,3": 60,
    "3,3": 60,
    "4,3": 60,
    "5,3": 28
}
   
  if (axis[0] === 0 && axis[1] === 0) {
    return base
  }
  else {
    return adjustAxis(axis, base)
  }
}

export default yy