import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Particle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-primary/40"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
    transition={{
      duration: 4 + Math.random() * 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
}));

// ─── Isometric engine ─────────────────────────────────────────────
const S = 18,
  CX = 150,
  CY = 210;
const TOP = "#C8921A";
const FRONT = "#7A5412";
const SIDE = "#3D2A08";
const GLOW = "#FFB830";
const SW = "0.6";

function px(x: number, z: number, y: number) {
  return `${(CX + (x - z) * 0.866 * S).toFixed(1)},${(CY + (x + z) * 0.5 * S - y * S).toFixed(1)}`;
}

type BoxProps = {
  ox: number; oz: number; oy: number;
  W: number; D: number; H: number;
  tc?: string; fc?: string; sc?: string;
};

function Box({ ox, oz, oy, W, D, H, tc = TOP, fc = FRONT, sc = SIDE }: BoxProps) {
  const side = [px(ox+W,oz,oy), px(ox+W,oz+D,oy), px(ox+W,oz+D,oy+H), px(ox+W,oz,oy+H)].join(" ");
  const front = [px(ox,oz,oy), px(ox+W,oz,oy), px(ox+W,oz,oy+H), px(ox,oz,oy+H)].join(" ");
  const top = [px(ox,oz,oy+H), px(ox+W,oz,oy+H), px(ox+W,oz+D,oy+H), px(ox,oz+D,oy+H)].join(" ");
  return (
    <>
      <polygon points={side} fill={sc} stroke={GLOW} strokeWidth={SW} />
      <polygon points={front} fill={fc} stroke={GLOW} strokeWidth={SW} />
      <polygon points={top} fill={tc} stroke={GLOW} strokeWidth={SW} />
    </>
  );
}

// ─── 1. ACM Mill — Air Classifying Mill ───────────────────────────
// Vertical grinding body with wider integrated classifier on top,
// side feed inlet, fines outlet on top, coarse outlet at base
const AcmMill = () => (
  <g>
    {/* Base plate */}
    <Box ox={-2.2} oz={-2.2} oy={-0.5} W={4.4} D={4.4} H={0.5} />
    {/* Grinding chamber body */}
    <Box ox={-1.5} oz={-1.5} oy={0} W={3} D={3} H={2.8} />
    {/* Transition collar */}
    <Box ox={-1.8} oz={-1.8} oy={2.8} W={3.6} D={3.6} H={0.4} />
    {/* Classifier section — wider */}
    <Box ox={-2} oz={-2} oy={3.2} W={4} D={4} H={2.6} />
    {/* Classifier top cap */}
    <Box ox={-2.3} oz={-2.3} oy={5.8} W={4.6} D={4.6} H={0.4} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Fines outlet on top */}
    <Box ox={-0.7} oz={-0.7} oy={6.2} W={1.4} D={1.4} H={1.4} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Side feed inlet duct */}
    <Box ox={1.5} oz={-0.6} oy={1.2} W={2.2} D={1.2} H={1} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Feed nozzle tip */}
    <Box ox={1.5} oz={-0.3} oy={1.4} W={0.5} D={0.6} H={0.6} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Coarse reject outlet bottom */}
    <Box ox={-0.6} oz={1.5} oy={0} W={1.2} D={1} H={1} />
  </g>
);

// ─── 2. Pulveriser Mill ────────────────────────────────────────────
// Compact vertical mill with large top-mounted feed hopper,
// swing-hammer grinding chamber, side product outlet, motor base
const PulveriserMill = () => (
  <g>
    {/* Base frame */}
    <Box ox={-2} oz={-2} oy={-0.5} W={4} D={4} H={0.5} />
    {/* Motor / drive base */}
    <Box ox={-1.8} oz={-1.8} oy={0} W={3.6} D={3.6} H={1.2} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
    {/* Grinding chamber */}
    <Box ox={-1.5} oz={-1.5} oy={1.2} W={3} D={3} H={3} />
    {/* Transition hopper lower */}
    <Box ox={-1.8} oz={-1.8} oy={4.2} W={3.6} D={3.6} H={0.8} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Feed hopper upper */}
    <Box ox={-2.2} oz={-2.2} oy={5} W={4.4} D={4.4} H={1.6} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Hopper top rim */}
    <Box ox={-2.5} oz={-2.5} oy={6.6} W={5} D={5} H={0.3} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Side product outlet */}
    <Box ox={1.5} oz={-0.5} oy={1.5} W={2} D={1} H={1} />
    {/* Outlet pipe section */}
    <Box ox={1.5} oz={-0.2} oy={1.7} W={0.5} D={0.4} H={0.6} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
  </g>
);

