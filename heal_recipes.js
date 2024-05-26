const { heal, ai } = require('codeceptjs');

heal.addRecipe('ai', {
  priority: 10,
  suggest: true,
  prepare: {
    html: ({ I }) => I.grabHTMLFrom('body'),
  },
  steps: [
    'click',
    'fillField',
    'appendField',
    'selectOption',
    'attachFile',
    'checkOption',
    'uncheckOption',
    'doubleClick',
  ],
  fn: async (context) => {
    return ai.healFailedStep(context);
  },
});