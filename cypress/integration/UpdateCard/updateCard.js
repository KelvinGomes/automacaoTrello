///<reference types = "cypress"/>

import User from '../../fixtures/user.json'

const { After } = require("cypress-cucumber-preprocessor/steps")

After(() => {
    cy.deleteAllCards(User)
    cy.clearCookies()
})

Given(/^that the user has a Trello account$/, () => {
});

Given(/^he has a card created$/, () => {
    cy.createCard(User)
});


Given(/^want to update the card$/, () => {
});


When(/^the user makes a request to update the card on board "([^"]*)"$/, (board) => {

    cy.request({
        method: 'GET',
        url: `/1/boards/${board}/cards?key=${User.key}&token=${User.token}`,
        failOnStatusCode: false
    }).then(res => {
        cy.request({
            method: 'GET',
            url: `/1/cards/${res.body[0].id}?key=${User.key}&token=${User.token}&idList=${User.idList}`,
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            if(res.status == 200){
                cy.request({
                    method: 'PUT',
                    url: `/1/cards/${res.body.id}?key=${User.key}&token=${User.token}`,
                    body: {
                        name: `${User.updateCard.name}`,
                        desc: `${User.updateCard.desc}`,
                        pos: `${User.updateCard.pos}`,
                        due: `${User.updateCard.due}`,
                        idMembers: [`${User.IdMember}`],
                        dueComplete: `${User.updateCard.dueComplete}`,
                        idLabels: [`${User.updateCard.idLabel}`]
                    },
                    failOnStatusCode: false
                }).as('response')
            }
        })
    })
});

Then("the request must return status code {int}", (status) => {
    cy.get('@response').then(res => {
        expect(res.status).to.be.equal(status)
    })
});


Then(/^card information must be consistent on the user's board$/, () => {
    cy.get('@response').then(res => {
        if (res.status == 200) {
            cy.get('@response').then(res => {
                expect(res.body.name).to.be.equal(`${User.updateCard.name}`)
                expect(res.body.desc).to.be.equal(`${User.updateCard.desc}`)
            })
        }
    })
});

