#NEXT
1. HealthComponent (Planet und Meteor)
1. DamageComponent (Meteor)
1. DamageSystem (Reaktion auf CollisionMessage, gegenseitig Damage von Health abziehen, HealthChanged Message)
1. DestroySystem (Reaktion auf HealthChangedMessage, wenn Health <= 0 -> Entity löschen (erstmal))