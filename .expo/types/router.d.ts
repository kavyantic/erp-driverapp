/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/__+not-found`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}/landing` | `/landing`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}/signin` | `/signin`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}${'/(authenticated)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}${'/(authenticated)'}/profile` | `/profile`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}${'/(authenticated)'}/trip/active` | `/trip/active`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}${'/(authenticated)'}/trip` | `/trip`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/__+not-found`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(app)'}/landing` | `/landing`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(app)'}/signin` | `/signin`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(app)'}${'/(authenticated)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(app)'}${'/(authenticated)'}/profile` | `/profile`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(app)'}${'/(authenticated)'}/trip/active` | `/trip/active`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(app)'}${'/(authenticated)'}/trip` | `/trip`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/__+not-found${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(app)'}/landing${`?${string}` | `#${string}` | ''}` | `/landing${`?${string}` | `#${string}` | ''}` | `${'/(app)'}/signin${`?${string}` | `#${string}` | ''}` | `/signin${`?${string}` | `#${string}` | ''}` | `${'/(app)'}${'/(authenticated)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(app)'}${'/(authenticated)'}/profile${`?${string}` | `#${string}` | ''}` | `/profile${`?${string}` | `#${string}` | ''}` | `${'/(app)'}${'/(authenticated)'}/trip/active${`?${string}` | `#${string}` | ''}` | `/trip/active${`?${string}` | `#${string}` | ''}` | `${'/(app)'}${'/(authenticated)'}/trip${`?${string}` | `#${string}` | ''}` | `/trip${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/__+not-found`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}/landing` | `/landing`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}/signin` | `/signin`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}${'/(authenticated)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}${'/(authenticated)'}/profile` | `/profile`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}${'/(authenticated)'}/trip/active` | `/trip/active`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}${'/(authenticated)'}/trip` | `/trip`; params?: Router.UnknownInputParams; };
    }
  }
}
