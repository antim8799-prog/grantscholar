import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ScholarshipCard } from '../components/ScholarshipCard';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  FilterX
} from 'lucide-react';
import { ScholarshipCategory, EducationLevel } from '../types';

export const Explorer: React.FC = () => {
  const { scholarships } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEducation, setSelectedEducation] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [maxIncomeFilter, setMaxIncomeFilter] = useState<string>('All');
  const [minAmountFilter, setMinAmountFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('deadline-asc');

  const categories: (ScholarshipCategory | 'All')[] = [
    'All',
    'Government',
    'Private',
    'Merit-based',
    'Need-based',
    'Minority',
    'Technical Education',
    'Research'
  ];

  const educationLevels: (EducationLevel | 'All')[] = [
    'All',
    'Higher Secondary (11th-12th)',
    'Diploma / Polytechnic',
    'Undergraduate',
    'Postgraduate',
    'Doctoral / PhD'
  ];

  const states = [
    'All',
    'All India / National',
    'Maharashtra',
    'Karnataka',
    'Tamil Nadu',
    'Gujarat',
    'Delhi NCR'
  ];

  const filteredScholarships = useMemo(() => {
    return scholarships
      .filter((sch) => {
        const matchesQuery =
          sch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sch.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sch.field.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCat =
          selectedCategory === 'All' || sch.category === selectedCategory;

        const matchesEdu =
          selectedEducation === 'All' || sch.educationLevel === selectedEducation;

        const matchesState =
          selectedState === 'All' ||
          sch.state === selectedState ||
          sch.state === 'All India / National';

        const matchesIncome =
          maxIncomeFilter === 'All' || sch.maxIncome <= parseInt(maxIncomeFilter, 10);

        const matchesMinAmount =
          minAmountFilter === 'All' || sch.amount >= parseInt(minAmountFilter, 10);

        return (
          matchesQuery &&
          matchesCat &&
          matchesEdu &&
          matchesState &&
          matchesIncome &&
          matchesMinAmount
        );
      })
      .sort((a, b) => {
        if (sortBy === 'deadline-asc') {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        if (sortBy === 'amount-desc') {
          return b.amount - a.amount;
        }
        if (sortBy === 'amount-asc') {
          return a.amount - b.amount;
        }
        return 0;
      });
  }, [
    scholarships,
    searchQuery,
    selectedCategory,
    selectedEducation,
    selectedState,
    maxIncomeFilter,
    minAmountFilter,
    sortBy
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedEducation('All');
    setSelectedState('All');
    setMaxIncomeFilter('All');
    setMinAmountFilter('All');
    setSortBy('deadline-asc');
  };

  const isFiltered =
    Boolean(searchQuery) ||
    selectedCategory !== 'All' ||
    selectedEducation !== 'All' ||
    selectedState !== 'All' ||
    maxIncomeFilter !== 'All' ||
    minAmountFilter !== 'All' ||
    sortBy !== 'deadline-asc';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Explore Scholarships & Fellowships
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Filter verified government and institutional grant programs by education level, category, and state domicile
        </p>
      </div>

      {/* Filter and Search Control Panel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by scholarship title, ministry, field of study, or keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Education Level
            </label>
            <select
              value={selectedEducation}
              onChange={(e) => setSelectedEducation(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {educationLevels.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Domicile State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Income Cap
            </label>
            <select
              value={maxIncomeFilter}
              onChange={(e) => setMaxIncomeFilter(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="All">All Incomes</option>
              <option value="350000">≤ ₹3.5 LPA</option>
              <option value="500000">≤ ₹5.0 LPA</option>
              <option value="800000">≤ ₹8.0 LPA</option>
              <option value="1200000">≤ ₹12.0 LPA</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Min. Grant Value
            </label>
            <select
              value={minAmountFilter}
              onChange={(e) => setMinAmountFilter(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="All">Any Amount</option>
              <option value="30000">≥ ₹30,000</option>
              <option value="60000">≥ ₹60,000</option>
              <option value="100000">≥ ₹1,00,000</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="deadline-asc">Deadline: Soonest</option>
              <option value="amount-desc">Grant: High to Low</option>
              <option value="amount-asc">Grant: Low to High</option>
            </select>
          </div>
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-900">{filteredScholarships.length}</strong>{' '}
            of {scholarships.length} scholarship opportunities
          </div>
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="text-indigo-700 hover:text-indigo-900 font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Scholarship Cards */}
      {filteredScholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((sch) => (
            <ScholarshipCard key={sch.id} scholarship={sch} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <FilterX className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">
            No Matching Scholarships Found
          </h3>
          <p className="text-xs text-slate-500">
            No opportunities match your current filter parameters. Try loosening income limits or state domicile.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-sm transition"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
