Package.describe({
  name: 'pzydy1990:errors',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: '怎么就不好使呢？怎么就好使了呢？',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api,where) {
  api.versionsFrom('1.1.0.2');
  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');
  api.addFiles(['errors.js', 'errors_list.html', 'errors_list.js'], 'client');

  if (api.export)
    api.export('Errors');
});

Package.onTest(function(api) {
  api.use('pzydy1990:errors', 'client');
  api.use(['tinytest', 'test-helpers'], 'client');
  api.addFiles('errors-tests.js', 'client');
});
