import { SetMetadata } from '@nestjs/common';

export const constants = {
  secret: 'SOME RANDOM STRING',
  IS_PUBLIC_KEY: 'isPublic',
  Public: () => SetMetadata(constants.IS_PUBLIC_KEY, true),
};
