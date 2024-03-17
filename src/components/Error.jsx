import { useLocation } from 'react-router-dom'

const Error = ({error}) => {

  const location = useLocation();
  const { pathname } = location;

  const reload = () => {
    window.location.reload(pathname)
  };

  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-xl font-black text-gray-900">Something went wrong!</h1>

        <p className="mt-4 text-gray-500">{error.message}</p>

        <button
          onClick={reload}
          className="mt-6 inline-block rounded bg-indigo-400 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

export default Error