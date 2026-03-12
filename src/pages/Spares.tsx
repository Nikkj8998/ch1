import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SparePart {
  name: string;
  detail: string;
  equipment: string;
  image: string;
}

const sparesData = [
  {
    equipment: "Air Classifying Mill (ACM)",
    image: "/images/spares/acm-classifier.png",
    parts: [
      { name: "Classifier Wheel", detail: "Straight & inclined blade configurations" },
      { name: "Liner", detail: "Multi-deflector and smooth types" },
      { name: "Rotor & Hammers", detail: "Bar, Pin, and J Hammer types" },
      { name: "Bearing Housing Assembly", detail: "Complete shaft support assembly" },
      { name: "Shroud Ring", detail: "Baffled and smooth liner variants" },
      { name: "Motors", detail: "Bonfiglioli, ABB, Crompton Greaves" },
      { name: "Anti Vibration Pads", detail: "AVMP for vibration dampening" },
      { name: "Timing Belts", detail: "Drive belts for mill operation" },
    ],
  },
  {
    equipment: "Belts & Pulleys",
    image: "/images/spares/acm-classifier.png",
    parts: [
      { name: "Timing Belts", detail: "Precision drive belts for mills" },
      { name: "V Belts", detail: "Industrial V-belt drives" },
      { name: "Pulleys", detail: "Drive and driven pulleys" },
    ],
  },
  {
    equipment: "Pulveriser Mill",
    image: "/images/spares/pulveriser-hammer.png",
    parts: [
      { name: "LFS Hammer", detail: "Fine grind, abrasion-resistant alloy tips" },
      { name: "Bar Type Hammer", detail: "Coarse grind, tungsten carbide tips" },
      { name: "Multi Deflector Liner", detail: "Impact liner for fine particle breakdown" },
      { name: "Screens", detail: "Round, HB, and Jump Gap types" },
    ],
  },
  {
    equipment: "Universal Mill / Pin Mill",
    image: "/images/spares/universal-mill-rotor.png",
    parts: [
      { name: "Rotor – Bar Turbo", detail: "Standard bar turbo configuration" },
      { name: "Rotor – Inclined Bar Turbo", detail: "Inclined bar for finer output" },
      { name: "Rotor – Stud Bar Teeth", detail: "Stud bar teeth configuration" },
      { name: "Rotor – Pin Bar", detail: "Pin bar rotor type" },
      { name: "Stator – Full Screen", detail: "Higher capacity, stickier materials" },
      { name: "Stator – Half Screen", detail: "Finer grind classification" },
      { name: "Screens", detail: "Retaining screens for chamber" },
      { name: "Bearing Housing", detail: "Primary rotor mounting assembly" },
    ],
  },
  {
    equipment: "Hammer Mill",
    image: "/images/spares/hammer-mill.png",
    parts: [
      { name: "Hammers", detail: "Impact grinding elements" },
      { name: "MD Liners", detail: "Multi-deflector liners" },
      { name: "Screens", detail: "Particle size control screens" },
    ],
  },
  {
    equipment: "Crusher",
    image: "/images/spares/crusher-blades.png",
    parts: [
      { name: "Grinding Blades", detail: "S-type and Star-type blades" },
      { name: "Screens", detail: "Sizing screens for output control" },
    ],
  },
  {
    equipment: "Delumper",
    image: "/images/spares/delumper.png",
    parts: [
      { name: "Stationary Blades", detail: "Fixed cutting elements" },
      { name: "Hammers", detail: "Lump breaking impact elements" },
      { name: "Screen", detail: "Discharge screen" },
    ],
  },
  {
    equipment: "Air Swept Mill",
    image: "/images/spares/air-swept-mill.png",
    parts: [
      { name: "Hammers", detail: "Beater elements for size reduction" },
      { name: "MD Liner Top & Slide", detail: "Multi-deflector liners" },
      { name: "Wizard Blades", detail: "2, 3, and 4 blade configurations" },
    ],
  },
  {
    equipment: "Bag Filter",
    image: "/images/spares/bag-filter.png",
    parts: [
      { name: "Filter Bags", detail: "Cotton, PET, PP, PA, PTFE, Glass Fibre & more" },
      { name: "Filter Bag Cages", detail: "MS, SS, Galvanised with Venturi options" },
    ],
  },
  {
    equipment: "Vibro Sifter",
    image: "/images/spares/vibro-sifter.png",
    parts: [
      { name: "Screens", detail: "Various mesh sizes" },
      { name: "Motors", detail: "Drive motors" },
      { name: "Knocking Hammer & Vibrator", detail: "Anti-blinding components" },
      { name: "Valves & Hose Pipes", detail: "Solenoid, manual valves and hoses" },
    ],
  },
  {
    equipment: "Grader",
    image: "/images/spares/vibro-sifter.png",
    parts: [
      { name: "Screens", detail: "Multi-layer grading screens" },
      { name: "Unbalanced Motors", detail: "Vibration drive motors" },
      { name: "Springs & Mounts", detail: "Suspension components" },
    ],
  },
  {
    equipment: "Valves (RAL & KGV)",
    image: "/images/spares/ral-valve.png",
    parts: [
      { name: "Rotary Air Lock (RAL)", detail: "Discharge metering valve, CI/SS/Alloy" },
      { name: "Knife Gate Valve (KGV)", detail: "Manual and pneumatic, dry bulk materials" },
    ],
  },
  {
    equipment: "Fan & Ducting",
    image: "/images/spares/bag-filter.png",
    parts: [
      { name: "ID Fan / Blower", detail: "Induced draft fans for air systems" },
      { name: "Fan Impeller", detail: "Replacement impellers, balanced" },
      { name: "Ducting", detail: "MS & SS ducting, bends, transitions" },
      { name: "Dampers", detail: "Manual and motorised control dampers" },
    ],
  },
  {
    equipment: "Magnets",
    image: "/images/spares/magnets.png",
    parts: [
      { name: "Channel Magnets", detail: "Channel-type separators" },
      { name: "Hump Magnets", detail: "Hump-style separators" },
      { name: "Hopper Magnets", detail: "Hopper-mounted separators" },
      { name: "Magnetic Plates", detail: "Flat plate separators" },
      { name: "Magnetic Grills", detail: "Grill-type separators" },
      { name: "Drawer Magnets", detail: "Drawer-style separators" },
    ],
  },
];

