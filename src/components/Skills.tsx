
const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "Spring Boot",
  "FastAPI",
  "PostgreSQL",
  "Tailwind CSS",
  "Git & GitHub",
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      <div className="mb-12">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-blue-500">
          My Expertise
        </p>

        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Technologies I Work With
        </h2>

        <p className="mt-4 max-w-xl text-gray-400">
          Tools and technologies I use to build
          applications and solve problems.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

        {skills.map((skill) => (
          <div
            key={skill}
            className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-500/10"
          >
            <p className="font-medium text-gray-300 transition group-hover:text-white">
              {skill}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Skills;
