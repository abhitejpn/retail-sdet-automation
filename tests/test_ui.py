from pages.retail_page import RetailPage


def test_landing_page_loads(page):
    retail = RetailPage(page)
    retail.open()
    page.get_by_text("Shop simply.").is_visible()


def test_product_catalog_loads(page):
    retail = RetailPage(page)
    retail.open()
    page.get_by_role("button", name="Products").click()
    retail.expect_product_visible("Wireless Mouse")
    retail.expect_product_visible("Mechanical Keyboard")


def test_search_filters_products(page):
    retail = RetailPage(page)
    retail.open()
    page.get_by_role("button", name="Products").click()
    retail.search_for("Mouse")
    retail.expect_product_visible("Wireless Mouse")
    assert retail.products.count() == 1


def test_add_product_updates_cart(page):
    retail = RetailPage(page)
    retail.open()
    page.get_by_role("button", name="Products").click()
    retail.add_product("Wireless Mouse")
    retail.expect_cart_count(1)


def test_admin_login_and_dashboard(page):
    retail = RetailPage(page)
    retail.open()
    page.get_by_role("button", name="Login").click()
    page.get_by_label("Username").fill("admin")
    page.get_by_label("Password").fill("admin123")
    page.get_by_role("button", name="Login").click()
    page.get_by_text("Manage your catalog").is_visible()


def test_user_login(page):
    retail = RetailPage(page)
    retail.open()
    page.get_by_role("button", name="Login").click()
    page.get_by_label("Username").fill("user")
    page.get_by_label("Password").fill("user123")
    page.get_by_role("button", name="Login").click()
    page.get_by_role("heading", name="Product catalog").is_visible()
