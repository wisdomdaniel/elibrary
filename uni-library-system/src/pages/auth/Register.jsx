import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authServices } from '../../services/mockData';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    matNo: '',
    email: '',
    faculty: 'Sciences',
    department: 'Computer Science',
    level: '300'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const faculties = [
    'Sciences',
    'Engineering',
    'Arts & Humanities',
    'Social Sciences',
    'Law',
    'Medicine'
  ];

  const levelOptions = ['100', '200', '300', '400', '500'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Password is automatically set to Mat No
      const registrationData = {
        ...formData,
        password: formData.matNo,
        role: 'student'
      };

      const user = await authServices.register(registrationData);
      login(user);
      navigate('/student');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8 bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-center text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Student Registration
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400 font-bold">
            Create your account to access library materials
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 px-4 text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                Matriculation Number (Mat No)
              </label>
              <input
                type="text"
                name="matNo"
                required
                value={formData.matNo}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 px-4 text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="e.g. RUN/CSC/22/1042"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 px-4 text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="student@uni.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                Faculty
              </label>
              <select
                name="faculty"
                value={formData.faculty}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 px-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer"
              >
                {faculties.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                required
                value={formData.department}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 px-4 text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Computer Science"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
              Academic Level
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 px-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer"
            >
              {levelOptions.map(l => (
                <option key={l} value={l}>{l} Level</option>
              ))}
            </select>
          </div>

          <div className="p-3.5 bg-indigo-50/50 dark:bg-slate-800/50 rounded-xl border border-indigo-100 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400">
            💡 Note: Your default password for sign-in will be set to your <strong>Matriculation Number</strong>.
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3.5 px-4 text-sm font-black text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition-all active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register Account'}
          </button>

          <p className="text-center text-sm font-bold text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-black">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