// ─── 3. Blender — Ribbon Blender ──────────────────────────────────
// Horizontal U-trough with flanged lid, ribbon agitator, end-mounted
// gearbox and motor, discharge valve at base centre
const Blender = () => (
  <g>
    {/* Four support legs */}
    <Box ox={-4} oz={-1.3} oy={-1.2} W={0.5} D={0.5} H={1.2} />
    <Box ox={3.5} oz={-1.3} oy={-1.2} W={0.5} D={0.5} H={1.2} />
    <Box ox={-4} oz={0.8} oy={-1.2} W={0.5} D={0.5} H={1.2} />
    <Box ox={3.5} oz={0.8} oy={-1.2} W={0.5} D={0.5} H={1.2} />
    {/* Trough body */}
    <Box ox={-4.2} oz={-1.4} oy={0} W={8.4} D={2.8} H={1.8} />
    {/* Flanged lid */}
    <Box ox={-4.2} oz={-1.4} oy={1.8} W={8.4} D={2.8} H={0.25} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Lid inspection hatch */}
    <Box ox={-0.8} oz={-1.4} oy={2.05} W={1.6} D={0.6} H={0.15} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Drive gearbox */}
    <Box ox={3.5} oz={-1.2} oy={0.2} W={2} D={2.4} H={2.2} tc="#C8921A" fc="#5A3A0A" sc="#2A1A04" />
    {/* Motor on gearbox */}
    <Box ox={4.5} oz={-0.8} oy={0.5} W={1.5} D={1.6} H={1.6} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
    {/* Shaft stub */}
    <Box ox={3.5} oz={0.1} oy={1} W={0.3} D={0.2} H={0.3} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Centre discharge outlet */}
    <Box ox={-0.5} oz={1.4} oy={-0.8} W={1} D={0.8} H={0.8} />
  </g>
);

// ─── 4. Bag Filter — Pulse Jet ────────────────────────────────────
// Tall rectangular housing divided into dirty/clean air plenums,
// pulse-jet header on top, side inlet, pyramid hopper, support legs
const BagFilter = () => (
  <g>
    {/* Support legs — four corners */}
    <Box ox={-2} oz={-1.6} oy={-3.2} W={0.4} D={0.4} H={1.8} />
    <Box ox={1.6} oz={-1.6} oy={-3.2} W={0.4} D={0.4} H={1.8} />
    <Box ox={-2} oz={1} oy={-3.2} W={0.4} D={0.4} H={1.8} />
    <Box ox={1.6} oz={1} oy={-3.2} W={0.4} D={0.4} H={1.8} />
    {/* Pyramid hopper bottom */}
    <Box ox={-1.6} oz={-1.2} oy={-2.2} W={3.2} D={2.4} H={0.8} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
    {/* Discharge rotary valve */}
    <Box ox={-0.5} oz={-0.5} oy={-2.6} W={1} D={1} H={0.5} />
    {/* Main dirty-air housing */}
    <Box ox={-2} oz={-1.5} oy={0} W={4} D={3} H={5} />
    {/* Tube-sheet divider */}
    <Box ox={-2} oz={-1.5} oy={5} W={4} D={3} H={0.2} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Clean-air plenum top */}
    <Box ox={-2.2} oz={-1.7} oy={5.2} W={4.4} D={3.4} H={1.6} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Pulse-jet manifold header */}
    <Box ox={-2.4} oz={-1.9} oy={6.8} W={4.8} D={3.8} H={0.8} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Clean air outlet stack */}
    <Box ox={-0.7} oz={-0.7} oy={7.6} W={1.4} D={1.4} H={1.2} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Side inlet duct */}
    <Box ox={2} oz={-0.6} oy={1.5} W={2} D={1.2} H={1.2} />
  </g>
);

