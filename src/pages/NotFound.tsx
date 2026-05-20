import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-in fade-in duration-500">
      <FileQuestion className="h-24 w-24 text-muted-foreground mb-4" />
      <h1 className="text-4xl font-bold tracking-tight mb-2">Página não encontrada</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <Button asChild>
        <Link to="/">Voltar para o Dashboard</Link>
      </Button>
    </div>
  )
}
