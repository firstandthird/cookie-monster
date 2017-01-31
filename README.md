# Cookie Monster

[![Build Status](https://travis-ci.org/firstandthird/cookie-monster.svg?branch=master)](https://travis-ci.org/firstandthird/cookie-monster)

Cookie manager

## Installation

```
npm install @firstandthird/cookie-monster --save
```

## Usage

```js
import CookieMonster from '@firstandthird/cookie-monster';

const name = 'cookiename'; // required
const value = 'somevalue'; // required - may also be an object
const expires = 10; // optional - Days cookie is valid
const path = '/test'; // optional - defaults to /
const isSecure = false; // optional - sets secure flag

// Set cookie
CookieMonster.set(name, value, expires, path, isSecure);

// Get cookie
CookieMonster.get(name);

// Remove cookie

CookieMonster.remove(name);

// Increment a counter cookie
CookieMonster.increment(name, expires);

// Decrement a counter cookie

CookieMonster.decrement(name, expires);
```

Methods can also be imported as needed:

```js
import { get, remove } from '@firstandthird/cookie-monster';

get(name);

remove(name);
```
