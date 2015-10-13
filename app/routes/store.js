import Ember from 'ember';
import inject from 'ember-cli-injection/inject';

export default Ember.Route.extend({
    store: inject('main'),

    offset: 1,

    model() {
        return this.get('store').find('node', {parent: 0});
    },

    actions: {
        addRecords(withPropertyChangesBlock) {
            let offset = this.get('offset');
            let store = this.get('store');
            let parent = (offset === 1) ? 0 : Math.floor(Math.random() * 999);
            withPropertyChangesBlock = withPropertyChangesBlock || false;

            console.time('push element to store - ' + (withPropertyChangesBlock ? 'with' : 'without') + ' property changes block');

            if (withPropertyChangesBlock) {
                store.beginPropertyChanges();
            }

            for (let i = 0; i < 100; i++) {
                store.push('node', {
                    'id': offset,
                    'parent': parent,
                    'title': `Title ${i}`
                });
                offset++;
            }

            if (withPropertyChangesBlock) {
                store.endPropertyChanges();
            }

            console.timeEnd('push element to store - ' + (withPropertyChangesBlock ? 'with' : 'without') + ' property changes block');

            this.set('offset', offset);
        }
    }

});
