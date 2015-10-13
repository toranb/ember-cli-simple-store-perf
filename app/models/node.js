import Ember from 'ember';
import { attr, Model } from 'ember-cli-simple-store/model';
import inject from 'ember-cli-injection/inject';

export default Model.extend({
    store: inject('store')('main'),

    parent: attr(0),
    title: attr(),

    parentNode: Ember.computed('_parentNode.[]', function () {
        let parentNode = this.get('_parentNode');

        return parentNode ? parentNode.objectAt(0) : undefined;
    }),

    _parentNode: Ember.computed(function () {
        return this.get('store').find('node', this.get('parent'));
    }),

    childNodes: Ember.computed(function () {
        let store = this.get('store');
        let id = this.get('id');
        let filter = (node) => {
            return id === node.get('parent');
        };

        return store.find('node', filter, ['parent']);
    })
});