///<reference types = "cypress"/>

Given(/^that the user has a Trello account$/, () => {
});

Given(/^want to perform an authentication$/, () => {
});


When(/^the user makes an authentication request informing a valid key "([^"]*)" and token "([^"]*)"$/, (key, token) => {
	cy.request({
		method: 'GET',
		url: `/1/members/me?key=${key}&token=${token}`,
		failOnStatusCode: false
	}).as('response')
});

Then("the authentication must return status code {int}", (status) => {
	cy.get('@response').then(res => {
		expect(res.status).to.be.equal(status)
	})
});


Then(/^the API should return the id "([^"]*)" and name "([^"]*)" of the user account$/, (id, name) => {
	cy.get('@response').then(res => {
		if(res.status == 200){
			expect(res.body.id).to.be.equal(id)
			expect(res.body.fullName).to.be.equal(name)
		}
	})
});




