# volery-backend

the express mongodb based backend powering the volery platform

## sh\*tty api doc

- `GET /tweets` – gives back all tweets with all data
- `GET /tweets/:id` – gives all data about specified tweet
- `POST /tweets` – creates new tweet, required json params in body: `name` (name of the tweet obviously), `text` (text of the initial proposal)
- `POST /tweets/:id/proposal` – add new proposal to existing tweet, required json params in body: `text` (text of the new proposal)
- `PUT /tweets/:id/finalize` – finalize the tweet, required json params in body: `proposal` (\_id of the final proposal)
