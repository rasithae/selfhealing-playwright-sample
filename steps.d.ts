/// <reference types='codeceptjs' />
// @ts-ignore

type loginPage = typeof import('./pages/Login');
type CDPHelper = import('./helpers/CDPHelper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, loginPage: loginPage }
  interface Methods extends Playwright, CDPHelper, OpenAI, REST {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
