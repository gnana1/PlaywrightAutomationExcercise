import { expect } from '@playwright/test';


class FirstPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

 // locators
    this.calcTitle = page.locator('h3', {hasText: 'Calculator'});
    this.todoTitle = page.locator('h3', { hasText: 'Todo' });
    this.counterTitle = page.locator('h3', { hasText: 'Counter' });
    this.calcInput = page.locator('input[type="text"]');
    this.todoInput = page.locator('input >> nth=1');
    this.firstCheckBox = page.locator('input[type="checkbox"] >>nth=0');
    this.counterPlusBtn = page.locator('text="+"');
    this.counterMinusBtn = page.locator('text="-"');
    
  }

  async sumNumbers(input) {
    await expect(this.calcInput).toBeVisible();
    await this.calcInput.fill(input);
    await this.calcInput.press('Enter');
  }

  async addCheckListItem(checkboxInput) {
    await this.todoInput.fill(checkboxInput);
    await this.todoInput.press('Enter');
  }

  async checkItem(){
    await this.firstCheckBox.click();
  }

  async clickToIncrementCounter() {
    await expect(this.counterPlusBtn).toBeVisible();
    await this.counterPlusBtn.click();
  }

  async clickToDecrementCounter() {
    await expect(this.counterMinusBtn).toBeVisible();
    await this.counterMinusBtn.click();
  }

  async navigate() {
    await this.page.goto('https://the-flock.vercel.app/home'); //can be used instead of the super navigate method defined in BasePage.
  }

}

  export default FirstPage;
