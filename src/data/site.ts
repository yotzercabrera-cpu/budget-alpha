export const site = {
  name: 'Budget Alpha',
  mark: 'α',
  url: 'https://budget-alpha.netlify.app',
  tagline: 'Research that stays under $50 a month.',
  description:
    'A directory of investing newsletters and research tools priced at or under $50 per month, or about $500 per year. We flag intro rates versus renewal prices and do not invent performance claims.',
  priceCapMonthly: 50,
  priceCapAnnual: 500,
  priceRule:
    'A listing qualifies only if the retail plan we reviewed is ≤ $50 per month or ≤ about $500 per year. Intro discounts do not count unless the renewal rate also clears the cap.',
  lastReviewedLabel: '20 September 2026',
  disclosure:
    'Some outbound links are affiliate placeholders (example.com) and may earn Budget Alpha a commission if a program is later attached. We are not a registered investment adviser. Nothing on this site is a recommendation to buy, sell, or hold any security, fund, or subscription. Prices and plan names change; confirm intro versus renewal terms at checkout.',
} as const;

export type Site = typeof site;
