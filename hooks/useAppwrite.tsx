import { useCallback, useEffect, useState } from "react";

type IParams = Record<string, string | number>;

interface UseAppWriteOptions<T, P extends IParams> {
  fn: (params?: P) => Promise<T>;
  params?: P;
  skip?: boolean;
}

interface UseAppWriteReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (newParams?: P) => Promise<void>;
}

export const useAppwrite = <T, P extends IParams>({
  fn,
  params = {} as P,
  skip = false,
}: UseAppWriteOptions<T, P>): UseAppWriteReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (fetchParams?: P) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fn(fetchParams);
        setData(result);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  useEffect(() => {
    if (!skip) fetchData(params);
  }, []);

  const refetch = async (newParams?: P) => await fetchData(newParams);

  return { data, loading, error, refetch };
};
