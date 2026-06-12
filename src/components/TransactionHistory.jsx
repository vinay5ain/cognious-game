import './TransactionHistory.css'

function TransactionHistory({ transactions, limit = 5 }) {
  const displayTransactions = transactions.slice(0, limit)

  if (!displayTransactions || displayTransactions.length === 0) {
    return (
      <div className="transaction-history">
        <h3>Transaction History</h3>
        <p className="empty-state">No transactions yet. Play a game to earn coins!</p>
      </div>
    )
  }

  return (
    <div className="transaction-history">
      <h3>Transaction History</h3>
      <div className="transaction-list">
        {displayTransactions.map((transaction) => (
          <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
            <div className="transaction-info">
              <p className="transaction-desc">{transaction.description}</p>
              <p className="transaction-time">
                {new Date(transaction.timestamp).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className={`transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
              {transaction.amount > 0 ? '+' : ''}{transaction.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionHistory
