///<reference types = "cypress"/>

import User from '../../fixtures/user.json'

const { After, } = require("cypress-cucumber-preprocessor/steps")

After(() => {
    cy.deleteAllCards(User)
    cy.clearCookies()
})

Given(/^that the user has a Trello account$/, () => {
    return true;
});

Given(/^he has a card created$/, () => {
    cy.createCard(User)
});

Then(/^want to delete the card$/, () => {
});

When(/^the user makes a request to delete the card on board "([^"]*)"$/, (board) => {
    cy.request({
        method: 'GET',
        url: `/1/boards/${board}/cards?key=${User.key}&token=${User.token}`,
        failOnStatusCode: false
    }).then(res => {
        cy.request({
            method: 'DELETE',
            url: `/1/cards/${res.body[0].id}?key=${User.key}&token=${User.token}`,
            failOnStatusCode: false
        }).as('response')
    })
});

Then("the request must return status code {int}", (status) => {
    cy.get('@response').then(res => {
        expect(res.status).to.be.equal(status)
    })
});

