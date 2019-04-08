import { throttle } from 'lodash';
import { Observable, Observer } from 'rxjs';

/**
 * lodashThrottle
 * lodashThrottle is similar to the throttleTime operator found in rxjs but it
 * behaves similar to the lodash implementation of throttle. It also has options
 * to enable emitting on the leading and/or the trailing edge.
 */
export function lodashThrottle<T>(
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = { leading: true, trailing: true }
): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>) =>
    Observable.create((observer: Observer<T>) => {
      const throttledFn = throttle(observer.next.bind(observer), wait, options);
      const subscription = source.subscribe(
        val => throttledFn(val),
        err => observer.next(err),
        () => observer.complete()
      );
      return () => {
        subscription.unsubscribe();
      };
    });
}
