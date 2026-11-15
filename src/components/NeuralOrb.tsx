
"use client";

import { useEffect, useRef } from "react";

// Each point on the sphere has a 3D position.
type Node = {
  x: number;
  y: number;
  z: number;
};

// A pulse represents a glowing signal travelling along a connection.
type Pulse = {
  e: number;
  t: number;
  v: number;
  dir: 1 | -1;
};

// Configuration
const NODE_COUNT = 120;
const LINK_DISTANCE = 0.5;

// Keeps a number within a given range.
const clamp = (n: number, min = -1, max = 1) =>
  Math.min(max, Math.max(min, n));

// Creates the sphere and connects nearby nodes.
function build() {
  const nodes: Node[] = [];

  // Golden angle distributes points evenly over a sphere.
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (2 * i) / (NODE_COUNT - 1);
    const r = Math.sqrt(1 - y * y);
    const angle = i * goldenAngle;

    nodes.push({
      x: Math.cos(angle) * r,
      y,
      z: Math.sin(angle) * r,
    });
  }

  // Connect nodes that are close to each other in 3D space.
  const edges: [number, number][] = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const distance = Math.hypot(
        nodes[i].x - nodes[j].x,
        nodes[i].y - nodes[j].y,
        nodes[i].z - nodes[j].z
      );

      if (distance < LINK_DISTANCE) {
        edges.push([i, j]);
      }
    }
  }

  return { nodes, edges };
}

type NeuralOrbProps = {
  glowColor?: string;
  lineColor?: string;
};

