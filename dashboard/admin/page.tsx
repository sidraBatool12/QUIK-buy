'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Bar,
  ReferenceLine,
} from 'recharts';

/* ---------------- Types ---------------- */
type Product = {
  id: string;
  name: string;
  brand: string;
  images: string[];
  colors: string[];
  description: string;
  cost: number; // your cost
  price: number; // sale price
  stock: number;
  sold: number;
};

type Order = {
  id: string;
  productId: string;
  quantity: number;
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid';
  createdAt: string;
  updatedAt: string;
};

/* ---------------- Constants & Storage Helpers ---------------- */
const NAVY_BG = 'bg-gray-900';
const CARD_BG = 'bg-gray-800';

const STORAGE_KEYS = {
  PRODUCTS: 'quikbuy_products',
  ORDERS: 'quikbuy_orders',
};

const loadProducts = (): Product[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
};

const saveProducts = (p: Product[]) => {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(p));
};

const loadOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
};

const saveOrders = (o: Order[]) => {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(o));
};

/* ---------------- Reusable UI ---------------- */
function Navbar() {
  const router = useRouter();
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-gray-800 border-b border-[#233a8f] text-white">
      <div className="text-xl font-bold cursor-pointer" onClick={() => router.push('/')}>
        Quik-Buy
      </div>
      <div className="flex gap-4 items-center">
        <button onClick={() => router.push('/')} className="hover:underline">
          Home
        </button>


        <button
          onClick={() => {
            localStorage.removeItem('role');
            router.push('/login');
          }}
          className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-950 to-gray-800 text-gray-300 py-12 mt-20 transition-colors">
          <div className="max-w-7xl mx-auto px-6">
            {/* Top footer content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
              {/* Brand Info */}
              <div>
                <h2 className="text-3xl font-extrabold mb-4 tracking-wide text-white">Quick-Buy</h2>
                <p className="text-sm leading-relaxed max-w-sm text-gray-400">
                  Your trusted online store for premium quality products delivered fast and secure.
                </p>
                <div className="mt-6 flex space-x-4 text-xl text-gray-400">
                  <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition-colors">
                    <FaFacebookF />
                  </a>
                  <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
                    <FaTwitter />
                  </a>
                  <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition-colors">
                    <FaInstagram />
                  </a>
                </div>
              </div>
    
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:underline hover:text-white transition-colors">Home</a></li>
                  <li><a href="#" className="hover:underline hover:text-white transition-colors">Shop</a></li>
                  <li><a href="#" className="hover:underline hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:underline hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
    
              {/* Customer Support */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Customer Support</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="hover:underline hover:text-white transition-colors">FAQs</a></li>
                  <li><a href="#" className="hover:underline hover:text-white transition-colors">Shipping & Returns</a></li>
                  <li><a href="#" className="hover:underline hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:underline hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
    
              {/* Newsletter */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
                <p className="mb-4 text-sm max-w-xs text-gray-400">
                  Subscribe to get our latest news and offers directly in your inbox.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    className="rounded-full px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold rounded-full px-6 py-2 hover:bg-blue-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
    
            {/* Copyright */}
            <div className="text-center text-sm text-gray-500 border-t border-gray-700 pt-6 select-none">
              © {new Date().getFullYear()} Quick-Buy. All rights reserved.
            </div>
          </div>
        </footer>
  );
}

/* ---------------- Main Admin Dashboard ---------------- */
export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const initializedRef = useRef(false);

  // Role guard (only run once)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      router.push('/login');
      return;
    }
    setProducts(loadProducts());
    setOrders(loadOrders());
  }, [router]);

  // Persist when updated
  useEffect(() => {
    saveProducts(products);
  }, [products]);

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  /* -------- Derived Stats -------- */
  const stats = useMemo(() => {
    const productSells = products.reduce((sum, p) => sum + p.sold, 0);
    const stockRemaining = products.reduce((sum, p) => sum + p.stock, 0);
    const revenue = orders
      .filter(o => o.paymentStatus === 'paid')
      .reduce((sum, o) => sum + o.total, 0);
    const cost = orders
      .filter(o => o.paymentStatus === 'paid')
      .reduce((sum, o) => {
        const prod = products.find(p => p.id === o.productId);
        if (!prod) return sum;
        return sum + prod.cost * o.quantity;
      }, 0);
    const profit = revenue - cost;
    const now = new Date();
    const thisMonthIncome = orders
      .filter(o => {
        const d = new Date(o.createdAt);
        return (
          o.paymentStatus === 'paid' &&
          d.getFullYear() === now.getFullYear() &&
          d.getMonth() === now.getMonth()
        );
      })
      .reduce((sum, o) => sum + o.total, 0);

    return {
      productSells,
      stockRemaining,
      monthlyIncome: thisMonthIncome,
      revenue,
      profit,
      loss: profit >= 0 ? 0 : -profit,
    };
  }, [products, orders]);

  const profitLossData = useMemo(() => {
    const data: { month: string; profit: number; loss: number }[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = d.toLocaleString('default', { month: 'short' });
      const monthlyOrders = orders.filter(o => {
        const od = new Date(o.createdAt);
        return (
          o.paymentStatus === 'paid' &&
          od.getFullYear() === d.getFullYear() &&
          od.getMonth() === d.getMonth()
        );
      });
      const monthRevenue = monthlyOrders.reduce((sum, o) => sum + o.total, 0);
      const monthCost = monthlyOrders.reduce((sum, o) => {
        const prod = products.find(p => p.id === o.productId);
        if (!prod) return sum;
        return sum + prod.cost * o.quantity;
      }, 0);
      const monthProfit = monthRevenue - monthCost;
      data.push({
        month: monthName,
        profit: monthProfit >= 0 ? monthProfit : 0,
        loss: monthProfit < 0 ? -monthProfit : 0,
      });
    }
    return data;
  }, [orders, products]);

  const candlestickData = useMemo(() => {
    const data: { day: string; open: number; close: number; high: number; low: number }[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dayKey = d.toISOString().slice(0, 10);
      const dailyOrders = orders.filter(o => o.paymentStatus === 'paid' && o.createdAt.startsWith(dayKey));
      const rev = dailyOrders.reduce((sum, o) => sum + o.total, 0);
      const cost = dailyOrders.reduce((sum, o) => {
        const prod = products.find(p => p.id === o.productId);
        if (!prod) return sum;
        return sum + prod.cost * o.quantity;
      }, 0);
      const profit = rev - cost;
      const base = profit;
      const variance = Math.abs(profit) * 0.2 + 1;
      const open = base - variance * Math.random();
      const close = base + variance * Math.random();
      const high = Math.max(open, close) + variance * Math.random();
      const low = Math.min(open, close) - variance * Math.random();
      data.push({
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        open: parseFloat(open.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
      });
    }
    return data;
  }, [orders, products]);

  /* -------- Handlers -------- */
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newProduct.name ||
      !newProduct.brand ||
      !newProduct.images?.length ||
      !newProduct.colors?.length ||
      !newProduct.description ||
      newProduct.price == null ||
      newProduct.cost == null ||
      newProduct.stock == null
    ) {
      alert('Fill all fields');
      return;
    }
    const prod: Product = {
      id: crypto.randomUUID(),
      name: newProduct.name,
      brand: newProduct.brand,
      images: newProduct.images!,
      colors: newProduct.colors!,
      description: newProduct.description!,
      cost: newProduct.cost!,
      price: newProduct.price!,
      stock: newProduct.stock!,
      sold: 0,
    };
    setProducts(prev => [...prev, prod]);
    setNewProduct({});
    setShowAdd(false);
  };

  const placeDummyOrder = () => {
    if (products.length === 0) return;
    const p = products[0];
    if (p.stock <= 0) return;
    const quantity = 1;
    const order: Order = {
      id: crypto.randomUUID(),
      productId: p.id,
      quantity,
      total: p.price * quantity,
      status: 'pending',
      paymentStatus: 'paid',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders(prev => [...prev, order]);
    setProducts(prev =>
      prev.map(pr => (pr.id === p.id ? { ...pr, stock: pr.stock - quantity, sold: pr.sold + quantity } : pr))
    );
  };

  const formatCurrency = (val: number) => {
    return '₨' + val.toLocaleString('en-US');
  };

  return (
    <div className={`flex flex-col min-h-screen ${NAVY_BG} text-white`}>
      <Navbar />

      <div className="flex-1 overflow-auto px-6 py-8">
        {/* Header + actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-300 mt-1">Overview & product/order management</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowAdd(true)}
              className="bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-md font-medium shadow"
            >
              Add Product
            </button>
            <button
              onClick={() => {
                document.getElementById('orders-history')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-md font-medium shadow"
            >
              Orders History
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className={`rounded-lg p-5 shadow flex flex-col ${CARD_BG}`}>
            <div className="text-sm uppercase tracking-wide text-gray-300">Product Sells</div>
            <div className="text-3xl font-bold mt-2">{stats.productSells}</div>
            <div className="mt-1 text-xs text-gray-400">Total sold items</div>
          </div>
          <div className={`rounded-lg p-5 shadow flex flex-col ${CARD_BG}`}>
            <div className="text-sm uppercase tracking-wide text-gray-300">Stock Remaining</div>
            <div className="text-3xl font-bold mt-2">{stats.stockRemaining}</div>
            <div className="mt-1 text-xs text-gray-400">Items left</div>
          </div>
          <div className={`rounded-lg p-5 shadow flex flex-col ${CARD_BG}`}>
            <div className="text-sm uppercase tracking-wide text-gray-300">Monthly Income</div>
            <div className="text-3xl font-bold mt-2">{formatCurrency(stats.monthlyIncome)}</div>
            <div className="mt-1 text-xs text-gray-400">This month</div>
          </div>
          <div className={`rounded-lg p-5 shadow flex flex-col ${CARD_BG}`}>
            <div className="text-sm uppercase tracking-wide text-gray-300">Revenue</div>
            <div className="text-3xl font-bold mt-2">{formatCurrency(stats.revenue)}</div>
            <div className="mt-1 text-xs text-gray-400">Gross earnings</div>
          </div>
          <div className={`rounded-lg p-5 shadow flex flex-col ${CARD_BG}`}>
            <div className="text-sm uppercase tracking-wide text-gray-300">Profit</div>
            <div className="text-3xl font-bold mt-2">{formatCurrency(stats.profit)}</div>
            <div className="mt-1 text-xs text-gray-400">Net after cost</div>
          </div>
        </div>

        {/* Charts */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="rounded-lg p-6 shadow bg-gray-800">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold">Profit vs Loss (6 months)</h2>
                <p className="text-gray-400 text-sm">Monthly trend</p>
              </div>
              <div className="mt-3 bg-[#1e3f8a] px-3 py-3 rounded-full">
                Updated: {new Date().toLocaleString('default', { month: 'short', year: 'numeric' })}
              </div>
            </div>
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profitLossData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2f4f9e" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#0f234f', border: 'none' }} itemStyle={{ color: '#fff' }} />
                  <Legend />
                  <Area type="monotone" dataKey="profit" stroke="#22c55e" fillOpacity={0.6} fill="#22c55e" name="Profit" />
                  <Area type="monotone" dataKey="loss" stroke="#f87171" fillOpacity={0.6} fill="#f87171" name="Loss" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-lg p-6 shadow bg-gray-800">
            <h2 className="text-2xl font-semibold mb-2">Daily Profit Variance (7d)</h2>
            <p className="text-gray-400 text-sm mb-4">Simplified candlestick-style</p>
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={candlestickData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2f4f9e" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#0f234f', border: 'none' }} itemStyle={{ color: '#fff' }} />
                  {/* Represent open-close as bars */}
                  <Bar dataKey="open" name="Open" barSize={6} fill="#6366f1" />
                  <Bar dataKey="close" name="Close" barSize={6} fill="#22c55e" />
                  <ReferenceLine y={0} stroke="#8884d8" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top sell / low stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className={`rounded-lg p-5 shadow ${CARD_BG}`}>
            <h3 className="text-xl font-semibold mb-2">Top Selling Products</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {products
                .sort((a, b) => b.sold - a.sold)
                .slice(0, 4)
                .map(p => (
                  <li key={p.id}>
                    {p.name} - {p.sold} sold
                  </li>
                ))}
              {products.length === 0 && <li>No products yet</li>}
            </ul>
          </div>
          <div className={`rounded-lg p-5 shadow ${CARD_BG}`}>
            <h3 className="text-xl font-semibold mb-2">Low Stock Alerts</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {products.filter(p => p.stock <= 10).map(p => (
                <li key={p.id}>
                  {p.name} ({p.stock} left)
                </li>
              ))}
              {products.filter(p => p.stock <= 10).length === 0 && <li>All good</li>}
            </ul>
          </div>
        </div>

        {/* Demo order button */}
        <div className="mb-8">
          <button
            onClick={placeDummyOrder}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md font-medium"
          >
            Place Dummy Order (first product)
          </button>
        </div>

        {/* Orders History */}
        <div id="orders-history" className="rounded-lg p-6 shadow bg-gray-800 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Recent Orders</h2>
            <div className="text-sm bg-[#1e3f8a] px-3 py-1 rounded-full">Total: {orders.length}</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left">
                  <th className="p-2 border-b border-[#233a8f]">Order ID</th>
                  <th className="p-2 border-b border-[#233a8f]">Product</th>
                  <th className="p-2 border-b border-[#233a8f]">Qty</th>
                  <th className="p-2 border-b border-[#233a8f]">Total</th>
                  <th className="p-2 border-b border-[#233a8f]">Status</th>
                  <th className="p-2 border-b border-[#233a8f]">Payment</th>
                  <th className="p-2 border-b border-[#233a8f]">Created</th>
                  <th className="p-2 border-b border-[#233a8f]">Updated</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
                  .map(o => {
                    const prod = products.find(p => p.id === o.productId);
                    return (
                      <tr key={o.id} className="odd:bg-[#1f325f]">
                        <td className="p-2">{o.id.slice(0, 6)}</td>
                        <td className="p-2">{prod?.name || 'Unknown'}</td>
                        <td className="p-2">{o.quantity}</td>
                        <td className="p-2">{formatCurrency(o.total)}</td>
                        <td className="p-2 uppercase">{o.status}</td>
                        <td className="p-2">{o.paymentStatus}</td>
                        <td className="p-2">{new Date(o.createdAt).toLocaleDateString()}</td>
                        <td className="p-2">{new Date(o.updatedAt).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-gray-300">
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />

      {/* Add Product Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-lg relative shadow-xl transition-all duration-300 ease-in-out max-h-[90vh] overflow-y-auto scrollbar-hide">



            <button
              onClick={() => {
                setShowAdd(false);
                setNewProduct({});
              }}
              className="absolute top-3 right-3 font-bold text-xl text-white"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={newProduct.name || ''}
                  onChange={e => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded bg-gray-800   focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Brand</label>
                <input
                  type="text"
                  value={newProduct.brand || ''}
                  onChange={e => setNewProduct(prev => ({ ...prev, brand: e.target.value }))}
                  className="w-full px-3 py-2 rounded bg-gray-800 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Images (comma separated URLs)</label>
                <input
                  type="text"
                  placeholder="https://..., https://..."
                  value={(newProduct.images || []).join(', ')}
                  onChange={e =>
                    setNewProduct(prev => ({
                      ...prev,
                      images: e.target.value
                        .split(',')
                        .map(s => s.trim())
                        .filter(Boolean),
                    }))
                  }
                  className="w-full px-3 py-2 rounded bg-gray-800 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Colors (comma separated)</label>
                <input
                  type="text"
                  placeholder="Red, Blue, Black"
                  value={(newProduct.colors || []).join(', ')}
                  onChange={e =>
                    setNewProduct(prev => ({
                      ...prev,
                      colors: e.target.value
                        .split(',')
                        .map(s => s.trim())
                        .filter(Boolean),
                    }))
                  }
                  className="w-full px-3 py-2 rounded bg-gray-800 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  value={newProduct.description || ''}
                  onChange={e => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 rounded bg-gray-800 focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Cost</label>
                  <input
                    type="number"
                    value={newProduct.cost ?? ''}
                    onChange={e =>
                      setNewProduct(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))
                    }
                    className="w-full px-3 py-2 rounded bg-gray-800 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1">Price</label>
                  <input
                    type="number"
                    value={newProduct.price ?? ''}
                    onChange={e =>
                      setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))
                    }
                    className="w-full px-3 py-2 rounded bg-gray-800 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Stock</label>
                <input
                  type="number"
                  value={newProduct.stock ?? ''}
                  onChange={e =>
                    setNewProduct(prev => ({ ...prev, stock: parseInt(e.target.value, 10) || 0 }))
                  }
                  className="w-full px-3 py-2 rounded bg-gray-800 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-md font-medium mt-2"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
