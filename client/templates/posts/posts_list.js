var postsData = [{
    title: 'Introducint Telescope',
    url: 'http://sachagreif.com/introducint-telescope/'
}, {
    title: 'Meteor',
    url: 'http://meteor.com'
}, {
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
}];

Template.postsList.helpers({
    posts: postsData
});