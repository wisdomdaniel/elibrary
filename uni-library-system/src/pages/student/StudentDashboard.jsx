import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';
import BookCard from '../../components/BookCard';
import { ChevronRight } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { searchQuery, results } = useSearch();

  const categories = ["All", "Technology", "Design", "Science", "History", "Business"];

  // If searching, show search results
  if (searchQuery.trim()) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Search Results for "{searchQuery}"</h2>
          <p className="text-gray-500">{results.length} materials found</p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {results.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ChevronRight className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No materials found</h3>
            <p className="text-gray-500">Try searching for something else</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative h-64 rounded-[2rem] bg-gradient-to-r from-primary to-indigo-600 overflow-hidden flex items-center px-12 text-white">
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold mb-4">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-indigo-100 text-lg">
            "The more that you read, the more things you will know. The more that you learn, the more places you'll go."
          </p>
          <p className="mt-4 font-semibold">— Dr. Seuss</p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 blur-2xl"></div>
      </section>

      {/* Categories Horizontal Scroll */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
          <button className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            See all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                cat === 'All'
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-white text-gray-600 border border-gray-100 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Recent Materials Carousel */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Materials</h2>
          <div className="flex gap-2">
            <button className="h-10 w-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
            <button className="h-10 w-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x">
          {results.map((book) => (
            <div key={book.id} className="snap-start">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Rated This Week</h2>
          <div className="space-y-4">
            {results.slice(0, 3).map((book) => (
              <div key={book.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="h-16 w-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 truncate group-hover:text-primary transition-colors">{book.title}</h4>
                  <p className="text-sm text-gray-500">{book.author}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm font-bold text-gray-900 justify-end">
                    <ChevronRight className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {book.rating}
                  </div>
                  <p className="text-xs text-gray-400">2.4k reads</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-900 p-8 rounded-[2rem] text-white relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Reading Challenge</h2>
              <p className="text-indigo-200">You've read 12 books this month. 3 more to reach your goal!</p>
            </div>
            <div className="mt-8">
              <div className="flex justify-between text-sm mb-2">
                <span>80% complete</span>
                <span>12/15 books</span>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[80%] rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"></div>
              </div>
            </div>
            <button className="mt-8 w-full py-4 bg-white text-indigo-900 font-bold rounded-2xl hover:bg-indigo-50 transition-colors">
              View Progress
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
