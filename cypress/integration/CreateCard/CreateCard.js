///<reference types = "cypress"/>

import User from '../../fixtures/user.json'

const { After } = require("cypress-cucumber-preprocessor/steps")

After(() => {
    cy.deleteAllCards(User)
    cy.clearCookies()
})

Given(/^that the user has a Trello account$/, () => {
});

Given(/^want to create a new card$/, () => {
});

When(/^the user makes a create card request informing the list "([^"]*)"$/, (idList)=> {
    User.list = idList

    cy.request({
        method: 'POST',
        url: `/1/cards?key=${User.key}&token=${User.token}&idList=${User.list}`,
        body: {
            name: `${User.card.name}`,
            desc: `${User.card.desc}`,
            pos: `${User.card.pos}`,
            due: `${User.card.due}`,
            idMembers: [`${User.IdMember}`],
            dueComplete: `${User.card.dueComplete}`,
            idLabels: [`${User.card.idLabel}`]
        },
        failOnStatusCode: false
    }).as('response')
});

Then("the request must return status code {int}", (status) => {
    cy.get('@response').then(res => {
        expect(res.status).to.be.equal(status)
    })
});

Then(/^card information must be consistent on the user's board "([^"]*)"$/, (Board) => {
    cy.get('@response').then(res => {
        if (res.status == 200) {
            cy.request({
                method: 'GET',
                url: `/1/boards/${Board}/cards?key=${User.key}&token=${User.token}`,
                failOnStatusCode: false
            }).then(res => {
                cy.request({
                    method: 'GET',
                    url: `/1/cards/${res.body[0].id}?key=${User.key}&token=${User.token}&idList=${User.list}`,
                    failOnStatusCode: false
                }).as('response')
    
                cy.get('@response').then(res => {
                    expect(res.status).to.be.equal(200)
                    expect(res.body.name).to.be.equal(`${User.card.name}`)
                    expect(res.body.desc).to.be.equal(`${User.card.desc}`)
                })
            })
        }
    })
});


