class ApiService {
  async uploadFile(formData: FormData): Promise<string> {
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const jsonResponse = await response.json();

      console.log(jsonResponse);
      if (jsonResponse.status === "success") {
        return jsonResponse.data;
      } else {
        throw new Error(`Server returned an error status: ${jsonResponse.status}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      throw new Error('Failed to upload the file.');
    }
  }
}

export const apiService = new ApiService();
