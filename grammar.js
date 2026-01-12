/**
 * @file Procedure Language for Users in Test and Operations (PLUTO)
 * @author Soumyadeep
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "pluto",

  extras: ($) => [/\s/, $.comment_block],

  word: ($) => $.identifier,

  conflicts: ($) => [
    [$._expression, $.binary_expression],
    [$._statement, $._expression],
    [$.step_block, $._expression],
  ],

  rules: {
    source_file: ($) => repeat($._definition),

    _definition: ($) => choice($.procedure_definition, $.comment_block),

    procedure_definition: ($) =>
      seq(
        "procedure",
        field("name", $.identifier),
        optional($.preconditions_block),
        optional($.declaration_block),
        $.main_block,
        optional($.watchdog_block),
        "end procedure",
      ),

    preconditions_block: ($) =>
      seq("preconditions", repeat($._statement), "end preconditions"),

    declaration_block: ($) =>
      seq("declare", repeat($.variable_declaration), "end declare"),

    variable_declaration: ($) =>
      seq(
        "variable",
        field("name", $.identifier),
        ":",
        field("type", $.type),
        optional(seq(":=", $._expression)),
      ),

    main_block: ($) => seq("main", repeat($.step_block), "end main"),

    step_block: ($) =>
      seq(
        "step",
        field("id", $.step_id),
        prec(2, optional(seq(":", optional($.string)))),
        repeat($._statement),
        "end step",
      ),
    step_id: ($) => /[a-zA-Z0-9_]+/,

    watchdog_block: ($) =>
      seq("watchdog", repeat($._statement), "end watchdog"),

    _statement: ($) =>
      choice(
        $.if_statement,
        $.while_loop,
        $.procedure_call,
        $.step_block,
        prec(1, $._expression), // Lower precedence for standalone expressions
      ),
    if_statement: ($) =>
      seq(
        "if",
        field("condition", $._expression),
        "then",
        repeat($._statement),
        optional(seq("else", repeat($._statement))),
        "end if",
      ),

    while_loop: ($) =>
      seq(
        "while",
        field("condition", $._expression),
        "do",
        repeat($._statement),
        "end while",
      ),

    procedure_call: ($) =>
      choice(
        seq(optional("initiate and confirm"), $.assignment),
        seq("wait", $._expression),
        seq("log", $._expression),
        seq("inform user", $._expression),
        "abort",
        "terminate",
      ),

    assignment: ($) =>
      seq(
        "set",
        field("target", $._any_identifier),
        "to",
        field("value", $._expression),
      ),

    _expression: ($) =>
      choice(
        $._any_identifier,
        $.constant,
        $.string,
        $.binary_expression,
        "ON",
        "OFF",
      ),

    binary_expression: ($) =>
      prec.left(
        1,
        seq(
          $._expression,
          field(
            "operator",
            choice(">", "<", "is", "==", "and", "or", ">=", "to"),
          ),
          $._expression,
        ),
      ),

    // --- LEAF NODES ---

    identifier: ($) => token(/[a-zA-Z_][a-zA-Z0-9_]*/),

    // 3. Create a SEPARATE rule for the multi-word phrases
    _special_identifier: ($) =>
      prec(2, choice("system element", "reporting data")),

    // 4. Combine them for use in your grammar logic
    _any_identifier: ($) => choice($.identifier, $._special_identifier),

    string: ($) => seq('"', /[^"]*/, '"'),

    comment_block: ($) => seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"),

    type: ($) =>
      choice(
        "Boolean",
        "integer",
        "real",
        "string",
        "absolute time",
        "relative time",
      ),

    constant: ($) =>
      choice(
        $.boolean_constant,
        $.hex_constant,
        $.number_constant,
        $.time_constant,
      ),

    boolean_constant: ($) => choice("TRUE", "FALSE"),

    hex_constant: ($) => /0x[0-9A-F]+/,

    number_constant: ($) =>
      token(
        seq(
          optional(/[+-]/),
          /\d+(\.\d+)?/,
          optional(seq(/[ ]?/, /[a-zA-Z]+(\^[+-]?\d+)?/)),
        ),
      ),

    time_constant: ($) => /[0-9:]+(\.[0-9]+)?Z?|[0-9]+[dhms]/,
  },
});
