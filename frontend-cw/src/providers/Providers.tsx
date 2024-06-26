'use client'

import type { AppProps } from "next/app";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React, {PropsWithChildren} from "react";
import {Provider} from "react-redux";
import {persistor, store} from "@/store/store";
import {PersistGate} from 'redux-persist/integration/react'
import AuthProvider from "@/providers/auth-provider/AuthProvider";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

export default function Providers({children}: PropsWithChildren<unknown>) {
    return <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </PersistGate>
        </Provider>
    </QueryClientProvider>
}
