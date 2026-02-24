import { Injectable } from '@nestjs/common';
@Injectable()
export class ProjectsService {
  createProject(body: any) { return { module: 'projects', project: body }; }
  gantt() { return { module: 'projects', gantt: [] }; }
}
