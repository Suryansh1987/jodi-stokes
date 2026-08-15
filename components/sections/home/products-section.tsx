import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { SectionIntro } from "@/components/section/shared/section-intro";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  formatMoney,
  getExternalProductUrl,
  products,
  type ProductContent,
} from "@/lib/content/programs-products";

export function ProductsSection() {
  const featuredProduct = products.find((product) => product.featured);
  const secondaryProducts = products.filter((product) => !product.featured);

  if (!featuredProduct) {
    return null;
  }

  return (
    <section
      id="products"
      className="products section-shell"
      data-screen-label="Products"
    >
      <div className="mx-auto max-w-6xl">
        <SectionIntro eyebrow="Jodi Stokes Fitness" title="Products" />

        <article
          className="product-featured"
          data-product-id={featuredProduct.id}
          aria-labelledby={`product-${featuredProduct.id}-title`}
        >
          <ProductMedia product={featuredProduct} featured />

          <div className="product-featured__content">
            <p className="product-kicker">Featured product</p>
            <h3 id={`product-${featuredProduct.id}-title`}>
              {featuredProduct.name}
            </h3>
            {featuredProduct.description ? (
              <p className="product-description">
                {featuredProduct.description}
              </p>
            ) : null}
            {featuredProduct.price ? (
              <p className="product-price">
                {formatMoney(featuredProduct.price)}
              </p>
            ) : null}
            <ProductAction product={featuredProduct} />
          </div>
        </article>

        <div className="product-grid">
          {secondaryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: ProductContent }) {
  const hasDetails = Boolean(product.description || product.price);

  return (
    <article
      className="product-card-shell"
      data-product-id={product.id}
      aria-labelledby={`product-${product.id}-title`}
    >
      <Card className="product-card">
        <ProductMedia product={product} />
        <CardHeader className="product-card__header">
          <h3 id={`product-${product.id}-title`}>{product.name}</h3>
        </CardHeader>
        {hasDetails ? (
          <CardContent className="product-card__content">
            {product.description ? <p>{product.description}</p> : null}
            {product.price ? (
              <p className="product-price">{formatMoney(product.price)}</p>
            ) : null}
          </CardContent>
        ) : null}
        <CardFooter className="product-card__footer">
          <ProductAction product={product} />
        </CardFooter>
      </Card>
    </article>
  );
}

function ProductMedia({
  product,
  featured = false,
}: {
  product: ProductContent;
  featured?: boolean;
}) {
  if (!product.image || product.image.alt === null) {
    return null;
  }

  if (featured) {
    return (
      <div className="book-cover">
        <div className="book-showcase">
          <div className="book-3d">
            <div className="book-glow" aria-hidden="true" />
            <div className="book-spine" aria-hidden="true" />
            <div className="book-front book-front-img">
              <Image
                src={product.image.src}
                alt={product.image.alt}
                fill
                sizes="(max-width: 720px) 180px, (max-width: 1100px) 260px, 320px"
                className="book-front__image"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card__media">
      <Image
        src={product.image.src}
        alt={product.image.alt}
        fill
        sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
        className="product-card__image"
      />
    </div>
  );
}

function ProductAction({ product }: { product: ProductContent }) {
  const externalUrl = getExternalProductUrl(product);

  if (!externalUrl) {
    return <p className="product-unavailable">Purchase link unavailable</p>;
  }

  return (
    <a
      className="product-action"
      href={externalUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      View product
      <ExternalLink size={15} strokeWidth={2.4} aria-hidden="true" />
    </a>
  );
}
