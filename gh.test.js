let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub · Change is constant. GitHub keeps you ahead. · GitHub');
  }, 60000 );

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 20000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-mktg.btn-large-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 20000);
});

describe("Enterprise page tests", () => {
  beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/enterprise");
});

afterEach(() => {
  page.close();
});

test("Page title'", async () => {
    const title = await page.title();
    expect(title).toEqual('GitHub Enterprise · The AI-powered developer platform for the agent-ready enterprise · GitHub');
  }, 6000)

  test("Link Start a free 30-day trial", async () => {
    await page.click("text=Start a free 30-day trial");
    const actual = await page.title();
    expect(actual).toEqual('Sign in to GitHub');
  }, 6000)

  test("Link Contact sales", async () => {
    await page.click("section[class='Primer_Brand__ButtonGroup-module__ButtonGroup___YuqTd Primer_Brand__Hero-module__Hero-actions___RUotq FlexSuiteHero-module__heroActions__nlS9O'] span[class='Primer_Brand__Text-module__Text___XeGJJ Primer_Brand__Text-module__Text-font--mona-sans___a8XJD Primer_Brand__Text-module__Text--default___GhPh_ Primer_Brand__Text-module__Text--200____P1wy Primer_Brand__Text-module__Text--antialiased___TYoXS Primer_Brand__Text-module__Text--weight-medium___qJKf_ Primer_Brand__Button-module__Button--label___qrkyz Primer_Brand__Button-module__Button--label-medium___ClmeR Primer_Brand__Button-module__Button--label-secondary___eJ0_a']");
    const actual = await page.title();
    expect(actual).toEqual('Talk to our sales team');
  }, 6000)

})


