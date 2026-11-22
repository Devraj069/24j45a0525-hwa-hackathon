import Image from "next/image";
import { cn } from "@/lib/utils";

type ProductVisualProps = {
  emoji: string;
  accent: string;
  name: string;
  className?: string;
  emojiClassName?: string;
  imageSrc?: string;
};

export function ProductVisual({
  emoji,
  accent,
  name,
  className,
  emojiClassName,
  imageSrc,
}: ProductVisualProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl",
        className
      )}
      style={{
        background: `linear-gradient(145deg, ${accent}22 0%, #ffffff 55%, ${accent}14 100%)`,
      }}
      role="img"
      aria-label={name}
    >
      <div
        className="absolute -left-8 -top-10 h-32 w-32 rounded-full opacity-40 blur-2xl"
        style={{ backgroundColor: `${accent}55` }}
      />
      <div
        className="absolute -bottom-12 -right-6 h-36 w-36 rounded-full opacity-30 blur-2xl"
        style={{ backgroundColor: `${accent}40` }}
      />
      <div
        className="absolute inset-3 rounded-full border border-white/70"
        aria-hidden="true"
      />
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={name}
          width={389}
          height={384}
          className="relative h-auto w-[76%] select-none drop-shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
        />
      ) : (
        <span
          className={cn(
            "relative select-none drop-shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3",
            emojiClassName ?? "text-6xl"
          )}
        >
          {emoji}
        </span>
      )}
    </div>
  );
}
