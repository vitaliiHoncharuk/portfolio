"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import CodeSnippet from "@/components/ui/code-snippet";

const codeExamples = [
  {
    id: "react-component",
    title: "React Component",
    description: "A reusable and optimized React component using hooks and TypeScript.",
    code: `import React, { useState, useCallback, useEffect } from 'react';

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: keyof T;
    header: string;
    render?: (value: any, item: T) => React.ReactNode;
  }[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  isLoading = false,
}: DataTableProps<T>) {
  const [sortedData, setSortedData] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc' | null;
  }>({ key: null, direction: null });

  // Memoized sorting function
  const sortData = useCallback((data: T[], sortConfig: typeof sortConfig) => {
    if (!sortConfig.key || !sortConfig.direction) return [...data];
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, []);

  // Update sorted data when dependencies change
  useEffect(() => {
    setSortedData(sortData(data, sortConfig));
  }, [data, sortConfig, sortData]);

  // Handle column header click for sorting
  const handleHeaderClick = (key: keyof T) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        if (prevConfig.direction === 'asc') return { key, direction: 'desc' };
        if (prevConfig.direction === 'desc') return { key: null, direction: null };
      }
      return { key, direction: 'asc' };
    });
  };

  if (isLoading) {
    return <div className="loading-skeleton">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                onClick={() => handleHeaderClick(column.key)}
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                {column.header}
                {sortConfig.key === column.key && (
                  <span className="ml-1">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedData.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick && onRowClick(item)}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
            >
              {columns.map((column) => (
                <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap">
                  {column.render
                    ? column.render(item[column.key], item)
                    : String(item[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {sortedData.length === 0 && (
        <div className="text-center py-4">No data available</div>
      )}
    </div>
  );
}`,
  },
  {
    id: "custom-hook",
    title: "Custom Hook",
    description: "A custom React hook for handling API requests with loading and error states.",
    code: `import { useState, useEffect, useCallback, useRef } from 'react';

interface UseApiOptions<T> {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: () => Promise<T | null>;
  reset: () => void;
}

export function useApi<T = any>({
  url,
  method = 'GET',
  body,
  headers = {},
  immediate = true,
  onSuccess,
  onError,
}: UseApiOptions<T>): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Use a ref to track if the component is mounted
  const isMounted = useRef<boolean>(true);
  
  const execute = useCallback(async (): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      
      if (!response.ok) {
        throw new Error(\`API request failed with status \${response.status}\`);
      }
      
      const result = await response.json();
      
      // Only update state if the component is still mounted
      if (isMounted.current) {
        setData(result);
        setLoading(false);
        onSuccess?.(result);
      }
      
      return result;
    } catch (err) {
      // Only update state if the component is still mounted
      if (isMounted.current) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        setLoading(false);
        onError?.(error);
      }
      return null;
    }
  }, [url, method, body, headers, onSuccess, onError]);
  
  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);
  
  useEffect(() => {
    if (immediate) {
      execute();
    }
    
    return () => {
      isMounted.current = false;
    };
  }, [execute, immediate]);
  
  return { data, loading, error, execute, reset };
}`,
  },
  {
    id: "performance-optimization",
    title: "Performance Optimization",
    description: "Techniques for optimizing React component rendering performance.",
    code: `import React, { memo, useState, useCallback, useMemo } from 'react';

// Before optimization - this component re-renders on every parent render
// even when props don't change
function ExpensiveComponent({ data, onItemClick }) {
  // Expensive calculation performed on every render
  const processedData = data.map(item => ({
    ...item,
    computed: complexCalculation(item)
  }));
  
  return (
    <div>
      {processedData.map(item => (
        <div 
          key={item.id} 
          onClick={() => onItemClick(item.id)}
        >
          {item.name}: {item.computed}
        </div>
      ))}
    </div>
  );
}

// After optimization
const OptimizedComponent = memo(function OptimizedComponent({ 
  data, 
  onItemClick 
}) {
  // Memoize expensive calculation
  const processedData = useMemo(() => {
    console.log('Recalculating data - this should not happen often');
    return data.map(item => ({
      ...item,
      computed: complexCalculation(item)
    }));
  }, [data]); // Only recalculate when data changes
  
  return (
    <div>
      {processedData.map(item => (
        <div 
          key={item.id} 
          onClick={() => onItemClick(item.id)}
        >
          {item.name}: {item.computed}
        </div>
      ))}
    </div>
  );
});

// Parent component
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', value: 10 },
    { id: 2, name: 'Item 2', value: 20 },
    { id: 3, name: 'Item 3', value: 30 },
  ]);
  
  // This function is recreated on every render without useCallback
  // causing the child component to re-render unnecessarily
  const handleItemClick = useCallback((id) => {
    console.log('Item clicked:', id);
    // Do something with the id
  }, []); // No dependencies, so this function is stable across renders
  
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment (this should NOT cause ExpensiveComponent to re-render)
      </button>
      
      {/* This will re-render on every count change */}
      <ExpensiveComponent data={items} onItemClick={(id) => console.log(id)} />
      
      {/* This will only re-render when items or handleItemClick changes */}
      <OptimizedComponent data={items} onItemClick={handleItemClick} />
    </div>
  );
}

// Simulating an expensive calculation
function complexCalculation(item) {
  console.log(\`Calculating for \${item.name}\`);
  // In a real scenario, this might be a complex algorithm
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.random() * item.value;
  }
  return result.toFixed(2);
}`,
  },
  {
    id: "microfrontend",
    title: "Microfrontend Architecture",
    description: "Setup for a Module Federation microfrontend architecture.",
    code: `// webpack.config.js for host application
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  output: {
    publicPath: "http://localhost:8080/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8080,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        dashboard: "dashboard@http://localhost:8081/remoteEntry.js",
        analytics: "analytics@http://localhost:8082/remoteEntry.js",
        settings: "settings@http://localhost:8083/remoteEntry.js",
      },
      exposes: {
        "./Header": "./src/components/Header",
        "./Footer": "./src/components/Footer",
        "./AuthContext": "./src/context/AuthContext",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};

// App.tsx in host application
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { AuthProvider } from "./context/AuthContext";

// Lazy-loaded remote modules
const DashboardApp = lazy(() => import("dashboard/DashboardApp"));
const AnalyticsApp = lazy(() => import("analytics/AnalyticsApp"));
const SettingsApp = lazy(() => import("settings/SettingsApp"));

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <main className="container mx-auto py-4">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" component={DashboardApp} />
              <Route path="/analytics" component={AnalyticsApp} />
              <Route path="/settings" component={SettingsApp} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </AuthProvider>
  </BrowserRouter>
);

export default App;`,
  },
];

export default function CodeShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="code"
      ref={sectionRef}
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Code <span className="gradient-text">Showcase</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <motion.p 
            className="max-w-2xl mx-auto text-foreground/70"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A selection of code snippets demonstrating my coding style, best practices, and expertise in React development.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <Tabs defaultValue="react-component" className="w-full">
                <TabsList className="w-full justify-start p-0 bg-muted rounded-none border-b border-border">
                  {codeExamples.map((example) => (
                    <TabsTrigger
                      key={example.id}
                      value={example.id}
                      className="px-6 py-3 data-[state=active]:text-primary"
                    >
                      {example.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {codeExamples.map((example) => (
                  <TabsContent key={example.id} value={example.id} className="p-6">
                    <h3 className="text-xl font-bold mb-2">{example.title}</h3>
                    <p className="text-foreground/70 mb-6">{example.description}</p>
                    <CodeSnippet code={example.code} language="typescript" />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}