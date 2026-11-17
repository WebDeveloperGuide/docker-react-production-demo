import { expect, test } from '@playwright/test'

test('application loads successfully', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Docker React Production Demo')
})

test('main heading is visible', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: /from code to production/i }),
  ).toBeVisible()
})

test('all three delivery cards are visible', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Docker Containers' })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Continuous Integration' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Continuous Deployment' }),
  ).toBeVisible()
})

test('footer and repository link are visible', async ({ page }) => {
  await page.goto('/')

  const footer = page.getByRole('contentinfo')
  await expect(footer).toBeVisible()
  await expect(
    footer.getByRole('link', { name: /view on github/i }),
  ).toBeVisible()
})

test('health endpoint returns HTTP 200', async ({ request }) => {
  const response = await request.get('/healthz')

  expect(response.status()).toBe(200)
})
