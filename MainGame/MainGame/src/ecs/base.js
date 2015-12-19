game.ecs = {
    entities: Array.apply(null, Array(255)).map(function () { return null; }),

    addEntity: function (initialComponents) {
        var firstEmptyEntry = entities.indexOf(null);
        entities[firstEmptyEntry] = {
            components: initialComponents,
            mask: getMaskFromComponents(initialComponents)
        };
    },

    removeEntity: function (entityId) {
        entities[entityId] = null;
    },

    addComponent: function (entityId, component) {
        entities[entityId].components.push(component);
    },

    removeComponent: function (entityId, component) {
        var index = entities[entityId].components.indexOf(component);

        if (index > -1) {
            entities[entityId].components.splice(index, 1);
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
