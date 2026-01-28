// src/helper/cursorPagination.ts

export interface ICursorPaginationOptions {
    limit?: number;
    cursor?: string | Date;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    search?: string;
    searchFields?: string[];
}

export interface ICursorPaginationResult {
    limit: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
    filter: any;
}

export const calculateCursorPagination = (options: ICursorPaginationOptions): ICursorPaginationResult => {
    // Default values set if not provided
    const limit = options.limit && options.limit > 0 ? options.limit : 10;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    
    // Filter object initialize
    let filter: any = {};

    // Search filtering logic
    if (options.search && options.search.trim() !== '') {
        const searchTerm = options.search.trim();
        const searchFields = options.searchFields || ['name', 'title', 'description'];
        
        // MongoDB $or operator for multiple fields search
        filter.$or = searchFields.map(field => ({
            [field]: {
                $regex: searchTerm,     
                $options: 'i'           
            }
        }));
    }
    
    // Cursor filtering
    if (options.cursor) {
        const cursorDate = typeof options.cursor === 'string' 
            ? new Date(options.cursor) 
            : options.cursor;
        
        if (sortOrder === 'desc') {
            filter[sortBy] = { $lt: cursorDate };
        } else {
            filter[sortBy] = { $gt: cursorDate };
        }
    }

    return {
        limit,
        sortBy,
        sortOrder,
        filter,
    };
};

export interface ICursorPaginationMeta<T> {
    limit: number;
    hasMore: boolean;
    nextCursor: Date | string | null;
    sortBy: string;
    sortOrder: "asc" | "desc";
    totalFetched?: number;            
    search?: string;                   
}


// Create Cursor Pagination Meta Function (Cursor based pagination return meta & data)

export const createCursorPaginationMeta = <T extends Record<string, any>>(
    data: T[],
    limit: number,
    sortBy: string = 'createdAt',
    sortOrder: "asc" | "desc" = 'desc',
    search?: string                   
): { data: T[]; meta: ICursorPaginationMeta<T> } => {
    const hasMore = data.length > limit;
    
    // Extra item remove 
    const paginatedData = hasMore ? data.slice(0, -1) : data;
    
    const lastItem = paginatedData[paginatedData.length - 1];
    const nextCursor = hasMore && lastItem?.[sortBy] ? lastItem[sortBy] : null;
    
    return {
        data: paginatedData,
        meta: {
            limit,
            hasMore,
            nextCursor,
            sortBy,
            sortOrder,
            totalFetched: paginatedData.length,  
            ...(search && { search }),           
        },
    };
};

