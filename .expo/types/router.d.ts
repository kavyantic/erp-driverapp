/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(app)` | `/(app)/` | `/(app)/(authenticated)` | `/(app)/(authenticated)/` | `/(app)/(authenticated)/explore` | `/(app)/explore` | `/(app)/landing` | `/(app)/signin` | `/(authenticated)` | `/(authenticated)/` | `/(authenticated)/explore` | `/_sitemap` | `/explore` | `/landing` | `/signin`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
