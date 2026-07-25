import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Admissions", "/admissions"],
  ["Campus Life", "/campus"],
  ["Gallery", "/gallery"],
  ["Events", "/events"],
  ["Contact", "/contact"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(scrollY > 12);
    update();
    addEventListener("scroll", update);
    return () => removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "border-b border-navy/10 bg-white/85 shadow-sm backdrop-blur-xl" : "bg-transparent"}`}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Primary navigation"
      >
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label="The Kalyani School home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-display text-xl font-bold text-gold transition group-hover:rotate-6">
            K
          </span>
          <span
            className={`font-display text-lg font-bold sm:text-xl ${scrolled ? "text-navy" : "text-white"}`}
          >
            Kalyani
            <span className="font-sans text-[10px] font-bold uppercase tracking-[.25em] text-gold">
              {" "}
              School
            </span>
          </span>
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-semibold transition hover:text-gold ${scrolled ? "text-navy" : "text-white"} ${isActive ? "text-gold" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/admissions" className="btn-primary px-5 py-2.5">
            Apply Now <ArrowUpRight size={15} />
          </Link>
        </div>
        <button
          onClick={() => setOpen(true)}
          className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${scrolled ? "text-navy" : "text-white"}`}
          aria-label="Open menu"
        >
          <Menu />
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/45 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26 }}
              className="ml-auto flex h-full w-[86%] max-w-sm flex-col bg-white p-7"
            >
              <button
                onClick={() => setOpen(false)}
                className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-mist text-navy"
                aria-label="Close menu"
              >
                <X />
              </button>
              <div className="mt-12 flex flex-col gap-1">
                {links.map(([label, to], i) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    key={to}
                  >
                    <NavLink
                      onClick={() => setOpen(false)}
                      to={to}
                      className="block rounded-xl px-4 py-3 text-lg font-semibold text-navy hover:bg-mist"
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              <Link
                onClick={() => setOpen(false)}
                to="/admissions"
                className="btn-primary mt-auto"
              >
                Begin your journey <ArrowUpRight size={17} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
