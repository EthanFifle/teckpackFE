class ApiService {
    async uploadFile(formData: FormData): Promise<string> {
        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseBody = await response.text();
                return `Success: ${responseBody}`;
            } else {
                return `Server error: ${response.status} ${response.statusText}`;
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            throw new Error('Failed to upload the file.');
        }
    }

    // Example placeholders for other API methods
    /*async fetchData(url: string): Promise<any> {
        // Implement GET request
    }

    async updateData(url: string, data: any): Promise<any> {
        // Implement PUT request
    }

     */
}

export const apiService = new ApiService();
