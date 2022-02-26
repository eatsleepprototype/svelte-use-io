import { test, expect } from '@playwright/test';

const scrollUpAndDown = async () => {
	const d = 200;
	const ms = 10;
	let progress = 0;

	const wait = async (ms) =>
		new Promise((res) => {
			setTimeout(res, ms);
		});

	// scroll slowly otherwise the idEl isn't updated(?!)
	while (progress < document.body.scrollHeight) {
		progress += d;
		window.scrollTo(0, progress);
		await wait(ms);
	}

	while (progress > 0) {
		progress -= d;
		window.scrollTo(0, progress);
		await wait(ms);
	}
};

test('observe', async ({ page }) => {
	await page.goto('http://localhost:1234/test/basic');
	await page.reload();

	await page.evaluate(scrollUpAndDown);

	const sectionEls = page.locator('section.block');
	const currentIdEl = page.locator('[data-test-id-container]');
	const id = await currentIdEl.textContent();
	const currentSectionId = await sectionEls.first().textContent();
	expect(+id).toBe(1);
	expect(+currentSectionId).toBe(1);
});

test('observe once', async ({ page }) => {
	await page.goto('http://localhost:1234/test/once');
	await page.reload();

	const sectionEls = page.locator('section.block');
	const currentIdEl = page.locator('[data-test-id-container]');

	await page.evaluate(scrollUpAndDown);

	const id = await currentIdEl.textContent();
	const currentSectionId = await sectionEls.first().textContent();
	expect(+id).toBe(6);
	expect(+currentSectionId).toBe(1);
});
