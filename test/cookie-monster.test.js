/* eslint no-console: 0 */

import { set, get, remove, increment, decrement } from '../cookie-monster';

import test from 'tape-rollup';

test('basic', t => {
  t.plan(1);
  set('testcookie', 'testval');

  const val = get('testcookie');

  t.equal(val, 'testval', 'Cookie set correctly');
});

test('json', t => {
  t.plan(1);
  set('jsoncookie', { test: 1 });

  const val = get('jsoncookie');

  t.equal(val.test, 1, 'JSON set correctly');
});

test('with comma', t => {
  t.plan(1);
  set('commacookie', 'value, value1');

  const val = get('commacookie');

  t.equal(val, 'value, value1', 'Cookie set correctly');
});

test('sanitize cookie name', t => {
  t.plan(2);

  t.throws(() => set('  ', 'value'), 'Empty cookies are not set');

  set(' Inval1d   C00ki€.name', 'value, value1');

  const val = get('Inval1d-C00kiname');

  t.equal(val, 'value, value1', 'Cookie is sanitized correctly');
});

test('should set string edge case string starting with "["', t => {
  t.plan(1);
  set('testcookie', '[something edgy');

  const val = get('testcookie');

  t.equal(val, '[something edgy', 'Cookie set correctly');
});

test('should set string edge case string starting with "{"', t => {
  t.plan(1);
  set('testcookie', '{something edgy');

  const val = get('testcookie');

  t.equal(val, '{something edgy', 'Cookie set correctly');
});

test('remove', t => {
  t.plan(1);
  set('testcookie', 'testval');
  remove('testcookie');

  const val = get('testcookie');

  t.equal(val, null, 'Cookie removed correctly');
});

test('increment / decrement', t => {
  t.plan(2);
  increment('visits');
  increment('visits');
  increment('visits');

  let val = get('visits');

  t.equal(val, '3', 'Cookie incremented correctly');

  decrement('visits');

  val = get('visits');

  t.equal(val, '2', 'Cookie decremented correctly');
});
