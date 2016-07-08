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
                  payload = {
                  };
                  payload[argNames[0]] = payload;
              }
              if (process.env.NODE_ENV !== 'production') {

                  for (var i in argNames) {
                      var name = argNames[i];
                      var argType = args[name];
                      console.log('ELLIOTT', argType);
                      var err = argType(payload, name, actionType);
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
