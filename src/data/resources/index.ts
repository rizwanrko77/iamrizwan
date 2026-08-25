import { Resource } from './types';
import { makeApplicationTechnicalRound } from './make-application-technical-round';
import { ultimate0CostWebDevAntigravity } from './ultimate-0-cost-web-development-antigravity';
import { knowExactlyHowManyHoursFree } from './know-exactly-how-many-hours-free';

export * from './types';

export const resourcesData: Resource[] = [
  makeApplicationTechnicalRound,
  ultimate0CostWebDevAntigravity,
  knowExactlyHowManyHoursFree,
];

export function getAllResources(): Resource[] {
  return resourcesData;
}

export function getResourceBySlug(slug: string): Resource | undefined {
  return resourcesData.find((r) => r.slug === slug);
}

export function getAllCategories(): string[] {
  const categories = Array.from(new Set(resourcesData.map((r) => r.category)));
  return ['All', ...categories];
}

export function getFeaturedResources(): Resource[] {
  return resourcesData.filter((r) => r.featured);
}
