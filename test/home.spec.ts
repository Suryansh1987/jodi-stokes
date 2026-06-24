import { expect, test } from "@playwright/test";

import {
  expectImageLoaded,
  expectNoHorizontalOverflow,
  expectNotOverlapping,
} from "./support/assertions";

test.describe("public home page", () => {
  test("renders the desktop hero, pillars, and about sections", async ({
    isMobile,
    page,
  }) => {
    test.skip(isMobile, "Desktop-only layout and floating chip checks.");

    await page.goto("/");

    await expect(page).toHaveTitle(/Jodi Stokes Fitness/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /That's it,\s*be fitt\.\s*Train with Jodi\./,
      }),
    ).toBeVisible();

    await expect(page.getByText("Now coaching")).toBeVisible();
    await expect(page.getByText("+12 lbs lean")).toBeVisible();
    await expect(page.getByText("Sleep · Stress · Plate")).toBeVisible();
    await expect(page.getByText("15+")).toBeVisible();
    await expect(page.getByText("2,400")).toBeVisible();
    await expect(page.getByText("4.9★")).toBeVisible();

    await expectImageLoaded(
      page.getByRole("img", { exact: true, name: "Jodi Stokes" }),
    );
    await expectImageLoaded(
      page.getByRole("img", { name: "Jodi Stokes at her studio" }),
    );

    await expect(page.locator("#about")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Move smarter\./ }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Live grounded\./ }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Eat honest\./ }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /Strong at any age/ }),
    ).toBeVisible();
    const credentials = page.locator(".about-credentials");
    await expect(credentials.getByText("NASM-CPT", { exact: true })).toBeVisible();
    await expect(credentials.getByText("PN Level 2", { exact: true })).toBeVisible();
    await expect(credentials.getByText("FMS Lvl 1", { exact: true })).toBeVisible();
    await expect(credentials.getByText("Author", { exact: true })).toBeVisible();

    await expectNoHorizontalOverflow(page);
    await expectNotOverlapping(
      page.locator(".hero__content"),
      page.locator(".chip-1"),
    );
    await expectNotOverlapping(
      page.locator(".hero__content"),
      page.locator(".chip-2"),
    );
  });

  test("keeps primary desktop anchors navigable", async ({
    isMobile,
    page,
  }) => {
    test.skip(isMobile, "Desktop primary navigation is hidden on mobile.");

    await page.goto("/");

    await page.getByRole("link", { name: "Start training" }).click();
    await expect(page).toHaveURL(/#programs$/);
    await expect(page.locator("#programs")).toBeInViewport();

    await page.getByRole("link", { name: 'Read "Water Exercise"' }).click();
    await expect(page).toHaveURL(/#book$/);
    await expect(page.locator("#book")).toBeInViewport();

    await page
      .locator(".site-header__nav")
      .getByRole("link", { name: "Shop" })
      .click();
    await expect(page).toHaveURL(/#shop$/);
    await expect(page.locator("#shop")).toBeInViewport();
  });

  test("opens, locks, and closes mobile navigation", async ({
    isMobile,
    page,
  }) => {
    test.skip(!isMobile, "Mobile navigation is hidden on desktop.");

    await page.goto("/");

    await expect(page.locator(".chip-1")).toBeHidden();
    await expect(page.locator(".chip-2")).toBeHidden();

    const openMenu = page.getByRole("button", { name: "Open menu" });
    const menuButton = page.locator(".mobile-menu-button");
    const mobileDialog = page.locator(".mobile-nav");

    await expect(openMenu).toBeVisible();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await openMenu.click({ force: true });

    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await expect(mobileDialog).toHaveAttribute("data-open", "true");
    await expect(mobileDialog).toHaveAttribute("aria-hidden", "false");
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await mobileDialog.getByRole("link", { name: "Programs" }).click();

    await expect(page).toHaveURL(/#programs$/);
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(mobileDialog).toHaveAttribute("data-open", "false");
    await expect(mobileDialog).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  });

  test("renders programs and book commerce surfaces", async ({ page }) => {
    await page.goto("/");

    const programsSection = page.locator("#programs");
    const bookSection = page.locator("#book");

    await programsSection.scrollIntoViewIfNeeded();
    await expect(programsSection).toBeVisible();
    await expect(
      programsSection.getByRole("heading", {
        level: 2,
        name: /Programs that actually end somewhere\./,
      }),
    ).toBeVisible();
    await expect(
      programsSection.getByRole("heading", { name: "Strong Foundations" }),
    ).toBeVisible();
    await expect(
      programsSection.getByRole("heading", { name: "Lean & Lifted" }),
    ).toBeVisible();
    await expect(
      programsSection.getByRole("heading", { name: "The Reset" }),
    ).toBeVisible();
    await expect(programsSection.getByText("Most popular")).toBeVisible();
    await expect(programsSection.getByText("$249")).toBeVisible();
    await expect(programsSection.getByText("$189")).toBeVisible();
    await expect(programsSection.getByText("$99")).toBeVisible();
    await expectImageLoaded(
      programsSection.getByRole("img", { name: "Jodi side plank outdoors" }),
    );
    await expect(
      programsSection.getByRole("button", { name: /Add .* to cart/ }),
    ).toHaveCount(3);

    await bookSection.scrollIntoViewIfNeeded();
    await expect(bookSection).toBeVisible();
    await expect(
      bookSection.getByRole("heading", {
        level: 2,
        name: /A complete guide to water exercise\./,
      }),
    ).toBeVisible();
    await expectImageLoaded(
      bookSection.getByRole("img", { name: "Water Exercise by Jodi Books-Stokes" }),
    );
    await expect(bookSection.getByText("$32")).toBeVisible();
    await expect(bookSection.getByText("$42")).toBeVisible();
    await expect(bookSection.getByText("24% off · Signed copies")).toBeVisible();
    await expect(bookSection.getByText("60+ pool exercises")).toBeVisible();
    await expect(bookSection.getByText("Trainer-ready scripts")).toBeVisible();
    await expect(bookSection.getByRole("link", { name: /Buy the book/ })).toHaveAttribute(
      "href",
      "#",
    );
    await expect(bookSection.getByRole("link", { name: "eBook · $14" })).toHaveAttribute(
      "href",
      "#",
    );
    await expect(bookSection.getByRole("link", { name: "Bulk · trainers" })).toHaveAttribute(
      "href",
      "#",
    );

    await expectNoHorizontalOverflow(page);
  });

  test("renders shop categories and mock product cards", async ({ page }) => {
    await page.goto("/");

    const shopSection = page.locator("#shop");
    await shopSection.scrollIntoViewIfNeeded();
    await expect(shopSection).toBeVisible();

    await expect(
      shopSection.getByRole("heading", {
        level: 2,
        name: /Wear it\. Carry it\. Train in it\./,
      }),
    ).toBeVisible();

    for (const category of [
      "All",
      "Apparel",
      "Gear",
      "Hydration",
      "Journals",
      "Bundles",
    ]) {
      await expect(
        shopSection.getByRole("button", {
          name: `Show ${category} products`,
        }),
      ).toBeVisible();
    }

    await expect(
      shopSection.getByRole("button", { name: "Show All products" }),
    ).toHaveAttribute("aria-pressed", "true");

    for (const product of [
      "That's It Tee - Bone",
      "Stainless Bottle 28oz",
      "Studio Mat - 6mm",
      "Studio Cap",
      "Strong For Life Crew",
      "Resistance Band Set",
      "90-Day Training Journal",
      "Studio Tote + Journal",
    ]) {
      await expect(
        shopSection.getByRole("heading", { level: 3, name: product }),
      ).toBeVisible();
      await expect(
        shopSection.getByRole("button", { name: `Save ${product}` }),
      ).toBeVisible();
    }

    const badges = shopSection.locator(".merch-badge");
    await expect(badges.getByText("New", { exact: true })).toBeVisible();
    await expect(badges.getByText("Bestseller", { exact: true })).toBeVisible();
    await expect(badges.getByText("Limited", { exact: true })).toBeVisible();
    await expect(badges.getByText("Bundle", { exact: true })).toBeVisible();
    await expect(shopSection.getByText("$38")).toBeVisible();
    await expect(shopSection.getByText("$48")).toBeVisible();
    await expect(
      shopSection.locator(".merch-card__price").filter({ hasText: "$58" }),
    ).toHaveCount(2);
    await expect(
      shopSection.getByLabel("That's It Tee - Bone color mint"),
    ).toBeVisible();
    await expect(
      shopSection.getByLabel("Studio Tote + Journal color bone"),
    ).toBeVisible();

    await expect(shopSection.locator(".art-tee")).toHaveCount(2);
    await expect(shopSection.locator(".art-bottle")).toHaveCount(1);
    await expect(shopSection.locator(".art-mat")).toHaveCount(1);
    await expect(shopSection.locator(".art-cap")).toHaveCount(1);
    await expect(shopSection.locator(".art-band")).toHaveCount(1);
    await expect(shopSection.locator(".art-journal")).toHaveCount(1);
    await expect(shopSection.locator(".art-bag")).toHaveCount(1);
    await expect(shopSection.locator(".merch-save")).toHaveCount(8);

    await expectNoHorizontalOverflow(page);
  });
});
