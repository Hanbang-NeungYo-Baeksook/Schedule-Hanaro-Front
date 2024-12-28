import { RouterProvider } from 'react-router-dom';

import { useRouter } from '@/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

function App() {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
