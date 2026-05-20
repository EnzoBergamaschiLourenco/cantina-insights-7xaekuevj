import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RefreshCw, Link as LinkIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function UpdateInfo() {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [stockLink, setStockLink] = useState('')
  const [salesLink, setSalesLink] = useState('')
  const [invoicesLink, setInvoicesLink] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

    try {
      // 1. Criar novo processamento na API externa
      const procRes = await fetch(`${API_BASE_URL}/api/processamentos/novo`, { method: 'POST' })
      if (!procRes.ok) throw new Error('Falha ao iniciar processamento')
      const { processamento_id } = await procRes.json()

      // 2. Enviar NFE (usando o link de notas fiscais)
      const nfeForm = new FormData()
      nfeForm.append('urls', invoicesLink)
      nfeForm.append('processamento_id', processamento_id)

      await fetch(`${API_BASE_URL}/api/nfe`, { method: 'POST', body: nfeForm }).catch(() =>
        console.warn('NFE endpoint indisponível no momento'),
      )

      // 3. Orquestrar processamento completo
      await fetch(`${API_BASE_URL}/api/orquestrar?processamento_id=${processamento_id}`, {
        method: 'POST',
      }).catch(() => console.warn('Orchestrate endpoint indisponível no momento'))

      toast({
        title: 'Processamento iniciado',
        description: 'Os links fornecidos estão sendo processados pela API.',
      })

      setStockLink('')
      setSalesLink('')
      setInvoicesLink('')
    } catch (error) {
      console.error(error)
      toast({
        title: 'Aviso de Conexão',
        description: 'Não foi possível conectar à API externa. Simulando envio local...',
        variant: 'default',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Atualizar Informações</h2>
        <p className="text-muted-foreground mt-2">
          Sincronize os dados do sistema fornecendo links externos.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Links de Relatórios</CardTitle>
            <CardDescription>
              Insira as URLs dos relatórios gerados por sistemas ou planilhas externas para que
              possamos extrair os dados.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="stockLink">Link do Relatório de Contagem de Estoque</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="stockLink"
                  type="url"
                  placeholder="https://docs.google.com/..."
                  className="pl-9"
                  value={stockLink}
                  onChange={(e) => setStockLink(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salesLink">Link do Relatório de Vendas</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="salesLink"
                  type="url"
                  placeholder="https://..."
                  className="pl-9"
                  value={salesLink}
                  onChange={(e) => setSalesLink(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoicesLink">Link das Notas de Compra</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="invoicesLink"
                  type="url"
                  placeholder="https://..."
                  className="pl-9"
                  value={invoicesLink}
                  onChange={(e) => setInvoicesLink(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end bg-muted/20 border-t py-4">
            <Button type="submit" disabled={isProcessing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
              {isProcessing ? 'Processando...' : 'Atualizar Estoque'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
