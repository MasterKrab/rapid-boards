import css from 'styled-jsx/css'

const visuallyHidden = css`
  .visually-hidden {
    position: absolute;
    top: -9999px;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
`

export default visuallyHidden
