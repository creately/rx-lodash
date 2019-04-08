# RxLodash

Useful RxJS operators based on functions available in lodash

## Getting Started

 - Install the module

```shell
npm i @creately/rx-lodash
```

 - Import and use operators

```ts
import { lodashThrottle } from '@creately/rx-lodash';

const throttled = source.pipe(
    lodashThrottle(c.time)
);

throttled.subscribe(val => console.log(val));
```
