export interface FAQEntry {
  question: string;
  answer: string;
}

export interface QuickPairing {
  from: string;
  to: string;
  /** When set, selecting this pairing also fills the input with this value (e.g. "500" g → kg). */
  presetFromValue?: string;
}

export interface ConverterUiConfig {
  defaultFromValue?: string;
  defaultFromUnitId?: string;
  defaultToUnitId?: string;
  /** Short line under the subtitle (e.g. weight converter intro). */
  tagline?: string;
  /** Extra unit IDs shown in the equivalence chain below the result (excluding the active from unit). */
  summaryChainUnitIds?: string[];
  /** Hero: custom weight art, or icon badge for other categories. */
  heroVariant?: 'weight' | 'icon';
  /** When false, hides the range slider (e.g. temperature offsets, radix math). */
  showSlider?: boolean;
  commonUnitIds: string[];
  conversionTips: string[];
  quickPairings: QuickPairing[];
}

/** Authoritative or educational external link (standards bodies, universities, government). */
export interface SeoReferenceLink {
  label: string;
  href: string;
  /** Shown as subtle attribution, e.g. "NIST", "BIPM", "MIT OpenCourseWare". */
  source?: string;
}

/** Internal links with query presets for sharing and crawlable related entry points. */
export interface SeoInternalDeepLink {
  /** e.g. "?from=cm&to=in&value=2.54" */
  query: string;
  label: string;
}

/**
 * High-intent “people also search” style links — always internal routes for crawl equity.
 */
export interface SeoTopQueryLink {
  /** Question-style or keyword label shown to users */
  label: string;
  href: string;
  /** Optional context line for UX / long-tail phrasing */
  note?: string;
}

export interface SEOContent {
  title: string;
  description: string;
  h1: string;
  intro: string;
  howTo: {
    title: string;
    steps: string[];
    snippet: string;
  };
  examples: { label: string; value: string }[];
  faqs: FAQEntry[];
  /** Optional: merged from central enrichment (references, deep links, copy tweaks). */
  references?: SeoReferenceLink[];
  internalDeepLinks?: SeoInternalDeepLink[];
  /** Why these units exist (standards history) — supports E-E-A-T. */
  history?: string;
  /** Short heading above the formula block */
  formulaHeading?: string;
  /** Core relationship as plain text (avoid MathML in JSON for portability). */
  formula?: string;
  /** Intuitive explanation of what the symbols mean and when the formula applies */
  formulaExplanation?: string;
  /** “Sticky” reminders — aim for four concise tips learners can recall */
  memoryTips?: string[];
  /** Internal links mirroring real search intents */
  topQueries?: SeoTopQueryLink[];
}

/**
 * Fields only used in `enrichment/` merges — stripped before public `SEOContent` shape in getters if needed.
 * Use `extraFaqs` to append to the base category FAQs; use `faqs` on the enrichment object to replace entirely.
 */
export interface SeoEnrichmentLayer extends Partial<SEOContent> {
  extraFaqs?: FAQEntry[];
}
