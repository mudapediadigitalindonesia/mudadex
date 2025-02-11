import * as rand from 'randomstring'

const generateUserId = () => {
  const str = rand.generate({length: 16, capitalization: 'uppercase', readable: true})
  return `USR${str}`
}

export default generateUserId