# Changelog

## Unreleased

- Fix *head tail breaks* when `minmax` option is `false` (fixes #20).

## 1.0.0 (2023-06-28)

- Add *pretty breaks* and *arithmetic progression* classification methods.
- Add object-oriented API.
- Throw error instead of returning `null`:
  - when the number of classes is greater than the number of values,
  - when using a series with negative or zero values with *geometric progression* classification method,
  - when using an unknown classification method name in `breaks` function.
- Remove dependency on d3-array, d3-scale, d3-selection and d3-shape.