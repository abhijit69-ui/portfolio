import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArticleProps } from '@/pages/articles'; // Ideally move this type out of `pages/`
import noImage from '../../public/images/projects/noImage.jpg';

const useArticles = () => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState(true);

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

  return { articles, loading };
};

export default useArticles;
