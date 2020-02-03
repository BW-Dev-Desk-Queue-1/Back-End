# Back-End

# suggested endpoints:

# pubic routes

## post:

## for students

- https://dev-help-desk.herokuapp.com/api/register

```js
  {
    "username" : "samwise 1",
    "password"	: "gamgee"
  }
```

## post:

## for students

- https://dev-help-desk.herokuapp.com/api/login

```js
    {
    "username" : "samwise 1",
    "password"	: "gamgee"
    }
```

## post:

## for helpers/admin

https://dev-help-desk.herokuapp.com/api/helpers/login

## post:

## for helpers/admin

/api/helpers/register

## post:

## for helpers/admin

https://dev-help-desk.herokuapp.com/api/helpers/register

# priviate routes:

# for students/admin/helpers

## get: get all tickets for a specific user

- https://dev-help-desk.herokuapp.com/api/users/:userId/tickets
- [ ] example returns:

```js
  {
  "id": 2,
  "username": "james123",
  "password": "*********",
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

- https://dev-help-desk.herokuapp.com/api/users/:userId/tickets/:ticketId
- [ ] example returns:

```js
{
    "id": 3,
    "username": "sunny123",
    "password": "*******",
    "ticket": {
        "id": 3,
        "title": "Slack",
        "description": "My userid is not working in Slack",
        "ticketCategory": "technical",
        "created_at": "2020-02-02 07:34:54",
        "user_id": 3,
        "resolved": false,
        "helper_id": 3
    },
    "reactions": [
        {
            "id": 1,
            "ticket_id": 3,
            "created_at": "2020-02-02 07:34:54",
            "notes": "I re-created userId and sent an email to student for trial with new password. will wait for confirmation from the student."
        },
        {
            "id": 3,
            "ticket_id": 3,
            "created_at": "2020-02-02 07:34:54",
            "notes": "the student confirmed the userId is working now"
        }
    ]
}
```

## post: create a ticket

- https://dev-help-desk.herokuapp.com/api/users/:userId/tickets

## put: update a ticket

- https://dev-help-desk.herokuapp.com/api/users/:userId/tickets/:ticketId

## delete: delete a ticket

- https://dev-help-desk.herokuapp.com/api/users/:userId/tickets/:ticketId

# for helpers/admin:

## get all users and its related tickets

```js
[
  {
    id: 1,
    username: 'young123',
    password: '*******',
    tickets: []
  },
  {
    id: 2,
    username: 'james123',
    password: '*******',
    tickets: [
      {
        id: 2,
        title: 'progress report',
        description: 'my progress report is not updating since Jan. 2020',
        ticketCategory: 'technical',
        created_at: '2020-02-03T20:07:33.748Z',
        user_id: 2,
        resolved: false,
        helper_id: 1
      }
    ]
  },
  {
    id: 3,
    username: 'sunny123',
    password: '*******',
    tickets: [
      {
        id: 1,
        title: 'registration question',
        description: 'When is the next registration deadline?',
        ticketCategory: 'frontOffice',
        created_at: '2020-02-03T20:07:33.748Z',
        user_id: 3,
        resolved: false,
        helper_id: 2
      },
      {
        id: 3,
        title: 'Slack',
        description: 'My userid is not working in Slack',
        ticketCategory: 'technical',
        created_at: '2020-02-03T20:07:33.748Z',
        user_id: 3,
        resolved: false,
        helper_id: 3
      }
    ]
  },
  {
    id: 4,
    username: 'a username',
    password: '*******',
    tickets: []
  },
  {
    id: 6,
    username: 'sam',
    password: '*******',
    tickets: []
  },
  {
    id: 7,
    username: 'sm',
    password: '*******',
    tickets: []
  },
  {
    id: 8,
    username: 'young1231',
    password: '*******',
    tickets: []
  },
  {
    id: 9,
    username: 'young1235',
    password: '*******',
    tickets: []
  }
];
```

## get: get all tickets

- https://dev-help-desk.herokuapp.com/api/tickets

## get: get a single ticket info with related reactions

- https://dev-help-desk.herokuapp.com/api/tickets/:ticketId

## post: create a reaction

- https://dev-help-desk.herokuapp.com/api/tickets/:ticketId/reactions

## put: update a reaction

- https://dev-help-desk.herokuapp.com/api/tickets/:ticketId/reactions/:reactionId

## delete: delete a reaction

- https://dev-help-desk.herokuapp.com/api/tickets/:ticketId/reactions/:reactionId

# Database Schema

## table: **users**

- id: integer (auto-generated number)
- username: string (not nullable, unique)
- password: string (not nullable),
- accessType: enumeration[student] (default to 'student')

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
