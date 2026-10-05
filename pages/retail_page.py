from playwright.sync_api import Page, expect


class RetailPage:
    def __init__(self, page: Page):
        self.page = page
        self.products = page.locator(".product-card")

    def open(self):
        self.page.goto("http://localhost:5173")
        self.page.wait_for_load_state("networkidle")

    def search_for(self, text):
        self.page.get_by_label("Search products").fill(text)

    def expect_product_visible(self, name):
        expect(self.page.get_by_role("heading", name=name)).to_be_visible()

    def add_product(self, name):
        self.page.get_by_role("button", name=f"Add {name} to cart").click()

    def expect_cart_count(self, count):
        expect(self.page.locator("#cart-count")).to_have_text(str(count))
