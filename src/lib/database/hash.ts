import bcrypt from 'bcryptjs';

const hash = {
  encrypt: async (key: string, data: string) => {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedData = await bcrypt.hash(key + data, salt)
      return hashedData
    } catch (error) {
      console.error("Error in encrypt:", error)
    }
  },

  decrypt: async (hashedData: string, compareData: string, key: string) => {
    try {
      const isMatch = await bcrypt.compare(key + compareData, hashedData)
      return isMatch
    } catch (error) {
      console.error("Error in decrypt:", error)
    }
  },
};

export default hash;
