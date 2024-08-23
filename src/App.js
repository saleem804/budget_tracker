import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import IncomeExpenseForm from './components/IncomeExpenseForm';
import Summary from './components/Summary';

const supabase = createClient('https://hoiyxafkaqufmtmcqtyv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvaXl4YWZrYXF1Zm10bWNxdHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0NDYwODcsImV4cCI6MjA0MDAyMjA4N30.S4voPYj1m_MhJUcHE28j2-5chNBy8wfEtSFs1q6J3A4');

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const { data, error } = await supabase.from('transactions').select('*');
  console.log(data);
    if (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);  // Ensure it's an empty array on error
    } else {
      setTransactions(Array.isArray(data) ? data : []);  // Ensure data is an array
    }
  };
  

  const addTransaction = async (transaction) => {
    console.log(transaction);
  const { data, error } = await supabase.from('transactions').insert([transaction]);

  if (error) {
    console.error('Error adding transaction:', error);
  } else {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      transaction]);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold my-4">Budget Tracker</h1>
      <IncomeExpenseForm addTransaction={addTransaction} />
      <Summary transactions={transactions} />
    </div>
  );
}

export default App;
