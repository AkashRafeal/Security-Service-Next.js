'use client';

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Button from '../../components/common/Button';
import FileUploader from '../../components/common/FileUploader';
import { CustomSelect } from '../../components/common/CustomSelect';
import { MOCK_BLOGS, MOCK_BLOG_CATEGORIES } from '../../utils/mockData';
import { Plus, Edit, Trash2, BookOpen, Clock } from 'lucide-react';

const AdminBlogPage = () => {
  const { addToast } = useToast();
  const [posts, setPosts] = useState(MOCK_BLOGS);
  const [categories, setCategories] = useState(MOCK_BLOG_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    title: '',
    slug: '',
    summary: '',
    content: '',
    featuredImage: '',
    categoryId: '',
    tags: '',
    authorName: 'Security Advisory Board',
    status: 'PUBLISHED',
    featured: false
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchData = async () => {
    try {
      const [postRes, catRes] = await Promise.all([
        adminService.getBlogPosts(),
        adminService.getBlogCategories()
      ]);
      const pList = Array.isArray(postRes) ? postRes : (postRes?.data?.data || postRes?.data || []);
      const cList = Array.isArray(catRes) ? catRes : (catRes?.data?.data || catRes?.data || []);
      if (pList && pList.length > 0) setPosts(pList);
      if (cList && cList.length > 0) setCategories(cList);
    } catch (err) {
      // keep fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (post) => {
    setIsEditing(true);
    setSelectedPost(post);
    setFormData({
      title: post.title || '',
      slug: post.slug || '',
      summary: post.summary || '',
      content: post.content || '',
      featuredImage: post.featuredImage || '',
      categoryId: post.category?.id || '',
      tags: post.tags || '',
      authorName: post.authorName || '',
      status: post.status || 'PUBLISHED',
      featured: post.featured !== undefined ? post.featured : false
    });
    setModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: isEditing ? prev.slug : generatedSlug
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await adminService.updateBlogPost(selectedPost.id, formData);
        setPosts(prev => prev.map(p => p.id === selectedPost.id ? { ...p, ...formData } : p));
        addToast('Blog article updated successfully', 'success');
      } else {
        const created = await adminService.createBlogPost(formData);
        setPosts(prev => [created || { id: Date.now(), createdAt: new Date().toISOString(), ...formData }, ...prev]);
        addToast('Blog article created successfully', 'success');
      }
      setModalOpen(false);
    } catch (err) {
      addToast(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteBlogPost(selectedPost.id);
      setPosts(prev => prev.filter(p => p.id !== selectedPost.id));
      addToast('Blog article deleted successfully', 'success');
      setDeleteDialogOpen(false);
    } catch (err) {
      addToast('Failed to delete blog post', 'error');
    }
  };

  const columns = [
    {
      header: 'Article Title',
      accessor: 'title',
      render: (item) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-navy-950 border border-slate-800 flex-shrink-0 overflow-hidden flex items-center justify-center">
            {item.featuredImage ? (
              <img src={item.featuredImage} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <BookOpen className="w-5 h-5 text-gold-400" />
            )}
          </div>
          <div>
            <div className="font-semibold text-white">{item.title}</div>
            <div className="text-xs text-slate-400">By {item.authorName || 'Admin'} • {item.viewCount || 0} views</div>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      render: (item) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy-800 text-gold-400 border border-slate-700">
          {item.category?.name || 'General'}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (item) => (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
          item.status === 'PUBLISHED'
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            : item.status === 'DRAFT'
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            : 'bg-slate-800 text-slate-400 border-slate-700'
        }`}>
          {item.status}
        </span>
      )
    },
    {
      header: 'Actions',
      render: (item) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleOpenEdit(item)}
            className="p-1.5 text-slate-400 hover:text-gold-400 hover:bg-navy-800 rounded transition"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setSelectedPost(item); setDeleteDialogOpen(true); }}
            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded transition"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Security Insights & News</h1>
          <p className="text-slate-400 text-xs mt-1">Author security advisories, whitepapers, and corporate updates.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAdd}>
          Write Article
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={posts}
        searchPlaceholder="Search articles by title..."
        searchKey="title"
        loading={loading}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Edit Blog Article' : 'Write New Blog Article'}
        size="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Article Title *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. 5 Critical Security Vulnerabilities in Commercial Warehouses"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">URL Slug *</label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="5-critical-security-vulnerabilities"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Category</label>
              <CustomSelect
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </CustomSelect>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Author Name</label>
              <input
                type="text"
                className="input-field"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                placeholder="Author Name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Publication Status</label>
              <CustomSelect
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </CustomSelect>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Excerpt / Brief Summary *</label>
            <textarea
              required
              rows={2}
              className="input-field"
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Teaser summary displayed on article cards..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Full Content (Markdown or HTML supported) *</label>
            <textarea
              required
              rows={8}
              className="input-field font-mono text-sm"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Full article content body..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Tags (comma-separated)</label>
              <input
                type="text"
                className="input-field"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Surveillance, Physical Security, Access Control"
              />
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-slate-700 bg-navy-950 text-gold-500 focus:ring-gold-500/40 h-4 w-4"
                />
                <span className="text-sm font-medium text-slate-300">Pin as Featured Article</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Featured Article Image</label>
            <FileUploader
              value={formData.featuredImage}
              onChange={(url) => setFormData({ ...formData, featuredImage: url })}
            />
          </div>

          <div className="sticky bottom-0 -mx-6 -mb-6 p-4 bg-navy-950/95 backdrop-blur-md border-t border-slate-800 flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Publish Article'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Article"
        message={`Are you sure you want to delete "${selectedPost?.title}"?`}
        confirmText="Delete Article"
      />
    </div>
  );
};

export default AdminBlogPage;
