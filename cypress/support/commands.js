Cypress.Commands.add('deleteAllCards', (user) => {
    cy.request({
        method: 'GET',
        url: `/1/boards/${user.idBoard}/cards?key=${user.key}&token=${user.token}`
    }).then(res => {
        var cards = res.body
        cards.forEach(card => {
            cy.request({
                method: 'DELETE',
                url: `/1/cards/${card.id}?key=${user.key}&token=${user.token}`,
            }).its('status').should('to.be.equal', 200)
        });
    })
})

Cypress.Commands.add('createCard', (user) => {
    cy.request({
        method: 'POST',
        url: `/1/cards?key=${user.key}&token=${user.token}&idList=${user.idList}`,
        body: {
            name: `${user.card.name}`,
            desc: `${user.card.desc}`,
            pos: `${user.card.pos}`,
            due: `${user.card.due}`,
            idMembers: [`${user.IdMember}`],
            dueComplete: `${user.card.dueComplete}`,
            idLabels: [`${user.card.idLabel}`]
        }
    })
})