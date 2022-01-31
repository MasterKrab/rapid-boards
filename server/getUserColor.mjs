import randomColor from 'randomcolor'

const getUserColor = () =>
  randomColor({
    luminosity: 'light',
  })

export default getUserColor
