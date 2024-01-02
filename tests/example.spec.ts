// @ts-check

import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/mineTomek/)
})

test('blog button', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // Click the get started link.
  await page.getByRole('button', { name: 'Check the blog' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Newest posts:' })
  ).toBeVisible()
})

test('timeline button', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // Click the get started link.
  await page.getByRole('button', { name: 'Go to the project timeline' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Welcome to my project timeline!' })
  ).toBeVisible()
})
