import css from 'styled-jsx/css'

const scrollbar = css`
  .scrollbar {
    scrollbar-width: thin;
    scrollbar-color: var(--secondary-color) var(--primary-color);
  }

  .scrollbar::-webkit-scrollbar {
    width: 0.625rem;
    height: 0.625rem;
  }

  .scrollbar::-webkit-scrollbar-track {
    background-color: var(--primary-color);
  }

  .scrollbar::-webkit-scrollbar-thumb {
    background-color: var(--secondary-color);
  }
`

export default scrollbar
