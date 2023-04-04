
import { test, expect } from '@playwright/test';
import FirstPage from './models/first.page.js';

test.describe('The Flock App Functionality', () => {
  /** @type {FirstPage} */
  let firstPage;

  test.beforeEach(async ({ page }) => {
    firstPage = new FirstPage(page);
    await firstPage.navigate();
  });

  // tests

  test('Home page: Should land on correct page', async () => {
    await expect(firstPage.page).toHaveURL('https://the-flock.vercel.app/home');
  });

  test('Home page: Should be able to render ui elements', async () => {
    await expect(firstPage.calcInput).toBeVisible();
    await expect(firstPage.todoInput).toBeVisible();
    await expect(firstPage.counterTitle).toBeVisible();
  });

  test('Home page: Should be able to add 2 numbers correctly', async () => {
    const expectedCalcValue = '4';
    await firstPage.sumNumbers('2+2');
    const actualCalcValue = await firstPage.calcInput.inputValue();
    // console.log(actualCalcValue);
    expect(actualCalcValue).toEqual(expectedCalcValue);
  });

  test('Home page: Should not accept invalid input', async () => {
    const expectedCalcValue = '0';
    await firstPage.sumNumbers('text+text');
    const actualCalcValue = await firstPage.calcInput.inputValue();  
    expect(expectedCalcValue).toEqual(actualCalcValue);
  });

  test('Home page: Operand is missing', async () => {
    const expectedCalcValue = 'NaN';
    await firstPage.sumNumbers('6+');
    const actualCalcValue = await firstPage.calcInput.inputValue();  
    expect(expectedCalcValue).toEqual(actualCalcValue);
  });

  test('Home page: Division by zero', async () => {
    const expectedCalcValue = 'Infinity';
    await firstPage.sumNumbers('15/0');
    const actualCalcValue = await firstPage.calcInput.inputValue();  
    expect(expectedCalcValue).toEqual(actualCalcValue);
  });

  test('Home page: Should be able to add and remove todo checkbox', async () => {
    await firstPage.addCheckListItem('addition');
    await expect(firstPage.firstCheckBox).not.toBeChecked();
    await expect(firstPage.page.locator('text="addition"')).toBeVisible();
    await firstPage.checkItem();
    await expect(firstPage.firstCheckBox).not.toBeVisible();
  });

  test('Home page: Should be able to add empty checkbox with no label', async () => {
    await firstPage.addCheckListItem('');
    await expect(firstPage.firstCheckBox).toBeVisible();
  });


  test('Home page: Should be able to correctly imcrement and decrement numbers', async () => {
    await firstPage.clickToIncrementCounter();
    await expect(firstPage.page.locator('text="1"')).toBeVisible();
    await firstPage.clickToDecrementCounter();
    await expect(firstPage.page.locator('text="0"')).toBeVisible();
    await firstPage.clickToDecrementCounter();
    await expect(firstPage.page.locator('text="-1"')).toBeVisible();
  });

});
