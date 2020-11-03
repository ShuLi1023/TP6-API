# TP6-API
You must implement 5 API actions:
1)	Digitize
Feature: creates a new association of cortical stack/envelope.
Method: GET
URL: /digitize	
Parameters: gender (‘M’ or ‘F’), age (> 0) and name (at least 1 non-space character)
Example: /digitize?gender=M&age=12&name=John%20DOE
Response: an object which contains a stack property (the new cortical stack) and an envelope property (the new envelope). Status code is 200. You do not need to deal with incorrect data for this action.
Note: this part is almost complete already! You just need to finish it… A test has also been written for this action.

2)	Remove
Feature: removes a stack from an envelope, without damaging both… The stackId/envelopeId properties must be set to null.
Method: POST
URL: /remove/:stackId
Parameters: none
Example: /remove/42
Response: if the stack cannot be found (incorrect ID) or if it is not implanted inside an envelope already, you must return a Bad Request (400). If not, you must return a 204 response (OK without content)

3)	Implant
Feature: implant an available stack into an available envelope: set the duo of properties stackId/envelopeId.
Method: PUT
URL: /implant/:stackId/:envelopeId?
Parameters: none
Examples: 	/implant/12/45 	/implant/7
Response: if the stack or the envelope cannot be found or is not available, return a Bad Request (400). If envelopeId is not specified, implant the stack inside the first available envelope you can get. In this case, if there is no envelope available, return a Not Found error (404). If everything goes nicely, return a 204 response.

4)	Kill
Feature: when the envelope is dead but the stack is intact, you must get rid of the envelope and remove the stack from it (if there is one). The stack can be re-implanted into a new envelope later.
Method: POST
URL: /kill/:envelopeId
Parameters: none
Example: /kill/84
Response: if the envelope cannot be found, return a Bad Request (400), or else return a 204 response.

5)	True death
Feature: true death happens when the stack is destroyed… If the stack is implanted inside an envelope, the envelope dies as well. Both cannot be reused.
Method: DELETE
URL: /truedeath/:stackId
Parameters: none
Example: /truedeath/65
Response: if the stack does not exist, return a Bad Request (400). If it exists, get rid of it and return a 204 response. If the stack was inside an envelope, get rid of the envelope as well…
