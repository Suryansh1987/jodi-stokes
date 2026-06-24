import { SectionIntro } from "@/components/section/shared/section-intro";
import { shopCategories, shopProducts } from "@/lib/content/home";

export function ShopSection() {
  return (
    <section
      id="shop"
      className="section-shell bg-black-deep py-24"
      data-screen-label="Shop"
    >
      {/* [PLACEHOLDER] Final product grid and CSS product art are implemented in Task 5. */}
      <div className="mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="The Shop"
          title="Wear it. Carry"
          accent="it. Train in it."
          description="Small drops, made well. Every piece tested in the studio before it shows up here. Free shipping over $75."
        />
        <div className="flex flex-wrap gap-2">
          {shopCategories.map((category) => (
            <span key={category} className="rounded-full border border-white/20 px-4 py-2 font-display text-xs uppercase tracking-widest text-white/80">
              {category}
            </span>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {shopProducts.map((product) => (
            <article key={product.name} className="rounded-2xl border border-white/10 p-5">
              <p className="font-display text-xs uppercase tracking-widest text-mint">
                {product.category}
              </p>
              <h3 className="mt-3 font-display text-lg font-bold text-white">
                {product.name}
              </h3>
              <p className="mt-2 font-display text-xl font-bold text-white">
                {product.price}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
