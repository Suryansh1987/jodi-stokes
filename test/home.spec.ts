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

  test("uses hamburger navigation below 1200px", async ({ page }) => {
    await page.setViewportSize({ width: 1199, height: 900 });
    await page.goto("/");

    await expect(page.locator(".site-header__nav")).toBeHidden();
    await expect(page.locator(".site-header__cta")).toBeHidden();

    const menuButton = page.locator(".mobile-menu-button");
    const mobileDialog = page.locator(".mobile-nav");

    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await menuButton.click();

    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await expect(mobileDialog).toHaveAttribute("data-open", "true");
    await expect(mobileDialog).toHaveAttribute("aria-hidden", "false");

    await mobileDialog.getByRole("link", { name: "Journal" }).click();

    await expect(page).toHaveURL(/#journal$/);
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(mobileDialog).toHaveAttribute("data-open", "false");
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

  test("renders the Unstoppable You program", async ({ page }) => {
    await page.goto("/");

    const programsSection = page.locator("#programs");

    await programsSection.scrollIntoViewIfNeeded();
    await expect(programsSection).toBeVisible();
    await expect(
      programsSection.getByRole("heading", {
        level: 2,
        name: "Programs",
      }),
    ).toBeVisible();
    await expect(
      programsSection.getByRole("heading", { name: "Unstoppable You" }),
    ).toBeVisible();
    await expect(programsSection.getByRole("article")).toHaveCount(1);
    await expect(programsSection.getByText("1:1 Coaching")).toBeVisible();
    await expect(programsSection.getByText("Approximately $2,400")).toBeVisible();
    await expect(programsSection.getByText("8 virtual sessions")).toBeVisible();
    await expect(
      programsSection.getByText("Approximately 55 minutes per session"),
    ).toBeVisible();
    await expect(
      programsSection.getByText("Approximately 2 sessions per week"),
    ).toBeVisible();

    for (const inclusion of [
      "Members-only YouTube content",
      "Additional workout videos and workout homework",
      "Nutritional guidance and direction",
      "Measurements or weigh-ins",
    ]) {
      await expect(
        programsSection.getByText(inclusion, { exact: true }),
      ).toBeVisible();
    }

    const registerLink = programsSection.getByRole("link", { name: "Register" });
    await expect(registerLink).toHaveAttribute("href", "#program-registration");
    await registerLink.focus();
    await expect(registerLink).toBeFocused();
    await registerLink.click();
    await expect(page).toHaveURL(/#program-registration$/);
    await expect(page.locator("#program-registration")).toBeInViewport();

    for (const staleProgram of [
      "Strong Foundations",
      "Lean & Lifted",
      "The Reset",
      "Add to cart",
    ]) {
      await expect(
        programsSection.getByText(staleProgram, { exact: true }),
      ).toHaveCount(0);
    }

    await expectNoHorizontalOverflow(page);
  });

  test("renders a blocked program registration form", async ({ page }) => {
    await page.goto("/");

    const registrationSection = page.locator("#coaching");
    const registrationForm = page.locator("#program-registration");

    await registrationSection.scrollIntoViewIfNeeded();
    await expect(registrationSection).toBeVisible();
    await expect(
      registrationSection.getByRole("heading", { level: 2, name: "Register" }),
    ).toBeVisible();
    await expect(
      registrationSection.getByRole("heading", {
        level: 3,
        name: "Work directly with Jodi.",
      }),
    ).toBeVisible();
    await expect(
      registrationSection.getByText(
        "Formal signed paperwork is handled privately",
      ),
    ).toBeVisible();
    await expect(
      registrationSection.getByText("Medical disclosure is handled privately"),
    ).toBeVisible();

    const name = registrationForm.getByLabel("Full name");
    const email = registrationForm.getByLabel("Email");
    const phone = registrationForm.getByLabel("Phone");
    const program = registrationForm.getByLabel("Program");
    const message = registrationForm.getByLabel(
      "Message or fitness goals (optional)",
    );
    const agreement = registrationForm.getByLabel(
      "Agreement acknowledgement unavailable",
    );
    const honeypot = registrationForm.locator('[name="company"]');

    for (const requiredControl of [name, email, phone, program, agreement]) {
      await expect(requiredControl).toHaveAttribute("required", "");
      await expect(requiredControl).toBeDisabled();
    }
    await expect(message).not.toHaveAttribute("required", "");
    await expect(message).toBeDisabled();
    await expect(honeypot.locator("..")).toHaveClass(/sr-only/);
    await expect(honeypot.locator("..")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    await expect(honeypot).toHaveAttribute("tabindex", "-1");
    await expect(honeypot).toBeDisabled();
    await expect(name).toHaveAttribute("maxlength", "100");
    await expect(email).toHaveAttribute("maxlength", "254");
    await expect(phone).toHaveAttribute("maxlength", "40");
    await expect(message).toHaveAttribute("maxlength", "2000");
    await expect(program).toHaveValue("unstoppable-you");
    await expect(program.locator("option")).toHaveText(
      "Unstoppable You - 1:1 Coaching",
    );
    await expect(
      registrationForm.getByRole("button", { name: "Register" }),
    ).toBeDisabled();
    await expect(registrationForm.getByRole("status")).toHaveText(
      "Registration is unavailable until the client-approved agreement and waiver are ready to review.",
    );

    await expect(
      registrationForm.locator('[name*="medication" i]'),
    ).toHaveCount(0);
    await expect(registrationForm.locator('[name*="diagnos" i]')).toHaveCount(0);
    await expect(registrationForm.locator('[name*="injur" i]')).toHaveCount(0);
    await expect(
      registrationSection.getByText(/application received/i),
    ).toHaveCount(0);
    await expect(
      registrationSection.locator('input[type="date"]'),
    ).toHaveCount(0);
    await expect(
      registrationSection.locator('input[type="payment"]'),
    ).toHaveCount(0);
    const renderedHtml = await page.content();
    expect(renderedHtml).not.toContain("RESEND_API_KEY");
    expect(renderedHtml).not.toContain("REGISTRATION_EMAIL_FROM");
    await expectNoHorizontalOverflow(page);
  });

  test("renders only approved products without onsite commerce", async ({
    page,
  }) => {
    await page.goto("/");

    const productsSection = page.locator("#products");
    await productsSection.scrollIntoViewIfNeeded();
    await expect(productsSection).toBeVisible();

    await expect(
      productsSection.getByRole("heading", {
        level: 2,
        name: "Products",
      }),
    ).toBeVisible();

    for (const product of [
      "Water Exercise Book",
      "Lunch Bag",
      "Water Bottle",
      "Small Towel",
    ]) {
      await expect(
        productsSection.getByRole("heading", { level: 3, name: product }),
      ).toBeVisible();
    }

    await expect(productsSection.getByRole("article")).toHaveCount(4);
    await expect(productsSection.locator('[data-product-id="water-exercise-book"]')).toHaveClass(
      /product-featured/,
    );
    await expectImageLoaded(
      productsSection.getByRole("img", {
        name: "Water Exercise by Jodi Books-Stokes book cover",
      }),
    );
    await expect(
      productsSection.getByText("Purchase link unavailable", { exact: true }),
    ).toHaveCount(4);
    await expect(productsSection.getByRole("link")).toHaveCount(0);
    await expect(productsSection.getByRole("button")).toHaveCount(0);
    await expect(page.locator("#book")).toHaveCount(0);
    await expect(page.locator("#shop")).toHaveCount(0);

    for (const staleContent of [
      "That's It Tee - Bone",
      "Stainless Bottle 28oz",
      "Studio Mat - 6mm",
      "Studio Cap",
      "Strong For Life Crew",
      "Resistance Band Set",
      "90-Day Training Journal",
      "Studio Tote + Journal",
      "Low stock",
      "Add to cart",
    ]) {
      await expect(productsSection.getByText(staleContent, { exact: true })).toHaveCount(0);
    }

    await expectNoHorizontalOverflow(page);
  });

  test("renders testimonials, journal, and newsletter sections", async ({
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
    const carousel = testimonialsSection.getByRole("region", {
      name: "Testimonials",
    });
    await expect(carousel).toBeVisible();
    await expect(testimonialsSection.locator(".scroll-reel__featured")).toHaveCount(3);
    await expect(
      testimonialsSection.getByRole("button", { name: "Previous testimonial" }),
    ).toBeDisabled();
    await expect(
      carousel.locator(".scroll-reel__text").getByText(
        "I came to Jodi for the body. I stayed for the brain. Three years in I sleep better, lift heavier, and stress about food half as much.",
      ),
    ).toBeVisible();
    await expect(testimonialsSection.getByText("-28 lb")).toBeVisible();
    await expect(testimonialsSection.getByText("3 years")).toBeVisible();
    await expect(testimonialsSection.getByText("MR")).toBeVisible();
    await expect(
      carousel.locator(".scroll-reel__text").getByText("Margaret R."),
    ).toBeVisible();
    await expect(testimonialsSection.getByText("Realtor · client since 2023")).toBeVisible();

    const nextTestimonial = testimonialsSection.getByRole("button", {
      name: "Next testimonial",
    });
    await nextTestimonial.click();
    await expect(
      carousel.locator(".scroll-reel__text").getByText(
        "Jodi got me back under a barbell at 54 and I'm stronger than I was at 30. Her plans are stupidly simple, which is the whole point.",
      ),
    ).toBeVisible();
    await expect(
      carousel.locator(".scroll-reel__text").getByText("Daniel K."),
    ).toBeVisible();
    await expect(testimonialsSection.getByText("+14 lb")).toBeVisible();
    await expect(testimonialsSection.getByText("Strength after 50")).toBeVisible();
    await page.waitForTimeout(850);

    await nextTestimonial.click();
    await expect(
      carousel.locator(".scroll-reel__text").getByText(
        "Six other programs and a divorce later, this is the one that finally clicked. Nutrition felt boring before - now it's automatic.",
      ),
    ).toBeVisible();
    await expect(
      carousel.locator(".scroll-reel__text").getByText("Sasha P."),
    ).toBeVisible();
    await expect(testimonialsSection.getByText("-42 lb")).toBeVisible();
    await expect(testimonialsSection.getByText("Nutrition consistency")).toBeVisible();
    await expect(nextTestimonial).toBeDisabled();
    await expect(
      testimonialsSection.getByRole("button", { name: "Previous testimonial" }),
    ).toBeEnabled();
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
    await expect(journalSection.locator(".post-card")).toHaveCount(3);
    await expect(journalSection.getByText("Training")).toBeVisible();
    await expect(journalSection.getByText("Nutrition")).toBeVisible();
    await expect(journalSection.getByText("Lifestyle")).toBeVisible();
    await expect(journalSection.getByText("May 18")).toBeVisible();
    await expect(journalSection.getByText("May 11")).toBeVisible();
    await expect(journalSection.getByText("May 04")).toBeVisible();
    await expect(journalSection.getByText("04 min read")).toBeVisible();
    await expect(journalSection.getByText("06 min read")).toBeVisible();
    await expect(journalSection.getByText("05 min read")).toBeVisible();
    await expect(
      journalSection.getByText(
        "Why a hinge, a squat and a push will outperform 40 fancy variations - for the next 30 years.",
      ),
    ).toBeVisible();
    await expect(
      journalSection.getByText(
        "How much you actually need, how to hit it without an app, and why everyone's wrong about the upper limit.",
      ),
    ).toBeVisible();
    await expect(
      journalSection.getByText(
        "Ten questions, three minutes. The single highest-ROI habit I've ever taught a client.",
      ),
    ).toBeVisible();
    await expect(journalSection.getByText("Jodi Stokes").first()).toBeVisible();
    await expect(journalSection.getByText("Strength", { exact: true })).toBeVisible();
    await expect(journalSection.getByText("Protein", { exact: true })).toBeVisible();
    await expect(journalSection.getByText("Recovery", { exact: true })).toBeVisible();
    await expect(journalSection.getByRole("link", { name: "Read note" })).toHaveCount(3);
    for (const link of await journalSection.getByRole("link", { name: "Read note" }).all()) {
      await expect(link).toHaveAttribute("href", "#");
    }
    await expect(journalSection.locator(".post-card__deco")).toHaveCount(3);
    await expectNoHorizontalOverflow(page);

    const newsletterSection = page.locator('[data-screen-label="Newsletter"]');
    await newsletterSection.scrollIntoViewIfNeeded();
    await expect(newsletterSection).toBeVisible();
    await expect(
      newsletterSection.getByRole("heading", {
        level: 2,
        name: /Get the Monday Note from Jodi\./,
      }),
    ).toBeVisible();
    await expect(newsletterSection.locator(".newsletter-card")).toHaveCount(1);
    await expect(newsletterSection.locator(".subscribe")).toHaveCount(1);
    await expect(newsletterSection.locator(".newsletter-card__eyebrow")).toHaveText(
      "Monday Note",
    );
    await expect(newsletterSection.getByText("Workout, recipe, reset.")).toBeVisible();
    await expect(
      newsletterSection.getByText(
        "No spam. No launch funnels. Just the weekly note.",
      ),
    ).toBeVisible();
    const newsletterEmail = newsletterSection.getByLabel("Email address");
    await expect(newsletterEmail).toBeVisible();
    await expect(newsletterEmail).toHaveAttribute("type", "email");
    await expect(newsletterEmail).toHaveAttribute("required", "");
    await expect(newsletterSection.getByText("Free forever")).toBeVisible();
    await expect(newsletterSection.getByText("Unsubscribe anytime")).toBeVisible();
    await expect(newsletterSection.getByText("Joined by 12,000+")).toBeVisible();
    await newsletterEmail.fill("avery@example.com");
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
    await expect(footer.locator(".footer-large-name")).toHaveText(
      "Jodi Stokes Fitness",
    );
    await expect(footer.getByText("Train · Lifestyle · Nutrition")).toBeVisible();
    await expect(footer.locator(".socials a")).toHaveCount(4);
    await expect(footer.locator(".foot-col")).toHaveCount(3);

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
