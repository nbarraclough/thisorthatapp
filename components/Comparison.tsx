import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

type ComparisonProps = {
  options: [string, string];
  onSelect: (winner: string) => void;
  onAnimationComplete: () => void;
}

export default function Comparison({ options, onSelect, onAnimationComplete }: ComparisonProps) {
  const [currentOptions, setCurrentOptions] = useState<[string, string]>(options)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  useEffect(() => {
    setCurrentOptions(options)
    setSelectedOption(null)
  }, [options])

  const handleSelection = (option: string) => {
    setSelectedOption(option)
    setTimeout(() => {
      onSelect(option)
      onAnimationComplete()
    }, 300)
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg border-0 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/70">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Which do you prefer?</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative flex flex-col gap-4">
          {currentOptions.map((option) => (
            <Button 
              key={option}
              onClick={() => handleSelection(option)}
              className="w-full py-4 sm:py-8 text-lg sm:text-xl whitespace-normal transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm relative overflow-hidden"
              variant="outline"
              disabled={selectedOption !== null}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={option}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {option}
                </motion.span>
              </AnimatePresence>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

