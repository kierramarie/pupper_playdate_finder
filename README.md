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
- parent birthday
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

## REST API Design

### REST Endpoints
| Query | URL Fragment | HTTP Method | Path Parameters | Representations |
| ---   | ---          | ---         | ---             | --- |
| Create account | /accounts | POST | | Create Account |
| Update account | /accounts/{id} | PUT | id | |
| Delete account | /accounts/{id} | DELETE | id | |
| Add profile picture | /accounts/{id}/pics | POST | id | Add Picture |
| Delete profile pictures | /accounts/{id}/pics/{pic_id} | DELETE | id, pic_id |
| login | /accounts/login | GET | | Account Login |
| logout | /accounts/logout | GET | |
| Create Chat | /chats | POST | | Create Chat |
| Get Chat | /chats/{chat_id} | GET | chat_id | |
| Update Chat | /chats/{chat_id} | PUT | chat_id | |
| Send Message | /chats/{chat_id}/send | PUT | chat_id | Send Message |
| Delete message | /chats/{chat_id} | DELETE | chat_id | |

### Representations
#### Create Account
```json
{
    "id":"1",
    "parentName":"John Doe",
    "parentBrithday":"01/01/1990",
    "petName":"Luna",
    "bio":"bio info",
    "location":"Los Angeles, California, USA",
    "username":"doglover1234",
    "password":"agreatpassword",
    "email":"doglover1234@gmail.com",
    "tags": [
        "friendly",
        "exuberent",
        "corgi",
        "energetic"
    ]
}
```
#### Add Picture
```json
{
    "data":"kdsfmvniovwjoeur9jf02930ijfi900f924jpojo9j0g42920ujfopew",
    "size":"4.3MB",
    "name":"profile_pic"
}
```

#### Account Login
```json
{
    "password":"agreatpassword"
}
```

#### Create Chat
```json
{
    "chat_id":"1",
    "recipientAccepted":"False",
    "users" : [
        "doglover1234",
        "sarahm098"
    ],
    "messages": [
        {
            "messageId":"kljdafoojpp12",
            "message": "Hello!",
            "sendingUser": "doglover1234",
            "receivingUser": "sarahm098"
        }
    ]
}
```

#### Send Message
```json
{
    "message":"Hi, how are you?",
    "sendingUser" : "sarahm098",
    "receivingUser" : "doglover1234"
}
```