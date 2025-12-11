import { RotateCcw } from "lucide-react";

export default function LandscapeWarning() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-8 landscape:flex portrait:hidden md:hidden">
      <div className="glass rounded-lg p-8 border border-neon-blue/30 text-center max-w-md">
        <div className="flex justify-center mb-6">
          <RotateCcw className="text-neon-blue animate-pulse" size={64} />
        </div>
        <h2 className="text-2xl font-bold neon-text mb-4">
          Ruota il dispositivo
        </h2>
        <p className="text-white/80 text-lg">
          Per una migliore esperienza, utilizza il dispositivo in modalità
          verticale (portrait).
        </p>
      </div>
    </div>
  );
}
