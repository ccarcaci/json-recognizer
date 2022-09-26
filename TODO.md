# TODO

- OK / Import code.
- OK / Create index.ts to export function.
  - OK / Rename functions/modules.
- OK / Add comments to explain the code.
- OK / Fix out of memory in case of infinite chunks.
  - OK / Best solution. Return only the jsons recognized with the current chunk and discard them.

- Provide some integration tests (IT).
  - OK / Create library package.
  - OK / Import library package to a project.
  - IT stream.
  - OK / IT single json. |==|
  - OK / IT multiple jsons. |==| |==|
  - OK / IT multiple chunks. |== ==|
  - IT multiple jsons, multiple chunks. |== ==| |== ==|
  - IT partial json. |==
  - IT invalid json. ==|
  - IT json array. [|==|,|==|]
- Create README.md.
  - Provide some examples in README.
- Create publish pipeline.
  - .sh script or make?
  - Github actions?
    https://github.com/features/actions
