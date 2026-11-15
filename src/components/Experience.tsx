
const experiences = [
  {
    type: "Experience",
    title: "API Research & Integration Intern",
    organization: "DNAG Technologies",
    duration: "3 Months",
    description: [
      "Researched Flipkart Seller APIs, including seller onboarding, product listing, shipment management and order processing.",
      "Tested and validated REST APIs using Postman.",
      "Documented API endpoints and their business workflows.",
    ],
  },
  {
    type: "Education",
    title: "B.E. Computer Science & Engineering",
    organization: "The Oxford College of Engineering",
    duration: "2023 – 2027",
    description: [
      "Pursuing a Bachelor's degree in Computer Science and Engineering.",
      "Current CGPA: 9.12 / 10.",
      "Expected graduation: 2027.",
    ],
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="mx-auto max-w-7xl px-6 py-32"
    >
      <div className="mb-12">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-blue-500">
          My Journey
        </p>

        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Experience & Education
        </h2>
      </div>

      <div className="space-y-6">
        {experiences.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition hover:border-blue-500/50"
          >
            <p className="mb-3 text-sm text-blue-500">
              {item.type}
            </p>

            <h3 className="text-2xl font-bold text-white">
              {item.title}
            </h3>

            <div className="mt-2 flex flex-wrap justify-between gap-2">
              <p className="text-gray-400">
                {item.organization}
              </p>

              <p className="text-sm text-gray-500">
                {item.duration}
              </p>
            </div>

            <ul className="mt-6 list-disc space-y-3 pl-5 text-gray-400">
              {item.description.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
