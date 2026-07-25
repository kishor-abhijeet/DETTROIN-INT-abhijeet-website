import { useState } from "react";
import { motion } from "framer-motion";
import * as ReactCountUp from "react-countup";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  ChevronDown,
  CirclePlay,
  Compass,
  Heart,
  Library,
  MapPin,
  Medal,
  Microscope,
  Send,
  Sparkles,
  Trophy,
  UsersRound,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

const CountUp = ReactCountUp.default?.default ?? ReactCountUp.default;

const fade = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};
const Reveal = ({ children, className = "" }) => (
  <motion.div
    className={className}
    variants={fade}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
  >
    {children}
  </motion.div>
);
const image = (id, w = 1200, h = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;
const stats = [
  ["5000", "Students", UsersRound],
  ["100", "Faculty experts", BookOpen],
  ["25", "National awards", Trophy],
  ["98", "Academic excellence", Medal],
];
const features = [
  [
    "World-class learning",
    "Small-class mentoring and enquiry-led teaching that puts every learner in the driver’s seat.",
    Sparkles,
  ],
  [
    "STEM & robotics",
    "Hands-on labs turn bold questions into real-world ideas and solutions.",
    BrainCircuit,
  ],
  [
    "Sporting spirit",
    "Coaching, character and competition across exceptional facilities.",
    Medal,
  ],
  [
    "Whole-child care",
    "A culture of belonging, wellbeing and leadership in every classroom.",
    Heart,
  ],
  [
    "Global outlook",
    "Meaningful exchange, service and collaboration beyond the classroom.",
    Compass,
  ],
  [
    "Future pathways",
    "Purposeful guidance for university choices and life beyond school.",
    ArrowUpRight,
  ],
];
const gallery = [
  image("photo-1509062522246-3755977927d7", 900, 1000),
  image("photo-1529390079861-591de354faf5", 900, 700),
  image("photo-1544717305-2782549b5136", 900, 1000),
  image("photo-1560785496-3c9d27877182", 900, 650),
  image("photo-1524178232363-1fb2b075b655", 900, 760),
  image("photo-1503676260728-1c00da094a0b", 900, 650),
];
const faqs = [
  [
    "How do I start an application?",
    "Complete our short online enquiry form and our admissions team will guide you through the next steps, including a campus visit and age-appropriate interaction.",
  ],
  [
    "What curriculum does the school offer?",
    "Our programme combines a strong academic foundation with project-based, experiential learning that prepares students for a changing world.",
  ],
  [
    "Is transport available?",
    "Yes. We operate GPS-enabled transport routes across Pune, with trained staff and clear communication for every family.",
  ],
  [
    "How can I arrange a campus visit?",
    "Choose “Visit campus” from our admissions page and select a time. We would love to welcome your family.",
  ],
];

export default function Home() {
  const [active, setActive] = useState(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <main>
      <section className="relative min-h-[760px] overflow-hidden bg-navy">
        <img
          src={image("photo-1606761568499-6d2451b23c66", 1800, 1100)}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          alt="Students walking through a bright school campus"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/65 to-navy/15" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-5 pt-20 sm:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="max-w-3xl text-white"
          >
            <motion.p
              variants={fade}
              className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.25em] text-gold"
            >
              <span className="h-px w-8 bg-gold" /> Pune · India
            </motion.p>
            <motion.h1
              variants={fade}
              className="font-display text-5xl leading-[.98] sm:text-7xl lg:text-8xl"
            >
              Future-ready
              <br />
              <em className="font-normal text-gold">education.</em>
            </motion.h1>
            <motion.p
              variants={fade}
              className="mt-7 max-w-xl text-lg leading-8 text-white/80"
            >
              Nurturing excellence and building tomorrow’s thoughtful, confident
              leaders.
            </motion.p>
            <motion.div variants={fade} className="mt-10 flex flex-wrap gap-4">
              <a href="#admissions" className="btn-primary">
                Begin your journey <ArrowRight size={17} />
              </a>
              <a
                href="#campus"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white transition hover:text-gold"
              >
                <CirclePlay size={21} /> Explore our campus
              </a>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 right-8 hidden items-center gap-4 text-xs font-semibold uppercase tracking-[.18em] text-white/70 md:flex">
          <span className="h-px w-16 bg-white/40" /> Scroll to discover
        </div>
      </section>
      <section className="relative -mt-10 z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <div className="glass grid rounded-2xl shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([number, label, Icon]) => (
            <div
              key={label}
              className="flex items-center gap-4 border-b border-navy/5 p-6 last:border-0 sm:even:border-l sm:even:border-navy/5 lg:border-b-0 lg:border-l lg:first:border-l-0"
            >
              <Icon className="text-gold" />
              <div>
                <strong className="block font-display text-3xl text-navy">
                  <CountUp end={+number} enableScrollSpy scrollSpyOnce />+
                </strong>
                <span className="text-xs font-medium text-navy/60">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">The Kalyani difference</p>
          <h2 className="section-title max-w-xl">
            A school that sees the possibility in every child.
          </h2>
          <p className="mt-6 max-w-xl leading-8 text-ink/65">
            We pair rigorous learning with a deeply human approach. Here,
            students are known, challenged and supported to follow their
            curiosity with courage.
          </p>
          <a
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold"
          >
            Our story <ArrowRight size={17} />
          </a>
        </Reveal>
        <Reveal className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-mist p-7">
            <Heart className="text-gold" />
            <h3 className="mt-10 font-display text-2xl text-navy">
              Our vision
            </h3>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              To inspire every child to learn, lead and make a positive
              difference.
            </p>
          </div>
          <div className="rounded-2xl bg-sky p-7 sm:mt-10">
            <Compass className="text-gold" />
            <h3 className="mt-10 font-display text-2xl text-navy">
              Our mission
            </h3>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              A joyful, ambitious environment where knowledge meets character.
            </p>
          </div>
        </Reveal>
      </section>
      <section className="bg-mist">
        <div className="section">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Why Kalyani</p>
              <h2 className="section-title">Designed for the world ahead.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-ink/60">
              A rich blend of academic depth, creativity and care makes every
              day here matter.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map(([title, text, Icon], i) => (
              <Reveal key={title}>
                <motion.article
                  whileHover={{ y: -7 }}
                  className="h-full rounded-2xl border border-navy/5 bg-white p-7 transition-shadow hover:shadow-soft"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky text-navy">
                    <Icon size={21} />
                  </span>
                  <h3 className="mt-8 font-display text-2xl text-navy">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink/60">{text}</p>
                  <ArrowRight className="mt-6 text-gold" size={18} />
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <Reveal>
          <p className="eyebrow">Learning journey</p>
          <h2 className="section-title">Every stage, full of possibility.</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "01",
              "Primary School",
              "A wondrous beginning that builds strong foundations.",
            ],
            [
              "02",
              "Middle School",
              "Interests deepen through discovery and dialogue.",
            ],
            [
              "03",
              "Secondary School",
              "Ambitious thinkers make meaningful connections.",
            ],
            [
              "04",
              "Senior Secondary",
              "Focused preparation for exceptional futures.",
            ],
          ].map(([n, t, d]) => (
            <Reveal key={n}>
              <article className="group min-h-72 rounded-2xl bg-navy p-7 text-white transition hover:bg-[#0e315f]">
                <span className="font-display text-5xl text-gold/80">{n}</span>
                <h3 className="mt-14 font-display text-2xl">{t}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{d}</p>
                <a
                  href="/admissions"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold"
                >
                  Explore <ArrowRight size={16} />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section id="campus" className="bg-navy">
        <div className="section grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              loading="lazy"
              src={image("photo-1519452575417-564c1401ecc0", 1100, 850)}
              alt="Students collaborating in a modern classroom"
              className="h-[440px] w-full rounded-2xl object-cover"
            />
          </Reveal>
          <Reveal>
            <p className="eyebrow">Life beyond lessons</p>
            <h2 className="section-title text-white">
              A campus alive with energy.
            </h2>
            <p className="mt-6 leading-8 text-white/65">
              From the first bell to the final curtain call, our campus invites
              students to move, make, perform and belong.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 text-sm font-semibold text-white/90">
              {[
                [Library, "Library & research"],
                [Microscope, "Innovation labs"],
                [Medal, "Sports & wellbeing"],
                [UsersRound, "Clubs & leadership"],
              ].map(([Icon, text]) => (
                <div
                  key={text}
                  className="flex items-center gap-3 rounded-xl border border-white/10 p-4"
                >
                  <Icon size={18} className="text-gold" />
                  {text}
                </div>
              ))}
            </div>
            <a href="/campus" className="btn-primary mt-8">
              Discover campus <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <Reveal className="text-center">
          <p className="eyebrow">Through their eyes</p>
          <h2 className="section-title">Our moments, in focus.</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((src, i) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              key={src}
              className={`${i === 0 || i === 3 ? "row-span-2" : ""} overflow-hidden rounded-2xl`}
            >
              <img
                loading="lazy"
                src={src}
                alt={`School life moment ${i + 1}`}
                className="h-full min-h-40 w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
        <a href="/gallery" className="btn-secondary mx-auto mt-8 flex w-fit">
          Explore the gallery <ArrowRight size={16} />
        </a>
      </section>
      <section id="admissions" className="bg-[#F6F0E6]">
        <div className="section">
          <Reveal>
            <p className="eyebrow">Admissions 2026–27</p>
            <h2 className="section-title">
              Your child’s next chapter
              <br />
              starts here.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.35fr]">
            <Reveal>
              <p className="leading-8 text-ink/65">
                We make the admissions experience personal and reassuring.
                Follow the simple path below, then let our friendly team take
                care of the rest.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/admissions" className="btn-primary">
                  Apply now <ArrowRight size={16} />
                </a>
                <button className="btn-secondary">Download brochure</button>
              </div>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-5">
              {["Register", "Apply", "Assessment", "Meet us", "Welcome"].map(
                (step, i) => (
                  <Reveal key={step}>
                    <div className="relative h-full rounded-xl bg-white p-5">
                      <span className="font-display text-3xl text-gold">
                        0{i + 1}
                      </span>
                      <p className="mt-8 text-sm font-bold text-navy">{step}</p>
                    </div>
                  </Reveal>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <Reveal className="text-center">
          <p className="eyebrow">Community voices</p>
          <h2 className="section-title">The feeling of belonging.</h2>
        </Reveal>
        <div className="mt-10">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            spaceBetween={18}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {[
              [
                "Aarav, Class X",
                "“My teachers see what I’m curious about and help me turn it into something I can be proud of.”",
              ],
              [
                "Meera Shah, Parent",
                "“It is a rare school that matches ambition with this much warmth and individual attention.”",
              ],
              [
                "N. Iyer, Faculty",
                "“Here, learning is an active conversation. Students surprise us every day.”",
              ],
            ].map(([who, quote]) => (
              <SwiperSlide key={who} className="pb-12">
                <article className="h-full rounded-2xl bg-mist p-8">
                  <p className="font-display text-2xl leading-9 text-navy">
                    {quote}
                  </p>
                  <p className="mt-8 text-xs font-bold uppercase tracking-[.14em] text-gold">
                    {who}
                  </p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="bg-mist">
        <div className="section grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow">Questions, answered</p>
            <h2 className="section-title">Let’s make this easy.</h2>
            <p className="mt-5 max-w-sm leading-7 text-ink/60">
              If you cannot find what you need, our admissions team is only a
              call away.
            </p>
          </Reveal>
          <div>
            {faqs.map(([q, a], i) => (
              <div key={q} className="border-b border-navy/10">
                <button
                  onClick={() => setActive(active === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-navy"
                  aria-expanded={active === i}
                >
                  {q}
                  <ChevronDown
                    className={`shrink-0 transition ${active === i ? "rotate-180 text-gold" : ""}`}
                  />
                </button>
                {active === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pb-5 text-sm leading-7 text-ink/65"
                  >
                    {a}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <Reveal className="rounded-3xl bg-navy px-6 py-12 text-center sm:px-12 lg:py-16">
          <p className="eyebrow">Stay in the loop</p>
          <h2 className="font-display text-4xl text-white sm:text-5xl">
            A little inspiration,
            <br />
            delivered occasionally.
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="min-w-0 flex-1 rounded-full border-0 px-5 py-3.5 text-sm text-navy outline-none ring-gold focus:ring-4"
            />
            <button className="btn-primary" type="submit">
              <Send size={16} /> Subscribe
            </button>
          </form>
          {sent && (
            <p role="status" className="mt-3 text-sm text-gold">
              Thank you — you’re on the list.
            </p>
          )}
        </Reveal>
      </section>
    </main>
  );
}
