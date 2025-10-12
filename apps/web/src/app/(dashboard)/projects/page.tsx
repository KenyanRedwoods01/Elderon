'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  Plus,
  Search,
  Filter,
  Grid3x3,
  List,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  FolderKanban,
  Clock,
  Activity,
  CheckCircle,
  AlertCircle,
  XCircle,
  Pause,
  Code,
  GitBranch,
  Calendar,
  TrendingUp,
  BarChart3,
  FileCode,
} from 'lucide-react';
import { api } from '@/lib/api';

type ViewMode = 'grid' | 'list';
type ProjectStatus = 'active' | 'analyzing' | 'migrating' | 'completed' | 'archived';

interface Project {
  id: string;
  name: string;
  description: string | null;
  repository_url: string | null;
  language: string | null;
  framework: string | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  organization_id: string;
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<string>('updated');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const itemsPerPage = 12;

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await api.get('/api/projects');
      return response.data.data as Project[];
    },
  });

  // Filter and sort projects
  const filteredProjects = projects
    ?.filter((project) => {
      const matchesSearch =
        searchQuery === '' ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLanguage = selectedLanguage === 'all' || project.language === selectedLanguage;
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      return matchesSearch && matchesLanguage && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case 'created':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil((filteredProjects?.length || 0) / itemsPerPage);
  const paginatedProjects = filteredProjects?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique languages and statuses for filters
  const languages = ['all', ...new Set(projects?.map((p) => p.language).filter(Boolean) as string[])];
  const statuses: (string | ProjectStatus)[] = [
    'all',
    'active',
    'analyzing',
    'migrating',
    'completed',
    'archived',
  ];

  // Calculate statistics
  const stats = {
    total: projects?.length || 0,
    active: projects?.filter((p) => p.status === 'active').length || 0,
    analyzing: projects?.filter((p) => p.status === 'analyzing').length || 0,
    completed: projects?.filter((p) => p.status === 'completed').length || 0,
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'analyzing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'migrating':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'archived':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'analyzing':
        return Activity;
      case 'migrating':
        return GitBranch;
      case 'completed':
        return CheckCircle;
      case 'archived':
        return Pause;
      default:
        return FolderKanban;
    }
  };

  const timeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return past.toLocaleDateString();
  };

  const handleDelete = (projectId: string) => {
    setProjectToDelete(projectId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (projectToDelete) {
      // In real app, call API to delete
      console.log('Deleting project:', projectToDelete);
      setShowDeleteModal(false);
      setProjectToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FolderKanban className="w-8 h-8 text-blue-600" />
              Projects
            </h1>
            <p className="text-gray-600 mt-2">Manage and monitor your modernization projects</p>
          </div>
          <Link
            href="/projects/new"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
          >
            <Plus className="w-5 h-5" />
            New Project
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <FolderKanban className="w-8 h-8 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.total}</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Total Projects</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-green-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.active}</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Active Projects</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.analyzing}</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Under Analysis</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.completed}</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Completed</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Language Filter */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang === 'all' ? 'All Languages' : lang}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="updated">Last Updated</option>
              <option value="created">Date Created</option>
              <option value="name">Name</option>
            </select>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Display */}
        {!paginatedProjects || paginatedProjects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FolderKanban className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchQuery || selectedLanguage !== 'all' || selectedStatus !== 'all'
                ? 'No projects match your filters'
                : 'No projects yet'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery || selectedLanguage !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your search criteria or filters'
                : 'Get started by creating your first project and begin your modernization journey'}
            </p>
            <Link
              href="/projects/new"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
            >
              <Plus className="w-5 h-5" />
              Create Your First Project
            </Link>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProjects.map((project) => {
                  const StatusIcon = getStatusIcon(project.status);
                  return (
                    <div
                      key={project.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-xl transition-all group"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {project.name}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                project.status
                              )}`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {project.status}
                            </span>
                          </div>
                          <div className="relative group/menu">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                              <MoreVertical className="w-5 h-5 text-gray-600" />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10">
                              <Link
                                href={`/projects/${project.id}`}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                              >
                                <Eye className="w-4 h-4" />
                                View Details
                              </Link>
                              <Link
                                href={`/projects/${project.id}/edit`}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                              >
                                <Edit className="w-4 h-4" />
                                Edit Project
                              </Link>
                              <button
                                onClick={() => handleDelete(project.id)}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 w-full"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>

                        {project.description && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                        )}

                        <div className="space-y-3 mb-4">
                          {project.language && (
                            <div className="flex items-center gap-2 text-sm">
                              <Code className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{project.language}</span>
                            </div>
                          )}
                          {project.framework && (
                            <div className="flex items-center gap-2 text-sm">
                              <FileCode className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{project.framework}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Updated {timeAgo(project.updated_at)}</span>
                          </div>
                        </div>

                        <Link
                          href={`/projects/${project.id}`}
                          className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-all font-medium"
                        >
                          View Project
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Language
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Framework
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Updated
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedProjects.map((project) => {
                      const StatusIcon = getStatusIcon(project.status);
                      return (
                        <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <Link
                                href={`/projects/${project.id}`}
                                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                              >
                                {project.name}
                              </Link>
                              {project.description && (
                                <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                                  {project.description}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-700">{project.language || '-'}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-700">{project.framework || '-'}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                project.status
                              )}`}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {project.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">{timeAgo(project.updated_at)}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/projects/${project.id}`}
                                className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-all"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <Link
                                href={`/projects/${project.id}/edit`}
                                className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-all"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleDelete(project.id)}
                                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-all"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, filteredProjects?.length || 0)} of{' '}
                  {filteredProjects?.length || 0} projects
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Delete Project</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this project? All associated data, including analysis
                results and migration history, will be permanently removed.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium transition-all"
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
