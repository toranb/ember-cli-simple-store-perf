import Ember from 'ember';
import { attr, Model } from 'ember-cli-simple-store/model';
import inject from 'ember-cli-injection/inject';

export default Model.extend({
    store: inject('store')('main'),
    parent: attr(),
    title: attr(),
    parentNode: Ember.computed.alias('belongs_to.firstObject'),
    belongs_to: Ember.computed(function () {
        return this.get('store').find('node', this.get('parent'));
    }),
    nope: Ember.computed(function () {
        console.log('do not call this plz');
        let id = this.get('id');
        let store = this.get('store');
        // let filter = (node) => {
        //     return id === node.get('parent');
        // };
        return store.find('node', {parent: id});
    })
});
