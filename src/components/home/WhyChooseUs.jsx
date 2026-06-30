const features = [
  { title: 'Expert Trainers', desc: 'Learn from certified fitness professionals.' },
  { title: 'Flexible Scheduling', desc: 'Book classes that fit your routine.' },
  { title: 'Community Support', desc: 'Connect, share, and grow with others.' },
];

export default function WhyChooseUs() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">Why Choose FlexForge</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border p-6 text-center shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
            <p className="text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}