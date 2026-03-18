import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Particle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-primary/40"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
    transition={{ duration: 4 + Math.random() * 3, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
}));

// ─── Isometric engine ─────────────────────────────────────────────
const S = 17, CX = 150, CY = 215;
const TOP = "#C8921A", FRONT = "#7A5412", SIDE = "#3D2A08";
const GLOW = "#FFB830", SW = "0.6";

function px(x: number, z: number, y: number) {
  return `${(CX + (x - z) * 0.866 * S).toFixed(1)},${(CY + (x + z) * 0.5 * S - y * S).toFixed(1)}`;
}

type BoxProps = { ox: number; oz: number; oy: number; W: number; D: number; H: number; tc?: string; fc?: string; sc?: string };

function Box({ ox, oz, oy, W, D, H, tc = TOP, fc = FRONT, sc = SIDE }: BoxProps) {
  const side  = [px(ox+W,oz,oy),   px(ox+W,oz+D,oy),   px(ox+W,oz+D,oy+H), px(ox+W,oz,oy+H)].join(" ");
  const front = [px(ox,oz,oy),     px(ox+W,oz,oy),     px(ox+W,oz,oy+H),   px(ox,oz,oy+H)].join(" ");
  const top   = [px(ox,oz,oy+H),   px(ox+W,oz,oy+H),   px(ox+W,oz+D,oy+H), px(ox,oz+D,oy+H)].join(" ");
  return (
    <>
      <polygon points={side}  fill={sc} stroke={GLOW} strokeWidth={SW} />
      <polygon points={front} fill={fc} stroke={GLOW} strokeWidth={SW} />
      <polygon points={top}   fill={tc} stroke={GLOW} strokeWidth={SW} />
    </>
  );
}

// ─── 1. ACM Mill ─────────────────────────────────────────────────
// Flat horizontal disc mill on raised skid with 4 tall pedestal legs,
// large vertical motor on the left, smaller motor on the right.
const AcmMill = () => (
  <g>
    {/* 4 tall pedestal legs */}
    <Box ox={-3.8} oz={-2.2} oy={-3} W={0.7} D={0.7} H={3} />
    <Box ox={3.1}  oz={-2.2} oy={-3} W={0.7} D={0.7} H={3} />
    <Box ox={-3.8} oz={1.5}  oy={-3} W={0.7} D={0.7} H={3} />
    <Box ox={3.1}  oz={1.5}  oy={-3} W={0.7} D={0.7} H={3} />
    {/* Skid base plate */}
    <Box ox={-4} oz={-2.5} oy={-0.6} W={8} D={4.7} H={0.6} />
    {/* Main flat disc mill housing — wide, low */}
    <Box ox={-1.8} oz={-1.6} oy={0} W={3.6} D={3.2} H={1.7} />
    {/* Mill top flange — slightly wider */}
    <Box ox={-2.1} oz={-1.9} oy={1.7} W={4.2} D={3.8} H={0.25} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Mill bottom product outlet chute */}
    <Box ox={-0.6} oz={0.4} oy={-0.6} W={1.2} D={0.8} H={0.6} />
    {/* Left large vertical motor body */}
    <Box ox={-4} oz={-1.2} oy={0} W={1.8} D={2.4} H={3.8} tc="#C8921A" fc="#5A3A0A" sc="#2A1A04" />
    {/* Left motor top cap */}
    <Box ox={-3.8} oz={-1} oy={3.8} W={1.4} D={2} H={0.8} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Left motor — shaft coupling to mill */}
    <Box ox={-2.2} oz={-0.5} oy={0.6} W={0.4} D={1} H={0.5} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
    {/* Right smaller motor body */}
    <Box ox={1.8} oz={-1} oy={0} W={1.5} D={2} H={2.6} tc="#C8921A" fc="#5A3A0A" sc="#2A1A04" />
    {/* Right motor top cap */}
    <Box ox={2} oz={-0.8} oy={2.6} W={1.1} D={1.6} H={0.7} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Right motor — shaft coupling to mill */}
    <Box ox={1.4} oz={-0.4} oy={0.5} W={0.4} D={0.8} H={0.5} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
  </g>
);

