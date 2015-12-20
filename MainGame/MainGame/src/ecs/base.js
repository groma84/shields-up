game.ecs = {
    entities: Array.apply(null, Array(255)).map(function () { return null; }),

    addEntity: function (initialComponents) {
        var firstEmptyEntry = this.entities.indexOf(null);
        this.entities[firstEmptyEntry] = {
            components: initialComponents,
            mask: this.getMaskFromComponents(initialComponents)
        };
    },

    removeEntity: function (entityId) {
        this.entities[entityId] = null;
    },

    addComponent: function (entityId, component) {
        this.entities[entityId].components.push(component);
        this.entities[entityId].mask = mask | component.mask;
    },

    removeComponent: function (entityId, component) {
        var index = this.entities[entityId].components.indexOf(component);

        if (index > -1) {
            this.entities[entityId].components.splice(index, 1);
            this.entities[entityId].mask = mask ^ component.mask;
        }
    },

    getMaskFromComponents: function (components) {
        var finalMask = 0x0,
            i;

        for (i = 0; i < components.length; ++i) {
            finalMask = finalMask | components[i].mask;
        }

        return finalMask;
    }
};
