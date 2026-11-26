import { useState } from 'react';
import {
  NIELSEN_HEURISTICS_MATRIX,
  type HeuristicCategory,
} from '../data/versions';

const FILTER_TABS: { id: HeuristicCategory; label: string }[] = [
  { id: 'all', label: 'All 10 Heuristics' },
  { id: 'feedback', label: 'Feedback & Clarity' },
  { id: 'control', label: 'Control & Prevention' },
  { id: 'clarity', label: 'Efficiency & Aesthetics' },
];

export function HeuristicsMatrix() {
  const [activeCategory, setActiveCategory] = useState<HeuristicCategory>('all');
  const [selectedHeuristic, setSelectedHeuristic] = useState<string | null>(null);

  const filteredRows =
    activeCategory === 'all'
      ? NIELSEN_HEURISTICS_MATRIX
      : NIELSEN_HEURISTICS_MATRIX.filter((row) => row.category === activeCategory);

  return (
    <section id="heuristics" className="py-16 border-t border-zinc-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-zinc-500 mb-2">
              Usability Audit · Jakob Nielsen&apos;s 10 Heuristics
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 tracking-tight text-balance">
              Heuristic progression across all three builds
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter heuristics by focus group"
            className="inline-flex items-center gap-1 p-1 bg-zinc-100 rounded-lg self-start md:self-auto overflow-x-auto max-w-full"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600 ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[820px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 text-xs font-medium text-zinc-500">
                  <th scope="col" className="py-3.5 px-4 w-56">
                    Heuristic
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    01 · Original Replica
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    02 · Version 1 (Intuitive Accounts)
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    03 · Version 2 (Nielsen&apos;s 10 Heuristics)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-sm">
                {filteredRows.map((row) => {
                  const isHighlighted = selectedHeuristic === row.number;
                  return (
                    <tr
                      key={row.number}
                      onClick={() =>
                        setSelectedHeuristic((prev) =>
                          prev === row.number ? null : row.number
                        )
                      }
                      className={`transition-colors cursor-pointer ${
                        isHighlighted ? 'bg-blue-50/50' : 'hover:bg-zinc-50/80'
                      }`}
                    >
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-baseline gap-2.5">
                          <span className="font-mono text-xs font-medium text-zinc-500 tabular-nums shrink-0">
                            {row.number}
                          </span>
                          <div>
                            <div className="font-medium text-zinc-900 leading-snug">
                              {row.name}
                            </div>
                            <div className="text-xs text-zinc-500 mt-0.5">
                              {row.categoryLabel}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top text-zinc-600 leading-relaxed">
                        {row.original}
                      </td>
                      <td className="py-4 px-4 align-top text-zinc-700 leading-relaxed">
                        {row.v1}
                      </td>
                      <td className="py-4 px-4 align-top text-zinc-900 font-medium leading-relaxed">
                        {row.v2}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
