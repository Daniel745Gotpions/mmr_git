export class Changes {
  public changeId : number = null;
  public description: string = null;
  public projectId: number = null;
  public statusId:number = null;
  public statusDescription:string = null;
  public projectName:string = null;
  public createdAt:string = null;
  public updatedAt:string = null;

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
