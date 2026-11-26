import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Maximize2, Minimize2, RotateCw } from 'lucide-react';
import type { StorefrontVersion } from '../data/versions';

export type ViewportMode = 'desktop-scaled' | 'fluid' | 'mobile';

interface ViewportFrameProps {
  version: StorefrontVersion;
  viewportMode: ViewportMode;
  frameHeight: number;
  globalReloadSeed: number;
  isFocused: boolean;
  onToggleFocus: () => void;
}

const DESKTOP_WIDTH = 1280;
const MOBILE_WIDTH = 390;

export function ViewportFrame({
  version,
  viewportMode,
  frameHeight,
  globalReloadSeed,
  isFocused,
  onToggleFocus,
}: ViewportFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(460);
  const [localReloadCount, setLocalReloadCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const iframeKey = `${version.id}-${globalReloadSeed}-${localReloadCount}`;

  useEffect(() => {
    setIsLoaded(false);
  }, [iframeKey]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      setContainerWidth(el.clientWidth);
    };
    updateWidth();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleReload = () => {
    setIsLoaded(false);
    setLocalReloadCount((c) => c + 1);
  };

  // Compute scale and logical dimensions depending on viewportMode
  let renderWidth = '100%';
  let renderHeight = `${frameHeight}px`;
  let scale = 1;
  let isCenteredMobile = false;

  if (viewportMode === 'desktop-scaled') {
    scale = Math.min(1, Math.max(0.2, containerWidth / DESKTOP_WIDTH));
    renderWidth = `${DESKTOP_WIDTH}px`;
    renderHeight = `${Math.round(frameHeight / scale)}px`;
  } else if (viewportMode === 'mobile') {
    isCenteredMobile = true;
    scale = containerWidth < MOBILE_WIDTH + 24 ? Math.max(0.4, (containerWidth - 24) / MOBILE_WIDTH) : 1;
    renderWidth = `${MOBILE_WIDTH}px`;
    renderHeight = `${Math.round(frameHeight / scale)}px`;
  }

  const activeResolutionLabel =
    viewportMode === 'desktop-scaled'
      ? `${DESKTOP_WIDTH}px · ${Math.round(scale * 100)}%`
      : viewportMode === 'mobile'
        ? `${MOBILE_WIDTH}px · ${Math.round(scale * 100)}%`
        : `${Math.round(containerWidth)}px · 100%`;

  return (
    <article className="flex flex-col bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-xs">
      {/* Architectural Chrome Header */}
      <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50/70 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="font-mono font-medium text-zinc-700 tabular-nums">{version.index}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{version.methodology}</span>
            </div>
            <h3 className="text-base font-semibold text-zinc-900 tracking-tight truncate mt-0.5">
              {version.title}
            </h3>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleReload}
              title={`Reload ${version.title}`}
              aria-label={`Reload ${version.title}`}
              className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <RotateCw className={`w-4 h-4 ${!isLoaded ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onToggleFocus}
              title={isFocused ? 'Exit single focus' : `Focus ${version.title}`}
              aria-label={isFocused ? 'Exit single focus' : `Focus ${version.title}`}
              className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              {isFocused ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <a
              href={version.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Open ${version.title} in new tab`}
              aria-label={`Open ${version.title} in new tab`}
              className="p-2 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Address & Viewport Readout Bar */}
        <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs">
          <a
            href={version.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-zinc-600 hover:text-blue-600 truncate transition-colors"
          >
            {version.hostLabel}
          </a>
          <span className="font-mono text-[11px] text-zinc-400 tabular-nums whitespace-nowrap shrink-0">
            {activeResolutionLabel}
          </span>
        </div>
      </div>

      {/* Live Iframe Container */}
      <div
        ref={containerRef}
        style={{ height: `${frameHeight}px` }}
        className={`relative w-full overflow-hidden ${
          isCenteredMobile ? 'bg-zinc-100 flex justify-center py-3' : 'bg-white'
        }`}
      >
        {/* Loading Skeleton */}
        {!isLoaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 bg-zinc-50 flex flex-col justify-between p-5 pointer-events-none"
          >
            <div className="space-y-3">
              <div className="h-9 w-full bg-zinc-200/70 rounded animate-pulse" />
              <div className="h-36 w-full bg-zinc-200/50 rounded animate-pulse" />
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="h-28 bg-zinc-200/50 rounded animate-pulse" />
                <div className="h-28 bg-zinc-200/50 rounded animate-pulse" />
                <div className="h-28 bg-zinc-200/50 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>Loading {version.hostLabel}…</span>
              <span>Live iframe</span>
            </div>
          </div>
        )}

        <div
          style={
            isCenteredMobile
              ? {
                  width: `${Math.round(MOBILE_WIDTH * scale)}px`,
                  height: `${frameHeight - 24}px`,
                  overflow: 'hidden',
                }
              : {
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }
          }
          className={
            isCenteredMobile
              ? 'rounded-xl border border-zinc-300 bg-white shadow-sm'
              : 'w-full h-full'
          }
        >
          <iframe
            key={iframeKey}
            src={version.url}
            title={`${version.title} — ${version.methodology}`}
            loading="eager"
            onLoad={() => setIsLoaded(true)}
            style={{
              width: renderWidth,
              height: isCenteredMobile
                ? `${Math.round((frameHeight - 24) / scale)}px`
                : renderHeight,
              transform: scale !== 1 ? `scale(${scale})` : undefined,
              transformOrigin: 'top left',
            }}
            className="border-0 bg-white block"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>

      {/* Concise Footer Caption */}
      <div className="px-4 py-3 border-t border-zinc-200 bg-white flex items-center justify-between gap-4 text-xs text-zinc-600">
        <p className="truncate">{version.summary}</p>
        <a
          href={version.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0"
        >
          Open live →
        </a>
      </div>
    </article>
  );
}
