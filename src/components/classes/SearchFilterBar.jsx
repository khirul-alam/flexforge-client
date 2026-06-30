const CATEGORIES = ['Yoga', 'Cardio', 'Weights', 'Pilates', 'CrossFit'];

export default function SearchFilterBar({ search, setSearch, categories, setCategories }) {
  const toggleCategory = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="text"
        placeholder="Search classes by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm rounded-lg border p-3"
      />

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm ${
              categories.includes(cat) ? 'bg-orange-500 text-white' : 'bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}