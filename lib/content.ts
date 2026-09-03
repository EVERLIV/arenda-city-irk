import categoriesData from "@/content/categories.json";
import advertisingData from "@/content/advertising.json";

export interface CategoryStat {
  value: string;
  label: string;
}

export interface CategoryUseCase {
  title: string;
  description: string;
}

export interface CategoryFormat {
  title: string;
  description: string;
}

export interface CategoryProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface Category {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  longDescription: string[];
  stats: CategoryStat[];
  useCases: CategoryUseCase[];
  formats: CategoryFormat[];
  process: CategoryProcessStep[];
  gallery: string[];
  benefits: string[];
  faq: CategoryFaq[];
  relatedSlugs: string[];
  criteria: string[];
  catalogKeywords: string[];
}

export interface AdvertisingType {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  features: string[];
}

export function getCategories(): Category[] {
  return categoriesData as Category[];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find((category) => category.slug === slug);
}

export function getRelatedCategories(slugs: string[]): Category[] {
  return slugs
    .map((slug) => getCategoryBySlug(slug))
    .filter((category): category is Category => Boolean(category));
}

export function matchesCategoryKeywords(
  haystack: string,
  keywords: string[],
): boolean {
  const text = haystack.toLowerCase();
  return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
}

export function getAdvertisingTypes(): AdvertisingType[] {
  return advertisingData as AdvertisingType[];
}

export function getAdvertisingTypeBySlug(slug: string): AdvertisingType | undefined {
  return getAdvertisingTypes().find((type) => type.slug === slug);
}
