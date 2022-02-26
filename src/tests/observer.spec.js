import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
	await page.goto('http://localhost:1234');
	await page.reload();

	const sectionEls = page.locator('section.block');
	const currentIdEl = page.locator('[data-test-id-container]');
	
	await page.evaluate(async () => {
		const d = 800;
		let progress = 0;
		const wait = async (ms) =>
			new Promise((res) => {
				setTimeout(res, ms);
			});

		// scroll slowly otherwise the idEl isn't updated(?!)
		while (progress < document.body.scrollHeight) {
			progress += d;
			window.scrollTo(0, progress);
			await wait(100);
		}
	});

	const id = await currentIdEl.textContent();
	const currentSectionId = await sectionEls.last().textContent();
	expect(+id).toBe(6);
	expect(+currentSectionId).toBe(6);
});
