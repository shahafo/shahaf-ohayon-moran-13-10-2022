import { CoreState } from "./core/state/core.reducers";
import { FavoritesState } from "./favorites/state/favorites.reducers";

export interface IAppState {
  core: CoreState;
  favorites: FavoritesState;
}

