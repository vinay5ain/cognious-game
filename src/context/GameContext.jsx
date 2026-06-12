import React, { createContext, useState, useEffect, useCallback } from 'react'

// Create the context
export const GameContext = createContext()

// Initial state
const INITIAL_BALANCE = 1000
const DAILY_REWARD = 100

// GameProvider component
export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [wallet, setWallet] = useState(INITIAL_BALANCE)
  const [transactions, setTransactions] = useState([])
  const [gameStats, setGameStats] = useState({
    luckyWheel: { played: 0, wins: 0, totalCoinsWon: 0 },
    guessNumber: { played: 0, wins: 0, totalCoinsWon: 0 },
    memoryMatch: { played: 0, wins: 0, bestTime: null },
  })
  const [lastDailyReward, setLastDailyReward] = useState(null)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('cognieos_user')
    const savedWallet = localStorage.getItem('cognieos_wallet')
    const savedTransactions = localStorage.getItem('cognieos_transactions')
    const savedGameStats = localStorage.getItem('cognieos_gameStats')
    const savedLastReward = localStorage.getItem('cognieos_lastDailyReward')

    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedWallet) setWallet(parseInt(savedWallet))
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions))
    if (savedGameStats) setGameStats(JSON.parse(savedGameStats))
    if (savedLastReward) setLastDailyReward(JSON.parse(savedLastReward))
  }, [])

  // Save user to localStorage
  const loginUser = useCallback((username) => {
    const userData = { username, joinedDate: new Date().toISOString() }
    setUser(userData)
    localStorage.setItem('cognieos_user', JSON.stringify(userData))
  }, [])

  // Add transaction and update wallet
  const addTransaction = useCallback((amount, description, type = 'gameplay') => {
    const newBalance = wallet + amount
    setWallet(newBalance)
    localStorage.setItem('cognieos_wallet', newBalance.toString())

    const transaction = {
      id: Date.now(),
      amount,
      description,
      type,
      timestamp: new Date().toISOString(),
      balanceAfter: newBalance,
    }
    setTransactions((prev) => [transaction, ...prev])
    localStorage.setItem('cognieos_transactions', JSON.stringify([transaction, ...transactions]))
  }, [wallet, transactions])

  // Claim daily reward
  const claimDailyReward = useCallback(() => {
    const now = new Date()
    const canClaim = !lastDailyReward || new Date(lastDailyReward) < new Date(now.getTime() - 24 * 60 * 60 * 1000)

    if (canClaim) {
      addTransaction(DAILY_REWARD, 'Daily Reward Bonus', 'reward')
      setLastDailyReward(now.toISOString())
      localStorage.setItem('cognieos_lastDailyReward', JSON.stringify(now.toISOString()))
      return true
    }
    return false
  }, [lastDailyReward, addTransaction])

  // Update game stats
  const updateGameStats = useCallback((gameName, stats) => {
    setGameStats((prev) => {
      const updated = {
        ...prev,
        [gameName]: { ...prev[gameName], ...stats },
      }
      localStorage.setItem('cognieos_gameStats', JSON.stringify(updated))
      return updated
    })
  }, [])

  // Reset all progress
  const resetProgress = useCallback(() => {
    setUser(null)
    setWallet(INITIAL_BALANCE)
    setTransactions([])
    setGameStats({
      luckyWheel: { played: 0, wins: 0, totalCoinsWon: 0 },
      guessNumber: { played: 0, wins: 0, totalCoinsWon: 0 },
      memoryMatch: { played: 0, wins: 0, bestTime: null },
    })
    setLastDailyReward(null)
    
    localStorage.removeItem('cognieos_user')
    localStorage.removeItem('cognieos_wallet')
    localStorage.removeItem('cognieos_transactions')
    localStorage.removeItem('cognieos_gameStats')
    localStorage.removeItem('cognieos_lastDailyReward')
  }, [])

  // Check if daily reward is available
  const isDailyRewardAvailable = useCallback(() => {
    if (!lastDailyReward) return true
    const lastReward = new Date(lastDailyReward)
    const now = new Date()
    const hoursPassed = (now - lastReward) / (1000 * 60 * 60)
    return hoursPassed >= 24
  }, [lastDailyReward])

  // Get next reward time
  const getNextRewardTime = useCallback(() => {
    if (!lastDailyReward) return new Date()
    const lastReward = new Date(lastDailyReward)
    const nextReward = new Date(lastReward.getTime() + 24 * 60 * 60 * 1000)
    return nextReward
  }, [lastDailyReward])

  const value = {
    user,
    wallet,
    transactions,
    gameStats,
    loginUser,
    addTransaction,
    updateGameStats,
    resetProgress,
    claimDailyReward,
    isDailyRewardAvailable,
    getNextRewardTime,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
