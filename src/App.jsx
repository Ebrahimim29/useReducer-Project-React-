import { useEffect, useState } from "react"

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-500">
      <div className="animate-pulse flex flex-col items-center">
        <div className="rounded-full h-16 w-16 bg-amber-500 mb-4"></div>
        <p className="text-indigo-600 font-semibold text-xl"> در حال دریافت اطلاعات ...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-red-500">
      <div className="text-center p-8 bg-white/35 rounded-lg shadow-lg border-2 border-red-800">
        <svg xmlns="http://www.w3.org/200/svg" className="h-16 w-16 text-red-900 mx-auto mb-4" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11 0118 0z"/>
        </svg>
        <p className="text-red-600 text-lg font-medium">{error}</p>
      </div>
    </div>
    // part 345(Reducer)- 4:17
  )
};

export default App;