import {
  HeadContent,
  NavigateOptions,
  Scripts,
  ToOptions,
  createRootRouteWithContext,
  useRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import {RouterProvider} from 'react-aria-components';

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import Layout from '../components/Layout'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

declare module 'react-aria-components' {
  interface RouterConfig {
    href: ToOptions,
    routerOptions: Omit<NavigateOptions, keyof ToOptions>
  }
}

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'ノート - Nōto',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  let router = useRouter();
  return (
    <RouterProvider 
        navigate={(href, opts) => router.navigate({...href, ...opts})}
        useHref={href => router.buildLocation(href).href}>

    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Layout>
          {children}
        </Layout>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
          />
        <Scripts />
      </body>
    </html>
          </RouterProvider>
  )
}
