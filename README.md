# Back-End

# suggested endpoints:

# pubic routes

## post:

## for students/helpers/admin

- /api/register

## post:

## for students

- /api/login

## post:

## for helpers/admin

- /api/helpers/login

# priviate routes:

# for students/admin/helpers

## get: get all tickets for a specific user

- /api/users/:userId/tickets
- [ ] returns:

```js
  {
  "id": 2,
  "username": "james123",
  "password": "****\*****",
  "tickets": [
            {
            "id": 2,
            "title": "progress report",
            "description": "my progress report is not updating since Jan. 2020",
            "ticketCategory": "technical",
            "created_at": "2020-02-02 07:34:54",
            "user_id": 2,
            "resolved": false,
            "helper_id": 1
            }
            ]
  }
```

## get: get a single ticket with related reactions

/api/users/:userId/tickets/:ticketId

## post: create a ticket

/api/users/:userId/tickets

## put: update a ticket

/api/users/:userId/tickets/:ticketId

## delete: delete a ticket

/api/users/:userId/tickets/:ticketId

# for helpers/admin:

## get: get all tickets

/api/tickets

## get: get a single ticket info with related reactions

/api/tickets/:ticketId

## post: create a reaction

/api/tickets/:ticketId/reactions

## put: update a reaction

/api/tickets/:ticketId/reactions/:reactionId

## delete: delete a reaction

/api/tickets/:ticketId/reactions/:reactionId

# Database Schema

## table: **users**

- id: integer (auto-generated number)
- username: string (not nullable, unique)
- password: string (not nullable)

## table: **helpers**

- id: integer (auto-generated number)
- username: string (not nullable, unique)
- password: string (not nullable)
- accessType: enumeration [helper, admin] (default to 'helper')

## table: **tickets**

- id: integer (auto-generated number)
- title: string (not nullable, indexed)
- description: string
- ticketCategory: enumeration [technical, frontOffice] (default to 'frontOffice')
- created_at: timestamp
- user_id: integer (not nullable, foreign-key pointing to id in 'users' table)
- resolved: boolean (default to false)
- helper_id: integer (foreign-key pointing to id in 'helpers' table)

## table: **reactions**

- id: integer (auto-generated number)
- ticket_id: integer (not nullable, foreign-key pointing to id in 'tickets' table)
- created_at: timestamp
- notes: string
