type Props = {
  insight: string;
  loading: boolean;
};

export const InsightPanel: React.FC<Props> = ({ insight, loading }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">AI Insight Engine</h2>
          <p className="text-[11px] text-slate-400">
            Narrative summary generated from live account &amp; transaction data.
          </p>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-300">
          Read-only analytics
        </span>
      </div>
      <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-3 overflow-auto">
        {loading ? (
          <div className="text-xs text-slate-400">Generating insight…</div>
        ) : insight ? (
          <pre className="whitespace-pre-wrap text-[11px] leading-relaxed text-slate-200 font-sans">
            {insight}
          </pre>
        ) : (
          <div className="text-xs text-slate-500">No insight available yet.</div>
        )}
      </div>
    </div>
  );
};
