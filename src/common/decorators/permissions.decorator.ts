import { SetMetadata } from '@nestjs/common';

export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'approve' | 'export';

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (module: string, ...actions: PermissionAction[]) =>
  SetMetadata(PERMISSIONS_KEY, { module, actions });
