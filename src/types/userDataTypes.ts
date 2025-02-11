export interface UserDataType {
  id: string,
  createdAt: Date,
  fullname: string,
  email: string,
  password: string,
  emailVerified: boolean
  walletAddress: string[],
  image: string,
}