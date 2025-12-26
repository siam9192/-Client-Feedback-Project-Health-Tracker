'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import  { ReactNode } from 'react'

export const queryClient = new QueryClient();
interface Props {
    children:ReactNode
}
function Providers({children}:Props) {
  return (
       <QueryClientProvider client={queryClient}>
           {
            children
           }
       </QueryClientProvider>
  )
}

export default Providers