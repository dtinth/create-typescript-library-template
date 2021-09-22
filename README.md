# TypeScript Library Template Generator

This repository generates the [dtinth/typescript-library-template](https://github.com/dtinth/typescript-library-template) template repository every night.

- It uses [Heft](https://rushstack.io/pages/heft/overview/) build toolchain.
- It runs on every night, so the template stays fresh with latest dependencies.
- It has a smoke test, so broken templates are not committed.
- It uses [API Extractor](https://api-extractor.com/) to generate an API report and [api-documenter](https://api-extractor.com/pages/setup/generating_docs/) to generate the library documentation.
- The template comes with a GitHub Actions workflow that automatically keeps the API report files and documentation up-to-date.

## Related projects

- [Fresh App Factory](https://docs.dt.in.th/fresh-app-factory/index.html)
