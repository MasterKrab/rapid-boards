import { faker } from '@faker-js/faker'

const generateRandomUsername = (min: number, max: number) => {
  let username

  while (!username || username.length < min || username.length > max) {
    username = faker.internet.userName()
  }

  return username
}

export default generateRandomUsername
