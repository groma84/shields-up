game.components.RigidBody = function (x, y, xSize, ySize) {
    this.mask = game.components.type.rigidBody;

    this.x = x;
    this.y = y;
    this.xSize = xSize;
    this.ySize = ySize;
}