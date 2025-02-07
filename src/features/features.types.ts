import { Transaction } from 'objection';

export interface IFeature<TInput = any, TOutput = any> {
  execute(payload: TInput, options?: any): TOutput;
}

export type FeatureTransactionOptions = {
  transaction?: Transaction;
};
