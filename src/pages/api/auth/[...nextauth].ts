import generateUserId from '@/lib/database/generateUserId';
import hash from '@/lib/database/hash';
import prisma from '@/lib/prisma';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github"

const key = String(process.env.NEXT_PRIVATE_HASH_KEY)

const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PRIVATE_HASH_KEY,
  session: {
    strategy: 'jwt',
    maxAge: 5 * 60 * 60,
  },
  jwt: {
    maxAge: 5 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'bot',
      id: 'bot',
      credentials: {
        email: { label: 'username', type: 'text', placeholder: 'Your username...' },
        password: { label: 'Password', type: 'password', placeholder: 'Your password...' },
      },
      async authorize(credentials: any) {
        if (!credentials) {
          throw new Error('No credentials provider!')
        }
        const { username, password } = credentials
        const users = await prisma.botAccess.findMany({ where: { username } })
        if (users.length === 0) {
          throw new Error('Invalid username or Password')
        }
        const user = users[0]

        const isPassMatch = await hash.decrypt(user.password, password, key)

        if (isPassMatch) {
          return user
        } else {
          throw new Error('failed to auth!')
        }
      }
    }),
    CredentialsProvider({
      name: 'user',
      id: 'user',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'Your email...' },
        password: { label: 'Password', type: 'password', placeholder: 'Your password...' },
      },
      async authorize(credentials: any) {
        if (!credentials) {
          throw new Error('No credentials provider!')
        }
        const { email, password } = credentials
        const users = await prisma.users.findMany({ where: { email } })
        if (users.length === 0) {
          throw new Error('Invalid Email or Password')
        }
        const user = users[0]

        const isPassMatch = await hash.decrypt(user.password, password, key)

        if (isPassMatch) {
          return user
        } else {
          throw new Error('failed to auth!')
        }
      }
    }),

    CredentialsProvider({
      name: 'wallet',
      id: 'wallet',
      credentials: {
        walletAddress: { label: 'wallet', type: 'text', placeholder: 'Wallet address...' },
      },
      async authorize(credentials: any) {
        if (!credentials) {
          throw new Error('No credentials provider!')
        }
        const { walletAddress } = credentials
        const users = await prisma.users.findFirst({ where: { walletAddress } })
        if (!users) {
          throw new Error('Invalid wallet')
        }
        const user = users
        return user
      }
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PRIVATE_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PRIVATE_GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    GitHubProvider({
      clientId: process.env. NEXT_PRIVATE_GITHUB_CLIENT_ID || '',
      clientSecret: process.env. NEXT_PRIVATE_GITHUB_CLIENT_SECRET || ''
    })
  ],

  callbacks: {
    async jwt({ token, account, user }: any) {
      // if (account?.provider === 'bot' && user) {
      //   token.id = user.id
      // }
      
      if (account?.provider === 'user' && user) {
        token.id = user.id
      }

      if (account?.provider === 'google') {
        const existingUser = await prisma.users.findFirst({ where: { email: user.email } })
        if (existingUser) {
          token.id = existingUser.id
          await prisma.users.update({
            where: { id: existingUser.id }, data: {
              emailVerified: true,
            }
          })
        } else {
          const newUser = await prisma.users.create({
            data: {
              email: user.email || '',
              fullname: user.name || '',
              id:  generateUserId(),
              image: user.image || '',
              emailVerified: true,
              walletAddress: []
            },
          })
          token.id = newUser.id
        }
      }

      if(account?.provider === 'github') {
        const existingUser = await prisma.users.findFirst({ where: { email: user.email } })
        if (existingUser) {
          token.id = existingUser.id
          await prisma.users.update({
            where: { id: existingUser.id }, data: {
              emailVerified: true,
            }
          })
        } else {
          const newUser = await prisma.users.create({
            data: {
              email: user.email || '',
              fullname: user.name || '',
              id:  generateUserId(),
              image: user.image || '',
              emailVerified: true,
              walletAddress: []
            },
          })
          token.id = newUser.id
        }
      }

      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          id: token.id,
          image: token.image,
        }
      }
      return session
    },
  },
  pages: {
    error: '/exchange'
  }
}



export default NextAuth(authOptions)