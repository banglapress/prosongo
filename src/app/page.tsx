import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
          At Prosongo, we believe in data-driven change. From understanding villages
          across Bangladesh to capturing the pulse of people’s voices, we aim
          to bridge research with real-world solutions.
        </p>
      </section>
    </>
  );
}
