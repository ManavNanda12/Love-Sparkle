import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertResponse } from "@shared/routes";

export function useCreateResponse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertResponse) => {
      const validated = api.responses.create.input.parse(data);
      const res = await fetch(api.responses.create.path, {
        method: api.responses.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.responses.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error('Failed to submit response');
      }
      
      return api.responses.create.responses[201].parse(await res.json());
    },
    // No query key to invalidate since we don't list responses in the UI,
    // but good practice if we added an admin dashboard later.
  });
}
