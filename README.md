# Pupper Playdate Finder

This is going to be an app similar to Tinder, except for dog parents trying to find friends for their pets. The parents will create a profile for their pet with pictures and a bio. Then they will have a feed that will pull up nearby pets that might be a good match for their pet. If they like some one they will have the option to like them and send them a message. Parents will have the option to answer or decline messages they receive. The app will only use appropriate locations.

## Domain Driven Design

### Domain Events
- account created
- account deleted
- account updated
- profile picture uploaded
- profile picture deleted
- liked other user
- disliked other user
- message sent
- message deleted
- chat declined
- chat accepted
- user logged in
- user logged out
- feed updated

### Domain Commands
- Create account
- Delete account
- Update bio
- Upload profile picture(s)
- Delete profile picture(s)
- Like other user
- Dislike other user
- Accept chat 
- Decline chat
- Send a message
- Delete a message
- Login
- Logout

### Entities
#### user
- id
- parent name
- pet name
- bio
- location
- username
- password
- email
- list of tags
#### chat
- id
- list of messages

### Value Objects
#### picture
#### message
#### auth token
#### attribute tag (attributes of the pet the user wants to be compared to other pets)

## REST API Design

### REST Endpoints
| Query | URL Fragment | HTTP Method | Path Parameters |
| ---   | ---          | ---         | ---             |
| Create account | /accounts | POST | |
| Update account | /accounts/{id} | PUT | id | 
| Delete account | /accounts/{id} | DELETE | id |
| Add profile picture | /accounts/{id}/pics | POST | id |
| Delete profile pictures | /accounts/{id}/pics/{pic_id} | DELETE | id, pic_id |
| login | /accounts/login | GET | |
| logout | /accounts/logout | GET | |
| Create Chat | /chats | POST | |
| Update Chat | /chats/{id} | PUT | id |
| Delete message | /chats/{id} | DELETE | id |