// ─── 2. Pulveriser Mill ───────────────────────────────────────────
// Wide open-frame horizontal hammer mill, large square feed hopper
// on top, control panel + motor on right side, drum below right.
const PulveriserMill = () => (
  <g>
    {/* Frame legs */}
    <Box ox={-4}   oz={-2}   oy={-2.2} W={0.5} D={0.5} H={2.2} />
    <Box ox={3.5}  oz={-2}   oy={-2.2} W={0.5} D={0.5} H={2.2} />
    <Box ox={-4}   oz={1.7}  oy={-2.2} W={0.5} D={0.5} H={2.2} />
    <Box ox={3.5}  oz={1.7}  oy={-2.2} W={0.5} D={0.5} H={2.2} />
    {/* Frame base */}
    <Box ox={-4} oz={-2} oy={-0.4} W={8} D={3.7} H={0.4} />
    {/* Main mill body (wide, open, horizontal) */}
    <Box ox={-3.5} oz={-1.7} oy={0} W={5} D={3.4} H={2.2} />
    {/* Top transition section */}
    <Box ox={-1.8} oz={-1.2} oy={2.2} W={3.6} D={2.4} H={0.8} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Square feed hopper body */}
    <Box ox={-1.5} oz={-1} oy={3} W={3} D={2} H={1.8} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Hopper flared top */}
    <Box ox={-2.2} oz={-1.7} oy={4.8} W={4.4} D={3.4} H={0.5} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Hopper inlet spout */}
    <Box ox={-1} oz={-0.8} oy={5.3} W={2} D={1.6} H={1} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Right-side control panel box */}
    <Box ox={1.5} oz={2} oy={0} W={1.2} D={0.7} H={2.2} tc="#C8921A" fc="#5A3A0A" sc="#2A1A04" />
    {/* Motor (right) */}
    <Box ox={2.7} oz={1.7} oy={0} W={1.6} D={1.2} H={2.2} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
    {/* Motor end cap */}
    <Box ox={3.5} oz={1.9} oy={0.3} W={0.5} D={0.8} H={1.6} tc="#1A1004" fc="#0A0804" sc="#050402" />
    {/* Bottom cylindrical drum/fan (right, below frame) */}
    <Box ox={1.2} oz={-1.2} oy={-2.2} W={2.8} D={2.4} H={2.2} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
    {/* Drum end flange */}
    <Box ox={3.8} oz={-1} oy={-2} W={0.3} D={2} H={1.8} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
  </g>
);

// ─── 3. Blender (Horizontal Paddle/Plough Mixer) ──────────────────
// Long cylindrical horizontal trough on two portal-frame legs,
// vertical motor on gearbox at the left end, 3 top hatches.
const Blender = () => (
  <g>
    {/* LEFT portal frame — base foot plate */}
    <Box ox={-5}   oz={-1.4} oy={-1.8} W={2.2} D={2.8} H={0.4} />
    {/* Left frame — outer (left) column */}
    <Box ox={-5}   oz={-1.4} oy={-1.4} W={0.45} D={2.8} H={5} />
    {/* Left frame — inner column (right side of frame) */}
    <Box ox={-3.2} oz={-1.4} oy={-1.4} W={0.45} D={2.8} H={3.2} />

    {/* RIGHT portal frame — base foot plate */}
    <Box ox={2.8}  oz={-1.4} oy={-1.8} W={2.2} D={2.8} H={0.4} />
    {/* Right frame — inner column */}
    <Box ox={2.8}  oz={-1.4} oy={-1.4} W={0.45} D={2.8} H={3.2} />
    {/* Right frame — outer column */}
    <Box ox={4.5}  oz={-1.4} oy={-1.4} W={0.45} D={2.8} H={3.2} />

    {/* Main trough body */}
    <Box ox={-4.5} oz={-1.2} oy={0} W={8} D={2.4} H={1.8} />
    {/* Trough top panel */}
    <Box ox={-4.5} oz={-1.2} oy={1.8} W={8} D={2.4} H={0.2} tc="#FFB830" fc="#C8921A" sc="#7A5412" />

    {/* 3 circular inspection hatches on top */}
    <Box ox={-3.5} oz={-1}  oy={2}   W={0.7} D={1.4} H={0.18} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    <Box ox={-0.8} oz={-1}  oy={2}   W={0.7} D={1.4} H={0.18} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    <Box ox={2}    oz={-1}  oy={2}   W={0.7} D={1.4} H={0.18} tc="#FFB830" fc="#C8921A" sc="#7A5412" />

    {/* Gearbox on left end */}
    <Box ox={-5} oz={-0.9} oy={0.3} W={0.6} D={1.8} H={1.8} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
    {/* Vertical motor on top of gearbox */}
    <Box ox={-5.3} oz={-0.7} oy={2.1} W={0.9} D={1.4} H={2.5} tc="#C8921A" fc="#5A3A0A" sc="#2A1A04" />
    {/* Motor top */}
    <Box ox={-5.1} oz={-0.5} oy={4.6} W={0.5} D={1} H={0.6} tc="#FFB830" fc="#C8921A" sc="#7A5412" />

    {/* Right end bearing cap */}
    <Box ox={3.4}  oz={-0.8} oy={0.3} W={0.5} D={1.6} H={1} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />

    {/* Center bottom discharge */}
    <Box ox={-0.5} oz={1.2}  oy={-1.5} W={1} D={0.8} H={1.5} />
  </g>
);

