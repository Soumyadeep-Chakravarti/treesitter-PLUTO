; Standard Symbols
("(" @open ")" @close)
("[" @open "]" @close)
("{" @open "}" @close)

; PLUTO Keywords as "Brackets"
; Note: Zed will highlight 'procedure' and 'end procedure' as a pair
(procedure_definition
  "procedure" @open
  "end procedure" @close)

(if_statement
  "if" @open
  "end if" @close)

(while_loop
  "while" @open
  "end while" @close)
