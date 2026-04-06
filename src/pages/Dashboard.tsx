import React, { useState } from 'react';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { BalanceTrendChart } from '../components/dashboard/BalanceTrendChart';
import { CategoryPieChart } from '../components/dashboard/CategoryPieChart';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { TransactionList } from '../components/transactions/TransactionList';
import { InsightsPanel } from '../components/insights/InsightsPanel';
import { TransactionModal } from '../components/transactions/TransactionModal';
import { Button } from '../components/ui/Button';
import { useAppSelector, useAppDispatch } from '../hooks';
import { toggleTheme, setRole } from '../features/ui/uiSlice';
import { Plus, LayoutDashboard, Moon, Sun, Shield } from 'lucide-react';
import type { Transaction } from '../types';

export const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  
  const { role, theme } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <LayoutDashboard className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold tracking-tight">FinDash</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 ${role === 'viewer' ? 'bg-background shadow-sm' : ''}`}
                onClick={() => dispatch(setRole('viewer'))}
              >
                Viewer
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 gap-1.5 ${role === 'admin' ? 'bg-background shadow-sm text-primary' : ''}`}
                onClick={() => dispatch(setRole('admin'))}
              >
                <Shield className="w-3.5 h-3.5" />
                Admin
              </Button>
            </div>
            
            <button 
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        
        <section>
          <SummaryCards />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BalanceTrendChart />
          <CategoryPieChart />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Transactions</h2>
                <p className="text-sm text-muted-foreground mt-1">Manage your incoming and outgoing funds.</p>
              </div>
              {role === 'admin' && (
                <Button onClick={handleAddNew} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add New
                </Button>
              )}
            </div>
            <TransactionFilters />
            <TransactionList onEdit={handleEdit} />
          </div>
          
          <div className="lg:col-span-1">
            <InsightsPanel />
          </div>
        </section>

      </main>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transactionToEdit={editingTransaction} 
      />
    </div>
  );
};
