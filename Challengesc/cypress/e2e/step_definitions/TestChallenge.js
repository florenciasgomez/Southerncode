import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let the;

before('Set data', () => {
    cy.fixture('data.json').then((data) => {
        the = data
    });
});

context('Feature: duckduckgo.com', () => {
    //background

    Given('User visit front page', () => {
        cy.visit('/')
        cy.url().should("contains", "duckduckgo")
    });

    describe('TC 1 |  Visit front page and search', () => {
        const input = "Michael Jordan";

        When('User type on the search bar: Michael Jordan', () => {
            cy.get(the.inputSearch).type(input)
        });

        Then('Should search Michael Jordan correctly', () => {
            cy.get(the.buttonSearch).click()
            cy.contains(input).should("contain", input)
        });

        Then('Should displayed al least one wikipedia page result', () => {
            cy.contains("Michael Jordan - Wikipedia").should("contain", "Wikipedia")
        });

        Then('Should displayed al least one nba page result', () => {
            cy.get(the.buttonMoreResult).click({ force: true })
            cy.contains('nba').should('exist')

        });

    });

    describe('TC 2 | Change terminal', () => {

        When('User scroll down in hamburger button settings and choose terminal theme option', () => {
            cy.get(the.buttonMenu).click()
            cy.contains('Themes').click()
            cy.get(the.buttonTerminal).click()
        });

        When('User save and exit the change', () => {
            cy.get(the.buttonSaveAndExit).click()
        });

        Then('The background color change', () => {
            cy.visit('/')
            cy.url().should("contains", "duckduckgo")
        });

    });

    describe('TC 3 | Change language', () => {

        When('User scroll down in hamburger button settings and select all settings option', () => {
            cy.get(the.buttonMenu).click()
            cy.contains("All Settings").click()
        });

        When('User select Lingvo language', () => {
            cy.get(the.buttonLanguage).select('lv_LV')
        });

        Then('The language page change', () => {
            cy.visit('/')
            cy.url().should("contains", "duckduckgo")
        });

    });
});




// Comando predeterminado para que no ocurran errores de excepciones:
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

// Comando predeterminado para que no aparezcan los Fetch en el log del Test Runner:
const origLog = Cypress.log;

Cypress.log = function (opts, ...other) {
    if (opts.displayName === 'xhr' || opts.displayName === 'fetch' && opts.url.startsWith('https://')) {
        return
    };
    return origLog(opts, ...other);
};


