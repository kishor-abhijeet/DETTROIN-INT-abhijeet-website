import {
  Bot,
  FileText,
  GraduationCap,
  ListChecks,
  Sparkles,
} from "lucide-react";
const prompts = [
  ["Am I eligible for admission?", GraduationCap],
  ["What documents are required for admission?", FileText],
  ["Explain the admission process", ListChecks],
  ["Which class should I apply for?", Sparkles],
];
export default function AIAdmissionAssistant() {
  return (
    <section className="rounded-2xl border border-gold/25 bg-[#fffaf1] p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy text-gold">
          <Bot size={22} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-gold">
            AI admission assistant
          </p>
          <h2 className="mt-1 font-display text-2xl text-navy">
            Need help choosing the next step?
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            Ask a school-specific question and receive guidance based on our
            admissions information.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {prompts.map(([q, Icon]) => (
          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("ask-school-ai", { detail: q }),
              )
            }
            key={q}
            className="flex items-center gap-3 rounded-xl border border-navy/10 bg-white p-4 text-left text-sm font-semibold text-navy transition hover:border-gold hover:shadow-sm"
          >
            <Icon size={18} className="text-gold" />
            {q}
          </button>
        ))}
      </div>
    </section>
  );
}
