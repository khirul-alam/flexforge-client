'use client';

import { useEffect, useState } from 'react';
import { authFetch } from '@/utils/authFetch';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const res = await authFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payments?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      setTransactions(Array.isArray(data.data) ? data.data : []);
      setTotalPages(data.totalPages || 1);
      setLoading(false);
    };
    fetchTransactions();
  }, [page]);

  if (loading) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Transactions</h1>
      <table className="w-full overflow-hidden rounded-lg bg-white shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">User Email</th>
            <th className="p-3">Class</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Date</th>
            <th className="p-3">Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id} className="border-t">
              <td className="p-3">{tx.userEmail}</td>
              <td className="p-3">{tx.className}</td>
              <td className="p-3 font-semibold text-orange-500">${tx.amount}</td>
              <td className="p-3">{tx.date ? new Date(tx.date).toLocaleDateString() : '-'}</td>
              <td className="p-3 text-xs text-gray-500">{tx.transactionId}</td>
            </tr>
          ))}
          {transactions.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-gray-400">No transactions found.</td></tr>}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`rounded-md px-4 py-2 ${page === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}