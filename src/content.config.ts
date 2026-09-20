import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { site } from './data/site';

const listings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/listings' }),
  schema: z
    .object({
      name: z.string(),
      slug: z.string(),
      category: z.enum(['newsletter', 'tool', 'both']),
      tagline: z.string(),
      priceMonthly: z.number().nullable(),
      priceAnnual: z.number().nullable(),
      priceNotes: z.string(),
      bestFor: z.string(),
      whatYouGet: z.array(z.string()).min(1),
      verdict: z.string(),
      renewalGotchas: z.string(),
      affiliateUrl: z.string().url(),
      websiteUrl: z.string().url(),
      featured: z.boolean(),
      tags: z.array(z.string()),
      lastReviewed: z.coerce.date(),
    })
    .refine(
      (data) => {
        const monthlyOk =
          data.priceMonthly != null && data.priceMonthly <= site.priceCapMonthly;
        const annualOk =
          data.priceAnnual != null && data.priceAnnual <= site.priceCapAnnual;
        return monthlyOk || annualOk;
      },
      {
        message: `Listing must be ≤ $${site.priceCapMonthly}/mo or ≤ ~$${site.priceCapAnnual}/yr at the reviewed retail rate.`,
      },
    ),
});

export const collections = { listings };
