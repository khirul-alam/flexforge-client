const testimonials = [
  { name: 'Sarah K.', text: 'FlexForge transformed how I approach fitness. Love the booking flow!' },
  { name: 'Michael R.', text: 'Found an amazing yoga trainer through this platform.' },
];

export default function Testimonials() {
  return (
    <section className="container mx-auto bg-gray-50 px-6 py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">What Our Members Say</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-xl bg-white p-6 shadow-sm">
            <p className="italic text-gray-600">&ldquo;{t.text}&rdquo;</p>
            <p className="mt-4 font-semibold">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}