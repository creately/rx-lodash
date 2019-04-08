import { lodashThrottle } from '../';
import { Subject } from 'rxjs';

describe('lodashThrottle', () => {
  [
    {
      time: 100,
      wait: 0,
      src: [[0, 'A']],
      out: ['A'],
    },
    {
      time: 100,
      wait: 250,
      src: [[0, 'A'], [50, 'B'], [60, 'C'], [70, 'D'], [120, 'E']],
      out: ['A', 'D', 'E'],
    },
    // TODO: add more unit tests
  ].forEach(c => {
    it('should work similar to lodash throttle function', done => {
      const sbj = new Subject<any>();
      const out: any[] = [];
      sbj.pipe(lodashThrottle(c.time)).subscribe(val => out.push(val));
      for (const input of c.src) {
        const [time, data] = input;
        setTimeout(() => sbj.next(data), time as number);
      }
      setTimeout(() => {
        expect(c.out).toEqual(out);
        done();
      }, c.wait);
    });
  });
});
