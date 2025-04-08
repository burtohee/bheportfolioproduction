interface PostRequestResult {
    states: number | null;
    response: any;
}

export async function postRequest(
    url: string | URL | Request,
    headers: Record<string, string>, // More specific type for headers
    data: any // You can define this more strictly based on your data type
): Promise<PostRequestResult> {
    let result: PostRequestResult = { states: null, response: null };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        if (response.ok) {
            result.states = 200;
            result.response = await response.json();
            return result;
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error during the post request:', error);
        result.states = 500;
        result.response =
            error instanceof Error ? error.message : 'Unknown error';
        return result;
    }
}

export function fetchData(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error fetching data');
            })
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    });
}

export async function apiClient(
    url: string,
    options: RequestInit = {}
): Promise<any> {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error: unknown) {
        // The error is of type 'unknown'
        if (error instanceof Error) {
            console.error('API error:', error.message); // Now TypeScript knows it's an instance of Error
        } else {
            console.error('API error: Unknown error type');
        }
        throw error;
    }
}
