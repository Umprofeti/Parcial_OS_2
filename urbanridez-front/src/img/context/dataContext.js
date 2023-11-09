'use client'
import React from 'react'
import { ApolloLink, HttpLink } from '@apollo/client';
import {ApolloNextAppProvider, NextSSRApolloClient, NextSSRInMemoryCache, SSRMultipartLink} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient (){
  const httpLink = new HttpLink({
    uri:'http://localhost:3040/api/graphql'
  });
  return new NextSSRApolloClient({
    cache:new NextSSRInMemoryCache(),
    link: typeof window === 'undefined' ? ApolloLink.from([
      new SSRMultipartLink({
        stripDefer:true,
      }),
      httpLink,
    ])
    :httpLink
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
