'use client'

import { useState, useEffect } from 'react'
import Display from '@/components/Display'
import Keypad from '@/components/Keypad'
import History from '@/components/History'

export default function Calculator() {
  const [display, setDisplay] = useState('00:00')
  const [operation, setOperation] = useState<'+' | '-' | null>(null)
  const [buffer, setBuffer] = useState('')
  const [history, setHistory] = useState<string[]>([])

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key
    if (/[0-9]/.test(key)) {
      handleInput(key)
    } else if (key === '+' || key === '-') {
      handleOperation(key as '+' | '-')
    } else if (key === 'Enter') {
      handleEquals()
    } else if (key === 'Backspace') {
      handleClear()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [display, operation, buffer])

  const handleInput = (value: string) => {
    if (buffer.length < 4) {
      setBuffer(buffer + value)
    }
    else {
      const newBuffer = buffer.substring(1);
      setBuffer(newBuffer + value)
    }
  }

  const handleOperation = (op: '+' | '-') => {
    if (buffer) {
      calculate()
    }
    setOperation(op)
  }

  const handleEquals = () => {
    calculate()
    setOperation(null)
  }

  const handleClear = () => {
    setDisplay('00:00')
    setOperation(null)
    setBuffer('')
  }

  const calculate = () => {
    if (buffer) {
      const bufferFormated = formatTime(buffer)
      const currentMinutes = timeToMinutes(display)
      const inputMinutes = timeToMinutes(bufferFormated)
      let result = 0
      if (operation === '+') {
        result = currentMinutes + inputMinutes
        setHistory(current => {
          if (`${display} ${operation} ${bufferFormated} = ${minutesToTime(result)}` !== current[current.length - 1] )
            current.push(`${display} ${operation} ${bufferFormated} = ${minutesToTime(result)}`)
          return current;
        })
      } else if (operation === '-') {
        result = currentMinutes - inputMinutes
        setHistory(current => {
          if (`${display} ${operation} ${bufferFormated} = ${minutesToTime(result)}` !== current[current.length - 1] )
            current.push(`${display} ${operation} ${bufferFormated} = ${minutesToTime(result)}`)
          return current;
        })
      } else {
        result = inputMinutes
      }
      setDisplay(minutesToTime(result))
      setBuffer('')
    }
  }

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const minutesToTime = (totalMinutes: number): string => {
    const sign = totalMinutes < 0 ? '-' : ''
    const absMinutes = Math.abs(totalMinutes)
    const hours = Math.floor(absMinutes / 60)
    const minutes = absMinutes % 60
    return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  const formatTime = (input: string): string => {
    const padded = input.padStart(4, '0')
    return `${padded.slice(0, 2)}:${padded.slice(2)}`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <History history={history}/>
        <Display value={display} buffer={buffer} operation={operation} />
        <Keypad
          onInput={handleInput}
          onOperation={handleOperation}
          onEquals={handleEquals}
          onClear={handleClear}
        />
      </div>
    </div>
  )
}

