# Cookie Monster

[![Build Status](https://travis-ci.org/firstandthird/cookie-monster.svg?branch=master)](https://travis-ci.org/firstandthird/cookie-monster)
![npm](https://img.shields.io/npm/v/@firstandthird/cookie-monster.svg)

Cookie manager

## Installation

```sh
npm install @firstandthird/cookie-monster
```

## Usage

```js
import CookieMonster from '@firstandthird/cookie-monster';

const name = 'cookiename'; // required
const value = 'somevalue'; // required - may also be an object
const expires = 10; // optional - Days cookie is valid
const path = '/test'; // optional - defaults to /
const domain = 'blog.example.com'; // optional
const isSecure = false; // optional - sets secure flag
const sameSite = 'Strict'; // optional - defaults to 'Strict' - Valid values: 'None', 'Lax', 'Strict'

// Set cookie
CookieMonster.set(name, value, expires, path, domain, isSecure, sameSite);

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