const allParts: SparePart[] = sparesData.flatMap((cat) =>
  cat.parts.map((part) => ({
    ...part,
    equipment: cat.equipment,
    image: cat.image,
  }))
);

const equipmentNames = sparesData.map((cat) => cat.equipment);

const Spares = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const toggleEquipment = (name: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(name) ? prev.filter((e) => e !== name) : [...prev, name]
    );
  };

  const filteredParts = useMemo(() => {
    return allParts.filter((part) => {
      const matchesSearch =
        !searchQuery ||
        part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.equipment.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesEquipment =
        selectedEquipment.length === 0 || selectedEquipment.includes(part.equipment);
      return matchesSearch && matchesEquipment;
    });
  }, [searchQuery, selectedEquipment]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedEquipment([]);
  };

  const hasActiveFilters = searchQuery || selectedEquipment.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-28 pb-12 px-6 bg-gradient-hero relative">
          <div className="max-w-7xl mx-auto text-center">
            <motion.span className="text-primary text-sm font-semibold uppercase tracking-widest"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              Spare Parts
            </motion.span>
            <motion.h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-3 text-foreground"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              OEM-Grade <span className="text-primary text-glow-amber">Spares</span>
            </motion.h1>
            <motion.p className="text-muted-foreground mt-4 max-w-2xl mx-auto"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              Critical wear parts and precision components engineered for extended service life.
            </motion.p>
          </div>
        </section>

        <section className="py-5 px-6 bg-background border-b border-border sticky top-16 z-30">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search spare parts..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-11 bg-card border-border text-foreground placeholder:text-muted-foreground" />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(142_70%_35%)] hover:bg-[hsl(142_70%_40%)] text-foreground font-semibold text-sm transition-colors shrink-0">
              <SiWhatsapp className="w-4 h-4" />
              WhatsApp for Spares
            </a>
          </div>
        </section>

        <section className="py-8 px-6 bg-gradient-dark min-h-[60vh]">
          <div className="max-w-7xl mx-auto flex gap-8">
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-36 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">Equipment Type</h3>
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="text-xs text-primary hover:underline">Clear all</button>
                  )}
                </div>
                <div className="space-y-2">
                  {equipmentNames.map((name) => (
                    <label key={name} className="flex items-start gap-3 cursor-pointer group py-1">
                      <Checkbox checked={selectedEquipment.includes(name)}
                        onCheckedChange={() => toggleEquipment(name)}
                        className="mt-0.5 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-tight">{name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Mobile */}
            <div className="lg:hidden w-full">
              <div className="flex flex-wrap gap-2 mb-6">
                {equipmentNames.map((name) => (
                  <button key={name} onClick={() => toggleEquipment(name)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${selectedEquipment.includes(name)
                      ? "bg-primary/20 border-primary text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                      }`}>
                    {name.replace(/ \(.*\)/, "")}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredParts.map((part, i) => (
                  <SpareCard key={`${part.equipment}-${part.name}`} part={part} index={i} />
                ))}
              </div>
              {filteredParts.length === 0 && <EmptyState onClear={clearFilters} />}
            </div>

            {/* Desktop */}
            <div className="hidden lg:block flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="text-foreground font-semibold">{filteredParts.length}</span> results
                </p>
              </div>
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredParts.map((part, i) => (
                  <SpareCard key={`${part.equipment}-${part.name}`} part={part} index={i} />
                ))}
              </div>
              {filteredParts.length === 0 && <EmptyState onClear={clearFilters} />}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const SpareCard = ({ part, index }: { part: SparePart; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: Math.min(index * 0.03, 0.3) }}
    className="group rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col"
  >
    <div className="w-full h-44 overflow-hidden bg-muted/10 border-b border-border">
      <img src={part.image} alt={part.name}
        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        loading="lazy" />
    </div>
    <div className="p-4 flex flex-col flex-1">
      <span className="text-[11px] text-primary font-semibold uppercase tracking-wider mb-1">{part.equipment}</span>
      <h3 className="font-display text-base font-bold text-foreground mb-1">{part.name}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1">{part.detail}</p>
      <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline self-start">
        <SiWhatsapp className="w-3.5 h-3.5" />
        Enquire Now
      </a>
    </div>
  </motion.div>
);

const EmptyState = ({ onClear }: { onClear: () => void }) => (
  <div className="text-center py-20">
    <p className="text-muted-foreground text-lg">No spare parts match your search.</p>
    <button onClick={onClear} className="mt-3 text-primary font-semibold hover:underline text-sm">Clear filters</button>
  </div>
);

export default Spares;
