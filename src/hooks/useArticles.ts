import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArticleProps } from '@/pages/articles'; // Ideally move this type out of `pages/`
import noImage from '../../public/images/projects/noImage.jpg';

const useArticles = () => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async (pageNumber = 1, onAfterLoad?: () => void) => {
    setLoading(true);
    try {
      const res = await axios.get('https://dev.to/api/articles', {
        params: { page: pageNumber, per_page: 10 },
      });

      const newArticles = res.data.map((article: ArticleProps) => ({
        id: article.id,
        title: article.title,
        description: article.description || 'No description provided.',
        cover_image: article.cover_image || noImage,
        readable_publish_date: article.readable_publish_date,
        url: article.url,
        public_reaction_count: article.public_reaction_count ?? 0,
      }));

      if (newArticles.length > 0) {
        setArticles((prev) => [...prev, ...newArticles]);
        setPage(pageNumber);
        onAfterLoad?.();
      } else {
        setHasMore(false); // No more articles
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // initial fetch
  useEffect(() => {
    axios
      .get('https://dev.to/api/articles')
      .then((res) => {
        const filteredArticles = res.data.map((article: ArticleProps) => ({
          id: article.id,
          title: article.title,
          description: article.description || 'No description provided.',
          cover_image: article.cover_image || noImage,
          readable_publish_date: article.readable_publish_date,
          url: article.url,
          public_reaction_count: article.public_reaction_count ?? 0, // Optional fallback
        }));
        setArticles(filteredArticles);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const loadMore = () => {
    fetchArticles(page + 1);
  };

  return { articles, loading, loadMore, hasMore, fetchArticles, page };
};

export default useArticles;
