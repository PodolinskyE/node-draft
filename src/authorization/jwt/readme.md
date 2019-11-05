### refresh (authorisation) tokens
used for auth / refresh access token
long time live
one-off used
- var refreshToken
- cookies : refresh-token
config.refreshExpires

### every request sign - access token
used for every request as a user sign
short time live
reusable
- var accessToken
- cookies: access-token
config.accessExpires


in scope of jsninja tutorial:

refreshToken (== authToken)
token == accessToken