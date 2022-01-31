import css from 'styled-jsx/css'

const globalStyles = css.global`
  :root {
    --primary-color: #f7f7f7;
    --secondary-color: #191919;
    --alert-color: #ff0000;
    --error-color: #ff3860;

    --primary-font: 'Poppins', sans-serif;

    --element-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
    --element-shadow-light: 0 0.15rem 0.5rem rgba(255, 255, 255, 0.4);
    --element-separation: 0.5rem;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    background-color: var(--primary-color);
    font-family: var(--primary-font);
    text-align: center;
    max-width: 100%;
    overflow: hidden;
  }
`

export default globalStyles
