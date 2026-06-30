export default function ErrorState({ message = 'Something went wrong.' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-gray-500">
      <p>{message}</p>
    </div>
  );
}