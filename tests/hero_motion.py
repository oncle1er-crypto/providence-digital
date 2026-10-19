"""Preview regression checks: python3 tests/hero_motion.py (requires Playwright)."""
import unittest
from playwright.sync_api import sync_playwright


class HeroMotionChecks(unittest.TestCase):
    def setUp(self):
        self.playwright = sync_playwright().start()
        self.browser = self.playwright.chromium.launch(headless=True)
        self.context = self.browser.new_context(viewport={"width": 1280, "height": 1800})
        self.page = self.context.new_page()
        self.errors = []
        self.page.on("pageerror", lambda error: self.errors.append(str(error)))

    def tearDown(self):
        self.browser.close()
        self.playwright.stop()

    def test_video_pause_resume_and_manual_slide(self):
        self.page.goto("http://localhost:8080", wait_until="domcontentloaded")
        self.page.wait_for_function("document.querySelector('video').currentTime > 0")
        video = self.page.locator("video").first
        controls = self.page.locator(".group.relative.mt-auto")
        controls.hover()
        self.page.get_by_role("button", name="Mettre en pause", exact=True).click()
        before = video.evaluate("v => v.currentTime")
        self.page.wait_for_timeout(400)
        self.assertAlmostEqual(before, video.evaluate("v => v.currentTime"), delta=0.1)
        self.page.get_by_role("button", name="Lire", exact=True).click()
        self.page.wait_for_timeout(400)
        self.assertGreater(video.evaluate("v => v.currentTime"), before)
        controls.hover()
        previous = self.page.locator("[data-hero-sequence]").get_attribute("data-hero-sequence")
        self.page.get_by_role("button", name="Afficher ").nth(1).click()
        self.assertNotEqual(previous, self.page.locator("[data-hero-sequence]").get_attribute("data-hero-sequence"))
        self.assertEqual([], self.errors)

    def test_reduced_motion_does_not_autoplay_or_rotate_slides(self):
        self.page.emulate_media(reduced_motion="reduce")
        self.page.goto("http://localhost:8080", wait_until="domcontentloaded")
        self.page.wait_for_timeout(1600)
        sequence = self.page.locator("[data-hero-sequence]").get_attribute("data-hero-sequence")
        self.assertTrue(self.page.locator("video").first.evaluate("v => v.paused"))
        self.page.wait_for_timeout(8500)
        self.assertEqual(sequence, self.page.locator("[data-hero-sequence]").get_attribute("data-hero-sequence"))
        self.assertEqual([], self.errors)


if __name__ == "__main__":
    unittest.main()