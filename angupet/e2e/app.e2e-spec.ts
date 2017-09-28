import { AngupetPage } from './app.po';

describe('angupet App', () => {
  let page: AngupetPage;

  beforeEach(() => {
    page = new AngupetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
