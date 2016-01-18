import Ember from 'ember';
import inject from 'ember-cli-injection/inject';

export default Ember.Route.extend({
    store: inject('main'),

    offset: 1,
    wat: true,

    model() {
        var filter = function(model) {
            return model.get('parent') === 0;
        };
        return this.get('store').find('node', filter);
    },

    actions: {
        addRecords(huh) {
            // let parent = (offset === 1) ? 0 : Math.floor(Math.random() * 999);
            let store = this.get('store');
            let offset = this.get('offset');
            // let parent = (this.get('wat') === true) ? 0 : 1;
            let parent = 0;
            let numz = (huh === true) ? 100 : 1000;

            console.time('push element to store - without property changes block');

            Ember.run(function() {
                for (let i = 0; i < numz; i++) {
                    store.push('node', {
                        'id': offset,
                        'parent': parent,
                        'title': `Title ${i}`
                    });
                    offset++;
                }
            });

            console.timeEnd('push element to store - without property changes block');

            var newWat = (this.get('wat') === true) ? false : true;
            this.set('offset', offset);
            this.set('wat', newWat);
        }
    }
});
