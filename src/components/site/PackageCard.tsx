import Link from "next/link";
import { Star, Car, Hotel, Compass, Ticket, ArrowRight } from "lucide-react";
import { packageImage, type Package } from "@/lib/packages";
import Image from "next/image";

export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="card-luxe overflow-hidden group block"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={packageImage(pkg.slug)}
          alt={pkg.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute top-4 left-4 bg-background/95 backdrop-blur px-3 py-1 rounded-full text-[11px] font-medium tracking-wide text-charcoal">
          {pkg.duration_days} Days
        </span>
        <span className="absolute top-4 right-4 bg-charcoal/70 backdrop-blur text-gold-light px-2.5 py-1 rounded-full text-[11px] flex items-center gap-0.5">
          {Array.from({ length: pkg.hotel_stars }).map((_, j) => (
            <Star key={j} size={10} fill="currentColor" strokeWidth={0} />
          ))}
        </span>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {pkg.destinations.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] tracking-wider uppercase font-medium text-forest bg-forest/8 px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>

        <h3 className="font-display text-2xl text-charcoal leading-tight">{pkg.title}</h3>
        {pkg.tagline && (
          <p className="text-sm text-grey-soft mt-2 line-clamp-2 italic font-display">{pkg.tagline}</p>
        )}

        <div className="mt-4 flex items-center gap-4 text-grey-soft text-[11px]">
          <span className="flex items-center gap-1.5"><Car size={13} /> Private</span>
          <span className="flex items-center gap-1.5"><Hotel size={13} /> Hotels</span>
          <span className="flex items-center gap-1.5"><Compass size={13} /> Guide</span>
          <span className="flex items-center gap-1.5"><Ticket size={13} /> Tickets</span>
        </div>

        <div className="mt-6 pt-5 border-t border-grey-line flex items-end justify-between">
          <div>
            <div className="text-[10px] eyebrow !text-grey-soft">From</div>
            <div className="font-display text-3xl text-gold-dark leading-none mt-1">
              ${Number(pkg.price_usd).toLocaleString()}
            </div>
            <div className="text-[11px] text-grey-soft mt-1">per person</div>
          </div>
          <span className="text-sm font-medium text-charcoal flex items-center gap-1 border-b border-gold pb-0.5 group-hover:gap-2 transition-all">
            View <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
