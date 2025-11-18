import { useEffect, useReducer, useState } from "react";

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
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setError("خطا در گرفتن دیتا");
        setLoading(false);
      });
  }, []);

  if (loading)
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

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-200">
        <div className="text-center p-8 bg-white/35 rounded-lg shadow-lg border-2 border-red-400">
          <svg
            xmlns="http://www.w3.org/200/svg"
            className="h-16 w-16 text-red-300 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11 0118 0z"
            />
          </svg>
          <p className="text-red-600 text-lg font-medium">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-700 via-blue-500 to-gray-600 p-6">
      <h1 className="text-3xl font-bold text-indigo-100 text-center mb-8">
        لیست کاربران
      </h1>
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((user) => (
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

// part:345- 6:00