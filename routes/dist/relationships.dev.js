"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _relationship = require("../controllers/relationship.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/", _relationship.getRelationships);
router.post("/", _relationship.addRelationships);
router["delete"]("/", _relationship.deleteRelationships);
var _default = router;
exports["default"] = _default;