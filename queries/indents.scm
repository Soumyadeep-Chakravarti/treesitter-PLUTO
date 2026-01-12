; Indent everything inside these blocks
[
  (procedure_definition)
  (main_block)
  (step_block)
  (if_statement)
  (while_loop)
] @indent

; The cursor should un-indent when it sees these
[
  "end procedure"
  "end main"
  "end step"
  "end if"
  "end while"
] @end