export default function NeuralOrb({
  glowColor = "#ff8a4c",
  lineColor = "#f1e6d3",
}: NeuralOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !host || !ctx) return;

    // Respect the user's reduced-motion accessibility setting.
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const { nodes, edges } = build();

    // Store which connections belong to each node.
    const adjacency: number[][] = nodes.map(() => []);

    edges.forEach(([a, b], edgeIndex) => {
      adjacency[a].push(edgeIndex);
      adjacency[b].push(edgeIndex);
    });

    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    // Tracks the mouse position and its normalized direction.
    const pointer = {
      x: -999,
      y: -999,
      nx: 0,
      ny: 0,
      on: false,
      last: 0,
    };

    // Controls the sphere's rotation and cursor-following movement.
    const view = {
      yaw: 0.6,
      pitch: 0.15,
      tx: 0,
      ty: 0,
      cx: 0,
      cy: 0,
    };

    // Active glowing signals.
    const pulses: Pulse[] = [];

    // Projected 2D positions of our 3D nodes.
    const projectedNodes = nodes.map(() => ({
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
      heat: 0,
    }));

    // Adjust canvas resolution to its displayed size.
    const resize = () => {
      const rect = host.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    // Start a glowing signal from a selected node.
    const fire = (nodeIndex: number) => {
      const connections = adjacency[nodeIndex];

      if (!connections.length || pulses.length > 70) return;

      const edgeIndex =
        connections[Math.floor(Math.random() * connections.length)];

      pulses.push({
        e: edgeIndex,
        t: 0,
        v: 0.9 + Math.random() * 0.9,
        dir: edges[edgeIndex][0] === nodeIndex ? 1 : -1,
      });
    };

    let idleClock = 0;

    // Update the sphere's rotation, node positions and signals.
    const step = (deltaTime: number, now: number) => {
      // If the mouse has been idle, gently move the sphere automatically.
      if (now - pointer.last > 3500) {
        view.tx = Math.sin(now / 2100) * 0.25;
        view.ty = Math.sin(now / 2700 + 1) * 0.15;
      } else {
        view.tx = pointer.nx;
        view.ty = pointer.ny;
      }

      // Smoothly interpolate towards the target movement.
      view.cx += (view.tx - view.cx) * 0.06;
      view.cy += (view.ty - view.cy) * 0.06;

      // Slowly rotate the sphere.
      view.yaw += deltaTime * 0.22;

      const yaw = view.yaw + view.cx * 0.9;
      const pitch = view.pitch + view.cy * -0.55;

      const radius = Math.min(width, height) * 0.42;
      const centerX = width / 2;
      const centerY = height / 2;

      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);

      // Rotate and project every 3D node onto the 2D canvas.
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        const rotatedX =
          node.x * cosYaw + node.z * sinYaw;

        const rotatedZ =
          -node.x * sinYaw + node.z * cosYaw;

        const rotatedY =
          node.y * cosPitch - rotatedZ * sinPitch;

        const finalZ =
          node.y * sinPitch + rotatedZ * cosPitch;

        // Perspective makes closer nodes appear larger.
        const scale = 3 / (3 - finalZ);

        const point = projectedNodes[i];

        point.x = centerX + rotatedX * radius * scale;
        point.y = centerY + rotatedY * radius * scale;
        point.z = finalZ;
        point.scale = scale;

        // Calculate how close the node is to the mouse.
        const distance = pointer.on
          ? Math.hypot(point.x - pointer.x, point.y - pointer.y)
          : 999;

        const targetHeat = Math.max(
          0,
          1 - distance / (radius * 0.55)
        );

        point.heat += (targetHeat - point.heat) * 0.18;

        // Nearby front-facing nodes can generate new signals.
        if (
          targetHeat > 0.55 &&
          finalZ > -0.2 &&
          Math.random() < 0.035
        ) {
          fire(i);
        }
      }

      // Occasionally generate signals even when the mouse is idle.
      idleClock += deltaTime;

      if (idleClock > 0.12) {
        idleClock = 0;
        fire(Math.floor(Math.random() * nodes.length));
      }

      // Move each signal along its connection.
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];

        pulse.t += deltaTime * pulse.v;

        if (pulse.t >= 1) {
          const [a, b] = edges[pulse.e];

          const arrivedNode = pulse.dir === 1 ? b : a;

          pulses.splice(i, 1);

          // Sometimes relay the signal to another connection.
          if (Math.random() < 0.55) {
            fire(arrivedNode);
          }
        }
      }
    };

    // Draw the sphere and all its visual effects.
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const radius = Math.min(width, height) * 0.42;

      // Soft coloured glow behind the network.
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        radius * 1.05
      );

      gradient.addColorStop(0, glowColor);
      gradient.addColorStop(1, "transparent");

      ctx.globalAlpha = 0.2;
      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius * 1.05, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineCap = "round";

      // Draw the connections between nodes.
      for (const [aIndex, bIndex] of edges) {
        const a = projectedNodes[aIndex];
        const b = projectedNodes[bIndex];

        const depth = (a.z + b.z) / 2;
        const heat = Math.max(a.heat, b.heat);

        ctx.globalAlpha = Math.min(
          1,
          0.1 + 0.2 * ((depth + 1) * 0.5) + heat * 0.55
        );

        ctx.strokeStyle = heat > 0.15 ? glowColor : lineColor;
        ctx.lineWidth = 0.6 + heat * 1.2;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Draw glowing signals travelling along connections.
      for (const pulse of pulses) {
        const edge = edges[pulse.e];

        const a = projectedNodes[
          pulse.dir === 1 ? edge[0] : edge[1]
        ];

        const b = projectedNodes[
          pulse.dir === 1 ? edge[1] : edge[0]
        ];

        const x = a.x + (b.x - a.x) * pulse.t;
        const y = a.y + (b.y - a.y) * pulse.t;

        const front = (a.z + b.z) / 2 > -0.35 ? 1 : 0.35;

        ctx.globalAlpha = 0.95 * front;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
      }

      // Draw the nodes. Front-facing nodes are brighter and larger.
      for (const point of projectedNodes) {
        const front = (point.z + 1) / 2;

        const nodeRadius =
          (1.3 + 1.7 * front) * point.scale + point.heat * 3.2;

        ctx.globalAlpha = 0.35 + 0.65 * front;
        ctx.fillStyle =
          point.heat > 0.2 ? "#ffffff" : lineColor;

        if (point.heat > 0.2) {
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = 10 + point.heat * 14;
        }

        ctx.beginPath();
        ctx.arc(point.x, point.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
    };

    // Set up the canvas.
    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();

      if (reducedMotion) {
        step(0, 0);
        draw();
      }
    });

    resizeObserver.observe(host);

    // If reduced motion is enabled, draw a still version.
    if (reducedMotion) {
      step(0, 0);
      draw();

      return () => resizeObserver.disconnect();
    }

    // Track the pointer across the window.
    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();

      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;

      pointer.on =
        pointer.x > -40 &&
        pointer.y > -40 &&
        pointer.x < rect.width + 40 &&
        pointer.y < rect.height + 40;

      pointer.nx = clamp(
        (event.clientX - (rect.left + rect.width / 2)) /
          (window.innerWidth * 0.5)
      );

      pointer.ny = clamp(
        (event.clientY - (rect.top + rect.height / 2)) /
          (window.innerHeight * 0.5)
      );

      pointer.last = performance.now();
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    // Only animate while the orb is visible on screen.
    let visible = true;

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    intersectionObserver.observe(host);

    // Main animation loop.
    let animationId = 0;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animationId = requestAnimationFrame(animate);

      const deltaTime = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!visible || document.hidden) return;

      step(deltaTime, now);
      draw();
    };

    animationId = requestAnimationFrame(animate);

    // Clean up animation and event listeners when component unmounts.
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, [glowColor, lineColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 size-full"
    />
  );
}
