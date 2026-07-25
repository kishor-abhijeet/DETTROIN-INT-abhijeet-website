import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  ChevronDown,
  Eraser,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { askSchoolAssistant } from "../services/ragService";

const actions = [
  "Admission Process",
  "Apply Now",
  "Academic Programmes",
  "Campus Facilities",
  "Events",
  "Transportation",
  "Contact Us",
  "Career Guidance",
];
const welcome = {
  role: "assistant",
  text: "Hello! I am Kalyani’s school assistant. I can help with admissions, programmes, campus life and more.",
};
const Text = ({ children }) => (
  <>
    {String(children)
      .split("\n")
      .map((line, i) => (
        <p key={i} className={i ? "mt-2" : ""}>
          {line.replaceAll("**", "")}
        </p>
      ))}
  </>
);
export default function AIAssistant() {
  const [open, setOpen] = useState(false),
    [query, setQuery] = useState(""),
    [messages, setMessages] = useState([welcome]),
    [loading, setLoading] = useState(false),
    ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, open]);
  async function send(value) {
    const question = (value ?? query).trim();
    if (!question || loading) return;
    setQuery("");
    setMessages((items) => [...items, { role: "user", text: question }]);
    setLoading(true);
    try {
      const data = await askSchoolAssistant(question);
      setMessages((items) => [
        ...items,
        { role: "assistant", text: data.answer, sources: data.sources },
      ]);
    } catch (error) {
      setMessages((items) => [
        ...items,
        { role: "assistant", text: error.message },
      ]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const handler = (e) => {
      setOpen(true);
      send(e.detail);
    };
    window.addEventListener("ask-school-ai", handler);
    return () => window.removeEventListener("ask-school-ai", handler);
  });
  return (
    <div className="fixed bottom-5 right-5 z-[60] sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ type: "spring", damping: 25 }}
            className="mb-4 flex h-[min(650px,calc(100vh-8.5rem))] w-[calc(100vw-2.5rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-white/50 bg-white shadow-2xl"
          >
            <header className="flex items-center gap-3 bg-navy px-5 py-4 text-white">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-navy">
                <Bot size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold">Kalyani AI Assistant</h2>
                <p className="text-xs text-white/60">
                  Admissions & school information
                </p>
              </div>
              <button
                onClick={() => setMessages([welcome])}
                aria-label="Clear chat"
                className="rounded-lg p-2 text-white/65 hover:bg-white/10"
              >
                <Eraser size={17} />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="rounded-lg p-2 text-white/65 hover:bg-white/10"
              >
                <X size={19} />
              </button>
            </header>
            <div ref={ref} className="flex-1 overflow-y-auto bg-mist px-4 py-5">
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}
                  >
                    {m.role === "assistant" && (
                      <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-navy text-gold">
                        <Sparkles size={14} />
                      </span>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${m.role === "user" ? "rounded-br-md bg-navy text-white" : "rounded-tl-md bg-white text-ink shadow-sm"}`}
                    >
                      <Text>{m.text}</Text>
                      {m.sources?.length > 0 && (
                        <p className="mt-3 border-t border-navy/10 pt-2 text-[10px] font-bold uppercase tracking-wider text-gold">
                          Sources: {m.sources.join(" · ")}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-2 text-sm text-ink/55">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-navy text-gold">
                      <Sparkles size={13} />
                    </span>
                    <span className="flex gap-1">
                      <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold" />
                      <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:120ms]" />
                      <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:240ms]" />
                    </span>
                  </div>
                )}
              </div>
              {messages.length === 1 && !loading && (
                <div className="mt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink/40">
                    Quick actions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {actions.map((action) => (
                      <button
                        key={action}
                        onClick={() => send(action)}
                        className="rounded-full border border-navy/10 bg-white px-3 py-2 text-left text-xs font-medium text-navy transition hover:border-gold hover:text-gold"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex gap-2 border-t border-navy/10 bg-white p-3"
            >
              <label htmlFor="assistant-question" className="sr-only">
                Ask the school assistant
              </label>
              <input
                id="assistant-question"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                maxLength="500"
                placeholder="Ask anything about our school…"
                className="min-w-0 flex-1 rounded-xl bg-mist px-4 py-3 text-sm outline-none ring-gold focus:ring-2"
              />
              <button
                disabled={loading || !query.trim()}
                className="grid h-11 w-11 place-items-center rounded-xl bg-gold text-white transition hover:bg-[#b78631] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send question"
              >
                <Send size={17} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close AI assistant" : "Ask AI"}
        className="group flex items-center gap-2 rounded-full bg-navy px-5 py-4 text-sm font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#0e315f] focus:outline-none focus:ring-4 focus:ring-gold/35"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-navy">
          <MessageCircle size={14} />
        </span>
        {open ? "Close" : "Ask AI"}
        <ChevronDown
          className={`transition ${open ? "rotate-180" : ""}`}
          size={16}
        />
      </button>
    </div>
  );
}
