react-safe-actions
==================
[![NPM Version](http://img.shields.io/npm/v/react-safe-actions.svg?style=flat)](https://www.npmjs.com/package/react-safe-actions)
[![Build Status](https://travis-ci.org/thaggie/react-safe-actions.svg)](https://travis-ci.org/thaggie/react-safe-actions)
[![Dependencies Status](https://david-dm.org/thaggie/react-safe-actions.svg)](https://david-dm.org/thaggie/react-safe-actions)

A library for declaratively creating [flux standard actions](https://github.com/acdlite/flux-standard-action)
that check the payload type using [React](https://facebook.github.io/react)'s `PropTypes` system.

Action payloads are validated to make sure they conform to the payload's schema
at construction time

## Usage Examples

### No Arguments
```
var noArgsAction = rsa.create('NO_ARGS');
noArgsAction();
// {type: 'NO_ARGS'}
```

### One Argument

Actions with one argument are special cased so that they can just be called with that one argument rather than the payload options:

```
var oneArgAction = rsa.create('ONE_ARG', {
	foo: rsa.types.string.isRequired
});
oneArgAction('the arg for foo');
// {type: 'ONE_ARG': payload: {foo: 'the arg for foo'}}
oneArgAction(); // throws
```

### More than one argument

```
var multiArgAction = rsa.create('MANY_ARGS', {
	foo: rsa.types.string.isRequired,
	bar: rsa.types.string.isRequired
});
multiArgAction({foo: 'the foo arg', bar: 'the bar arg'});
// {type: 'MANY_ARGS', payload: {foo: 'the foo arg', bar: 'the bar arg'}}
multiArgAction({foo: 'the foo arg'}); // throws
```

### With an error

```
var anyArgs = rsa.create('ANY_ARGS', {
	foo: rsa.types.string.isRequired,
	bar: rsa.types.string.isRequired
});
anyArgs(new Error('Badness'));
// {type: 'ANY_ARGS', error: true payload: Error('Badness')}
```


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
