import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import BackRoutes from './routes/BackRoutes'
import FrontRoutes from './routes/FrontRoutes'
import Login from './pages/back/Login'
import Dashboard from './pages/back/Dashboard'
import CookieList from './pages/back/cookies/CookieList'
import CookieForm from './pages/back/cookies/CookieForm'
import CategoryList from './pages/back/categories/CategoryList'
import CategoryForm from './pages/back/categories/CategoryForm'
import TagList from './pages/back/tags/TagList'
import BannerList from './pages/back/banners/BannerList'
import BannerForm from './pages/back/banners/BannerForm'
import MessageList from './pages/back/messages/MessageList'
import HomeContentForm from './pages/back/home-content/HomeContentForm'
import Home from './pages/front/Home'
import Catalog from './pages/front/Catalog'
import ProductDetail from './pages/front/ProductDetail'
import Contact from './pages/front/Contact'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<FrontRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/admin/login" element={<Login />} />
          <Route element={<BackRoutes />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/cookies" element={<CookieList />} />
            <Route path="/admin/cookies/new" element={<CookieForm />} />
            <Route path="/admin/cookies/edit/:id" element={<CookieForm />} />
            <Route path="/admin/categories" element={<CategoryList />} />
            <Route path="/admin/categories/new" element={<CategoryForm />} />
            <Route path="/admin/categories/edit/:id" element={<CategoryForm />} />
            <Route path="/admin/tags" element={<TagList />} />
            <Route path="/admin/banners" element={<BannerList />} />
            <Route path="/admin/banners/new" element={<BannerForm />} />
            <Route path="/admin/banners/edit/:id" element={<BannerForm />} />
            <Route path="/admin/home-content" element={<HomeContentForm />} />
            <Route path="/admin/messages" element={<MessageList />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
