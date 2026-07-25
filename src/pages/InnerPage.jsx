import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import AIAdmissionAssistant from "../components/AIAdmissionAssistant";

const details = {
  about: [
    "About Kalyani",
    "A community shaped by curiosity, courage and care.",
    "At Kalyani, education is more than a destination. It is a daily practice of asking thoughtful questions, trying bravely and showing up for one another.",
  ],
  admissions: [
    "Admissions",
    "A personal welcome for every family.",
    "Learn about our application journey, schedule a visit and discover how your child can flourish at Kalyani.",
  ],
  campus: [
    "Campus life",
    "A place to learn, play and belong.",
    "Our lively campus brings together exceptional spaces, inspiring people and an enormous sense of possibility.",
  ],
  gallery: [
    "Gallery",
    "Stories from around campus.",
    "Discover the colour, concentration and quiet joy that make up a Kalyani day.",
  ],
  events: [
    "Events",
    "There is always something to celebrate.",
    "From sporting milestones to creative showcases, our calendar gives every student a moment to shine.",
  ],
  contact: [
    "Contact us",
    "Let’s start a conversation.",
    "Our friendly team is ready to answer questions and welcome you to campus.",
  ],
};
export default function InnerPage() {
  const { page } = useParams();
  const [title, lead, body] = details[page] || details.about;
  return (
    <main className="pt-20">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-navy"
      >
        <div className="section py-24 text-center">
          <p className="eyebrow">The Kalyani School</p>
          <h1 className="font-display text-5xl text-white sm:text-7xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/70">
            {lead}
          </p>
        </div>
      </motion.section>
      <section className="section grid gap-12 md:grid-cols-[1.1fr_.9fr]">
        <div>
          <h2 className="section-title">A future with purpose.</h2>
          <p className="mt-6 max-w-xl leading-8 text-ink/65">{body}</p>
          <Link to="/admissions" className="btn-primary mt-8">
            Make an enquiry <ArrowRight size={17} />
          </Link>
          {page === "admissions" && (
            <div className="mt-10">
              <AIAdmissionAssistant />
            </div>
          )}
        </div>
        <div className="rounded-2xl bg-mist p-8">
          <h3 className="font-display text-2xl text-navy">Visit Kalyani</h3>
          <div className="mt-6 space-y-4 text-sm leading-6 text-ink/65">
            <p className="flex gap-3">
              <MapPin className="shrink-0 text-gold" />
              Manjari Budruk, Near Hadapsar, Pune
            </p>
            <p className="flex gap-3">
              <Phone className="shrink-0 text-gold" />
              +91 20 6797 7777
            </p>
            <p className="flex gap-3">
              <Mail className="shrink-0 text-gold" />
              hello@kalyanischool.edu.in
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
