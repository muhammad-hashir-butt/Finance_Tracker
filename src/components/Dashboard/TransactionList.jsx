const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
      <div className="max-h-96 overflow-y-auto space-y-3">
        {transactions.length === 0 && <p className="text-gray-500">No transactions yet.</p>}
        {transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).map((t) => (
          <div key={t.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
            <div>
              <p className="font-semibold">{t.category}</p>
              <p className="text-xs text-gray-400">{t.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={t.type === 'income' ? 'text-green-400' : 'text-red-400'}>
                {t.type === 'income' ? '+' : '-'}${t.amount}
              </span>
              <button onClick={() => onDelete(t.id)} className="text-gray-400 hover:text-red-500">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TransactionList;
