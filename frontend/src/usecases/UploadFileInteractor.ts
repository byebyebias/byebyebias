import { apiService } from "../services/apiService";

export class UploadFileInteractor {
  async analyzeFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiService.post("/upload/", formData);
    if (response.ok) {
      const data = await response.json();
      return {
        fileName: data.file_name,
        filePath: data.file_path,
        overview: data.overview,
        metricResults: data.metric_results,
      };
    } else {
      throw new Error("File upload failed");
    }
  }
}
