"use client";

import { useState } from "react";
import NeuralOrb from "./NeuralOrb";

const Hero = () => {
  const giant = "PORTFOLIO".split("");
  const [activeMood, setActiveMood] = useState("red");
  const [mousePosition, setMousePosition] = useState({
  x: 50,
  y: 50,
});
 const moodThemes: Record<string, string> = {
  red: "rgba(239, 68, 68, 0.28)",
  orange: "rgba(249, 115, 22, 0.28)",
  yellow: "rgba(234, 179, 8, 0.28)",
  blue: "rgba(59, 130, 246, 0.28)",
  violet: "rgba(139, 92, 246, 0.28)",
};
const orbThemes: Record<string, { glow: string; shadow: string }> = {
  red: {
    glow: "#fb7185",
    shadow: "#ef4444",
  },
  orange: {
    glow: "#fdba74",
    shadow: "#f97316",
  },
  yellow: {
    glow: "#fde047",
    shadow: "#eab308",
  },
  blue: {
    glow: "#60a5fa",
    shadow: "#3b82f6",
  },
  violet: {
    glow: "#c4b5fd",
    shadow: "#8b5cf6",
  },
};
  return (
    <section
  className="relative isolate overflow-hidden"
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  }}
>

      {/* Hero background */}
  {/* Hero background */}
<div
  aria-hidden
  className="absolute inset-0 -z-10 transition-all duration-300"
  style={{
    background: `radial-gradient(
      circle at ${mousePosition.x}% ${mousePosition.y}%,
      ${moodThemes[activeMood]},
      transparent 65%
    ), black`,
  }}
/>
      {/* Main content */}
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-24 sm:pt-28">

        {/* Portfolio information */}
        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.24em] text-gray-400">
          <span>Portfolio 2026</span>
          <span className="h-px flex-1 bg-white/20" />
          <span>Computer Science · Class of 2027</span>
        </div>

        {/* Giant PORTFOLIO heading */}
        <h1 className="mt-5 w-full whitespace-nowrap text-center text-[clamp(2.5rem,11vw,10rem)] leading-[0.84] tracking-[-0.06em] text-white">
          {giant.map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </h1>

        {/* Three-column hero layout */}
        <div className="relative mt-4 grid gap-10 lg:grid-cols-[1fr_1.15fr_1fr] lg:items-start lg:gap-6">

          {/* Left column */}
          <div className="order-3 lg:order-1 lg:pt-14">

            <p className="text-4xl font-light tracking-tight text-white">
              API / ML / Web
            </p>

            <ul className="mt-5 space-y-1.5 font-mono text-xs uppercase tracking-[0.22em] text-gray-400">
              <li>REST APIs</li>
              <li>ML services</li>
              <li>Dashboards</li>
            </ul>

            <div className="mt-5 h-0.5 w-9 bg-red-500" />

            <div className="mt-9 flex gap-3">
              <span className="text-6xl leading-[0.7] text-red-500">
                “
              </span>

              <p className="max-w-[15rem] text-sm uppercase leading-relaxed tracking-wider text-white/90">
                I build backends and ML services that turn data into decisions.
              </p>
            </div>

            <p className="mt-7 text-3xl italic text-white/90">
              Rishi Roy
            </p>

          </div>

          {/* Centre column */}
          <div className="relative order-1 mx-auto aspect-square w-[min(82vw,27rem)] lg:order-2 lg:-mt-10">

            {/* Outer dashed circle */}
            <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin [animation-duration:30s]" />

            {/* Glowing circle */}
<div
  className="absolute inset-[6%] rounded-full transition-all duration-700"
  style={{
    background: `radial-gradient(circle at 34% 28%, ${orbThemes[activeMood].glow}, ${orbThemes[activeMood].shadow} 78%)`,
    boxShadow: `0 0 100px -25px ${orbThemes[activeMood].shadow}`,
  }}
/>
{/* Neural network animation */}
<div className="absolute inset-0 z-10">
  <NeuralOrb />
</div>
          </div>

          {/* Right column */}
          <div className="relative order-2 lg:order-3 lg:pt-4">

            {/* Name */}
            <p className="text-5xl font-light leading-tight tracking-tight text-white">
              Rishi
              <br />
              Roy
            </p>

            {/* Developer title */}
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-red-400">
              Backend · AI/ML · Full-stack developer
            </p>

            {/* Introduction */}
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-400">
              Computer Science student who designs REST APIs, ML services and dashboards, from the database to the screen. Hackathon winner and IEEE Xplore author.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href="#work"
                className="rounded-full bg-red-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-400"
              >
                See the work →
              </a>

              <a
                href="#contact"
                className="rounded-full border border-white/20 px-5 py-3 text-sm text-white transition hover:bg-white hover:text-black"
              >
                Download resume
              </a>
              
            </div>

            {/* Statistics */}
            <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-white/20 pt-6">

              <div>
                <dt className="text-2xl font-semibold text-white">9.12</dt>
                <dd className="mt-1 text-xs text-gray-400">CGPA</dd>
              </div>

              <div>
                <dt className="text-2xl font-semibold text-white">3</dt>
                <dd className="mt-1 text-xs text-gray-400">Flagship systems</dd>
              </div>

              <div>
                <dt className="text-2xl font-semibold text-white">2</dt>
                <dd className="mt-1 text-xs text-gray-400">Hackathon podiums</dd>
              </div>

            </dl>

          </div>

        </div>
{/* Mood picker */}
<div className="relative z-50 mt-14 flex flex-col items-center gap-4">

  <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
    Choose your mood
  </p>

  <div className="flex gap-4">

    <div className="flex gap-4">
  {[
    { name: "red", color: "bg-red-500", label: "Crimson" },
    { name: "orange", color: "bg-orange-500", label: "Ember" },
    { name: "yellow", color: "bg-yellow-400", label: "Gold" },
    { name: "blue", color: "bg-blue-500", label: "Ocean" },
    { name: "violet", color: "bg-violet-500", label: "Violet" },
  ].map((mood) => (
    <button
      key={mood.name}
      type="button"
      onClick={() => setActiveMood(mood.name)}
      aria-label={`${mood.label} mood`}
      aria-pressed={activeMood === mood.name}
      className={`h-7 w-7 rounded-full cursor-pointer transition-all duration-300 hover:scale-125 ${
        mood.color
      } ${
        activeMood === mood.name
          ? "ring-2 ring-white ring-offset-4 ring-offset-black scale-110"
          : "opacity-70 hover:opacity-100"
      }`}
    />
  ))}
</div>

  </div>

  <p className="text-xs text-gray-500">
  Pick a mood. Move your cursor through the colour.
</p>
</div>
</div>
    </section>
  );
};

export default Hero;
