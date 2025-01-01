import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

type ComparisonProps = {
  options: [string, string];
  onSelect: (winner: string) => void;
}

export default function Comparison({ options, onSelect }: ComparisonProps) {
  const [randomizedOptions, setRandomizedOptions] = useState<[string, string]>(options)

  useEffect(() => {
    // Randomize the order of options
    setRandomizedOptions(Math.random() < 0.5 ? options : [options[1], options[0]])
  }, [options])

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Which do you prefer?</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {randomizedOptions.map((option, index) => (
          <motion.div
            key={option}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Button 
              onClick={() => onSelect(option)}
              className="w-full py-8 text-xl"
              variant="outline"
            >
              {option}
            </Button>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}

