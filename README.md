# Summary

Transform Linkedin in private API to execute automated action that a human would do.

# Business case

As a sale man, I want to connect with a selected linkedin profile with a custom message. Three days later, I check if this connection is accepted or not. If yes, I send a follow-up message. If not, I send an email

# API
Authorization: Basic token 

Endpoint: http://localhost/linkedin/connection-request

Input:
- Cookie Linkedin from who the connection request will be send
- Linkedin url to which I want to connect with
- Custom message

Output:
- CONNECTION_REQUEST_PENDING
- ONLY_FOLLOW_BUTTON
- ONLY_MESSAGE_BUTTON
- CONNECTION_REQUEST_SUCCESS

## Linkedin behavior to verify
- Is the sender already in contact with the receiver
- Case when the "pending" status is present (already added)
- Case when you need to use the (...) button before and add them from there
- Case when this people have only the message button visible (already connected with)
- Case when this people have only the follow button visible

Similar script: https://github.com/RobinHerzog/api-store/blob/master/store/LinkedIn%20Network%20Booster/LinkedIn%20Network%20Booster.js
