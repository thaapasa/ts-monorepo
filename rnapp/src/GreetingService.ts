import {getGreeting} from 'shared/greeting';

export function getHi() {
  return getGreeting(1);
}

export function generateGreeting() {
  return getGreeting(Math.floor(Math.random() * 3));
}
