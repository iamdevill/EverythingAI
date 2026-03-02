'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface SyncStatus {
  status: 'idle' | 'syncing' | 'success' | 'error';
  message: string;
}

export default function AdminProductPanel() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({ status: 'idle', message: '' });

  const handleRefreshProducts = async () => {
    setSyncStatus({ status: 'syncing', message: 'Refreshing products...' });
    
    try {
      const response = await fetch('/api/products', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to refresh products: ${response.statusText}`);
      }

      const products = await response.json();
      
      setSyncStatus({ 
        status: 'success', 
        message: `Refreshed ${products.length} products`
      });
    } catch (error) {
      console.error('Refresh error:', error);
      setSyncStatus({ 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Failed to refresh products' 
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
        <CardDescription>
          Manage your products and inventory
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Button 
            onClick={handleRefreshProducts}
            disabled={syncStatus.status === 'syncing'}
            className="w-full"
          >
            {syncStatus.status === 'syncing' ? 'Refreshing...' : 'Refresh Products'}
          </Button>
          
          {syncStatus.status !== 'idle' && (
            <div className={`p-3 rounded-md text-sm ${
              syncStatus.status === 'success' ? 'bg-green-100 text-green-800' :
              syncStatus.status === 'error' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              <div className="font-medium">
                {syncStatus.status === 'syncing' && '🔄 Refreshing...'}
                {syncStatus.status === 'success' && '✅ Refresh Complete'}
                {syncStatus.status === 'error' && '❌ Refresh Failed'}
              </div>
              <div>{syncStatus.message}</div>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-600">
          <p className="font-medium">How it works:</p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>Fetches products from your Supabase database</li>
            <li>Displays current product catalog</li>
            <li>Shows inventory levels and pricing</li>
            <li>Updates product listings in real-time</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