// ─── 4. Bag Filter (Horizontal Cylindrical Vessel) ────────────────
// Long horizontal multi-section cylindrical pressure vessel, large
// flanged conical left end, top nozzle, pedestal support legs.
const BagFilter = () => (
  <g>
    {/* Pedestal supports (3 under body) */}
    <Box ox={-4}   oz={-0.5} oy={-1.8} W={0.6} D={1} H={1.8} />
    <Box ox={-0.8} oz={-0.5} oy={-1.8} W={0.6} D={1} H={1.8} />
    <Box ox={2.5}  oz={-0.5} oy={-1.8} W={0.6} D={1} H={1.8} />
    {/* Pedestal base plates */}
    <Box ox={-4.2} oz={-0.7} oy={-2} W={1} D={1.4} H={0.2} />
    <Box ox={-1}   oz={-0.7} oy={-2} W={1} D={1.4} H={0.2} />
    <Box ox={2.3}  oz={-0.7} oy={-2} W={1} D={1.4} H={0.2} />

    {/* Large conical/flanged left end cap */}
    <Box ox={-5.5} oz={-1.5} oy={-0.8} W={1.5} D={3} H={3.5} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Left end ring flange */}
    <Box ox={-4.2} oz={-1.8} oy={-1} W={0.3} D={3.6} H={4} tc="#FFB830" fc="#C8921A" sc="#7A5412" />

    {/* Body section 1 */}
    <Box ox={-4}   oz={-1.2} oy={0} W={2.2} D={2.4} H={2.4} />
    {/* Ring flange 1 */}
    <Box ox={-1.9} oz={-1.3} oy={-0.1} W={0.25} D={2.6} H={2.6} tc="#FFB830" fc="#C8921A" sc="#7A5412" />

    {/* Body section 2 */}
    <Box ox={-1.6} oz={-1.2} oy={0} W={2.2} D={2.4} H={2.4} />
    {/* Ring flange 2 */}
    <Box ox={0.5}  oz={-1.3} oy={-0.1} W={0.25} D={2.6} H={2.6} tc="#FFB830" fc="#C8921A" sc="#7A5412" />

    {/* Body section 3 */}
    <Box ox={0.7}  oz={-1.2} oy={0} W={2.2} D={2.4} H={2.4} />
    {/* Ring flange 3 */}
    <Box ox={2.8}  oz={-1.3} oy={-0.1} W={0.25} D={2.6} H={2.6} tc="#FFB830" fc="#C8921A" sc="#7A5412" />

    {/* Body section 4 / right end (tapered smaller) */}
    <Box ox={3}    oz={-1}   oy={0.2} W={1.5} D={2} H={2} />
    {/* Right end flange */}
    <Box ox={4.4}  oz={-1.1} oy={0.1} W={0.25} D={2.2} H={2.2} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Right end nozzle */}
    <Box ox={4.6}  oz={-0.5} oy={0.6} W={0.6} D={1} H={0.8} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />

    {/* Top nozzle (center top) */}
    <Box ox={-1.4} oz={-0.5} oy={2.4} W={1} D={1} H={1} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Top nozzle flange */}
    <Box ox={-1.6} oz={-0.7} oy={3.4} W={1.4} D={1.4} H={0.2} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
  </g>
);

