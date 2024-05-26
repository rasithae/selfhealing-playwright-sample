const { I, loginPage} = inject();

Feature('login');

Before(async () => {
    //Add any before test logic here
})

Scenario('Github Login - Incorrect username or password.', () => {
    I.amOnPage('/login');
    I.fillField(loginPage.gitHub.usernameTxt, 'rasitha.test@assurity.co.nz');
    I.fillField(loginPage.gitHub.passwordTxt, secret('123456'));
    I.click(loginPage.gitHub.signInBtn);
    I.see('Incorrect username or password.', '.flash-error');
});

Scenario('Assurity Sample Page Login', () => {
    I.amOnPage('https://selfhealingtestsample1.on.drv.tw/www.self-healing.test/')
    I.fillField(loginPage.assurityLogin.usernameTxt, 'user');
    I.fillField(loginPage.assurityLogin.passwordTxt, 'password');
    I.click(loginPage.assurityLogin.loginBtn);
    I.see('You are logged in!');
  });