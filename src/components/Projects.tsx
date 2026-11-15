
const projects = [
  {
    title: "SAHAJ",
    category: "Smart Traffic Management",
    description:
      "An intelligent traffic and crowd management system designed to optimize traffic signals and improve road efficiency.",
    technologies: ["Spring Boot", "FastAPI", "React", "PostgreSQL"],
    number: "01",
  },
  {
    title: "TalentAI HRMS",
    category: "AI Powered HR Platform",
    description:
      "An HR management platform featuring AI-powered resume screening and automated interview question generation.",
    technologies: ["React", "Python", "AI/ML", "FastAPI"],
    number: "02",
  },
  {
    title: "Federated Learning",
    category: "Machine Learning Research",
    description:
      "A privacy-preserving machine learning system for Parkinson's disease detection using voice features.",
    technologies: ["Python", "Machine Learning", "Federated Learning"],
    number: "03",
  },
  {
    title: "AC-AC Matrix Converter",
    category: "Digital Design",
    description:
      "A hardware design research project focused on AC-AC matrix converters using Verilog HDL.",
    technologies: ["Verilog", "Digital Electronics", "HDL"],
    number: "04",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      {/* Heading */}
      <div className="mb-12">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-blue-500">
          Selected Work
        </p>

        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Featured Projects
        </h2>

        <p className="mt-4 max-w-xl text-gray-400">
          Some of the things I&apos;ve built, researched
          and experimented with.
        </p>
      </div>

      {/* Project Cards */}
      <div className="grid gap-6 md:grid-cols-2">

        {projects.map((project) => (
          <div
            key={project.number}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-sm text-blue-500">
                PROJECT / {project.number}
              </span>

              <span className="text-gray-500 transition group-hover:text-blue-500">
                ↗
              </span>
            </div>

            <p className="mb-3 text-sm text-gray-500">
              {project.category}
            </p>

            <h3 className="text-2xl font-bold text-white">
              {project.title}
            </h3>

            <p className="mt-4 leading-7 text-gray-400">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Projects;
