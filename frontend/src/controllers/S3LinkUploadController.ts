import { S3LinkUploadInteractor } from "../usecases/S3LinkUploadInteractor";
import { S3LinkUploadPresenter } from "../presenters/S3LinkUploadPresenter";

export class S3LinkUploadController {
  private interactor: S3LinkUploadInteractor;
  private presenter: S3LinkUploadPresenter;

  constructor(interactor: S3LinkUploadInteractor, presenter: S3LinkUploadPresenter) {
    this.interactor = interactor;
    this.presenter = presenter;
  }

  async handleS3Link(s3Link: string) {
    try {
      const result = await this.interactor.processLink(s3Link);
      this.presenter.presentUploadResult(result);
    } catch (error) {
      console.error("Error in UploadController:", error);
      this.presenter.presentError("Failed to upload file");
    }
  }
}
