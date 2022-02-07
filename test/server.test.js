const request = require('supertest')
const expect = require('chai').expect
const app = require('../api/server')

describe('server', () => {

	describe('accounts', () => {
		it('can create an account', () => {
			return request(app)
				.post('/api/accounts')
				.send({
                    "parentName": "Sarah Miller",
                    "parentBirthday": "1995-01-01T00:00:00Z",
                    "petName": "Luna",
                    "bio": "a cute dog looking for fun friends",
                    "location": "Los Angeles, CA, USA",  
                    "username": "sarahm098",
                    "password": "password123",
                    "email": "sarahm@gmail.com",  
                    "tags": [
                        "cute",
                        "collie",
                        "energetic"
                    ]
                })
                .expect(201)
        })

        it('can login', () => {
			return request(app)
				.put('/api/accounts/login')
				.send({  
                    "username": "sarahm098",
                    "password": "password123"
                })
                .expect(200)
        })

        it('can fail login', () => {
			return request(app)
				.put('/api/accounts/login')
				.send({})
                .expect(400)
        })
    })

    describe('chats', () => {
		it('can get a chat', () => {
			return request(app)
				.get('/api/chats/{1}')
				.send()
                .expect(200)
        })

        it('can send a message', () => {
			return request(app)
				.put('/api/chats/{1}/send')
				.send({
                    "message":"yep"
                })
                .expect(200)
        })

        it('can delete a chat', () => {
			return request(app)
				.delete('/api/chats/{1}')
				.send()
                .expect(204)
        })

        it('can not delete a chat', () => {
			return request(app)
				.delete('/api/chats')
				.send()
                .expect(405)
        })
    })
})