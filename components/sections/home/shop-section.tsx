import { Heart } from "lucide-react";

import { SectionIntro } from "@/components/section/shared/section-intro";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  type ShopProduct,
  shopCategories,
  shopProducts,
} from "@/lib/content/home";

export function ShopSection() {
  return (
    <section
      id="shop"
      className="shop section-shell"
      data-screen-label="Shop"
    >
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="The Shop"
          title="Wear it. Carry"
          accent="it. Train in it."
          description="Small drops, made well. Every piece tested in the studio before it shows up here. Free shipping over $75."
        />
        <div className="shop-bar" aria-label="Shop categories">
          {/* [PLACEHOLDER] Category chips are visual-only. [TODO] Wire real filtering and product counts. */}
          {shopCategories.map((category) => (
            <button
              key={category}
              type="button"
              className="shop-chip"
              aria-pressed={category === "All"}
              aria-label={`Show ${category} products`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="merch-grid">
          {shopProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: ShopProduct }) {
  return (
    <article>
      <Card className="merch-card">
        <CardHeader className="merch-card__media">
          {product.badge ? (
            <span
              className="merch-badge"
              data-tone={product.badgeTone ?? "mint"}
            >
              {product.badge}
            </span>
          ) : null}
          {/* [PLACEHOLDER] Save button is visual-only. [TODO] Wire favorites state and customer account persistence. */}
          <button
            type="button"
            className="merch-save"
            aria-label={`Save ${product.name}`}
          >
            <Heart aria-hidden="true" size={15} strokeWidth={2.4} />
          </button>
          <ProductArt product={product} />
        </CardHeader>
        <CardContent className="merch-card__body">
          <p className="merch-card__category">{product.category}</p>
          <h3 className="merch-card__title">{product.name}</h3>
        </CardContent>
        <CardFooter className="merch-card__footer">
          <p className="merch-card__price">
            {product.price}
            {product.compareAtPrice ? (
              <span>{product.compareAtPrice}</span>
            ) : null}
          </p>
          <div className="merch-colors" aria-label={`${product.name} colors`}>
            {product.colors.map((color) => (
              <span
                key={color}
                className="merch-color"
                data-color={color}
                aria-label={`${product.name} color ${color}`}
                role="img"
              />
            ))}
          </div>
        </CardFooter>
      </Card>
    </article>
  );
}

function ProductArt({ product }: { product: ShopProduct }) {
  switch (product.art) {
    case "tee":
      return (
        <div className="art-tee" aria-hidden="true">
          <div className="tee-shape">
            <div className="tee-print">
              THAT&apos;S IT,<em>be fitt</em>
            </div>
          </div>
        </div>
      );
    case "bottle":
      return (
        <div className="art-bottle" aria-hidden="true">
          <div className="bottle-shape">
            <span className="bottle-label">BE FITT · 28OZ</span>
          </div>
        </div>
      );
    case "mat":
      return (
        <div className="art-mat" aria-hidden="true">
          <div className="mat-roll" />
        </div>
      );
    case "cap":
      return (
        <div className="art-cap" aria-hidden="true">
          <div className="cap-shape">
            <span className="cap-logo">BE FITT</span>
          </div>
        </div>
      );
    case "crew":
      return (
        <div className="art-tee" aria-hidden="true">
          <div className="tee-shape tee-shape--coral">
            <div className="tee-print">
              STRONG<em>for life</em>
            </div>
          </div>
        </div>
      );
    case "bands":
      return (
        <div className="art-band" aria-hidden="true">
          <div className="band-set">
            <div className="band" />
            <div className="band" />
            <div className="band" />
          </div>
        </div>
      );
    case "journal":
      return (
        <div className="art-journal" aria-hidden="true">
          <div className="journal-shape">
            <span className="journal-shape__label">Be Fitt · 90 days</span>
            <span className="journal-shape__title">
              Training
              <br />
              Journal
            </span>
          </div>
        </div>
      );
    case "bag":
      return (
        <div className="art-bag" aria-hidden="true">
          <div className="bag-shape">
            <div className="bag-print">
              THAT&apos;S IT,<em>be fitt</em>
            </div>
          </div>
        </div>
      );
  }
}
