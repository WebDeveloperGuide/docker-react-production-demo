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

test('deployment verification section shows the build commit and links', async ({ page }) => {
  await page.goto('/')

  const section = page.getByRole('region', { name: 'Verify this deployment' })
  await expect(section.getByText('Build commit')).toBeVisible()
  await expect(section.locator('code')).not.toBeEmpty()
  await expect(section.getByRole('link', { name: 'View GitHub Actions' })).toHaveAttribute(
    'href',
    'https://github.com/WebDeveloperGuide/docker-react-production-demo/actions',
  )
  await expect(section.getByRole('link', { name: 'Check health endpoint' })).toHaveAttribute(
    'href',
    '/healthz',
  )
})

test('health endpoint returns HTTP 200', async ({ request }) => {
  const response = await request.get('/healthz')

  expect(response.status()).toBe(200)
})
