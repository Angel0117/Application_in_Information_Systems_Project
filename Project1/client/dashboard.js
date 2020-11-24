import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './dashBoard.html';

Router.route('/dashBoard', function() {
    this.render('DashBoard');
});

Template.DashBoard.onCreated(function() {
    
});

Template.DashBoard.onRendered(function(){

});
