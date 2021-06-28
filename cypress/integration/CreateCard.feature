Feature: Create Card

    As a user, I want to create a new card to describe my tasks

Scenario Outline: create a new card <flow>
    Given that the user has a Trello account
    And  want to create a new card
    When the user makes a create card request informing the list "<list>"
    Then the request must return status code <code>
    And card information must be consistent on the user's board "<board>"

Examples: 
|flow                    |list                    |code | board                  |
|with sucess sucess      |60d753e3227b3622652dda86|200  |60d753e3227b3622652dda85|
|with invalid list       |60d753e3227b362dfdfg4545|400  |60d753e3227b3622652dda85|
|without list            |                        |400  |60d753e3227b3622652dda85|
