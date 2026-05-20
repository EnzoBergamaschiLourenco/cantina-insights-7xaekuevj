import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, Send } from 'lucide-react'
import { mockProducts } from '@/lib/mock-data'
import { useToast } from '@/hooks/use-toast'

export default function Order() {
  const { toast } = useToast()
  const [items, setItems] = useState([{ id: 1, productId: '', quantity: '' }])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addItem = () => {
    setItems([...items, { id: Date.now(), productId: '', quantity: '' }])
  }

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id: number, field: string, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      toast({
        title: "Pedido enviado com sucesso!",
        description: `Seu pedido com ${items.length} itens foi encaminhado aos fornecedores.`,
      })
      setItems([{ id: Date.now(), productId: '', quantity: '' }])
      setIsSubmitting(false)
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Enviar Pedido</h2>
        <p className="text-muted-foreground mt-2">Crie novos pedidos de suprimentos para repor o estoque da cantina.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Pedido</CardTitle>
            <CardDescription>Adicione os produtos e quantidades desejadas para nova compra.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-end gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex-1 space-y-2">
                  <Label>Produto</Label>
                  <Select 
                    value={item.productId} 
                    onValueChange={(val) => updateItem(item.id, 'productId', val)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um produto..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProducts.map(p => (
                        <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-32 space-y-2">
                  <Label>Quantidade</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    placeholder="Qtd" 
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end sm:block">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeItem(item.id)}
                    disabled={items.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button type="button" variant="outline" onClick={addItem} className="w-full mt-4 border-dashed py-8">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Novo Item
            </Button>
          </CardContent>
          <CardFooter className="justify-end bg-muted/20 border-t py-4 mt-2">
            <Button type="submit" disabled={isSubmitting}>
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Enviando...' : 'Enviar Pedido'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
