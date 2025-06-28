import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Calendar, User, ArrowRight, BookOpen, TrendingUp, FileText } from 'lucide-react';

const Resources: React.FC = () => {
  const posts = useQuery(api.blog.getPosts, { limit: 6 });
  const featuredPosts = useQuery(api.blog.getFeaturedPosts);

  // Example data for demonstration
  const examplePosts = [
    {
      _id: '1',
      title: 'Digital Transformation in Modern Business',
      excerpt: 'Explore how digital transformation is reshaping business operations and creating new opportunities for growth.',
      category: 'Technology',
      publishedAt: Date.now() - 86400000,
      featured: true
    },
    {
      _id: '2',
      title: 'Tax Compliance Best Practices for 2024',
      excerpt: 'Stay ahead of regulatory changes with our comprehensive guide to tax compliance strategies.',
      category: 'Tax & Legal',
      publishedAt: Date.now() - 172800000,
      featured: false
    },
    {
      _id: '3',
      title: 'Building Effective Remote Teams',
      excerpt: 'Learn the essential strategies for managing and motivating remote teams in the modern workplace.',
      category: 'HR & Management',
      publishedAt: Date.now() - 259200000,
      featured: true
    },
    {
      _id: '4',
      title: 'Market Entry Strategies for Global Expansion',
      excerpt: 'Discover proven approaches for successfully entering new international markets.',
      category: 'Strategy',
      publishedAt: Date.now() - 345600000,
      featured: false
    },
    {
      _id: '5',
      title: 'Sustainable Business Practices',
      excerpt: 'Implement eco-friendly practices that benefit both your business and the environment.',
      category: 'Sustainability',
      publishedAt: Date.now() - 432000000,
      featured: true
    },
    {
      _id: '6',
      title: 'Financial Planning for SMEs',
      excerpt: 'Essential financial planning strategies for small and medium enterprises.',
      category: 'Finance',
      publishedAt: Date.now() - 518400000,
      featured: false
    }
  ];

  const displayPosts = posts || examplePosts;

  const categories = [
    { name: 'All', icon: BookOpen, count: displayPosts.length },
    { name: 'Technology', icon: TrendingUp, count: displayPosts.filter(p => p.category === 'Technology').length },
    { name: 'Tax & Legal', icon: FileText, count: displayPosts.filter(p => p.category === 'Tax & Legal').length },
    { name: 'Strategy', icon: TrendingUp, count: displayPosts.filter(p => p.category === 'Strategy').length }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-azure-dark mb-6">Resources & Insights</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay informed with our latest insights, industry trends, and expert guidance 
          to help your business thrive in today's dynamic marketplace.
        </p>
        <p className="text-sm text-azure-medium mt-2">
          *Example content for demonstration purposes
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.name}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-azure-light"
            >
              <IconComponent className="w-4 h-4 text-azure-medium" />
              <span className="text-gray-700 font-medium">{category.name}</span>
              <span className="bg-azure-light text-azure-dark text-xs px-2 py-1 rounded-full">
                {category.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Featured Posts */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-azure-dark mb-8">Featured Articles</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {displayPosts.filter(post => post.featured).slice(0, 3).map((post) => (
            <article
              key={post._id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-azure-light to-azure-medium"></div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-azure-light text-azure-dark text-xs px-2 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-azure-dark mb-3 group-hover:text-azure-medium transition-colors">
                  {post.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <button className="flex items-center space-x-2 text-azure-medium font-semibold group-hover:text-azure-dark transition-colors">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* All Posts */}
      <div>
        <h3 className="text-2xl font-bold text-azure-dark mb-8">Latest Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.slice(0, 6).map((post) => (
            <article
              key={post._id}
              className="group bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-azure-light text-azure-dark text-xs px-2 py-1 rounded-full font-medium">
                  {post.category}
                </span>
              </div>
              <h4 className="text-lg font-bold text-azure-dark mb-2 group-hover:text-azure-medium transition-colors">
                {post.title}
              </h4>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>Azure Team</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <button className="bg-azure-dark text-white px-8 py-3 rounded-lg font-semibold hover:bg-azure-medium transition-colors duration-300">
          View All Articles
        </button>
      </div>
    </section>
  );
};

export default Resources;
