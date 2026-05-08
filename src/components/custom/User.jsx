function User({ value, onChange }) {
  return (
    <div className="flex flex-col items-start w-full gap-1.5">
      <label 
        htmlFor="us-name" 
        className="text-sm font-semibold text-slate-700 ml-0.5"
      >
        Username
      </label>
      <input 
        type="text" 
        placeholder="e.g. madhavan_r" 
        id="us-name" 
        value={value} 
        onChange={onChange} 
        className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm shadow-sm transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"  
      />
    </div>
  );
}

export default User;