import { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Input } from '../ui/input';

const AnimatedSearchInput = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'flex items-center border border-primary/30 bg-primary/5 rounded-md px-3 py-2 space-x-2 transition-all duration-300',
        focused ? 'w-80 shadow-md ring-2 ring-primary/50' : 'w-60'
      )}
    >
      <Search className="h-4 w-4 text-primary" />
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="flex-1 rounded-none bg-transparent border-0 focus-visible:ring-0 text-sm p-0 h-auto"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

     {value && (
  <button
    type="button"
    onMouseDown={(e) => {
      e.preventDefault();  
      clearInput();
    }}
    className="text-muted-foreground hover:text-primary transition"
  >
    <X className="w-4 h-4" />
  </button>
)}
    </div>
  );
};

export default AnimatedSearchInput;