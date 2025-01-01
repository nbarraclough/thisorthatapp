'use client'

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Comparison from './components/Comparison'
import Results from './components/Results'

export default function Home() {
  const [options, setOptions] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevWinner, setPrevWinner] = useState<string | null>(null)
  const [winners, setWinners] = useState<string[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showAddMore, setShowAddMore] = useState(false)

  const loadOptions = useCallback(() => {
    const newOptions = input.split('\n').map(option => option.trim()).filter(Boolean)
    setOptions(prev => [...prev, ...newOptions])
    setInput('')
    setShowComparison(true)
    setShowAddMore(false)
  }, [input])

  const handleSelection = useCallback((winner: string) => {
    setWinners(prev => [...prev, winner])
    setPrevWinner(winner)
    setCurrentIndex(prev => prev + 1)

    if (currentIndex + 1 >= options.length - 1) {
      setShowResults(true)
      setShowComparison(false)
    }
  }, [currentIndex, options.length])

  const reset = useCallback(() => {
    setOptions([])
    setInput('')
    setCurrentIndex(0)
    setPrevWinner(null)
    setWinners([])
    setShowComparison(false)
    setShowResults(false)
    setShowAddMore(false)
  }, [])

  const addMoreChoices = useCallback(() => {
    setShowAddMore(true)
    setShowResults(false)
  }, [])

  const getCurrentOptions = useCallback(() => {
    if (prevWinner === null) {
      return [options[0], options[1]]
    } else {
      return [prevWinner, options[currentIndex + 1]]
    }
  }, [prevWinner, options, currentIndex])

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-center">Figure out what you actually like</h1>
      
      {(!showComparison && !showResults) || showAddMore ? (
        <Card className="w-full max-w-2xl mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              {showAddMore ? "Add More Choices" : "Enter your choices"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder={`Enter options, one per line. 
Example:
Pizza
Burger
Sushi
Tacos`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={10}
              className="mb-4"
            />
            <Button onClick={loadOptions} className="w-full">
              {showAddMore ? "Add Choices" : "Start comparing"}
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {showComparison && (
        <Comparison 
          options={getCurrentOptions()}
          onSelect={handleSelection}
        />
      )}

      {showResults && (
        <Results 
          options={options}
          winners={winners}
        />
      )}

      <div className="flex justify-center space-x-4 mt-6 w-full max-w-2xl">
        <Button onClick={reset} className="flex-1 py-6 text-xl" variant="outline">
          Restart
        </Button>
        <Button onClick={addMoreChoices} className="flex-1 py-6 text-xl" variant="outline">
          Add more choices
        </Button>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Built with ❤️ by Nick & v0
      </div>
    </div>
  )
}

