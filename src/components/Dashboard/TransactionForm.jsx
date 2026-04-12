import { useState } from "react";

const TransactionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ amount: "", category: "Food", date: "", type: "expense" });

  const categories = ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Salary", "Investment"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.date) return;
    onSubmit({ ...formData, amount: Number(formData.amount) });
    setFormData({ amount: "", category: "Food", date: "", type: "expense" });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h3 className="text-xl font-bold mb-4">Add Transaction</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" placeholder="Amount" className="w-full p-3 bg-gray-700 rounded-lg" value={formData.amount} onChange={(e)=>setFormData({...formData, amount: e.target.value})} required />
        <select className="w-full p-3 bg-gray-700 rounded-lg" value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="date" className="w-full p-3 bg-gray-700 rounded-lg" value={formData.date} onChange={(e)=>setFormData({...formData, date: e.target.value})} required />
        <div className="flex gap-4">
          <button type="button" onClick={()=>setFormData({...formData, type: 'income'})} className={`flex-1 py-2 rounded-lg ${formData.type === 'income' ? 'bg-green-600' : 'bg-gray-700'}`}>Income</button>
          <button type="button" onClick={()=>setFormData({...formData, type: 'expense'})} className={`flex-1 py-2 rounded-lg ${formData.type === 'expense' ? 'bg-red-600' : 'bg-gray-700'}`}>Expense</button>
        </div>
        <button type="submit" className="w-full bg-blue-600 py-3 rounded-lg font-bold hover:bg-blue-700">Add Transaction</button>
      </form>
    </div>
  );
};
export default TransactionForm;
