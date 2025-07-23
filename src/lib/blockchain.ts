export interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  gasPrice: string
  gasUsed: string
  timestamp: string
  blockNumber: string
  methodId?: string
  functionName?: string
}

export const fetchTransactions = async (address: string, apiKey?: string): Promise<Transaction[]> => {
  try {
    // Using Etherscan API - in production you'd want to use your own API key
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${apiKey || 'demo'}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.status !== '1') {
      throw new Error(data.message || 'Failed to fetch transactions')
    }
    
    return data.result.map((tx: any) => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      gasPrice: tx.gasPrice,
      gasUsed: tx.gasUsed,
      timestamp: new Date(parseInt(tx.timeStamp) * 1000).toISOString(),
      blockNumber: tx.blockNumber,
      methodId: tx.methodId,
      functionName: tx.functionName || 'Transfer',
    }))
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw error
  }
}

export const formatEther = (wei: string): string => {
  const ethValue = BigInt(wei) / BigInt(10 ** 18)
  return ethValue.toString()
}

export const formatGwei = (wei: string): string => {
  const gweiValue = BigInt(wei) / BigInt(10 ** 9)
  return gweiValue.toString()
}