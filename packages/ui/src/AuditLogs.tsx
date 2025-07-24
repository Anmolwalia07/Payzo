'use client';

import { useState } from 'react';

export interface Logs {
  id: number;
  level: string;
  message: string;
  meta?: any;
  createdAt: Date;
}

export default function AuditLogs({ logs }: { logs: Logs[] }) {
  const [expandedMeta, setExpandedMeta] = useState<Record<number, boolean>>({});

  const toggleMeta = (id: number) => {
    setExpandedMeta(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'error': return 'text-red-600';
      case 'warn': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 h-full overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Audit Logs</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meta</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map(log => {
              const metaString = log.meta ? JSON.stringify(log.meta, null, 2) : '';
              const isExpanded = expandedMeta[log.id];
              const shouldTruncate = metaString.length > 100 && !isExpanded;
              
              return (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.id}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getLevelColor(log.level)}`}>
                    {log.level.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-md">{log.message}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                    {metaString && (
                      <div className="flex flex-col">
                        <pre className={`font-mono text-xs ${shouldTruncate ? 'truncate' : ''}`}>
                          {shouldTruncate ? metaString.slice(0, 100) + '...' : metaString}
                        </pre>
                        {metaString.length > 100 && (
                          <button
                            onClick={() => toggleMeta(log.id)}
                            className="mt-1 text-xs text-blue-600 hover:text-blue-800 self-end"
                          >
                            {isExpanded ? 'Show Less' : 'Show More'}
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {logs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No audit logs found</p>
          </div>
        )}
      </div>
    </div>
  );
}