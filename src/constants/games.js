// Games data configuration
export const GAMES_CONFIG = {
  luckyWheel: {
    id: 'lucky-wheel',
    title: 'Lucky Wheel',
    description: 'Spin the wheel and win big! Each spin awards random coins.',
    category: 'Spin',
    path: '/game/lucky-wheel',
    icon: '🎡',
    reward: '50-500 coins',
    color: '#00d4ff',
    thumbnail: '🎡',
  },
  guessNumber: {
    id: 'guess-number',
    title: 'Guess Number',
    description: 'Guess the number between 1-10. Test your luck and intuition!',
    category: 'Logic',
    path: '/game/guess-number',
    icon: '🎯',
    reward: '100 coins (win), -20 coins (lose)',
    color: '#a855f7',
    thumbnail: '🎯',
  },
  memoryMatch: {
    id: 'memory-match',
    title: 'Memory Match',
    description: 'Flip cards and match pairs. Challenge your memory skills!',
    category: 'Puzzle',
    path: '/game/memory-match',
    icon: '🃏',
    reward: '200 coins',
    color: '#10b981',
    thumbnail: '🃏',
  },
}

export const GAME_CATEGORIES = ['All', 'Spin', 'Logic', 'Puzzle']

export const GAMES_ARRAY = Object.values(GAMES_CONFIG)

// Get game by ID
export const getGameById = (id) => {
  return GAMES_ARRAY.find((g) => g.id === id)
}

// Get games by category
export const getGamesByCategory = (category) => {
  if (category === 'All') return GAMES_ARRAY
  return GAMES_ARRAY.filter((g) => g.category === category)
}
