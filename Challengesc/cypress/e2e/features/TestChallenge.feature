Feature: duckduckgo.com
    Background:
        Given User visit front page

    @BDD @Cucumber @Feature @Gherkin
    Scenario: TC 1 |  Visit front page and search
        When User type on the search bar: Michael Jordan
        Then Should search Michael Jordan correctly
        Then Should displayed al least one wikipedia page result
        Then Should displayed al least one nba page result

    @BDD @Cucumber @Feature @Gherkin
    Scenario: TC 2 | Change terminal
        When User scroll down in hamburger button settings and select all settings option
        When User save and exit the change
        Then The background color change

    @BDD @Cucumber @Feature @Gherkin
    Scenario: TC 3 | Change language
        When User scroll down in hamburger button settings and select all settings option
        When User select Lingvo language
        Then The language page change
