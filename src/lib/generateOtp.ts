import { generate } from 'otp-generator'

const generateOtp = () => {
  const otp = generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false
  })
  return otp
}

export default generateOtp