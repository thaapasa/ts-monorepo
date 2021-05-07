import 'jest';
import {getHi} from '../src/GreetingService';

it('says hi', () => {
  expect(getHi()).toEqual('Hi! 👋');
});
