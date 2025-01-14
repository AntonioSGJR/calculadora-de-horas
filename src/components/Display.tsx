interface DisplayProps {
    value: string
    buffer: string
    operation: '+' | '-' | null
  }
  
  export default function Display({ value, buffer, operation }: DisplayProps) {
    return (
      <div className="bg-gray-800 text-white p-4 rounded-t-lg">
        <div className="text-right text-2xl font-mono">{value}</div>
        <div className="text-right text-lg font-mono text-gray-400">
          {operation} {buffer ? formatTime(buffer) : ''}
        </div>
      </div>
    )
  }
  
  function formatTime(input: string): string {
    const padded = input.padStart(4, '0')
    return `${padded.slice(0, 2)}:${padded.slice(2)}`
  }
  
  