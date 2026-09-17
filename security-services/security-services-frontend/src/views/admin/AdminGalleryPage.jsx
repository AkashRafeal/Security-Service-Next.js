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
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

const AdminGalleryPage = () => {
  const { addToast } = useToast();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialForm = {
    title: '',
    caption: '',
    category: 'Operations',
    imageUrl: '',
    thumbnailUrl: '',
    displayOrder: 0,
    featured: false
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await adminService.getGallery();
      setGallery(res.data?.data || res.data || []);
    } catch (err) {
      addToast('Failed to load gallery images', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (img) => {
    setIsEditing(true);
    setSelectedImage(img);
    setFormData({
      title: img.title || '',
      caption: img.caption || '',
      category: img.category || 'Operations',
      imageUrl: img.imageUrl || '',
      thumbnailUrl: img.thumbnailUrl || '',
      displayOrder: img.displayOrder || 0,
      featured: img.featured !== undefined ? img.featured : false
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      addToast('Please upload an image before saving', 'warning');
      return;
    }
    try {
      if (isEditing) {
        await adminService.updateGalleryImage(selectedImage.id, formData);
        addToast('Gallery image updated successfully', 'success');
      } else {
        await adminService.createGalleryImage(formData);
        addToast('Gallery image uploaded successfully', 'success');
      }
      setModalOpen(false);
      fetchGallery();
    } catch (err) {
      addToast(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteGalleryImage(selectedImage.id);
      addToast('Gallery image removed successfully', 'success');
      setDeleteDialogOpen(false);
      fetchGallery();
    } catch (err) {
      addToast('Failed to delete image', 'error');
    }
  };

  const columns = [
    {
      header: 'Image Preview',
      accessor: 'imageUrl',
      render: (item) => (
        <div className="w-16 h-12 rounded bg-navy-950 border border-slate-800 overflow-hidden flex items-center justify-center">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-6 h-6 text-gold-400" />
          )}
        </div>
      )
    },
    {
      header: 'Title & Caption',
      accessor: 'title',
      render: (item) => (
        <div>
          <div className="font-semibold text-white">{item.title}</div>
          <div className="text-xs text-slate-400 truncate max-w-sm">{item.caption || 'No caption'}</div>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (item) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy-800 text-gold-400 border border-slate-700">
          {item.category}
        </span>
      )
    },
    {
      header: 'Order',
      accessor: 'displayOrder',
      render: (item) => <span className="text-sm text-slate-400">{item.displayOrder}</span>
    },
    {
      header: 'Featured',
      accessor: 'featured',
      render: (item) => (
        item.featured ? (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gold-500/20 text-gold-400 border border-gold-500/40">
            Featured
          </span>
        ) : (
          <span className="text-xs text-slate-500">Standard</span>
        )
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
            onClick={() => { setSelectedImage(item); setDeleteDialogOpen(true); }}
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
          <h1 className="text-2xl font-black text-white tracking-tight">Operational Media Gallery</h1>
          <p className="text-slate-400 text-xs mt-1">Manage field pictures, tactical equipment showcases, and events.</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAdd}>
          Upload Media
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={gallery}
        searchPlaceholder="Search media by title or category..."
        searchKey="title"
        loading={loading}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Edit Media Details' : 'Upload Gallery Media'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Image Title *</label>
            <input
              type="text"
              required
              className="input-field"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Tactical Response Vehicle Fleet"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Category *</label>
              <CustomSelect
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Operations">Operations & Patrol</option>
                <option value="Technology">Technology & SOC</option>
                <option value="Training">Drills & Training</option>
                <option value="Events">Corporate & VIP Events</option>
                <option value="Equipment">Fleet & Tactical Gear</option>
              </CustomSelect>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Display Order</label>
              <input
                type="number"
                className="input-field"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Caption / Description</label>
            <textarea
              rows={2}
              className="input-field"
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              placeholder="Brief tactical context or equipment details..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Media File *</label>
            <FileUploader
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url, thumbnailUrl: url })}
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="featuredImage"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="rounded border-slate-700 bg-navy-950 text-gold-500 focus:ring-gold-500/40 h-4 w-4"
            />
            <label htmlFor="featuredImage" className="text-sm font-medium text-slate-300 cursor-pointer">
              Pin as Featured Showcase Media
            </label>
          </div>

          <div className="sticky bottom-0 -mx-6 -mb-6 p-4 bg-navy-950/95 backdrop-blur-md border-t border-slate-800 flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Save Changes' : 'Upload Image'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Gallery Media"
        message={`Are you sure you want to delete "${selectedImage?.title}"?`}
        confirmText="Delete Media"
      />
    </div>
  );
};

export default AdminGalleryPage;
