# Back-End

# suggested endpoints:

# pubic routes

## post:

## for students

/api/register

## post:

## for students

/api/login

## post:

## for helpers/admin

/api/helpers/register

## post:

## for helpers/admin

/api/helpers/login

# priviate routes:

# for students/admin/helpers

## get: get my all tickets

/api/users/:user-id/tickets

## get: get a single ticket with related reactions

/api/users/:user-id/tickets/:ticket-id

## post: create a ticket

/api/users/:user-id/tickets

## put: update a ticket

/api/users/:user-id/tickets/:ticket-id

## delete: delete a ticket

/api/users/:user-id/tickets/:ticket-id

# for helpers/admin:

## get: get all tickets

/api/tickets

## get: get a single ticket info with related reactions

/api/tickets/:ticket-id

## post: create a reaction

/api/tickets/:ticket-id/reactions

## put: update a reaction

/api/tickets/:ticket-id/reactions/:reaction-id

## delete: delete a reaction

/api/tickets/:ticket-id/reactions/:reaction-id

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
