'use strict';

var React = require('react');

module.exports = {
  types: React.PropTypes,
  create: function (actionType, args) {
      var argNames = args ? Object.keys(args) : [];
      var nArgs = argNames.length;
      return function (payload) {
          var action = {
              type: actionType
          };

          if (payload instanceof Error) {
              action.error = true;
              action.payload = payload;
          } else if (args)  {
              if (nArgs === 1) {
                  var arg1 = payload;
                  payload = {
                  };
                  if (typeof arg1 !== 'undefined') {
                      payload[argNames[0]] = arg1;
                  }
              }
              if (process.env.NODE_ENV !== 'production') {
                  for (var i in argNames) {
                      var name = argNames[i];
                      var argType = args[name];
                      var err = argType(payload, name, actionType, 'prop');
                      if (err) {
                          throw err;
                      }
                  };
              }
              action.payload = payload;
          }

          return action;
      };
    }
};
