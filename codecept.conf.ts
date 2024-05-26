import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
require('./heal_recipes');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

// Configure dotenv with the specified path
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

// Use GROQ Sdk and Set the GROQ Api key
import {Groq} from 'groq-sdk';
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});


export const config = {
  tests: './tests/login_test.ts',
  output: './output',
  emptyOutputFolder: true,
  helpers: {
    Playwright: {
      url: 'https://github.com',
      show: true,
      browser: 'chromium',
      waitForNavigation: 'load',
      waitForTimeout: 30_000
    },
    CDPHelper: {
      require: './helpers/CDPHelper.ts'
    },
    // OpenAI: {
    //   chunkSize: 8000
    // },
    Expect: {},
    REST: {
      endpoint: 'https://reqres.in',
      timeout: 20_000
    },
  },
  include: {
    loginPage: './pages/Login.ts',
  },
  name: 'codeceptjs-playwright-fun',
  ai: {
      request: async (messages) => {
        const chatCompletion = await groq.chat.completions.create({
            messages,
            model: "mixtral-8x7b-32768"    // mixtral-8x7b-32768  llama2-70b-4096 || gemma-7b-it || llama3-70b-8192 || mixtral-8x7b-32768
        });
        return chatCompletion.choices[0]?.message?.content || "";
      }
    },

  plugins: {
    reportportal: {
      enabled: false,
      require: '@reportportal/agent-js-codecept',
      token: process.env.RP_TOKEN,
      endpoint: 'https://demo.reportportal.io/api/v1',
      launchName: 'selfhealing_TEST_EXAMPLE',
      projectName: 'selfhealing_personal'
    },
    heal: {
      enabled: true,
    },
    // ai: {
    //   request: async (messages) => {
    //     const chatCompletion = await groq.chat.completions.create({
    //         messages,
    //         model: "mixtral-8x7b-32768"    // mixtral-8x7b-32768  llama2-70b-4096 || gemma-7b-it || llama3-70b-8192 || mixtral-8x7b-32768
    //     });
    //     return chatCompletion.choices[0]?.message?.content || "";
    //   },
    //   model: 'mixtral-8x7b-32768',
    //   temperature: 0.1,
    //   html: {
    //     maxLength: 50000,
    //     simplify: true,
    //     minify: true,
    //     interactiveElements: [
    //       'a', 'input', 'button', 'select', 'textarea', 'option',
    //       'm-button', 'm-text-input', 'm-number-input', 'm-text-area',
    //       'm-form-multiselect', 'm-options-container', 'm-form-checkbox',
    //       'm-form-date-picker',
    //       'm-v2-form-field', 'm-v2-radio-button', 'm-v2-checkbox'
    //     ],
    //     textElements: ['label', 'h1', 'h2', 'm-v2-form-label'],
    //     allowedAttrs: [
    //       'id', 'for', 'class', 'name', 'type', 'value', 'tabindex', 'label', 'role',
    //       'data-test',
    //     ],
    //     allowedRoles: ['button', 'checkbox', 'search', 'textbox', 'tab'],
    //   },
    // },
    allure: {
      enabled: true,
      require: "allure-codeceptjs",
      outputDir: "./allure-results",
    },
    retryFailedStep: {
      enabled: false,
      retries: 3
    }
  }
}
