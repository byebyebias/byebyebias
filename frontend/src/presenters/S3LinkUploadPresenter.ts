import { useNavigate } from "react-router";

export class S3LinkUploadPresenter {
  private navigate = useNavigate();

  presentUploadResult(data: any) {
    console.log("File retrieved from s3 link and metrics fetched successfully");
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