// ─── 5. Centrifugal Fan ───────────────────────────────────────────
// Compact square volute housing, wide flat top discharge plate,
// side discharge duct to the right, two rectangular base pads.
const CentrifugalFan = () => (
  <g>
    {/* Two base pads (rectangular feet) */}
    <Box ox={-2}  oz={-1.2} oy={-0.8} W={1.2} D={2.4} H={0.8} />
    <Box ox={0.8} oz={-1.2} oy={-0.8} W={1.2} D={2.4} H={0.8} />

    {/* Main square volute/scroll housing */}
    <Box ox={-2}  oz={-1.2} oy={0} W={4} D={2.4} H={3.5} />

    {/* Front inlet face — slightly recessed indicator */}
    <Box ox={-1.8} oz={-1.3} oy={0.3} W={3.6} D={0.2} H={2.9} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Inlet eye circular recess (approximated with inner box) */}
    <Box ox={-0.9} oz={-1.4} oy={0.9} W={1.8} D={0.3} H={1.8} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />

    {/* Wide flat top discharge plate / flange */}
    <Box ox={-2.5} oz={-1.7} oy={3.5} W={5} D={3.4} H={0.35} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Top discharge box / outlet going up */}
    <Box ox={-0.8} oz={-1.2} oy={3.85} W={1.6} D={0.8} H={1.5} tc="#FFB830" fc="#C8921A" sc="#7A5412" />

    {/* Side discharge duct — exits to the right */}
    <Box ox={2}  oz={-1} oy={1.2} W={2.5} D={2} H={1.2} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Discharge duct end flange */}
    <Box ox={4.4} oz={-1.1} oy={1.1} W={0.25} D={2.2} H={1.4} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
  </g>
);

// ─── 6. Grader (Aspiration Column + Vibrating Screen) ─────────────
// LEFT: tall aspiration/air column with tapered top outlet.
// RIGHT: horizontal vibrating screen box on portal frame with feed hopper.
const Grader = () => (
  <g>
    {/* ── Left aspiration column ── */}
    {/* Base plate */}
    <Box ox={-6.8} oz={-1.3} oy={-0.5} W={2.6} D={2.6} H={0.5} />
    {/* Column body */}
    <Box ox={-6.5} oz={-1} oy={0} W={2} D={2} H={5} />
    {/* Column — recessed control panel face */}
    <Box ox={-6.5} oz={-1.1} oy={1} W={2} D={0.2} H={2} tc="#C8921A" fc="#5A3A0A" sc="#2A1A04" />
    {/* Tapered transition top */}
    <Box ox={-6.8} oz={-1.3} oy={5} W={2.6} D={2.6} H={0.8} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Top outlet duct */}
    <Box ox={-6.3} oz={-0.8} oy={5.8} W={1.6} D={1.6} H={1} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Top outlet flange */}
    <Box ox={-6.5} oz={-1} oy={6.8} W={2} D={2} H={0.25} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Bottom discharge chute (angled lower-left) */}
    <Box ox={-7.2} oz={-1.5} oy={-1.5} W={2} D={2} H={1.5} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />

    {/* ── Right portal frame + vibrating screen ── */}
    {/* Portal legs — 4 corners */}
    <Box ox={-2}  oz={-1.5} oy={-1} W={0.5} D={0.5} H={4.5} />
    <Box ox={2.8} oz={-1.5} oy={-1} W={0.5} D={0.5} H={4.5} />
    <Box ox={-2}  oz={0.8}  oy={-1} W={0.5} D={0.5} H={4.5} />
    <Box ox={2.8} oz={0.8}  oy={-1} W={0.5} D={0.5} H={4.5} />
    {/* Portal base plates */}
    <Box ox={-2.2} oz={-1.7} oy={-1.2} W={0.9} D={0.9} H={0.2} />
    <Box ox={2.6}  oz={-1.7} oy={-1.2} W={0.9} D={0.9} H={0.2} />
    <Box ox={-2.2} oz={0.6}  oy={-1.2} W={0.9} D={0.9} H={0.2} />
    <Box ox={2.6}  oz={0.6}  oy={-1.2} W={0.9} D={0.9} H={0.2} />
    {/* Horizontal screen box */}
    <Box ox={-2}  oz={-1.5} oy={3.5} W={5.3} D={2.8} H={1.5} />
    {/* Screen box top surface */}
    <Box ox={-2}  oz={-1.5} oy={5} W={5.3} D={2.8} H={0.2} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Feed hopper (on right side of screen box top) */}
    <Box ox={1}   oz={-1.3} oy={5.2} W={2.2} D={2.4} H={1.5} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Feed hopper spout / opening */}
    <Box ox={1.3} oz={-0.9} oy={6.7} W={1.6} D={1.6} H={1} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Vibrator motor under screen */}
    <Box ox={0.2} oz={-0.8} oy={2.8} W={1.2} D={1.6} H={0.8} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
    {/* Connecting duct from column to screen box (at top) */}
    <Box ox={-5.2} oz={-0.7} oy={5.5} W={3.5} D={1.4} H={0.6} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
  </g>
);

