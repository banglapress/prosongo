const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Empowering Change Through Research
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Prosongo collects, analyzes, and shares data to drive informed policy,
          sustainable development, and people-powered democracy in Bangladesh.
        </p>
        <a
          href="/projects"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100"
        >
          Explore Our Work
        </a>
      </div>
    </section>
  );
};

export default Hero;
