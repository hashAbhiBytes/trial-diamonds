import { Web3Storage } from 'web3.storage'

// Initialize Web3.Storage client
function getWeb3StorageClient() {
  return new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_TOKEN })
}

export async function uploadToIPFS(file) {
  try {
    const client = getWeb3StorageClient()

    // Create a file object with proper name
    const fileName = `diamond-${Date.now()}`
    const imageFile = new File([file], fileName, { type: file.type })

    // Upload file to IPFS
    const cid = await client.put([imageFile])

    // Construct the IPFS URL
    const ipfsUrl = `https://${cid}.ipfs.dweb.link/${fileName}`
    
    console.log('File uploaded to IPFS:', ipfsUrl)
    return ipfsUrl
  } catch (error) {
    console.error('Error uploading to IPFS:', error)
    throw new Error('Failed to upload image to IPFS')
  }
}