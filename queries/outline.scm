; Capture the whole procedure as an item, and its identifier as the name
(procedure_definition
  name: (identifier) @name) @item

; Capture steps within procedures
(step_block
  name: (identifier) @name) @item

; If you want "Main" to show up as a structural landmark
(main_block) @name @item

; Context allows Zed to show "where you are" in the breadcrumbs
(procedure_definition) @context
(step_block) @context
