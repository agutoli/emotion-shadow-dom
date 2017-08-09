glamor-shadow-dom
=====================

## Installation

`npm install glamor-shadow-dom --save`

## Benefits

* **Encapsulation**: You component will be protected by external css styles.

* **Isolated DOM**: The DOM of a component is independent (for example, document.querySelector() does not return nodes of your ShadowDOM area).

* **Scope CSS**: The CSS defined within the DOM shadow assumes its scope. Style rules do not leak and page styles do not interfere.

* **Simplify CSS**: The scoped DOM means that you can use CSS selectors, more generic class / ID names, and not worry about naming conflicts (but use BEMCSS plz... hehe).

* **Performance**: If you have  component with shadowDOM, when this component suffer any change, browser will "rapaint" just that area.

## Example with glamor

    import React from 'react';
    import ShadowDOM from 'glamor-shadow-dom';
    import { css } from 'glamor'

    let box = css({ color: 'red' })

    export default ShadowDOM(() => (
      <div {...box}>
        this is a nice box.
      </div>
    ));

## Example with glamorous
    import React from 'react';
    import glamorous from 'glamorous';
    import ShadowDOM from 'glamor-shadow-dom';

    export default ShadowDOM(glamorous.button({
      fontSize: 16,
      margin: 10,
      border: 'none',
      cursor: 'pointer',
      display: 'inline-block',
      padding: '10px 20px',
      textAlign: 'center',
      transition: '0.25s cubic-bezier(0.17, 0.67, 0.52, 0.97)',
      borderRadius: 4,
      color: '#fff'
    }));

## License

The MIT License (MIT)

Copyright (c) 2017 Bruno Agutoli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
