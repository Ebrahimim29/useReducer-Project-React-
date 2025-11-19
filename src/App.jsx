import { useEffect, useReducer, //useState
 } from "react";

const initialState = { data: null, loading: true, error: null };

const dataReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { loading: true, data: null, error: null };
    case "FETCH_SUCCESS":
      return { loading: false, data: action.payload, error: null };
    case "FETCH_ERROR":
      return { loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

const App = () => {
  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useReducer : زمانی که مقدار دهی state ها نیاز به مدیریت دارد و state ها به هم وابسته هستند به ما کمک می کند
  const [state, dispatch] = useReducer(dataReducer, initialState)

  useEffect(() => {
    // setLoading(true);
    dispatch({type:"FETCH_START"});

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        // setData(data);
        // setLoading(false);
        dispatch({type:"FETCH_SUCCESS", payload:data})
      })
      .catch(() =>
        dispatch({type:"FETCH_ERROR" , payload:"خطا در گرفتن دیتا"}));

      // .catch((err) => {
        // console.log(err);

        // setError("خطا در گرفتن دیتا");
        // setLoading(false);
      // });
  }, []);

  if (state.loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-50 to-indigo-500">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full h-16 w-16 bg-amber-500 mb-4"></div>
          <p className="text-indigo-600 font-semibold text-xl">
            {" "}
            در حال دریافت اطلاعات ...
          </p>
        </div>
      </div>
    );

  if (state.error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-200">
        <div className="text-center p-8 bg-white/35 rounded-lg shadow-lg border-2 border-red-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-red-600 text-lg font-medium">{state.error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-700 via-blue-500 to-gray-600 p-6">
      <h1 className="text-3xl font-bold text-indigo-100 text-center mb-8">
        لیست کاربران
      </h1>
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {state.data.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <div className="bg-linear-to-r from-indigo-500 to-purple-600 py-4 px-6">
              <h2 className="text-xl font-semibold text-white">{user.name}</h2>
              <p className="text-indigo-300">@{user.username}</p>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center text-gray-700">
                
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-amber-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center text-pink-500">
                <span>{user.website}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

