const originalModule = jest.requireActual('bem-css-modules');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bemCSSModules = jest.createMockFromModule<any>('bem-css-modules');

bemCSSModules.default = (styles: unknown) =>
  originalModule.default(styles, 'test-class');

module.exports = bemCSSModules;
