// Define interface for Post Props [WWithout Pagination];

// Individual Post interface
export interface PostProps {
    id: number;
    body: string;
    created_at: string;
    updated_at: string;
}

// Array of Post interface
export interface PostArrayProps {
    posts: Array<PostProps>;
}


// Define interface for Post Props [With Pagination];

// Individual Post interface
export interface Post {
    id: number;
    body: string;
    created_at: string; // ISO 8601 datetime string
    updated_at: string; // ISO 8601 datetime string
}

// Pagination link interface
export interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

// Main paginated response interface
export interface PostsResponse {
    current_page: number;
    data: Post[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

// Generic paginated response interface (reusable for other resources)
export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

// Usage examples:

// For the specific posts response
// const postsData: PostsResponse = { ... };

// For a generic paginated response
// const postsData: PaginatedResponse<Post> = { ... };
// const usersData: PaginatedResponse<User> = { ... };

// Type guard to check if response has data
export function hasPaginatedData<T>(
    response: PaginatedResponse<T>
): response is PaginatedResponse<T> & { data: T[] } {
    return Array.isArray(response.data) && response.data.length > 0;
}

// Utility type for pagination metadata only
export type PaginationMeta = Omit<PaginatedResponse<any>, 'data'>;

// Type for API error responses (if needed)
export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    status?: number;
}