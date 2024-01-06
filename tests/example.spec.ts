// @ts-check

import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/mineTomek/)
})

test('blog button', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Check the blog' }).click()

  await expect(page).toHaveURL('/blog')

   await expect(
     page.getByRole('heading', { name: 'Blog' })
   ).toBeVisible()
})

test('timeline button', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Go to the project timeline' }).click()

  await expect(page).toHaveURL('/timeline')

  await expect(
    page.getByRole('heading', { name: 'Welcome to my project timeline!' })
  ).toBeVisible()
})
