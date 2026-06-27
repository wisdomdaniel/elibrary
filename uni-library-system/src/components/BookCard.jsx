import { Star, Clock } from 'lucide-react';

const BookCard = ({ book }) => {
  return (
    <div className="flex-none w-56 bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group cursor-pointer">
      <div className="relative h-64 overflow-hidden p-3">
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
        </div>
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-black text-gray-900 shadow-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          {book.rating}
        </div>
      </div>
      <div className="px-5 pb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[10px] font-black text-primary mb-3 uppercase tracking-tighter">
          {book.category}
        </span>
        <h3 className="font-extrabold text-gray-900 text-sm mb-1 line-clamp-2 leading-tight min-h-[2.5rem]">
          {book.title}
        </h3>
        <p className="text-[11px] font-bold text-gray-400 mb-3">{book.code}</p>

        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 border-t border-gray-50 pt-3">
          <Clock className="h-3 w-3" />
          {book.time}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
