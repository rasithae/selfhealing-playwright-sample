const { I, loginPage} = inject();

Feature('login @S613f7ff0');

Before(async () => {
    //Add any before test logic here
})

Scenario('Github Login - Incorrect username or password. @T7022f418', () => {
    I.amOnPage('/login');
    I.fillField(loginPage.gitHub.usernameTxt, 'rasitha.test@assurity.co.nz');
    I.fillField(loginPage.gitHub.passwordTxt, secret('123456'));
    I.click(loginPage.gitHub.signInBtn);
    I.see('Incorrect username or password.', '.flash-error');
});

Scenario('Assurity Sample Page Login @T69fa0a3f', () => {
    I.amOnPage('https://jesrellf.github.io/SelfHealingSample/')
    I.fillField(loginPage.assurityLogin.usernameTxt, 'user');
    I.fillField(loginPage.assurityLogin.passwordTxt, 'password');
    I.click(loginPage.assurityLogin.loginBtn);
    I.see('CRUD Table');
  });
