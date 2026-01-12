; Keywords
"procedure" @keyword
"end procedure" @keyword
"preconditions" @keyword
"end preconditions" @keyword
"declare" @keyword
"end declare" @keyword
"main" @keyword
"end main" @keyword
"step" @keyword
"end step" @keyword
"watchdog" @keyword
"end watchdog" @keyword
"if" @keyword.control
"then" @keyword.control
"else" @keyword.control
"end if" @keyword.control
"while" @keyword.control
"do" @keyword.control
"end while" @keyword.control
"variable" @keyword

; Special multi-word identifiers
"system element" @type.qualifier
"reporting data" @type.qualifier

; Functions and Commands
"wait" @function.builtin
"log" @function.builtin
"inform user" @function.builtin
"initiate and confirm" @function.builtin
"set" @keyword
"to" @keyword
"abort" @keyword.control
"terminate" @keyword.control

; Literals and Constants
(boolean_constant) @constant.builtin
(number_constant) @number
(time_constant) @number
(string) @string
"ON" @constant.builtin
"OFF" @constant.builtin

; Identifiers and Names
(procedure_definition name: (identifier) @function)
(variable_declaration name: (identifier) @variable)
(step_id) @tag
(identifier) @variable

; Operators
(binary_expression operator: _ @operator)

; Comments
(comment_block) @comment
