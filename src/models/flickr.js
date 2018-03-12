import { compose, map, prop, path, curry, remove, append } from "ramda";
import { mconcat, fold } from "pointfree-fantasy";
import { Some, None } from 'fantasy-options';
import daggy from "daggy";
import { Http, indexOf } from "../utils";

// mayToOpt :: Maybe a -> Option a
const mayToOpt = m =>
  m.cata({
    Just: Some,
    Nothing: () => None
  });

const baseUrl =
  "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14c4ebab40155d8c54dacb0642f46d68&tags={TAGS}&extras=url_s&format=json&jsoncallback=?";

// Photo { src :: Url, x :: Point, y :: Point }
export const Photo = daggy.tagged("Photo", ["src", "x", "y"]);

//newPhoto :: Url -> Photo
const newPhoto = url => Photo(url, 0, 0);

const makeUrl = t => {
  var [start, end] = baseUrl.split("{TAGS}");
  return mconcat([start, t, end]);
};

// toPhoto :: JSON -> [Photo]
const toPhoto = compose(
  map(compose(newPhoto, prop("url_s"))),
  prop("photo"),
  prop("photos"),
  prop("data")
);

// flickrSearch :: String -> Task Error [Photo]
export const flickrSearch = compose(map(toPhoto), Http.get, makeUrl);

// indexOfPhoto :: Photo -> [Photo] -> Maybe Number
const indexOfPhoto = curry((p, ps) => indexOf(p.src, ps.map(prop("src"))));

// replacePhoto :: Photo -> [Photo] -> [Photo]
export const replacePhoto = curry((p, ps) =>
  compose(
    fold(append(p), () => append(p, ps)), // saco del Maybe a la izquierda Just [Photo], a la derecha Nothing
    mayToOpt, // transformo el Maybe a Option para poder usar el Fold
    map(i => remove(i, 1, ps)), // mapeo el Just(Idx) remuevo el item del array, retorna Maybe [Photo]
    indexOfPhoto(p) // retorna Maybe Number
  )(ps)
);
