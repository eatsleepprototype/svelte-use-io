import { test, expect } from '@playwright/test';

const scrollUpAndDown = async () => {
	const d = 200;
	const ms = 10;
	let progress = 0;

	const wait = async (ms) =>
		new Promise((res) => {
			setTimeout(res, ms);
		});

	const actions = window['actions'] || [];

	// scroll slowly otherwise the idEl isn't updated(?!)
	for (const direction of actions) {
		if (direction === 'up') {
			while (progress < document.body.scrollHeight) {
				progress += d;
				window.scrollTo(0, progress);
				await wait(ms);
			}
		}
		if (direction === 'down') {
			while (progress > 0) {
				progress -= d;
				window.scrollTo(0, progress);
				await wait(ms);
			}
		}
		actions.unshift();
	}
};

test('observe once', async ({ page }) => {
	await page.goto('http://localhost:1234/test/once');

	const sectionEls = page.locator('section.block');
	const currentIdEl = page.locator('[data-test-id-container]');

	await page.evaluate(() => {
		window['actions'] = ['up', 'down'];
	});
	await page.evaluate(scrollUpAndDown);

	const id = await currentIdEl.textContent();
	const currentSectionId = await sectionEls.first().textContent();
	expect(+id).toBe(6);
	expect(+currentSectionId).toBe(1);
	await page.reload();
});

test('observe once / reenable', async ({ page }) => {
	await page.goto('http://localhost:1234/test/once');

	const sectionEls = page.locator('section.block');
	const currentIdEl = page.locator('[data-test-id-container]');

	await page.evaluate(() => {
		window['actions'] = ['up', 'down'];
	});
	await page.evaluate(scrollUpAndDown);

	const button = page.locator('button[data-test-id="btn-once"]');
	await button.click();

	await page.evaluate(() => {
		window['actions'] = ['up'];
	});
	await page.evaluate(scrollUpAndDown);

	const id = await currentIdEl.textContent();
	const currentSectionId = await sectionEls.last().textContent();
	expect(+id).toBe(6);
	expect(+currentSectionId).toBe(6);
	await page.reload();
});
