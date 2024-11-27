import { UploadFileInteractor } from "../usecases/UploadFileInteractor";
import { UploadFilePresenter } from "../presenters/UploadFilePresenter";

export class UploadFileController {
  private interactor: UploadFileInteractor;
  private presenter: UploadFilePresenter;

  constructor(interactor: UploadFileInteractor, presenter: UploadFilePresenter) {
    this.interactor = interactor;
    this.presenter = presenter;
  }

  async handleFileUpload(file: File, protected_attributes: Array<string>) {
    try {
      const result = await this.interactor.analyzeFile(file, protected_attributes);
      this.presenter.presentUploadResult(result);
    } catch (error) {
      console.error("Error in UploadController:", error);
      this.presenter.presentError("Failed to upload file");
    }
  }
}
