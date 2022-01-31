const sleep = (miliseconds: number = 0) =>
  new Promise((resolve) => setTimeout(resolve, miliseconds))

export default sleep
