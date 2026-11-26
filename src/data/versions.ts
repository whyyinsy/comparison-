export type VersionId = 'original' | 'v1' | 'v2';

export interface StorefrontVersion {
  id: VersionId;
  index: string;
  shortLabel: string;
  title: string;
  methodology: string;
  url: string;
  hostLabel: string;
  summary: string;
  keyChanges: string[];
  focusAreas: string[];
}

export const STOREFRONT_VERSIONS: StorefrontVersion[] = [
  {
    id: 'original',
    index: '01',
    shortLabel: 'Original Replica',
    title: 'Original Replica',
    methodology: 'Baseline E-Commerce Pattern',
    url: 'https://amazonoriginal-zeta.vercel.app/',
    hostLabel: 'amazonoriginal-zeta.vercel.app',
    summary:
      'Faithful baseline replica preserving dense multi-row navigation, competing promotional carousels, and traditional account dropdown patterns.',
    keyChanges: [
      'Dense multi-tier header with simultaneous search, category strip, and regional selectors',
      'Standard account hover/click menu with fragmented order and profile entry points',
      'High-density product grid with uniform visual weight across primary and secondary CTAs',
    ],
    focusAreas: ['Baseline Reference', 'Legacy Density', 'Standard Account Flow'],
  },
  {
    id: 'v1',
    index: '02',
    shortLabel: 'Version 1 · Intuitive Accounts',
    title: 'Version 1',
    methodology: 'Built Using Intuitive Accounts',
    url: 'https://amazon-enhanced.vercel.app/',
    hostLabel: 'amazon-enhanced.vercel.app',
    summary:
      'First improvement pass centered on intuitive account ergonomics—clarifying sign-in state, saved preferences, order context, and personalized navigation.',
    keyChanges: [
      'Unified account hub consolidating profile, orders, lists, and payment context into clear pathways',
      'Reduced cognitive friction around authentication state and returning-shopper workflows',
      'Stronger visual grouping between account actions and storefront browsing controls',
    ],
    focusAreas: ['Intuitive Accounts', 'Identity Clarity', 'Streamlined Checkout Entry'],
  },
  {
    id: 'v2',
    index: '03',
    shortLabel: 'Version 2 · Nielsen Heuristics',
    title: 'Version 2',
    methodology: "Built Using Nielsen's 10 Heuristics",
    url: 'https://amazon-enhancedv2.vercel.app/',
    hostLabel: 'amazon-enhancedv2.vercel.app',
    summary:
      "Comprehensive redesign systematically evaluated and refined against Jakob Nielsen's 10 Usability Heuristics for clarity, feedback, error prevention, and minimalism.",
    keyChanges: [
      'Immediate system status visibility across cart updates, stock indicators, and active filters',
      'Consistent visual hierarchy and minimalist layout removing redundant promotional clutter',
      'Explicit error prevention, undo/recovery controls, and scannable product comparison cues',
    ],
    focusAreas: ["Nielsen's 10 Heuristics", 'Error Prevention', 'Aesthetic Minimalism'],
  },
];

export type HeuristicCategory = 'all' | 'feedback' | 'control' | 'clarity';

export interface HeuristicRow {
  number: string;
  name: string;
  category: Exclude<HeuristicCategory, 'all'>;
  categoryLabel: string;
  original: string;
  v1: string;
  v2: string;
}

export const NIELSEN_HEURISTICS_MATRIX: HeuristicRow[] = [
  {
    number: 'H1',
    name: 'Visibility of System Status',
    category: 'feedback',
    categoryLabel: 'Feedback & Clarity',
    original: 'Subtle badge updates; limited feedback on filter or cart state transitions.',
    v1: 'Clear signed-in account status and active cart/order indicators in the header.',
    v2: 'Explicit inline feedback for cart mutations, active filters, and stock availability.',
  },
  {
    number: 'H2',
    name: 'Match Between System & Real World',
    category: 'clarity',
    categoryLabel: 'Efficiency & Aesthetics',
    original: 'Internal retail jargon and dense department taxonomies across menus.',
    v1: 'Natural, shopper-oriented language across account, saved lists, and order tracking.',
    v2: 'Plain-language labels, logical category grouping, and familiar mental models throughout.',
  },
  {
    number: 'H3',
    name: 'User Control & Freedom',
    category: 'control',
    categoryLabel: 'User Control & Prevention',
    original: 'Backtracking from deep category or account pages requires multi-step navigation.',
    v1: 'Direct switching between account sub-views and active shopping state without losing context.',
    v2: 'One-click filter clearing, reversible cart adjustments, and persistent escape paths.',
  },
  {
    number: 'H4',
    name: 'Consistency & Standards',
    category: 'clarity',
    categoryLabel: 'Efficiency & Aesthetics',
    original: 'Mixed button weights, inconsistent card spacing, and competing link treatments.',
    v1: 'Standardized account controls and unified typography across user-facing panels.',
    v2: 'Strict component grammar, predictable CTA hierarchy, and uniform interaction patterns.',
  },
  {
    number: 'H5',
    name: 'Error Prevention',
    category: 'control',
    categoryLabel: 'User Control & Prevention',
    original: 'Minimal pre-validation before checkout or destructive cart/quantity changes.',
    v1: 'Guided account forms and clearer address/payment selection before confirmation.',
    v2: 'Proactive guardrails on quantity limits, empty searches, and irreversible actions.',
  },
  {
    number: 'H6',
    name: 'Recognition Rather Than Recall',
    category: 'feedback',
    categoryLabel: 'Feedback & Clarity',
    original: 'Deep nested hover menus force users to remember where settings live.',
    v1: 'Surfaces recently viewed context, saved items, and account shortcuts upfront.',
    v2: 'Persistent breadcrumbs, visible active constraints, and scannable product attributes.',
  },
  {
    number: 'H7',
    name: 'Flexibility & Efficiency of Use',
    category: 'clarity',
    categoryLabel: 'Efficiency & Aesthetics',
    original: 'Single linear path through search and product detail pages.',
    v1: 'Quick-access account shortcuts and one-step reorder/wishlist entry points.',
    v2: 'Fast keyboard-friendly search, quick-add controls, and streamlined repeat-buyer flows.',
  },
  {
    number: 'H8',
    name: 'Aesthetic & Minimalist Design',
    category: 'clarity',
    categoryLabel: 'Efficiency & Aesthetics',
    original: 'High visual noise with competing banners, dense footer columns, and crowded tiles.',
    v1: 'Cleaner account surfaces while retaining familiar storefront discovery grids.',
    v2: 'Disciplined whitespace, restrained color accents, and removal of non-essential chrome.',
  },
  {
    number: 'H9',
    name: 'Help Users Recognize, Diagnose & Recover from Errors',
    category: 'control',
    categoryLabel: 'User Control & Prevention',
    original: 'Generic validation prompts with limited guidance on how to fix input issues.',
    v1: 'Clear inline account validation messages tied directly to the offending field.',
    v2: 'Constructive recovery states for empty results, invalid inputs, and cart conflicts.',
  },
  {
    number: 'H10',
    name: 'Help & Documentation',
    category: 'feedback',
    categoryLabel: 'Feedback & Clarity',
    original: 'Customer support links buried in deep footer navigation.',
    v1: 'Contextual help and order support surfaced directly inside the account hub.',
    v2: 'Task-adjacent delivery, return policy, and support cues placed at decision points.',
  },
];
