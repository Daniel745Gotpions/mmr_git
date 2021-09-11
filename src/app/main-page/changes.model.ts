export class Changes {
  public changeId : number;
  public description: string;
  public projectId: number;
  public statusId:number;
  public statusDescription:string;
  public projectName:string;
  public createdAt:string;
  public updatedAt:string;

    constructor(changeId:number,description:string,projectId:number,statusId:number,statusDescription:string,projectName:string,createdAt:string,updatedAt:string) {
      this.changeId = changeId;
      this.description = description;
      this.projectId = projectId;
      this.statusId = statusId;
      this.statusDescription = statusDescription;
      this.projectName = projectName;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
}
