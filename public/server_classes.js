/*STATES CLASS: a snapshot of the state of a player after a 
 * certain number of inputs*/
module.exports = function State(key, num) {
    this.key = key;
    this.inputNum = num;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.updateState = function (input) {
        /*if (this.inputNum == input.inputNum) {
            this.inputNum = input.inputNum + 1;
        */
        this.x += input.moveX;
        this.y += input.moveY;
        this.rotation = input.rotation;
    }
}
/*INPUTS CLASS: inputs which are processed client side and server
* side in order to update state*/
var Input = function (key, num) {
    this.key = key;
    this.inputNum = num;
    this.type = '';
    this.moveX = 0;
    this.moveY = 0;
    this.rotation = 0;
    //this.firedRight = false;
    //this.firedLeft = true;
}