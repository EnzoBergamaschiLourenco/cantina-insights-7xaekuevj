import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trophy } from 'lucide-react'
import { mockProducts } from '@/lib/mock-data'

export default function Financial() {
  const financialData = mockProducts
    .map((p) => {
      const marginValue = p.price - p.cost
      const marginPercent = (marginValue / p.cost) * 100
      const totalProfit = marginValue * p.sold
      return { ...p, marginValue, marginPercent, totalProfit }
    })
    .sort((a, b) => b.totalProfit - a.totalProfit)

  const topSelling = [...financialData].sort((a, b) => b.sold - a.sold).slice(0, 3)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Insights Financeiros</h2>
        <p className="text-muted-foreground mt-2">
          Acompanhe a lucratividade e o desempenho dos produtos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {topSelling.map((p, i) => (
          <Card key={p.id} className={i === 0 ? 'border-primary bg-primary/5' : ''}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Top #{i + 1} Vendido</CardTitle>
              <Trophy
                className={`h-5 w-5 ${
                  i === 0
                    ? 'text-yellow-500 fill-yellow-500'
                    : i === 1
                      ? 'text-slate-400 fill-slate-400'
                      : 'text-amber-600 fill-amber-600'
                }`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold truncate" title={p.name}>
                {p.name}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{p.sold} unidades vendidas</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Produto</CardTitle>
          <CardDescription>
            Análise detalhada de custos, margens e lucratividade total.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Custo (R$)</TableHead>
                  <TableHead className="text-right">Venda (R$)</TableHead>
                  <TableHead className="text-right">Margem</TableHead>
                  <TableHead className="text-right">Vendidos</TableHead>
                  <TableHead className="text-right">Lucro Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {financialData.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="text-right">{p.cost.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{p.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      {p.marginValue.toFixed(2)}{' '}
                      <span className="text-muted-foreground text-xs">
                        ({p.marginPercent.toFixed(1)}%)
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{p.sold}</TableCell>
                    <TableCell className="text-right font-bold text-green-600 dark:text-green-500">
                      R$ {p.totalProfit.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
