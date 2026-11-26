import { useState } from 'react';
import { Columns2, Columns3, Monitor, RotateCw, Smartphone, Square } from 'lucide-react';
import {
  STOREFRONT_VERSIONS,
  type VersionId,
} from './data/versions';
import { ViewportFrame, type ViewportMode } from './components/ViewportFrame';
import { HeuristicsMatrix } from './components/HeuristicsMatrix';

type LayoutMode = 'three-up' | 'two-up' | 'single';

export default function App() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('three-up');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop-scaled');
  const [frameHeight, setFrameHeight] = useState<number>(640);
  const [twoUpPair, setTwoUpPair] = useState<[VersionId, VersionId]>(['original', 'v2']);
  const [focusedId, setFocusedId] = useState<VersionId>('v2');
  const [globalReloadSeed, setGlobalReloadSeed] = useState(0);

  const visibleVersions =
    layoutMode === 'three-up'
      ? STOREFRONT_VERSIONS
      : layoutMode === 'two-up'
        ? twoUpPair
            .map((id) => STOREFRONT_VERSIONS.find((v) => v.id === id)!)
            .filter(Boolean)
        : STOREFRONT_VERSIONS.filter((v) => v.id === focusedId);

  const handleToggleFocus = (id: VersionId) => {
    if (layoutMode === 'single' && focusedId === id) {
      setLayoutMode('three-up');
    } else {
      setFocusedId(id);
      setLayoutMode('single');
    }
  };

  const handleResetAll = () => {
    setLayoutMode('three-up');
    setViewportMode('desktop-scaled');
    setFrameHeight(640);
    setGlobalReloadSeed((s) => s + 1);
  };

  const gridColsClass =
    layoutMode === 'three-up'
      ? 'grid-cols-1 lg:grid-cols-3'
      : layoutMode === 'two-up'
        ? 'grid-cols-1 lg:grid-cols-2'
        : 'grid-cols-1';

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-zinc-200">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="font-display text-base font-bold tracking-tight text-zinc-900 whitespace-nowrap shrink-0"
          >
            Storefront UX
          </a>

          <nav
            aria-label="Primary sections"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600"
          >
            <a
              href="#comparison"
              className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
            >
              Side-by-Side
            </a>
            <a
              href="#methodology"
              className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
            >
              Methodology
            </a>
            <a
              href="#heuristics"
              className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
            >
              10 Heuristics
            </a>
            <a
              href="#deployments"
              className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
            >
              Live Links
            </a>
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleResetAll}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Reset Views
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Editorial Intro */}
        <section className="pt-10 pb-6">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <p className="text-xs font-medium text-zinc-500 mb-2">
                  UI/UX Improvement Showcase · 3 Live Interactive Builds
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight text-balance">
                  Side-by-side storefront comparison
                </h1>
                <p className="mt-3 text-base text-zinc-600 leading-relaxed max-w-2xl">
                  Inspect the baseline replica alongside Version 1 (built using intuitive
                  accounts) and Version 2 (built using Nielsen&apos;s 10 heuristics) in live,
                  synchronized viewports.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500">
                <span>01 · Original Replica</span>
                <span aria-hidden="true">/</span>
                <span>02 · Version 1 (Intuitive Accounts)</span>
                <span aria-hidden="true">/</span>
                <span>03 · Version 2 (Nielsen&apos;s 10 Heuristics)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Workbench Toolbar + Live Side-by-Side Stage */}
        <section id="comparison" className="pb-16">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
            {/* Streamlined Workspace Control Bar */}
            <div className="mb-5 p-3 bg-white border border-zinc-200 rounded-xl flex flex-wrap items-center justify-between gap-4">
              {/* Layout Mode */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-medium text-zinc-500">Layout</span>
                <div className="inline-flex items-center gap-1 p-1 bg-zinc-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setLayoutMode('three-up')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      layoutMode === 'three-up'
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    <Columns3 className="w-3.5 h-3.5" />
                    3-Up All
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayoutMode('two-up')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      layoutMode === 'two-up'
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    <Columns2 className="w-3.5 h-3.5" />
                    2-Up Diff
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayoutMode('single')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      layoutMode === 'single'
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    <Square className="w-3.5 h-3.5" />
                    Single Focus
                  </button>
                </div>

                {/* Contextual Pair / Focus Selectors */}
                {layoutMode === 'two-up' && (
                  <div className="flex items-center gap-2 text-xs">
                    <label className="sr-only" htmlFor="left-version">
                      Left version
                    </label>
                    <select
                      id="left-version"
                      value={twoUpPair[0]}
                      onChange={(e) =>
                        setTwoUpPair([e.target.value as VersionId, twoUpPair[1]])
                      }
                      className="px-2.5 py-1.5 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-800 font-medium cursor-pointer"
                    >
                      {STOREFRONT_VERSIONS.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.shortLabel}
                        </option>
                      ))}
                    </select>
                    <span className="text-zinc-400">vs</span>
                    <label className="sr-only" htmlFor="right-version">
                      Right version
                    </label>
                    <select
                      id="right-version"
                      value={twoUpPair[1]}
                      onChange={(e) =>
                        setTwoUpPair([twoUpPair[0], e.target.value as VersionId])
                      }
                      className="px-2.5 py-1.5 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-800 font-medium cursor-pointer"
                    >
                      {STOREFRONT_VERSIONS.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.shortLabel}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {layoutMode === 'single' && (
                  <div className="inline-flex items-center gap-1 p-1 bg-zinc-100 rounded-lg">
                    {STOREFRONT_VERSIONS.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setFocusedId(v.id)}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          focusedId === v.id
                            ? 'bg-blue-600 text-white'
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {v.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Viewport & Height Controls */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-zinc-500">Viewport</span>
                  <div className="inline-flex items-center gap-1 p-1 bg-zinc-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setViewportMode('desktop-scaled')}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        viewportMode === 'desktop-scaled'
                          ? 'bg-white text-zinc-900 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      Desktop 1280px
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewportMode('fluid')}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        viewportMode === 'fluid'
                          ? 'bg-white text-zinc-900 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      Fluid
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewportMode('mobile')}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        viewportMode === 'mobile'
                          ? 'bg-white text-zinc-900 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      Mobile 390px
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-zinc-500">Height</span>
                  <div className="inline-flex items-center gap-1 p-1 bg-zinc-100 rounded-lg tabular-nums">
                    {[540, 640, 800].map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setFrameHeight(h)}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          frameHeight === h
                            ? 'bg-white text-zinc-900 shadow-xs'
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {h}px
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Side-by-Side Iframe Grid */}
            <div className={`grid gap-5 ${gridColsClass}`}>
              {visibleVersions.map((version, idx) => (
                <ViewportFrame
                  key={`${version.id}-${idx}`}
                  version={version}
                  viewportMode={viewportMode}
                  frameHeight={frameHeight}
                  globalReloadSeed={globalReloadSeed}
                  isFocused={layoutMode === 'single' && focusedId === version.id}
                  onToggleFocus={() => handleToggleFocus(version.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Breakdown */}
        <section id="methodology" className="py-16 border-t border-zinc-200 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-medium text-zinc-500 mb-2">
                Iteration Architecture · Design Rationale
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 tracking-tight text-balance">
                How each version evolves the storefront experience
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {STOREFRONT_VERSIONS.map((version) => (
                <div
                  key={version.id}
                  className="pt-6 border-t border-zinc-200 flex flex-col justify-between gap-6"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                      <span className="font-mono font-medium text-zinc-800 tabular-nums">
                        {version.index}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{version.methodology}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-zinc-900 tracking-tight">
                      {version.title}
                    </h3>

                    <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                      {version.summary}
                    </p>

                    <ul className="mt-5 space-y-2.5 text-sm text-zinc-700">
                      {version.keyChanges.map((change, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="font-mono text-xs text-zinc-400 mt-1 tabular-nums">
                            0{i + 1}
                          </span>
                          <span className="leading-relaxed">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500 truncate">
                      {version.focusAreas.join(' · ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFocusedId(version.id);
                        setLayoutMode('single');
                        document
                          .getElementById('comparison')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Inspect full width →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nielsen's 10 Heuristics Matrix */}
        <HeuristicsMatrix />
      </main>

      {/* Quiet Footer with Direct Live Deployment Links */}
      <footer id="deployments" className="border-t border-zinc-200 bg-white py-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-sm font-semibold text-zinc-900">
              Storefront UX Comparison
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Direct links to all three hosted Vercel deployments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            {STOREFRONT_VERSIONS.map((v) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-blue-600 transition-colors font-medium"
              >
                {v.shortLabel} ({v.hostLabel})
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
