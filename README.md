
[![logo](img/statsbreaks.svg)](https://observablehq.com/@neocartocnrs/bertin-logo)

![npm](https://img.shields.io/npm/v/statsbreaks)
![jsdeliver](https://img.shields.io/jsdelivr/npm/hw/statsbreaks)
![license](https://img.shields.io/badge/license-MIT-success)
![code size](https://img.shields.io/github/languages/code-size/neocarto/statsbreaks)

`statsbreaks` is javascript package to make data classification for choropleth maps.

## 1. Installation

#### <ins>In browser</ins>

Last version

```html
<script src="https://cdn.jsdelivr.net/npm/statsbreaks" charset="utf-8"></script>
```

Pinned version

```html
<script src="https://cdn.jsdelivr.net/npm/statsbreaks@0.1.3" charset="utf-8"></script>
```

#### <ins>In Observable</ins>

Last version

~~~js
stat = require("statsbreaks")
~~~

Pinned version

~~~js
stat = require("statsbreaks@0.1.3")
~~~

#### breaks

The *shape* function allows to compute breaks according to several discretization methods. [Source](https://github.com/neocarto/statsbreaks/blob/main/src/breaks.js)

<details><summary>Code</summary>

  ~~~js
  stat.breaks({ values: data, method: "jenks", nb: 5, precision: 0 })
  ~~~

</details>

<details><summary>Parameters</summary>

- <b>values</b>: an array of quantitative values
- <b>method</b>: method of discretization. "quantile", "q6", "equal", "jenks".
- <b>nb</b>: number of classes
- <b>precision</b> : rounding. 2 transfom 35667.877876 to 35667.87 -2 transfom 35667.877876 to 35600.

</details>

#### shape

The *shape* function allows to drw the shape of the data. This stage is important to choose the right discretization method. [Source](https://github.com/neocarto/statsbreaks/blob/main/src/shape.js)

<details><summary>Code</summary>

  ~~~js
  stat.shape(data, precision, marks, log)
  ~~~

</details>

<details><summary>Parameters</summary>

- <b>data</b>: an array of quantitative values
- <b>precision</b>: a number. Curve accuracy (default:25)
- <b>marks</b>: a boolean (default true)
- <b>log</b> : a boolen. transforms into a logarithm (default: false)

</details>

#### view

The *view* functionallows to visualize the result of a discretization. [Source](https://github.com/neocarto/statsbreaks/blob/main/src/view.js)

<details><summary>Code</summary>

  ~~~js
  stat.view(breaks, colors, data)
)
  ~~~

</details>

<details><summary>Parameters</summary>

- <b>breaks</b>: an array n breaks
- <b>colors</b>: an array of n-1 colors (optionnal)
- <b>data</b> : input data set to display ticks (optionnal)
-
</details>
