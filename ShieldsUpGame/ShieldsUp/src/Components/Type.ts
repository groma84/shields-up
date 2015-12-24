module Game {
    export module Components {
        export enum Type {
            RigidBody = 1,
            Render = 2,
            Move = 4,
            Player = 8,
            Collide = 16,
            Health = 32,
            Damage = 64,
        }
    }
}