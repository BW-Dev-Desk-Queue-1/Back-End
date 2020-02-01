# Back-End

# suggested endpoints:

# pubic routes
## post: 
/api/register
/api/login



# priviate routes:
# for students/admin/helpers

## get: get my all tickets
/api/users/:user-id/tickets

## get:  get a single ticket with related reactions
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