// ─── 5. Centrifugal Fan ───────────────────────────────────────────
// Scroll/volute housing with axial inlet bell mouth on front face,
// upward discharge duct, rear-mounted motor on common base frame
const CentrifugalFan = () => (
  <g>
    {/* Base skid */}
    <Box ox={-2.8} oz={-2.6} oy={-0.5} W={5.6} D={5.2} H={0.5} />
    {/* Main scroll/volute housing */}
    <Box ox={-2.5} oz={-2} oy={0} W={4} D={4} H={4} />
    {/* Volute cut-off block — thicker top-right */}
    <Box ox={0.5} oz={-2} oy={2.5} W={1} D={4} H={1.5} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Inlet bell mouth (protruding forward in z-) */}
    <Box ox={-1.1} oz={-3.2} oy={0.8} W={2.2} D={1.2} H={2.2} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Inlet bell flare */}
    <Box ox={-1.4} oz={-4} oy={0.5} W={2.8} D={0.8} H={2.8} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Discharge duct — going up */}
    <Box ox={-0.8} oz={-2} oy={4} W={1.6} D={1.4} H={2.5} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Discharge flange */}
    <Box ox={-1} oz={-2.2} oy={6.5} W={2} D={1.8} H={0.3} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Motor body */}
    <Box ox={-1} oz={2} oy={0.3} W={2} D={2.5} H={2.8} tc="#C8921A" fc="#5A3A0A" sc="#2A1A04" />
    {/* Motor shaft coupling */}
    <Box ox={-0.4} oz={2} oy={1.2} W={0.8} D={0.4} H={0.5} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Motor feet */}
    <Box ox={-1.2} oz={2} oy={-0.5} W={2.4} D={2.5} H={0.5} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
  </g>
);

// ─── 6. Grader — Air Classifier / Centrifugal Grader ─────────────
// Tall vertical classifier column with integrated rotor section,
// adjustable louvre vanes area, side feed inlet and dual outlets
const Grader = () => (
  <g>
    {/* Base */}
    <Box ox={-2} oz={-2} oy={-0.5} W={4} D={4} H={0.5} />
    {/* Lower body — coarse zone */}
    <Box ox={-1.6} oz={-1.6} oy={0} W={3.2} D={3.2} H={2} />
    {/* Mid transition (stepped in) */}
    <Box ox={-1.3} oz={-1.3} oy={2} W={2.6} D={2.6} H={0.4} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Classification column */}
    <Box ox={-1.5} oz={-1.5} oy={2.4} W={3} D={3} H={3.2} />
    {/* Rotor housing — wider ring */}
    <Box ox={-2} oz={-2} oy={5.6} W={4} D={4} H={1} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Fines outlet top */}
    <Box ox={-2.2} oz={-2.2} oy={6.6} W={4.4} D={4.4} H={0.8} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Top outlet duct */}
    <Box ox={-0.8} oz={-0.8} oy={7.4} W={1.6} D={1.6} H={1.4} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Side feed inlet */}
    <Box ox={1.6} oz={-0.6} oy={1} W={2} D={1.2} H={1} />
    {/* Coarse reject bottom outlet */}
    <Box ox={-0.6} oz={1.6} oy={0} W={1.2} D={1} H={1} />
    {/* Access inspection door */}
    <Box ox={-1.5} oz={-1.6} oy={3} W={0.1} D={0.8} H={1} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
  </g>
);

