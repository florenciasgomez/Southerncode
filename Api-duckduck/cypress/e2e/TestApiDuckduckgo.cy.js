/// <reference types="cypress"/>

describe('Test Challange API DuckDuckGo', () => {

    const url = '/';
    const engine = 'duckduckgo';
    const q1 = 'dogs';
    const q2 = 'dogcoin'
    const key = 'a7838ec6f0d6892f49ba404bb882b6ec861eca20561492ff24600a2f37fd6ef5';

    it('Search for dogs and print a list of all images retrieved', () => {
        cy.api({
            url: url,
            qs: {
                engine: engine,
                q: q1,
                key: key
            }
        }).then((response) => {
            expect(response.status).equal(200);
            expect(response.body.search_parameters.engine).equal(engine);
            expect(response.body.search_parameters.q).equal(q1);
            const images = response.body.inline_images.map(element => element.image)
            cy.log(images)
        });
    });
    it('Search for dogcoins and print a list of all urls', () => {
        cy.api({
            url: url,
            qs: {
                engine: engine,
                q: q2,
                key: key
            }
        }).then((response) => {
            expect(response.status).equal(200);
            expect(response.body.search_parameters.engine).equal(engine);
            expect(response.body.search_parameters.q).equal(q2);
            const links = response.body.organic_results.map(element => element.link)
            cy.log(links)
        });
    });
});
