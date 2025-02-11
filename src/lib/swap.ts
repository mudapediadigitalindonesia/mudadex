import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js"
import { useWallet } from "@solana/wallet-adapter-react"

const swapToken = async (
  mintAddrA: string, // Address of token A mint
  mintAddrB: string, // Address of token B mint
  amountA: number,   // Amount of token A to swap
  amountB: number,   // Minimum amount of token B to receive
  slippage: number,  // Slippage percentage (e.g., 1 for 1%)
  poolPubKeyStr: string, // Address of the token pool
  poolTokenAStr: string, // Address of the pool token A
  poolTokenBStr: string  // Address of the pool token B
) => {
  try {
    const connection = new Connection(
      "https://mainnet.helius-rpc.com/?api-key=5c27681d-fcca-4886-8584-51e89282bfe9",
      "confirmed"
    )

    const wallet = useWallet()
    if (!wallet.connected || !wallet.publicKey) {
      throw new Error("Wallet not connected.")
    }

    // Convert parameters to PublicKey
    const mintAPubKey = new PublicKey(mintAddrA)
    const mintBPubKey = new PublicKey(mintAddrB)
    const poolPubKey = new PublicKey(poolPubKeyStr)
    const poolTokenA = new PublicKey(poolTokenAStr)
    const poolTokenB = new PublicKey(poolTokenBStr)

    // Mock program ID (replace with actual implementation)
    const programId = new PublicKey("TOKEN_SWAP_PROGRAM_ID") // Replace with actual token swap program ID

    // Calculate minimum token B considering slippage
    const minAmountB = Math.floor(amountB * (1 - slippage / 100))

    // Create transaction
    const transaction = new Transaction()

    // Add swap instruction
    const swapInstruction = new TransactionInstruction({
      programId,
      keys: [
        { pubkey: wallet.publicKey, isSigner: true, isWritable: true },
        { pubkey: poolPubKey, isSigner: false, isWritable: true },
        { pubkey: poolTokenA, isSigner: false, isWritable: true },
        { pubkey: poolTokenB, isSigner: false, isWritable: true },
        { pubkey: mintAPubKey, isSigner: false, isWritable: true },
        { pubkey: mintBPubKey, isSigner: false, isWritable: true },
      ],
      data: Buffer.from(
        Uint8Array.of(
          0, // Instruction identifier (e.g., 0 for swap)
          ...new Uint8Array(new BigUint64Array([BigInt(amountA)]).buffer), // Amount A
          ...new Uint8Array(new BigUint64Array([BigInt(minAmountB)]).buffer) // Minimum amount B
        )
      ),
    })

    transaction.add(swapInstruction)

    // Set transaction metadata
    transaction.feePayer = wallet.publicKey
    const { blockhash } = await connection.getLatestBlockhash()
    transaction.recentBlockhash = blockhash

    // Request wallet to sign and send the transaction
    const signature = await wallet.sendTransaction(transaction, connection)

    // Confirm the transaction using the new TransactionConfirmationStrategy
    const confirmationStrategy = {
      signature,
      blockhash,
      lastValidBlockHeight: (await connection.getLatestBlockhash()).lastValidBlockHeight,
    }

    await connection.confirmTransaction(confirmationStrategy, "confirmed")

    return signature
  } catch (error) {
    console.error("Error swapping tokens:", error)
    throw error
  }
}

export default swapToken
