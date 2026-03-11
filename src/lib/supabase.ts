
// Mocked Supabase Client to prevent crashes during Firebase transition
export const supabase = {
    auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signOut: async () => ({ error: null }),
    },
    from: (table: string): any => {
        return {
            select: (columns?: string, options?: any): any => {
                const chain: any = {
                    eq: () => chain,
                    gte: () => chain,
                    lte: () => chain,
                    in: () => chain,
                    or: () => chain,
                    order: () => chain,
                    limit: () => chain,
                    single: async () => ({ data: null as any, error: null }),
                    then: (resolve: any) => resolve({ data: [] as any, error: null }),
                    catch: (reject: any) => chain,
                };
                return chain;
            },
            insert: async (data: any) => ({ data: null, error: null }),
            update: async (data: any) => ({ data: null, error: null }),
            delete: async () => ({ data: null, error: null }),
            upsert: async (data: any) => ({ data: null, error: null }),
        };
    },
};
