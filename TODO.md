# TODO

- OK / Import code.
- OK / Create index.ts to export function.
  - OK / Rename functions/modules.
- OK / Add comments to explain the code.
- OK / Fix out of memory in case of infinite chunks.
  - OK / Best solution. Return only the jsons recognized with the current chunk and discard them.
- OK / Provide some integration tests (IT).

  - OK / Create library package.
  - OK / Import library package to a project.
  - OK / IT single json. |==|
  - OK / IT multiple jsons. |==| |==|
  - OK / IT multiple chunks. |== ==|
  - OK / IT partial json. |==
  - OK / IT invalid json. ==|

- Create README.md.
  - Provide some examples in README.
- Create publish pipeline.
  - .sh script or make?
  - Github actions?
    https://github.com/features/actions
- Implement state-machine recognizer replacing generator-based one.
- Integration tests to add state-machine solution.
  - IT stream.
  - IT json array. [|==|,|==|]
