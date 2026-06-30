export default function DataTable({ columns = [], children }) {
  return (
    <table className="w-full overflow-hidden rounded-lg bg-white shadow">
      <thead className="bg-gray-100 text-left">
        <tr>
          {columns.map((col) => (
            <th key={col} className="p-3">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}