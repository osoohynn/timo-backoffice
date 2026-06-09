export type GroupType = 'FRIEND' | 'CHARACTER';

export interface GroupResponse {
  id: number;
  name: string;
  type: GroupType;
  image?: string;
}

export interface CreateGroupRequest {
  name: string;
  type: GroupType;
  image?: string;
}
