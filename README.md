# Back-End

# suggested endpoints:

# pubic routes

## post:

## for students

- /api/register
  sending to back-end
- https://dev-help-desk.herokuapp.com/api/register

```js
    {
    "username" : "samm",
    "password"	: "gamgee"
    }
```

what back-end returns

```js
{
    "id": 36,
    "username": "young3324",
    "password": "*******",
    "accessType": "student",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM2LCJ1c2VybmFtZSI6InlvdW5nMzMyNCIsInVzZXJBY2Nlc3NUeXBlIjoic3R1ZGVudCIsImlhdCI6MTU4MDg2NzcxNCwiZXhwIjoxNTgwOTU0MTE0fQ.Q6Fnw5Xt77kvicG7g20xCLa5Z0-MwKLH0_1TFtq482s"
}
```

## post:

## for students

- /api/login

- https://dev-help-desk.herokuapp.com/api/login

  send to backend

```js
{
    "username" : "samm",
    "password"	: "gamgee"
    }
```

what backend returns

```js
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoic2FtbSIsInVzZXJBY2Nlc3NUeXBlIjoic3R1ZGVudCIsImlhdCI6MTU4MDc5MTY2MSwiZXhwIjoxNTgwODc4MDYxfQ.ZNacWbT2m9umvZDBnDe6l6j0D7fbfN8exInmyynmM6M",
    "accessType": "student",
    "userId": 30
}
```

## post:

## for helpers/admin

https://dev-help-desk.herokuapp.com/api/helpers/login
input to backend

```js
    {
    "username" : "samssssssssss11",
    "password"	: "gamgeesss",
    "accessType" : "helper"
    }
```

what backend returns

```js
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJ1c2VybmFtZSI6InN1bjc3NzciLCJ1c2VyQWNjZXNzVHlwZSI6ImhlbHBlciIsImlhdCI6MTU4MDg2NzgxNCwiZXhwIjoxNTgwOTU0MjE0fQ.BJ8IkruLAcvi17QGT9sQ2_jAyQSOTJhu3SzVrcjhe8k",
    "accessType": "helper",
    "userId": 19
}
```

## post:

## for helpers/admin

https://dev-help-desk.herokuapp.com/api/helpers/register
input to backend

```js
    {
    "username" : "samssssssssss11",
    "password"	: "gamgeesss",
    "accessType" : "helper"
    }
```

output from backend

```js
    {
    "id": 23,
    "username": "young6670",
    "password": "*******",
    "accessType": "helper",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzLCJ1c2VybmFtZSI6InlvdW5nNjY3MCIsInVzZXJBY2Nlc3NUeXBlIjoiaGVscGVyIiwiaWF0IjoxNTgwODY3NjE1LCJleHAiOjE1ODA5NTQwMTV9.bL-CYh3w_QiD_1jioh1oDRd1nAIEyXkH0ubNg1FN5Y8"
}
```

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

- [ ] example returns:

```js
{
    "id": 4,
    "title": "Slack",
    "description": "My userid is not working in Slack",
    "ticketCategory": "Other",
    "created_at": "2020-02-05 18:12:13",
    "tried": "I did make an account but...",
    "user_id": 4,
    "resolved": false,
    "helper_id": null
}
```

## put: update a ticket

- https://dev-help-desk.herokuapp.com/api/users/:userId/tickets/:ticketId

- [ ] example returns:

```js
{
    "title": "Slack",
    "description": "Slack id and password are not working",
    "ticketCategory": "technical",
    "tried": "I did make an account but..."
}
```

## delete: delete a ticket

- https://dev-help-desk.herokuapp.com/api/users/:userId/tickets/:ticketId

- [ ] example returns:

```js
{
    "message": "successfuly deleted..."
}
```

# Access for helpers/admin ONLY:

## get all users and its related tickets

- https://dev-help-desk.herokuapp.com/api/users

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

## get: get all tickets with related reactions

- https://dev-help-desk.herokuapp.com/api/tickets
first few

```js
[
    {
        "id": 1,
        "title": "registration question",
        "description": "When is the next registration deadline?",
        "ticketCategory": "frontOffice",
        "created_at": "2020-02-04 01:42:22",
        "tried": "",
        "user_id": 3,
        "resolved": 0,
        "helper_id": 2,
        "reactions": [
            {
                "id": 2,
                "ticket_id": 1,
                "created_at": "2020-02-04 01:42:22",
                "notes": "emailed to students with new registration information"
            }
        ]
    },
    {
        "id": 2,
        "title": "progress report",
        "description": "my progress report is not updating since Jan. 2020",
        "ticketCategory": "technical",
        "created_at": "2020-02-04 01:42:22",
        "tried": "I restarted the computer",
        "user_id": 2,
        "resolved": 0,
        "helper_id": 1,
        "reactions": [
            {
                "id": 7,
                "ticket_id": 2,
                "created_at": "2020-02-05 19:04:13",
                "notes": "I'm a new reaction"
            }
        ]
    }
]
```

## get: get a single ticket info with related reactions

- https://dev-help-desk.herokuapp.com/api/tickets/:ticketId

```js
  {
    "id": 1,
    "title": "registration question",
    "description": "When is the next registration deadline?",
    "ticketCategory": "frontOffice",
    "created_at": "2020-02-04 01:42:22",
    "tried": "",
    "user_id": 3,
    "resolved": false,
    "helper_id": 2,
    "reactions": [
        {
            "id": 2,
            "ticket_id": 1,
            "created_at": "2020-02-04 01:42:22",
            "notes": "emailed to students with new registration information"
        }
    ]
}
```
## post: create a reaction

- https://dev-help-desk.herokuapp.com/api/tickets/:ticketId/reactions
input to backend
```js
{
	"notes": "I'm a new another reaction"

}
```
output to client
```js
  {
      "id": 8,
      "ticket_id": 2,
      "created_at": "2020-02-05T21:28:45.030Z",
      "notes": "I'm a new another reaction"
  }
```

## put: update a reaction

- https://dev-help-desk.herokuapp.com/api/tickets/:ticketId/reactions/:reactionId
input to backend
```js
{
        "notes": "I did this"
    }
```
output to client
```js
  {
    "notes": "I did this",
    "created_at": "2020-02-05 21:31:19",
    "ticket_id": 2
}
```
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
- ticketCategory: enumeration [Equipment, People, Track,Finances, Other] (default to null)
- created_at: timestamp
- tried: string
- user_id: integer (not nullable, foreign-key pointing to id in 'users' table)
- resolved: boolean (default to false)
- helper_id: integer (foreign-key pointing to id in 'helpers' table)

## table: **reactions**

- id: integer (auto-generated number)
- ticket_id: integer (not nullable, foreign-key pointing to id in 'tickets' table)
- created_at: timestamp
- notes: string
