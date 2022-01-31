const capitalize = (word: string): string =>
  word
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join('')

export default capitalize
