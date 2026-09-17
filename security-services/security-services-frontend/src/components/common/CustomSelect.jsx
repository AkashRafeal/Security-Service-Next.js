'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * CustomSelect - Luxury Tactical Navy & Gold Themed Dropdown
 * 
 * Drop-in replacement for HTML <select>.
 * Supports:
 * - `options`: Array of strings or { value, label, icon }
 * - `children`: <option value="...">Label</option> or <optgroup>
 * - `value` & `onChange`: Controlled mode (emits synthetic event { target: { name, value } })
 * - Full keyboard navigation (Arrows, Enter, Escape)
 * - Click outside detection
 */
export const CustomSelect = ({
  options = [],
  children,
  value,
  defaultValue,
  onChange,
  name,
  id,
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  error = false,
  className = '',
  dropdownClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [internalValue, setInternalValue] = useState(
    value !== undefined ? value : defaultValue !== undefined ? defaultValue : ''
  );
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const toggleDropdown = () => {
    if (disabled) return;
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setDropUp(spaceBelow < 250 && rect.top > 220);
    }
    setIsOpen((prev) => !prev);
  };

  // Synchronize internal value when controlled `value` changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Normalize options from either `options` prop or `children`
  const normalizedOptions = React.useMemo(() => {
    if (options && options.length > 0) {
      return options.map((opt) =>
        typeof opt === 'object' && opt !== null
          ? { value: String(opt.value), label: opt.label || opt.value, disabled: opt.disabled }
          : { value: String(opt), label: String(opt), disabled: false }
      );
    }

    const items = [];
    if (children) {
      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;

        if (child.type === 'option') {
          const val = child.props.value !== undefined ? String(child.props.value) : String(child.props.children);
          items.push({
            value: val,
            label: child.props.children || val,
            disabled: child.props.disabled || false,
          });
        } else if (child.type === 'optgroup') {
          items.push({
            isGroup: true,
            label: child.props.label,
          });
          React.Children.forEach(child.props.children, (subChild) => {
            if (React.isValidElement(subChild) && subChild.type === 'option') {
              const val = subChild.props.value !== undefined ? String(subChild.props.value) : String(subChild.props.children);
              items.push({
                value: val,
                label: subChild.props.children || val,
                disabled: subChild.props.disabled || false,
              });
            }
          });
        }
      });
    }
    return items;
  }, [options, children]);

  // Find currently selected option
  const selectedOption = normalizedOptions.find(
    (opt) => !opt.isGroup && String(opt.value) === String(internalValue)
  );

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  // Handle option selection
  const handleSelect = (optVal) => {
    setInternalValue(optVal);
    setIsOpen(false);

    if (onChange) {
      // Standard synthetic event compatible with react-hook-form and normal onChange handlers
      const event = {
        target: { name: name || id, value: optVal },
        currentTarget: { name: name || id, value: optVal },
        preventDefault: () => {},
        stopPropagation: () => {},
      };
      onChange(event);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (disabled) return;

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      const selectable = normalizedOptions.filter((opt) => !opt.isGroup && !opt.disabled);
      const currentIndex = selectable.findIndex((opt) => String(opt.value) === String(internalValue));
      let nextIndex;
      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < selectable.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : selectable.length - 1;
      }
      if (selectable[nextIndex]) {
        handleSelect(selectable[nextIndex].value);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full select-none">
      {/* Hidden native input for standard form submission / accessibility */}
      <input
        type="hidden"
        name={name}
        id={id}
        value={internalValue}
        required={required}
      />

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full bg-navy-950 text-white rounded-xl px-4 py-2.5 text-sm flex items-center justify-between gap-2 text-left transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'border-2 border-gold-500 shadow-gold-glow-subtle ring-1 ring-gold-500/40'
            : error
            ? 'border border-rose-500 focus:border-rose-500'
            : 'border border-slate-700/80 hover:border-slate-600 focus:border-gold-500'
        } ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-900' : ''} ${className}`}
      >
        <span className={`truncate block font-medium ${selectedOption ? 'text-white' : 'text-slate-400'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gold-400/80 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-gold-400' : ''
          }`}
        />
      </button>

      {/* Themed Dropdown Menu */}
      {isOpen && (
        <div
          ref={listRef}
          role="listbox"
          className={`absolute left-0 right-0 ${
            dropUp ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          } z-50 bg-navy-950/98 backdrop-blur-2xl border border-slate-700/90 rounded-xl shadow-2xl max-h-60 overflow-y-auto py-1.5 focus:outline-none animate-in fade-in zoom-in-95 duration-150 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-navy-950 ${dropdownClassName}`}
          style={{
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px 0 rgba(217, 119, 6, 0.1)',
          }}
        >
          {normalizedOptions.length === 0 ? (
            <div className="px-4 py-3 text-xs text-slate-400 text-center">
              No options available
            </div>
          ) : (
            normalizedOptions.map((opt, idx) => {
              if (opt.isGroup) {
                return (
                  <div
                    key={`group-${idx}`}
                    className="px-3 py-1.5 text-[11px] font-bold text-gold-400/90 uppercase tracking-wider bg-navy-900/60 border-y border-slate-800/60 my-1"
                  >
                    {opt.label}
                  </div>
                );
              }

              const isSelected = String(opt.value) === String(internalValue);

              return (
                <button
                  type="button"
                  key={`${opt.value}-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  disabled={opt.disabled}
                  onClick={() => !opt.disabled && handleSelect(opt.value)}
                  className={`w-full px-3.5 py-2.5 text-left text-sm flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-gold-500/20 text-gold-300 font-bold border-l-2 border-gold-500 pl-3'
                      : 'text-slate-200 hover:bg-gold-500/10 hover:text-white'
                  } ${opt.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <span className="truncate font-medium">{opt.label}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-gold-400 shrink-0" />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
