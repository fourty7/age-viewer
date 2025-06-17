"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AGTypeParse = AGTypeParse;
exports.onConnectQueries = onConnectQueries;
exports.setAGETypes = setAGETypes;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _antlr = _interopRequireDefault(require("antlr4"));
var _config = require("winston/lib/winston/config");
var _AgtypeLexer = _interopRequireDefault(require("./AgtypeLexer"));
var _AgtypeParser = _interopRequireDefault(require("./AgtypeParser"));
var _CustomAgTypeListener = _interopRequireDefault(require("./CustomAgTypeListener"));
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function AGTypeParse(input) {
  var chars = new _antlr["default"].InputStream(input);
  var lexer = new _AgtypeLexer["default"](chars);
  var tokens = new _antlr["default"].CommonTokenStream(lexer);
  var parser = new _AgtypeParser["default"](tokens);
  parser.buildParseTrees = true;
  var tree = parser.agType();
  var printer = new _CustomAgTypeListener["default"]();
  _antlr["default"].tree.ParseTreeWalker.DEFAULT.walk(printer, tree);
  return printer.getResult();
}
function setAGETypes(_x, _x2) {
  return _setAGETypes.apply(this, arguments);
}
function _setAGETypes() {
  _setAGETypes = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(client, types) {
    var extensionCheck, oidResults;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 1;
          return client.query("\n        SELECT 1 FROM pg_extension WHERE extname = 'age';\n    ");
        case 1:
          extensionCheck = _context.sent;
          if (!(extensionCheck.rows.length < 1)) {
            _context.next = 2;
            break;
          }
          throw new Error('AGE extension is not installed. Please contact your database administrator to install the AGE extension.');
        case 2:
          _context.next = 3;
          return client.query("\n        LOAD 'age';\n        SET search_path = ag_catalog, \"$user\", public;\n    ");
        case 3:
          _context.next = 4;
          return client.query("\n        select typelem\n        from pg_type\n        where typname = '_agtype';");
        case 4:
          oidResults = _context.sent;
          if (!(oidResults.rows.length < 1)) {
            _context.next = 5;
            break;
          }
          throw new Error('AGE types not found. The AGE extension may not be properly installed.');
        case 5:
          types.setTypeParser(oidResults.rows[0].typelem, AGTypeParse);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _setAGETypes.apply(this, arguments);
}
function onConnectQueries(_x3) {
  return _onConnectQueries.apply(this, arguments);
}
function _onConnectQueries() {
  _onConnectQueries = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(client) {
    var v;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 1;
          return client.query('show server_version;');
        case 1:
          v = _context2.sent;
          return _context2.abrupt("return", {
            server_version: v.rows[0].server_version
          });
        case 2:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _onConnectQueries.apply(this, arguments);
}
//# sourceMappingURL=AGEParser.js.map