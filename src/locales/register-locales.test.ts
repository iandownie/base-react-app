import manifest from "./manifest";
import registerLocales from "./register-locales";

jest.mock("counterpart");
const registerSpy = jest.fn();
const translate = require("counterpart");
translate.registerTranslations = registerSpy;

describe.skip("registerLocales", () => {
  it("should iterate over an array of locales, and register them", () => {
    registerLocales([manifest[0]]);
    expect(registerSpy).toHaveBeenCalledWith(
      manifest[0].locale,
      manifest[0].messages
    );
  });
});
