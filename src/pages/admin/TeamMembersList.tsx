import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Mail, Phone } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import type { TeamMember } from '../../types';

const TeamMembersList = () => {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch team members
  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const response = await fetch('/api/admin/team', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch team members');
      const data = await response.json();
      return data.data as TeamMember[];
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/team?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to delete team member');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      setDeleteId(null);
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      deleteMutation.mutate(id);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Team Member',
      render: (member: TeamMember) => (
        <div className="flex items-center gap-3">
          {member.headshot ? (
            <img
              src={member.headshot}
              alt={member.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-luxury-sand flex items-center justify-center text-primary font-semibold text-lg">
              {member.name.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium text-luxury-gray-900">{member.name}</p>
            <p className="text-sm text-luxury-gray-600">{member.role}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'bio',
      label: 'Bio',
      render: (member: TeamMember) => (
        <p className="text-sm text-luxury-gray-700 max-w-md truncate">
          {member.bio}
        </p>
      ),
    },
    {
      key: 'contact',
      label: 'Contact',
      render: (member: TeamMember) => (
        <div className="space-y-1">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors"
            >
              <Mail className="w-4 h-4" />
              {member.email}
            </a>
          )}
          {member.phone && (
            <a
              href={`tel:${member.phone}`}
              className="flex items-center gap-2 text-sm text-luxury-gray-600 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              {member.phone}
            </a>
          )}
          {!member.email && !member.phone && (
            <span className="text-sm text-luxury-gray-400">No contact info</span>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (member: TeamMember) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/team/${member.id}`}
            className="p-2 text-primary hover:bg-luxury-sand rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleDelete(member.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            disabled={deleteMutation.isPending && deleteId === member.id}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-luxury-gray-900 mb-2">
              Team Members
            </h1>
            <p className="text-luxury-gray-600">
              Manage your team members displayed on the About page
            </p>
          </div>
          <Link
            to="/admin/team/new"
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Team Member
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-luxury p-6"
          >
            <p className="text-luxury-gray-600 text-sm mb-1">Total Team Members</p>
            <p className="text-3xl font-bold text-primary">{teamMembers.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-luxury p-6"
          >
            <p className="text-luxury-gray-600 text-sm mb-1">With Photos</p>
            <p className="text-3xl font-bold text-primary">
              {teamMembers.filter((m) => m.headshot).length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-luxury p-6"
          >
            <p className="text-luxury-gray-600 text-sm mb-1">With Contact Info</p>
            <p className="text-3xl font-bold text-primary">
              {teamMembers.filter((m) => m.email || m.phone).length}
            </p>
          </motion.div>
        </div>

        {/* Table */}
        <DataTable
          data={teamMembers}
          columns={columns}
          isLoading={isLoading}
          emptyMessage="No team members yet. Add your first one!"
        />
      </div>
    </AdminLayout>
  );
};

export default TeamMembersList;
