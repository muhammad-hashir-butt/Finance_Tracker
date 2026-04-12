import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import SummaryCards from "./SummaryCards";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import Charts from "./Charts";

const Dashboard = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "transactions"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [user.uid]);

  const addTransaction = async (transaction) => {
    await addDoc(collection(db, "transactions"), { ...transaction, userId: user.uid });
  };

  const deleteTransaction = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
  };

  if (loading) return <div className="text-center mt-20 text-xl">Loading Dashboard...</div>;

  return (
    <div className="space-y-8">
      <SummaryCards transactions={transactions} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <TransactionForm onSubmit={addTransaction} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <Charts transactions={transactions} />
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
