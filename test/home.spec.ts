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
    const heroSection = page.locator(".hero");

    await expect(page).toHaveTitle(/Jodi Stokes Fitness/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /That's it,\s*be fitt\.\s*Train with Jodi\./,
      }),
    ).toBeVisible();

    await expect(heroSection.getByText("Now coaching")).toBeVisible();
    await expect(heroSection.getByText("+12 lbs lean")).toBeVisible();
    await expect(heroSection.getByText("Sleep · Stress · Plate")).toBeVisible();
    await expect(heroSection.getByText("15+")).toBeVisible();
    await expect(heroSection.getByText("2,400")).toBeVisible();
    await expect(heroSection.getByText("4.9★")).toBeVisible();

    await expectImageLoaded(
      page.getByRole("img", { exact: true, name: "Jodi Stokes" }),
    );
    await expectImageLoaded(
      page.getByRole("img", { name: "Jodi Stokes at her studio" }),
    );

    await page.getByRole("button", { name: "Play intro" }).click();
    const introDialog = page.getByRole("dialog", { name: "Intro preview" });
    await expect(introDialog).toBeVisible();
    await expect(
      introDialog.getByText("Coaching video", { exact: true }),
    ).toBeVisible();
    await expect(
      introDialog.getByText(/real coaching video will live here/i),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Close intro preview" }).last(),
    ).toBeFocused();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    await page.keyboard.press("Escape");
    await expect(introDialog).toBeHidden();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");

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
    await expect(page.locator(".pillar-card")).toHaveCount(3);

    await expect(
      page.getByRole("heading", { name: /Strong at any age/ }),
    ).toBeVisible();
    await expectImageLoaded(
      page.getByRole("img", { name: "Jodi Stokes coaching portrait" }),
    );
    const aboutSection = page.locator(".about");
    await expect(aboutSection.getByText("15+")).toBeVisible();
    await expect(aboutSection.getByText("Years coaching")).toBeVisible();
    await expect(aboutSection.getByText("4.9★")).toBeVisible();
    await expect(
      aboutSection.getByRole("link", { name: "Train with Jodi" }),
    ).toHaveAttribute("href", "#coaching");
    const credentials = page.locator(".about-credentials");
    await expect(credentials.getByText("NASM-CPT", { exact: true })).toBeVisible();
    await expect(credentials.getByText("PN Level 2", { exact: true })).toBeVisible();
    await expect(credentials.getByText("FMS Lvl 1", { exact: true })).toBeVisible();
    await expect(credentials.getByText("Author", { exact: true })).toBeVisible();

    await heroSection.scrollIntoViewIfNeeded();
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
    await expect(programsSection.locator(".prog-card")).toHaveCount(3);
    await expect(programsSection.locator(".prog-card--featured")).toHaveCount(1);
    await expect(programsSection.getByText("$249")).toBeVisible();
    await expect(programsSection.getByText("$189")).toBeVisible();
    await expect(programsSection.getByText("$99")).toBeVisible();
    await expect(
      programsSection.getByText("Printable journal", { exact: true }),
    ).toBeVisible();
    await expect(
      programsSection.getByText("Hypertrophy focus", { exact: true }),
    ).toBeVisible();
    await expect(
      programsSection.getByText("Six-week kickstart", { exact: true }),
    ).toBeVisible();
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
    await expect(bookSection.getByText("60+ exercises")).toBeVisible();
    await expect(bookSection.getByText("All ages")).toBeVisible();
    await expect(bookSection.getByText("Trainer-ready", { exact: true })).toBeVisible();
    await expect(bookSection.getByText("60+ pool exercises")).toBeVisible();
    await expect(bookSection.getByText("Trainer-ready scripts")).toBeVisible();
    await expect(
      bookSection.getByRole("heading", { level: 3, name: "Pool strength" }),
    ).toBeVisible();
    await expect(
      bookSection.getByRole("heading", { level: 3, name: "Class planning" }),
    ).toBeVisible();
    await expect(
      bookSection.getByRole("heading", {
        level: 3,
        name: "Joint-friendly modifications",
      }),
    ).toBeVisible();
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
    await expect(shopSection.locator(".merch-card")).toHaveCount(8);

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
      await expect(
        shopSection.getByRole("button", { name: `Add ${product} to cart` }),
      ).toBeVisible();
    }

    const badges = shopSection.locator(".merch-badge");
    await expect(badges.getByText("New", { exact: true })).toBeVisible();
    await expect(badges.getByText("Bestseller", { exact: true })).toBeVisible();
    await expect(badges.getByText("Limited", { exact: true })).toBeVisible();
    await expect(badges.getByText("Bundle", { exact: true })).toBeVisible();
    await expect(shopSection.getByText("$38")).toBeVisible();
    await expect(shopSection.getByText("$48")).toBeVisible();
    await expect(shopSection.getByText("Studio cotton")).toBeVisible();
    await expect(shopSection.getByText("Low stock")).toBeVisible();
    await expect(shopSection.getByText("Free ship over $75").first()).toBeVisible();
    await expect(shopSection.getByText("Joint-friendly grip")).toBeVisible();
    await expect(shopSection.getByText("Save $10")).toBeVisible();
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
    await expect(shopSection.locator(".merch-add")).toHaveCount(8);

    await expectNoHorizontalOverflow(page);
  });

  test("renders testimonials, coaching, journal, and newsletter sections", async ({
    page,
  }) => {
    await page.goto("/");

    const testimonialsSection = page.locator('[data-screen-label="Testimonials"]');
    await testimonialsSection.scrollIntoViewIfNeeded();
    await expect(testimonialsSection).toBeVisible();
    await expect(
      testimonialsSection.getByRole("heading", {
        level: 2,
        name: /Real people\. Real results\./,
      }),
    ).toBeVisible();
    await expect(testimonialsSection.locator(".test-card")).toHaveCount(3);
    await expect(
      testimonialsSection.locator('.test-card[data-featured="true"]'),
    ).toHaveCount(1);
    await expect(testimonialsSection.getByText("★★★★★")).toHaveCount(3);
    await expect(
      testimonialsSection.getByText(
        "I came to Jodi for the body. I stayed for the brain. Three years in I sleep better, lift heavier, and stress about food half as much.",
      ),
    ).toBeVisible();
    await expect(
      testimonialsSection.getByText(
        "Jodi got me back under a barbell at 54 and I'm stronger than I was at 30. Her plans are stupidly simple, which is the whole point.",
      ),
    ).toBeVisible();
    await expect(
      testimonialsSection.getByText(
        "Six other programs and a divorce later, this is the one that finally clicked. Nutrition felt boring before - now it's automatic.",
      ),
    ).toBeVisible();
    await expect(testimonialsSection.getByText("-28 lb")).toBeVisible();
    await expect(testimonialsSection.getByText("+14 lb")).toBeVisible();
    await expect(testimonialsSection.getByText("-42 lb")).toBeVisible();
    await expect(testimonialsSection.getByText("3 years")).toBeVisible();
    await expect(testimonialsSection.getByText("Strength after 50")).toBeVisible();
    await expect(testimonialsSection.getByText("Nutrition consistency")).toBeVisible();
    await expect(testimonialsSection.getByText("MR")).toBeVisible();
    await expect(testimonialsSection.getByText("DK")).toBeVisible();
    await expect(testimonialsSection.getByText("SP")).toBeVisible();
    await expect(testimonialsSection.getByText("Margaret R.")).toBeVisible();
    await expect(testimonialsSection.getByText("Daniel K.")).toBeVisible();
    await expect(testimonialsSection.getByText("Sasha P.")).toBeVisible();
    await expect(testimonialsSection.getByText("Realtor · client since 2023")).toBeVisible();
    await expect(testimonialsSection.getByText("Architect · client since 2022")).toBeVisible();
    await expect(testimonialsSection.getByText("Surgeon · client since 2021")).toBeVisible();
    await expectNoHorizontalOverflow(page);

    const coachingSection = page.locator("#coaching");
    await coachingSection.scrollIntoViewIfNeeded();
    await expect(coachingSection).toBeVisible();
    await expect(
      coachingSection.getByRole("heading", {
        level: 2,
        name: /Work directly with Jodi\./,
      }),
    ).toBeVisible();
    await expect(coachingSection.getByText("Weekly 1:1 video call")).toBeVisible();
    await expect(coachingSection.getByText("Sep 8, 2026 · 3 seats left")).toBeVisible();
    await expect(coachingSection.getByText("Private application")).toBeVisible();
    await expect(coachingSection.getByText("10-minute fit review")).toBeVisible();
    await expect(coachingSection.getByText("48-hour response")).toBeVisible();
    await expect(coachingSection.getByText("Limited to 8 clients")).toBeVisible();
    await expect(
      coachingSection.getByText("Apply for the next cohort"),
    ).toBeVisible();
    await expect(coachingSection.getByText("$2,400")).toBeVisible();
    await expect(coachingSection.getByLabel("Your name")).toBeVisible();
    await expect(coachingSection.getByLabel("Email")).toBeVisible();
    await expect(coachingSection.getByLabel("Phone")).toBeVisible();
    await expect(coachingSection.getByLabel("Main goal")).toBeVisible();
    await expect(
      coachingSection.getByLabel(
        "What do you want Jodi to know before the first call?",
      ),
    ).toBeVisible();
    await coachingSection.getByLabel("Your name").fill("Avery Client");
    await coachingSection.getByLabel("Email").fill("avery@example.com");
    await coachingSection.getByLabel("Phone").fill("+15551234567");
    await coachingSection
      .getByLabel("Main goal")
      .selectOption("Strength + longevity");
    await coachingSection
      .getByLabel("What do you want Jodi to know before the first call?")
      .fill("I want a sustainable strength plan around travel.");
    await coachingSection.getByRole("button", { name: /Apply for fall cohort/ }).click();
    await expect(
      coachingSection.getByText("Application received. Jodi's team will follow up."),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page);

    const journalSection = page.locator("#journal");
    await journalSection.scrollIntoViewIfNeeded();
    await expect(journalSection).toBeVisible();
    await expect(
      journalSection.getByRole("heading", {
        level: 2,
        name: /Field notes from the studio\./,
      }),
    ).toBeVisible();
    await expect(
      journalSection.getByRole("heading", {
        level: 3,
        name: "The only three lifts you actually need.",
      }),
    ).toBeVisible();
    await expect(
      journalSection.getByRole("heading", {
        level: 3,
        name: "Protein, in plain English.",
      }),
    ).toBeVisible();
    await expect(
      journalSection.getByRole("heading", {
        level: 3,
        name: "The sleep audit I run every Sunday.",
      }),
    ).toBeVisible();
    await expect(journalSection.getByText("Training")).toBeVisible();
    await expect(journalSection.getByText("06 min read")).toBeVisible();
    await expect(journalSection.locator(".post-card__deco")).toHaveCount(3);

    const newsletterSection = page.locator('[data-screen-label="Newsletter"]');
    await newsletterSection.scrollIntoViewIfNeeded();
    await expect(newsletterSection).toBeVisible();
    await expect(
      newsletterSection.getByRole("heading", {
        level: 2,
        name: /Get the Monday Note from Jodi\./,
      }),
    ).toBeVisible();
    await expect(newsletterSection.getByLabel("Email address")).toBeVisible();
    await expect(newsletterSection.getByText("Free forever")).toBeVisible();
    await expect(newsletterSection.getByText("Unsubscribe anytime")).toBeVisible();
    await expect(newsletterSection.getByText("Joined by 12,000+")).toBeVisible();
    await newsletterSection.getByLabel("Email address").fill("avery@example.com");
    await newsletterSection.getByRole("button", { name: "Subscribe" }).click();
    await expect(newsletterSection.getByRole("button", { name: "You're in" })).toBeVisible();
    await expect(newsletterSection.getByText("You're in.")).toBeVisible();

    await expectNoHorizontalOverflow(page);
  });

  test("renders footer, metadata, and public shell polish", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(
      "Jodi Stokes Fitness - Train. Lifestyle. Nutrition.",
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Sustainable fitness, smart nutrition, lifestyle coaching/,
    );
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#050605",
    );

    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toHaveAttribute("href", "#main-content");
    await expect(page.locator("main#main-content")).toBeVisible();

    const footer = page.locator('[data-screen-label="Footer"]');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
    await expect(
      footer.getByRole("link", { name: "Jodi Stokes Fitness home" }),
    ).toBeVisible();
    await expect(
      footer.getByText(
        "Sustainable fitness, smart nutrition, and a lifestyle you'll actually keep.",
      ),
    ).toBeVisible();

    for (const social of ["Instagram", "TikTok", "YouTube", "Spotify"]) {
      await expect(footer.getByRole("link", { name: social })).toHaveAttribute(
        "href",
        "#",
      );
    }

    for (const group of ["Shop", "Train", "Studio"]) {
      await expect(
        footer.getByRole("navigation", { name: group }).getByRole("heading", {
          name: group,
        }),
      ).toBeVisible();
    }

    await expect(footer.getByRole("link", { name: "Apparel" })).toHaveAttribute(
      "href",
      "#shop",
    );
    await expect(
      footer.getByRole("link", { name: "Strong Foundations" }),
    ).toHaveAttribute("href", "#programs");
    await expect(
      footer.getByRole("link", { name: "1:1 Coaching" }),
    ).toHaveAttribute("href", "#coaching");
    await expect(footer.getByRole("link", { name: "About Jodi" })).toHaveAttribute(
      "href",
      "#about",
    );

    const legal = footer.getByRole("navigation", { name: "Legal" });
    for (const link of ["Terms", "Privacy", "Returns", "Accessibility"]) {
      await expect(legal.getByRole("link", { name: link })).toHaveAttribute(
        "href",
        "#",
      );
    }
    await expect(
      footer.getByText("© 2026 Jodi Stokes Fitness. All rights reserved."),
    ).toBeVisible();

    const hashLinks = await page
      .locator('a[href^="#"]:not([href="#"])')
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute("href")).filter(Boolean),
      );
    for (const href of new Set(hashLinks)) {
      await expect(page.locator(href as string)).toHaveCount(1);
    }

    await expectNoHorizontalOverflow(page);
  });
});
