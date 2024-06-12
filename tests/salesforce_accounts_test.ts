const { I, loginPage} = inject();
import { faker } from '@faker-js/faker';

Feature('login @S613f7ff0');

Before(async () => {
    //Add any before test logic here
})

function loginToSalesforce() {
    I.amOnPage('https://assurity3-dev-ed.develop.my.salesforce.com/')
    I.fillField('username','rasitha.ekanayake@assurity.co.nz')
    I.fillField({id:'passwordXXX'}, process.env.SALESFORCEPW)
    I.click('Login')
}

Scenario.only('Fill Accounts',()=>{
    
    loginToSalesforce();
    I.waitForVisible('button[aria-label="Search"]');
    I.click('button[aria-label="Search"]');
    I.wait(3);

    I.fillField('//input[contains(@placeholder,"Search")]', 'Accounts');
    I.click('//span[@title="All Accounts"]');
    I.waitForElement("//a[@title='New']");
    I.click({xpath:"//a[@title='New']"});

    I.waitForElement("//h2[text()='New Account']");
    I.fillField('Name', faker.company.name());
    I.fillField('Phone',faker.string.numeric(10));
    I.fillField('AccountNumber', 'A0000123');
    I.fillField('Website', "www.google.com");
    I.fillField('street', faker.location.streetAddress());

    I.click('SaveEdit');
    //pause()
  })