// ─── 7. Belt Conveyor (Inclined) ─────────────────────────────────
// Inclined belt with cross-cleats running from low tail (right) to
// high head (left), tall vertical H-frame stand at the top, feed
// hopper box and drive drum at the bottom tail.
const BeltConveyor = () => (
  <g>
    {/* ── Tail end (low right) ── */}
    {/* Tail hopper box */}
    <Box ox={2.5}  oz={-1.2} oy={-1.5} W={2.5} D={2.4} H={1.8} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Tail frame foot left */}
    <Box ox={2.5}  oz={-1.2} oy={-3} W={0.5} D={0.5} H={1.5} />
    {/* Tail frame foot right */}
    <Box ox={4.5}  oz={-1.2} oy={-3} W={0.5} D={0.5} H={1.5} />
    {/* Tail drive drum */}
    <Box ox={2.5}  oz={-1}   oy={-1.5} W={0.5} D={2} H={0.5} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Drive motor at tail */}
    <Box ox={4.2}  oz={-0.8} oy={-1.2} W={1.2} D={1.6} H={1} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />

    {/* ── Inclined belt sections (4 steps from low to high) ── */}
    {/* Each segment offset by Δox=-2, Δoy=+1.35 to simulate ~30° incline */}
    {/* Segment 1 — bottom */}
    <Box ox={0.5}  oz={-1}  oy={0}   W={2.5} D={2} H={0.35} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Cleat 1 */}
    <Box ox={1.2}  oz={-1}  oy={0.35} W={0.3} D={2} H={0.2} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Segment 2 */}
    <Box ox={-1.5} oz={-1}  oy={1.35} W={2.5} D={2} H={0.35} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Cleat 2 */}
    <Box ox={-0.8} oz={-1}  oy={1.7}  W={0.3} D={2} H={0.2} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Segment 3 */}
    <Box ox={-4}   oz={-1}  oy={2.7}  W={2.5} D={2} H={0.35} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Cleat 3 */}
    <Box ox={-3.3} oz={-1}  oy={3.05} W={0.3} D={2} H={0.2} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    {/* Segment 4 — top (head end) */}
    <Box ox={-6.5} oz={-1}  oy={4.05} W={2.5} D={2} H={0.35} tc="#FFB830" fc="#C8921A" sc="#7A5412" />

    {/* Side frame rails (running parallel to belt) */}
    <Box ox={0.5}  oz={-1.1} oy={0.1}  W={9}  D={0.2} H={0.2} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
    <Box ox={0.5}  oz={0.9}  oy={0.1}  W={9}  D={0.2} H={0.2} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />

    {/* ── Head end — tall H-frame stand ── */}
    {/* Left column */}
    <Box ox={-7.2} oz={-1.1} oy={-1.5} W={0.5} D={0.5} H={6} />
    {/* Right column */}
    <Box ox={-7.2} oz={0.6}  oy={-1.5} W={0.5} D={0.5} H={6} />
    {/* Cross member on H-frame */}
    <Box ox={-7.2} oz={-1.1} oy={4.3}  W={0.5} D={1.7} H={0.4} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Head frame base foot left */}
    <Box ox={-7.4} oz={-1.3} oy={-1.7} W={0.9} D={0.7} H={0.2} />
    {/* Head frame base foot right */}
    <Box ox={-7.4} oz={0.4}  oy={-1.7} W={0.9} D={0.7} H={0.2} />
    {/* Head pulley */}
    <Box ox={-7}   oz={-1}   oy={4.05} W={0.5} D={2}   H={0.5} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />
  </g>
);

