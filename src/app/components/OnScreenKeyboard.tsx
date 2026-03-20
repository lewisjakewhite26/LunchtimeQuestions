import { useState } from 'react';
import { motion } from 'motion/react';
import { Delete, X } from 'lucide-react';

interface OnScreenKeyboardProps {
  value: string;
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
  onClose: () => void;
}

const KEYBOARD_LAYOUT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

export default function OnScreenKeyboard({ value, onKeyPress, onBackspace, onSpace, onClose }: OnScreenKeyboardProps) {
  const [isShiftEnabled, setIsShiftEnabled] = useState(false);

  const shouldAutoCapitalize = (text: string) => {
    if (!text.trim()) return true;
    return /[.!?]\s*$/.test(text);
  };

  const handleLetterPress = (key: string) => {
    const useUppercase = isShiftEnabled || shouldAutoCapitalize(value);
    onKeyPress(useUppercase ? key.toUpperCase() : key);
    if (isShiftEnabled) {
      setIsShiftEnabled(false);
    }
  };

  const isCapsActive = isShiftEnabled || shouldAutoCapitalize(value);

  return (
    <motion.div
      className="fixed bottom-1 left-1/2 z-50 w-[min(96vw,860px)] -translate-x-1/2 rounded-3xl border border-white/35 bg-white/20 p-3 pb-4 shadow-[0_12px_40px_rgba(31,41,55,0.25)] backdrop-blur-xl"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <div className="mx-auto">
        {/* Close Button */}
        <div className="mb-2 flex justify-end">
          <motion.button
            onMouseDown={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/40 bg-white/30 text-[#4a4a5e] shadow-[0_4px_16px_rgba(31,41,55,0.15)] transition-all"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 8px 18px rgba(31,41,55,0.2)'
            }}
            whileTap={{
              scale: 0.95,
              boxShadow: 'inset 0 2px 8px rgba(31,41,55,0.2)'
            }}
          >
            <X className="h-4 w-4" />
          </motion.button>
        </div>

        <div className="space-y-2">
          {KEYBOARD_LAYOUT.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center gap-2"
              style={{ paddingLeft: rowIndex === 1 ? '1rem' : rowIndex === 2 ? '2rem' : '0' }}
            >
              {row.map((key) => (
                <motion.button
                  key={key}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleLetterPress(key);
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/40 bg-white/30 text-base font-medium text-[#3f4050] shadow-[0_4px_14px_rgba(31,41,55,0.14)] transition-all"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 8px 18px rgba(31,41,55,0.2)'
                  }}
                  whileTap={{
                    scale: 0.95,
                    boxShadow: 'inset 0 2px 8px rgba(31,41,55,0.2)'
                  }}
                >
                  {isCapsActive ? key.toUpperCase() : key}
                </motion.button>
              ))}
            </div>
          ))}

          {/* Bottom Row with Shift, Space and Backspace */}
          <div className="flex justify-center gap-2 pt-1">
            <motion.button
              onMouseDown={(e) => {
                e.preventDefault();
                setIsShiftEnabled((prev) => !prev);
              }}
              className={`flex h-11 w-20 items-center justify-center rounded-2xl border text-sm font-medium shadow-[0_4px_14px_rgba(31,41,55,0.14)] transition-all ${
                isShiftEnabled
                  ? 'border-[#9fbdf8] bg-[#dce8ff]/70 text-[#334155]'
                  : 'border-white/40 bg-white/30 text-[#3f4050]'
              }`}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 8px 18px rgba(31,41,55,0.2)'
              }}
              whileTap={{
                scale: 0.98,
                boxShadow: 'inset 0 2px 8px rgba(31,41,55,0.2)'
              }}
            >
              {isCapsActive ? 'SHIFT' : 'shift'}
            </motion.button>

            <motion.button
              onMouseDown={(e) => {
                e.preventDefault();
                onSpace();
              }}
              className="flex h-11 flex-1 max-w-sm items-center justify-center rounded-2xl border border-white/40 bg-white/30 text-sm font-medium text-[#3f4050] shadow-[0_4px_14px_rgba(31,41,55,0.14)] transition-all"
              whileHover={{
                scale: 1.02,
                boxShadow: '0 8px 18px rgba(31,41,55,0.2)'
              }}
              whileTap={{
                scale: 0.98,
                boxShadow: 'inset 0 2px 8px rgba(31,41,55,0.2)'
              }}
            >
              space
            </motion.button>

            <motion.button
              onMouseDown={(e) => {
                e.preventDefault();
                onBackspace();
              }}
              className="flex h-11 w-14 items-center justify-center rounded-2xl border border-white/40 bg-white/30 shadow-[0_4px_14px_rgba(31,41,55,0.14)] transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 18px rgba(31,41,55,0.2)'
              }}
              whileTap={{
                scale: 0.95,
                boxShadow: 'inset 0 2px 8px rgba(31,41,55,0.2)'
              }}
            >
              <Delete className="h-5 w-5 text-[#4a4a5e]" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}