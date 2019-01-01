# 2.1.0

* Replaces javascript implementation with typescript (Javascript is still supported)

# 2.0.0

* Adds transpilation again. The decision to remove it backfired almost immediately. 🤷‍♂️
  (It turns out that most people copy the config example from the `babel-loader` docs, which excludes `node_modules`)

# 1.0.0

* Removes transpilation. Users must now transpile ES6 if needed.
* Adds named `transformUnitless` export
* Adds named `translate` export
* Adds named `translateUnitless` export
* Adds support for `skewX` and `skewY`.
* Adds default value for `transform` argument.
