import React from 'react';

function Summary({ transactions }) {
  // Ensure transactions is an array and not null/undefined
  const validTransactions = transactions || [];

  const income = validTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = validTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  return (
    <div className="mt-8 bg-white p-4 rounded shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <div className="flex justify-between">
        <span>Balance:</span>
        <span className="font-bold">{balance}</span>
      </div>
      <div className="flex justify-between">
        <span>Income:</span>
        <span className="text-green-500">{income}</span>
      </div>
      <div className="flex justify-between">
        <span>Expenses:</span>
        <span className="text-red-500">{expenses}</span>
      </div>
    </div>
  );
}

export default Summary;
