/**
 * JSON-LD builders for OC — Online Calculator.
 *
 * Review / AggregateRating are intentionally omitted unless you add matching,
 * on-page ratings (Google guidance on structured data quality).
 */

import { converterCategories } from '@/lib/units';
import { BRAND_TAGLINE, SCHEMA_ORG_NAME } from '@/lib/brand';

export function orgId(site: string): string {
  return `${site}/#organization`;
}

export function websiteId(site: string): string {
  return `${site}/#website`;
}

/** Free web app offer: $0 with explicit min/max price bounds on the specification. */
export function buildFreeOfferForSite(site: string) {
  return {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: site,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'USD',
      price: '0',
      minPrice: 0,
      maxPrice: 0,
    },
  };
}

export function buildOrganizationJson(site: string) {
  return {
    '@type': 'Organization',
    '@id': orgId(site),
    name: SCHEMA_ORG_NAME,
    url: site,
    description: `${BRAND_TAGLINE} Includes streaks, daily challenges, and precise tools for students, professionals, and everyday use.`,
    sameAs: [site],
  };
}

export function buildWebSiteJson(site: string) {
  return {
    '@type': 'WebSite',
    '@id': websiteId(site),
    url: site,
    name: SCHEMA_ORG_NAME,
    description:
      'Comprehensive calculator and unit conversion platform with category-based tools and expert learning resources.',
    inLanguage: 'en-US',
    publisher: { '@id': orgId(site) },
    copyrightHolder: { '@id': orgId(site) },
    /** Opening the site — no URL search template (on-site search is in-app only). */
    potentialAction: {
      '@type': 'ReadAction',
      target: site,
    },
  };
}

/**
 * Primary nav as ItemList + ListItem (matches header links).
 * Use @id so other nodes can reference it if needed.
 */
export function buildSiteNavigationItemList(site: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${site}/#primary-navigation`,
    name: 'Primary navigation',
    numberOfItems: converterCategories.length + 1,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${site}/`,
      },
      ...converterCategories.map((cat, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: cat.name,
        item: `${site}/${cat.slug}`,
      })),
    ],
  };
}

export function buildBreadcrumbList(
  site: string,
  breadcrumbId: string,
  items: { name: string; path: string }[]
) {
  return {
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement: items.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: `${site}${entry.path}`,
    })),
  };
}

export type CategoryToolGraphParams = {
  site: string;
  slug: string;
  name: string;
  description: string;
  categoryLabel: string;
};

/** Category / tool URL: WebPage + WebApplication + Breadcrumb + Organization + WebSite. */
export function buildCategoryToolPageGraph(params: CategoryToolGraphParams) {
  const { site, slug, name, description, categoryLabel } = params;
  const pageUrl = `${site}/${slug}`;
  const webpageId = `${pageUrl}/#webpage`;
  const appId = `${pageUrl}/#webapplication`;
  const breadcrumbId = `${pageUrl}/#breadcrumb`;
  const offer = buildFreeOfferForSite(pageUrl);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationJson(site),
      buildWebSiteJson(site),
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: pageUrl,
        name,
        description,
        inLanguage: 'en-US',
        isPartOf: { '@id': websiteId(site) },
        about: { '@id': appId },
        breadcrumb: { '@id': breadcrumbId },
        mainEntity: { '@id': appId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${pageUrl}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      },
      buildBreadcrumbList(site, breadcrumbId, [
        { name: 'Home', path: '/' },
        { name: categoryLabel, path: `/${slug}` },
      ]),
      {
        '@type': 'WebApplication',
        '@id': appId,
        name,
        url: pageUrl,
        description,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript.',
        isAccessibleForFree: true,
        offers: offer,
        publisher: { '@id': orgId(site) },
        isPartOf: { '@id': websiteId(site) },
      },
    ],
  };
}

/** Homepage @graph: core entities, featured tools ItemList, home-only breadcrumb. */
export function buildHomePageGraph(site: string) {
  const freeOffer = buildFreeOfferForSite(site);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationJson(site),
      buildWebSiteJson(site),
      {
        '@type': 'WebPage',
        '@id': `${site}/#webpage`,
        url: site,
        name: `${SCHEMA_ORG_NAME} — Unit Converters & Calculators`,
        description:
          'Homepage for OC — Online Calculator: gamified conversion and calculator tools across math, science, finance, and productivity.',
        inLanguage: 'en-US',
        isPartOf: { '@id': websiteId(site) },
        about: { '@id': `${site}/#app` },
        breadcrumb: { '@id': `${site}/#breadcrumb` },
        mainEntity: { '@id': `${site}/#app` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${site}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      },
      {
        '@type': 'WebApplication',
        '@id': `${site}/#app`,
        name: SCHEMA_ORG_NAME,
        url: site,
        applicationCategory: 'EducationalApplication',
        applicationSubCategory: 'Unit Converter and Calculator Suite',
        operatingSystem: 'Web Browser',
        browserRequirements: 'Requires JavaScript. Works on modern desktop and mobile browsers.',
        isAccessibleForFree: true,
        offers: freeOffer,
        publisher: { '@id': orgId(site) },
        featureList: [
          'Multi-category unit conversion',
          'Scientific and educational calculators',
          'Real-time conversion calculations',
          'Gamified progress with ranks and gems',
          'Daily challenge and streak mechanics',
          'Mobile-first responsive interface',
          'Frequently used converter shortcuts',
          'Specialized decimal/fraction conversion tools',
        ],
        softwareHelp: {
          '@type': 'CreativeWork',
          url: `${site}/learn`,
          name: 'Expert Advice and Learning Hub',
        },
        potentialAction: {
          '@type': 'UseAction',
          target: site,
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${site}/#calculator-suite`,
        name: 'Calculator and Converter Engine',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        isPartOf: { '@id': `${site}/#app` },
        description:
          'Core calculator engine supporting mathematical, scientific, finance, health, and conversion workflows.',
        featureList: [
          'Weight conversion',
          'Temperature conversion',
          'Area conversion',
          'Energy conversion',
          'Pressure conversion',
          'Scientific calculator',
          'Percentage calculator',
          'Geometry and algebra calculators',
          'Statistics tools',
          'Tax and loan calculators',
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${site}/#top-tools`,
        name: 'Popular and Featured Calculators',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: 8,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Decimal to Fraction', item: `${site}/decimal-to-fraction` },
          { '@type': 'ListItem', position: 2, name: 'Fraction to Decimal', item: `${site}/fraction-to-decimal` },
          { '@type': 'ListItem', position: 3, name: 'Weight Converter', item: `${site}/weight-converter` },
          { '@type': 'ListItem', position: 4, name: 'Area Converter', item: `${site}/area-converter` },
          { '@type': 'ListItem', position: 5, name: 'Scientific Calculator', item: `${site}/scientific-calculator` },
          { '@type': 'ListItem', position: 6, name: 'Loan Interest Calculator', item: `${site}/loan-interest-calculator` },
          { '@type': 'ListItem', position: 7, name: 'Sales Tax Calculator', item: `${site}/sales-tax-calculator` },
          { '@type': 'ListItem', position: 8, name: 'Time Converter', item: `${site}/time-converter` },
        ],
      },
      buildBreadcrumbList(site, `${site}/#breadcrumb`, [{ name: 'Home', path: '/' }]),
    ],
  };
}
