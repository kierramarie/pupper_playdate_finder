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
- User
- chat

### Value Objects
- picture
- message