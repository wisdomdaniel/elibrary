import { Star, Clock, Download } from 'lucide-react';

const BookCard = ({ book, onClick }) => {
  const handleDownload = (e) => {
    e.stopPropagation();

    // Determine file extension and MIME type based on original uploaded file or default to .docx
    let fileName = book.fileName || `${book.code || 'Material'}_${book.title.replace(/\s+/g, '_')}.docx`;
    let mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    if (fileName.endsWith('.pdf')) {
      mimeType = 'application/pdf';
    } else if (fileName.endsWith('.docx')) {
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (fileName.endsWith('.pptx')) {
      mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    } else if (!fileName.includes('.')) {
      fileName += '.docx';
    }

    const content = book.fileContent || `[UNIBEN E-LIBRARY MATERIAL]\nTitle: ${book.title}\nCourse Code: ${book.code}\nAuthor: ${book.author}\nFaculty: ${book.faculty || 'General'}\nDepartment: ${book.department || 'General'}\n\nDescription:\n${book.description || 'Academic study material provided by UNIBEN E-Library System.'}`;

    const blob = new Blob([content], { type: mimeType });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      onClick={onClick}
      className="relative flex-none w-56 bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden p-3">
        <div className="w-full h-full rounded-xl overflow-hidden relative border border-slate-50">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors"></div>
        </div>
        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-[10px] font-black text-slate-900 shadow-sm border border-slate-100">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          {book.rating}
        </div>
      </div>
      <div className="px-5 pb-5 flex-1 flex flex-col">
        <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 text-[10px] font-black text-slate-700 mb-3 uppercase tracking-tighter">
          {book.category}
        </span>
        <h3 className="font-extrabold text-slate-900 text-sm mb-1 line-clamp-2 leading-tight min-h-[2.5rem]">
          {book.title}
        </h3>
        <p className="text-[11px] font-bold text-slate-400 mb-3">{book.code}</p>

        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 border-t border-slate-50 pt-3 mt-auto">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-slate-400" />
            {book.time}
          </div>
          <button
            onClick={handleDownload}
            title="Download material"
            className="p-1.5 rounded-lg bg-slate-50 hover:bg-primary hover:text-white text-slate-600 transition-all"
          >
            <Download size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
