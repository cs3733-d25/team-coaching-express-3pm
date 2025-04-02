import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { FeedBackForm } from './components/FeedBackForm.tsx';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <div />,
            element: <Root />,
            children: [],
        },
    ]);

    return <RouterProvider router={router} />;
    function Root() {
        return (
            <div className="w-full grid justify-items-center">
                <div className={'flex flex-col gap-5'}>
                    {<FeedBackForm></FeedBackForm>}
                    {/*<FeedbackGetter/>*/}
                </div>
                <Outlet />
            </div>
        );
    }
}

export default App;
