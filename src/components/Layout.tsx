import { Link, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, DollarSign, ShoppingCart, RefreshCw, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function Layout() {
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Estoque', path: '/stock', icon: Package },
    { name: 'Financeiro', path: '/financial', icon: DollarSign },
    { name: 'Enviar Pedido', path: '/order', icon: ShoppingCart },
    { name: 'Atualizar Infos', path: '/update', icon: RefreshCw },
  ]

  return (
    <div className="flex h-screen bg-muted/40 overflow-hidden">
      <aside className="w-64 bg-background border-r flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Package className="w-6 h-6" />
            Cantina Insights
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors font-medium text-sm',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground',
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}
