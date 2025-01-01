'use client'

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Comparison from './components/Comparison'
import Results from './components/Results'
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const [options, setOptions] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevWinner, setPrevWinner] = useState<string | null>(null)
  const [winners, setWinners] = useState<string[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showAddMore, setShowAddMore] = useState(false)
  const { toast } = useToast()

  const loadOptions = useCallback(() => {
    const newOptions = input.split('\n').map(option => option.trim()).filter(Boolean)
    if (newOptions.length < 2) {
      toast({
        title: "Not enough choices",
        description: "Please enter at least two choices to start comparing.",
        variant: "destructive",
      })
      return
    }
    setOptions(prev => [...prev, ...newOptions])
    setInput('')
    setShowComparison(true)
    setShowAddMore(false)
  }, [input, toast])

  const handleSelection = useCallback((winner: string) => {
    setWinners(prev => [...prev, winner])
    setPrevWinner(winner)
  }, [])

  const handleAnimationComplete = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev + 2 >= options.length) {
        setShowResults(true)
        setShowComparison(false)
        return prev
      }
      return prev + 1
    })
  }, [options.length])

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
    setInput(options.join('\n'))
    setCurrentIndex(0)
    setPrevWinner(null)
    setWinners([])
    setShowComparison(false)
    setShowResults(false)
    setShowAddMore(false)
  }, [options])

  const getCurrentOptions = useCallback(() => {
    if (prevWinner === null) {
      return [options[0], options[1]]
    } else {
      return [prevWinner, options[currentIndex + 1]]
    }
  }, [prevWinner, options, currentIndex])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-200 dark:to-slate-400 leading-[1.3] py-1">
          Figure out what you actually like
        </h1>

        {(!showComparison && !showResults) || showAddMore ? (
          <Card className="w-full max-w-2xl mb-6 shadow-lg border-0 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/70">
            <CardHeader className="relative">
              <CardTitle className="text-2xl">
                {showAddMore ? "Add More Choices" : "Enter your choices, one per line"}
              </CardTitle>
              {input.trim() && (
                <Button
                  onClick={reset}
                  variant="ghost"
                  size="sm"
                  className="absolute right-6 top-6 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  <span className="text-lg">🔄</span>
                  <span className="sr-only">Reset</span>
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={`Pizza
Burger
Sushi
Tacos`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={10}
                className="mb-4 bg-white dark:bg-slate-950"
              />
              <Button
                onClick={loadOptions}
                className="w-full py-6 text-xl transition-all hover:scale-[1.01] active:scale-[0.99] bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                {showAddMore ? "Add Choices" : "Start comparing"}
              </Button>
            </CardContent>
          </Card>
        ) : null}

        {showComparison && (
          <>
            <Comparison
              options={getCurrentOptions()}
              onSelect={handleSelection}
              onAnimationComplete={handleAnimationComplete}
            />
            <div className="flex justify-center space-x-4 mt-6 w-full max-w-2xl">
              <Button
                onClick={reset}
                className="flex-1 py-6 text-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                variant="outline"
              >
                Restart
              </Button>
              <Button
                onClick={addMoreChoices}
                className="flex-1 py-6 text-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                variant="outline"
              >
                Add more choices
              </Button>
            </div>
          </>
        )}

        {showResults && (
          <>
            <Results
              options={options}
              winners={winners}
            />
            <div className="flex justify-center space-x-4 mt-6 w-full max-w-2xl">
              <Button
                onClick={reset}
                className="flex-1 py-6 text-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                variant="outline"
              >
                Restart
              </Button>
              <Button
                onClick={addMoreChoices}
                className="flex-1 py-6 text-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                variant="outline"
              >
                Add more choices
              </Button>
            </div>
          </>
        )}

        <div className="mt-8 text-center space-y-2">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Built with ❤️ by Nick & v0
          </div>
          <a 
            href="https://github.com/nbarraclough/thisorthatapp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="View source on GitHub"
          >
            <svg viewBox="0 0 16 16" className="w-6 h-6" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

