import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SubscriptionFlow } from '@/components/SubscriptionFlow';
import { StoreProvider } from '@/store/context';

const queryClient = new QueryClient();

function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <StoreProvider>
                    <div className="subscription-module">
                        <header className="App-header">
                            <SubscriptionFlow />
                        </header>
                    </div>
                </StoreProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
