# :bowling: bowl-score

### Player properties

* Each player represents a row in the bowling scorecard
* Each player has 10 frames
	* Each frame has (up to) 3 throws
	* Each frame has a score
* Each player has 10 "running total" scores
	* Each "running total" score = corresponding frame score + previous "running total" score

### Sample usage

1. Create a game
* ```Shell
	curl \
	-X POST \
	http://localhost:3000/games
	```
2. Create a player
* ```Shell
	curl \
	-X POST \
	-H 'Content-Type: application/json' \
	-d '{"gameId": 1, "name": "Chris"}' \
	http://localhost:3000/players
	```
3. Create a throw
* ```Shell
	curl \
	-X POST \
	-H 'Content-Type: application/json' \
	-d '{"gameId": 1, "name": "Chris", "pins": 10}' \
	http://localhost:3000/players/throw
	```

### Sample response

(Using sample score from "[How to Score a Game of Bowling](https://www.thoughtco.com/bowling-scoring-420895)")<br />
This is the response after posting all the sample score throws:
```JSON
{
    "message": "Throw created for player Chris",
    "player": {
        "name": "Chris",
        "frames": [
            {
                "throws": [
                    10,
                    0,
                    0
                ],
                "score": 20,
                "spare": false,
                "strike": true
            },
            {
                "throws": [
                    7,
                    3,
                    0
                ],
                "score": 17,
                "spare": true,
                "strike": false
            },
            {
                "throws": [
                    7,
                    2,
                    0
                ],
                "score": 9,
                "spare": false,
                "strike": false
            },
            {
                "throws": [
                    9,
                    1,
                    0
                ],
                "score": 20,
                "spare": true,
                "strike": false
            },
            {
                "throws": [
                    10,
                    0,
                    0
                ],
                "score": 30,
                "spare": false,
                "strike": true
            },
            {
                "throws": [
                    10,
                    0,
                    0
                ],
                "score": 22,
                "spare": false,
                "strike": true
            },
            {
                "throws": [
                    10,
                    0,
                    0
                ],
                "score": 15,
                "spare": false,
                "strike": true
            },
            {
                "throws": [
                    2,
                    3,
                    0
                ],
                "score": 5,
                "spare": false,
                "strike": false
            },
            {
                "throws": [
                    6,
                    4,
                    0
                ],
                "score": 17,
                "spare": true,
                "strike": false
            },
            {
                "throws": [
                    7,
                    3,
                    3
                ],
                "score": 13,
                "spare": true,
                "strike": false
            }
        ],
        "currentFrame": 10,
        "currentThrow": 4,
        "scores": [
            20,
            37,
            46,
            66,
            96,
            118,
            133,
            138,
            155,
            168
        ]
    }
}
```