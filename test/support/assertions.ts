import { expect, type Locator, type Page } from "@playwright/test";

type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export async function expectImageLoaded(image: Locator) {
  await expect(image).toBeVisible();
  await expect
    .poll(
      async () =>
        image.evaluate((element) => {
          const imageElement = element as HTMLImageElement;

          return imageElement.complete && imageElement.naturalWidth > 0;
        }),
      { message: "image should be loaded with a natural width" },
    )
    .toBe(true);
}

export async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(
      async () =>
        page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth + 1,
        ),
      { message: "document should not create horizontal overflow" },
    )
    .toBe(true);
}

export async function expectNotOverlapping(first: Locator, second: Locator) {
  const [firstBox, secondBox] = await Promise.all([
    first.boundingBox(),
    second.boundingBox(),
  ]);

  expect(firstBox, "first element should have a rendered box").not.toBeNull();
  expect(secondBox, "second element should have a rendered box").not.toBeNull();
  expect(
    boxesOverlap(firstBox as Box, secondBox as Box),
    "elements should not overlap",
  ).toBe(false);
}

function boxesOverlap(first: Box, second: Box) {
  return !(
    first.x + first.width <= second.x ||
    second.x + second.width <= first.x ||
    first.y + first.height <= second.y ||
    second.y + second.height <= first.y
  );
}
