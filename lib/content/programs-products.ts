import content from "./programs-products.json";

export type Money = Readonly<{
  amount: number;
  currency: string;
  approximate: boolean;
}>;

export type ProgramFrequency = Readonly<{
  count: number;
  period: string;
  approximate: boolean;
}>;

export type ProgramSessions = Readonly<{
  count: number;
  durationMinutes: number;
  durationApproximate: boolean;
  frequency: ProgramFrequency;
}>;

export type ProgramInclusion = Readonly<{
  id: string;
  label: string;
}>;

export type EstimatedClientCapacity = Readonly<{
  minimum: number;
  maximum: number;
  approximate: boolean;
}>;

export type ProgramContent = Readonly<{
  id: string;
  name: string;
  type: string;
  price: Money;
  sessions: ProgramSessions;
  delivery: string;
  inclusions: readonly ProgramInclusion[];
  notedAreas: readonly string[];
  estimatedNewClientsPerMonth: EstimatedClientCapacity;
  ctaLabel: string;
}>;

export type ProductImage = Readonly<{
  src: string;
  alt: string | null;
}>;

export type ProductContent = Readonly<{
  id: string;
  name: string;
  featured: boolean;
  price: Money | null;
  description: string | null;
  image: ProductImage | null;
  externalUrl: string | null;
}>;

type ProgramsProductsContent = Readonly<{
  programs: readonly ProgramContent[];
  products: readonly ProductContent[];
}>;

const typedContent: ProgramsProductsContent = content;

export const programs: readonly ProgramContent[] = typedContent.programs;
export const products: readonly ProductContent[] = typedContent.products;

export function getProgramById(id: string): ProgramContent | undefined {
  return programs.find((program) => program.id === id);
}

export function getExternalProductUrl(product: ProductContent): string | null {
  if (!product.externalUrl) {
    return null;
  }

  try {
    const url = new URL(product.externalUrl);

    return url.protocol === "http:" || url.protocol === "https:"
      ? product.externalUrl
      : null;
  } catch {
    return null;
  }
}
