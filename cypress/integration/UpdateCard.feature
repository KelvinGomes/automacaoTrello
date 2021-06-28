Feature: Update Card

    As a user, I want to update the card data in order to correct possible inconsistencies

Scenario Outline: update a card <flow>
    Given that the user has a Trello account
    And he has a card created
    And  want to update the card
    When the user makes a request to update the card on board "<board>"
    Then the request must return status code <code>
    And card information must be consistent on the user's board 

Examples: 
|flow                    |code | board                  |
|with sucess             |200  |60d753e3227b3622652dda85|
|that does not exist     |400  |4fds8fsdf78d7sf4sd665455|