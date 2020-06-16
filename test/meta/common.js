const PAGESIZE = 65536;

function print_origin(origin) {
    print(";;");
    print(";; Generated by ../meta/" + origin);
    print(";;");
}

function checkRangeCode() {
    return `
  (func (export "checkRange") (param $from i32) (param $to i32) (param $expected i32) (result i32)
    (loop $cont
      (if (i32.eq (local.get $from) (local.get $to))
        (then
          (return (i32.const -1))))
      (if (i32.eq (i32.load8_u (local.get $from)) (local.get $expected))
        (then
          (local.set $from (i32.add (local.get $from) (i32.const 1)))
          (br $cont))))
    (return (local.get $from)))
`;
}

function checkRange(from, to, expected) {
    print(
`(assert_return (invoke "checkRange" (i32.const ${from}) (i32.const ${to}) (i32.const ${expected}))
               (i32.const -1))`);
}
