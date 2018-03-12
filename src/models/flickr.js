import { compose, map, prop, path } from 'ramda';
import { mconcat } from 'pointfree-fantasy';
import { get } from 'axios';
import Task from 'data.task';

const Http = {
  get: url =>
    new Task((rej, res) =>
      get(url, {
        params: {
          nojsoncallback: 1,
        },
      })
        .then(res)
        .catch(rej)
    ),
};

const baseUrl =
  'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14c4ebab40155d8c54dacb0642f46d68&tags={TAGS}&extras=url_s&format=json&jsoncallback=?';

// extractUrls :: JSON -> [Url]
const extractUrls = compose(
  map(prop('url_s')),
  prop('photo'),
  prop('photos'),
  prop('data'),
);

const makeUrl = t => {
  var [start, end] = baseUrl.split('{TAGS}');
  return mconcat([start, t, end]);
};

// flickrSearch :: String -> Task Error [Url]
export const flickrSearch = compose(map(extractUrls), Http.get, makeUrl);
