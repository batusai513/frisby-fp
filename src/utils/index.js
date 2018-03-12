import { curry } from "ramda";
import { get } from "axios";
import Task from "data.task";
import { Nothing, Just } from "data.maybe";

export const preventDefault = e => e.preventDefault();

export const Http = {
  get: url =>
    new Task((rej, res) =>
      get(url, {
        params: {
          nojsoncallback: 1
        }
      })
        .then(res)
        .catch(rej)
    )
};

// indexOf :: a -> [a] -> Maybe Number
export const indexOf = curry((x, xs) => {
  const idx = xs.indexOf(x);
  return idx < 0 ? Nothing() : Just(idx);
});
