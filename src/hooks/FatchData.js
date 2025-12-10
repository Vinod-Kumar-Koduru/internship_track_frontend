import { useState, useEffect, useCallback } from "react";
import { request } from "../api/api";

export default function useFetch(path, opts = {}, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const [attempt, setAttempt] = useState(0);

  const refetch = useCallback(() => setAttempt((prev) => prev + 1), []);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const res = await request(path, opts);
        if (mounted) {
          setData(res);
          setError(null); 
        }
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };

  }, [path, attempt, ...deps]); 

  return { data, loading, error, refetch };
}