// ─── 8. Screw Conveyor (Tubular Horizontal) ────────────────────────
// Long horizontal TUBE-type screw conveyor with bolted ring flanges,
// flanged inlet on left, top inlet nozzle, pedestal saddle supports,
// gearbox and end-mounted motor on the right.
const ScrewConveyor = () => (
  <g>
    {/* Pedestal saddle supports (3 along length) */}
    <Box ox={-5.5} oz={-0.5} oy={-1.8} W={0.8} D={1} H={1.8} />
    <Box ox={-1.8} oz={-0.5} oy={-1.8} W={0.8} D={1} H={1.8} />
    <Box ox={1.8}  oz={-0.5} oy={-1.8} W={0.8} D={1} H={1.8} />
    {/* Saddle base plates */}
    <Box ox={-5.7} oz={-0.7} oy={-2} W={1.2} D={1.4} H={0.2} />
    <Box ox={-2}   oz={-0.7} oy={-2} W={1.2} D={1.4} H={0.2} />
    <Box ox={1.6}  oz={-0.7} oy={-2} W={1.2} D={1.4} H={0.2} />

    {/* LEFT inlet — large flanged face */}
    <Box ox={-6.5} oz={-1.4} oy={-0.7} W={0.4} D={2.8} H={2.8} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Left inlet nozzle (bottom of flange) */}
    <Box ox={-7.2} oz={-0.6} oy={-0.4} W={0.7} D={1.2} H={0.6} tc="#C8921A" fc="#7A5412" sc="#3D2A08" />

    {/* Tube body section 1 */}
    <Box ox={-6.2} oz={-1.1} oy={0} W={3} D={2.2} H={2.2} />
    {/* Ring flange 1 */}
    <Box ox={-3.3} oz={-1.2} oy={-0.1} W={0.3} D={2.4} H={2.4} tc="#FFB830" fc="#C8921A" sc="#7A5412" />

    {/* Tube body section 2 */}
    <Box ox={-3}   oz={-1.1} oy={0} W={3} D={2.2} H={2.2} />
    {/* Ring flange 2 */}
    <Box ox={-0.1} oz={-1.2} oy={-0.1} W={0.3} D={2.4} H={2.4} tc="#FFB830" fc="#C8921A" sc="#7A5412" />

    {/* Tube body section 3 */}
    <Box ox={0.2}  oz={-1.1} oy={0} W={3} D={2.2} H={2.2} />
    {/* Ring flange 3 */}
    <Box ox={3.1}  oz={-1.2} oy={-0.1} W={0.3} D={2.4} H={2.4} tc="#FFB830" fc="#C8921A" sc="#7A5412" />

    {/* Top inlet nozzle (center) */}
    <Box ox={-1.8} oz={-0.5} oy={2.2} W={1.4} D={1} H={1} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Top nozzle flange */}
    <Box ox={-2}   oz={-0.7} oy={3.2} W={1.8} D={1.4} H={0.2} tc="#FFB830" fc="#C8921A" sc="#7A5412" />

    {/* Gearbox (right end) */}
    <Box ox={3.4}  oz={-0.9} oy={0} W={1.8} D={1.8} H={2.2} tc="#C8921A" fc="#5A3A0A" sc="#2A1A04" />
    {/* Motor body (right of gearbox) */}
    <Box ox={5}    oz={-0.7} oy={0.2} W={2} D={1.4} H={1.8} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
    {/* Motor fan end cap */}
    <Box ox={6.8}  oz={-0.5} oy={0.4} W={0.4} D={1} H={1.4} tc="#1A1004" fc="#0A0804" sc="#050402" />
  </g>
);

// ─── Shape registry — matches image filenames ─────────────────────
const SHAPES = [
  { id: "acm",   label: "ACM Mill",         tag: "Milling",       Component: AcmMill },
  { id: "pulv",  label: "Pulveriser Mill",   tag: "Milling",       Component: PulveriserMill },
  { id: "blend", label: "Blender",           tag: "Mixing",        Component: Blender },
  { id: "bag",   label: "Bag Filter",        tag: "Emission Ctrl", Component: BagFilter },
  { id: "fan",   label: "Centrifugal Fan",   tag: "Air Handling",  Component: CentrifugalFan },
  { id: "grade", label: "Grader",            tag: "Classifying",   Component: Grader },
  { id: "belt",  label: "Belt Conveyor",     tag: "Conveying",     Component: BeltConveyor },
  { id: "screw", label: "Screw Conveyor",    tag: "Conveying",     Component: ScrewConveyor },
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
                    return <circle key={`${r}-${c}`} cx={gx} cy={gy} r="1.2" fill={GLOW} opacity="0.18" />;
                  })
                )}
                {/* Ground shadow ellipse */}
                <ellipse cx="150" cy="222" rx="82" ry="20" fill="hsl(42,100%,55%)" opacity="0.07" />
                {/* Machine shape */}
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
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home-bg.jpeg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060d14]/95 via-[#060d14]/80 to-[#060d14]/50" />
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
