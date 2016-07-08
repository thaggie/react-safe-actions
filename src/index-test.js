'use strict';

var rsa = require('../src/index');

var test = require('tape');

test('It can be required', function (t) {
    t.equal(typeof rsa, 'object', 'rsa sould be an object');

    t.equal(typeof rsa.create, 'function', 'create should be a function');

    t.equal(typeof rsa.types, 'object',  'types should be an object');

    t.end();
});

test('action with no arguments', function (t) {

    var myActionCreator = rsa.create('MY_ACTION_TYPE');
    t.equal(typeof myActionCreator, 'function', 'should create a function');

    var myAction = myActionCreator();
    t.equal(typeof myAction, 'object', 'the action creates an object');
    t.deepEqual(myAction, { type: 'MY_ACTION_TYPE' }, 'just has type set');

    var error = new Error('My error!');
    var myErrorAction = myActionCreator(error);
    t.equal(typeof myAction, 'object', 'creating with an error creates an object');
    t.deepEqual(myErrorAction, {
      type: 'MY_ACTION_TYPE',
      error: true,
      payload: error
    }, 'has the correct schema');

    t.end();
});

test('action with one argument', function (t) {

    var myActionCreator = rsa.create('MY_ACTION_TYPE',  {
      foo: rsa.types.string.isRequired
    });
    t.equal(typeof myActionCreator, 'function');
    //
    var myAction = myActionCreator({foo:'bar'});
    // t.equal(typeof myAction, 'object', 'the action creates an object');
    // t.deepEqual(myAction, { type: 'MY_ACTION_TYPE' }, 'has the type set');
    //
    // var error = new Error('My error!');
    // var myErrorAction = myActionCreator(error);
    // t.equal(typeof myAction, 'object', 'creates an object');
    // t.deepEqual(myErrorAction, {
    //   type: 'MY_ACTION_TYPE',
    //   error: true,
    //   payload: error
    // }, 'has the correct schema');

    t.end();
});

// test('action with many arguments', function (t) {
//
//     var myActionCreator = rsa.create('MY_ACTION_TYPE');
//     t.equal(typeof myActionCreator, 'function');
//
//     var myAction = myActionCreator();
//     t.equal(typeof myAction, 'object', 'the action creates an object');
//     t.deepEqual(myAction, { type: 'MY_ACTION_TYPE' }, 'has the type set');
//
//     var error = new Error('My error!');
//     var myErrorAction = myActionCreator(error);
//     t.equal(typeof myAction, 'object', 'creates an object');
//     t.deepEqual(myErrorAction, {
//       type: 'MY_ACTION_TYPE',
//       error: true,
//       payload: error
//     }, 'has the correct schema');
//
//     t.end();
// });