// ─── 7. Belt Conveyor ─────────────────────────────────────────────
// Flat horizontal troughed-belt conveyor, head and tail pulley stands,
// drive motor at head, idler rollers implied, discharge at head end
const BeltConveyor = () => (
  <g>
    {/* Tail end stand — left */}
    <Box ox={-5.5} oz={-1} oy={-1.8} W={0.6} D={2} H={1.8} />
    <Box ox={-5.5} oz={-1} oy={0} W={0.6} D={2} H={0.3} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Head end stand — right */}
    <Box ox={4.8} oz={-1} oy={-1.8} W={0.6} D={2} H={1.8} />
    <Box ox={4.8} oz={-1} oy={0} W={0.6} D={2} H={0.3} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Intermediate support leg 1 */}
    <Box ox={-2.2} oz={-0.3} oy={-1.8} W={0.4} D={0.6} H={1.8} />
    {/* Intermediate support leg 2 */}
    <Box ox={1.5} oz={-0.3} oy={-1.8} W={0.4} D={0.6} H={1.8} />
    {/* Left side frame rail */}
    <Box ox={-5.5} oz={-1} oy={0.3} W={10.6} D={0.3} H={0.3} />
    {/* Right side frame rail */}
    <Box ox={-5.5} oz={0.7} oy={0.3} W={10.6} D={0.3} H={0.3} />
    {/* Troughed belt surface */}
    <Box ox={-5.5} oz={-1} oy={0.6} W={10.6} D={2} H={0.2} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Head pulley block */}
    <Box ox={4.2} oz={-1} oy={0} W={0.8} D={2} H={0.8} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Tail pulley block */}
    <Box ox={-5.5} oz={-1} oy={0} W={0.8} D={2} H={0.8} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Drive motor */}
    <Box ox={4.8} oz={-0.5} oy={0.6} W={1.8} D={1} H={1.4} tc="#C8921A" fc="#5A3A0A" sc="#2A1A04" />
    {/* Gearbox */}
    <Box ox={5} oz={-0.3} oy={1.8} W={1.2} D={0.6} H={0.8} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
    {/* Tail-end feed hopper */}
    <Box ox={-6.8} oz={-0.8} oy={0.6} W={1.5} D={1.6} H={1.5} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    <Box ox={-6.5} oz={-0.5} oy={2.1} W={1} D={1} H={1} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
  </g>
);

// ─── 8. Screw Conveyor ────────────────────────────────────────────
// Horizontal enclosed U-trough with bolted flanged cover,
// helical screw shaft, end-mounted gearbox + motor, trough supports
const ScrewConveyor = () => (
  <g>
    {/* Support pedestal 1 */}
    <Box ox={-4.5} oz={-0.3} oy={-1.5} W={0.6} D={0.6} H={1.5} />
    {/* Support pedestal 2 */}
    <Box ox={-1.5} oz={-0.3} oy={-1.5} W={0.6} D={0.6} H={1.5} />
    {/* Support pedestal 3 */}
    <Box ox={1.5} oz={-0.3} oy={-1.5} W={0.6} D={0.6} H={1.5} />
    {/* Support pedestal 4 */}
    <Box ox={3.8} oz={-0.3} oy={-1.5} W={0.6} D={0.6} H={1.5} />
    {/* Trough body (U-shaped approximated) */}
    <Box ox={-4.8} oz={-1} oy={0} W={9.8} D={2} H={1.4} />
    {/* Trough flanged cover */}
    <Box ox={-4.8} oz={-1} oy={1.4} W={9.8} D={2} H={0.22} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Inspection hatch on cover */}
    <Box ox={-0.6} oz={-1} oy={1.62} W={1.2} D={0.5} H={0.1} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Tail end bearing housing */}
    <Box ox={-5.2} oz={-0.6} oy={0.2} W={0.5} D={1.2} H={1} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Drive gearbox */}
    <Box ox={4.8} oz={-0.8} oy={0} W={2} D={1.6} H={1.8} tc="#C8921A" fc="#5A3A0A" sc="#2A1A04" />
    {/* Motor body */}
    <Box ox={5.5} oz={-0.5} oy={0.2} W={2} D={1} H={1.4} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
    {/* Motor fan end */}
    <Box ox={6.5} oz={-0.3} oy={0.4} W={0.5} D={0.6} H={1} tc="#1A1004" fc="#0A0804" sc="#050402" />
    {/* Inlet hopper top */}
    <Box ox={-3} oz={-1} oy={1.62} W={1.8} D={2} H={1.5} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    <Box ox={-2.7} oz={-0.8} oy={3.12} W={1.2} D={1.6} H={0.8} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Discharge outlet bottom */}
    <Box ox={3} oz={-0.4} oy={-0.8} W={1} D={0.8} H={0.8} />
  </g>
);

