import { Injectable } from '@nestjs/common';

import { IssueTokensFeature } from './features/issue-tokens.feature';

@Injectable()
export class UserAuthFeaturesNamespace {
  constructor(public readonly issueTokens: IssueTokensFeature) {}
}
