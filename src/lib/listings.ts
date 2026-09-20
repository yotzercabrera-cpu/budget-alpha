import type { CollectionEntry } from 'astro:content';
import { site } from '../data/site';

export type Listing = CollectionEntry<'listings'>;
export type ListingFilter = 'all' | 'newsletters' | 'tools';

export function formatUsd(value: number | null): string {
  if (value == null) return 'See notes';
  const fractionDigits = Number.isInteger(value) ? 0 : 2;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 2,
  }).format(value);
}

export function priceLabel(listing: Listing['data']): string {
  if (listing.priceMonthly != null) {
    return `${formatUsd(listing.priceMonthly)}/mo`;
  }
  if (listing.priceAnnual != null) {
    return `${formatUsd(listing.priceAnnual)}/yr`;
  }
  return 'See notes';
}

export function annualEquivalent(listing: Listing['data']): string | null {
  if (listing.priceAnnual != null) {
    return `${formatUsd(listing.priceAnnual)}/yr`;
  }
  return null;
}

export function matchesFilter(listing: Listing, filter: ListingFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'newsletters') {
    return listing.data.category === 'newsletter' || listing.data.category === 'both';
  }
  return listing.data.category === 'tool' || listing.data.category === 'both';
}

export function categoryLabel(category: Listing['data']['category']): string {
  if (category === 'newsletter') return 'Newsletter';
  if (category === 'tool') return 'Tool';
  return 'Newsletter + tool';
}

export function searchBlob(listing: Listing): string {
  const { data } = listing;
  return [
    data.name,
    data.tagline,
    data.bestFor,
    data.verdict,
    data.tags.join(' '),
    categoryLabel(data.category),
  ]
    .join(' ')
    .toLowerCase();
}

export function qualifiesForDirectory(data: Listing['data']): boolean {
  const monthlyOk = data.priceMonthly != null && data.priceMonthly <= site.priceCapMonthly;
  const annualOk = data.priceAnnual != null && data.priceAnnual <= site.priceCapAnnual;
  return monthlyOk || annualOk;
}

export function compareListings(a: Listing, b: Listing): number {
  if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
  const aPrice = a.data.priceMonthly ?? Number.POSITIVE_INFINITY;
  const bPrice = b.data.priceMonthly ?? Number.POSITIVE_INFINITY;
  if (aPrice !== bPrice) return aPrice - bPrice;
  return a.data.name.localeCompare(b.data.name);
}
