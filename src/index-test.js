'use strict';

var rsa = require('./index');

var test = require('tape');

test('It can be required', function (t) {
    t.equal(typeof rsa, 'object', 'rsa should be an object');

    t.equal(typeof rsa.create, 'function', 'create should be a function');

    t.equal(typeof rsa.types, 'object',  'types should be an object');

    t.end();
});

test('action with no arguments', function (t) {

    var myActionCreator = rsa.create('MY_ACTION_TYPE');
    t.equal(typeof myActionCreator, 'function',
        'an action function is created');

    var myAction = myActionCreator();
    t.deepEqual(myAction, { type: 'MY_ACTION_TYPE' },
        'creates an action which just has the type set');

    var error = new Error('My error!');
    var myErrorAction = myActionCreator(error);
    t.deepEqual(myErrorAction, {
        type: 'MY_ACTION_TYPE',
        error: true,
        payload: error
    }, 'has the correct schema');

    t.end();
});

test('action with one optional argument', function (t) {
    var myActionCreator = rsa.create('MY_ACTION_TYPE',  {
        foo: rsa.types.string
    });
    t.equal(typeof myActionCreator, 'function',
        'an action function is created');

    var myAction = myActionCreator('bar');
    t.deepEqual(myAction, {
        type: 'MY_ACTION_TYPE',
        payload: {foo:'bar'}
    }, 'we get back the expected action object for the argument');

    var myAction = myActionCreator();
    t.deepEqual(myAction, {
        type: 'MY_ACTION_TYPE',
        payload: {}
    }, 'we get back the expected action object without an argument');

    t.end();
});

test('action with one argument', function (t) {

    var myActionCreator = rsa.create('MY_ACTION_TYPE',  {
        foo: rsa.types.string.isRequired
    });
    t.equal(typeof myActionCreator, 'function',
        'an action function is created');

    var myAction = myActionCreator('bar');
    t.deepEqual(myAction, {
        type: 'MY_ACTION_TYPE',
        payload: {foo:'bar'}
    }, 'we get back the expected action object for the required argument');

    var error = new Error('My error!');
    var myErrorAction = myActionCreator(error);
    t.deepEqual(myErrorAction, {
        type: 'MY_ACTION_TYPE',
        error: true,
        payload: error
    }, 'has the correct schema');

    t.throws(function() {
        myActionCreator();
    }, 'creating an action with bad arguments should throw');

    t.end();
});

test('action with many arguments', function (t) {

    var myActionCreator = rsa.create('MY_ACTION_TYPE',  {
        foo: rsa.types.string.isRequired,
        baz: rsa.types.number
    });
    t.equal(typeof myActionCreator, 'function',
        'an action function is created');

    var myAction = myActionCreator({foo: 'bar'});
    t.deepEqual(myAction, {
        type: 'MY_ACTION_TYPE',
        payload: {foo:'bar'}
    }, 'we get back the expected action object for the required argument');

    var myAction = myActionCreator({foo: 'bar', baz: 8});
    t.deepEqual(myAction, {
        type: 'MY_ACTION_TYPE',
        payload: {foo:'bar', baz:8}
    }, 'we get back the expected action object');

    var error = new Error('My error!');
    var myErrorAction = myActionCreator(error);
    t.deepEqual(myErrorAction, {
        type: 'MY_ACTION_TYPE',
        error: true,
        payload: error
    }, 'passing an error creates an action with error payload and error flag');

    t.throws(function() {
        myActionCreator({foo: 'bar', baz: 'baz'});
    }, 'creating an action with bad arguments should throw');

    t.end();
});

test('error has appropriate message', function (t) {
    t.plan(1);
    try {
        var myActionCreator = rsa.create('MY_ACTION_TYPE',  {
            foo: rsa.types.string.isRequired
        });
        myActionCreator();
    } catch (e) {
        t.equal(e.message, 'Required prop `foo` was not specified in `MY_ACTION_TYPE`.', 'message matches');
    }
});
