import { apiService } from "../services/apiService";

export class S3LinkUploadInteractor {

  async processLink(s3Link: string, selectedAttributes: Array<string>): Promise<any> {
    const formData = new FormData();
    formData.append("link", s3Link);
    formData.append("protected_attributes", JSON.stringify(selectedAttributes));
    const response = await apiService.post("/process_link/", formData);
    if (response.ok) {
      const data = await response.json();
      return {
        fileName: data.file_name,
        filePath: data.file_path,
        overview: data.overview,
        metricResults: data.metric_results,
      };
    } else {
      throw new Error("S3 link upload failed");
    }
  }
}