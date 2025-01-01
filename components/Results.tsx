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
      <h2 className="text-3xl font-bold mb-6 text-center">Your Preferences</h2>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Results</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            {sortedOptions.map((option, index) => (
              <li key={index} className="text-lg">
                <span className="font-semibold">{option}</span> - {counts[option] || 0} wins
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

