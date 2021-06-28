Feature: Authorization

    As a user, I want to authenticate myself to the system
    to access my registration data

Scenario Outline: Validate user authentication <flow>
    Given that the user has a Trello account
    And  want to perform an authentication
    When the user makes an authentication request informing a valid key "<key>" and token "<token>"
    Then the authentication must return status code <code>
    And the API should return the id "<id>" and name "<name>" of the user account

Examples: 
|flow                       |key                             |token                                                           |code |id                      |name         |
|with sucess                |73b4f20d4ee8546b5f6408d93ee617b9|055ea11c531cabef3095cdbacad97aedec62ecdc3b1c2c5e23e3572f3a52096f|200  |60d753486bf0540491b6ed92|Kelvin Gomes |
|with invalid key           |73b4f20d4ee8546b5f6408d93ee61714|055ea11c531cabef3095cdbacad97aedec62ecdc3b1c2c5e23e3572f3a52096f|401  |                        |             |
|with invalid token         |73b4f20d4ee8546b5f6408d93ee617b9|055ea11c531cabef3095cdbacad97aedec62ecdc3b1c2c5e23e3572f3a520989|401  |                        |             |
|with invalid key and token |73b4f20d4ee8546b5f6408d93ee61774|055ea11c531cabef3095cdbacad97aedec62ecdc3b1c2c5e23e3572f3a520989|401  |                        |             |
|without key and token      |                                |                                                                |400  |                        |             |