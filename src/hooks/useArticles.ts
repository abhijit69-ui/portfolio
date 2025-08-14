import { useCallback, useEffect, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import type { Article } from '@/types/article';
import noImage from '../../public/images/projects/noImage.jpg';

const PER_PAGE = 10;

// Type for the minimal fields we use from the DEV.to API
interface DevToArticle {
  id: number;
  title: string;
  description?: string | null;
  cover_image?: string | null;
  readable_publish_date: string;
  url: string;
  public_reaction_count?: number | null;
}

const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestControllerRef = useRef<AbortController | null>(null);

  const mapApiToArticle = (apiArticle: DevToArticle): Article => ({
    id: apiArticle.id,
    title: apiArticle.title,
    description: apiArticle.description || 'No description provided.',
    cover_image: apiArticle.cover_image || noImage,
    readable_publish_date: apiArticle.readable_publish_date,
    url: apiArticle.url,
    public_reaction_count: apiArticle.public_reaction_count ?? 0,
  });

  const fetchArticles = useCallback(async (pageNumber = 1, onAfterLoad?: () => void) => {
    setError(null);

    // Determine loading states based on page being fetched
    if (pageNumber === 1) {
      setIsInitialLoading(true);
    } else {
      setIsFetchingMore(true);
    }

    // Abort any in-flight request
    if (requestControllerRef.current) {
      requestControllerRef.current.abort();
    }

    const controller = new AbortController();
    requestControllerRef.current = controller;

    const username = process.env.NEXT_PUBLIC_DEVTO_USERNAME; // optional filter

    const attemptFetch = async (): Promise<Article[]> => {
      const res = await axios.get<DevToArticle[]>('https://dev.to/api/articles', {
        params: { page: pageNumber, per_page: PER_PAGE, username },
        timeout: 10000,
        signal: controller.signal,
      });
      const apiItems: DevToArticle[] = Array.isArray(res.data) ? res.data : [];
      return apiItems.map(mapApiToArticle);
    };

    const maxRetries = 2;
    const baseDelayMs = 500;

    try {
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const newArticles = await attemptFetch();

          // Deduplicate by id
          setArticles((prev) => {
            const seen = new Set(prev.map((a) => a.id));
            const deduped = newArticles.filter((a) => !seen.has(a.id));
            return pageNumber === 1 ? newArticles : [...prev, ...deduped];
          });

          setHasMore(newArticles.length === PER_PAGE);
          if (newArticles.length > 0) {
            setPage(pageNumber);
          }

          onAfterLoad?.();
          break;
        } catch (err) {
          // If aborted, stop silently
          const axiosErr = err as AxiosError;
          if (axiosErr?.code === 'ERR_CANCELED' || controller.signal.aborted) {
            break;
          }

          if (attempt < maxRetries) {
            await new Promise((r) => setTimeout(r, baseDelayMs * (attempt + 1)));
            continue;
          } else {
            throw err;
          }
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      // On fatal error, we cannot determine hasMore reliably, keep previous value
      // Do not change page; allow retry
    } finally {
      if (pageNumber === 1) {
        setIsInitialLoading(false);
      } else {
        setIsFetchingMore(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchArticles(1);

    return () => {
      if (requestControllerRef.current) {
        requestControllerRef.current.abort();
      }
    };
  }, [fetchArticles]);

  const loadMore = () => {
    if (isInitialLoading || isFetchingMore || !hasMore) return;
    fetchArticles(page + 1);
  };

  return {
    articles,
    initialLoading: isInitialLoading,
    isFetchingMore,
    loadMore,
    hasMore,
    fetchArticles,
    page,
    error,
  };
};

export default useArticles;
