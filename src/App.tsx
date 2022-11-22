import { BrowserRouter } from 'react-router-dom';
import { SubscriptionFlow } from '@/components/SubscriptionFlow';
import { StoreProvider } from '@/store/context';

function App() {
    return (
        <BrowserRouter>
            <StoreProvider>
                <div className="subscription-module">
                    <header className="App-header">
                        <SubscriptionFlow />
                    </header>
                </div>
            </StoreProvider>
        </BrowserRouter>
    );
}

export default App;
