import { useNavigate } from "react-router";

export class UploadFilePresenter {
  private navigate = useNavigate();

  presentUploadResult(data: any) {

    this.navigate("/dashboard", {
      state: {
        dashboardData: {
          filePath: data.filePath,
          overview: data.overview,
          metricResults: data.metricResults,
        },
      },
    });
    
  }

  presentError(message: string) {
    console.error(message);
  }
}
