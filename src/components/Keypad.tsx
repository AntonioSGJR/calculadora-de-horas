interface KeypadProps {
    onInput: (value: string) => void
    onOperation: (op: '+' | '-') => void
    onEquals: () => void
    onClear: () => void
  }
  
  export default function Keypad({ onInput, onOperation, onEquals, onClear }: KeypadProps) {
    const buttons = [
      '7', '8', '9', '+',
      '4', '5', '6', '-',
      '1', '2', '3', 'C',
      '=', '0', '00'
    ]
  
    return (
      <div className="grid grid-cols-4 gap-2 mt-4">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === '+' || btn === '-') onOperation(btn)
              else if (btn === '=') onEquals()
              else if (btn === 'C') onClear()
              else onInput(btn)
            }}
            className={`p-4 text-xl font-bold rounded-lg ${
              btn === '=' ? 'col-span-2 bg-blue-500 text-white' :
              btn === 'C' ? 'bg-red-500 text-white' :
              isNaN(Number(btn)) ? 'bg-gray-300' : 'bg-gray-200'
            } hover:opacity-80 transition-opacity`}
          >
            {btn}
          </button>
        ))}
      </div>
    )
  }
  
  