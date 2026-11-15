
const About = () => {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      {/* Section heading */}
      <div className="mb-12">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-blue-500">
          Introduction
        </p>

        <h2 className="text-4xl font-bold text-white md:text-5xl">
          About Me
        </h2>
      </div>

      {/* About content */}
      <div className="grid gap-12 md:grid-cols-2">

        <div>
          <h3 className="text-2xl font-semibold text-white">
            Building technology that makes a difference.
          </h3>

          <p className="mt-6 leading-8 text-gray-400">
            I&apos;m Rishi Roy, a developer interested in backend
            engineering, artificial intelligence and full-stack
            development.

            I enjoy solving real-world problems, designing
            scalable systems and turning ideas into working
            applications.
          </p>
        </div>

        {/* Information cards */}
        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="text-3xl font-bold text-blue-500">
              3+
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Years of learning
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="text-3xl font-bold text-blue-500">
              5+
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Projects built
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="text-3xl font-bold text-blue-500">
              AI/ML
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Area of interest
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 p-6">
            <h3 className="text-3xl font-bold text-blue-500">
              Full Stack
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Development focus
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
