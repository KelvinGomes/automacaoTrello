Feature: Delete Card

    As a user, I want to delete a card to keep my board free from errors

Scenario Outline: delete a card <flow>
    Given that the user has a Trello account
    And he has a card created 
    And  want to delete the card
    When the user makes a request to delete the card on board "<board>"
    Then the request must return status code <code>

Examples: 
|flow                  |code | board                  |
|with sucess sucess    |200  |60d753e3227b3622652dda85|
|that does not exist   |400  |4fds8fsdf78d7sf4sd665455|
