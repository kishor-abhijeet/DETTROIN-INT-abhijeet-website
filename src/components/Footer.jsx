import { Link } from "react-router-dom";
import { Globe2, MessageCircle, Play, ThumbsUp } from "lucide-react";

const nav = [
  ["About us", "/about"],
  ["Admissions", "/admissions"],
  ["Campus life", "/campus"],
  ["Events", "/events"],
];
export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="section grid gap-12 py-16 md:grid-cols-[1.2fr_.8fr_.9fr]">
        <div>
          <div className="font-display text-3xl font-bold">
            Kalyani<span className="text-gold">.</span>
          </div>
          <p className="mt-5 max-w-sm leading-7 text-white/65">
            A compassionate learning community where young minds gain the
            confidence to shape a meaningful future.
          </p>
          <div className="mt-7 flex gap-3">
            {[Globe2, MessageCircle, Play, ThumbsUp].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-gold hover:text-gold"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-gold">Explore</h2>
          <ul className="mt-5 space-y-3">
            {nav.map(([name, to]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-white/70 hover:text-white"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-gold">Visit us</h2>
          <address className="mt-5 not-italic text-sm leading-7 text-white/70">
            Manjari Budruk, Near Hadapsar
            <br />
            Pune, Maharashtra 412307
            <br />
            <a href="tel:+912067977777" className="text-white hover:text-gold">
              +91 20 6797 7777
            </a>
            <br />
            <a
              href="mailto:hello@kalyanischool.edu.in"
              className="text-white hover:text-gold"
            >
              hello@kalyanischool.edu.in
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 text-center text-xs text-white/45 sm:px-8">
        © {new Date().getFullYear()} The Kalyani School. Crafted for curious
        futures.
      </div>
    </footer>
  );
}
