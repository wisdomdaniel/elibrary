import { Star } from 'lucide-react';

const BookCard = ({ book }) => {
  return (
    <div className="flex-none w-64 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="relative h-80 overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-gray-900">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          {book.rating}
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">{book.category}</p>
        <h3 className="font-bold text-gray-900 mb-1 truncate">{book.title}</h3>
        <p className="text-sm text-gray-500">{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
