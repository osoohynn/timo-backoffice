import type { ZtpiCategory } from './testQuestion';

export type CustomizationType = 'THEME' | 'DECORATION';
export type UnlockConditionType = 'TOTAL_COUNT' | 'STREAK_COUNT';

export interface CustomizationItemImageResponse {
  category: ZtpiCategory;
  image: string;
  imageWithoutBackground: string;
}

export interface AdminCustomizationItemResponse {
  id: number;
  name: string;
  type: CustomizationType;
  description: string;
  unlockConditionType: UnlockConditionType;
  unlockConditionCount: number;
  usesCharacterImage: boolean;
}

export interface AdminCustomizationItemDetailResponse extends AdminCustomizationItemResponse {
  images: CustomizationItemImageResponse[];
}

export interface CreateCustomizationItemRequest {
  name: string;
  type: CustomizationType;
  description?: string;
  unlockConditionType: UnlockConditionType;
  unlockConditionCount: number;
  usesCharacterImage: boolean;
  images: { category: ZtpiCategory; image: string; imageWithoutBackground: string }[];
}

export type UpdateCustomizationItemRequest = Partial<CreateCustomizationItemRequest>;