// ─── Shape registry — matches image filenames ─────────────────────
const SHAPES = [
  { id: "acm",    label: "ACM Mill",         tag: "Milling",      Component: AcmMill },
  { id: "pulv",   label: "Pulveriser Mill",   tag: "Milling",      Component: PulveriserMill },
  { id: "blend",  label: "Blender",           tag: "Mixing",       Component: Blender },
  { id: "bag",    label: "Bag Filter",        tag: "Emission Ctrl",Component: BagFilter },
  { id: "fan",    label: "Centrifugal Fan",   tag: "Air Handling", Component: CentrifugalFan },
  { id: "grade",  label: "Grader",            tag: "Classifying",  Component: Grader },
  { id: "belt",   label: "Belt Conveyor",     tag: "Conveying",    Component: BeltConveyor },
  { id: "screw",  label: "Screw Conveyor",    tag: "Conveying",    Component: ScrewConveyor },
];

const INTERVAL = 3400;

// ─── Main 3D Showcase ─────────────────────────────────────────────
const Product3DShowcase = () => {
  const [idx, setIdx] = useState(0);

  const advance = useCallback(() => setIdx((i) => (i + 1) % SHAPES.length), []);

  useEffect(() => {
    const id = setInterval(advance, INTERVAL);
    return () => clearInterval(id);
  }, [advance]);

  const { label, tag, Component } = SHAPES[idx];

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      {/* Ambient glow */}
      <div className="absolute inset-x-0 bottom-12 h-28 pointer-events-none">
        <div className="mx-auto w-64 h-full rounded-full bg-primary/15 blur-3xl" />
      </div>

      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${idx}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="mb-2 flex flex-col items-center gap-1"
        >
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest border border-primary/40 text-primary bg-primary/10 font-display">
            {tag}
          </span>
          <p className="text-primary font-display font-bold text-lg text-glow-amber">
            {label}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* SVG stage */}
      <div className="relative w-full max-w-[340px] sm:max-w-md md:max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -10 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Floating bob */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 300 330" className="w-full h-auto">
                {/* Grid floor dots */}
                {Array.from({ length: 5 }, (_, r) =>
                  Array.from({ length: 5 }, (_, c) => {
                    const gx = CX + (c - 2 - (r - 2)) * 0.866 * S * 1.5;
                    const gy = CY + (c - 2 + (r - 2)) * 0.5 * S * 1.5 + 30;
                    return (
                      <circle key={`${r}-${c}`} cx={gx} cy={gy} r="1.2" fill={GLOW} opacity="0.18" />
                    );
                  })
                )}
                {/* Shadow ellipse on floor */}
                <ellipse cx="150" cy="218" rx="80" ry="20" fill="hsl(42,100%,55%)" opacity="0.07" />
                {/* The isometric shape */}
                <Component />
                {/* Scan line */}
                <motion.rect
                  x="0" y="0" width="300" height="4"
                  fill="hsl(42,100%,55%)" opacity="0.04"
                  animate={{ y: [50, 280, 50] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────
const Hero = () => {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start overflow-hidden pt-[100px]"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home-bg.jpeg')" }}
      />
      {/* Executive dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060d14]/95 via-[#060d14]/80 to-[#060d14]/50" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start py-10 md:py-12">
        {/* Left: Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-5"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-medium bg-primary/5">
              Process Solution Architects
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-foreground">Engineering Precision,</span>
            <br />
            <span className="text-primary text-glow-amber">Powering Throughput</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-lg mb-8 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Milling, mixing, and emission control solutions engineered for
            maximum efficiency. From lab trials to turnkey installations.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <button
              onClick={() => scrollTo("#solutions")}
              className="px-7 py-3 bg-primary text-primary-foreground font-display font-bold rounded-md text-base hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Solutions
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="px-7 py-3 border border-primary/40 text-primary font-display font-bold rounded-md text-base hover:bg-primary/10 hover:border-primary/60 transition-all duration-300"
            >
              Book a Consulting Call!
            </button>
          </motion.div>
        </div>

        {/* Right: 3D Product Showcase */}
        <motion.div
          className="flex items-center justify-center w-full"
          style={{ minHeight: "clamp(260px, 45vw, 440px)" }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Product3DShowcase />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
