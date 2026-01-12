/**
 * @file Procedure Language for Users in Test and Operations
 * @author Soumyadeep
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "pluto",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
