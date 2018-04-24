const Frame = require('./frame');

class Player {
    constructor(playerName) {
        this.name = playerName;
        this.frames = [];
        this.currentFrame = 1;
        this.currentThrow = 1;
        this.scores = [];

        for (let i = 0; i < 10; i++) {
            let frame = new Frame();
            this.frames.push(frame);
            this.scores[i] = 0;
        }
    }

    gameFinished() {
        return this.currentFrame > 10 || this.currentThrow > 3;
    };

    updateScore(pins) {
        this.frames[this.currentFrame - 1].throws[this.currentThrow - 1] = pins;

        // Set some friendly variables from the array values
        let currentFrame =          this.frames[this.currentFrame - 1],
            currentRunningTotal =   0,
            
            oneBackFrame =          this.frames[this.currentFrame - 2],
            oneBackRunningTotal =   this.scores[this.currentFrame - 2] | 0,
            
            twoBackFrame =          this.frames[this.currentFrame - 3],
            twoBackRunningTotal =   this.scores[this.currentFrame - 3] | 0,
            
            currentThrowScore = currentFrame.throws[this.currentThrow - 1],
            firstThrowScore =   currentFrame.throws[0] | 0,
            secondThrowScore =  currentFrame.throws[1] | 0,
            thirdThrowScore =   currentFrame.throws[2] | 0,
            
            isLastFrame =   this.currentFrame === 10,
            
            isFirstThrow =  this.currentThrow === 1,
            isSecondThrow = this.currentThrow === 2,
            
            isStrike =  currentThrowScore === 10,
            isSpare =   currentThrowScore + firstThrowScore === 10;

        // Check if the current throw is a strike or a spare
        if (isFirstThrow && isStrike) {
            currentFrame.strike = true;

            if (!isLastFrame) {
                this.currentThrow++;
                isFirstThrow = false;
                isSecondThrow = true;
            }
        } else if (isSecondThrow && isSpare) {
            currentFrame.spare = true;
        }

        // Update the current frame's score
        currentFrame.score = firstThrowScore + secondThrowScore;
        if (isLastFrame) {
            currentFrame.score += thirdThrowScore;
        }

        // Check if the two previous frames were strikes
        if (this.currentFrame > 2 && oneBackFrame.strike && twoBackFrame.strike) {
            if (currentFrame.strike && ((isLastFrame && isFirstThrow) || (!isLastFrame && isSecondThrow))) {
                twoBackFrame.score += 10;
                twoBackRunningTotal += 10;
                oneBackRunningTotal += 10;
            } else if (!isLastFrame && isFirstThrow) {
                twoBackFrame.score += currentFrame.score;
                twoBackRunningTotal += currentFrame.score;
                oneBackRunningTotal += currentFrame.score;
            }
        }

        // Check if the previous frame was a strike or a spare
        if (this.currentFrame > 1) {
            if (oneBackFrame.strike) {
                if (currentFrame.strike && ((isLastFrame && isFirstThrow) || (!isLastFrame && isSecondThrow))) {
                    oneBackFrame.score += 10;
                    oneBackRunningTotal += 10;
                } else if (!isLastFrame && isSecondThrow) {
                    oneBackFrame.score += currentFrame.score;
                    oneBackRunningTotal += currentFrame.score;
                } else if (isLastFrame && isSecondThrow) {
                    oneBackFrame.score += secondThrowScore;
                    oneBackRunningTotal += secondThrowScore;
                }
            } else if (oneBackFrame.spare) {
                if (currentFrame.strike && ((isLastFrame && isFirstThrow) || (!isLastFrame && isSecondThrow))) {
                    oneBackFrame.score += 10;
                    oneBackRunningTotal += 10;
                } else if (isFirstThrow) {
                    oneBackFrame.score += currentThrowScore;
                    oneBackRunningTotal += currentThrowScore;
                }
            }

        }

        // Update the current running total
        for (let i = 0; i <= (this.currentFrame - 1); i++) {
            currentRunningTotal += this.frames[i].score;
        }

        // Set the array values from the friendly variables
        this.frames[this.currentFrame - 1] = currentFrame;
        this.scores[this.currentFrame - 1] = currentRunningTotal;
        
        this.frames[this.currentFrame - 2] = oneBackFrame;
        this.scores[this.currentFrame - 2] = oneBackRunningTotal;
        
        this.frames[this.currentFrame - 3] = twoBackFrame;
        this.scores[this.currentFrame - 3] = twoBackRunningTotal;
        
        this.frames[this.currentFrame - 1].throws[0] = firstThrowScore;
        this.frames[this.currentFrame - 1].throws[1] = secondThrowScore;
        this.frames[this.currentFrame - 1].throws[2] = thirdThrowScore;

        // Update the current throw (and frame, if necessary)
        if (isSecondThrow) {
            if (isLastFrame && (this.frames[9].strike || this.frames[9].spare)) {
                this.currentThrow++;
            }
            else {
                this.currentFrame++;
                this.currentThrow = 1;
            }
        } else {
            this.currentThrow++;
        }
    };
}

module.exports = Player;
