import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ResultsProps = {
  options: string[];
  winners: string[];
}

export default function Results({ options, winners }: ResultsProps) {
  const counts = winners.reduce((acc, winner) => {
    acc[winner] = (acc[winner] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const sortedOptions = [...options].sort((a, b) => (counts[b] || 0) - (counts[a] || 0))

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-200 dark:to-slate-400">
        Your Preferences
      </h2>
      <Card className="mb-6 shadow-lg border-0 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/70">
        <CardHeader>
          <CardTitle className="text-2xl">Results</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-3">
            {sortedOptions.map((option, index) => (
              <li key={index} className="text-lg">
                <span className="font-semibold">{option}</span>
                <span className="text-slate-500 dark:text-slate-400"> - {counts[option] || 0} wins</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

