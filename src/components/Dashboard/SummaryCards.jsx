const SummaryCards = ({ transactions }) => {
  const income = transactions.filter(t => t.type === "income").reduce((acc, t) => acc + Number(t.amount), 0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + Number(t.amount), 0);
  const balance = income - expenses;

  const cardStyle = "p-6 rounded-xl border border-gray-700 bg-gray-800 shadow-lg";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className={cardStyle}>
        <p className="text-gray-400">Total Income</p>
        <p className="text-3xl font-bold text-green-400">${income}</p>
      </div>
      <div className={cardStyle}>
        <p className="text-gray-400">Total Expenses</p>
        <p className="text-3xl font-bold text-red-400">${expenses}</p>
      </div>
      <div className={cardStyle}>
        <p className="text-gray-400">Balance</p>
        <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>${balance}</p>
      </div>
    </div>
  );
};
export default SummaryCards;
