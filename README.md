# Skz UI

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

DESCRIPTION HERE

[**Live Demo**](https://sebastien-gervilla.github.io/skz-ui/)

## Installation:

```bash
npm install skz-ui --save-dev
```

or

```bash
yarn add -D skz-ui
```

## Usage :

Add `SkzModal` to your component:

```js
import React, { useState } from 'react'
import { SkzModal } from 'skz-ui'

const App = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="App">
            <button onClick={() => setOpenModal(true)}>Open modal</button>
            <SkzModal 
                open={openModal}
                setOpen={setOpenModal}
                body={
                    <p>Hello world !</p>
                }
            />
        </div>
    );
}
```

[npm-url]: https://www.npmjs.com/package/skz-ui
[npm-image]: https://img.shields.io/npm/v/skz-ui
[github-license]: https://img.shields.io/github/license/sebastien-gervilla/skz-ui
[github-license-url]: https://github.com/sebastien-gervilla/skz-ui/blob/master/LICENSE
[github-build]: https://github.com/sebastien-gervilla/skz-ui/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/sebastien-gervilla/skz-ui/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/skz-ui